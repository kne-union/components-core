import * as reactFormAntd from "@kne/react-form-antd";
import {
  DatePicker as ReactDatePicker,
  DatePickerToday as ReactDatePickerToday,
  Input as ReactInput,
  InputNumber as ReactInputNumber,
  Select as ReactSelect,
  TextArea as ReactTextArea,
  TimePicker as ReactTimePicker,
  TreeSelect as ReactTreeSelect,
  Rate,
  Switch,
  Slider,
} from "@kne/react-form-antd";
import Form from "./Form";
import { FormattedMessage, useIntl } from "@components/Intl";
import { forwardRef } from "react";
import FormItem from "./FormItem";
import style from "./style.module.scss";
import AdvancedSelectField from "./fields/AdvancedSelect";
import AddressSelect, {
  AddressInput as AddressInputField,
} from "./fields/AddressSelect";
import Cascader from "./fields/Cascader";
import FunctionSelect from "./fields/FunctionSelect";
import IndustrySelect from "./fields/IndustrySelect";
import MoneyInput from "./fields/MoneyInput";
import PhoneNumber from "./fields/PhoneNumber";
import Upload from "./fields/Upload";
import Avatar from "./fields/Avatar";
import SalaryInput from "./fields/SalaryInput";
import InputUpperCaseField from "./fields/InputUpperCase";
import TypeDateRangePicker from "./fields/TypeDateRangePicker";
import TableInput from "./fields/TableInput";
import Text from "./fields/Text";
import ErrorTip from "./ErrorTip";

const withInputDefaultPlaceholder = (WrappedComponent) => {
  const TargetComponent = forwardRef(
    ({ placeholder, label, ...props }, ref) => (
      <FormattedMessage
        id="defaultInputPlaceholder"
        moduleName="FormInfo"
        values={{ label }}
      >
        {(text) => (
          <WrappedComponent
            {...props}
            ref={ref}
            label={label}
            placeholder={placeholder || text}
          />
        )}
      </FormattedMessage>
    )
  );
  Object.keys(WrappedComponent)
    .filter((key) => {
      return ["$$typeof", "render", "field"].indexOf(key) === -1;
    })
    .forEach((key) => {
      TargetComponent[key] = WrappedComponent[key];
    });

  return TargetComponent;
};

const withTextAreaDefaultPlaceholder =
  (WrappedComponent) =>
  ({ placeholder, label, className, ...props }) =>
    (
      <FormattedMessage
        id="defaultInputPlaceholder"
        moduleName="FormInfo"
        values={{ label }}
      >
        {(text) => (
          <div className={style["textarea-wrapped-component"]}>
            <WrappedComponent
              {...props}
              label={label}
              placeholder={placeholder || text}
            />
          </div>
        )}
      </FormattedMessage>
    );

const withSelectDefaultPlaceholder = (WrappedComponent) => {
  const TargetComponent = forwardRef(
    ({ placeholder, label, ...props }, ref) => (
      <FormattedMessage
        id="defaultSelectPlaceholder"
        moduleName="FormInfo"
        values={{ label }}
      >
        {(text) => (
          <WrappedComponent
            {...props}
            ref={ref}
            label={label}
            placeholder={placeholder || text}
          />
        )}
      </FormattedMessage>
    )
  );

  Object.keys(WrappedComponent)
    .filter((key) => {
      return ["$$typeof", "render", "field"].indexOf(key) === -1;
    })
    .forEach((key) => {
      TargetComponent[key] = WrappedComponent[key];
    });

  return TargetComponent;
};

export { default as ErrorTip } from "./ErrorTip";

export { default as FormItem } from "./FormItem";

// export { default as AdvancedSelect } from "./fields/AdvancedSelect";
export const AdvancedSelect = withSelectDefaultPlaceholder(AdvancedSelectField);

export { default as AddressSelect } from "./fields/AddressSelect";
export const AddressInput = withSelectDefaultPlaceholder(AddressInputField);

export {
  Cascader,
  FunctionSelect,
  IndustrySelect,
  MoneyInput,
  PhoneNumber,
  Upload,
  Avatar,
  SalaryInput,
  TableInput,
  Text,
  Rate,
  Switch,
  Slider,
  TypeDateRangePicker,
};
export const InputUpperCase = withInputDefaultPlaceholder(InputUpperCaseField);
export const Input = withInputDefaultPlaceholder(ReactInput);
Input.Password = withInputDefaultPlaceholder(ReactInput.Password);

export const TextArea = withTextAreaDefaultPlaceholder(ReactTextArea);

export const Select = withSelectDefaultPlaceholder(ReactSelect);

Select.Fetch = withSelectDefaultPlaceholder(ReactSelect.Fetch);
Select.Fetch.field = ReactSelect.Fetch.field;

export const InputNumber = withInputDefaultPlaceholder(ReactInputNumber);

export const TreeSelect = withSelectDefaultPlaceholder(ReactTreeSelect);
TreeSelect.Fetch = withSelectDefaultPlaceholder(ReactTreeSelect.Fetch);
TreeSelect.Fetch.field = ReactTreeSelect.Fetch.field;

export const TimePicker = withSelectDefaultPlaceholder(ReactTimePicker);

TimePicker.RangePicker = withSelectDefaultPlaceholder(
  ReactTimePicker.RangePicker
);

export const DatePicker = withSelectDefaultPlaceholder(ReactDatePicker);

DatePicker.MonthPicker = withSelectDefaultPlaceholder(
  ReactDatePicker.MonthPicker
);

DatePicker.RangePicker = withSelectDefaultPlaceholder(
  ReactDatePicker.RangePicker
);

DatePicker.WeekPicker = withSelectDefaultPlaceholder(
  ReactDatePicker.WeekPicker
);

export const DatePickerToday = ({
  placeholder,
  label,
  soFarText,
  ...props
}) => {
  const { formatMessage } = useIntl({ moduleName: "FormInfo" });
  return (
    <ReactDatePickerToday
      {...props}
      label={label}
      placeholder={[
        formatMessage({ id: "startDate" }),
        formatMessage({ id: "endDate" }),
      ]}
      soFarText={soFarText || formatMessage({ id: "soFarText" })}
    />
  );
};

export { Form };

export const formModule = Object.assign({}, reactFormAntd, {
  Input,
  InputUpperCase,
  TextArea,
  Select,
  InputNumber,
  TreeSelect,
  TimePicker,
  DatePicker,
  DatePickerToday,
  Form,
  FormItem,
  AdvancedSelect,
  AddressSelect,
  AddressInput,
  MoneyInput,
  PhoneNumber,
  Cascader,
  FunctionSelect,
  IndustrySelect,
  TypeDateRangePicker,
  Upload,
  Avatar,
  SalaryInput,
  TableInput,
  Text,
  Rate,
  Switch,
  Slider,
  ErrorTip,
});
