
# FilePreview


### 概述

文件预览


### 示例(全屏)

#### 示例代码

- HtmlPreview
- 这里填写示例说明
- _FilePreview(@components/FilePreview)

```jsx
const { default: FilePreview, HtmlPreview } = _FilePreview;
const BaseExample = () => {
  return (
    <HtmlPreview
      maxWidth={900}
      url="/ui_components/components-core/1.0.0/mock/demo2.html"
    />
  );
};

render(<BaseExample />);

```

- PdfPreview
- 这里填写示例说明
- _FilePreview(@components/FilePreview)

```jsx
const { PdfPreview } = _FilePreview;
const BaseExample = () => {
  return (
    <PdfPreview
      maxWidth={900}
      url={`/ui_components/components-core/1.0.0/mock/1_王晶简历-2023_06_2.pdf`}
      renderTextLayer={true}
    />
  );
};

render(<BaseExample />);

```

- TextPreview
- 这里填写示例说明
- _FilePreview(@components/FilePreview)

```jsx
const { TextPreview } = _FilePreview;
const BaseExample = () => {
  return (
    <TextPreview
      maxWidth={900}
      url="/ui_components/components-core/1.0.0/mock/demo.txt"
    />
  );
};

render(<BaseExample />);

```

- ImagePreview
- 这里填写示例说明
- _FilePreview(@components/FilePreview)

```jsx
const { ImagePreview } = _FilePreview;
const BaseExample = () => {
  return (
    <ImagePreview
      url={`/ui_components/components-core/1.0.0/mock/demo2.jpg`}
      renderTextLayer={true}
    />
  );
};

render(<BaseExample />);

```

- unknown
- 这里填写示例说明
- _FilePreview(@components/FilePreview)

```jsx
const { UnknownPreview } = _FilePreview;
const BaseExample = () => {
  return (
    <UnknownPreview url="/ui_components/components-core/1.0.0/mock/demo.des" />
  );
};

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

