import {Button, Col, Drawer as AntdDrawer, Row, Space} from "antd";
import classnames from "classnames";
import style from "./style.module.scss";
import importMessages from "./locale";
import {IntlProvider} from "@components/Intl";
import AppDrawer from "./AppDrawer";
import LoadingButton from "@components/LoadingButton";
import React, {useEffect, useRef} from "react";
import SimpleBar from "simplebar";
import Icon from "@components/Icon";
import {useIsMobile, usePopupContainer} from "@kne/responsive-utils";

const renderWithOptions = (footer, options) => {
    if (typeof footer === "function") {
        return footer(options);
    }
    return footer;
};

const VIEWPORT_WIDTH = 'var(--kne-viewport-width, 100vw)';

const sizeMap = (type, isMobile) => {
    if (isMobile) {
        return {width: VIEWPORT_WIDTH};
    }
    if (type === "large") {
        return {width: "calc(100vw - 64px)"};
    }
    if (type === "small") {
        return {width: "600px"};
    }
    return {width: "1000px"};
};

const Footer = ({footer, footerButtons, onConfirm, onCancel, onClose}) => {
    return (<Row gutter={10} wrap={false}>
        <Col flex={1}>{footer}</Col>
        {Array.isArray(footerButtons) && footerButtons.length === 0 ? null : (<Col>
            <Space>
                {(footerButtons || [{children: "取消", onClick: onCancel}, {
                    type: "primary", children: "确定", onClick: onConfirm,
                },]).map(({ButtonComponent, onClick, autoClose = true, ...props}, index) => {
                    const CurrentButton = ButtonComponent || LoadingButton;
                    return (<CurrentButton
                        {...props}
                        key={index}
                        onClick={async (...args) => {
                            const res = await Promise.resolve(onClick && onClick(...args));
                            autoClose && res !== false && onClose && onClose();
                            return res;
                        }}
                    />);
                })}
            </Space>
        </Col>)}
    </Row>);
};

const DrawerOuter = ({
                         title,
                         footer,
                         disabledScroller,
                         footerButtons,
                         onClose,
                         closable,
                         onConfirm,
                         onCancel,
                         children,
                     }) => {
    const modalBodyRef = useRef(null);
    useEffect(() => {
        !disabledScroller && new SimpleBar(modalBodyRef.current);
    }, [disabledScroller]);
    return (<div className={style["drawer-outer"]} data-testid="components-core-drawer">
        {closable === false ? null : (<Button
            data-testid="components-core-drawer-close-btn"
            className={classnames(style["drawer-close"], "drawer-close")}
            type="text"
            icon={<Icon type="icon-close-thin"/>}
            onClick={(e) => {
                e.stopPropagation();
                onClose && onClose();
            }}
        />)}
        {title && (<div className={classnames(style["drawer-title"], "drawer-title")}>
            {title}
        </div>)}
        <div
            className={classnames(style["drawer-body"], "drawer-body", {
                [style["is-disabled-scroller"]]: disabledScroller,
            })}
            ref={modalBodyRef}
        >
            <div
                className={classnames(style["drawer-body-inner"], "drawer-body-inner")}
            >
                {children}
            </div>
        </div>
        {footer === null && !footerButtons ? null : (
            <div className={classnames(style["drawer-footer"], "drawer-footer")}>
                <Footer
                    footer={footer}
                    footerButtons={footerButtons}
                    onConfirm={onConfirm}
                    onCancel={onCancel}
                    onClose={onClose}
                />
            </div>)}
    </div>);
};

const runWithDecorator = ({
                              withDecorator,
                              footerButtons,
                              title,
                              closable,
                              onClose,
                              onConfirm,
                              onCancel,
                              footer,
                              disabledScroller,
                              children,
                          }) => {
    const getInner = (props) => {
        props = Object.assign({}, props);
        return (<DrawerOuter
            title={title}
            closable={closable}
            onClose={onClose}
            onConfirm={onConfirm}
            onCancel={onCancel}
            footerButtons={renderWithOptions(footerButtons, {
                ...props, close: onClose,
            })}
            disabledScroller={disabledScroller}
            footer={renderWithOptions(footer, {...props, close: onClose})}
        >
            {renderWithOptions(children, {
                ...props, close: onClose,
            })}
        </DrawerOuter>);
    };
    return typeof withDecorator === "function" ? withDecorator(getInner) : getInner({});
};

export const computedCommonProps = ({
                                        children,
                                        footer,
                                        footerButtons,
                                        className,
                                        size,
                                        title,
                                        onClose,
                                        onConfirm,
                                        onCancel,
                                        closable,
                                        disabledScroller,
                                        withDecorator,
                                        isMobile,
                                        classNames: customClassNames,
                                        styles: customStyles,
                                        rootClassName,
                                        ...props
                                    }) => {
    return {
        ...props,
        icon: null,
        title: null,
        maskClosable: props.hasOwnProperty("maskClosable") ? props.maskClosable : false,
        destroyOnHidden: true,
        footer: null,
        closable: false,
        onCancel: onClose,
        className: classnames(className, style["drawer"], style[size], {
            [style["is-mobile"]]: isMobile,
        }),
        rootClassName: classnames(rootClassName, isMobile && style["drawer-root-mobile"]),
        classNames: {
            ...customClassNames,
            wrapper: classnames(customClassNames?.wrapper, isMobile && style["drawer-wrapper-mobile"]),
        },
        styles: isMobile ? {
            ...customStyles,
            wrapper: {
                ...customStyles?.wrapper,
                width: VIEWPORT_WIDTH,
                maxWidth: "100%",
            },
        } : customStyles,
        ...sizeMap(size, isMobile),
        children: (<IntlProvider importMessages={importMessages} moduleName="Drawer">
            {runWithDecorator({
                withDecorator,
                title,
                closable,
                onClose,
                onConfirm,
                onCancel,
                footer,
                footerButtons,
                disabledScroller,
                children,
            })}
        </IntlProvider>),
    };
};

const Drawer = ({size = "small", getContainer, ...props}) => {
    const isMobile = useIsMobile();
    const getPopupContainer = usePopupContainer();
    return (
        <AntdDrawer
            {...computedCommonProps({size, isMobile, ...props})}
            getContainer={getContainer ?? getPopupContainer}
        />
    );
};

export const useDrawer = () => {
    const {drawer} = AppDrawer.useAppDrawer();
    const isMobile = useIsMobile();
    const getPopupContainer = usePopupContainer();
    return (props) => {
        const api = {};
        const {getContainer, ...otherProps} = computedCommonProps({
            onClose: () => api.close(), isMobile, ...props,
        });
        const {destroy} = drawer({
            ...otherProps,
            getContainer: getContainer ?? getPopupContainer,
        });
        api.close = destroy;
        return api;
    };
};

export default Drawer;
