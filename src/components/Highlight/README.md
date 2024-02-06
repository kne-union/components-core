
# Highlight


### 概述

用于显示文本高亮


### 示例

#### 示例代码

- 基本文字高亮
- 展示基本文字高亮
- _Highlight(@components/Highlight)

```jsx
const { default: Highlight, HighlightProvider } = _Highlight;
const BaseExample = () => {
  return (
    <HighlightProvider list={["哈", "呃呃"]}>
      <Highlight>哈哈哈西西西西呃呃呃</Highlight>
    </HighlightProvider>
  );
};

render(<BaseExample />);

```

- xss测试
- xss测试
- _Highlight(@components/Highlight)

```jsx
const { default: Highlight, HighlightProvider } = _Highlight;
const BaseExample = () => {
  const str = '<img src="/aaaa"/>';
  return (
    <HighlightProvider list={["哈", "呃呃"]}>
      <Highlight>哈哈哈西西西西呃呃呃{str}</Highlight>
    </HighlightProvider>
  );
};

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

