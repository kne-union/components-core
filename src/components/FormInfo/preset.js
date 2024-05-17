import { interceptors, preset, RULES } from "@kne/react-form-antd";
import dayjs from "dayjs";
import merge from "lodash/merge";
import get from "lodash/get";
import "@kne/react-form-antd/dist/index.css";
import { PHONE_NUMBER } from "./fields/PhoneNumber";
import HelperGuideLabel from "@components/FormInfo/HelperGuideLabel";

const formPreset = (options, otherOptions) => {
  const { locale } = Object.assign({}, otherOptions);

  interceptors.output.use("photo-string", (value) => {
    if (!value || typeof value === "string") {
      return value;
    }
    return value.id?.split("?")?.[0] || value.id;
  });

  interceptors.input.use("to-array", (value) => {
    return Array.isArray(value) ? value[0] : value;
  });

  interceptors.output.use("to-array", (value) => {
    return [value];
  });

  interceptors.input.use("array-single", (value) => {
    return value ? [value] : [];
  });

  interceptors.output.use("array-single", (value) => {
    return value ? value[0] : null;
  });

  interceptors.input.use("date-string", (value) => {
    return value ? dayjs(value) : null;
  });

  interceptors.output.use("date-string", (value) => {
    return value ? new Date(value.valueOf()).toISOString() : "";
  });

  interceptors.input.use("date-range-string", (value) => {
    if (!Array.isArray(value)) {
      return [];
    }

    const output = [];

    if (value[0]) {
      output.push(dayjs(value[0]));
    }
    if (value[0] && value[1] && value[1] === "sofar") {
      output.push("至今");
    }
    if (value[0] && value[1] && value[1] !== "至今") {
      output.push(dayjs(value[1]));
    }

    return output;
  });

  interceptors.output.use("date-range-string", (value) => {
    if (!Array.isArray(value)) {
      return [];
    }

    const output = [];

    if (value[0]) {
      output.push(new Date(value[0].valueOf()).toISOString());
    }
    if (value[0] && value[1] && value[1] === "至今") {
      output.push("sofar");
    }
    if (value[0] && value[1] && value[1] !== "至今") {
      output.push(new Date(value[1].valueOf()).toISOString());
    }
    return output;
  });

  interceptors.output.use("file-format", (value) => {
    if (!Array.isArray(value)) {
      return [];
    }
    return value.map((item) => ({
      id: item.id || item.ossId,
      originalName: item.filename,
    }));
  });

  interceptors.input.use("file-format", (value) => {
    if (!Array.isArray(value)) {
      return [];
    }
    return value.map((item) => ({
      id: item.id || item.ossId,
      ossId: item.id || item.ossId,
      filename: item.originalName,
    }));
  });

  interceptors.output.use("phone-number-string", (value) => {
    if (!(value.code && value.value)) {
      return "";
    }

    return `+${value.code} ${value.value.replace(/\s+/g, "")}`;
  });

  interceptors.input.use("phone-number-string", (value) => {
    if (!value) {
      return {};
    }
    const matcher = value.match(/^\+(\d+)\s(.*)/);
    if (matcher.length < 3) {
      return {};
    }
    return { code: matcher[1], value: matcher[2] };
  });

  const _olderREQ = RULES.REQ;
  const _olderLEN = RULES.LEN;

  const getLocaleMsg = (type, values) => {
    values = Object.assign({}, values);
    const mapping = {
      REQ: {
        "zh-CN": "%s不能为空",
        "en-US": "%s cannot be empty ",
      },
      LENGTH_EQUAL: {
        "zh-CN": `%s必须等于${values.end}`,
        "en-US": `%s must be equal to ${values.end}`,
      },
      LENGTH_MORE: {
        "zh-CN": `%s必须大于${values.start}`,
        "en-US": `%s must be greater than ${values.start}`,
      },
      LENGTH_LESS: {
        "zh-CN": `%s必须小于${values.end}`,
        "en-US": `%s must be less than ${values.end}`,
      },
    };
    const target = get(mapping, `${type}.${locale}`);
    if (target) {
      return target;
    }
    return get(mapping, `${type}.zh-CN`);
  };

  preset(
    merge(
      {},
      {
        rules: {
          REQ: (...args) => {
            return Object.assign({}, _olderREQ(...args), {
              errMsg: getLocaleMsg("REQ"),
            });
          },
          LEN: (...args) => {
            const [value, start, end] = args;
            let ruleName = "";
            if (end === start && value.length !== Number(end)) {
              ruleName = "LENGTH_EQUAL";
            }
            if (value.length < start) {
              ruleName = "LENGTH_MORE";
            }
            if (end && value.length > end) {
              ruleName = "LENGTH_LESS";
            }
            return Object.assign({}, _olderLEN(...args), {
              errMsg: getLocaleMsg(ruleName, { start, end }),
            });
          },
          PHONE_NUMBER,
          ARRAY_LENGTH: (value, start, end) => {
            if (end === start && value.length !== Number(end)) {
              return {
                result: false,
                errMsg: getLocaleMsg("LENGTH_EQUAL", { start, end }),
              };
            }
            if (value.length < start) {
              return {
                result: false,
                errMsg: getLocaleMsg("LENGTH_MORE", { start, end }),
              };
            }
            if (end && value.length > end) {
              return {
                result: false,
                errMsg: getLocaleMsg("LENGTH_LESS", { start, end }),
              };
            }
            return { result: true };
          },
        },
        field: {
          datePicker: {
            defaultProps: {
              interceptor: "date-string",
            },
          },
          rangeDatePicker: {
            defaultProps: {
              interceptor: "date-range-string",
            },
          },
          textArea: {
            defaultProps: {
              autoSize: {
                minRows: 2,
                maxRows: 6,
              },
            },
          },
        },
        globalProps: {
          labelTips: (props) => {
            return <HelperGuideLabel {...props} />;
          },
        },
      },
      typeof options === "function" ? options({ interceptors, RULES }) : options
    )
  );
};

export default formPreset;
