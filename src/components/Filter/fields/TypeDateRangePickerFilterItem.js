import PopoverItem from "../PopoverItem";
import TypeDateRangePickerField from "@common/components/TypeDateRangePickerField";
import get from "lodash/get";
import style from "../style.module.scss";
import dayjs from "dayjs";

const TypeDateRangePickerFilterItem = ({
  label,
  value,
  onChange,
  ...props
}) => {
  return (
    <PopoverItem
      label={label}
      value={value}
      onChange={onChange}
      onValidate={(item) => {
        const value = item?.value;
        return (
          value?.type && Array.isArray(value?.value) && value.value.length === 2
        );
      }}
    >
      {({ value, onChange }) => (
        <TypeDateRangePickerField
          {...props}
          className={style["filter-item-text"]}
          value={get(value, "value")}
          onChange={(pickerValue) => {
            const { format } = Object.assign({ format: "YYYY-MM-DD" }, props);
            const value = pickerValue?.value || [];
            onChange({
              label: (() => {
                if (value[0] && !value[1]) {
                  return `${dayjs(value[0]).format(format)}以后`;
                }
                if (!value[0] && value[1]) {
                  return `${dayjs(value[1]).format(format)}以前`;
                }
                if (value[0] && value[1]) {
                  return `${dayjs(value[0]).format(format)}~${dayjs(
                    value[1]
                  ).format(format)}`;
                }
                return "";
              })(),
              value: pickerValue,
            });
          }}
        />
      )}
    </PopoverItem>
  );
};

export default TypeDateRangePickerFilterItem;
