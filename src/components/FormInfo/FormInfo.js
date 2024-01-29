import { Col, Row } from "antd";
import InfoPage from "@components/InfoPage";
import { useFlexBox } from "@components/FlexBox";
import FieldList from "./FieldList";

const FormInfo = ({ list, groupArgs, column, gap, ...props }) => {
  const { ref: flexBoxRef, column: flexBoxColumn } = useFlexBox();

  const renderInner = (column) => {
    return (
      <Row gutter={[gap || 24, 0]}>
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
    if (Number.isInteger(column) && column > 0) {
      return renderInner(column);
    }
    if (flexBoxColumn) {
      return renderInner(flexBoxColumn.col);
    }

    return renderInner(2);
  };

  return (
    <InfoPage.Part {...props}>
      <div ref={flexBoxRef}>{renderColumn()}</div>
    </InfoPage.Part>
  );
};

FormInfo.defaultProps = {
  column: 2,
  list: [],
};

export default FormInfo;
