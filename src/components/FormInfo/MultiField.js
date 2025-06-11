import {useRef} from "react";
import {Button} from "antd";
import {GroupList, useFormContext} from "@kne/react-form-antd";
import {createWithIntl, useIntl} from "@components/Intl";
import Icon from "@components/Icon";
import get from "lodash/get";
import style from "./style.module.scss";
import classnames from "classnames";
import importMessages from "./locale";

const MultiField = createWithIntl({moduleName: "FormInfo", importMessages})(({
                                                                                 name,
                                                                                 label,
                                                                                 rule,
                                                                                 field,
                                                                                 defaultLength = 1,
                                                                                 minLength = 1,
                                                                                 maxLength,
                                                                                 ...props
                                                                             }) => {
    const ref = useRef(null);
    const CurrentFiled = field;
    const context = useFormContext();
    const {formData} = context;
    const allowAdd = !(maxLength && maxLength <= get(formData, `${name}.length`, 0));
    const {formatMessage} = useIntl({moduleName: "FormInfo"});
    return (<div className={classnames(style["mult-field"], "mult-field")}>
            <GroupList
                ref={ref}
                name={name}
                defaultLength={Math.max(defaultLength, minLength, 1)}
            >
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

                    return (<div
                            key={key}
                            className={classnames(style["mult-field-item"], "mult-field-item", {
                                [style["first-item"]]: index === 0,
                            })}
                        >
                            <CurrentFiled {...props} name={name} label={label} rule={rule}/>
                            <div className={classnames('form-info-mult-option')}>
                                <div
                                    className={classnames(style["react-form__field-label"], "react-form__field-label", "mult-field-delete--label")}
                                />
                                <Button
                                    icon={<Icon type="shanchu"/>}
                                    onClick={onRemove}
                                    disabled={length <= Math.max(minLength, 1)}
                                />
                            </div>
                        </div>);
                }}
            </GroupList>

            {allowAdd && (<div className={classnames('form-info-mult-add-btn')}><Button
                    className={style["mult-field-add-btn"]}
                    type="dashed"
                    onClick={() => ref.current.onAdd()}
                >
                    <Icon type="tianjia"/>
                    {formatMessage({id: "addSomeThing"}, {label})}
                </Button></div>)}
        </div>);
});

export default MultiField;
