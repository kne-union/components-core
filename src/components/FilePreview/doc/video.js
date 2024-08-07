const { VideoPreview } = _FilePreview;
const { getPublicPath } = remoteLoader;
const BaseExample = () => {
  return (
    <VideoPreview
      maxWidth={900}
      url={getPublicPath("components-core") + "/mock/video.mp4"}
    />
  );
};

render(<BaseExample />);
