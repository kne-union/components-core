
# StateBar


### 概述

用于 State Bar


### 示例

#### 示例代码

- State Bar
- State Bar
- _StateBar(@components/StateBar),antd(antd)

```jsx
const { default: StateBar } = _StateBar;
const { Button, Radio, Space } = antd;
const { useState } = React;

const BaseExample = () => {
  const [size, setSize] = useState("default");
  const [isInner, setIsInner] = useState(false);
  return (
    <Space direction="vertical">
      <Radio.Group
        value={isInner}
        options={[
          { label: "inner", value: true },
          { label: "normal", value: false },
        ]}
        onChange={(e) => {
          setIsInner(e.target.value);
        }}
        optionType="button"
        buttonStyle="solid"
      />
      <Radio.Group
        value={size}
        options={[
          { label: "small", value: "small" },
          { label: "default", value: "default" },
          { label: "large", value: "large" },
        ]}
        onChange={(e) => {
          setSize(e.target.value);
        }}
        optionType="button"
        buttonStyle="solid"
      />
      <StateBar
        size={size}
        isInner={isInner}
        stateOption={[
          { tab: "全部", key: "1" },
          { tab: "科目一", key: "2" },
          {
            tab: "科目二",
            key: "3",
          },
          { tab: "科目三", key: "4" },
          { tab: "科目四", key: "5" },
        ]}
      />
    </Space>
  );
};

render(<BaseExample />);

```

- Radio State Bar
- Radio State Bar
- _StateBar(@components/StateBar),antd(antd)

```jsx
const { default: StateBar } = _StateBar;
const { Radio, Space } = antd;
const { useState } = React;

const BaseStateExample = () => {
  const [size, setSize] = useState("default");
  return (
    <Space direction="vertical">
      <Radio.Group
        value={size}
        options={[
          { label: "small", value: "small" },
          { label: "default", value: "default" },
          { label: "large", value: "large" },
        ]}
        onChange={(e) => {
          setSize(e.target.value);
        }}
        optionType="button"
        buttonStyle="solid"
      />
      <StateBar
        size={size}
        type="radio"
        stateOption={[
          { tab: "全部", key: "1" },
          { tab: "科目一", key: "2" },
          { tab: "科目二", key: "3" },
          { tab: "科目三", key: "4" },
          { tab: "科目四", key: "5" },
          { tab: "科目一1", key: "22" },
          { tab: "科目二2", key: "33" },
          { tab: "科目三3", key: "44" },
          { tab: "科目四4", key: "55", style: { cursor: "copy" } },
        ]}
      />
    </Space>
  );
};

render(<BaseStateExample />);

```

- Step State Bar
- Step State Bar
- _StateBar(@components/StateBar)

```jsx
const { default: StateBar } = _StateBar;

const BaseStateExample = () => {
  return (
    <StateBar
      type="step"
      stateOption={[
        { tab: "全部", key: "1" },
        { tab: "科目一", key: "2" },
        { tab: "科目二", key: "3" },
        { tab: "科目三", key: "4" },
        { tab: "科目四", key: "5" },
        { tab: "科目一1", key: "22" },
        { tab: "科目二2", key: "33" },
        { tab: "科目三3", key: "44" },
        { tab: "科目四4", key: "55", className: "last" },
      ]}
      tabBarExtraContent={<div>测试</div>}
    />
  );
};

render(<BaseStateExample />);

```


### API

| 属性名                | 说明               | 类型                      | 默认值                             |
|--------------------|------------------|-------------------------|---------------------------------|
| stateOption        | state操作列表        | string                  | {key: string, tab: ReactNode}[] |
| activeKey          | 当前激活 tab 面板的 key | string                  | -                               |
| type               | 当前tab展示样式        | 'tab'、'radio'、'step'    | 'tab'                           |
| onChange           | 事件返回选中的key       | (value: string) => void |                                 |
| tabBarExtraContent | 展示在state bar右侧   | ReactNode               | null                            |
| isInner            | 底部线延展至总长         | boolean                 | false                           |

### Mapping
#### stateOption

| 属性名                 | 说明                | 类型                     | 默认值                |
|-----------------------|--------------------|-------------------------|-----------------------|
| key           | 对应 activeKey            | string                  | -                  |
| tab           | 	选项卡头显示文字            | ReactNode                 | -                  |

