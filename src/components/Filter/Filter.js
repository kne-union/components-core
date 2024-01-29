import { Provider } from "./context";
import useControlValue from "@kne/use-control-value";
import FilterLines from "./FilterLines";
import FilterValueDisplay from "./FilterValueDisplay";
import clone from "lodash/clone";
import classnames from "classnames";
import style from "./style.module.scss";
import { useMemo } from "react";
import { isNotEmpty } from "@components/Common";
import importMessages from "@components/FormInfo/locale";
import { IntlProvider } from "@components/Intl";

const Filter = (props) => {
  const { extraExpand, className, ...others } = props;
  const [valueBase, onChange] = useControlValue(props);

  const value = useMemo(() => {
    return valueBase.filter((item) => isNotEmpty(item.value));
  }, [valueBase]);

  const filterValue = useMemo(() => {
    return new Map(value.map((item) => [item.name, item]));
  }, [value]);

  return (
    <IntlProvider moduleName="Filter" importMessages={importMessages}>
      <Provider
        value={{
          value: filterValue,
          onChange: (item) => {
            const newFilterValue = clone(filterValue);
            item.value
              ? newFilterValue.set(item.name, item)
              : newFilterValue.delete(item.name);
            onChange?.(Array.from(newFilterValue.values()));
          },
        }}
      >
        <div className={classnames(style["filter"], className)}>
          <FilterLines {...others} />
          {value && value.length > 0 && (
            <FilterValueDisplay
              value={value}
              onChange={onChange}
              extraExpand={extraExpand}
            />
          )}
        </div>
      </Provider>
    </IntlProvider>
  );
};

Filter.defaultProps = {
  defaultValue: [],
};

export default Filter;
