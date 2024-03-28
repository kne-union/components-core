import { Collapse as CollapseAntd } from "antd";
import Icon from "@components/Icon";
import style from "./style.module.scss";
import classnames from "classnames";

const Collapse = ({ children, className, ...props }) => {
  return (
    <CollapseAntd
      {...props}
      className={classnames(style["collapse"], "collapse", className)}
      expandIcon={({ isActive }) => (
        <Icon
          size={12}
          className={classnames({
            [style["is-active"]]: isActive,
            "is-active": isActive,
          })}
          type="icon-triangle-right"
        />
      )}
    >
      {children}
    </CollapseAntd>
  );
};

Collapse.Panel = CollapseAntd.Panel;

export default Collapse;
