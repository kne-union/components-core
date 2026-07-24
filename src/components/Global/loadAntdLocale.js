import dayjs from "dayjs";

const loadAntdLocale = ({params}) => {
    const {locale} = params;
    const loaders = {
        "en-US": async () => {
            await import("dayjs/locale/en");
            dayjs.locale("en");
            return await import("antd/es/locale/en_US").then(module => module["default"]);
        },
        "zh-CN": async () => {
            await import("dayjs/locale/zh-cn");
            dayjs.locale("zh-cn");
            return await import("antd/es/locale/zh_CN").then(module => module["default"]);
        }
    };
    const loader = loaders[locale] || loaders["en-US"];
    return loader();
};

export default loadAntdLocale;
