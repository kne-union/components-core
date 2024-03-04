const { Download } = _File;
const { PureGlobal } = global;
const { getPublicPath } = remoteLoader;
const BaseExample = () => {
  return (
    <Download
      id="123"
      filename="下载的文件"
      onSuccess={() => {
        console.log("下载成功");
      }}
    >
      文件下载
    </Download>
  );
};

render(
  <PureGlobal
    preset={{
      apis: {
        oss: {
          loader: async ({ params }) => {
            console.log(params);
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(getPublicPath("components-core") + "/avatar.png");
              }, 1000);
            });
          },
        },
      },
    }}
  >
    <BaseExample />
  </PureGlobal>
);
