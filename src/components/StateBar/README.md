# StateBar

### 概述

### 概述

StateBar 是一个基于 Ant Design Tabs 组件的状态栏组件，支持多种展示类型（tab、radio、step），适用于需要状态切换和流程展示的场景。

### 何时使用

当需要在页面中展示不同状态的选项卡或步骤流程时使用，例如：
- 数据列表的状态筛选（全部、待处理、已完成等）
- 表单或流程的步骤展示
- 选项卡切换界面

### 特点

* 支持三种展示类型：tab（标签页）、radio（单选）、step（步骤）
* 可自定义样式和尺寸（small、default、large）
* 支持底部线条延展效果（isInner 属性）
* 可添加额外内容在状态栏右侧
* 基于 Ant Design Tabs，兼容其大部分属性


### 示例

#### 示例代码

- 基础状态栏
- 展示StateBar组件的基础用法，包括不同类型和尺寸的配置
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

- Radio类型状态栏
- 展示StateBar组件的radio类型，适合选项较多的场景
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

- Step类型状态栏
- 展示StateBar组件的step类型，适合展示流程步骤
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

- 受控模式
- 展示StateBar组件的受控模式，包括activeKey和onChange事件的使用
- _StateBar(@components/StateBar),antd(antd)

```jsx
const { default: StateBar } = _StateBar;
const { Button, Card, Space, Tag } = antd;
const { useState } = React;

const ControlledModeExample = () => {
  const [activeKey, setActiveKey] = useState("1");
  
  const stateOption = [
    { key: "1", tab: "待处理" },
    { key: "2", tab: "处理中" },
    { key: "3", tab: "待审核" },
    { key: "4", tab: "已完成" },
    { key: "5", tab: "已拒绝" },
  ];
  
  const statusData = {
    "1": { count: 15, color: "orange", description: "等待处理的工单" },
    "2": { count: 8, color: "blue", description: "正在处理的工单" },
    "3": { count: 5, color: "purple", description: "等待审核的工单" },
    "4": { count: 128, color: "green", description: "已完成的工单" },
    "5": { count: 3, color: "red", description: "已拒绝的工单" },
  };

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title="工单状态管理" style={{ width: "100%" }}>
        <StateBar
          type="tab"
          activeKey={activeKey}
          stateOption={stateOption}
          onChange={handleTabChange}
          tabBarExtraContent={
            <Button type="primary" size="small">
              新建工单
            </Button>
          }
        />
        
        <Card style={{ marginTop: 20 }}>
          <Space direction="vertical" size="middle">
            <div>
              <Tag color={statusData[activeKey].color}>
                {stateOption.find(item => item.key === activeKey)?.tab}
              </Tag>
              <span style={{ marginLeft: 8 }}>数量: {statusData[activeKey].count} 个</span>
            </div>
            <div>
              <strong>状态描述:</strong> {statusData[activeKey].description}
            </div>
            <div>
              <strong>当前选中:</strong> {activeKey}
            </div>
          </Space>
        </Card>
      </Card>
      
      <Card title="快速切换" style={{ width: "100%" }}>
        <Space wrap>
          {stateOption.map(item => (
            <Button
              key={item.key}
              onClick={() => setActiveKey(item.key)}
              type={activeKey === item.key ? "primary" : "default"}
            >
              切换到: {item.tab}
            </Button>
          ))}
        </Space>
      </Card>
    </Space>
  );
};

render(<ControlledModeExample />);

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
