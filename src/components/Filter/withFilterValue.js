import { useContext } from "./context";
import get from "lodash/get";

const withFilterValue = (WrappedComponent) => {
  return ({ name, label, ...props }) => {
    const { value, onChange } = useContext();
    return (
      <WrappedComponent
        {...props}
        label={label}
        onChange={
          onChange
            ? (value) =>
                onChange({
                  name,
                  label,
                  value,
                })
            : props.onChange
        }
        value={value ? get(value.get(name), "value") : props.value}
      />
    );
  };
};

export default withFilterValue;
