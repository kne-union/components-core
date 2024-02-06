
# File


### 概述

提供文件展示，下载等操作


### 示例

#### 示例代码

- 获取文件地址
- 通过一个ossId获取文件地址
- _File(@components/File),global(@components/Global)

```jsx
const { default: File } = _File;
const { PureGlobal } = global;
const BaseExample = () => {
  return <File id="qqq">{({ url }) => url}</File>;
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
                resolve(window.PUBLIC_URL + "/avatar.png");
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

```

- 文件下载
- 展示文件下载
- _File(@components/File),global(@components/Global)

```jsx
const { Download } = _File;
const { PureGlobal } = global;
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
                resolve(window.PUBLIC_URL + "/avatar.png");
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

```

- 文件列表
- 展示文件列表
- _FileList(@components/File),lodash(lodash),global(@components/Global),antd(antd)

```jsx
const { List } = _FileList;
const { Space } = antd;
const { PureGlobal } = global;

const BaseExample = () => {
  return (
    <Space direction="vertical">
      <List
        dataSource={[
          {
            uuid: "121233",
            type: "uploading",
            filename: "张三的简历.doc",
          },
          {
            id: "xxxxx",
            filename: "我是一份简历.pdf",
            date: "2022-07-15T11:09:15.000+08:00",
            userName: "用户名",
          },
        ]}
      />
      <List dataSource={[]} />
    </Space>
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
                resolve(window.PUBLIC_URL + "/mock/demo.pdf");
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

```

- 这里填写示例标题
- 这里填写示例说明
- _File(@components/File),remoteLoader(@kne/remote-loader),global(@components/Global)

```jsx
const { FileLink } = _File;
const { getPublicPath } = remoteLoader;
const { PureGlobal } = global;
const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        apis: {
          oss: {
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
      }}
    >
      <FileLink id="01" originName="我是一个图片.jpg" />
      <FileLink id="02" originName="我是一个网页.html" />
      <FileLink id="03" originName="我是一个pdf.pdf" />
    </PureGlobal>
  );
};

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

