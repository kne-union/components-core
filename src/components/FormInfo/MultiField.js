import {Button} from "antd";
import {createWithIntl, useIntl} from "@components/Intl";
import Icon from "@components/Icon";
import style from "./style.module.scss";
import classnames from "classnames";
import importMessages from "./locale";
import {MultiField as MultiFieldBase} from '@kne/react-form-plus';


const MultiField = createWithIntl({moduleName: "FormInfo", importMessages})((props) => {
    const {formatMessage} = useIntl({moduleName: "FormInfo"});
    return <MultiFieldBase {...props} itemRender={(children, {id, index, allowRemove, onRemove}) => {
        return <div
            key={id}
            className={classnames(style["mult-field-item"], "mult-field-item", {
                [style["first-item"]]: index === 0,
            })}
        >
            {children}
            <div className={classnames('form-info-mult-option')}>
                <div
                    className={classnames(style["react-form__field-label"], "react-form__field-label", "mult-field-delete--label")}
                />
                <Button
                    icon={<Icon type="shanchu"/>}
                    onClick={onRemove}
                    disabled={!allowRemove}
                />
            </div>
        </div>
    }}>{(children, {allowAdd, onAdd}) => {
        return <div className={classnames(style["mult-field"], "mult-field")}>
            {children}
            {allowAdd && (<div className={classnames('form-info-mult-add-btn')}>
                <Button className={style["mult-field-add-btn"]} type="dashed" onClick={() => onAdd({isUnshift: false})}>
                    <Icon type="tianjia"/>
                    {formatMessage({id: "addSomeThing"}, {label: props.label})}
                </Button>
            </div>)}
        </div>
    }}</MultiFieldBase>;
});

export default MultiField;
