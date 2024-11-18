const { FileLink, useFileModal } = _File;
const { getPublicPath } = remoteLoader;
const { PureGlobal } = global;
const { Button } = antd;

const CustomButton = ({ children, ...p }) => {
  const modal = useFileModal(p);
  return (
    <Button
      onClick={() => {
        modal();
      }}
    >
      {p.originName}
    </Button>
  );
};

const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        apis: {
          file: {
            getUrl: {
              loader: async ({ params }) => {
                const mapping = {
                  "01": "/avatar.png",
                  "02": "/mock/demo.html",
                  "03": "/mock/1_王晶简历-2023_06_2.pdf",
                };
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve(
                      getPublicPath("components-core") + mapping[params.id]
                    );
                  }, 1000);
                });
              },
            },
          },
        },
      }}
    >
      <FileLink id="01" originName="我是一个图片.jpg" />
      <FileLink id="02" originName="我是一个网页.html" />
      <FileLink id="03" originName="我是一个pdf.pdf" />
      <CustomButton id="03" originName="我是一个pdf.pdf" />
    </PureGlobal>
  );
};

render(<BaseExample />);
