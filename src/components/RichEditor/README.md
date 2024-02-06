
# RichEditor


### 概述

富文本编辑器 ***（已废弃请勿使用）***


### 示例(全屏)

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _RichEditor(@components/RichEditor),data(@components/RichEditor/doc/data.json),antd(antd),global(@components/Global)

```jsx
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

```

- 只读模式
- 展示只读模式
- _RichEditor(@components/RichEditor),antd(antd),global(@components/Global)

```jsx
const RichEditor = _RichEditor.default.field;
const { Button } = antd;
const { useState } = React;
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
      <RichEditor value={data} readOnly={true} />
    </Global>
  );
};

render(<BaseExample />);

```

- 在表单中使用
- 展示在表单中使用
- _RichEditor(@components/RichEditor),reactForm(@kne/react-form-antd),global(@components/Global)

```jsx
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

```

- 支持Editor格式数据
- 支持Editor格式数据
- _RichEditor(@components/RichEditor),data(@components/RichEditor/doc/data.json),reactForm(@kne/react-form-antd),global(@components/Global)

```jsx
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

```


### API

|属性名| 说明         | 类型      | 默认值   |
|  ---  |------------|---------|-------|
|  hideToolbar  | 是否隐藏工具栏    | boolean | false |
|  value  | -          | object  | null  |
|  readOnly  | 是否只读       | boolean | false |
|  preview  | 是否预览模式     | boolean | false |
|  border  | 是否显示border | boolean | true  |

