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

const renderWithOptions = (footer, options) => {
    if (typeof footer === "function") {
        return footer(options);
    }
    return footer;
};

const sizeMap = (type) => {
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
        className: classnames(className, style["drawer"]), ...sizeMap(size),
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

const Drawer = ({size = "small", ...props}) => {
    return <AntdDrawer {...computedCommonProps({size, ...props})} />;
};

export const useDrawer = () => {
    const {drawer} = AppDrawer.useAppDrawer();
    return (props) => {
        const api = {};
        const {...otherProps} = computedCommonProps({
            onClose: () => api.close(), ...props,
        });
        const {destroy} = drawer({
            ...otherProps,
        });
        api.close = destroy;
        return api;
    };
};

export default Drawer;
