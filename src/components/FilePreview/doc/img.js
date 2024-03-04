const { ImagePreview } = _FilePreview;
const { getPublicPath } = remoteLoader;
const BaseExample = () => {
  return (
    <ImagePreview url={getPublicPath("components-core") + "/mock/demo2.jpg"} />
  );
};

render(<BaseExample />);
