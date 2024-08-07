import { usePreset } from "@components/Global";
import { createWithFetch } from "@kne/react-fetch";
import { typeFormatComponent, typeComponentMapping } from "./typeFormat";

const OfficePreviewInner = createWithFetch({
  cache: "office-preview",
})(({ data, className, ...props }) => {
  const { data: fileList } = data;
  return fileList.map(({ url, type }) => {
    const PreviewComponent =
      typeComponentMapping[type] || typeFormatComponent(url);
    return (
      <PreviewComponent {...props} url={url} key={url} className={className} />
    );
  });
});

const OfficePreview = ({ id, apis: propsApis, className, ...props }) => {
  const { apis: baseApis, staticUrl, ajax } = usePreset();
  const apis = Object.assign({}, baseApis, propsApis);
  return (
    <OfficePreviewInner
      {...props}
      {...(apis.previewOffice || {
        loader: async ({ data }) => {
          const { data: resData } = await ajax(
            Object.assign(
              {},
              apis.oss,
              apis.oss?.url
                ? {
                    url: (apis.oss.url || "").replace("{id}", data.id),
                  }
                : {}
            )
          );
          return {
            data: [
              {
                url: `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
                  (staticUrl || "") + resData
                )}&wdPrint=0&wdEmbedCode=0`,
                type: "html",
              },
            ],
          };
        },
      })}
      data={{ id }}
      className={className}
    />
  );
};

export default OfficePreview;
