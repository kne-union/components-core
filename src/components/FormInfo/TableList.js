import {Col, Row, Button, Typography} from "antd";
import Icon from '@components/Icon';
import classnames from "classnames";
import style from "./style.module.scss";
import {TableList as TableListBase} from '@kne/react-form-plus';
import InfoPage from "@components/InfoPage";
import {createWithIntl, useIntl} from "@components/Intl";
import importMessages from "./locale";

const TableList = createWithIntl({moduleName: "FormInfo", importMessages})(({className, ...props}) => {
    const {formatMessage} = useIntl({moduleName: "FormInfo"});
    return <div className={classnames(className, style['table-list'])}>
        <TableListBase {...props}
                       className={classnames(className, style["table-list"])}
                       headerRender={(children, {width}) => {
                           return <Row
                               wrap={false}
                               className={style["table-list-header"]}
                               style={{
                                   "--col-width": width,
                               }}
                           >
                               {children}
                               <Col
                                   className={style["table-list-extra"]}></Col>
                           </Row>
                       }} headerItemRender={(children, {
            id, isReq
        }) => {
            return <Col key={id} className={classnames({
                [style["is-req"]]: isReq,
            })}>
                {children}
            </Col>
        }} listRender={(children, {id, width, onRemove, allowRemove}) => {
            return <Row key={id} wrap={false} style={{
                "--col-width": width,
            }}>
                {children}
                <Col className={style["table-list-extra"]}><Button type="link" onClick={onRemove} danger
                                                                   disabled={!allowRemove}><span><Icon
                    type="shanchu"/>{formatMessage({id: 'delText'})}</span></Button></Col>
            </Row>
        }} itemRender={(children) => {
            return <Col className={style["table-list-field"]} flex={1}>
                {children}
            </Col>
        }}>{(children, {title, allowAdd, onAdd}) => {
            return <InfoPage.Part title={title} className={classnames(style["table-list-inner"])}
                                  extra={allowAdd && <Typography.Link className={style["list-btn"]}
                                                                      onClick={() => onAdd({isUnshift: false})}>
                                      <Icon type="tianjia"/>{formatMessage({id: 'addText'})}
                                  </Typography.Link>}>
                {children}
            </InfoPage.Part>
        }}</TableListBase></div>;
});

export default TableList;
