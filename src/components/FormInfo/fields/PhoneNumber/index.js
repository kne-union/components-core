import {
  AsYouType,
  getCountryCallingCode,
  parsePhoneNumber,
} from "libphonenumber-js";
import { Input, Select, Space } from "antd";
import { hooks } from "@kne/react-form-antd";
import useSimulationBlur from "@kne/use-simulation-blur";
import useControlValue from "@kne/use-control-value";
import get from "lodash/get";
import style from "./style.module.scss";
import { createWithRemoteLoader } from "@kne/remote-loader";

const { useDecorator } = hooks;

const CountrySelect = createWithRemoteLoader({
  modules: ["components-iconfont:CountyFlag"],
})(({ remoteModules, value, onChange }) => {
  const [CountyFlag] = remoteModules;
  return (
    <CountyFlag>
      {({ list }) => {
        return (
          <Select
            popupMatchSelectWidth={300}
            className={style["country-select"]}
            value={value || "CN"}
            onChange={onChange}
            placeholder="请选择国家"
            showSearch
            filterOption={(input, option) => {
              return option.name.indexOf(input) > -1;
            }}
            optionLabelProp="code"
            options={list.map(({ country_name_cn, country_code, ab }) => ({
              value: ab,
              code: `(+${country_code})`,
              name: country_name_cn,
              label: (
                <Space align="center">
                  <span className={style["country-name"]}>
                    {country_name_cn}
                  </span>
                  <div>(+{country_code})</div>
                </Space>
              ),
            }))}
          />
        );
      }}
    </CountyFlag>
  );
});

const PhoneNumberField = (props) => {
  const { className, onBlur, name, ...others } = props;
  const [value, onChange] = useControlValue(props);
  const ref = useSimulationBlur(onBlur || (() => {}));
  const parsePhone = (value) => {
    const askType = new AsYouType(get(value, "code", "CN"));
    return askType.input(get(value, "value", ""));
  };
  return (
    <div className={className} ref={ref}>
      <Input
        {...others}
        addonBefore={
          <CountrySelect
            disabled={others.disabled}
            readOnly={others.readOnly}
            value={get(value, "code", "CN")}
            onChange={(code) => {
              onChange &&
                onChange(
                  Object.assign({}, value, {
                    code,
                    value: parsePhone({ code, value: get(value, "value", "") }),
                  })
                );
              onBlur && onBlur();
            }}
          />
        }
        value={get(value, "value", "")}
        onChange={(e) => {
          onChange &&
            onChange(
              Object.assign({ code: "CN" }, value, {
                value: e.target.value,
                code: get(value, "code", "CN"),
              })
            );
        }}
        onBlur={(e) => {
          onChange &&
            onChange(
              Object.assign({ code: "CN" }, value, {
                value: parsePhone({
                  value: e.target.value,
                  code: get(value, "code", "CN"),
                }),
              })
            );
          onBlur && onBlur();
        }}
      />
    </div>
  );
};

const PhoneNumber = ({ rule, ...props }) => {
  const render = useDecorator(
    Object.assign(
      {
        placeholder: `请输入${props.label || ""}`,
        rule: ((rule) => {
          const rules = (rule || "").split(" ");
          const reqIndex = rules.indexOf("REQ");
          if (reqIndex > -1) {
            rules.splice(reqIndex + 1, 0, "PHONE_NUMBER");
          } else {
            rules.unshift("PHONE_NUMBER");
          }
          return rules.join(" ");
        })(rule),
      },
      props
    )
  );
  return render(PhoneNumberField);
};

PhoneNumber.Field = PhoneNumberField;

PhoneNumber.defaultProps = {};

PhoneNumber.format = ({ code, value }) => {
  const phoneCode = code ? getCountryCallingCode(code) : null;

  if (!phoneCode || !value) {
    return "";
  }
  return `+${phoneCode} ${value}`;
};

PhoneNumber.parsePhoneNumber = ({ phoneNumber }) => {
  const { country, countryCallingCode, nationalNumber } = phoneNumber
    ? parsePhoneNumber(phoneNumber)
    : null;

  if (!nationalNumber || !phoneNumber) {
    return "";
  }
  return { country, countryCallingCode, nationalNumber };
};

export const PHONE_NUMBER = async (value, { field }) => {
  if (
    (field.rule || "").split(" ").indexOf("REQ") > -1 &&
    !get(value, "value")
  ) {
    return { result: false, errMsg: "%s不能为空" };
  }
  if (!get(value, "value")) {
    return { result: true };
  }

  const result = await import("libphonenumber-js/max").then(
    ({ isValidPhoneNumber }) => {
      return isValidPhoneNumber(get(value, "value", ""), {
        defaultCountry: get(value, "code", "CN"),
        extract: true,
      });
    }
  );
  return { result, errMsg: "%s格式不正确" };
};

export default PhoneNumber;
