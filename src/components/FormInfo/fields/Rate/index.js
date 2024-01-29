import { Rate } from "antd";
import { hooks } from "@kne/react-form-antd";

const { useOnChange } = hooks;

const _Rate = (props) => {
  const render = useOnChange(
    Object.assign({ placeholder: `请选择${props.label || ""}` }, props)
  );
  return render(Rate);
};

_Rate.defaultProps = {
  fieldName: "rate",
};

export default _Rate;
