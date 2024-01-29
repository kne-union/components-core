const RichEditor = _RichEditor.default.field;
const { PureGlobal: Global } = global;
const { default: value } = data;
const { useState } = React;

const BaseExample = () => {
  const [text, setText] = useState(value);
  return (
    <Global
      preset={{
        ossApi: {
          url: "/api/v1/attachment/get/link",
          transformData: () => {
            return "https://fat-dev-static.oss-cn-shanghai.aliyuncs.com/position-top.png";
          },
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
                  data: "/ui_components/mock/xasdXsdgszxq-Zsdsrw.png",
                },
              });
            }, 1000);
          });
        },
      }}
    >
      <RichEditor value={text} onChange={setText} />
      <div>转换后值：{JSON.stringify(text, null, 2)}</div>
      <div>原始值：{JSON.stringify(value, null, 2)}</div>
    </Global>
  );
};

render(<BaseExample />);
