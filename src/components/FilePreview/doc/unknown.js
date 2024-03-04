const { UnknownPreview } = _FilePreview;
const { getPublicPath } = remoteLoader;
const BaseExample = () => {
  return (
    <UnknownPreview url={getPublicPath("components-core") + "/mock/demo.des"} />
  );
};

render(<BaseExample />);
