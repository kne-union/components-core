import { Quill } from "react-quill";

const Link = Quill.import("formats/link");
// 自定义a链接
class LinkBlot extends Link {
  // 继承Link Blot
  static create(value) {
    let node = undefined;
    if (value && !value.href) {
      // 适应原本的Link Blot
      node = super.create(value);
    } else {
      // 自定义Link Blot
      node = super.create(value.href);
      node.href = value.href;
      node.innerText = value.innerText;
      // node.setAttribute('download', value.innerText);  // 左键点击即下载
    }
    return node;
  }
}

LinkBlot.blotName = "link"; // 这里不用改，如果需要也可以保留原来的，这里用个新的blot
LinkBlot.tagName = "A";

export default LinkBlot;
