import { useFormContext } from "@kne/react-form-antd";

const FormItem = ({ children }) => {
  const { openApi, formData } = useFormContext();
  return children({ ...openApi, formData });
};

export default FormItem;
