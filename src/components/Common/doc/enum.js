const Common = _Common;
const { Space } = _antd;

const { AddressEnum, FunctionEnum, IndustryEnum } = Common;

const BaseExample = () => {
  return (
    <Space direction={"vertical"}>
      <AddressEnum name={"010"} />
      <FunctionEnum name={"010"} />
      <IndustryEnum name={"010"} />
    </Space>
  );
};

render(<BaseExample />);
