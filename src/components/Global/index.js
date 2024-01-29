import "./polyfill";
import loadFont from "./loadFont";
import "simplebar/dist/simplebar.css";
import "./override.scss";
import classnames from "classnames";
import { Provider, useGlobalContext as useContext } from "@kne/global-context";
import { Provider as PresetProvider, usePreset } from "@kne/global-preset";
import { App, ConfigProvider as AntdConfigProvider, Result, theme } from "antd";
import { useEffect, useState, useRef } from "react";
import SimpleBar from "simplebar";
import ErrorBoundary from "@kne/react-error-boundary";
import { getScrollEl } from "@common/utils/importantContainer";
import { withFetch } from "@kne/react-fetch";
import loadAntdLocale from "./loadAntdLocale";
import style from "./style.module.scss";
import get from "lodash/get";
import { AppDrawer } from "@components/Drawer";
import useRefCallback from "@kne/use-ref-callback";
import transform from "lodash/transform";
import range from "lodash/range";
import Color from "color";

new SimpleBar(document.body);
document.body.classList.add(style["container"]);
getScrollEl().classList.add(style["container"]);

const ConfigProvider = withFetch(({ data: message, themeToken, children }) => {
  const [isInit, setIsInit] = useState(false);
  useEffect(() => {
    let styleEl = document.head.querySelector("#component-core-theme");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "component-core-theme";
      document.head.appendChild(styleEl);
    }
    const colorPrimary = Color(themeToken.colorPrimary);
    const themeProps = {
      "--primary-color": themeToken.colorPrimary,
      "--primary-color-red": colorPrimary.red(),
      "--primary-color-green": colorPrimary.green(),
      "--primary-color-blue": colorPrimary.blue(),
      "--primary-color-06": colorPrimary.alpha(0.06).string(),
    };
    range(0, 10).forEach((i) => {
      themeProps[`--primary-color-${i + 1}`] = colorPrimary
        .alpha((i + 1) / 10)
        .string();
    });
    styleEl.textContent = `.${style["container"]
      .replace(/\+/g, "\\+")
      .replace(/\//g, "\\/")}{${transform(
      themeProps,
      (result, value, key) => {
        result.push(`${key}:${value};`);
      },
      []
    ).join("")}}`;
    setIsInit(true);
    return () => {
      // uninstall();
    };
  }, [themeToken.colorPrimary]);
  //设置主题色成功再展示页面
  if (!isInit) {
    return null;
  }
  return (
    <AntdConfigProvider
      getTargetContainer={getScrollEl}
      getPopupContainer={getScrollEl}
      locale={message}
      theme={{
        token: Object.assign(
          {},
          {
            borderRadius: 2,
            colorError: "#f53f3f",
            colorInfo: "#165dff",
            colorSuccess: "#00b42a",
            colorWarning: "#ff7d00",
            algorithm: themeToken.isDark
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
            colorPrimary: themeToken.colorPrimary,
            colorPrimaryHover: Color(themeToken.colorPrimary)
              .lighten(0.1)
              .hex(),
            colorPrimaryActive: Color(themeToken.colorPrimary)
              .darken(0.1)
              .hex(),
            controlItemBgActive: "var(--primary-color-1)",
            controlItemBgHover: "var(--primary-color-1)",
            colorTextBase: "#222222",
            colorText: "#222222",
            colorLink: themeToken.colorPrimary,
            colorLinkActive: themeToken.colorPrimary,
            colorLinkHover: themeToken.colorPrimary,
          },
          themeToken
        ),
      }}
    >
      {children}
    </AntdConfigProvider>
  );
});

ConfigProvider.defaultProps = {
  themeToken: {
    colorPrimary: "#5cb8b2",
  },
};

export { loadFont };

export const GlobalProvider = ({ preset, children, themeToken, ...props }) => {
  const locale = get(preset, "locale", "zh-CN");
  const localMessageRef = useRef({});
  const enumsRef = useRef(new Map());
  const [global, setGlobal] = useState(
    Object.assign(
      { themeToken, localMessageRef, enumsRef },
      get(preset, "global")
    )
  );
  return (
    <Provider
      value={{
        ...props,
        preset,
        global,
        setGlobal,
      }}
    >
      <PresetProvider value={preset}>
        <ConfigProvider
          loader={loadAntdLocale}
          params={{ locale }}
          themeToken={global.themeToken}
        >
          <App
            message={{
              top: 100,
            }}
          >
            <AppDrawer>{children}</AppDrawer>
          </App>
        </ConfigProvider>
      </PresetProvider>
    </Provider>
  );
};

GlobalProvider.defaultProps = {
  preset: {
    locale: "zh-CN",
    apis: {},
  },
};

export const PureGlobal = ({ children, ...props }) => {
  const { global: themeToken } = useGlobalContext("themeToken");
  return (
    <GlobalProvider {...props} themeToken={props.themeToken || themeToken}>
      <div
        data-testid="components-core-pure-global"
        className={classnames(style["container"], "core-container-body")}
      >
        {children}
      </div>
    </GlobalProvider>
  );
};

export { usePreset };

export const useGlobalContext = (globalKey) => {
  const contextValue = useContext();
  return Object.assign(
    {
      global: {},
      setGlobal: () => {
        console.warn("调用setGlobal的组件应该被放置在Global上下文中");
      },
    },
    contextValue,
    globalKey
      ? {
          global: get(contextValue.global, globalKey),
          setGlobal: (value) => {
            contextValue.setGlobal(
              typeof value === "function"
                ? (global) => {
                    return Object.assign({}, global, {
                      [globalKey]: value(get(global, globalKey)),
                    });
                  }
                : Object.assign({}, contextValue.global, {
                    [globalKey]: value,
                  })
            );
          },
        }
      : {}
  );
};

export const SetGlobal = ({ globalKey, value, needReady, children }) => {
  const { global, setGlobal } = useGlobalContext(globalKey);
  const setGlobalHandler = useRefCallback(setGlobal);

  useEffect(() => {
    setGlobalHandler(value);
  }, [value, setGlobalHandler]);

  if (needReady && !global) {
    return null;
  }

  return children;
};

export const GetGlobal = ({ globalKey, children }) => {
  const { global } = useGlobalContext(globalKey);
  return children({ value: global });
};

const Global = ({ children, className, ...props }) => {
  return (
    <ErrorBoundary
      errorRender={() => {
        return (
          <Result
            status="500"
            title="500"
            subTitle="程序出现异常，请刷新后重试"
          />
        );
      }}
    >
      <GlobalProvider {...props}>
        <div
          data-testid="components-core-global"
          className={classnames(
            style["container"],
            "container-body",
            className
          )}
        >
          {children}
        </div>
      </GlobalProvider>
    </ErrorBoundary>
  );
};

export default Global;
