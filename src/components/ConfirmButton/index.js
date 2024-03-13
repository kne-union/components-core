import React from "react";
import { Button, Popconfirm, Space, Typography } from "antd";
import importMessages from "./locale";
import Icon from "@components/Icon";
import { createWithIntl, useIntl } from "@components/Intl";
import { useModal } from "@components/Modal";
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
      const modal = useModal();
      if (isModal) {
        return (
          <WrappedComponent
            {...props}
            onClick={(e) => {
              const cancelButton = {
                children: cancelText || formatMessage({ id: "cancel" }),
                onClick: onCancel,
              };
              const confirmButton = {
                type: "primary",
                children: okText
                  ? okText
                  : isDelete
                  ? formatMessage({ id: "delete" })
                  : formatMessage({ id: "confirm" }),
                onClick: () => onClick(e),
                danger: isDelete,
              };
              modal({
                title: title && (
                  <Space size={0} className={style["title"]}>
                    <Icon className="title-icon" type="icon-tishi-tianchong" />
                    {title}
                  </Space>
                ),
                getContainer,
                wrapClassName: classnames(style["overlay"], {
                  [style["is-danger"]]: isDelete,
                }),
                children: (
                  <Space
                    size={0}
                    className={classnames(style["content"], {
                      [style["has-title"]]: title,
                    })}
                  >
                    {!title && (
                      <Icon
                        className="title-icon"
                        type="icon-tishi-tianchong"
                      />
                    )}
                    {message || formatMessage({ id: "message" })}
                  </Space>
                ),
                footerButtons: showCancel
                  ? [cancelButton, confirmButton]
                  : [confirmButton],
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
                  <Icon className="title-icon" type="icon-tishi-tianchong" />
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
                {!title && (
                  <Icon className="title-icon" type="icon-tishi-tianchong" />
                )}
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
  };

  return ConfirmComponent;
};

export const ConfirmLink = withConfirm(Typography.Link);
export const ConfirmText = withConfirm(Typography.Text);

export default withConfirm(Button);
