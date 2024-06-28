const { default: Permissions } = _Permissions;
const { PureGlobal } = global;
const { Button, Radio, Space } = antd;
const { useState } = React;

const BaseExample = () => {
  const [type, setType] = useState("tooltip");
  return (
    <PureGlobal
      preset={{
        permissions: ["permission_1", "permission_2"],
      }}
    >
      <Space direction="vertical">
        <Radio.Group
          value={type}
          options={[
            { label: "tooltip", value: "tooltip" },
            {
              label: "error",
              value: "error",
            },
            { label: "hidden", value: "hidden" },
          ]}
          onChange={(e) => {
            setType(e.target.value);
          }}
          optionType="button"
          buttonStyle="solid"
        />
        <Permissions type={type} request={["permission_2"]}>
          <div className="box">
            <Button onClick={() => console.log("执行操作")}>有权限操作</Button>
          </div>
        </Permissions>
        <Permissions type={type} request={["permission_3"]}>
          <div className="box">
            <Button onClick={() => console.log("执行操作")}>无权限操作</Button>
          </div>
        </Permissions>
      </Space>
    </PureGlobal>
  );
};

render(<BaseExample />);
