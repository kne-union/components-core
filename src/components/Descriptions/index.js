import { Col, Row } from "antd";
import classnames from "classnames";
import Features from "@components/Features";
import style from "./style.module.scss";

const Descriptions = ({ dataSource, isFull, className, ...props }) => {
  return (
    <Row {...props} className={classnames(style["descriptions"], className)}>
      {dataSource.map((colItem, colIndex) => {
        const _colItem = colItem.slice(0, 2).filter((item) => {
          if (typeof item.display === "function") {
            return item.display(item, dataSource);
          }
          return item.display !== false;
        });
        return _colItem
          .slice(0, 2)
          .map(({ label, content, featureId }, itemIndex) => {
            const render = (
              <Col
                span={24 / _colItem.length}
                className={classnames(
                  style["col-item"],
                  "descriptions-col-item"
                )}
                key={`${colIndex}-${itemIndex}`}
              >
                <Row
                  wrap={false}
                  className={classnames(
                    style["descriptions-item"],
                    "descriptions-item"
                  )}
                >
                  <Col
                    span={isFull ? 8 : 4 * _colItem.length}
                    className={classnames(
                      style["col-label"],
                      "descriptions-col-label"
                    )}
                  >
                    {label}
                  </Col>
                  <Col
                    span={isFull ? 16 : 24 - 4 * _colItem.length}
                    className={classnames(
                      style["col-content"],
                      "descriptions-col-content"
                    )}
                  >
                    {content}
                  </Col>
                </Row>
              </Col>
            );
            return featureId ? (
              <Features id={featureId} key={`${colIndex}-${itemIndex}`}>
                {render}
              </Features>
            ) : (
              render
            );
          });
      })}
    </Row>
  );
};

export default Descriptions;
