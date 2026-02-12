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
