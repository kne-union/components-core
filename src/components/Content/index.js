import { useLayoutEffect, useRef, useState } from "react";
import { Col, Row, Space } from "antd";
import classnames from "classnames";
import style from "./style.module.scss";

export const Label = ({ className, children, setWidth }) => {
  const ref = useRef(null);
  const setWidthRef = useRef(setWidth);
  setWidthRef.current = setWidth;
  useLayoutEffect(() => {
    const computed = () => {
      if (!ref.current) {
        return;
      }
      const { width } = ref.current.getBoundingClientRect();
      setWidth(width);
    };
    const resizeObserver = new ResizeObserver(computed);
    resizeObserver.observe(ref.current);
    computed();
    return () => {
      resizeObserver.disconnect();
    };
  }, [setWidth]);
  return (
    <div ref={ref} className={className}>
      {children}：
    </div>
  );
};

const Content = ({ list, labelAlign, col, gutter, className, size }) => {
  const labelWidthListRef = useRef([]);
  const [maxLabelWidth, setMaxLabelWidth] = useState(0);
  return (
    <Row
      data-testid="components-core-content"
      className={classnames(style["content"], "content", className, {
        [style["size-small"]]: size === "small",
      })}
      gutter={gutter}
    >
      {list
        .filter((item) => {
          if (typeof item.display === "function") {
            return item.display();
          }
          return item.display !== false;
        })
        .map(({ label, content, block }, index) => {
          return (
            <Col
              span={block === true ? 24 : 24 / col}
              key={index}
              className={style["item"]}
            >
              <Space
                key={index}
                className={classnames(style["item"], "content-item")}
              >
                {label ? (
                  <div
                    style={
                      maxLabelWidth && labelAlign !== "auto"
                        ? {
                            minWidth: maxLabelWidth,
                            textAlign: labelAlign,
                          }
                        : null
                    }
                  >
                    <Label
                      className={classnames(style["label"], "content-label")}
                      setWidth={(width) => {
                        labelWidthListRef.current[index] = width;
                        setMaxLabelWidth(
                          Math.max(...labelWidthListRef.current)
                        );
                      }}
                    >
                      {label}
                    </Label>
                  </div>
                ) : null}
                <div
                  className={classnames(
                    style["content-content"],
                    "content-content"
                  )}
                >
                  {content}
                </div>
              </Space>
            </Col>
          );
        })}
    </Row>
  );
};

Content.defaultProps = {
  labelAlign: "left",
  col: 1,
  gutter: 0,
  list: [],
};

export default Content;
