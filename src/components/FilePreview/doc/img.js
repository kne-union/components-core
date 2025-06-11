const { ImagePreview } = _FilePreview;
const { getPublicPath } = remoteLoader;
const BaseExample = () => {
  return (
    <ImagePreview url={getPublicPath("components-core") + "/mock/resume.png"} />
  );
};

render(<BaseExample />);
