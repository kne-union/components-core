import { Alert, Button, Col, Layout as AntdLayout, Row } from "antd";
import { useCallback, useEffect, useState } from "react";
import { defaultProps, Provider } from "./context";
import Navigation, { navigationHeight } from "@components/Navigation";
import { getScrollEl } from "@common/utils/importantContainer";
import ReactErrorBoundary from "@kne/react-error-boundary";
import { Header, HeaderInfo, Menu, Option, PageTitle, Footer } from "./Page";
import classnames from "classnames";
import style from "./style.module.scss";
import HelperGuide from "@components/HelperGuide";

const { Content } = AntdLayout;

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
  return <ReactErrorBoundary {...props} errorComponent={ErrorComponent} />;
};

const Layout = ({ children, theme, navigation }) => {
  const [scrollLeft, setScrollLeft] = useState(0);
  const [pageProps, _setPageProps] = useState(Object.assign({}, defaultProps));
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

  return (
    <AntdLayout
      className={style["layout"]}
      style={Object.assign(
        {},
        {
          "--nav-height": navigationHeight + "px",
          "--nav-height-base": "var(--nav-height)",
          "--footer-height": 0 + "px",
          "--footer-height-base": "var(--footer-height)",
          "--scroll-left": -scrollLeft + "px",
        },
        theme
      )}
    >
      {navigation && (
        <ErrorBoundary>
          <Navigation
            {...navigation}
            onChange={(path) => {
              navigation?.onChange && navigation.onChange(path);
            }}
          />
        </ErrorBoundary>
      )}
      <ErrorBoundary>
        <Content className={style["layout-content-wrap"]}>
          <Provider value={{ pageProps, setPageProps }}>
            <ErrorBoundary>
              <Header />
            </ErrorBoundary>
            <ErrorBoundary>
              <HeaderInfo />
            </ErrorBoundary>
            <ErrorBoundary>
              <Row
                className={classnames(pageProps.className, style["page-outer"])}
                wrap={false}
                style={{
                  "--nav-height": `calc(${pageProps.headerHeight}px + var(--nav-height-base))`,
                  "--nav-only-height": `var(--nav-height-base)`,
                  "--footer-height": `calc(${pageProps.footerHeight}px + var(--footer-height-base))`,
                  "--footer-only-height": `var(--footer-height-base)`,
                }}
              >
                <ErrorBoundary>
                  <Menu />
                </ErrorBoundary>
                <Col
                  className={classnames(style["page-content"], {
                    [style["no-margin"]]: pageProps.noMargin,
                  })}
                  flex={1}
                  style={{ "--background-color": pageProps.backgroundColor }}
                >
                  <div className={style["page-main"]}>
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
                      className={classnames(style["page-main-content"], {
                        [style["no-padding"]]: pageProps.noPadding,
                      })}
                    >
                      <ErrorBoundary>
                        {pageProps.helperGuideName && (
                          <HelperGuide
                            className={style["helper-guide-page"]}
                            name={pageProps.helperGuideName}
                          />
                        )}
                        {children}
                      </ErrorBoundary>
                    </div>
                  </div>
                </Col>
                <ErrorBoundary>
                  <Option />
                </ErrorBoundary>
              </Row>
            </ErrorBoundary>
            <ErrorBoundary>
              <Footer />
            </ErrorBoundary>
          </Provider>
        </Content>
      </ErrorBoundary>
    </AntdLayout>
  );
};

Layout.defaultProps = {
  navigation: {},
};

export default Layout;
