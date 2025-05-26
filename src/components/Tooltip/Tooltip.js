import { Space, Tooltip as AntdTooltip } from "antd";
import classnames from "classnames";
import style from "./style.module.scss";

const Tooltip = ({
  overlayClassName,
  title,
  size,
  subtitle,
  content,
  importantInfo,
  importantInfoType,
  moreInfo,
  ...props
}) => {
  return (
    <AntdTooltip
      {...props}
      overlayClassName={classnames(overlayClassName, style["tooltip"], {
        [style["small"]]: size === "small",
        [style["large"]]: size === "large",
      })}
      title={
        <Space direction="vertical" className={style["popup-content"]}>
          {title && <div className={style["title"]}>{title}</div>}
          {importantInfo && (
            <div
              className={classnames(style["important-info"], {
                [style["success"]]: importantInfoType === "success",
                [style["warning"]]: importantInfoType === "warning",
                [style["error"]]: importantInfoType === "error",
              })}
            >
              {importantInfo}
            </div>
          )}
          {subtitle && <div className={style["sub-title"]}>{subtitle}</div>}
          {content && (
            <div
              className={classnames(style["content"], {
                [style["alone"]]: [
                  title,
                  subtitle,
                  importantInfo,
                  moreInfo,
                ].every((item) => !item),
              })}
            >
              {content}
            </div>
          )}
          {moreInfo && <div>{moreInfo}</div>}
        </Space>
      }
    />
  );
};

export default Tooltip;
