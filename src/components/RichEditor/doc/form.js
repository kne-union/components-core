const RichEditor = _RichEditor.default;
const { default: Form, SubmitButton } = reactForm;
const { PureGlobal: Global } = global;

const BaseExample = () => {
  const data = {
    ops: [
      { insert: "Gandalf", attributes: { bold: true } },
      { insert: " the " },
      { insert: "Grey", attributes: { color: "#cccccc" } },
    ],
  };
  return (
    <Global
      preset={{
        ossApi: {
          url: "/api/v1/attachment/get/link",
        },
        ossApi: {
          url: "/api/v1/attachment/get/link",
          transformData: () => {
            return "https://fat-dev-static.oss-cn-shanghai.aliyuncs.com/position-top.png";
          },
        },
        uploadFile: () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: {
                  code: 0,
                  data: {
                    id: "xDBhiYMBxoTGC6WmoMbu",
                    originalName: "WechatIMG22副本.jpg",
                  },
                },
              });
            });
          });
        },
        ossToStatic: ({ file, folder }) => {
          return new Promise(async (resolve) => {
            setTimeout(() => {
              resolve(
                "https://fat-dev-static.oss-cn-shanghai.aliyuncs.com/position-top.png"
              );
            });
          });
        },
        urlToOss: ({ url, folder = "richEditor" }) => {
          return new Promise(async (resolve) => {
            setTimeout(() => {
              resolve(
                "https://fat-dev-static.oss-cn-shanghai.aliyuncs.com/position-top.png"
              );
            });
          });
        },
        ajax: (config) => {
          console.log(config);
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: {
                  code: 0,
                  data: "/ui_components/mock/eXur9YEBzBdA-Vkwaigw.png",
                },
              });
            }, 1000);
          });
        },
      }}
    >
      <Form
        data={{
          des: data,
        }}
        onSubmit={(data) => {
          console.log(data);
        }}
      >
        <RichEditor name="des" label="描述" />
        <div>
          <SubmitButton>提交</SubmitButton>
        </div>
      </Form>
    </Global>
  );
};

render(<BaseExample />);
