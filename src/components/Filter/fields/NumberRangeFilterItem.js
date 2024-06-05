import PopoverItem from "../PopoverItem";
import { Input, InputNumber, Space } from "antd";
import get from "lodash/get";
import isNumber from "lodash/isNumber";
import style from "../style.module.scss";
import React from "react";

const computedFilterValue = (range, unit) => {
  if (!isNumber(range[0]) && !isNumber(range[1])) {
    return null;
  }

  return {
    label: ((range) => {
      if (isNumber(range[0]) && isNumber(range[1])) {
        return `${range[0]}-${range[1]}${unit || ""}`;
      }
      if (isNumber(range[0])) {
        return `${range[0]}${unit || ""}以上`;
      }
      if (isNumber(range[1])) {
        return `${range[1]}${unit || ""}以下`;
      }
    })(range),
    value: [range[0] || null, range[1] || null],
  };
};

const InputFilterItem = ({
  label,
  value,
  onChange,
  placeholder,
  onValidate,
  overlayClassName,
  placement,
  onOpenChange,
  unit,
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
        <Space.Compact>
          <InputNumber
            {...props}
            placeholder={placeholder || `请输入${label}`}
            className={style["filter-item-number-range"]}
            value={get(value, "value[0]", "")}
            onChange={(target) => {
              onChange(
                computedFilterValue([target, get(value, "value[1]")], unit)
              );
            }}
          />
          <Input
            style={{
              width: 30,
              borderLeft: 0,
              borderRight: 0,
              pointerEvents: "none",
            }}
            placeholder="~"
            disabled
          />
          <InputNumber
            {...props}
            placeholder={placeholder || `请输入${label}`}
            className={style["filter-item-number-range"]}
            value={get(value, "value[1]", "")}
            onChange={(target) => {
              onChange(
                computedFilterValue([get(value, "value[0]"), target], unit)
              );
            }}
          />
          {unit && (
            <Input
              style={{
                width: 40,
                borderLeft: 0,
              }}
              value="年"
              readOnly
            />
          )}
        </Space.Compact>
      )}
    </PopoverItem>
  );
};

InputFilterItem.defaultProps = {
  onValidate: (value) => {
    const range = get(value, "value");
    return !(
      range &&
      isNumber(range[0]) &&
      isNumber(range[1]) &&
      range[1] < range[0]
    );
  },
};

export default InputFilterItem;
