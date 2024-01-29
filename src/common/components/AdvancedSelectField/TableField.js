import { Table } from "antd";
import classnames from "classnames";
import style from "./table.module.scss";

import createListField from "./createListField";

export default createListField({
  defaultProps: {
    overlayWidth: "450px",
  },
  renderList: ({ props, list, onSelect, value, setValue, itemIsSelected }) => {
    return (
      <Table
        className={style["list"]}
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
            ? {
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
