import { Button, Space } from "antd";
import StateTag from "@components/StateTag";
import { FormattedMessage, IntlProvider } from "@components/Intl";
import style from "@components/Filter/style.module.scss";
import classnames from "classnames";
import importMessages from "@components/Filter/locale";

const FilterValueDisplay = ({ value: filterValue, extraExpand, onChange }) => {
  return (
    <IntlProvider importMessages={importMessages} moduleName="Filter">
      <Space className={style["filter-title"]} align="top" size={16}>
        <span className={style["filter-label"]}>
          <FormattedMessage
            id="selectedText"
            moduleName="Filter"
            defaultMessage="您已选择"
          />
        </span>
        {/*<div className={style["filter-list"]}>*/}
          <div className={style["filter-line"]}>
            {filterValue.map(({ name, label, value }, index) => {
              return (
                <StateTag
                  key={name}
                  type="filterResult"
                  filterName={label}
                  text={
                    Array.isArray(value)
                      ? value
                          .map((item) => {
                            return item.label;
                          })
                          .join("，")
                      : value.label
                  }
                  closable
                  onClose={() => {
                    const newValue = filterValue.slice(0);
                    newValue.splice(index, 1);
                    onChange(newValue);
                  }}
                />
              );
            })}
            <Space size={4} className={classnames(style["un-expand-shadow"])}>
              {extraExpand}
              <Button size="small">
                <FormattedMessage
                  id="clearAllText"
                  moduleName="Filter"
                  defaultMessage="清空全部"
                />
              </Button>
            </Space>
            <Space size={4} className={classnames(style["un-expand"])}>
              {extraExpand}
              <Button
                size="small"
                onClick={() => {
                  onChange([]);
                }}
              >
                <FormattedMessage
                  id="clearAllText"
                  moduleName="Filter"
                  defaultMessage="清空全部"
                />
              </Button>
            </Space>

        </div>
        {/*</div>*/}
      </Space>
    </IntlProvider>
  );
};

export default FilterValueDisplay;
