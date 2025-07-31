import {Alert, Button, Col, Layout as AntdLayout, Row} from "antd";
import {useCallback, useEffect, useState} from "react";
import {defaultProps, Provider} from "./context";
import Navigation, {navigationHeight} from "@components/Navigation";
import {getScrollEl} from "@common/utils/importantContainer";
import ReactErrorBoundary from "@kne/react-error-boundary";
import {Header, HeaderInfo, Menu, Option, PageTitle} from "./Page";
import classnames from "classnames";
import style from "./style.module.scss";
import HelperGuide from "@components/HelperGuide";
import {usePermissions} from "../Permissions";

const {Content} = AntdLayout;

const ErrorComponent = () => {
    return (
        <Alert
            message="系统出了点小问题，可刷新页面进行解决"
            showIcon
            type="error"
            action={
                <Button size="small" danger onClick={() => window.location.reload()}>
                    刷新
                </Button>
            }
        />
    );
};

const ErrorBoundary = (props) => {
    return <ReactErrorBoundary {...props} errorComponent={ErrorComponent}/>;
};

const Layout = ({className, children, theme, navigation = {}}) => {
    const [scrollLeft, setScrollLeft] = useState(0);
    const [pageProps, _setPageProps] = useState(Object.assign({}, defaultProps));
    const {permissions} = usePermissions();
    const setPageProps = useCallback((value) => {
        return _setPageProps((pageProps) => {
            return Object.assign({}, pageProps, value);
        });
    }, []);
    useEffect(() => {
        const scrollEl = getScrollEl();
        const handlerScroll = () => {
            setScrollLeft(scrollEl.scrollLeft);
        };
        scrollEl.addEventListener("scroll", handlerScroll);
        return () => {
            scrollEl.removeEventListener("scroll", handlerScroll);
        };
    }, []);
console.log("navigation------", navigation)
    return (
        <AntdLayout
            className={classnames(style["layout"], className, 'core-layout')}
            style={Object.assign(
                {},
                {
                    "--nav-height": navigationHeight + "px",
                    "--nav-height-base": "var(--nav-height)",
                    "--scroll-left": -scrollLeft + "px",
                },
                theme
            )}
        >
            {navigation && (
                <ErrorBoundary>
                    <Navigation
                        permissions={permissions}
                        {...navigation}
                        onChange={(path) => {
                            navigation?.onChange && navigation.onChange(path);
                        }}
                    />
                </ErrorBoundary>
            )}
            <ErrorBoundary>
                <Content className={classnames(style["layout-content-wrap"], 'core-layout-content-wrap')}>
                    <Provider value={{pageProps, setPageProps}}>
                        <ErrorBoundary>
                            <Header/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <HeaderInfo/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <Row
                                className={classnames(pageProps.className, style["page-outer"])}
                                wrap={false}
                                style={{
                                    "--nav-height": `calc(${
                                        pageProps.headerFixed ? pageProps.headerHeight : 0
                                    }px + var(--nav-height-base))`,
                                    "--nav-only-height": `var(--nav-height-base)`,
                                }}
                            >
                                <ErrorBoundary>
                                    <Menu/>
                                </ErrorBoundary>
                                <Col className={classnames(style["page-content"], 'core-page-content', {
                                    [style["no-margin"]]: pageProps.noMargin,
                                })} flex={1} style={{"--background-color": pageProps.backgroundColor}}>
                                    <div className={classnames(style["page-main"], 'core-page-main')}>
                                        <ErrorBoundary>
                                            <PageTitle
                                                title={pageProps.title}
                                                backUrl={pageProps.backUrl}
                                                filter={pageProps.filter}
                                                titleExtra={pageProps.titleExtra}
                                                titleLeftExtra={pageProps.titleLeftExtra}
                                            />
                                        </ErrorBoundary>
                                        <div
                                            className={classnames(style["page-main-content"], 'core-page-main-content', {
                                                [style["no-padding"]]: pageProps.noPadding,
                                            })}
                                        >
                                            <ErrorBoundary>
                                                {pageProps.helperGuideName && (
                                                    <HelperGuide
                                                        className={classnames(style["helper-guide-page"], 'core-helper-guide-page')}
                                                        name={pageProps.helperGuideName}
                                                    />
                                                )}
                                                {children}
                                            </ErrorBoundary>
                                        </div>
                                    </div>
                                </Col>
                                <ErrorBoundary>
                                    <Option/>
                                </ErrorBoundary>
                            </Row>
                        </ErrorBoundary>
                    </Provider>
                </Content>
            </ErrorBoundary>
        </AntdLayout>
    );
};

export default Layout;
