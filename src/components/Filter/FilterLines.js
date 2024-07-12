import classnames from "classnames";
import { useState } from "react";
import Icon from "@components/Icon";
import style from "./style.module.scss";
import { Col, Row, Space } from "antd";
import { FormattedMessage, IntlProvider } from "@components/Intl";
import importMessages from "./locale";
import { useContext } from "./context";
import get from "lodash/get";

const Line = ({ list, children }) => {
  const { value, onChange } = useContext();
  return (
    <div className={style["filter-line"]}>
      {list.map((item, index) => {
        if (typeof item === "function") {
          return item((props) => {
            return {
              index,
              value: value
                ? get(value.get(props?.name), "value")
                : props?.value,
              onChange: onChange
                ? (value) =>
                    onChange({
                      name: props?.name,
                      label: props?.label,
                      value,
                    })
                : props?.onChange,
            };
          });
        }
        const ComponentItem = item.type;
        return (
          <ComponentItem
            {...Object.assign({}, item.props, {
              key: item.key || item.props.name || index,
              value: value
                ? get(value.get(item.props.name), "value")
                : item.props.value,
              onChange: onChange
                ? (value) =>
                    onChange({
                      name: item.props.name,
                      label: item.props.label,
                      value,
                    })
                : item.props.onChange,
            })}
          />
        );
      })}
      {children}
    </div>
  );
};

const FilterLines = ({
  className,
  list,
  displayLine,
  label,
  extra,
  children,
}) => {
  const hasMore = list.length > displayLine;
  const [isExpand, setIsExpand] = useState(false);

  return (
    <IntlProvider importMessages={importMessages} moduleName="Filter">
      <Space
        className={classnames(style["filter-title"], className)}
        align="top"
        size={16}
      >
        <span className={style["filter-label"]}>
          {label || (
            <FormattedMessage
              id="filterText"
              moduleName="Filter"
              defaultMessage="筛选"
            />
          )}
        </span>
        <Row justify="space-between" wrap={false} align="top">
          <Col className={style["filter-list"]} flex={1}>
            {list.slice(0, displayLine).map((item, index) => (
              <Line key={index} list={item}>
                {hasMore && isExpand === false && index === displayLine - 1 ? (
                  <Space
                    size={4}
                    className={classnames(
                      style["filter-item"],
                      style["option"]
                    )}
                    onClick={() => {
                      setIsExpand((value) => !value);
                    }}
                  >
                    <FormattedMessage
                      id="moreText"
                      moduleName="Filter"
                      defaultMessage="更多"
                    />
                    <Icon
                      className={style["filter-item-option-icon"]}
                      type="icon-arrow-thin-down"
                    />
                  </Space>
                ) : null}
              </Line>
            ))}
          </Col>
          <Col>{extra}</Col>
        </Row>
      </Space>
      <Space
        className={classnames(style["filter-title"], "filter-title-wrap")}
        align="center"
        size={16}
      >
        {children}
      </Space>
      <Space
        className={classnames(style["filter-title"], "filter-title-wrap", {
          [style["filter-title-hidden"]]: !(hasMore && isExpand),
        })}
        align="top"
        size={16}
      >
        <span className={style["filter-label"]}>
          <FormattedMessage
            id="moreText"
            moduleName="Filter"
            defaultMessage="更多"
          />
        </span>
        <div className={style["filter-list"]}>
          {list.slice(displayLine).map((item, index) => (
            <Line key={index} list={item}>
              {index === list.length - displayLine - 1 && (
                <>
                  <Space
                    size={4}
                    className={classnames(style["un-expand-shadow"])}
                  >
                    <Space
                      size={4}
                      className={classnames(
                        style["option"],
                        style["filter-item"]
                      )}
                    >
                      <FormattedMessage
                        id="toggleUpText"
                        moduleName="Filter"
                        defaultMessage="收起"
                      />
                      <Icon
                        className={style["filter-item-option-icon"]}
                        type="icon-arrow-thin-up"
                      />
                    </Space>
                  </Space>
                  <Space
                    size={4}
                    className={classnames(style["un-expand"])}
                    onClick={() => {
                      setIsExpand((value) => !value);
                    }}
                  >
                    <Space
                      size={4}
                      className={classnames(
                        style["option"],
                        style["filter-item"]
                      )}
                    >
                      <FormattedMessage
                        id="toggleUpText"
                        moduleName="Filter"
                        defaultMessage="收起"
                      />
                      <Icon
                        className={style["filter-item-option-icon"]}
                        type="icon-arrow-thin-up"
                      />
                    </Space>
                  </Space>
                </>
              )}
            </Line>
          ))}
        </div>
      </Space>
    </IntlProvider>
  );
};

FilterLines.defaultProps = {
  displayLine: 1,
};

export default FilterLines;
