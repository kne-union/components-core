import { Table } from "antd";
import classnames from "classnames";
import style from "./table.module.scss";

import createListField from "./createListField";
import listStyle from "./list.module.scss";

export default createListField({
  defaultProps: {
    overlayWidth: "450px",
  },
  renderList: ({
    props,
    list,
    onSelect,
    value,
    setValue,
    itemIsSelected,
    isSelectedAll,
  }) => {
    return (
      <Table
        className={classnames(style["list"], listStyle["list"], {
          [listStyle["is-selected-all"]]: isSelectedAll,
          [style["is-selected-all"]]: isSelectedAll,
        })}
        size="small"
        dataSource={list}
        columns={props.columns}
        rowClassName={(item) =>
          classnames({
            "ant-table-row-selected": itemIsSelected(item),
          })
        }
        rowKey={props.rowKey || "value"}
        pagination={false}
        rowSelection={
          !props.single
            ? isSelectedAll
              ? {
                  selectedRowKeys: list.map(({ value }) => value),
                  getCheckboxProps: () => {
                    return { disabled: true };
                  },
                }
              : {
                  selectedRowKeys: value,
                  onChange: (values) => {
                    setValue(values);
                  },
                }
            : null
        }
        sticky
        onRow={(item) => {
          return {
            onClick: () => onSelect(item),
          };
        }}
      />
    );
  },
});
