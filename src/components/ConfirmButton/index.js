import React from "react";
import { Button, Popconfirm, Space, Typography } from "antd";
import importMessages from "./locale";
import Icon from "@components/Icon";
import { createWithIntl, useIntl } from "@components/Intl";
import { useConfirmModal } from "@components/Modal";
import classnames from "classnames";
import style from "./style.module.scss";

export const withConfirm = (WrappedComponent) => {
  const ConfirmComponent = createWithIntl({
    moduleName: "ConfirmButton",
    importMessages,
  })(
    ({
      title,
      message,
      isDelete = true,
      onClick,
      onCancel,
      disabled,
      showCancel,
      cancelText,
      isModal,
      okText,
      placement,
      getContainer,
      ...props
    }) => {
      const { formatMessage } = useIntl({ moduleName: "ConfirmButton" });
      const modal = useConfirmModal();
      if (isModal) {
        return (
          <WrappedComponent
            {...props}
            disabled={disabled}
            onClick={(e) => {
              modal({
                type: "confirm",
                title: title,
                getContainer,
                danger: isDelete,
                confirmType: isDelete ? "warning" : "info",
                message: message || formatMessage({ id: "message" }),
                okText: okText
                  ? okText
                  : isDelete
                  ? formatMessage({ id: "delete" })
                  : formatMessage({ id: "confirm" }),
                cancelText: cancelText || formatMessage({ id: "cancel" }),
                onCancel,
                onOk: onClick,
              });
            }}
          />
        );
      }
      return (
        <Popconfirm
          title={
            <Space
              direction="vertical"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {title && (
                <Space size={0} align="start" className={style["title"]}>
                  {isDelete && (
                    <Icon className="title-icon" type="icon-tishi-tianchong" />
                  )}
                  {title}
                </Space>
              )}
              <Space
                size={0}
                align="start"
                className={classnames(style["content"], {
                  [style["has-title"]]: title,
                })}
              >
                {!title && isDelete ? (
                  <Icon className="title-icon" type="icon-tishi-tianchong" />
                ) : null}
                {message || formatMessage({ id: "message" })}
              </Space>
            </Space>
          }
          placement={placement}
          onConfirm={onClick}
          okButtonProps={{
            danger: isDelete,
          }}
          onCancel={onCancel}
          overlayClassName={classnames(style["overlay"], {
            [style["is-danger"]]: isDelete,
          })}
          getPopupContainer={getContainer}
          disabled={disabled}
          showCancel={showCancel}
          cancelText={cancelText}
          okText={
            okText
              ? okText
              : isDelete
              ? formatMessage({ id: "delete" })
              : formatMessage({ id: "confirm" })
          }
        >
          <WrappedComponent {...props} disabled={disabled} />
        </Popconfirm>
      );
    }
  );

  ConfirmComponent.defaultProps = {
    isModal: false,
    showCancel: true,
  };

  return ConfirmComponent;
};

export const ConfirmLink = withConfirm(Typography.Link);
export const ConfirmText = withConfirm(Typography.Text);

export default withConfirm(Button);
