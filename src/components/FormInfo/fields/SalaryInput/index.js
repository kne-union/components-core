import React, { cloneElement } from "react";
import { hooks, Select } from "@kne/react-form-antd";
import useSimulationBlur from "@kne/use-simulation-blur";
import { Col, Input, InputNumber, Row } from "antd";
import style from "./style.module.scss";
import { IntlProvider, useIntl } from "@components/Intl";
import importMessages from "../../locale";
import Enum from "@components/Enum";
import useControlValue from "@kne/use-control-value";
import { get } from "lodash";

const { field: SelectField } = Select.Fetch;

const { useDecorator, useUIDecorator } = hooks;

export const InputNumberField = (props) => {
  const render = useUIDecorator(props);
  return render(InputNumber);
};
const numberFormat = (value) => {
  if (!value) return "";
  const _value = isNaN(Number(value)) ? value : Math.abs(Number(value));
  return value.split(".")[1] && value.split(".")[1].length > 2
    ? _value.toFixed(2)
    : _value;
};

const FormField = ({ children, isError }) => {
  return (
    <div
      style={{ marginBottom: 0 }}
      className={`react-form__field ${isError ? "is-error" : ""}`}
    >
      <div className="react-form__field-main">
        <div className="react-form__field-input">
          {cloneElement(children, { className: "react-form__field-component" })}
        </div>
      </div>
    </div>
  );
};

const SalaryInputField = ({
  getPopupContainer,
  onBlur,
  api,
  isRange = true,
  placeholder,
  disabled,
  showMonth,
  remindUnit,
  req,
  ...props
}) => {
  const [value, onChange] = useControlValue(props);
  const { formatMessage } = useIntl({ moduleName: "FormInfo" });
  const _placeholder = formatMessage(
    { id: "defaultSelectPlaceholder" },
    { label: "" }
  );
  const _placeholderInput = formatMessage(
    { id: "defaultInputPlaceholder" },
    { label: "" }
  );

  const isTenThousand = [6].indexOf(get(value, "type")) > -1,
    isFace = get(value, "type") === 1,
    isOther = get(value, "type") === 7;

  const transform = (value) => {
    if (!value) {
      return;
    }
    return isTenThousand ? value / 10000 : value;
  };

  const ref = useSimulationBlur(onBlur ? onBlur : () => {});

  return (
    <div ref={ref} className={style["salary"]}>
      <Row wrap={false} gutter={10}>
        <Col>
          <SelectField
            className={style["salary-type"]}
            {...api}
            value={get(value, "type")}
            onChange={(type) => {
              onChange &&
                onChange(
                  Object.assign({}, isFace ? {} : value, {
                    type,
                    min: "",
                    max: "",
                  })
                );
            }}
            placeholder={placeholder || _placeholder}
            getPopupContainer={getPopupContainer}
            disabled={disabled}
          >
            {({ data }) => {
              return { options: data || [] };
            }}
          </SelectField>
        </Col>
        {isFace ? null : (
          <Col flex={1}>
            {isRange && (
              <Row
                className={
                  remindUnit && [5, 6].includes(value?.type)
                    ? style["input-group"]
                    : style["input-group-no-mb"]
                }
                wrap={false}
              >
                <Col flex={1}>
                  <FormField isError={!get(value, "min") && req}>
                    <InputNumber
                      disabled={disabled}
                      placeholder={_placeholderInput}
                      formatter={numberFormat}
                      value={transform(get(value, "min"))}
                      style={{
                        textAlign: "center",
                      }}
                      onChange={(min) => {
                        onChange(
                          Object.assign({}, value, {
                            min: isTenThousand ? min * 10000 : min,
                          })
                        );
                      }}
                      // status={'warning'}
                      description={
                        remindUnit && [5, 6].includes(value?.type) ? (
                          <span style={{ color: "#fc3333" }}>
                            注意：
                            <Enum
                              name={value?.type}
                              moduleName="salaryTypeEnum"
                            />
                            的单位为
                            {isTenThousand
                              ? formatMessage({ id: "thousand" })
                              : isOther
                              ? ""
                              : formatMessage({ id: "yuan" })}
                          </span>
                        ) : null
                      }
                    />
                  </FormField>
                </Col>
                <Col>
                  <Input
                    style={{
                      width: 30,
                      borderLeft: 0,
                      borderRight: 0,
                      pointerEvents: "none",
                    }}
                    placeholder="~"
                    disabled
                  />
                </Col>
                <Col flex={1}>
                  <FormField isError={!get(value, "max") && req}>
                    <InputNumber
                      disabled={disabled}
                      placeholder={_placeholderInput}
                      formatter={numberFormat}
                      value={transform(get(value, "max"))}
                      style={{
                        textAlign: "center",
                      }}
                      addonAfter={
                        isTenThousand
                          ? formatMessage({ id: "thousand" })
                          : isOther
                          ? ""
                          : formatMessage({ id: "yuan" })
                      }
                      onChange={(max) => {
                        onChange(
                          Object.assign({}, value, {
                            max: isTenThousand ? max * 10000 : max,
                          })
                        );
                      }}
                    />
                  </FormField>
                </Col>
                {get(value, "type") === 5 && showMonth && (
                  <Col>
                    <span
                      className={
                        get(value, "max") &&
                        get(value, "min") &&
                        !get(value, "month") &&
                        req
                          ? "error"
                          : ""
                      }
                    >
                      <span className={style["input-number"]}>X</span>
                      <InputNumber
                        min={12}
                        disabled={disabled}
                        value={get(value, "month")}
                        onChange={(v) => {
                          onChange(Object.assign({}, value, { month: v }));
                        }}
                        style={{
                          width: 100,
                          textAlign: "center",
                        }}
                        placeholder="数量"
                        addonAfter="月"
                      />
                    </span>
                  </Col>
                )}
              </Row>
            )}
            {!isRange && !isOther && (
              <InputNumber
                disabled={disabled}
                min={0}
                max={100000000}
                placeholder={_placeholderInput}
                className={style.full}
                formatter={numberFormat}
                value={transform(get(value, "max"))}
                style={{
                  textAlign: "center",
                }}
                addonAfter={
                  isTenThousand
                    ? formatMessage({ id: "thousand" })
                    : isOther
                    ? ""
                    : formatMessage({ id: "yuan" })
                }
                onChange={(max) => {
                  onChange(
                    Object.assign({}, value, {
                      max: isTenThousand ? max * 10000 : max,
                    })
                  );
                }}
              />
            )}
            {!isRange && isOther && (
              <Input
                disabled={disabled}
                placeholder={_placeholderInput}
                className={style.full}
                onChange={(e) => {
                  onChange(Object.assign({}, value, { max: e.target.value }));
                }}
                value={get(value, "max")}
                style={{
                  textAlign: "center",
                }}
              />
            )}
          </Col>
        )}
      </Row>
    </div>
  );
};
const SalaryField = (props) => {
  return (
    <IntlProvider moduleName="FormInfo" importMessages={importMessages}>
      <SalaryInputField {...props} />
    </IntlProvider>
  );
};

SalaryField.defaultProps = {
  api: {
    loader: () => {
      return [
        {
          value: 1,
          label: "面议",
        },
        {
          value: 2,
          label: "时薪",
        },
        {
          value: 3,
          label: "日薪",
        },
        {
          value: 4,
          label: "周薪",
        },
        {
          value: 5,
          label: "月薪",
        },
        {
          value: 6,
          label: "年薪",
        },
      ];
    },
  },
  defaultValue: {
    type: 5,
    min: "",
    max: "",
    month: 12,
  },
};

const SalaryInput = (props) => {
  const render = useDecorator({
    ...props,
    req: props?.rule?.indexOf("REQ") > -1,
  });
  return render(SalaryField);
};

SalaryInput.Field = SalaryField;

export default SalaryInput;
