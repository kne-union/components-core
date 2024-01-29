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
              overlayClassName: style["tooltip"],
              children: children,
            },
          }
        )
      }
    >
      {children}
    </Typography.Text>
  );
};

export default Ellipsis;
