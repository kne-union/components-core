import dayjs from "dayjs";
import {localeLoader} from '@kne/react-intl';

const loadAntdLocale = ({params}) => {
    const {locale} = params;
    return {
        "en-US": async () => {
            await import("dayjs/locale/en");
            dayjs.locale("en");
            await import("@kne/button-group/dist/locale/en").then((module) => {
                localeLoader('en-US', module['default'], 'button-group');
            });
            return await import("antd/es/locale/en_US").then(module => module["default"]);
        }, "zh-CN": async () => {
            await import("dayjs/locale/zh-cn");
            dayjs.locale("zh-cn");

            return await import("antd/es/locale/zh_CN").then(module => module["default"]);
        }
    }[locale]();
};

export default loadAntdLocale;
