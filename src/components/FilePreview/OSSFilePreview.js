import withOSSFile from "@common/hocs/withOSSFile";
import typeFormat, { typeFormatComponent } from "./typeFormat";
import OfficePreview from "./OfficePreview";

const OSSFilePreview = withOSSFile(({ data, id, className, ...props }) => {
  const PreviewComponent = typeFormatComponent(data);
  if (typeFormat(data) === "office") {
    return <OfficePreview {...props} id={id} className={className} />;
  }
  return <PreviewComponent {...props} className={className} url={data} />;
});

export default OSSFilePreview;
