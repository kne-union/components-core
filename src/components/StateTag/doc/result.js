const { default: StateTag } = _StateTag;

const BaseExample = () => {
  return (
    <div>
      <StateTag
        text={"技能标签"}
        type={"result"}
        showBackground={false}
        closable
        onClose={() => console.log("close")}
      />
      <StateTag
        text={"技能标签"}
        type={"result"}
        closable
        onClose={() => console.log("close")}
      />
    </div>
  );
};

render(<BaseExample />);
