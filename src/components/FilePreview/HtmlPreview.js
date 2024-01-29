import iFrameResize from "iframe-resizer";
import { useEffect, useRef } from "react";
import { getPublicPath } from "@kne/remote-loader";
import classnames from "classnames";
import style from "./style.module.scss";
import { createWithFetch } from "@kne/react-fetch";

const HtmlInnerPreview = createWithFetch({
  transformResponse: ({ data }) => {
    return {
      data: {
        code: 200,
        results: data,
      },
    };
  },
})(({ data }) => {
  const ref = useRef(null);
  useEffect(() => {
    const parser = new DOMParser();
    const domDocument = parser.parseFromString(data, "text/html");
    domDocument.querySelectorAll("script").forEach((el) => {
      el.parentElement.removeChild(el);
    });
    const scriptPath =
      getPublicPath("components-core") + "/iframeResizer.contentWindow.js";
    const script = document.createElement("script");
    script.src = scriptPath;
    domDocument.head.appendChild(script);
    const style = document.createElement("style");
    style.innerText =
      "html,body{height:auto!important;}body{pointer-events: none;background: #FFFFFF;}";
    domDocument.head.appendChild(style);
    ref.current.srcdoc = domDocument.documentElement.outerHTML;
  }, [data]);
  useEffect(() => {
    iFrameResize.iframeResize({ checkOrigin: false }, ref.current);
  }, []);
  return <iframe title="简历预览" frameBorder="0" width="100%" ref={ref} />;
});

const HtmlPreview = ({ className, url, maxWidth }) => {
  return (
    <div
      className={classnames(className, style["container"])}
      style={{
        maxWidth,
      }}
    >
      <HtmlInnerPreview url={url} />
      {/*<iframe
        title="简历预览"
        src={url}
        frameBorder="0"
        width="100%"
        ref={ref}
        onLoad={() => {
          const scriptPath =
            getPublicPath("components-core") +
            "/iframeResizer.contentWindow.js";
          if (!ref.current.contentDocument) {
            console.warn(
              `跨域情况无法开启自动高度计算，请将${scriptPath}脚本加入目标页面`
            );
            return;
          }
          const script = document.createElement("script");
          script.src = scriptPath;
          ref.current.contentDocument.head.appendChild(script);
          ref.current.contentDocument.body.style = "pointer-events: none;";
        }}
      />*/}
    </div>
  );
};

export default HtmlPreview;
