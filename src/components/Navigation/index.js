import {Col, Layout, Menu, Row, Space} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import get from "lodash/get";
import {useEffect, useMemo, useRef, useState} from "react";
import classnames from "classnames";
import logo from "./favicon.svg";
import Image from "@components/Image";
import importMessages from "./locale";
import {FormattedMessage, IntlProvider} from "@components/Intl";
import useRefCallback from "@kne/use-ref-callback";
import Icon from "@components/Icon";
import style from "./style.module.scss";

const {Header} = Layout;

export const navigationHeight = 48;

const SetTitle = ({name, mapping, defaultTitle}) => {
    const propsRef = useRef({
        mapping,
        defaultTitle,
    });
    useEffect(() => {
        const title = get(propsRef.current.mapping.get(name), "title");
        document.title = (title ? title + "-" : "") + propsRef.current.defaultTitle;
    }, [name]);
    return null;
};

const MenuReady = ({onReady}) => {
    const ready = useRefCallback(onReady);
    useEffect(() => {
        ready();
    }, [ready]);
    return null;
};

const Navigation = ({
                        permissions=[],
                        list=[],
                        headerLogo,
                        rightOptions,
                        isFixed=true,
                        showIndex=true,
                        indexLabel,
                        defaultTitle,
                        overflowedIndicator,
                        base='',
                        onChange,
                        className,
                        navigateTo,
                    }) => {
    const mapping = useMemo(() => {
        return new Map(list.map(({key, ...others}) => [key, others]));
    }, [list]);
    const nav = useNavigate();
    const navigate = typeof navigateTo === 'function' ? navigateTo : nav;
    const location = useLocation();
    const navigationRef = useRef();
    const resizeObserverRef = useRef(null);
    const [nameLabel, setNameLabel] = useState("更多");
    const [ready, setReady] = useState(false);
    const pathModuleName = location.pathname
        .replace(new RegExp(`^${base}`), "")
        .split("/")[1];
    const name = pathModuleName
        ? get(
            Array.from(mapping.entries()).find(([name, {path, permission}]) => {
                const _path =
                    typeof path === "function" ? path(permission, permissions) : path;
                return _path.indexOf("/" + pathModuleName) !== -1;
            }),
            "[0]"
        )
        : "home";

    useEffect(() => {
        const callback = () => {
            if (navigationRef.current) {
                const menuDom =
                    navigationRef.current.querySelectorAll(`li[data-menu-id]`);
                let exist = false;
                for (let i = 0; i < menuDom.length; i++) {
                    const dom = menuDom[i];
                    const menuId = dom.getAttribute("data-menu-id");
                    if (menuId.indexOf(name) !== -1) {
                        exist = true;
                        break;
                    }
                }
                let _nameLabel =
                    mapping.get(name) && !exist ? get(mapping.get(name), "title") : "";
                setNameLabel(_nameLabel);
            }
        };
        const mutationObserverInitConfig = {
            attributes: true,
            childList: true,
            subtree: true,
        };
        if (ready && navigationRef && navigationRef.current) {
            callback();
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }
            resizeObserverRef.current = new MutationObserver(callback);
            resizeObserverRef.current.observe(
                navigationRef.current,
                mutationObserverInitConfig
            );
        }

        return () => {
            resizeObserverRef.current && resizeObserverRef.current.disconnect();
        };
    }, [name, mapping, ready]);
    const indexNav = showIndex
        ? {
            label: indexLabel || (
                <FormattedMessage id="indexLabel" moduleName="Navigation"/>
            ),
            key: "home",
            onClick: () => {
                onChange && onChange("/");
                setTimeout(() => {
                    navigate("/");
                }, 0);
            },
        }
        : false;

    return (
        <IntlProvider importMessages={importMessages} moduleName="Navigation">
            <FormattedMessage id="defaultTitle" moduleName="Navigation">
                {(text) => (
                    <SetTitle
                        defaultTitle={defaultTitle || text}
                        mapping={mapping}
                        name={name}
                    />
                )}
            </FormattedMessage>
            <div className={classnames(style["navigation-wrap"], className)}>
                <Header
                    className={classnames("navigation", style["navigation"], {
                        [style["is-fixed"]]: isFixed,
                    })}
                >
                    <Row justify="space-around" wrap={false}>
                        <Col
                            className={classnames(
                                "navigation-logo",
                                style["navigation-logo"]
                            )}
                        >
                            <Image
                                className={classnames(style["logo"])}
                                src={logo}
                                alt="logo"
                                {...headerLogo}
                            />
                        </Col>
                        <Col
                            ref={navigationRef}
                            flex={1}
                            className={classnames(
                                "navigation-list",
                                style["navigation-list"]
                            )}
                        >
                            <MenuReady
                                onReady={() => {
                                    setReady(true);
                                }}
                            />
                            <Menu className={classnames(style['main-menu'], 'navigation-main-menu')}
                                  selectedKeys={[name]}
                                  mode="horizontal"
                                  overflowedIndicator={
                                      overflowedIndicator || (
                                          <Space size={4}>
                      <span>
                        {nameLabel || (
                            <FormattedMessage
                                id="overflowedIndicator"
                                moduleName="Navigation"
                            />
                        )}
                      </span>
                                              <span className={style["more-icon"]}>
                        <Icon type="icon-arrow-thin-down"/>
                      </span>
                                          </Space>
                                      )
                                  }
                                  items={[
                                      indexNav,
                                      ...Array.from(mapping.entries())
                                          .filter(([name, {permission}]) => {
                                              if (typeof permission === "string") {
                                                  return permissions.indexOf(permission) > -1;
                                              }
                                              if (typeof permission === "function") {
                                                  return permission(permissions);
                                              }
                                              if (Array.isArray(permission)) {
                                                  for (let item of permission) {
                                                      if (permissions.indexOf(item) > -1) {
                                                          return true;
                                                      }
                                                  }
                                                  return false;
                                              }
                                              return true;
                                          })
                                          .map(([name, {title, path, permission}]) => {
                                              const _path =
                                                  typeof path === "function"
                                                      ? path(permission, permissions)
                                                      : path;
                                              return {
                                                  label: title,
                                                  key: name,
                                                  onClick: () => {
                                                      onChange && onChange(_path);
                                                      setTimeout(() => {
                                                          navigate(_path);
                                                      }, 0);
                                                  },
                                              };
                                          }),
                                  ]}
                            />
                        </Col>
                        <Col className={style["navigation-options"]}>{rightOptions}</Col>
                    </Row>
                </Header>
            </div>
        </IntlProvider>
    );
};

export default Navigation;
