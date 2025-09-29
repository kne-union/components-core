import {interceptors, preset, RULES} from "@kne/react-form-antd";
import dayjs from "dayjs";
import merge from "lodash/merge";
import get from "lodash/get";
import transform from 'lodash/transform';
import "@kne/react-form-antd/dist/index.css";
import {PHONE_NUMBER_INPUT} from "./fields/PhoneNumber";
import HelperGuideLabel from "@components/FormInfo/HelperGuideLabel";
import {loadModule} from "@kne/remote-loader";

const _olderREQ = RULES.REQ;
const _olderLEN = RULES.LEN;

const formPreset = async (options, otherOptions) => {
    const {locale} = Object.assign({}, otherOptions);

    interceptors.input.use("photo-string", (value) => {
        if (value && typeof value === "string") {
            const [id, params] = value.split("?");
            const searchParams = new URLSearchParams(params);
            return Object.assign({}, {id}, transform(Array.from(searchParams.entries()), (result, value) => {
                result[value[0]] = value[1];
            }, {}));
        }
        return value;
    });

    interceptors.output.use("photo-string", (value) => {
        if (!value || typeof value === "string") {
            return value;
        }
        return `${value?.id}${value?.filename ? `?filename=${value?.filename}` : ''}`;
    });

    interceptors.input.use("photo-string-list", (value) => {
        if (value && Array.isArray(value) && value.length > 0) {
            return value.map((item) => {
                const [id, params] = item.split("?");
                const searchParams = new URLSearchParams(params);
                return Object.assign({}, {id}, transform(Array.from(searchParams.entries()), (result, value) => {
                    result[value[0]] = value[1];
                }, {}));
            });
        }
        return value;
    });

    interceptors.output.use("photo-string-list", (value) => {
        if (value && Array.isArray(value) && value.length > 0) {
            return value.map((item) => {
                return `${item?.id}${item?.filename ? `?filename=${item?.filename}` : ''}`;
            });
        }
        return value;
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

    interceptors.input.use("boolean-number", (value) => {
        return value === 1 || value === "1";
    });

    interceptors.output.use("boolean-number", (value) => {
        return value ? 1 : 0;
    });

    interceptors.input.use("un-boolean", (value) => {
        return !value;
    });

    interceptors.output.use("un-boolean", (value) => {
        return !value;
    });

    interceptors.output.use("object-output-value", (value) => {
        if (!value) {
            return value;
        }
        return value.value || value.id;
    });

    interceptors.output.use("array-output-value", (value) => {
        if (!(Array.isArray(value) && value.length > 0)) {
            return [];
        }
        return value.map((value) => value.value || value.id);
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
        return value.map((item) => Object.assign({}, item, {
            id: item.id || item.ossId, originalName: item.filename,
        }));
    });

    interceptors.input.use("file-format", (value) => {
        if (!Array.isArray(value)) {
            return [];
        }
        return value.map((item) => ({
            id: item.id || item.ossId, ossId: item.id || item.ossId, filename: item.originalName || item.filename,
        }));
    });

    const {default: loadCountyList} = await loadModule("components-iconfont:CountyFlag@load");
    const countyList = await loadCountyList();

    const countyAbMap = new Map(countyList.map(({ab, country_code}) => [ab, country_code]));
    const countyCodeMap = new Map(countyList.map(({ab, country_code}) => [country_code, ab]));

    interceptors.output.use("phone-number-string", (value) => {
        if (!(value?.code && value?.value)) {
            return "";
        }

        return `+${countyAbMap.get(value.code)} ${value.value.replace(/\s+/g, "")}`;
    });

    interceptors.input.use("phone-number-string", (value) => {
        if (!value) {
            return {};
        }
        const matcher = value.match(/^\+(\d+)\s(.*)/);
        if (!(matcher && matcher.length >= 3)) {
            return {code: countyCodeMap.get(86), value};
        }
        return {code: countyCodeMap.get(Number(matcher[1])), value: matcher[2]};
    });

    const getLocaleMsg = (type, values) => {
        values = Object.assign({}, values);
        const mapping = {
            REQ: {
                "zh-CN": "%s不能为空", "en-US": "%s cannot be empty ",
            }, EMAIL: {
                "zh-CN": "请输入有效的%s", "en-US": "Please enter a valid %s",
            }, LENGTH_EQUAL: {
                "zh-CN": `%s必须等于${values.end}`, "en-US": `%s must be equal to ${values.end}`,
            }, LENGTH_MORE: {
                "zh-CN": `%s必须大于${values.start}`, "en-US": `%s must be greater than ${values.start}`,
            }, LENGTH_LESS: {
                "zh-CN": `%s必须小于${values.end}`, "en-US": `%s must be less than ${values.end}`,
            },
        };
        const target = get(mapping, `${type}.${locale}`);
        if (target) {
            return target;
        }
        return get(mapping, `${type}.zh-CN`);
    };

    preset(merge({}, {
        type: "inner", rules: {
            REQ: (...args) => {
                return Object.assign({}, _olderREQ(...args), {
                    errMsg: getLocaleMsg("REQ"),
                });
            }, LEN: (...args) => {
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
                    errMsg: getLocaleMsg(ruleName, {start, end}),
                });
            }, EMAIL: function (value) {
                return {
                    result: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value),
                    errMsg: getLocaleMsg('EMAIL')
                };
            }, PHONE_NUMBER_INPUT, ARRAY_LENGTH: (value, start, end) => {
                if (end === start && value.length !== Number(end)) {
                    return {
                        result: false, errMsg: getLocaleMsg("LENGTH_EQUAL", {start, end}),
                    };
                }
                if (value.length < start) {
                    return {
                        result: false, errMsg: getLocaleMsg("LENGTH_MORE", {start, end}),
                    };
                }
                if (end && value.length > end) {
                    return {
                        result: false, errMsg: getLocaleMsg("LENGTH_LESS", {start, end}),
                    };
                }
                return {result: true};
            },
        }, field: {
            datePicker: {
                defaultProps: {
                    interceptor: "date-string",
                },
            }, rangeDatePicker: {
                defaultProps: {
                    interceptor: "date-range-string",
                },
            }, inputNumber: {
                defaultProps: {
                    changeOnWheel: false,
                },
            }, textArea: {
                defaultProps: {
                    autoSize: {
                        minRows: 2, maxRows: 6,
                    },
                },
            },
        }, globalProps: {
            labelTips: (props) => {
                return <HelperGuideLabel {...props} />;
            },
        },
    }, typeof options === "function" ? options({interceptors, RULES}) : options));
};

export default formPreset;
