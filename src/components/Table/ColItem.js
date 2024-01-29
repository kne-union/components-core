import { useState } from "react";
import classnames from "classnames";
import columnsStyle from "./columns.module.scss";

const ColItem = ({
  type,
  item,
  isEmpty,
  emptyRender,
  hover,
  primary,
  children,
  width,
  style,
  onClick,
  colValue,
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <div
      style={Object.assign({}, style, { "--max-width": width + "px" })}
      className={classnames(
        columnsStyle["col-item"],
        columnsStyle[type],
        isEmpty
          ? null
          : {
              [columnsStyle["hover"]]: hover,
              [columnsStyle["primary"]]: primary,
              [columnsStyle["loading"]]: loading,
            }
      )}
      onClick={(e) => {
        if (typeof onClick === "function" && !isEmpty && !loading) {
          setLoading(true);
          Promise.resolve(
            onClick({ item, colItem: colValue, event: e })
          ).finally(() => {
            setLoading(false);
          });
        }
      }}
    >
      {isEmpty
        ? emptyRender({ type, item, hover, primary, children })
        : children}
    </div>
  );
};

ColItem.defaultProps = {
  emptyRender: () => "-",
};

export default ColItem;
