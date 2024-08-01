import useControlValue from "@kne/use-control-value";
import { hooks, util, formUtils } from "@kne/react-form-antd";
import { InputNumber } from "antd";
import changeMoneyToChinese, {
  MAX_NUM,
} from "@common/utils/changeMoneyToChinese";
import style from "./style.module.scss";
import classnames from "classnames";
import merge from "lodash/merge";
import { useState } from "react";

const { isNotEmpty } = util || formUtils;
const { useOnChange } = hooks;
const MoneyInputField = ({
  chineseEmpty,
  className,
  showError,
  errorDesc,
  transformMoneyToChinese,
  onBlur,
  moneyFormat,
  ...props
}) => {
  const [status, setStatus] = useState("");
  const [value, onChange] = useControlValue(props);
  const inputNumberProps = merge(
    {
      controls: false,
      precision: 2,
      addonAfter: "元",
    },
    props,
    {
      max: isNotEmpty(props.max)
        ? props.max > MAX_NUM
          ? MAX_NUM
          : props.max
        : MAX_NUM,
    }
  );
  return (
    <div className={classnames(className, "money-input", style["money-input"])}>
      <InputNumber
        {...inputNumberProps}
        status={status}
        formatter={
          moneyFormat
            ? (value) => {
                return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              }
            : null
        }
        parser={(parserValue) => {
          const value = moneyFormat
            ? parserValue?.replace(/\$\s?|(,*)/g, "")
            : parserValue;
          if (isNotEmpty(value)) {
            if (
              Number(value) > Number(inputNumberProps.max) ||
              (isNotEmpty(inputNumberProps.min) &&
                Number(value) < Number(inputNumberProps.min))
            ) {
              setStatus("error");
            }
          } else {
            setStatus("");
          }
          return isNotEmpty(value) ? Number(value) : null;
        }}
        onChange={(val) => {
          onChange(val);
        }}
        onBlur={(e) => {
          onBlur && onBlur(e, setStatus);
        }}
      />
      <div className={classnames(style["money-description"])}>
        {status === "error" && showError
          ? errorDesc
          : isNotEmpty(value)
          ? changeMoneyToChinese(
              transformMoneyToChinese ? transformMoneyToChinese(value) : value
            )
          : chineseEmpty}
      </div>
    </div>
  );
};

const MoneyInput = (props) => {
  const render = useOnChange(
    Object.assign({ placeholder: `请输入${props.label || ""}` }, props)
  );
  return render(MoneyInputField);
};

MoneyInput.Field = MoneyInputField;
MoneyInput.toChineseCharacter = changeMoneyToChinese;

export default MoneyInput;
