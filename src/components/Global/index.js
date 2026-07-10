import "./polyfill";
import "simplebar/dist/simplebar.min.css";
import classnames from "classnames";
import {
    Global as GlobalContext, useGlobalContext as useContext, usePreset, GlobalValue, useGlobalValue, GlobalSetting
} from "@kne/global-context";
import {App, ConfigProvider as AntdConfigProvider, Result} from "antd";
import {useEffect, useState, useRef, useMemo, useCallback} from "react";
import SimpleBar from "simplebar";
import ErrorBoundary from "@kne/react-error-boundary";
import {getScrollEl} from "@common/utils/importantContainer";
import getPopupContainer from "@common/utils/getPopupContainer";
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
import {
    ResponsiveProvider,
    useScrollElement,
    usePopupContainer,
    useResponsiveContext,
    defaultResponsiveContextValue,
    RESPONSIVE_SCROLL_CLASS,
    IS_MOBILE_QUERY
} from "@kne/responsive-utils";

const hasParentResponsiveProvider = (parent) => {
    return parent.getBoundaryElement !== defaultResponsiveContextValue.getBoundaryElement
        || parent.getScrollElement !== defaultResponsiveContextValue.getScrollElement;
};

const isViewportMobile = () => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
        return false;
    }
    return window.matchMedia(IS_MOBILE_QUERY).matches;
};

(() => {
    if (window.__COMPONENTS_CORE_IN_SDK) {
        return;
    }
    document.body.classList.add(style["container"]);
    if (!isViewportMobile() && !window.__COMPONENTS_CORE_SIMPLE_BAR_DISABLED) {
        new SimpleBar(document.body);
        const scrollEl = getScrollEl();
        if (scrollEl) {
            scrollEl.classList.add(RESPONSIVE_SCROLL_CLASS, style["container"]);
        }
    } else {
        document.body.classList.add("simplebar-content-wrapper", RESPONSIVE_SCROLL_CLASS);
    }
})();


export const containerClassName = style["container"]
    .replace(/\+/g, "\\+")
    .replace(/\//g, "\\/");

const ConfigProvider = withFetch(({data: message, themeToken, children}) => {
    const getScrollElement = useScrollElement();
    const getPopupContainerFromContext = usePopupContainer();
    const resolvePopupContainer = useCallback((triggerNode) => {
        const contextContainer = getPopupContainerFromContext();
        if (!triggerNode) {
            return contextContainer;
        }
        const walked = getPopupContainer(triggerNode);
        const pageScroll = getScrollEl();
        if (contextContainer && walked === pageScroll) {
            return contextContainer;
        }
        return walked || contextContainer;
    }, [getPopupContainerFromContext]);
    const [isInit, setIsInit] = useState(false);
    const {colorPrimary, components, ...otherToken} = Object.assign({}, {colorPrimary: "#4096ff"}, themeToken);
    const colorPrimaryObject = useMemo(() => {
        return Color(colorPrimary)
    }, [colorPrimary]);
    const mixPrimaryOnBg = useMemo(() => {
        const primaryBgBase = "#ffffff";
        return ratio => colorPrimaryObject.mix(Color(primaryBgBase), 1 - ratio).string();
    }, [colorPrimaryObject]);

    const [statusColors, setStatusColors] = useState({});

    useEffect(() => {
        const containerEl = document.querySelector(`.${containerClassName}`);
        const styles = getComputedStyle(containerEl);
        setStatusColors({
            colorSuccess: styles.getPropertyValue("--state-success-color"),
            colorError: styles.getPropertyValue("--state-error-color"),
            colorWarning: styles.getPropertyValue("--state-warning-color"),
            colorInfo: styles.getPropertyValue("--state-info-color"),
        });
    }, []);

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
            "--primary-color-06": mixPrimaryOnBg(0.06),
        };
        range(0, 10).forEach((i) => {
            themeProps[`--primary-color-${i + 1}`] = mixPrimaryOnBg((i + 1) / 10);
        });
        styleEl.textContent = `.${containerClassName}{${transform(themeProps, (result, value, key) => {
            result.push(`${key}:${value};`);
        }, []).join("")}}`;
        setIsInit(true);
        return () => {
            // uninstall();
        };
    }, [colorPrimary, colorPrimaryObject, mixPrimaryOnBg]);
    //设置主题色成功再展示页面
    if (!isInit) {
        return null;
    }
    return (<AntdConfigProvider
        getTargetContainer={getScrollElement}
        getPopupContainer={resolvePopupContainer}
        locale={message}
        wave={{disabled: true}}
        autoInsertSpace={false}
        warning={{strict: false}}
        theme={{
            components, token: Object.assign({}, {
                ...statusColors,
                colorPrimary: colorPrimary,
                colorPrimaryBg: mixPrimaryOnBg(0.1),
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

const GlobalResponsiveScope = ({children}) => {
    const parent = useResponsiveContext();
    if (hasParentResponsiveProvider(parent)) {
        return children;
    }
    return (
        <ResponsiveProvider
            getScrollElement={() => getScrollEl() || document.documentElement}
        >
            {children}
        </ResponsiveProvider>
    );
};

export const GlobalProvider = ({
                                   preset = {locale: "zh-CN", apis: {}}, children, themeToken, init, ...props
                               }) => {
    const locale = get(preset, "locale", "zh-CN");

    const localMessageRef = useRef(null);
    const enumsRef = useRef(null);

    return (<GlobalContext preset={preset} initValue={Object.assign({}, props, {
        themeToken, localMessageRef, enumsRef, locale,
    }, get(preset, "global"))}>
        <GlobalResponsiveScope>
            <GlobalValue globalKey="locale">{({value: locale}) => {
            return <ConfigProvider
                loader={loadAntdLocale}
                params={{locale}}
                themeToken={themeToken}
            >
                <App message={{top: 100}}>
                    <AppDrawer>
                        {typeof init === "function" ? (<Fetch
                            loader={() => init()}
                            render={() => children}
                        />) : (children)}
                    </AppDrawer>
                </App>
                <GlobalFontLoader/>
            </ConfigProvider>;
        }}</GlobalValue>
        </GlobalResponsiveScope>
    </GlobalContext>);
};

export const PureGlobal = ({children, ...props}) => {
    const themeToken = useGlobalValue("themeToken");
    return (<GlobalProvider {...props} themeToken={props.themeToken || themeToken}>
        <div
            data-testid="components-core-pure-global"
            className={classnames(style["container"], "core-container-body")}
        >
            {children}
        </div>
    </GlobalProvider>);
};

export {usePreset, useGlobalValue, GlobalSetting, GlobalValue};

export {
    ResponsiveProvider,
    useIsMobile,
    useBreakpoint,
    useMediaQuery,
    usePopupContainer,
    useScrollElement,
    useResponsiveContext,
    defaultResponsiveContextValue,
    MOBILE_BREAKPOINT
} from "@kne/responsive-utils";

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
