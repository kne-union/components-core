
# FileList


### 概述

文件列表展示，预览，上传


### 示例(全屏)

#### 示例代码

- 完整示例
- 提供一个上传文件，显示文件列表，预览文件的我去年正示例
- _FileList(@components/FileList),remoteLoader(@kne/remote-loader),lodash(lodash)

```jsx
const {default: FileList} = _FileList;
const {createWithRemoteLoader, getPublicPath} = remoteLoader;
const {useState} = React;
const {uniqueId} = lodash;

const ajax = {
    postForm: (config) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        code: 0, data: {
                            id: "uBFNeYQBnHRXlZaTGZpA", originalName: config.file.name,
                        },
                    },
                });
            }, 1000);
        });
    },
};

const apis = {
    onSave: async ({data}) => {
        return {
            ossId: uniqueId(), filename: data.originalName, date: new Date(), userName: "哈哈哈",
        };
    }, onDelete: () => {
    },
};

const preset = {
    apis: {
        oss: {
            loader: async ({params}) => {
                const mapping = {
                    "01": "/avatar.png", "02": "/mock/demo.html", "03": "/mock/1_王晶简历-2023_06_2.pdf",
                };
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(getPublicPath("components-core") + mapping["03"]);
                    }, 1000);
                });
            },
        }, previewOffice: {
            loader: async () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            "name": "测试开发_夏永昱_本科_5年.docx", "data": [{
                                "id": "gWw26Y0BeK_D6zxND5vh",
                                "originalName": "attachment/gWw26Y0BeK_D6zxND5vh.pdf",
                                "url": getPublicPath("components-core") + "/mock/1_王晶简历-2023_06_2.pdf"
                            }]
                        });
                    }, 1000);
                });

            }
        }, ossUpload: ({file}) => {
            return ajax.postForm({file});
        },
    },
};

const BaseExample = createWithRemoteLoader({
    modules: ["components-core:Global@PureGlobal"],
})(({remoteModules}) => {
    const [PureGlobal] = remoteModules;
    const [list, setList] = useState([]);
    console.log(list);
    return (<PureGlobal preset={preset}>
        <FileList list={list} setList={setList} apis={apis}/>
    </PureGlobal>);
});

render(<BaseExample/>);

```

- 上传文件列表
- 展示一个上传文件展示上传成功文件列表
- _FileList(@components/FileList),remoteLoader(@kne/remote-loader),lodash(lodash)

```jsx
const { FileUpload } = _FileList;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;
const { useState } = React;
const { uniqueId } = lodash;

const ajax = {
  postForm: (config) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            code: 0,
            data: {
              id: "uBFNeYQBnHRXlZaTGZpA",
              originalName: config.file.name,
            },
          },
        });
      }, 1000);
    });
  },
};

const apis = {
  onSave: async ({ data }) => {
    const id = uniqueId();
    return {
      id: id,
      ossId: id,
      filename: data.originalName,
      date: new Date(),
      userName: "哈哈哈",
    };
  },
  onDelete: () => {},
};

const preset = {
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
            resolve(getPublicPath("components-core") + mapping["03"]);
          }, 1000);
        });
      },
    },
    ossUpload: ({ file }) => {
      return ajax.postForm({ file });
    },
  },
};

const BaseExample = createWithRemoteLoader({
  modules: ["components-core:Global@PureGlobal"],
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;
  const [list, setList] = useState([]);
  console.log(list);
  return (
    <PureGlobal preset={preset}>
      <FileUpload list={list} setList={setList} apis={apis} />
    </PureGlobal>
  );
});

render(<BaseExample />);

```

- 拖拽上传
- 展示一个拖拽上传文件，得到File对象
- _FileList(@components/FileList),antd(antd)

```jsx
const { DragArea, DragAreaOuter, UploadButton, DragButton } = _FileList;
const { Row, Col, Divider, Space } = antd;

const BaseExample = () => {
  return (
    <DragAreaOuter
      title={
        <Row>
          <Col flex={1}>标题</Col>
          <Col>
            <Space split={<Divider type="vertical" />}>
              <DragButton />
              <UploadButton>上传</UploadButton>
            </Space>
          </Col>
        </Row>
      }
      onFileSelected={(fileList) => {
        console.log(fileList);
      }}
    >
      <DragArea />
    </DragAreaOuter>
  );
};

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

