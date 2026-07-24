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

- FileButton
- 预览文件按钮
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { FileButton } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;
  return <PureGlobal preset={{
    ajax: async api => {
      return { data: { code: 0, data: api.loader() } };
    }, apis: {
      file: {
        staticUrl: getPublicPath('react-file') || window.PUBLIC_URL,
        getUrl: {
          loader: async ({ params }) => {
            const urlMap = {
              1: '/mock/resume.png',
              2: '/mock/resume.pdf',
              3: '/mock/resume.html',
              4: '/mock/resume.txt',
              5: '/mock/audio.wav',
              6: '/mock/resume.docx'
            };
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(urlMap[params.id]);
              }, 1000);
            });
          }
        }
      }
    }
  }}>
    <FileButton id="1" filename="demo.jpg" openPrint modalProps={{ width: 800 }}>预览demo.jpg</FileButton>
    <FileButton id="2" filename="demo2.pdf" openPrint modalProps={{ width: 800 }}>预览demo2.pdf</FileButton>
    <FileButton id="3" filename="demo2.html" openPrint modalProps={{ width: 800 }}>预览demo2.html</FileButton>
    <FileButton id="6" filename="resume.docx" openPrint modalProps={{ width: 800 }} type="link">resume.docx</FileButton>
  </PureGlobal>;
});

render(<BaseExample />);


```

- FileList
- 文件列表
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { FileList } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;
const { Divider } = antd;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;
  return <PureGlobal preset={{
    ajax: async api => {
      return { data: { code: 0, data: api.loader() } };
    }, apis: {
      file: {
        staticUrl: getPublicPath('react-file') || window.PUBLIC_URL,
        getUrl: {
          loader: async ({ params }) => {
            const urlMap = {
              1: '/mock/resume.png',
              2: '/mock/resume.pdf',
              3: '/mock/resume.html',
              4: '/mock/resume.txt',
              5: '/mock/audio.wav',
              6: '/mock/resume.docx'
            };
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(urlMap[params.id]);
              }, 1000);
            });
          }
        }
      }
    }
  }}>
    <FileList dataSource={[{
      uuid: '121233',
      type: 'uploading',
      filename: '张三的简历.doc'
    },
      {
        id: '2',
        filename: '我是一份简历.pdf',
        date: '2022-07-15T11:09:15.000+08:00',
        userName: '用户名'
      }]} />
    <Divider />
    <FileList dataSource={[]} />
  </PureGlobal>;
});

render(<BaseExample />);


```

- JsonPreview
- JSON文件预览
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),remoteLoader(@kne/remote-loader)

```jsx
const { JsonPreview } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:InfoPage']
})(({ remoteModules }) => {
  const [PureGlobal, InfoPage] = remoteModules;
  return (
    <PureGlobal preset={{
      ajax: async api => {
        return { data: { code: 0, data: api.loader() } };
      },
      apis: {
        file: {
          staticUrl: getPublicPath('react-file') || window.PUBLIC_URL
        }
      }
    }}>
      <InfoPage>
        <InfoPage.Part title="JSON文件预览 - 默认黑色主题">
          <JsonPreview 
            url="https://jsonplaceholder.typicode.com/users"
          />
        </InfoPage.Part>
        <InfoPage.Part title="JSON文件预览 - 白色主题">
          <JsonPreview 
            url="https://jsonplaceholder.typicode.com/users"
            theme="light"
          />
        </InfoPage.Part>
        <InfoPage.Part title="JSON文件预览 - 从第2级开始收起">
          <JsonPreview 
            url="https://jsonplaceholder.typicode.com/users"
            collapsedFrom={2}
          />
        </InfoPage.Part>
      </InfoPage>
    </PureGlobal>
  );
});

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
