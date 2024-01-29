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
