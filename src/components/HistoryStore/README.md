
# HistoryStore


### 概述

历史记录提示


### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _HistoryStore(@components/HistoryStore),antd(antd)

```jsx
const { default: HistoryStore } = _HistoryStore;
const { Input } = antd;
const { useState } = React;
const BaseExample = () => {
  const [value, setValue] = useState("");
  return (
    <HistoryStore
      onSelect={(value) => {
        setValue(value);
      }}
    >
      {({ appendHistory, openHistory }) => (
        <Input.Search
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onFocus={openHistory}
          onSearch={(value) => {
            appendHistory({
              value,
              label: value,
            });
          }}
        />
      )}
    </HistoryStore>
  );
};

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

