import { DatePicker } from "antd";
import withFieldItem from "../withFieldItem";
import dayjs from "dayjs";

const DateRangePickerFilterItem = withFieldItem(
  ({ value, onChange, ...props }) => {
    return (
      <DatePicker.RangePicker
        {...props}
        allowEmpty={[false, false]}
        value={
          value &&
          Array.isArray(value.value) &&
          value.value.length === 2 &&
          value.value.map((item) => dayjs(item))
        }
        onChange={(value) => {
          const { format } = Object.assign({ format: "YYYY-MM-DD" }, props);
          onChange({
            label: value.map((item) => item.format(format)).join("~"),
            value: value.map((item) => new Date(item.valueOf())),
          });
        }}
      />
    );
  }
);

export default DateRangePickerFilterItem;
