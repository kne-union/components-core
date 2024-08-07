import HtmlPreview from "./HtmlPreview";
import OfficePreview from "./OfficePreview";
import PdfPreview from "./PdfPreview";
import TextPreview from "./TextPreview";
import UnknownPreview from "./UnknownPreview";
import ImagePreview from "./ImagePreview";
import AudioPreview from "./AudioPreview";
import VideoPreview from "./VideoPreview";

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
  if (/.(mp3|wav|ogg|aac)$/.test(_path)) {
    return "audio";
  }
  if (/.(mp4|avi|mov|mkv|flv)$/.test(_path)) {
    return "video";
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
  audio: AudioPreview,
  video: VideoPreview,
  unknown: UnknownPreview,
};

export const typeFormatComponent = (url) => {
  return typeComponentMapping[typeFormat(url)];
};
