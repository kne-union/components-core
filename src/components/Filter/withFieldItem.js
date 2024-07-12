import { useState } from "react";
import isNotEmpty from "@common/utils/isNotEmpty";
import FilterItem from "./FilterItem";
import style from "./style.module.scss";

const withFieldItem =
  (WrappedComponent) =>
  ({ value, onChange, interceptor, label, ...props }) => {
    const [open, setOpen] = useState(false);
    return (
      <FilterItem label={label} open={open} active={isNotEmpty(value)}>
        <WrappedComponent
          allowClear={false}
          {...props}
          className={style["filter-item-inner"]}
          value={
            typeof interceptor?.input === "function"
              ? interceptor.input(value)
              : value
          }
          onChange={
            typeof interceptor?.output === "function"
              ? (...args) => onChange(interceptor.output(...args))
              : onChange
          }
          valueType="all"
          onOpenChange={setOpen}
        />
      </FilterItem>
    );
  };

export default withFieldItem;
