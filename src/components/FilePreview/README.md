
# FilePreview


### 概述

文件预览


### 示例(全屏)

#### 示例代码

- HtmlPreview
- 这里填写示例说明
- _FilePreview(@components/FilePreview),remoteLoader(@kne/remote-loader)

```jsx
const {default: FilePreview, HtmlPreview} = _FilePreview;
const {getPublicPath} = remoteLoader;
const BaseExample = () => {
    return (<HtmlPreview
            maxWidth={900}
            url={getPublicPath('components-core') + '/mock/demo2.html'}
        />);
};

render(<BaseExample/>);

```

- PdfPreview
- 这里填写示例说明
- _FilePreview(@components/FilePreview),remoteLoader(@kne/remote-loader)

```jsx
const {PdfPreview} = _FilePreview;
const {getPublicPath} = remoteLoader;
const BaseExample = () => {
    return (<PdfPreview
            maxWidth={900}
            url={getPublicPath('components-core') + '/mock/1_王晶简历-2023_06_2.pdf'}
            renderTextLayer={true}
        />);
};

render(<BaseExample/>);

```

- TextPreview
- 这里填写示例说明
- _FilePreview(@components/FilePreview),remoteLoader(@kne/remote-loader)

```jsx
const {TextPreview} = _FilePreview;
const {getPublicPath} = remoteLoader;
const BaseExample = () => {
    return (<TextPreview
            maxWidth={900}
            url={getPublicPath('components-core') + '/mock/demo.txt'}
        />);
};

render(<BaseExample/>);

```

- ImagePreview
- 这里填写示例说明
- _FilePreview(@components/FilePreview),remoteLoader(@kne/remote-loader)

```jsx
const {ImagePreview} = _FilePreview;
const {getPublicPath} = remoteLoader;
const BaseExample = () => {
    return (<ImagePreview url={getPublicPath('components-core') + '/mock/demo2.jpg'}/>);
};

render(<BaseExample/>);

```

- unknown
- 这里填写示例说明
- _FilePreview(@components/FilePreview),remoteLoader(@kne/remote-loader)

```jsx
const {UnknownPreview} = _FilePreview;
const {getPublicPath} = remoteLoader;
const BaseExample = () => {
    return (<UnknownPreview url={getPublicPath('components-core') + '/mock/demo.des'}/>);
};

render(<BaseExample/>);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

