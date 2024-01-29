import { Card, Space } from "antd";
import classnames from "classnames";
import Collapse from "./Collapse";
import style from "./style.module.scss";

const Part = ({ className, title, extra, children, ...props }) => {
  return (
    <Card
      className={classnames(style["part"], className, {
        "no-title": !title,
      })}
      bordered={false}
      title={title}
      extra={extra}
      {...props}
    >
      {children}
    </Card>
  );
};

const InfoPage = ({ className, children }) => {
  return (
    <Space className={className} direction="vertical" size={24}>
      {children}
    </Space>
  );
};

InfoPage.Part = Part;
InfoPage.Collapse = Collapse;
export default InfoPage;
