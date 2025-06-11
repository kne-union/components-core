import {cloneElement, useRef} from "react";
import {Button, Divider, Typography} from "antd";
import ConfirmButton from "@components/ConfirmButton";
import Icon from "@components/Icon";
import InfoPage from "@components/InfoPage";
import {GroupList, useFormContext} from "@kne/react-form-antd";
import FormInfo from "./FormInfo";
import classnames from "classnames";
import importMessages from "./locale";
import {createWithIntl, FormattedMessage, useIntl} from "@components/Intl";
import get from "lodash/get";
import style from "./style.module.scss";

const List = createWithIntl({moduleName: "FormInfo", importMessages})(({
                                                                           title,
                                                                           addText,
                                                                           minLength = 0,
                                                                           isUnshift = true,
                                                                           maxLength,
                                                                           defaultLength = 1,
                                                                           label,
                                                                           name,
                                                                           beforeAdd,
                                                                           afterDelete,
                                                                           column,
                                                                           list,
                                                                           listRender,
                                                                           itemTitle,
                                                                           outer = <Outer/>,
                                                                           renderChildren = (children) => children,
                                                                           className,
                                                                           important,
                                                                           deleteButtonProps,
                                                                       }) => {
    const groupRef = useRef(null);
    const context = useFormContext();
    const {formData} = context;
    const allowAdd = !(maxLength && maxLength <= get(formData, `${name}.length`, 0));
    const {formatMessage} = useIntl({moduleName: "FormInfo"});
    const addHandler = () => {
        if (typeof beforeAdd === "function" ? beforeAdd(name, context, {
            isUnshift, group: groupRef.current,
        }) !== false : true) {
            groupRef.current.onAdd({isUnshift});
        }
    };
    return (<>
        {cloneElement(outer, {
            title,
            addText,
            className: classnames(className, style["list-part"]),
            allowAdd: isUnshift && allowAdd,
            add: addHandler,
        }, renderChildren(<GroupList name={name} defaultLength={defaultLength} ref={groupRef}>
            {(...groupArgs) => {
                //这里兼容一下新老版本
                const {
                    id: key, index, onRemove, length,
                } = ((groupArgs) => {
                    if (typeof groupArgs[0] === "object") {
                        return groupArgs[0];
                    }
                    const [key, {index, onRemove, length}] = groupArgs;
                    return {id: key, index, onRemove, length};
                })(groupArgs);

                const formInfoProps = {
                    column,
                    list: typeof list === "function" ? list(...groupArgs, context) : list,
                    title: typeof itemTitle === "function" ? itemTitle({
                        index, key, onRemove,
                    }) : itemTitle,
                    groupArgs,
                    extra: (<FormattedMessage id="delText" moduleName="FormInfo">
                        {(text) => !(minLength && minLength >= length) ? (<ConfirmButton
                            danger
                            className={"btn-no-padding"}
                            message={formatMessage({id: "delConfirm"}, {name: label || title})}
                            type="link"
                            onClick={() => {
                                onRemove(key);
                                afterDelete && afterDelete(...groupArgs, context);
                            }}
                            {...Object.assign({}, deleteButtonProps)}
                        >
                            {deleteButtonProps?.children ? (deleteButtonProps?.children) : (<>
                                <Icon type="icon-shanchu"/>
                                {text}
                            </>)}
                        </ConfirmButton>) : null}
                    </FormattedMessage>),
                };
                return (<div
                    key={key}
                    className={classnames(style["list-item"], {
                        [style["is-important"]]: important,
                    })}
                >
                    {typeof listRender === "function" ? (listRender(formInfoProps)) : (<FormInfo
                        {...formInfoProps}
                        className={style["list-item-part"]}
                        gap={16}
                    />)}
                    <Divider/>
                </div>);
            }}
        </GroupList>))}

        {!isUnshift && allowAdd ? (<FormattedMessage id="addText" moduleName="FormInfo">
            {(text) => (<div className={classnames('form-info-list-add-btn')}><Button onClick={addHandler}>
                <Icon type="icon-tianjia"/>
                {addText || text}
            </Button></div>)}
        </FormattedMessage>) : null}

    </>);
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
