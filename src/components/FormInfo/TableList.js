import List from "./List";
import FieldList from "./FieldList";
import { Col, Row } from "antd";
import clone from "lodash/clone";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import classnames from "classnames";
import style from "./style.module.scss";

const TableHeader = forwardRef((props, ref) => {
  const [headers, setHeaders] = useState(new Map());
  useImperativeHandle(
    ref,
    () => {
      return (targetProps) => {
        setTimeout(() => {
          setHeaders((headers) => {
            if (headers.has(targetProps.key)) {
              return headers;
            }
            const newHeaders = clone(headers);
            newHeaders.set(targetProps.key, targetProps.props);
            return newHeaders;
          });
        });
      };
    },
    []
  );

  return (
    <Row
      wrap={false}
      className={style["table-list-header"]}
      style={{
        "--col-width": `${100 / headers.size}%`,
      }}
    >
      {Array.from(headers).map(([key, { label, rule }]) => (
        <Col
          key={key}
          className={classnames({
            [style["is-req"]]: (rule || "").split(" ").indexOf("REQ") === 0,
          })}
        >
          {label}
        </Col>
      ))}
      <Col className={style["table-list-extra"]}></Col>
    </Row>
  );
});

const TableList = ({ list, className, ...props }) => {
  const headerRef = useRef(null);
  return (
    <List
      {...props}
      className={classnames(className, style["table-list"])}
      list={list}
      renderChildren={(children) => (
        <div className={style["table-list-inner"]}>
          <TableHeader ref={headerRef} />
          {children}
        </div>
      )}
      listRender={({ list, groupArgs, extra, key }) => {
        return (
          <Row
            key={key}
            wrap={false}
            align="middle"
            style={{
              "--col-width": `${100 / list.length}%`,
            }}
          >
            <FieldList
              list={list}
              groupArgs={groupArgs}
              itemRender={(children, targetProps) => {
                headerRef.current(targetProps);
                return (
                  <Col className={style["table-list-field"]} flex={1}>
                    {children}
                  </Col>
                );
              }}
            />
            <Col className={style["table-list-extra"]}>{extra}</Col>
          </Row>
        );
      }}
    />
  );
};

export default TableList;
