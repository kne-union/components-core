import style from "./style.module.scss";
import useControlValue from "@kne/use-control-value";
import useSimulationBlur from "@kne/use-simulation-blur";
import { usePreset } from "@components/Global";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import classnames from "classnames";
import { useEffect, useMemo, useRef } from "react";
import { message } from "antd";
import { get, merge, uniqueId, isNaN } from "lodash";
import ensureSlash from "@kne/ensure-slash";
import base64ToFile from "@common/utils/base64ToFile";
import isHref from "@common/utils/isHref";

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  ["bold", "italic", "underline", "strike"], // toggled buttons
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ align: [] }],
  ["image"],
  ["link"],
  ["clean"], // remove formatting button
];

const getText = (text) => {
  const dom = document.createElement("div");
  dom.innerHTML = text;
  return { text: dom.innerText };
};

const formatEditorJS = (value) => {
  const ops = [];
  for (let i = 0; i < (value.blocks || []).length; i++) {
    const item = value.blocks[i];
    if (!item.data) {
      continue;
    }
    if (item.type === "header") {
      ops.push({ insert: `${getText(item.data.text).text}` });
      ops.push({ attributes: { header: item.data.level }, insert: "\n" });
    }
    if (item.type === "paragraph") {
      ops.push({ insert: `${getText(item.data.text).text}\n` });
    }
    if (item.type === "delimiter") {
      ops.push({
        attributes: { color: "#000000", size: "huge", bold: true },
        insert: " * * *",
      });
      ops.push({ attributes: { align: "center" }, insert: "\n" });
    }
    if (item.type === "image") {
      ops.push({
        insert: {
          image: item.data.file.hasOwnProperty("id")
            ? `${window.location.origin}/attachment/${item.data.file.id}.png?id=${item.data.file.id}&originalName=${item.data.file.filename}`
            : item.data.file.url,
        },
      });
    }
    if (item.type === "list") {
      (item.data.items || []).map((it) => {
        ops.push.apply(ops, [
          { insert: `${getText(it.content).text}` },
          { attributes: { list: "bullet" }, insert: "\n" },
        ]);
      });
    }
    if (item.type === "attaches") {
      const title =
        get(item.data, "file.title") || get(item.data, "title") || "";
      const extension =
        get(item.data, "file.extension") ||
        title.substring(title.lastIndexOf(".") + 1);
      const link = item.data.file.hasOwnProperty("id")
        ? `${window.location.origin}/attachment/${item.data.file.id}.${extension}?id=${item.data.file.id}&originalName=${title}`
        : item.data.file.url;
      ops.push.apply(ops, [
        { attributes: { link: link }, insert: title },
        { insert: "\n" },
      ]);
    }
  }
  return { ops };
};

const getUrl = (url) => {
  const a = document.createElement("A");
  a.href = url;
  return a;
};

const ReactRichEditor = ({
  className,
  readOnly,
  preview,
  onBlur,
  placeholder,
  hideToolbar,
  border,
  domain,
  folder,
  type,
  maxHeight,
  ...props
}) => {
  const [value, onChange] = useControlValue(props);
  const isReadyRef = useRef(false);
  const reactQuillRef = useRef(null);
  const ref = useSimulationBlur(() => {
    onBlur && onBlur();
  });
  const { ossApi, ossToStatic, ajax, urlToOss } = usePreset();
  const formatValue = useMemo(() => {
    if (value && Object.prototype.toString.call(value) === "[object Object]") {
      if (value.hasOwnProperty("ops")) {
        return value;
      }
      if (value.hasOwnProperty("blocks")) {
        return formatEditorJS(value);
      }
      return value;
    }
    if (value && typeof value === "string") {
      return { ops: [{ insert: `${getText(value).text}\n` }] };
    }
    return { ops: [] };
  }, [value]);

  const isEditorJS = useMemo(() => {
    if (value && Object.prototype.toString.call(value) === "[object Object]") {
      if (value.hasOwnProperty("blocks")) {
        return true;
      }
    }
    return false;
  }, [value]);

  // 将附件域名下的链接上传转为静态文件
  const loadImage = async (src, folder) => {
    const obj = getUrl(src);
    const searchParams = new URLSearchParams(obj.search);
    const searchId = searchParams?.get("id");
    const fileName = obj.pathname.substring(obj.pathname.lastIndexOf("/") + 1);
    const id = searchId || fileName.substring(0, fileName.lastIndexOf("."));
    if (id) {
      const { data } = await ajax(
        merge({}, ossApi, { params: { id }, showError: false })
      );
      const linkSrc = ossApi.transformData
        ? ossApi.transformData(data)
        : data.data;
      const url = linkSrc
        ? await urlToOss({ url: ensureSlash(linkSrc), folder })
        : src;
      return url;
    }
    const _url = await urlToOss({ url: src, folder });
    if (_url) {
      return _url;
    }
    return src;
  };

  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      const hide = message.loading("上传中...", 0);
      ossToStatic({ file, folder }).then((url) => {
        let quill = reactQuillRef?.current?.getEditor(); //获取到编辑器本身
        const cursorPosition = quill.getSelection().index; //获取当前光标位置
        quill.insertEmbed(cursorPosition, "image", url, "api"); //插入图片
        quill.setSelection(cursorPosition + 1); //光标位置加1
        hide();
      });
    };
  };

  const updateLink = async () => {
    if (!reactQuillRef.current) return;
    var linkNodes = ref.current?.querySelectorAll(".ql-container img");
    for (let i = 0; i < linkNodes.length; i++) {
      const linkNode = linkNodes[i];
      let obj = getUrl(linkNode.src);
      const image = new Image();
      image.src = linkNode.src;
      // 检查是否是本站点域名链接
      const isSameOrigin = domain.some((x) => x.host === obj.hostname);
      const isNeedUpdate = domain.some(
        (x) => x.host === obj.hostname && x.update === true
      );
      if (isSameOrigin) {
        image.onerror = () => {
          isNeedUpdate &&
            loadImage(linkNode.src, folder).then((url) => {
              linkNode.src = url;
            });
        };
      } else {
        // 判断图片是否是base64
        if (/^data:image/.test(linkNode.src)) {
          const fileName = uniqueId("base64_") + new Date().getTime();
          const file = base64ToFile(linkNode.src, fileName);
          ossToStatic({ file, folder }).then(async (url) => {
            linkNode.src = url;
          });
        } else if (isHref(linkNode.src)) {
          //  如果是第三方网页链接,将第三方网页链接上传转化为本站点服务链接
          urlToOss({ url: ensureSlash(linkNode.src), folder }).then((url) => {
            if (url) linkNode.src = url;
          });
        }
      }
    }

    var linkNodeLinks = ref.current?.querySelectorAll(".ql-container a");
    for (let i = 0; i < linkNodeLinks.length; i++) {
      const linkNode = linkNodeLinks[i];
      if (isHref(linkNode.href)) {
        let obj = getUrl(linkNode.href);
        // 检查是否是本站点域名链接
        const isNeedUpdate = domain.some(
          (x) => x.host === obj.hostname && x.update === true
        );
        isNeedUpdate &&
          loadImage(linkNode.href, folder).then((url) => {
            linkNode.href = url;
          });
      }
    }
  };

  const updateEditor = async (editorContent) => {
    const ops = get(editorContent, "ops") || [];
    for (let i = 0; i < ops.length; i++) {
      const item = ops[i];
      const nodeSrc = get(item, "insert.image");
      if (nodeSrc) {
        let obj = getUrl(nodeSrc);
        // 检查是否是本站点域名链接
        const isSameOrigin = domain.some((x) => x.host === obj.hostname);
        const isNeedUpdate = domain.some(
          (x) => x.host === obj.hostname && x.update === true
        );
        if (isSameOrigin) {
          const url = isNeedUpdate ? await loadImage(nodeSrc, folder) : nodeSrc;
          item.insert.image = url;
        } else {
          // 判断图片是否是base64
          if (/^data:image/.test(nodeSrc)) {
            const fileName = uniqueId("base64_") + new Date().getTime();
            const file = base64ToFile(nodeSrc, fileName);
            const url = await ossToStatic({ file, folder });
            item.insert.image = url;
          } else if (isHref(nodeSrc)) {
            //  如果是第三方网页链接,将第三方网页链接上传转化为本站点服务链接
            const url = await urlToOss({ url: ensureSlash(nodeSrc), folder });
            item.insert.image = url || nodeSrc;
          }
        }
      }
    }
    return { ops };
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: (value) => {
            imageHandler.call(this, props);
          },
        },
      },
      // counter: {
      //   container: "#counter",
      //   unit: 'word'
      // }
    };
  }, []);

  useEffect(() => {
    isReadyRef.current = false;
    const timer = setInterval(() => {
      if (reactQuillRef.current && reactQuillRef.current.editor) {
        isReadyRef.current = true;
        updateLink();
        clearInterval(timer);
      }
    }, 10);
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        "--max-height":
          maxHeight && !isNaN(parseFloat(maxHeight))
            ? parseFloat(maxHeight) + "px"
            : "",
      }}
      className={classnames(className, style["rich-editor"], {
        [style["read-only"]]: preview || readOnly,
        [style["hidden"]]: preview || hideToolbar || readOnly,
        [style["no-border"]]: border === false,
      })}
    >
      <ReactQuill
        ref={reactQuillRef}
        readOnly={readOnly}
        modules={modules}
        value={type === "html" ? value : formatValue}
        placeholder={placeholder}
        theme="snow"
        onChange={async (content, delta, source, editor) => {
          const editorContent =
            type === "html" ? editor.getHTML() : editor.getContents();
          updateLink();
          const result =
            type === "html" ? editorContent : await updateEditor(editorContent);
          onChange && onChange(result);
        }}
      />
    </div>
  );
};

ReactRichEditor.defaultProps = {
  placeholder: "请输入",
  hideToolbar: false,
  border: true,
  value: null,
  readOnly: false,
  preview: false,
  defaultValue: { ops: [] },
  folder: "richEditor", // 支持使用/创建子文件夹
  domain: [
    { host: "localhost", update: true },
    { host: "attachment.dev.fatalent.cn", update: true },
    { host: "attachment.test.fatalent.cn", update: true },
    { host: "attachment.fatalent.cn", update: true },
    { host: "fat-dev-static.oss-cn-shanghai.aliyuncs.com" },
    { host: "fat-test-static.oss-cn-shanghai.aliyuncs.com" },
    { host: "fat-static.oss-cn-shanghai.aliyuncs.com" },
  ],
};

export default ReactRichEditor;
