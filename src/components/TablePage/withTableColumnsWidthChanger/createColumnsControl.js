import { Popover } from "antd";
import get from "lodash/get";
import ColumnsControlContent from "./ColumnsControlContent";
import style from "../style.module.scss";
import { useState } from "react";
import Icon from "@components/Icon";
import useColumnsSortable from "./useColumnsSortable";

const CreateColumnsControl = ({ columns, name, data, setData, ...props }) => {
  const [open, setOpen] = useState(false);
  const { popupColumns, columnMap, setColumns, onConfirm, onCancel, onReset } =
    useColumnsSortable({
      columns,
      name,
      initColumnsData: data,
      setData,
    });
  return (
    <Popover
      {...props}
      open={open}
      overlayClassName={style["columns-control-overlay"]}
      trigger="click"
      autoAdjustOverflow={false}
      placement="bottomRight"
      content={
        <ColumnsControlContent
          columns={popupColumns.map((item) => {
            const target = columnMap.get(item.id);
            return Object.assign({}, item, {
              name:
                get(target, "titleText") || get(target, "title") || "未命名列",
              fixed: get(target, "fixed"),
            });
          })}
          setColumns={(data) => {
            setColumns(
              data.map(({ id, width, hidden }) => ({ id, width, hidden }))
            );
          }}
          close={() => setOpen(false)}
          onConfirm={onConfirm}
          onCancel={onCancel}
          onReset={onReset}
        />
      }
      onOpenChange={(open) => setOpen(open)}
    >
      <span className={style["table-changer-setting"]}>
        <Icon type="icon-shezhi" />
      </span>
    </Popover>
  );
};

export default CreateColumnsControl;
