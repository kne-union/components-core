import { FormattedMessage } from "@components/Intl";
import withFieldItem from "../withFieldItem";
import AdvancedSelectField, {
  UserField,
} from "@common/components/AdvancedSelectField";
import FunctionSelectField from "@common/components/FunctionSelectField";
import AddressSelectField from "@common/components/AddressSelectField";
import IndustrySelectField from "@common/components/IndustrySelectField";
import CascaderField from "@common/components/CascaderField";
import TreeField from "@common/components/TreeField";
import InputFilterItemField from "./InputFilterItem";

const withInputDefaultPlaceholder =
  (WrappedComponent) =>
  ({ placeholder, label, ...props }) =>
    (
      <FormattedMessage
        id="defaultInputPlaceholder"
        moduleName="Filter"
        values={{ label }}
      >
        {(text) => {
          return (
            <WrappedComponent
              {...props}
              label={label}
              placeholder={placeholder || text}
            />
          );
        }}
      </FormattedMessage>
    );

export const AdvancedSelectFilterItem = withFieldItem(AdvancedSelectField);
export const UserFilterItem = withFieldItem(UserField);
export const FunctionSelectFilterItem = withFieldItem(FunctionSelectField);
export const IndustrySelectFilterItem = withFieldItem(IndustrySelectField);

export const CityFilterItem = withFieldItem(AddressSelectField);

export const CascaderFilterItem = withFieldItem(CascaderField);

export const TreeFilterItem = withFieldItem(TreeField);
export const InputFilterItem =
  withInputDefaultPlaceholder(InputFilterItemField);

export { default as DatePickerFilterItem } from "./DatePickerFilterItem";
export { default as DateRangePickerFilterItem } from "./DateRangePickerFilterItem";
export { default as TypeDateRangePickerFilterItem } from "./TypeDateRangePickerFilterItem";
