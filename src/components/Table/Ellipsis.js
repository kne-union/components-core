import { Typography } from "antd";
import style from "./style.module.scss";

const Ellipsis = ({ children, ellipsis }) => {
  return (
    <Typography.Text
      ellipsis={
        ellipsis &&
        Object.assign(
          {},
          {
            tooltip: {
              rootClassName: style["tooltip"],
              children: children,
            },
          },
          typeof ellipsis === "object" ? ellipsis : {}
        )
      }
    >
      {children}
    </Typography.Text>
  );
};

export default Ellipsis;
