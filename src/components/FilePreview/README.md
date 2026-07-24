# FilePreview

### 概述

FilePreview 是一个功能全面的文件预览组件库，支持多种常见文件格式的在线预览。该组件基于 @kne/react-file 封装，提供了统一的 API 接口，可根据文件类型自动选择合适的预览方式，极大简化了文件预览功能的集成。

核心特性包括：支持图片、音频、视频、PDF、HTML、文本和 Office 文档等多种格式；提供 OSS 文件预览能力，通过文件 ID 自动获取预览地址；响应式设计，自动适配容器宽度；完善的加载状态和错误提示；支持自定义 PDF 渲染参数和 Office 预览配置。

适用于文档管理系统、在线办公平台、内容管理系统等需要文件预览功能的场景，特别适合需要处理多种文件类型的企业级应用。组件采用模块化设计，可以独立使用各个预览组件，也可使用统一的 FilePreview 组件自动判断文件类型。


### 示例(全屏)

#### 示例代码

- FileUpload
- 文件上传
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { FileUpload } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;

const urls = {};

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
                resolve(urls[params.id]);
              }, 1000);
            });
          }
        }, upload: ({ file }) => {
          urls[file.name] = URL.createObjectURL(file);
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: {
                  code: 0, data: {
                    id: file.name, filename: file.name
                  }
                }
              });
            }, 1000);
          });
        }
      }
    }
  }}>
    <FileUpload />
  </PureGlobal>;
});

render(<BaseExample />);


```

- FilePreview
- 文件预览
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { FilePreview } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:InfoPage']
})(({ remoteModules }) => {
  const [PureGlobal, InfoPage] = remoteModules;
  return (
    <PureGlobal
      preset={{
        ajax: async api => {
          return { data: { code: 0, data: api.loader() } };
        },
        apis: {
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
                  6: '/mock/resume.docx',
                  7: '/mock/example.zip',
                  8: '/mock/resume.xlsx'
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
      <InfoPage>
        <InfoPage.Part title="预览图片">
          <FilePreview id="1" />
        </InfoPage.Part>
        <InfoPage.Part title="预览PDF">
          <FilePreview id="2" />
        </InfoPage.Part>
        <InfoPage.Part title="预览HTML">
          <FilePreview id="3" />
        </InfoPage.Part>
        <InfoPage.Part title="预览TXT">
          <FilePreview id="4" />
        </InfoPage.Part>
        <InfoPage.Part title="预览AUDIO">
          <FilePreview id="5" />
        </InfoPage.Part>
        <InfoPage.Part title="预览OFFICE">
          <FilePreview id="6" filename="resume.docx" />
          <FilePreview id="8" filename="resume.xlsx" />
        </InfoPage.Part>
        <InfoPage.Part title="预览ZIP">
          <FilePreview id="7" />
        </InfoPage.Part>
      </InfoPage>
    </PureGlobal>
  );
});

render(<BaseExample />);


```

- MarkdownPreview
- Markdown文件预览
- _ReactFile(@kne/react-file)[import * as _ReactFile from "@kne/react-file"],(@kne/react-file/dist/index.css),remoteLoader(@kne/remote-loader)

```jsx
const { MarkdownPreview } = _ReactFile;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:InfoPage']
})(({ remoteModules }) => {
  const [InfoPage] = remoteModules;
  return (
    <InfoPage>
      <InfoPage.Part title="基础用法">
        <MarkdownPreview url={&#96;${getPublicPath('react-file')}/mock/example.md&#96;} />
      </InfoPage.Part>
    </InfoPage>
  );
});

render(<BaseExample />);


```

### API

### FilePreview 组件

智能文件预览组件，根据文件类型自动选择对应的预览方式。支持直接传入文件 URL 或 OSS 文件 ID 两种方式。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| src | 文件预览地址，优先使用该参数 | string | 否 | - |
| id | OSS 文件标识符，当 src 未提供时使用 | string | 否 | - |
| originName | 原始文件名，用于判断文件类型 | string | 否 | - |
| filename | 文件名，用于判断文件类型 | string | 否 | - |
| apis | API 配置对象 | object | 否 | - |

### OSSFilePreview 组件

OSS 文件预览组件，通过文件 ID 从服务器获取文件地址后进行预览。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | OSS 文件标识符 | string | 是 | - |
| filename | 文件名，用于判断文件类型 | string | 否 | - |
| staticUrl | 静态文件地址前缀 | string | 否 | - |
| render | 自定义渲染函数 | function | 否 | - |
| apis | API 配置对象 | object | 否 | - |

### HtmlPreview 组件

HTML 文件预览组件，支持在 iframe 中展示 HTML 内容。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| url | HTML 文件地址 | string | 是 | - |
| maxWidth | 最大显示宽度 | number | 否 | 1200 |
| ignoreContent | 是否忽略内容检查，直接使用 iframe | boolean | 否 | false |
| className | 自定义类名 | string | 否 | - |

### PdfPreview 组件

PDF 文件预览组件，基于 react-pdf 实现，支持缩放和旋转。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| url | PDF 文件地址 | string | 是 | - |
| maxWidth | 最大显示宽度 | number | 否 | 1200 |
| scale | 缩放比例（100 为原始大小） | number | 否 | 100 |
| rotate | 旋转角度 | number | 否 | 0 |
| pdfjsUrl | pdf.js CDN 地址 | string | 否 | https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.296 |
| className | 自定义类名 | string | 否 | - |

### TextPreview 组件

文本文件预览组件，支持纯文本文件的在线展示。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| url | 文本文件地址 | string | 是 | - |
| maxWidth | 最大显示宽度 | number | 否 | 1200 |
| className | 自定义类名 | string | 否 | - |

### ImagePreview 组件

图片预览组件，支持常见图片格式的展示。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| url | 图片地址 | string | 是 | - |
| maxWidth | 最大显示宽度 | number | 否 | 1200 |
| scale | 缩放比例 | number | 否 | 1 |
| rotate | 旋转角度 | number | 否 | 0 |
| origin | 是否使用原生 img 标签，不带容器和加载状态 | boolean | 否 | false |
| className | 自定义类名 | string | 否 | - |

### AudioPreview 组件

音频预览组件，使用原生 audio 标签进行音频播放。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| url | 音频文件地址 | string | 是 | - |
| maxWidth | 最大显示宽度 | number | 否 | 1200 |
| className | 自定义类名 | string | 否 | - |

### VideoPreview 组件

视频预览组件，使用原生 video 标签进行视频播放。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| url | 视频文件地址 | string | 是 | - |
| maxWidth | 最大显示宽度 | number | 否 | 1200 |
| controls | 是否显示播放控件 | boolean | 否 | true |
| origin | 是否使用原生 video 标签，不带容器 | boolean | 否 | false |
| getElement | 获取 video 元素的回调函数 | function | 否 | - |
| className | 自定义类名 | string | 否 | - |

### OfficePreview 组件

Office 文件预览组件，使用 Office Online Viewer 进行预览。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| url | Office 文件地址 | string | 是 | - |
| className | 自定义类名 | string | 否 | - |
| apis | API 配置对象，可配置自定义预览服务 | object | 否 | - |

### UnknownPreview 组件

未知类型文件预览组件，用于不支持预览的文件类型。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| maxWidth | 最大显示宽度 | number | 否 | 1200 |
