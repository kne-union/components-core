import { usePreset } from "@components/Global";
import { createWithFetch } from "@kne/react-fetch";
import { typeFormatComponent } from "./typeFormat";

const OfficePreviewInner = createWithFetch({
  cache: "office-preview",
})(({ data, className, ...props }) => {
  const { data: fileList } = data;
  return fileList.map(({ url }) => {
    const PreviewComponent = typeFormatComponent(url);
    return (
      <PreviewComponent {...props} url={url} key={url} className={className} />
    );
  });
});

const OfficePreview = ({ id, apis: propsApis, className, ...props }) => {
  const { apis: baseApis } = usePreset();
  const apis = Object.assign({}, baseApis, propsApis);
  return (
    <OfficePreviewInner
      {...props}
      {...apis.previewOffice}
      data={{ id }}
      className={className}
    />
  );
};

export default OfficePreview;
