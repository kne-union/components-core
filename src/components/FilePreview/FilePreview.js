import typeFormat from "./typeFormat";
import OfficePreview from "./OfficePreview";
import OSSFilePreview from "./OSSFilePreview";

const FilePreview = ({ id, originName, ...props }) => {
  if (typeFormat(originName) === "office") {
    return <OfficePreview {...props} id={id} originName={originName} />;
  }
  return <OSSFilePreview {...props} id={id} originName={originName} />;
};

export default FilePreview;
