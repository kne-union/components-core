# FileList

### 概述

FileList 组件提供了一套完整的文件管理解决方案，集成了文件列表展示、文件预览、文件上传等功能。

该组件支持拖拽上传、点击上传两种方式，提供了列表和预览两种视图模式。列表视图展示文件详细信息并支持编辑、删除、预览等操作，预览视图直接展示文件内容。组件内置了文件类型识别、上传进度管理、权限控制等功能，可以轻松集成到各种业务场景中。

核心特性：
- **多视图模式**：支持列表视图和预览视图切换，满足不同使用需求
- **拖拽上传**：支持拖拽文件到指定区域进行上传，提升用户体验
- **文件预览**：内置预览功能，支持多种文件格式的在线预览
- **权限控制**：支持细粒度的权限控制，可控制添加、编辑、删除、预览等操作
- **灵活配置**：支持自定义文件类型、文件大小限制、最大上传数量等参数
- **受控/非受控**：同时支持受控和非受控模式，适应不同的使用场景

适用于文档管理系统、人力资源系统、项目管理工具等需要文件处理的应用场景。


### 示例(全屏)

#### 示例代码

- 完整示例
- 展示完整的文件列表功能，包含文件展示、预览、上传、编辑、删除等操作，员工简历、合同、政策文档场景
- _FileList(@components/FileList),remoteLoader(@kne/remote-loader),lodash(lodash)

```jsx
const { default: FileList } = _FileList;
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
      }, 800);
    });
  },
};

const apis = {
  onSave: async ({ data }) => {
    return {
      ossId: uniqueId("oss_"),
      filename: data.originalName,
      date: new Date(),
      userName: "张三",
    };
  },
  onDelete: (item) => {
    console.log('删除文件:', item);
  },
};

const preset = {
  apis: {
    file: {
      getUrl: {
        loader: async ({ params }) => {
          const mapping = {
            "resume-zhangsan": "/mock/resume.pdf",
            "contract-employee": "/avatar.png",
            "policy-2024": "/mock/resume.pdf",
          };
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(getPublicPath("components-core") + mapping[params.id] || "");
            }, 100);
          });
        },
      },
    },
    previewOffice: {
      loader: async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              name: "员工入职登记表.docx",
              data: [
                {
                  id: "doc-preview-001",
                  originalName: "preview.pdf",
                  url: getPublicPath("components-core") + "/mock/resume.pdf",
                },
              ],
            });
          }, 0);
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
  const [list, setList] = useState([
    {
      id: "resume-zhangsan",
      filename: "张三-高级前端工程师-简历.pdf",
      date: "2024-01-15T10:30:00.000+08:00",
      userName: "张三",
    },
    {
      id: "contract-employee",
      filename: "劳动合同模板.docx",
      date: "2024-01-16T14:20:00.000+08:00",
      userName: "李四",
    },
    {
      id: "policy-2024",
      filename: "2024年度绩效考核管理办法.pdf",
      date: "2024-01-17T09:15:00.000+08:00",
      userName: "王五",
    },
  ]);
  return (
    <PureGlobal preset={preset}>
      <FileList
        defaultPreviewFileId="resume-zhangsan"
        list={list}
        setList={setList}
        apis={apis}
        titleExtra={({ currentTab, currentPreviewFileId }) => (
          <span style={{ fontSize: '12px', color: '#999' }}>
            {currentTab === 'preview' ? '预览模式' : '列表模式'}
            {currentPreviewFileId && &#96; | 当前: ${list.find(f => f.id === currentPreviewFileId)?.filename}&#96;}
          </span>
        )}
      />
    </PureGlobal>
  );
});

render(<BaseExample />);

```

- 文件上传
- 展示受控和非受控模式的文件上传功能，支持设置文件大小和数量限制
- _FileList(@components/FileList),remoteLoader(@kne/remote-loader),lodash(lodash),antd(antd)

```jsx
const { FileUpload } = _FileList;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;
const { useState } = React;
const { uniqueId } = lodash;
const { Space, Typography, Alert } = antd;

const { Text } = Typography;

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
      }, 800);
    });
  },
};

const apis = {
  onSave: async ({ data }) => {
    return {
      ossId: uniqueId("oss_"),
      filename: data.originalName,
      date: new Date(),
      userName: "张三",
    };
  },
  onDelete: (item) => {
    console.log('删除文件:', item);
  },
};

const preset = {
  apis: {
    file: {
      getUrl: {
        loader: async ({ params }) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(getPublicPath("components-core") + "/avatar.png");
            }, 500);
          });
        },
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
  const [uncontrolledList, setUncontrolledList] = useState([]);

  return (
    <PureGlobal preset={preset}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Alert
          message="文件上传示例"
          description="展示受控和非受控模式的文件上传功能"
          type="info"
          showIcon
        />

        <div>
          <Text strong>受控模式：</Text>
          <Text type="secondary" style={{ marginLeft: 8 }}>
            通过 list 和 setList 完全控制文件列表
          </Text>
          <FileUpload
            list={list}
            setList={setList}
            apis={apis}
            fileSize={10}
            maxLength={5}
          />
          <div style={{ marginTop: 8, padding: '12px', background: '#f5f5f5', borderRadius: '4px' }}>
            <Text type="secondary">当前文件数量：{list.length}</Text>
          </div>
        </div>

        <div>
          <Text strong>非受控模式：</Text>
          <Text type="secondary" style={{ marginLeft: 8 }}>
            只通过 setList 接收变化，不传入 list
          </Text>
          <FileUpload
            setList={(fileList) => {
              setUncontrolledList(fileList);
            }}
            apis={apis}
            fileSize={10}
          />
          <div style={{ marginTop: 8, padding: '12px', background: '#f5f5f5', borderRadius: '4px' }}>
            <Text type="secondary">当前文件数量：{uncontrolledList.length}</Text>
          </div>
        </div>
      </Space>
    </PureGlobal>
  );
});

render(<BaseExample />);

```

- 拖拽上传
- 展示拖拽上传功能，支持自定义上传提示，项目文档和员工资料上传场景
- _FileList(@components/FileList),antd(antd)

```jsx
const { DragArea, DragAreaOuter, UploadButton, DragButton, UploadTips } = _FileList;
const { Row, Col, Divider, Space, Typography, Alert, Card, message } = antd;

const { Text } = Typography;

const BaseExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert
        message="拖拽上传示例"
        description="支持拖拽文件到指定区域进行上传，或使用按钮点击上传"
        type="info"
        showIcon
      />

      <Card title="项目文档上传">
        <DragAreaOuter
          title={
            <Row>
              <Col flex={1}>
                <Text strong>上传项目文档</Text>
              </Col>
              <Col>
                <Space split={<Divider type="vertical" />}>
                  <DragButton />
                  <UploadButton>选择文件</UploadButton>
                </Space>
              </Col>
            </Row>
          }
          onFileSelected={(fileList) => {
            message.success(&#96;已选择 ${fileList.length} 个文件&#96;);
            console.log('选中的文件:', fileList);
          }}
          fileSize={10}
          maxLength={10}
        >
          <DragArea>
            <UploadTips
              icon={<span style={{ fontSize: '48px' }}>📁</span>}
              title="拖拽文件到这里"
              renderTips={(defaultTips, { fileSize, maxLength }) => (
                <div>
                  <div>{defaultTips}</div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    支持批量上传，最多 {maxLength} 个文件
                  </Text>
                </div>
              )}
            />
          </DragArea>
        </DragAreaOuter>
      </Card>

      <Card title="员工资料上传">
        <DragAreaOuter
          title={
            <Row>
              <Col flex={1}>
                <Text strong>上传员工资料</Text>
              </Col>
              <Col>
                <Space split={<Divider type="vertical" />}>
                  <DragButton />
                  <UploadButton>选择文件</UploadButton>
                </Space>
              </Col>
            </Row>
          }
          onFileSelected={(fileList) => {
            message.success(&#96;已选择 ${fileList.length} 个文件&#96;);
            console.log('选中的文件:', fileList);
          }}
          fileSize={5}
          accept={['.pdf', '.jpg', '.png', '.docx']}
        >
          <DragArea />
        </DragAreaOuter>
      </Card>
    </Space>
  );
};

render(<BaseExample />);

```

### API

### FileList 组件

文件列表组件，提供文件展示、预览、上传等完整功能。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| list | 文件列表数据 | array | 否 | [] |
| setList | 更新文件列表的函数 | function | 否* | - |
| defaultPreviewFileId | 默认预览的文件 ID | string | 否 | - |
| defaultTab | 默认显示的标签页，可选值为 `"list"` 或 `"preview"` | string | 否 | `"list"` |
| maxLength | 最大文件数量 | number | 否 | Number.MAX_VALUE |
| fileSize | 单个文件最大大小（MB） | number | 否 | 20 |
| accept | 允许上传的文件类型数组 | array\<string\> | 否 | `[".png", ".jpg", ".pdf", ".docx", ".doc"]` |
| getPermission | 权限控制函数，接收参数 `(type, itemData)`，返回 `false` 表示无权限 | function | 否 | `() => true` |
| infoItemRenders | 自定义列渲染配置 | array | 否 | - |
| apis | 操作 API 配置 | object | 否 | - |
| apis.onSave | 保存文件回调，接收参数 `(response, ...args)` | function | 否 | - |
| apis.onEdit | 编辑文件名称回调，接收参数 `({formData, item})` | function | 否 | - |
| apis.onPreview | 预览文件回调，接收参数 `(item)` | function | 否 | - |
| apis.onDelete | 删除文件回调，接收参数 `(item)` | function | 否 | - |
| apis.onUpload | 文件上传回调 | function | 否 | - |
| titleExtra | 标题额外内容，可以是 ReactNode 或函数 | ReactNode \| function | 否 | - |
| getPopupContainer | 指定下拉菜单挂载的父节点 | function | 否 | - |

**注意**：使用受控模式时需要同时提供 `list` 和 `setList` 属性。

#### list 数据结构

| 属性名 | 说明 | 类型 |
|--------|------|------|
| id | 文件唯一标识符 | string |
| ossId | OSS 文件标识符 | string |
| filename | 文件名称 | string |
| date | 上传日期（时间戳或 Date 对象） | Date \| string |
| userName | 上传人姓名 | string |

### FileUpload 组件

简化的文件上传组件，专注于文件上传和列表展示功能。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| list | 文件列表数据 | array | 否 | - |
| defaultList | 默认文件列表数据 | array | 否 | [] |
| setList | 更新文件列表的函数 | function | 否 | - |
| maxLength | 最大文件数量 | number | 否 | Number.MAX_VALUE |
| fileSize | 单个文件最大大小（MB） | number | 否 | 20 |
| accept | 允许上传的文件类型数组 | array\<string\> | 否 | `[".png", ".jpg", ".pdf", ".docx", ".doc"]` |
| getPermission | 权限控制函数，接收参数 `(type, itemData)`，返回 `false` 表示无权限 | function | 否 | `() => true` |
| apis | 操作 API 配置 | object | 否 | - |
| apis.onSave | 保存文件回调 | function | 否 | - |
| apis.onEdit | 编辑文件名称回调 | function | 否 | - |
| apis.onPreview | 预览文件回调 | function | 否 | - |
| apis.onDelete | 删除文件回调 | function | 否 | - |

### DragArea 组件

拖拽上传区域组件。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| children | 拖拽区域内显示的内容 | ReactNode | 否 | `<UploadTips />` |
| className | 自定义类名 | string | 否 | - |

### DragAreaOuter 组件

拖拽上传区域外层容器组件。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| title | 标题内容 | ReactNode | 否 | - |
| children | 子内容 | ReactNode | 是 | - |
| accept | 允许上传的文件类型数组 | array\<string\> | 否 | `[".png", ".jpg", ".pdf", ".docx", ".doc"]` |
| fileSize | 单个文件最大大小（MB） | number | 否 | 20 |
| maxLength | 最大文件数量 | number | 否 | Number.MAX_VALUE |
| onFileSelected | 文件选择回调，接收参数 `(fileList)` | function | 否 | - |
| defaultOpen | 默认是否打开拖拽区域 | boolean | 否 | false |
| className | 自定义类名 | string | 否 | - |

### DragButton 组件

拖拽上传按钮组件。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| children | 按钮文字内容 | ReactNode | 否 | - |

### UploadButton 组件

点击上传按钮组件。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| children | 按钮文字内容 | ReactNode | 否 | - |

### UploadTips 组件

上传提示组件，显示上传说明信息。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| icon | 自定义图标 | ReactNode | 否 | - |
| title | 提示标题 | ReactNode | 否 | - |
| renderTips | 自定义提示内容渲染函数，接收参数 `(defaultTips, {fileSize, maxLength, accept})` | function | 否 | - |
