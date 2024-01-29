import { useFormContext } from "@kne/react-form-antd";
import LoadingButton from "@components/LoadingButton";

const FormApiButton = ({ onClick, ...props }) => {
  const context = useFormContext();
  return (
    <LoadingButton
      {...props}
      onClick={(e) => {
        return onClick(context, e);
      }}
    />
  );
};

export default FormApiButton;
