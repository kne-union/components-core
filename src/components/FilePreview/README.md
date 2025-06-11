
# FilePreview


### 概述

文件预览


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

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

