import {Col, Layout, Menu, Row, Space, Flex, Dropdown} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router-dom";
import get from "lodash/get";
import {useEffect, useMemo, useRef, useState} from "react";
import classnames from "classnames";
import logo from "./favicon.svg";
import Image from "@components/Image";
import withLocale from './withLocale';
import {useIntl} from "@kne/react-intl";
import useRefCallback from "@kne/use-ref-callback";
import useResize from "@kne/use-resize";
import Icon from "@components/Icon";
import style from "./style.module.scss";

const {Header} = Layout;

export const mobileBreakpoint = 768;

const SetTitle = ({name, mapping, defaultTitle}) => {
    const propsRef = useRef({
        mapping, defaultTitle,
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

const Navigation = withLocale(({
                                   permissions = [],
                                   list = [],
                                   headerLogo,
                                   rightOptions,
                                   isFixed = true,
                                   showIndex = true,
                                   indexLabel,
                                   defaultTitle,
                                   overflowedIndicator,
                                   base = '',
                                   onChange,
                                   className,
                                   navigateTo,
                                   isMobile: forceMobile,
                               }) => {
    const {formatMessage} = useIntl();
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
    const [autoIsMobile, setAutoIsMobile] = useState(false);
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const callback = (el) => {
        const width = el ? el.getBoundingClientRect().width : window.innerWidth;
        if (forceMobile === undefined) {
            setAutoIsMobile(width < mobileBreakpoint);
            if (!autoIsMobile && width < mobileBreakpoint) {
                setMobileMenuVisible(false);
            }
        }
    }
    const windowResizeRef = useResize(callback);
    useEffect(() => {
        callback(windowResizeRef.current);
    }, []);
    const pathModuleName = location.pathname
        .replace(new RegExp(`^${base}`), "")
        .split("/")[1];
    const name = pathModuleName ? get(Array.from(mapping.entries()).find(([name, {path, permission}]) => {
        const _path = typeof path === "function" ? path(permission, permissions) : path;
        return _path.indexOf("/" + pathModuleName) !== -1;
    }), "[0]") : "home";

    // 是否为移动端（优先使用强制指定的值，否则使用自动检测的值）
    const isMobile = forceMobile !== undefined ? forceMobile : autoIsMobile;

    // 处理移动端菜单项点击
    const handleMobileMenuClick = (path) => {
        setMobileMenuVisible(false);
        onChange && onChange(path);
        setTimeout(() => {
            navigate(path);
        }, 0);
    };

    useEffect(() => {
        const callback = () => {
            if (navigationRef.current) {
                const menuDom = navigationRef.current.querySelectorAll(`li[data-menu-id]`);
                let exist = false;
                for (let i = 0; i < menuDom.length; i++) {
                    const dom = menuDom[i];
                    const menuId = dom.getAttribute("data-menu-id");
                    if (menuId.indexOf(name) !== -1) {
                        exist = true;
                        break;
                    }
                }
                let _nameLabel = mapping.get(name) && !exist ? get(mapping.get(name), "title") : "";
                setNameLabel(_nameLabel);
            }
        };
        const mutationObserverInitConfig = {
            attributes: true, childList: true, subtree: true,
        };
        if (ready && navigationRef && navigationRef.current) {
            callback();
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }
            resizeObserverRef.current = new MutationObserver(callback);
            resizeObserverRef.current.observe(navigationRef.current, mutationObserverInitConfig);
        }

        return () => {
            resizeObserverRef.current && resizeObserverRef.current.disconnect();
        };
    }, [name, mapping, ready]);
    const indexNav = showIndex ? {
        label: indexLabel || formatMessage({id: 'indexLabel'}), key: "home", onClick: () => {
            onChange && onChange("/");
            setTimeout(() => {
                navigate("/");
            }, 0);
        },
    } : false;

    return (<>
        <SetTitle
            defaultTitle={defaultTitle || formatMessage({id: 'defaultTitle'})}
            mapping={mapping}
            name={name}
        />
        <div className={classnames(style["navigation-wrap"], className, {
            [style["is-mobile"]]: isMobile,
        })}>
            <div ref={windowResizeRef} className={classnames("navigation", style["navigation"], {
                [style["is-fixed"]]: isFixed,
            })}>
                <Header>
                    <Row wrap={false}>
                        {isMobile && (
                            <Col className={classnames(style["navigation-mobile-menu"], "navigation-mobile-menu")}>
                                <Dropdown
                                    placement="bottomLeft"
                                    trigger={['click']}
                                    open={mobileMenuVisible}
                                    onOpenChange={setMobileMenuVisible}
                                    dropdownRender={(menu) => (<div className={style["mobile-dropdown-content"]}>
                                        {menu}
                                        {rightOptions && (<div className={style["mobile-dropdown-options"]}>
                                            {rightOptions}
                                        </div>)}
                                    </div>)}
                                    menu={{
                                        selectedKeys: [name], items: [indexNav, ...Array.from(mapping.entries())
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
                                            .map(([name, {title, icon, path, permission}]) => {
                                                const _path = typeof path === "function" ? path(permission, permissions) : path;
                                                return {
                                                    label: icon ? <Flex gap={8} align="center">
                                                        {icon}
                                                        <span>{title}</span>
                                                    </Flex> : title,
                                                    key: name,
                                                    onClick: () => handleMobileMenuClick(_path),
                                                };
                                            })],
                                    }}
                                >
                                    <div className={classnames(style["mobile-menu-trigger"], "mobile-menu-trigger")}>
                                        <MenuOutlined/>
                                    </div>
                                </Dropdown>
                            </Col>)}
                        {!isMobile && (<Col
                            className={classnames("navigation-logo", style["navigation-logo"])}
                        >
                            <Image
                                className={classnames(style["logo"])}
                                alt="logo"
                                {...Object.assign({}, headerLogo || {src: logo})}
                            />
                        </Col>)}
                        {!isMobile && (<Col
                            ref={navigationRef}
                            flex={1}
                            className={classnames("navigation-list", style["navigation-list"])}
                        >
                            <MenuReady
                                onReady={() => {
                                    setReady(true);
                                }}
                            />
                            <Menu className={classnames(style['main-menu'], 'navigation-main-menu')}
                                  selectedKeys={[name]}
                                  mode="horizontal"
                                  overflowedIndicator={overflowedIndicator || (<Space size={4}>
                      <span>
                        {nameLabel || formatMessage({id: 'overflowedIndicator'})}
                      </span>
                                      <span className={style["more-icon"]}>
                        <Icon type="icon-arrow-thin-down"/>
                      </span>
                                  </Space>)}
                                  items={[indexNav, ...Array.from(mapping.entries())
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
                                      .map(([name, {title, icon, path, permission}]) => {
                                          const _path = typeof path === "function" ? path(permission, permissions) : path;
                                          return {
                                              label: icon ? <Flex gap={8}>
                                                  {icon}
                                                  <span>{title}</span>
                                              </Flex> : title, key: name, onClick: () => {
                                                  onChange && onChange(_path);
                                                  setTimeout(() => {
                                                      navigate(_path);
                                                  }, 0);
                                              },
                                          };
                                      }),]}
                            />
                        </Col>)}
                        {isMobile && (<Col className={style["navigation-mobile-title"]}>
                            {defaultTitle || formatMessage({id: 'defaultTitle'})}
                        </Col>)}
                        {!isMobile && <Col className={style["navigation-options"]}>{rightOptions}</Col>}
                    </Row>
                </Header>
            </div>
        </div>
    </>);
});

export default Navigation;
