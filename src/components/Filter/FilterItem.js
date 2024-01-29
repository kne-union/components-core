import classnames from "classnames";
import { Space } from "antd";
import Icon from "@components/Icon";
import style from "./style.module.scss";

const FilterItem = ({ open, active, label, children }) => {
  return (
    <Space className={style["filter-item-wrap"]}>
      <div
        className={classnames(style["filter-item"], {
          [style["is-active"]]: active,
          [style["is-visited"]]: open,
        })}
      >
        <Space className={style["filter-item-label"]} size={4}>
          <div>{label}</div>
          <Icon
            className={style["filter-item-icon"]}
            type="icon-triangle-down"
          />
        </Space>
        <div className={style["filter-item-field"]}>{children}</div>
      </div>
    </Space>
  );
};

export default FilterItem;
