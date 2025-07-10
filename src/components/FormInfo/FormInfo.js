import {Row, Col} from "antd";
import {cloneElement} from "react";
import InfoPage from "@components/InfoPage";
import {useFlexBox} from "@components/FlexBox";
import {FormInfo as FormInfoBase} from '@kne/react-form-plus';
import style from "./style.module.scss";
import classnames from "classnames";

const FormInfo = ({
                      list = [],
                      groupArgs,
                      itemRender,
                      column = 2,
                      gap,
                      className,
                      outer = <InfoPage.Part/>,
                      children: renderChildren,
                      ...props
                  }) => {
    const isFlexBox = !(Number.isInteger(column) && column > 0);
    const {ref: flexBoxRef, column: flexBoxColumn} = useFlexBox(isFlexBox ? column : {});

    const renderInner = (column, notLayout) => {
        return <FormInfoBase list={list} column={column} groupArgs={groupArgs} itemRender={(children, props) => {
            return typeof itemRender === 'function' ? itemRender(children, props) :
                <Col span={props.span}>{children}</Col>;
        }}>{(children, props) => {
            return <Row
                gutter={[gap || 24, 0]}
                className={classnames({
                    [style["column-not-layout"]]: notLayout,
                })}
            >{typeof renderChildren === 'function' ? renderChildren(children, props) : children}</Row>
        }}</FormInfoBase>;
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

    return cloneElement(outer, Object.assign({}, props, {
        className: classnames(className, style["form-info"]),
    }), <>
        <div ref={flexBoxRef}/>
        {renderColumn()}
    </>);
};

export default FormInfo;
