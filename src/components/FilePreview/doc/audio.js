const { AudioPreview } = _FilePreview;
const { getPublicPath } = remoteLoader;
const BaseExample = () => {
  return (
    <AudioPreview
      maxWidth={900}
      url={getPublicPath("components-core") + "/mock/audio.wav"}
    />
  );
};

render(<BaseExample />);
