const RichEditor = _RichEditor.default.field;
const { Button } = antd;
const { useState } = React;
const { PureGlobal: Global } = global;
const BaseExample = () => {
  // const data = {"ops": [{"insert": {"image": "http://localhost:3001/ui_components/mock/xasdXsdgszxq-Zsdsrw.png?originalName=WechatIMG22%E5%89%AF%E6%9C%AC.jpg&id=xDBhiYMBxoTGC6WmoMbu"}}]};
  const data = "<p>sdfasfsdf</p>";
  const [text, setText] = useState(data);
  return (
    <Global
      preset={{
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
      <RichEditor type={"html"} value={text} onChange={setText} />
      <div>值：{text ? JSON.stringify(text, null, 2) : ""}</div>
    </Global>
  );
};

render(<BaseExample />);
