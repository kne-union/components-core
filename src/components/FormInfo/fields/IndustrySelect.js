import { IndustrySelectField } from "@components/Common";
import { hooks } from "@kne/react-form-antd";

const { useOnChange } = hooks;

const IndustrySelect = (props) => {
  const render = useOnChange(
    Object.assign({}, { placeholder: "请选择" + props.label }, props)
  );
  return render(IndustrySelectField);
};

IndustrySelect.Field = IndustrySelectField;
IndustrySelect.Enum = IndustrySelectField.Enum;

export default IndustrySelect;
