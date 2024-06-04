import { Tag, App } from "antd";
import isEqual from "lodash/isEqual";

const { CheckableTag } = Tag;
const ListFilterItem = ({ value, onChange, single, maxLength, items }) => {
  const { message } = App.useApp();
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
                message.error(`最多选择${maxLength}个`);
                return;
              }
              onChange(newValue);
            }}
          >
            {label}
          </CheckableTag>
        );
      })}
    </>
  );
};

ListFilterItem.defaultProps = {
  single: false,
  maxLength: 5,
  items: [],
};

export default ListFilterItem;
