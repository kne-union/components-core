# FilePreview

### 概述

FilePreview 是一个功能全面的文件预览组件库，支持多种常见文件格式的在线预览。该组件基于 @kne/react-file 封装，提供了统一的 API 接口，可根据文件类型自动选择合适的预览方式，极大简化了文件预览功能的集成。

核心特性包括：支持图片、音频、视频、PDF、HTML、文本和 Office 文档等多种格式；提供 OSS 文件预览能力，通过文件 ID 自动获取预览地址；响应式设计，自动适配容器宽度；完善的加载状态和错误提示；支持自定义 PDF 渲染参数和 Office 预览配置。

适用于文档管理系统、在线办公平台、内容管理系统等需要文件预览功能的场景，特别适合需要处理多种文件类型的企业级应用。组件采用模块化设计，可以独立使用各个预览组件，也可使用统一的 FilePreview 组件自动判断文件类型。


### 示例(全屏)

#### 示例代码

- HtmlPreview
- 这里填写示例说明
- _FilePreview(@components/FilePreview),remoteLoader(@kne/remote-loader)

```jsx
const { default: FilePreview, HtmlPreview } = _FilePreview;
const { getPublicPath } = remoteLoader;
const BaseExample = () => {
  return (
    <HtmlPreview
      maxWidth={900}
      url={getPublicPath("components-core") + "/mock/demo2.html"}
    />
  );
};

render(<BaseExample />);

```

- PdfPreview
- 这里填写示例说明
- _FilePreview(@components/FilePreview),remoteLoader(@kne/remote-loader)

```jsx
const { PdfPreview } = _FilePreview;
const { getPublicPath } = remoteLoader;
const BaseExample = () => {
  return (
    <PdfPreview
      maxWidth={900}
      url={getPublicPath("components-core") + "/mock/resume.pdf"}
      renderTextLayer={true}
    />
  );
};

render(<BaseExample />);

```

- TextPreview
- 这里填写示例说明
- _FilePreview(@components/FilePreview),remoteLoader(@kne/remote-loader)

```jsx
const { TextPreview } = _FilePreview;
const { getPublicPath } = remoteLoader;
const BaseExample = () => {
  return (
    <TextPreview
      maxWidth={900}
      url={getPublicPath("components-core") + "/mock/demo.txt"}
    />
  );
};

render(<BaseExample />);

```

- ImagePreview
- 这里填写示例说明
- _FilePreview(@components/FilePreview),remoteLoader(@kne/remote-loader)

```jsx
const { ImagePreview } = _FilePreview;
const { getPublicPath } = remoteLoader;
const BaseExample = () => {
  return (
    <ImagePreview url={getPublicPath("components-core") + "/mock/resume.png"} />
  );
};

render(<BaseExample />);

```

- unknown
- 这里填写示例说明
- _FilePreview(@components/FilePreview),remoteLoader(@kne/remote-loader)

```jsx
const { UnknownPreview } = _FilePreview;
const { getPublicPath } = remoteLoader;
const BaseExample = () => {
  return (
    <UnknownPreview url={getPublicPath("components-core") + "/mock/demo.des"} />
  );
};

render(<BaseExample />);

```

- office
- 这里填写示例说明
- _FilePreview(@components/FilePreview),remoteLoader(@kne/remote-loader),_Global(@components/Global)

```jsx
const {default: FilePreview} = _FilePreview;
const {getPublicPath} = remoteLoader;
const {PureGlobal} = _Global;
const BaseExample = () => {
    return (
        <PureGlobal
            preset={{
                apis: {
                    file: {
                        getUrl: {
                            loader:()=>{
                                return "http://ieee802.org:80/secmail/docIZSEwEqHFr.doc";
                            },
                        },
                    },
                },
            }}
        >
            <FilePreview
                id="63bb2013-c743-4d2d-9d91-935c865f1c4d"
                originName="docIZSEwEqHFr.doc"
            />
        </PureGlobal>
    );
};

render(<BaseExample/>);

```

- audio
- 这里填写示例说明
- _FilePreview(@components/FilePreview),remoteLoader(@kne/remote-loader),_Global(@components/Global)

```jsx
const { AudioPreview } = _FilePreview;
const { getPublicPath } = remoteLoader;
const BaseExample = () => {
  return (
    <AudioPreview
      maxWidth={900}
      url={getPublicPath("components-core") + "/mock/audio.wav"}
    />
  );
};

render(<BaseExample />);

```

- video
- 这里填写示例说明
- _FilePreview(@components/FilePreview),remoteLoader(@kne/remote-loader),_Global(@components/Global)

```jsx
const { VideoPreview } = _FilePreview;
const { getPublicPath } = remoteLoader;
const BaseExample = () => {
  return (
    <VideoPreview
      maxWidth={900}
      url={getPublicPath("components-core") + "/mock/video.mp4"}
    />
  );
};

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
