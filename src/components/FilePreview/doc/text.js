const { TextPreview } = _FilePreview;
const { getPublicPath } = remoteLoader;
const BaseExample = () => {
  return (
    <TextPreview
      maxWidth={900}
      url={getPublicPath("components-core") + "/mock/demo.txt"}
    />
  );
};

render(<BaseExample />);
