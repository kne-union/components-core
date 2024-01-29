import { DatePicker } from "antd";
import withFieldItem from "../withFieldItem";
import dayjs from "dayjs";

const DatePickerFilterItem = withFieldItem(
  ({ value, onChange, picker, ...props }) => {
    return (
      <DatePicker
        {...props}
        picker={picker}
        value={value && dayjs(value.value)}
        onChange={(value) => {
          const { format } = Object.assign({ format: "YYYY-MM-DD" }, props);
          value &&
            onChange({
              label:
                picker !== "date"
                  ? `${value.startOf(picker).format(format)}~${value
                      .endOf(picker)
                      .format(format)}`
                  : value.format(format),
              value: new Date(value.startOf(picker).valueOf()),
            });
        }}
      />
    );
  }
);

DatePickerFilterItem.defaultProps = "date";

export default DatePickerFilterItem;
