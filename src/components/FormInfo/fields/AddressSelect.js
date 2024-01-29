import { hooks } from "@kne/react-form-antd";
import { AddressInputField, AddressSelectField } from "@components/Common";

const { useOnChange, useDecorator } = hooks;
const AddressSelect = (props) => {
  const render = useOnChange(
    Object.assign({}, { placeholder: "请选择" + props.label }, props)
  );
  return render(AddressSelectField);
};

AddressSelect.Field = AddressSelectField;
AddressSelect.AddressEnum = AddressSelectField.AddressEnum;
AddressSelect.createAddressApi = AddressSelectField.createAddressApi;
AddressSelect.withAddressApi = AddressSelectField.withAddressApi;

export default AddressSelect;

export const AddressInput = (props) => {
  const render = useDecorator(
    Object.assign(
      {},
      {
        placeholder: "请选择" + props.label,
        inputPlaceholder: "请输入" + props.label,
      },
      props
    )
  );
  return render(AddressInputField);
};

AddressInput.Field = AddressInputField;
