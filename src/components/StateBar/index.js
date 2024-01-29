import { Tabs } from "antd";
import classnames from "classnames";
import style from "./style.module.scss";

/**
 *
 * @param className
 * @param type 'tab' | 'radio' | 'step'
 * @param stateOption
 * @param isInner
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const StateBar = ({
  className,
  type = "tab",
  stateOption = [],
  isInner,
  ...props
}) => {
  return (
    <Tabs
      {...props}
      data-testid={"components-core-state-bar"}
      className={classnames(
        style["state-bar"],
        style[`tab-${type}-control`],
        className,
        {
          [style["inner-state-bar"]]: isInner,
          [style["has-children"]]: stateOption.some((item) => !!item.children),
        }
      )}
      style={{ "--total-count": stateOption.length }}
      animated={false}
      items={stateOption.map(({ tab, label, key, ...props }) => {
        return { label: tab || label, key, ...props };
      })}
    />
  );
};

export default StateBar;
