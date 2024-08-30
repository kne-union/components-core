import { Switch as AntdSwitch, Space } from "antd";
import { hooks, hoc } from "@kne/react-form-antd";

const { useOnChange, useCheckedToValue } = hooks;
const { withChecked } = hoc;
const WithSwitch = withChecked(({ checked, children = null, ...props }) => {
  return (
    <Space>
      <AntdSwitch checked={checked} {...props} />
      {typeof children === "function" ? children({ checked }) : children}
    </Space>
  );
});

const Switch = (props) => {
  props = Object.assign(
    {},
    {
      fieldName: "switch",
    },
    props
  );
  const checkedProps = useCheckedToValue(props);
  const render = useOnChange(checkedProps);
  return render(WithSwitch);
};

Switch.Field = AntdSwitch;

export default Switch;
