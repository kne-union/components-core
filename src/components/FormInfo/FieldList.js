import { Col, Row } from "antd";
import { useFormContext } from "@kne/react-form-antd";
import Features from "@components/Features";
import { Fragment, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Tooltip from "@components/Tooltip";
import Icon from "@components/Icon";
import classnames from "classnames";
import style from "./style.module.scss";

const FieldList = ({ list, groupArgs, itemRender }) => {
  const context = useFormContext();
  const contextApi = Object.assign({}, context, groupArgs ? { groupArgs } : {});
  const hiddenRef = useRef(null);
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setIsMount(true);
  }, []);

  return (
    <>
      <div ref={hiddenRef} style={{ display: "none" }} />
      {list
        .filter((item) => {
          if (typeof item.props.display === "function") {
            return item.props.display(contextApi);
          }
          return item.props.display !== false;
        })
        .map((item, index) => {
          const key =
            item.props.name + index ||
            (groupArgs && groupArgs[0] + index) ||
            index;
          const targetProps = { key, list, props: item.props },
            componentProps = Object.assign({}, item.props),
            ComponentItem = item.type;
          [
            "display",
            "block",
            "hidden",
            "setExtraProps",
            "isBlock",
            "featureId",
            // "tips",
          ].forEach((key) => {
            if (item.props.hasOwnProperty(key)) {
              targetProps[key] = item.props[key];
            }
            delete componentProps[key];
          });

          if (targetProps.hasOwnProperty("isBlock")) {
            componentProps["block"] = targetProps.isBlock;
          }

          const innerComponent = (
            <ComponentItem
              {...Object.assign(
                {},
                componentProps,
                typeof targetProps.setExtraProps === "function"
                  ? targetProps.setExtraProps({
                      props: componentProps,
                      contextApi,
                    })
                  : {}
              )}
              onChange={(...args) => {
                return (
                  item.props.onChange &&
                  item.props.onChange(...args, contextApi)
                );
              }}
            />
          );
          const inner = targetProps.hidden
            ? isMount && createPortal(innerComponent, hiddenRef.current)
            : itemRender(
                targetProps.tips ? (
                  <Row gutter={8} align="top">
                    <Col flex={1}>{innerComponent}</Col>
                    <Col>
                      <Tooltip content={targetProps.tips}>
                        <span
                          className={classnames(style["field-tips"], {
                            [style["label-hidden"]]: componentProps.labelHidden,
                          })}
                        >
                          <Icon type="icon-xinxi-miaobian" />
                        </span>
                      </Tooltip>
                    </Col>
                  </Row>
                ) : (
                  innerComponent
                ),
                targetProps
              );
          return (
            <Fragment key={key}>
              {targetProps.hasOwnProperty("featureId") ? (
                <Features id={targetProps.featureId} key={key}>
                  {inner}
                </Features>
              ) : (
                inner
              )}
            </Fragment>
          );
        })}
    </>
  );
};

export default FieldList;
