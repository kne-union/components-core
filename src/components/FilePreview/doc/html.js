const { default: FilePreview, HtmlPreview } = _FilePreview;
const { getPublicPath } = remoteLoader;
const BaseExample = () => {
  return (
    <HtmlPreview
      maxWidth={900}
      url={getPublicPath("components-core") + "/mock/demo2.html"}
    />
  );
};

render(<BaseExample />);
