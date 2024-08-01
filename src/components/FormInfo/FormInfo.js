import { Col, Row } from "antd";
import { cloneElement } from "react";
import InfoPage from "@components/InfoPage";
import { useFlexBox } from "@components/FlexBox";
import FieldList from "./FieldList";
import style from "./style.module.scss";
import classnames from "classnames";

const FormInfo = ({
  list,
  groupArgs,
  column,
  gap,
  className,
  outer,
  ...props
}) => {
  const isFlexBox = !(Number.isInteger(column) && column > 0);
  const { ref: flexBoxRef, column: flexBoxColumn } = useFlexBox(
    isFlexBox ? column : {}
  );

  const renderInner = (column, notLayout) => {
    return (
      <Row
        gutter={[gap || 24, 0]}
        className={classnames({
          [style["column-not-layout"]]: notLayout,
        })}
      >
        <FieldList
          list={list}
          groupArgs={groupArgs}
          itemRender={(children, targetProps) => {
            return (
              <Col
                span={
                  targetProps.block === true
                    ? 24
                    : Math.round(24 / (column || 1))
                }
              >
                {children}
              </Col>
            );
          }}
        />
      </Row>
    );
  };

  const renderColumn = () => {
    if (!isFlexBox) {
      return renderInner(column);
    }
    if (flexBoxColumn) {
      return renderInner(flexBoxColumn.col);
    }

    return renderInner(2, true);
  };

  return cloneElement(
    outer,
    Object.assign({}, props, {
      className: classnames(className, style["form-info"]),
    }),
    <>
      <div ref={flexBoxRef} />
      {renderColumn()}
    </>
  );
};

FormInfo.defaultProps = {
  column: 2,
  list: [],
  outer: <InfoPage.Part />,
};

export default FormInfo;
