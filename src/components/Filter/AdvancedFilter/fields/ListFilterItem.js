import { Tag, App } from "antd";
import isEqual from "lodash/isEqual";
import * as fields from "../../fields";
import { useIntl } from "@components/Intl";

const { CheckableTag } = Tag;
const ListFilterItem = ({
  value,
  onChange,
  label,
  single,
  maxLength,
  items,
  custom,
}) => {
  const { message } = App.useApp();
  const { formatMessage } = useIntl({ moduleName: "Filter" });
  return (
    <>
      {items.map(({ label, value: itemValue }) => {
        return (
          <CheckableTag
            key={label}
            size="small"
            checked={
              single
                ? isEqual(itemValue, value?.value)
                : !!(value || []).find(({ value }) => isEqual(itemValue, value))
            }
            onChange={(checked) => {
              if (single) {
                onChange(checked ? { value: itemValue, label } : null);
                return;
              }
              const newValue = (value || []).slice(0);
              checked
                ? newValue.push({ value: itemValue, label })
                : (() => {
                    const index = newValue.find(({ value }) =>
                      isEqual(itemValue, value)
                    );
                    newValue.splice(index, 1);
                  })();
              if (newValue.length > maxLength) {
                message.error(
                  formatMessage(
                    { id: "maxSelectedCount" },
                    { count: maxLength }
                  )
                );
                return;
              }
              onChange(newValue);
            }}
          >
            {label}
          </CheckableTag>
        );
      })}
      {custom &&
        (() => {
          const ComponentItem = Object.values(fields).find(
            (item) => item === custom.type
          );
          if (!ComponentItem) {
            return null;
          }
          return (
            <ComponentItem
              {...custom.props}
              value={value}
              placeholder={`${formatMessage({ id: "pleaseInput" })}${label}`}
              onChange={onChange}
            />
          );
        })()}
    </>
  );
};

ListFilterItem.defaultProps = {
  single: false,
  maxLength: 5,
  items: [],
};

export default ListFilterItem;
