# File

### 概述

File 组件提供了一套完整的文件管理解决方案，包括文件展示、OSS 文件 ID 转换、文件列表展示、文件下载等功能。

该组件集成了文件上传、预览、编辑、删除等常见操作，支持通过 OSS ID 自动获取文件访问地址，并提供文件列表组件来展示和管理多个文件。同时提供了文件下载、文件预览链接等便捷组件，方便在各种场景下使用。

核心特性：
- **自动 OSS 地址转换**：支持通过文件 ID 自动获取 OSS 访问地址，无需手动处理 URL 转换
- **完整的文件操作**：提供文件预览、编辑名称、下载、删除等完整操作功能
- **灵活的列表展示**：支持自定义列渲染、权限控制、上传状态展示
- **多种使用方式**：提供按钮、链接、列表等多种形式的组件，适应不同场景需求
- **下载状态管理**：内置下载状态管理，支持下载进度控制和回调处理

适用于文档管理系统、文件共享平台、数据导入导出等需要文件处理的应用场景。


### 示例

#### 示例代码

- File
- 从oss获取文件地址
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),remoteLoader(@kne/remote-loader)

```jsx
const { default: File } = _ReactFile;
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
            return new Promise(resolve => {
              setTimeout(() => {
                resolve('/logo192.png');
              }, 1000);
            });
          }
        }
      }
    }
  }}>
    <File id="123">{({ url }) => {
      return url;
    }}</File>
  </PureGlobal>;
});

render(<BaseExample />);


```

- Image
- 显示图片
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { Image } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;
const { Divider } = antd;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:InfoPage']
})(({ remoteModules }) => {
  const [PureGlobal, InfoPage] = remoteModules;
  return <PureGlobal preset={{
    ajax: async api => {
      return { data: { code: 0, data: api.loader() } };
    }, apis: {
      file: {
        staticUrl: getPublicPath('react-file') || window.PUBLIC_URL,
        getUrl: {
          loader: async ({ params }) => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve('/mock/avatar.png');
              }, 2000);
            });
          }
        }
      }
    }
  }}>
    <InfoPage>
      <InfoPage.Part title="图片">
        <Image src="xxxxxx" />
        <Image id="xxxxxx" style={{ width: 200, height: 200 }} />
      </InfoPage.Part>
      <InfoPage.Part title="头像">
        <Image.Avatar gender="F" />
        <Image.Avatar gender="M" />
        <Image.Avatar />
        <Image.Avatar gender="F" id="xxxxxx" />
        <Divider />
        <Image.Avatar gender="F" shape="square" />
        <Image.Avatar gender="M" shape="square" />
        <Image.Avatar shape="square" />
        <Image.Avatar gender="F" id="xxxxxx" shape="square" />
        <Divider />
        <Image.Avatar gender="F" size={30} />
        <Image.Avatar gender="M" size={50} />
        <Image.Avatar size={80} />
        <Image.Avatar gender="F" id="xxxxxx" size={100} />
      </InfoPage.Part>
    </InfoPage>
  </PureGlobal>;
});

render(<BaseExample />);


```

- Download
- 文件下载
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { Download } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;
const { Flex } = antd;

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
            return new Promise(resolve => {
              setTimeout(() => {
                resolve('/logo192.png');
              }, 1000);
            });
          }
        }
      }
    }
  }}>
    <Flex gap={8}>
      <Download id="123">下载文件</Download>
      <Download id="123" filename="图片">下载文件并设置名称</Download>
      <Download src="/logo192.png" filename="图片">直接通过src链接下载</Download>
    </Flex>
  </PureGlobal>;
});

render(<BaseExample />);


```

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

### API

### File 组件

File 组件用于通过 OSS ID 获取文件访问地址并展示文件内容。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | OSS 文件的唯一标识符 | string | 否* | - |
| url | 直接指定文件的访问地址 | string | 否* | - |
| children | 渲染函数，接收 `{ url }` 参数 | Function | 是 | - |
| apis | OSS 接口配置，包含 `oss` 属性 | object | 否 | - |
| error | 加载失败时显示的内容 | ReactNode | 否 | null |
| loading | 加载中显示的内容 | ReactNode | 否 | null |

**注意**：`id` 和 `url` 至少需要传入其中一个。

### Download 组件

文件下载按钮组件，支持通过 OSS ID 或 URL 下载文件。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | OSS 文件的唯一标识符 | string | 否* | - |
| url | 直接指定文件的下载地址 | string | 否* | - |
| filename | 下载后的文件名 | string | 否 | 未命名下载文件 |
| apis | OSS 接口配置，包含 `oss` 属性 | object | 否 | - |
| onSuccess | 下载成功回调函数 | function | 否 | - |
| onError | 下载失败回调函数 | function | 否 | - |
| children | 按钮内容 | ReactNode | 是 | - |

**注意**：`id` 和 `url` 至少需要传入其中一个。

### List 组件

文件列表展示组件，支持文件预览、编辑名称、下载、删除等操作。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| dataSource | 文件数据列表 | array | 否 | [] |
| getPermission | 权限控制函数，接收 `{ type, itemData }` 参数，返回 `false` 表示无权限 | function | 否 | - |
| hasPreview | 是否启用预览功能 | boolean | 否 | true |
| infoItemRenders | 自定义列配置，数组中每项包含 `span`（栅格数）和 `render`（渲染函数） | array | 否 | - |
| renderModal | 自定义 Modal 渲染函数 | function | 否 | - |
| apis | 操作 API 配置 | object | 否 | - |
| apis.onEdit | 编辑文件名称回调，接收参数 `(formData, itemData)` | function | 否 | - |
| apis.onPreview | 预览文件回调，接收参数 `(itemData)` | function | 否 | - |
| apis.onDelete | 删除文件回调，接收参数 `(itemData)` | function | 否 | - |

#### dataSource 数据结构

| 属性名 | 说明 | 类型 |
|--------|------|------|
| id | 文件唯一标识符（一般为 OSS ID） | string |
| uuid | 临时文件唯一标识符 | string |
| type | 文件状态，值为 `"uploading"` 时显示上传中状态 | string |
| filename | 文件名称 | string |
| date | 上传日期（时间戳或 Date 对象） | Date \| string |
| userName | 上传人姓名 | string |

### OptionButtons 组件

文件操作按钮组，提供预览、编辑、删除等操作按钮。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| itemData | 文件数据对象 | object | 是 | - |
| apis | 操作 API 配置 | object | 否 | - |
| apis.onEdit | 编辑文件名称回调 | function | 否 | - |
| apis.onPreview | 预览文件回调 | function | 否 | - |
| apis.onDelete | 删除文件回调 | function | 否 | - |
| hasPreview | 是否显示预览按钮 | boolean | 否 | true |
| renderModal | 自定义 Modal 渲染函数 | function | 否 | - |

### FileLink 组件

文件链接组件，点击后弹出文件预览弹窗。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | OSS 文件的唯一标识符 | string | 否* | - |
| url | 直接指定文件的访问地址 | string | 否* | - |
| originName | 文件原始名称 | string | 否 | - |
| title | 预览弹窗标题 | string \| ReactNode | 否 | originName |
| apis | OSS 接口配置，包含 `oss` 属性 | object | 否 | - |
| openDownload | 是否启用下载功能 | boolean | 否 | true |
| modalProps | Modal 组件的额外属性 | object | 否 | - |
| children | 链接文字内容，不传则显示 `originName` | ReactNode | 否 | originName |

**注意**：`id` 和 `url` 至少需要传入其中一个。

### downloadBlobFile 函数

下载文件的工具函数。

#### 函数签名

```typescript
downloadBlobFile(target: string | Blob, filename: string): void
```

#### 参数说明

| 参数名 | 说明 | 类型 | 必填 |
|--------|------|------|------|
| target | 文件下载地址或二进制数据（Blob） | string \| Blob | 是 |
| filename | 下载后的文件名 | string | 是 |

### useDownload Hook

生成下载函数并管理下载状态的 Hook。

#### Hook 返回值

| 属性名 | 说明 | 类型 |
|--------|------|------|
| download | 执行下载的函数 | function |
| isLoading | 是否正在下载 | boolean |
| others | 其他 useFetch 返回的属性 | object |

#### Hook 参数

| 参数名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | OSS 文件的唯一标识符 | string | 否* | - |
| url | 直接指定文件的下载地址 | string | 否* | - |
| filename | 下载后的文件名 | string | 否 | - |
| apis | OSS 接口配置，包含 `oss` 属性 | object | 否 | - |
| onSuccess | 下载成功回调函数 | function | 否 | - |
| onError | 下载失败回调函数 | function | 否 | - |

**注意**：`id` 和 `url` 至少需要传入其中一个。

### useFileModal Hook

生成文件预览弹窗函数的 Hook。

#### Hook 返回值

| 属性名 | 说明 | 类型 |
|--------|------|------|
| modal | 打开文件预览弹窗的函数 | function |

#### modal 函数参数

| 参数名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | OSS 文件的唯一标识符 | string | 否* | - |
| url | 直接指定文件的访问地址 | string | 否* | - |
| originName | 文件原始名称 | string | 否 | - |
| title | 预览弹窗标题 | string \| ReactNode | 否 | originName |
| apis | OSS 接口配置，包含 `oss` 属性 | object | 否 | - |
| openDownload | 是否启用下载功能 | boolean | 否 | true |
| modalProps | Modal 组件的额外属性 | object | 否 | - |

**注意**：`id` 和 `url` 至少需要传入其中一个。

### FileButton 组件

文件按钮组件，点击后弹出文件预览弹窗。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | OSS 文件的唯一标识符 | string | 否* | - |
| url | 直接指定文件的访问地址 | string | 否* | - |
| originName | 文件原始名称 | string | 否 | - |
| title | 预览弹窗标题 | string \| ReactNode | 否 | originName |
| apis | OSS 接口配置，包含 `oss` 属性 | object | 否 | - |
| openDownload | 是否启用下载功能 | boolean | 否 | true |
| modalProps | Modal 组件的额外属性 | object | 否 | - |
| type | 按钮类型 | string | 否 | default |
| children | 按钮内容 | ReactNode | 是 | - |

**注意**：`id` 和 `url` 至少需要传入其中一个。
