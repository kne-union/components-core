import { hooks } from "@kne/react-form-antd";
import { Input, Typography } from "antd";
import useControlValue from "@kne/use-control-value";

const { useDecorator } = hooks;

const TextField = ({ children, ...props }) => {
  const [value] = useControlValue(props);
  return (
    <Typography.Text {...props}>
      <div style={{ height: 0, width: 0, overflow: "hidden" }}>
        <Input value={value} />
      </div>
      {children ? children : value}
    </Typography.Text>
  );
};

const Text = (props) => {
  const render = useDecorator(props);
  return render(TextField);
};

Text.Field = TextField;

export default Text;
