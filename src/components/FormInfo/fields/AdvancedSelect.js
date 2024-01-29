import { hooks } from "@kne/react-form-antd";
import {
  AdvancedSelectField,
  createListField,
  TableField,
  UserField,
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

export const createdList = ({ renderList, defaultProps }) =>
  createdField(
    createListField({
      renderList,
      defaultProps,
    })
  );

export const User = createdField(UserField);
export const Table = createdField(TableField);

const AdvancedSelect = createdField(AdvancedSelectField);
AdvancedSelect.createdList = createdList;
AdvancedSelect.User = User;
AdvancedSelect.Table = Table;
export default AdvancedSelect;
