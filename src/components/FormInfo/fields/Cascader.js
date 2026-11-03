import { hooks } from "@kne/react-form-antd";
import { SuperSelectCascaderField, createTreeUtils } from "@components/Common";
const { useOnChange } = hooks;

const Cascader = (props) => {
  const render = useOnChange(
    Object.assign({}, { placeholder: "请选择" + props.label }, props)
  );
  return render(SuperSelectCascaderField);
};

Cascader.Field = SuperSelectCascaderField;
Cascader.createTreeUtils = createTreeUtils;

export { createTreeUtils };
export default Cascader;
