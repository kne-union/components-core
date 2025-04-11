import style from "./style.module.scss";
import Tooltip from "./tooltip";
import Icon from "@components/Icon";

const TooltipInfoLabel = ({ title, tooltipTitle }) => {
  return (
    <div>
      {title}
      {tooltipTitle ? (
        <Tooltip {...tooltipTitle}>
          <span>
            <Icon
              type="icon-xinxi-miaobian"
              className={style["title-info-icon"]}
              size={14}
            />
          </span>
        </Tooltip>
      ) : null}
    </div>
  );
};

export default TooltipInfoLabel;
