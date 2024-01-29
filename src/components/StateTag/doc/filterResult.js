const { default: StateTag } = _StateTag;

const BaseExample = () => {
  return (
    <div>
      <StateTag
        filterName={"BD"}
        text={"陈枫林，王晓晨"}
        type={"filterResult"}
        closable
        onClose={() => console.log("close")}
      />
      <br />
      <StateTag
        filterName={"添加人"}
        text={"陈枫林，王晓晨，陈路，张力"}
        type={"filterResult"}
        closable
        onClose={() => console.log("close")}
      />
    </div>
  );
};

render(<BaseExample />);
