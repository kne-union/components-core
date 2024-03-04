const { PdfPreview } = _FilePreview;
const { getPublicPath } = remoteLoader;
const BaseExample = () => {
  return (
    <PdfPreview
      maxWidth={900}
      url={getPublicPath("components-core") + "/mock/1_王晶简历-2023_06_2.pdf"}
      renderTextLayer={true}
    />
  );
};

render(<BaseExample />);
