import React, {useRef} from "react";
import {App, Button, Col, Modal as AntdModal, Row, Space} from "antd";
import classnames from "classnames";
import style from "./style.module.scss";
import importMessages from "./locale";
import {FormattedMessage, IntlProvider} from "@components/Intl";
import Icon from "@components/Icon";
import renderWithOptions from "./renderWithOptions";
import LoadingButton from "@components/LoadingButton";
import SimpleBar from "@common/components/SimpleBar";

const localeModuleName = "Modal";

export const RightOptions = ({options, rightSpan = 6, children}) => {
    if (!options) {
        return children;
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

const sizeMap = (type, footer) => {
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
                    footer, footerButtons, onConfirm, onCancel, cancelText, onClose, targetProps,
                }) => {
    return (<Row gutter={10} wrap={false}>
        <Col flex={1}>{footer}</Col>
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
                    }) => {
    const modalBodyRef = useRef(null);
    return (<div className={classnames(style["modal-outer"], 'modal-container')} data-testid="components-core-modal">
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
        {title && <div className={style["modal-title"]}>{title}</div>}
        <SimpleBar
            className={classnames(style["modal-body"], {
                [style["is-disabled-scroller"]]: disabledScroller,
            }, "modal-body")}
            ref={modalBodyRef}
        >
            <div
                className={classnames(style["modal-body-inner"], "modal-body-inner")}
            >
                {children}
            </div>
        </SimpleBar>
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
        >
            <RightOptions
                rightSpan={rightSpan}
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
                                 ...props
                             }) => {
    return {
        ...props,
        icon: null,
        centered: true,
        title: null,
        maskClosable: props.hasOwnProperty("maskClosable") ? props.maskClosable : false,
        destroyOnHidden: true,
        footer: null,
        closable: false,
        onCancel: onClose,
        className: classnames(className, style["modal"], style[size], {
            [style["right-options-modal"]]: rightOptions,
        }), ...sizeMap(size, !(footer === null && !footerButtons)),
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
            })}
        </IntlProvider>),
    };
};

const Modal = ({size = 'default', ...props}) => {
    const childrenRef = useRef(null);
    return (<AntdModal
        {...computedCommonProps(Object.assign({}, props, {size, childrenRef}))}
    />);
};

export const useModal = () => {
    const {modal} = App.useApp();
    const childrenRef = useRef(null);
    return (props) => {
        const api = {};
        const {children, ...otherProps} = computedCommonProps({
            onClose: () => api.close(), childrenRef, ...props,
        });
        const {destroy} = modal.info({
            ...otherProps, content: children,
        });
        api.close = destroy;

        return api;
    };
};

export const useConfirmModal = () => {
    const {modal} = App.useApp();
    return (props) => {
        const api = {};
        const {
            type, icon, title, danger, wrapClassName, message, iconSetting = {}, confirmType = "info", ...otherProps
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
                ...otherProps, icon: null, wrapClassName: classnames(style["confirm-modal-wrap"], wrapClassName, {
                    [style["is-danger"]]: danger,
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
        }
        return api;
    };
};

export default Modal;
