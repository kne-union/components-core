import { FunctionSelectField } from "@components/Common";
import { hooks } from "@kne/react-form-antd";

const { useOnChange } = hooks;

const FunctionSelect = (props) => {
  const render = useOnChange(
    Object.assign({}, { placeholder: "请选择" + props.label }, props)
  );
  return render(FunctionSelectField);
};

FunctionSelect.Field = FunctionSelectField;
FunctionSelect.Enum = FunctionSelectField.Enum;

export default FunctionSelect;
