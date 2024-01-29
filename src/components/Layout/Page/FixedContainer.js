import style from "../style.module.scss";
import classnames from "classnames";

const FixedContainer = ({ className, isFixed, children }) => {
  if (isFixed) {
    return (
      <div
        className={classnames(
          className,
          "fixed-container",
          style["fixed-container"],
          {
            [style["is-fixed"]]: isFixed,
          }
        )}
      >
        {children}
      </div>
    );
  }
  return (
    <div
      className={classnames(
        className,
        "fixed-container",
        style["fixed-container"]
      )}
    >
      {children}
    </div>
  );
};

export default FixedContainer;
