import { hooks } from "@kne/react-form-antd";
import {
  SuperSelectField,
  SuperSelectTableListField,
} from "@components/Common";

const { useOnChange } = hooks;

const createdField = (WrappedComponent) => {
  const List = (props) => {
    const render = useOnChange(
      Object.assign({}, { placeholder: "请选择" + props.label }, props)
    );
    return render(WrappedComponent);
  };

  List.field = List.Field = WrappedComponent;

  return List;
};
const SuperSelect = createdField(SuperSelectField);
export const SuperSelectTableList = createdField(SuperSelectTableListField);
export default SuperSelect;
