import {
    DatePicker as ReactDatePicker,
    DatePickerToday as ReactDatePickerToday,
    Input as ReactInput,
    InputNumber as ReactInputNumber,
    Select as ReactSelect,
    TextArea as ReactTextArea,
    TimePicker as ReactTimePicker,
    TreeSelect as ReactTreeSelect,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Rate,
    Slider,
} from "@kne/react-form-antd";
import AdvancedSelectField from "./AdvancedSelect";
import SuperSelectField, {
    SuperSelectTableList as SuperSelectTableListField, SuperSelectTree, SuperSelectUser as SuperSelectUserField,
} from "./SuperSelect";
import AddressSelect, {AddressInput} from "./AddressSelect";
import Cascader from "./Cascader";
import ColorPicker from './ColorPicker';
import FunctionSelect from "./FunctionSelect";
import IndustrySelect from "./IndustrySelect";
import MoneyInput from "./MoneyInput";
import PhoneNumber from "./PhoneNumber";
import Switch from "./Switch";
import Upload from "./Upload";
import Avatar from "./Avatar";
import SalaryInput from "./SalaryInput";
import InputUpperCaseField from "./InputUpperCase";
import compose from "@kne/compose";
import {forwardRef} from "react";
import {useIntl} from '@kne/react-intl';
import {useGroup} from "@kne/react-form-antd";
import get from "lodash/get";
import {get as _get} from "lodash";
import {useFormLang} from "@components/FormInfo/FormLangProvider";
import TypeDateRangePicker from "./TypeDateRangePicker";
import Tooltip from "@components/Tooltip";
import Icon from "@components/Icon";
import {Space} from "antd";
import classnames from "classnames";
import withLocale from '../withLocale';
import style from "../style.module.scss";

const createWithFieldDecorator = (decoratorList) => (WrappedComponent) => {
    const TargetComponent = compose(...decoratorList)(({forwardedRef, label, placeholder, ...props}) => {
        return (<WrappedComponent
            {...props}
            label={label}
            placeholder={placeholder}
            labelRender={() => props.tips ? (<Space>
                {label}
                <Tooltip content={props.tips}>
                <span
                    className={classnames(style["field-tips"], {
                        [style["label-hidden"]]: props.labelHidden,
                    })}
                >
                  <Icon type="icon-xinxi-miaobian"/>
                </span>
                </Tooltip>
            </Space>) : (label)}
            ref={forwardedRef}
        />)
    });
    const ForwardComponent = forwardRef((props, ref) => {
        return <TargetComponent {...props} forwardedRef={ref}/>;
    });
    Object.keys(WrappedComponent)
        .filter((key) => {
            return ["$$typeof", "render", "field"].indexOf(key) === -1;
        })
        .forEach((key) => {
            ForwardComponent[key] = WrappedComponent[key];
        });

    return ForwardComponent;
};

const withInputDefaultPlaceholder = (WrappedComponent) => {
    return withLocale(({placeholder, label, ...props}) => {
        const {formatMessage} = useIntl();
        return (<WrappedComponent
            {...props}
            label={label}
            placeholder={placeholder || formatMessage({id: 'defaultInputPlaceholder'}, {label})}
        />);
    });
};

const withSelectDefaultPlaceholder = (WrappedComponent) => {
    return withLocale(({placeholder, label, ...props}) => {
        const {formatMessage} = useIntl();
        return <WrappedComponent
            {...props}
            label={label}
            placeholder={placeholder || formatMessage({id: 'defaultSelectPlaceholder'}, {label})}
        />;
    })
};

const withLang = (WrappedComponent) => {
    return (props) => {
        const group = useGroup();
        const groupName = get(group, "name");
        const groupIndex = _get(group, "index");
        const lang = useFormLang();
        if (lang && Array.isArray(lang) && lang.length > 0) {
            return lang.map((item) => {
                if (typeof item === "string") {
                    return <WrappedComponent {...props} key={item}/>;
                }
                const {name, label, options} = item;
                const ignoreList = get(options, "ignore", []), disabledList = get(options, "disabled", []),
                    fields = get(options, "fields", []);
                const getCurrentField = (item) => props.name === item.name && !(item.hasOwnProperty("groupName") && item.groupName !== groupName) && !(item.hasOwnProperty("groupIndex") && item.groupIndex !== groupIndex);

                if (ignoreList.length > 0 && ignoreList.find(getCurrentField)) {
                    return null;
                }

                if (fields.length > 0 && !fields.find(getCurrentField)) {
                    return null;
                }

                let newProps = Object.assign({}, props, {
                    name: get(options, "nameTransform", (name, langName) => `${name}${langName}`)(props.name, name),
                    label: get(options, "labelTransform", (label, langLabel) => label && `${label}${langLabel}`)(props.label, label),
                });

                if (disabledList.length > 0 && disabledList.find(getCurrentField)) {
                    newProps.disabled = true;
                    newProps.rule = "";
                }
                return <WrappedComponent {...newProps} key={name}/>;
            });
        }

        return <WrappedComponent {...props} />;
    };
};

const Input = createWithFieldDecorator([withLang, withInputDefaultPlaceholder])(ReactInput);

const InputNumber = createWithFieldDecorator([withLang, withInputDefaultPlaceholder,])(ReactInputNumber);
Input.Password = createWithFieldDecorator([withLang, withInputDefaultPlaceholder,])(ReactInput.Password);

const DatePicker = createWithFieldDecorator([withLang, withSelectDefaultPlaceholder,])(ReactDatePicker);
DatePicker.MonthPicker = createWithFieldDecorator([withLang, withSelectDefaultPlaceholder,])(ReactDatePicker.MonthPicker);

DatePicker.RangePicker = createWithFieldDecorator([withLang, withSelectDefaultPlaceholder,])(ReactDatePicker.RangePicker);

DatePicker.WeekPicker = createWithFieldDecorator([withLang, withSelectDefaultPlaceholder,])(ReactDatePicker.WeekPicker);

const TimePicker = createWithFieldDecorator([withLang, withSelectDefaultPlaceholder,])(ReactTimePicker);

TimePicker.RangePicker = createWithFieldDecorator([withLang, withSelectDefaultPlaceholder,])(ReactTimePicker.RangePicker);

const DatePickerToday = createWithFieldDecorator([withLang])(({placeholder, label, soFarText, ...props}) => {
    const {formatMessage} = useIntl({moduleName: "FormInfo"});
    return (<ReactDatePickerToday
        {...props}
        label={label}
        placeholder={[formatMessage({id: "startDate"}), formatMessage({id: "endDate"}),]}
        soFarText={soFarText || formatMessage({id: "soFarText"})}
    />);
});

const fields = {
    Input,
    Checkbox,
    Password: Input.Password,
    InputNumber,
    DatePicker,
    MonthPicker: DatePicker.MonthPicker,
    WeekPicker: DatePicker.WeekPicker,
    DateRangePicker: DatePicker.RangePicker,
    TimeRangePicker: TimePicker.RangePicker,
    TimePicker,
    DatePickerToday,
    RadioGroup: createWithFieldDecorator([withLang])(RadioGroup),
    CheckboxGroup: createWithFieldDecorator([withLang])(CheckboxGroup),
    Rate: createWithFieldDecorator([withLang])(Rate),
    Switch: createWithFieldDecorator([withLang])(Switch),
    Slider: createWithFieldDecorator([withLang])(Slider),
    SalaryInput: createWithFieldDecorator([withLang, withInputDefaultPlaceholder])(SalaryInput),
    TypeDateRangePicker: createWithFieldDecorator([withLang])(TypeDateRangePicker),
    MoneyInput: createWithFieldDecorator([withLang, withInputDefaultPlaceholder])(MoneyInput),
    PhoneNumber: createWithFieldDecorator([withLang, withInputDefaultPlaceholder])(PhoneNumber),
    Upload: createWithFieldDecorator([withLang])(Upload),
    Avatar: createWithFieldDecorator([withLang])(Avatar),
    FunctionSelect: createWithFieldDecorator([withLang, withSelectDefaultPlaceholder,])(FunctionSelect),
    IndustrySelect: createWithFieldDecorator([withLang, withSelectDefaultPlaceholder,])(IndustrySelect),
    Cascader: createWithFieldDecorator([withLang, withSelectDefaultPlaceholder])(Cascader),
    ColorPicker: createWithFieldDecorator([withLang, withSelectDefaultPlaceholder])(ColorPicker),
    AddressSelect: createWithFieldDecorator([withLang, withSelectDefaultPlaceholder,])(AddressSelect),
    AddressInput: createWithFieldDecorator([withLang, withSelectDefaultPlaceholder,])(AddressInput),
    TreeSelect: createWithFieldDecorator([withLang, withSelectDefaultPlaceholder,])(ReactTreeSelect),
    ReactInputNumber: createWithFieldDecorator([withLang, withInputDefaultPlaceholder,])(ReactInputNumber),
    InputUpperCase: createWithFieldDecorator([withLang, withInputDefaultPlaceholder,])(InputUpperCaseField),
    Select: createWithFieldDecorator([withLang, withSelectDefaultPlaceholder])(ReactSelect),
    TextArea: createWithFieldDecorator([withLang, withInputDefaultPlaceholder])(ReactTextArea),
    AdvancedSelect: createWithFieldDecorator([withLang, withSelectDefaultPlaceholder,])(AdvancedSelectField),
    SuperSelect: createWithFieldDecorator([withLang, withSelectDefaultPlaceholder,])(SuperSelectField),
    SuperSelectTableList: createWithFieldDecorator([withLang, withSelectDefaultPlaceholder,])(SuperSelectTableListField),
    SuperSelectUser: createWithFieldDecorator([withLang, withSelectDefaultPlaceholder,])(SuperSelectUserField),
    SuperSelectTree: createWithFieldDecorator([withLang, withSelectDefaultPlaceholder,])(SuperSelectTree),
};

export default fields;

export const fieldDecorator = {
    createWithFieldDecorator, withInputDefaultPlaceholder, withSelectDefaultPlaceholder, withLang,
};
