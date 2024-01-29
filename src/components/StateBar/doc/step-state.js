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
