import PopoverItem from "../PopoverItem";
import { Input } from "antd";
import get from "lodash/get";
import style from "../style.module.scss";

const InputFilterItem = ({
  label,
  value,
  onChange,
  placeholder,
  onValidate,
  overlayClassName,
  placement,
  onOpenChange,
  ...props
}) => {
  return (
    <PopoverItem
      label={label}
      value={value}
      onChange={onChange}
      {...{ onValidate, overlayClassName, placement, onOpenChange }}
    >
      {({ value, onChange }) => (
        <Input
          {...props}
          placeholder={placeholder || `请输入${label}`}
          className={style["filter-item-text"]}
          value={get(value, "value", "")}
          onChange={(e) =>
            onChange(
              e.target.value
                ? { label: e.target.value, value: e.target.value }
                : null
            )
          }
        />
      )}
    </PopoverItem>
  );
};

export default InputFilterItem;
