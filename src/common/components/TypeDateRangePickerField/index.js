import { DatePicker, Select, Space } from "antd";
import useControlValue from "@kne/use-control-value";
import dayjs from "dayjs";
import importMessages from "../locale";
import { createWithIntl, useIntl } from "@components/Intl";

const TypeDatePickerField = ({ ...props }) => {
  const { formatMessage } = useIntl({ moduleName: "Common" });
  const typeList = new Map([
    ["date", formatMessage({ id: "customTime" })],
    ["month", formatMessage({ id: "monthly" })],
    ["week", formatMessage({ id: "weekly" })],
  ]);
  const [value, onChange] = useControlValue(props);
  return (
    <Space.Compact>
      <Select
        style={{ width: "120px" }}
        value={value?.type || "date"}
        onChange={(typeValue) => {
          onChange((value) => {
            return {
              value: value?.value?.length
                ? [
                    dayjs(value.value[0]).startOf(typeValue || "date"),
                    dayjs(value.value[1]).endOf(typeValue || "date"),
                  ]
                : null,
              type: typeValue || "date",
            };
          });
        }}
        options={Array.from(typeList).map(([value, label]) => ({
          label,
          value,
        }))}
      />
      <DatePicker.RangePicker
        {...props}
        picker={value?.type || "date"}
        value={
          Array.isArray(value?.value) &&
          value.value.length === 2 &&
          value.value.map((item) => item && dayjs(item))
        }
        onChange={(dateValue) => {
          onChange((value) => {
            return Object.assign({ type: "date" }, value, {
              value: [
                dateValue[0] &&
                  new Date(
                    dateValue[0].startOf(value?.type || "date").valueOf()
                  ),
                dateValue[1] &&
                  new Date(dateValue[1].endOf(value?.type || "date").valueOf()),
              ],
            });
          });
        }}
      />
    </Space.Compact>
  );
};

export default createWithIntl({ importMessages, moduleName: "Common" })(
  TypeDatePickerField
);
