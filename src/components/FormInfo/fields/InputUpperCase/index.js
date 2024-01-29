import { Input } from "antd";
import useControlValue from "@kne/use-control-value";
import { createWithRemoteLoader } from "@kne/remote-loader";

const InputUpperCaseField = ({ ...props }) => {
  const [value, onChange] = useControlValue(props);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => {
        onChange(
          e.target.value ? e.target.value.toUpperCase() : e.target.value,
          e
        );
      }}
    />
  );
};

const InputUpperCase = createWithRemoteLoader({
  modules: ["FormInfo@formModule"],
})(({ remoteModules, ...props }) => {
  const [formModule] = remoteModules;
  const { hooks } = formModule;
  const { useDecorator } = hooks;
  const render = useDecorator(
    Object.assign({ placeholder: `请输入${props.label || ""}` }, props)
  );
  return render(InputUpperCaseField);
});

InputUpperCase.field = InputUpperCaseField;

export default InputUpperCase;
