const { default: StateTag } = _StateTag;

const BaseExample = () => {
  return (
    <div>
      <StateTag
        text={"技能标签"}
        type={"skill"}
        showBorder
        showBackground={false}
      />
    </div>
  );
};

render(<BaseExample />);
