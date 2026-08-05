import {forwardRef} from "react";
import {hooks} from "@kne/react-form-antd";
import {
    SelectFunction as SelectFunctionBase,
    SelectIndustry as SelectIndustryBase,
    SelectAddress as SelectAddressBase,
    FunctionEnum,
    IndustryEnum,
    AddressEnum,
    createAddressApi,
    EnumDisplay,
    enumItemsToSelectValue,
    enumItemToSelectValue,
    addressEnumToSelectValue,
    addressEnumToSelectValueSingle,
} from "@kne/super-select-plus";
import {SelectedTagList} from "@kne/super-select";
import Modal from "@components/Modal";
import {Col, Input, Row} from "antd";
import useControlValue from "@kne/use-control-value";
import useSimulationBlur from "@kne/use-simulation-blur";
import get from "lodash/get";
import pick from "lodash/pick";
import omit from "lodash/omit";
import "@kne/super-select/dist/index.css";
import "@kne/super-select-plus/dist/index.css";

const {useOnChange, useDecorator} = hooks;

const renderModal = (contextProps) => {
    const {props, open, onOpenChange, value, onComplete} = contextProps;
    const {placeholder, children, showSelectedTag, onConfirm} = props;
    return (
        <Modal
            title={placeholder}
            open={open}
            onClose={() => {
                onOpenChange(false);
            }}
            footer={showSelectedTag && <SelectedTagList/>}
            onConfirm={() => {
                onComplete();
                if (typeof onConfirm === "function") {
                    return onConfirm(value);
                }
            }}
        >
            {children(contextProps)}
        </Modal>
    );
};

const createdField = (WrappedComponent) => {
    const Field = (props) => {
        const render = useOnChange(Object.assign({}, {placeholder: "请选择" + (props.label || "")}, props));
        return render(WrappedComponent);
    };

    Field.field = Field.Field = WrappedComponent;
    Object.keys(WrappedComponent).forEach((key) => {
        if (["$$typeof", "render", "displayName", "defaultProps"].indexOf(key) === -1) {
            Field[key] = WrappedComponent[key];
        }
    });
    return Field;
};

const withRenderModal = (Component) =>
    forwardRef((p, ref) => {
        return <Component {...p} ref={ref} renderModal={p.renderModal || renderModal}/>;
    });

const SelectFunctionField = withRenderModal(SelectFunctionBase);
SelectFunctionField.Enum = FunctionEnum;
SelectFunctionField.defaultData = SelectFunctionBase.defaultData;

const SelectIndustryField = withRenderModal(SelectIndustryBase);
SelectIndustryField.Enum = IndustryEnum;
SelectIndustryField.defaultData = SelectIndustryBase.defaultData;

const SelectAddressField = withRenderModal(SelectAddressBase);
SelectAddressField.Enum = AddressEnum;
SelectAddressField.AddressEnum = AddressEnum;
SelectAddressField.createAddressApi = createAddressApi;
SelectAddressField.defaultData = SelectAddressBase.defaultData;

const AddressInputField = (props) => {
    const {isPopup, size, disabled, inputPlaceholder, onBlur, className, ...others} = props;
    const [value, setValue] = useControlValue(props);
    const addressProps = ["isPopup", "searchPlaceholder", "placeholder", "overlayWidth", "api", "dataFormat", "renderModal"];
    const ref = useSimulationBlur((e) => {
        onBlur && onBlur(e);
    });
    return (
        <div ref={ref}>
            <Row gutter={10}>
                <Col span={12}>
                    <SelectAddressField
                        {...pick(others, addressProps)}
                        className={className}
                        disabled={disabled}
                        single
                        size={size}
                        value={get(value, "city")}
                        onChange={(city) => {
                            setValue({city, detail: get(value, "detail")});
                        }}
                    />
                </Col>
                <Col span={12}>
                    <Input
                        {...omit(others, addressProps)}
                        className={className}
                        placeholder={inputPlaceholder || "请输入"}
                        disabled={disabled}
                        size={size}
                        value={get(value, "detail")}
                        onChange={(e) => {
                            setValue({city: get(value, "city"), detail: e.target.value});
                        }}
                    />
                </Col>
            </Row>
        </div>
    );
};

export const SelectFunction = createdField(SelectFunctionField);
export const SelectIndustry = createdField(SelectIndustryField);
export const SelectAddress = createdField(SelectAddressField);

export const AddressInput = (props) => {
    const render = useDecorator(
        Object.assign(
            {},
            {
                placeholder: "请选择" + (props.label || ""),
                inputPlaceholder: "请输入" + (props.label || ""),
            },
            props
        )
    );
    return render(AddressInputField);
};
AddressInput.Field = AddressInputField;

export {
    FunctionEnum,
    IndustryEnum,
    AddressEnum,
    createAddressApi,
    EnumDisplay,
    enumItemsToSelectValue,
    enumItemToSelectValue,
    addressEnumToSelectValue,
    addressEnumToSelectValueSingle,
};

export default {
    SelectFunction,
    SelectIndustry,
    SelectAddress,
    AddressInput,
};
