import TypeDateRangePickerField from "@common/components/TypeDateRangePickerField";
import { hooks } from "@kne/react-form-antd";

const { useOnChange } = hooks;

const TypeDateRangePicker = (props) => {
  const render = useOnChange(Object.assign({}, {}, props));
  return render(TypeDateRangePickerField);
};

TypeDateRangePicker.Field = TypeDateRangePickerField;

export default TypeDateRangePicker;
