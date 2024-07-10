import iFrameResize from "iframe-resizer";
import { useEffect, useRef } from "react";
import { getPublicPath } from "@kne/remote-loader";
import classnames from "classnames";
import style from "./style.module.scss";
import { createWithFetch } from "@kne/react-fetch";

const isCrossDomain = (url) => {
  if (!/^http?s:\/\//.test(url)) {
    return false;
  }
  const currentURL = new URL(window.location.href);
  const targetURL = new URL(url);
  return ["protocol", "hostname", "port"].some(
    (name) => currentURL[name] !== targetURL[name]
  );
};

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
  return <iframe title="文件预览" frameBorder="0" width="100%" ref={ref} />;
});

const HtmlPreview = ({ className, url, maxWidth }) => {
  return (
    <div
      className={classnames(className, style["container"])}
      style={{
        maxWidth,
      }}
    >
      {isCrossDomain(url) ? (
        <iframe
          title="文件预览"
          src={url}
          frameBorder="0"
          width="100%"
          className={style["html-preview-iframe"]}
        />
      ) : (
        <HtmlInnerPreview url={url} />
      )}
    </div>
  );
};

export default HtmlPreview;
