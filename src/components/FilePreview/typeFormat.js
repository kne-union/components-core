import HtmlPreview from "./HtmlPreview";
import OfficePreview from "./OfficePreview";
import PdfPreview from "./PdfPreview";
import TextPreview from "./TextPreview";
import UnknownPreview from "./UnknownPreview";
import ImagePreview from "./ImagePreview";

const typeFormat = (url) => {
  const path = (url || "").split("?")[0];
  const _path = path.toLowerCase();
  if (/.txt$/.test(_path)) {
    return "txt";
  }
  if (/.pdf$/.test(_path)) {
    return "pdf";
  }
  if (/.(png|jpg|jpeg)$/.test(_path)) {
    return "image";
  }
  if (/.(html|htm)$/.test(_path)) {
    return "html";
  }
  if (/.(doc|docx|xls|xlsx|ppt|pptx)$/.test(_path)) {
    return "office";
  }
  return "unknown";
};

export default typeFormat;

export const typeComponentMapping = {
  txt: TextPreview,
  pdf: PdfPreview,
  image: ImagePreview,
  html: HtmlPreview,
  office: OfficePreview,
  unknown: UnknownPreview,
};

export const typeFormatComponent = (url) => {
  return typeComponentMapping[typeFormat(url)];
};
