import "./polyfill";
import "simplebar/dist/simplebar.min.css";
import "./override.scss";
import classnames from "classnames";
import {Provider, useGlobalContext as useContext} from "@kne/global-context";
import {Provider as PresetProvider, usePreset} from "./presetContext";
import {App, ConfigProvider as AntdConfigProvider, Result} from "antd";
import {useEffect, useState, useRef, useMemo} from "react";
import SimpleBar from "simplebar";
import ErrorBoundary from "@kne/react-error-boundary";
import {getScrollEl} from "@common/utils/importantContainer";
import isMobile from "@common/utils/isMobile";
import Fetch, {withFetch} from "@kne/react-fetch";
import loadAntdLocale from "./loadAntdLocale";
import style from "./style.module.scss";
import get from "lodash/get";
import {AppDrawer} from "@components/Drawer";
import {FontLoader} from '@components/Icon';
import useRefCallback from "@kne/use-ref-callback";
import transform from "lodash/transform";
import range from "lodash/range";
import Color from "color";
import {createWithRemoteLoader} from "@kne/remote-loader";
import isEqual from './isEqual';

document.body.classList.add(style["container"]);
if (!isMobile() && !window.__COMPONENTS_CORE_SIMPLE_BAR_DISABLED) {
    new SimpleBar(document.body);
    getScrollEl().classList.add(style["container"]);
} else {
    document.body.classList.add("simplebar-content-wrapper");
}

const ConfigProvider = withFetch(({data: message, themeToken = {colorPrimary: "#4096ff"}, children}) => {
    const [isInit, setIsInit] = useState(false);
    const {colorPrimary, components, ...otherToken} = Object.assign({}, themeToken);
    const colorPrimaryObject = useMemo(() => {
        return Color(colorPrimary)
    }, [colorPrimary]);
    useEffect(() => {
        let styleEl = document.head.querySelector("#component-core-theme");
        if (!styleEl) {
            styleEl = document.createElement("style");
            styleEl.id = "component-core-theme";
            document.head.appendChild(styleEl);
        }
        const themeProps = {
            "--primary-color": colorPrimary,
            "--primary-color-red": colorPrimaryObject.red(),
            "--primary-color-green": colorPrimaryObject.green(),
            "--primary-color-blue": colorPrimaryObject.blue(),
            "--primary-color-06": colorPrimaryObject.alpha(0.06).string(),
        };
        range(0, 10).forEach((i) => {
            themeProps[`--primary-color-${i + 1}`] = colorPrimaryObject
                .alpha((i + 1) / 10)
                .string();
        });
        styleEl.textContent = `.${style["container"]
            .replace(/\+/g, "\\+")
            .replace(/\//g, "\\/")}{${transform(themeProps, (result, value, key) => {
            result.push(`${key}:${value};`);
        }, []).join("")}}`;
        setIsInit(true);
        return () => {
            // uninstall();
        };
    }, [colorPrimary, colorPrimaryObject]);
    //设置主题色成功再展示页面
    if (!isInit) {
        return null;
    }
    return (<AntdConfigProvider
        getTargetContainer={getScrollEl}
        getPopupContainer={getScrollEl}
        locale={message}
        wave={{disabled: true}}
        autoInsertSpace={false}
        warning={{strict: false}}
        theme={{
            components, token: Object.assign({}, {
                colorError: "#f53f3f",
                colorInfo: "#165dff",
                colorSuccess: "#00b42a",
                colorWarning: "#ff7d00",
                colorPrimary: colorPrimary,
                colorPrimaryBg: colorPrimaryObject.alpha(0.1).string(),
                colorLink: colorPrimary,
                colorTextBase: "#222222",
                colorText: "#222222"
            }, otherToken),
        }}
    >
        {children}
    </AntdConfigProvider>);
});

const GlobalFontLoader = createWithRemoteLoader({
    modules: ["components-iconfont:Font@path", "components-iconfont:ColorfulFont@path",],
})(({remoteModules}) => {
    const [fontPath, colorfulPath] = remoteModules;

    return <>
        <FontLoader path={`${fontPath}/iconfont.css`}/>
        <FontLoader path={`${colorfulPath}/iconfont.js`}/>
    </>;
});

export const GlobalProvider = ({
                                   preset = {locale: "zh-CN", apis: {}}, children, themeToken, init, ...props
                               }) => {
    const locale = get(preset, "locale", "zh-CN");
    const localMessageRef = useRef({});
    const enumsRef = useRef(new Map());
    const [global, setGlobal] = useState(Object.assign({
        themeToken, localMessageRef, enumsRef, locale,
    }, get(preset, "global")));

    return (<Provider
        value={{
            ...props, preset, locale: global.locale, global, setGlobal,
        }}
    >
        <PresetProvider value={preset}>
            <ConfigProvider
                loader={loadAntdLocale}
                params={{locale: global.locale}}
                themeToken={global.themeToken}
            >
                <App message={{top: 100}}>
                    <AppDrawer>
                        {typeof init === "function" ? (<Fetch
                            loader={() => init({
                                preset, global, setGlobal,
                            })}
                            render={() => children}
                        />) : (children)}
                    </AppDrawer>
                </App>
                <GlobalFontLoader/>
            </ConfigProvider>
        </PresetProvider>
    </Provider>);
};

export const PureGlobal = ({children, ...props}) => {
    const {global: themeToken} = useGlobalContext("themeToken");
    return (<GlobalProvider {...props} themeToken={props.themeToken || themeToken}>
        <div
            data-testid="components-core-pure-global"
            className={classnames(style["container"], "core-container-body")}
        >
            {children}
        </div>
    </GlobalProvider>);
};

export {usePreset};

export const useGlobalContext = (globalKey) => {
    const contextValue = useContext();
    const setGlobalHandler = useRefCallback((value) => {
        contextValue.setGlobal((global) => {
            return typeof value === "function" ? Object.assign({}, global, {
                [globalKey]: value(get(global, globalKey)),
            }) : Object.assign({}, global, {
                [globalKey]: value,
            });
        });
    });
    return Object.assign({
        global: {}, setGlobal: () => {
            console.warn("调用setGlobal的组件应该被放置在Global上下文中");
        },
    }, contextValue, globalKey ? {
        global: get(contextValue.global, globalKey), setGlobal: setGlobalHandler,
    } : {});
};

export const SetGlobal = ({globalKey, value, needReady, children}) => {
    const {global, setGlobal} = useGlobalContext(globalKey);
    const setGlobalHandler = useRefCallback(setGlobal);
    const prevValueRef = useRef(null);
    prevValueRef.current = global;
    useEffect(() => {
        if (isEqual(prevValueRef.current, value)) {
            return;
        }
        prevValueRef.current = value;
        setGlobalHandler(value);
    }, [value, setGlobalHandler]);

    if (needReady && !global) {
        return null;
    }

    if (typeof children === 'function') {
        return children({global, setGlobal});
    }

    return children;
};

export const GetGlobal = ({globalKey, children}) => {
    const {global} = useGlobalContext(globalKey);
    return children({value: global});
};

export const GlobalInfo = ({globalKey, value, needReady, children}) => {
    const {global, setGlobal} = useGlobalContext(globalKey);
    const setGlobalHandler = useRefCallback(setGlobal);
    const prevValueRef = useRef(null);
    prevValueRef.current = global;
    useEffect(() => {
        if (isEqual(prevValueRef.current, value)) {
            return;
        }
        prevValueRef.current = value;
        setGlobalHandler(value);
    }, [value, setGlobalHandler]);

    if (needReady && !global) {
        return null;
    }
    return children({global, setGlobal});
};

const Global = ({children, className, ...props}) => {
    return (<ErrorBoundary
        errorRender={() => {
            return (<Result
                status="500"
                title="500"
                subTitle="程序出现异常，请刷新后重试"
            />);
        }}
    >
        <GlobalProvider {...props}>
            <div
                data-testid="components-core-global"
                className={classnames(style["container"], "container-body", className)}
            >
                {children}
            </div>
        </GlobalProvider>
    </ErrorBoundary>);
};

export default Global;
