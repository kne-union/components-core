import { useState } from "react";
import isNotEmpty from "@common/utils/isNotEmpty";
import FilterItem from "./FilterItem";
import style from "./style.module.scss";

const withFieldItem =
  (WrappedComponent) =>
  ({ value, onChange, label, ...props }) => {
    const [open, setOpen] = useState(false);
    return (
      <FilterItem label={label} open={open} active={isNotEmpty(value)}>
        <WrappedComponent
          {...props}
          className={style["filter-item-inner"]}
          value={value}
          onChange={onChange}
          valueType="all"
          onOpenChange={setOpen}
        />
      </FilterItem>
    );
  };

export default withFieldItem;
