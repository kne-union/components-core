import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const calculateSize = (size) => {
  if (/^[1-9]+[0-9]*]*$/.test(size.toString())) {
    size += "px";
  }
  return size;
};

const calculateType = (prefixType, prefix, colorful) => {
  if (prefix === "icon-" || prefix === "") {
    return (
      (colorful ? "icon-color-" : "icon-") +
      prefixType.replace(/^icon-(color-)?/, "")
    );
  }
  return prefix + prefixType;
};

const Iconfont = ({
  type,
  colorful,
  className,
  size,
  style,
  prefix,
  ...other
}) => {
  const fontClass = calculateType(type, prefix, colorful),
    computedClassName = classnames(
      className,
      {
        iconfont: !colorful,
        "iconfont--color": colorful,
      },
      fontClass
    ),
    computedStyle = Object.assign(
      {},
      style,
      size ? { fontSize: calculateSize(size) } : {}
    );
  return colorful ? (
    <svg
      {...other}
      data-testid="components-core-iconfont"
      className={computedClassName}
      style={computedStyle}
    >
      <use xlinkHref={`#${type}`} style={{ pointerEvents: "none" }} />
    </svg>
  ) : (
    <i
      {...other}
      data-testid="components-core-iconfont"
      className={computedClassName}
      style={computedStyle}
    />
  );
};

Iconfont.defaultProps = {
  colorful: false,
  prefix: "",
};

Iconfont.propTypes = {
  colorful: PropTypes.bool,
  prefix: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default Iconfont;
