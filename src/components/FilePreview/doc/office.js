const { default: FilePreview } = _FilePreview;
const { getPublicPath } = remoteLoader;
const { PureGlobal } = _Global;
const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        ajax: () => {
          return {
            data: "http://video.ch9.ms/build/2011/slides/TOOL-532T_Sutter.pptx",
          };
        },
        apis: {
          oss: {
            url: "http://oss.com",
          },
        },
      }}
    >
      <FilePreview
        id="63bb2013-c743-4d2d-9d91-935c865f1c4d"
        originName="TOOL-532T_Sutter.pptx"
      />
    </PureGlobal>
  );
};

render(<BaseExample />);
