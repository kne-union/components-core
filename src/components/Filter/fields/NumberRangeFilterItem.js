import PopoverItem from "../PopoverItem";
import {Input, InputNumber, Space} from "antd";
import get from "lodash/get";
import isNumber from "lodash/isNumber";
import {useIntl} from "@components/Intl";
import style from "../style.module.scss";
import React from "react";

const computedFilterValue = (range, unit, formatMessage) => {
    if (!isNumber(range[0]) && !isNumber(range[1])) {
        return null;
    }

    return {
        label: ((range) => {
            if (isNumber(range[0]) && isNumber(range[1])) {
                return `${range[0]}-${range[1]}${unit || ""}`;
            }
            if (isNumber(range[0])) {
                return formatMessage({id: "over"}, {count: range[0], unit});
            }
            if (isNumber(range[1])) {
                return formatMessage({id: "lessThan"}, {count: range[1], unit});
            }
        })(range), value: [range[0] || null, range[1] || null],
    };
};

const defaultPropsOnValidate = (value) => {
    const range = get(value, "value");
    return !(range && isNumber(range[0]) && isNumber(range[1]) && range[1] < range[0]);
};

const InputFilterItem = ({
                             label,
                             value,
                             onChange,
                             placeholder,
                             onValidate = defaultPropsOnValidate,
                             overlayClassName,
                             placement,
                             onOpenChange,
                             unit,
                             ...props
                         }) => {
    const {formatMessage} = useIntl({moduleName: "Filter"});
    return (<PopoverItem
        label={label}
        value={value}
        onChange={onChange}
        {...{onValidate, overlayClassName, placement, onOpenChange}}
    >
        {({value, onChange}) => (<Space.Compact>
            <InputNumber
                {...props}
                placeholder={placeholder || `${formatMessage({id: "pleaseInput"})}${label}`}
                className={style["filter-item-number-range"]}
                value={get(value, "value[0]", "")}
                onChange={(target) => {
                    onChange(computedFilterValue([target, get(value, "value[1]")], unit, formatMessage));
                }}
            />
            <Input
                style={{
                    width: 30, borderLeft: 0, borderRight: 0, pointerEvents: "none",
                }}
                placeholder="~"
                disabled
            />
            <InputNumber
                {...props}
                placeholder={placeholder || `${formatMessage({id: "pleaseInput"})}${label}`}
                className={style["filter-item-number-range"]}
                value={get(value, "value[1]", "")}
                onChange={(target) => {
                    onChange(computedFilterValue([get(value, "value[0]"), target], unit, formatMessage));
                }}
            />
            {unit && (<Input
                style={{
                    width: 50, borderLeft: 0,
                }}
                value={unit}
                disabled
            />)}
        </Space.Compact>)}
    </PopoverItem>);
};

export default InputFilterItem;
