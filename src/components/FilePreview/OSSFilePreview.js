import withOSSFile from "@common/hocs/withOSSFile";
import typeFormat, { typeFormatComponent } from "./typeFormat";
import OfficePreview from "./OfficePreview";
import { usePreset } from "@components/Global";

const OSSFilePreview = withOSSFile(
  ({ data, id, staticUrl: staticUrlProps, className, ...props }) => {
    const { staticUrl: staticUrlBase } = usePreset();
    const staticUrl = staticUrlProps || staticUrlBase || "";
    const PreviewComponent = typeFormatComponent(data);
    if (typeFormat(data) === "office") {
      return <OfficePreview {...props} id={id} className={className} />;
    }
    return (
      <PreviewComponent
        {...props}
        className={className}
        url={/^https?:\/\//.test(data) ? data : staticUrl + data}
      />
    );
  }
);

export default OSSFilePreview;
