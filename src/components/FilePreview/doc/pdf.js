const { PdfPreview } = _FilePreview;
const { getPublicPath } = remoteLoader;
const BaseExample = () => {
  return (
    <PdfPreview
      maxWidth={900}
      url={getPublicPath("components-core") + "/mock/resume.pdf"}
      renderTextLayer={true}
    />
  );
};

render(<BaseExample />);
