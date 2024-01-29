import axios from "axios";

const loadFont = (async () => {
  const { data: manifest } = await axios.get(
    window.ICONFONT_URL + "/manifest.json"
  );

  if (!document.head.querySelector(`link[href*="${manifest.font}"]`)) {
    const dom = document.createElement("link");
    dom.setAttribute(
      "href",
      window.ICONFONT_URL + "/" + manifest.font + "/iconfont.css"
    );
    dom.setAttribute("rel", "stylesheet");
    document.head.append(dom);
  }

  if (!document.head.querySelector(`script[href*="${manifest.colorful}"]`)) {
    const dom = document.createElement("script");
    dom.src = window.ICONFONT_URL + "/" + manifest.colorful + "/iconfont.js";
    document.head.append(dom);
  }

  return manifest;
})();

export default loadFont;
