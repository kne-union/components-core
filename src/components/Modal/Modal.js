import React, {useEffect, useRef} from "react";
import {App, Button, Col, Modal as AntdModal, Row, Space} from "antd";
import classnames from "classnames";
import style from "./style.module.scss";
import importMessages from "./locale";
import {FormattedMessage, IntlProvider} from "@components/Intl";
import Icon from "@components/Icon";
import renderWithOptions from "./renderWithOptions";
import LoadingButton from "@components/LoadingButton";
import SimpleBar from "@common/components/SimpleBar";
import {useIsMobile, usePopupContainer, useScrollElement} from "@kne/responsive-utils";

const localeModuleName = "Modal";

let parentScrollLockCount = 0;
let parentScrollLocked = [];

const lockParentScroll = (getScrollElement) => {
    parentScrollLockCount += 1;
    if (parentScrollLockCount === 1) {
        const targets = [document.body];
        const scrollEl = typeof getScrollElement === "function" ? getScrollElement() : null;
        if (scrollEl && scrollEl !== document.body && !targets.includes(scrollEl)) {
            targets.push(scrollEl);
        }
        parentScrollLocked = targets.map((el) => {
            const prev = {
                overflow: el.style.overflow,
                overscrollBehavior: el.style.overscrollBehavior,
            };
            el.style.overflow = "hidden";
            el.style.overscrollBehavior = "none";
            return {el, prev};
        });
    }
    return () => {
        parentScrollLockCount = Math.max(0, parentScrollLockCount - 1);
        if (parentScrollLockCount === 0) {
            parentScrollLocked.forEach(({el, prev}) => {
                el.style.overflow = prev.overflow;
                el.style.overscrollBehavior = prev.overscrollBehavior;
            });
            parentScrollLocked = [];
        }
    };
};

const useLockParentScroll = (enabled, getScrollElement) => {
    useEffect(() => {
        if (!enabled) {
            return undefined;
        }
        return lockParentScroll(getScrollElement);
    }, [enabled, getScrollElement]);
};

export const RightOptions = ({options, rightSpan = 6, children, isMobile}) => {
    if (!options) {
        return children;
    }
    if (isMobile) {
        return (<div className={classnames(style["right-options-row"], style["is-mobile"])}>
            <div className={classnames(style["right-options-col"], style["right-options-main"])}>
                {children}
            </div>
            <div className={classnames(style["right-options-col"], style["right-options-side"])}>
                {options}
            </div>
        </div>);
    }
    return (<Row wrap={false} className={style["right-options-row"]}>
        <Col span={24 - rightSpan} className={style["right-options-col"]}>
            {children}
        </Col>
        <Col span={rightSpan} className={style["right-options-col"]}>
            {options}
        </Col>
    </Row>);
};

const calcHeight = (height, footer) => {
    return `${height - 48 - (footer ? 58 : 0)}px`;
};

const VIEWPORT_WIDTH = 'var(--kne-viewport-width, 100vw)';
const VIEWPORT_HEIGHT = 'var(--kne-viewport-height, 100vh)';

const sizeMap = (type, footer, isMobile) => {
    if (isMobile) {
        return {
            width: VIEWPORT_WIDTH,
            style: {
                "--min-modal-height": 0,
                maxWidth: "100%",
                width: "100%",
                height: VIEWPORT_HEIGHT,
                maxHeight: VIEWPORT_HEIGHT,
                top: 0,
                margin: 0,
                paddingBottom: 0,
            },
            styles: {
                container: {
                    borderRadius: 0,
                    height: "100%",
                    maxHeight: "100%",
                    overflow: "hidden",
                    padding: 0,
                },
                body: {
                    height: "100%",
                    maxHeight: "100%",
                    overflow: "hidden",
                    padding: 0,
                },
            },
        };
    }
    if (type === "large") {
        return {
            width: `${Math.min(window.innerWidth - 64, 1500)}px`,
            style: {"--min-modal-height": calcHeight(500, footer)},
        };
    }
    if (type === "small") {
        return {
            width: "600px", style: {"--min-modal-height": calcHeight(300, footer)},
        };
    }
    return {
        width: "1000px", style: {"--min-modal-height": calcHeight(500, footer)},
    };
};

const Footer = ({
                    footer, footerButtons, onConfirm, onCancel, cancelText, onClose, targetProps, isMobile,
                }) => {
    return (<Row gutter={10} wrap={false} justify={isMobile ? "center" : undefined}>
        {(!isMobile || footer) ? <Col flex={isMobile ? undefined : 1}>{footer}</Col> : null}
        {Array.isArray(footerButtons) && footerButtons.length === 0 ? null : (<Col>
            <Space>
                {(footerButtons || [{
                    children: cancelText || (<IntlProvider
                        importMessages={importMessages}
                        moduleName={localeModuleName}
                    >
                        <FormattedMessage
                            id={"Cancel"}
                            moduleName={localeModuleName}
                        />
                    </IntlProvider>), onClick: onCancel,
                }, {
                    type: "primary", children: (<IntlProvider
                        importMessages={importMessages}
                        moduleName={localeModuleName}
                    >
                        <FormattedMessage
                            id={"Confirm"}
                            moduleName={localeModuleName}
                        />
                    </IntlProvider>), onClick: onConfirm,
                },])
                    .filter((item) => {
                        if (typeof item?.display === "function") {
                            return item?.display();
                        }
                        return item?.display !== false;
                    })
                    .map(({
                              ButtonComponent, onClick, autoClose = true, display, ...props
                          }, index) => {
                        const CurrentButton = ButtonComponent || LoadingButton;
                        return (<CurrentButton
                            {...props}
                            key={index}
                            onClick={async (...args) => {
                                const res = await Promise.resolve(onClick && onClick(...args, targetProps));
                                autoClose && res !== false && onClose && onClose();
                                return res;
                            }}
                        />);
                    })}
            </Space>
        </Col>)}
    </Row>);
};

const ModalOuter = ({
                        title,
                        footer,
                        disabledScroller,
                        footerButtons,
                        onClose,
                        closable,
                        onConfirm,
                        onCancel,
                        children,
                        targetProps,
                        cancelText,
                        confirmText,
                        isMobile,
                    }) => {
    const modalBodyRef = useRef(null);
    const bodyClassName = classnames(style["modal-body"], {
        [style["is-disabled-scroller"]]: disabledScroller,
    }, "modal-body");
    const bodyInner = (
        <div className={classnames(style["modal-body-inner"], "modal-body-inner")}>
            {children}
        </div>
    );
    return (<div className={classnames(style["modal-outer"], 'modal-container', {
        [style["is-mobile"]]: isMobile,
    })} data-testid="components-core-modal">
        {closable === false ? null : (<Button
            data-testid="components-core-modal-close-btn"
            className={classnames(style["modal-close"], "modal-close")}
            type="text"
            icon={<Icon type="icon-close-thin"/>}
            onClick={(e) => {
                e.stopPropagation();
                onClose && onClose();
            }}
        />)}
        {title && <div className={classnames(style["modal-title"], "modal-title")}>{title}</div>}
        {isMobile ? (
            <div className={bodyClassName} ref={modalBodyRef}>
                {bodyInner}
            </div>
        ) : (
            <SimpleBar className={bodyClassName} ref={modalBodyRef}>
                {bodyInner}
            </SimpleBar>
        )}
        {footer === null && !footerButtons ? null : (<div className={classnames(style["modal-footer"], "modal-footer")}>
            <Footer
                footer={footer}
                footerButtons={footerButtons}
                onConfirm={onConfirm}
                confirmText={confirmText}
                onCancel={onCancel}
                cancelText={cancelText}
                onClose={onClose}
                targetProps={targetProps}
                isMobile={isMobile}
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
                              confirmText,
                              onCancel,
                              cancelText,
                              footer,
                              rightOptions,
                              rightSpan,
                              disabledScroller,
                              childrenRef,
                              children,
                              isMobile,
                          }) => {
    const getInner = (props) => {
        props = Object.assign({}, {title}, props);
        return (<ModalOuter
            title={renderWithOptions(props.title, {
                ...props, childrenRef, close: onClose,
            })}
            closable={closable}
            onClose={onClose}
            onConfirm={onConfirm}
            confirmText={confirmText}
            onCancel={onCancel}
            cancelText={cancelText}
            footerButtons={renderWithOptions(footerButtons, {
                ...props, close: onClose,
            })}
            disabledScroller={disabledScroller}
            footer={renderWithOptions(footer, {
                ...props, childrenRef, close: onClose,
            })}
            targetProps={Object.assign({}, props, {childrenRef, close: onClose})}
            isMobile={isMobile}
        >
            <RightOptions
                rightSpan={rightSpan}
                isMobile={isMobile}
                options={renderWithOptions(rightOptions, {
                    ...props, childrenRef, close: onClose,
                })}
            >
                {renderWithOptions(children, {
                    ...props, childrenRef, close: onClose,
                })}
            </RightOptions>
        </ModalOuter>);
    };
    return typeof withDecorator === "function" ? withDecorator(getInner, {
        childrenRef, close: onClose,
    }) : getInner({});
};

const computedCommonProps = ({
                                 children,
                                 rightOptions,
                                 rightSpan,
                                 footer,
                                 footerButtons,
                                 className,
                                 size,
                                 title,
                                 onClose,
                                 onConfirm,
                                 confirmText,
                                 onCancel,
                                 cancelText,
                                 closable,
                                 disabledScroller,
                                 withDecorator,
                                 childrenRef,
                                 isMobile,
                                 wrapClassName,
                                 styles: propsStyles,
                                 ...props
                             }) => {
    const sizeProps = sizeMap(size, !(footer === null && !footerButtons), isMobile);
    return {
        ...props,
        icon: null,
        centered: !isMobile,
        wrapClassName: classnames(wrapClassName, isMobile && style["modal-wrap-fullscreen"]),
        title: null,
        maskClosable: props.hasOwnProperty("maskClosable") ? props.maskClosable : false,
        destroyOnHidden: true,
        footer: null,
        closable: false,
        onCancel: onClose,
        className: classnames(className, style["modal"], style[size], {
            [style["right-options-modal"]]: rightOptions,
            [style["is-mobile"]]: isMobile,
        }),
        ...sizeProps,
        styles: {
            ...propsStyles,
            ...sizeProps.styles,
            container: {
                ...propsStyles?.container,
                ...sizeProps.styles?.container,
            },
            body: {
                ...propsStyles?.body,
                ...sizeProps.styles?.body,
            },
        },
        children: (<IntlProvider importMessages={importMessages} moduleName="Modal">
            {runWithDecorator({
                withDecorator,
                title,
                closable,
                onClose,
                onConfirm,
                confirmText,
                onCancel,
                cancelText,
                footer,
                footerButtons,
                rightOptions,
                rightSpan,
                disabledScroller,
                children,
                childrenRef,
                isMobile,
            })}
        </IntlProvider>),
    };
};

const Modal = ({size = 'default', getContainer, open, ...props}) => {
    const childrenRef = useRef(null);
    const isMobile = useIsMobile();
    const getPopupContainer = usePopupContainer();
    const getScrollElement = useScrollElement();
    useLockParentScroll(!!open, getScrollElement);
    return (<AntdModal
        {...computedCommonProps(Object.assign({}, props, {size, childrenRef, isMobile, open}))}
        open={open}
        getContainer={getContainer ?? getPopupContainer}
    />);
};

export const useModal = () => {
    const {modal} = App.useApp();
    const childrenRef = useRef(null);
    const isMobile = useIsMobile();
    const getPopupContainer = usePopupContainer();
    const getScrollElement = useScrollElement();
    return (props) => {
        const unlock = lockParentScroll(getScrollElement);
        const api = {};
        const {afterClose: userAfterClose, ...restProps} = props;
        const {children, getContainer, afterClose, ...otherProps} = computedCommonProps({
            onClose: () => api.close(),
            childrenRef,
            isMobile,
            afterClose: (...args) => {
                unlock();
                userAfterClose && userAfterClose(...args);
            },
            ...restProps,
        });
        const {destroy} = modal.info({
            ...otherProps,
            afterClose,
            content: children,
            getContainer: getContainer ?? getPopupContainer,
        });
        api.close = destroy;

        return api;
    };
};

export const useConfirmModal = () => {
    const {modal} = App.useApp();
    const getPopupContainer = usePopupContainer();
    const getScrollElement = useScrollElement();
    const isMobile = useIsMobile();
    return (props) => {
        const unlock = lockParentScroll(getScrollElement);
        const api = {};
        const {
            type, icon, title, danger, wrapClassName, message, iconSetting = {}, confirmType = "info", afterClose: userAfterClose, ...otherProps
        } = {
            onClose: () => api.close(), maskClosable: false, ...props,
        };
        const typeEnum = Object.assign({}, {
            info: "icon-xinxi-tianchong",
            confirm: "icon-tishi-tianchong",
            warning: "icon-tishi-tianchong",
            error: "icon-shibai",
            success: "icon-chenggong",
        }, iconSetting);
        if (modal[type]) {
            const {destroy} = modal[type]({
                ...otherProps,
                getContainer: otherProps.getContainer ?? getPopupContainer,
                centered: true,
                afterClose: (...args) => {
                    unlock();
                    userAfterClose && userAfterClose(...args);
                },
                icon: null, wrapClassName: classnames(style["confirm-modal-wrap"], wrapClassName, {
                    [style["is-danger"]]: danger,
                    [style["is-mobile"]]: isMobile,
                    [style["modal-wrap-centered"]]: isMobile,
                }), title: (<Space
                    orientation="vertical"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {title && (<Space size={0} align="start" className={style["title"]}>
                        {danger ? (<Icon
                            className={classnames("title-icon", `title-icon-${type === "confirm" ? confirmType : type}`)}
                            type={icon || typeEnum[type === "confirm" ? confirmType : type]}
                        />) : null}
                        {title}
                    </Space>)}
                </Space>), content: (<Space
                    size={0}
                    align="start"
                    className={classnames(style["content"], {
                        [style["has-title"]]: title,
                    })}
                >
                    {!title && danger ? (<Icon
                        className={classnames("title-icon", `title-icon-${type === "confirm" ? confirmType : type}`)}
                        type={icon || typeEnum[type === "confirm" ? confirmType : type]}
                    />) : null}
                    {message}
                </Space>),
            });
            api.close = destroy;
        } else {
            unlock();
        }
        return api;
    };
};

export default Modal;
