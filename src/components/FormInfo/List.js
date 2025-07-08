import {cloneElement} from "react";
import {SubList} from '@kne/react-form-plus';
import {Typography, Divider} from "antd";
import Icon from "@components/Icon";
import InfoPage from "@components/InfoPage";
import ConfirmButton from "@components/ConfirmButton";
import FormInfo from "./FormInfo";
import classnames from "classnames";
import importMessages from "./locale";
import {createWithIntl, FormattedMessage, useIntl} from "@components/Intl";
import style from "./style.module.scss";

const List = createWithIntl({moduleName: "FormInfo", importMessages})(({
                                                                           addText,
                                                                           className,
                                                                           important,
                                                                           outer = <Outer/>,
                                                                           renderChildren = (children) => children,
                                                                           deleteButtonProps,
                                                                           title,
                                                                           ...props
                                                                       }) => {
    const {formatMessage} = useIntl({moduleName: "FormInfo"});
    return <SubList {...props} listRender={({list, title, id, allowRemove, onRemove}) => {
        return <div key={id} className={classnames(style["list-item"], {
            [style["is-important"]]: important,
        })}>
            <FormInfo title={title} list={list} className={style["list-item-part"]} gap={16}
                      extra={<FormattedMessage id="delText" moduleName="FormInfo">
                          {(text) => allowRemove ? (<ConfirmButton
                              danger
                              className={"btn-no-padding"}
                              message={formatMessage({id: "delConfirm"}, {name: title})}
                              type="link"
                              onClick={() => {
                                  onRemove(id);
                              }}
                              {...Object.assign({}, deleteButtonProps)}
                          >
                              {deleteButtonProps?.children ? (deleteButtonProps?.children) : (<>
                                  <Icon type="icon-shanchu"/>
                                  {text}
                              </>)}
                          </ConfirmButton>) : null}
                      </FormattedMessage>}/>
            <Divider/>
        </div>
    }}>{(children, {allowAdd, onAdd}) => {
        return cloneElement(outer, {
            title, addText, className: classnames(className, style["list-part"]), allowAdd, add: ()=>onAdd({isUnshift:false}),
        }, renderChildren(children));
    }}</SubList>
});

const Outer = ({add, addText, className, allowAdd, ...props}) => {
    return (<InfoPage.Part
        {...props}
        className={className}
        extra={allowAdd && (<FormattedMessage id="addText" moduleName="FormInfo">
            {(text) => (<Typography.Text className={style["list-btn"]} onClick={add}>
                <Icon type="icon-tianjia"/>
                {addText || text}
            </Typography.Text>)}
        </FormattedMessage>)}
    />);
};

export default List;
