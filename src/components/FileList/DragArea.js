import style from "./style.module.scss";
import { createWithRemoteLoader } from "@kne/remote-loader";
import { useRef, useState } from "react";
import { Button, Space, Typography } from "antd";
import importMessages from "./locale";
import useOutside from "@kne/use-click-outside";
import classnames from "classnames";
import { Provider, useContext } from "./context";
import Icon from "@components/Icon";
import { FormattedMessage, useIntl, IntlProvider } from "@components/Intl";
import { InputFileText } from "@common/hocs/withInputFile";
import acceptFunc from "@common/utils/accept";

export const DragButton = ({ children }) => {
  const { onOpenChange, getDragButtonEl } = useContext();
  return (
    <div
      ref={getDragButtonEl}
      className={style["upload-btn"]}
      onClick={() => {
        onOpenChange((open) => !open);
      }}
    >
      <Typography.Text className="ant-btn">
        <Icon type="icon-tuozhuaishangchuan" />
        {children || <FormattedMessage id="dragText" moduleName="FileList" />}
      </Typography.Text>
    </div>
  );
};

export const UploadButton = ({ children }) => {
  const { accept, onFileSelected } = useContext();
  return (
    <InputFileText
      className={style["upload-btn"]}
      accept={accept}
      multiple
      onChange={onFileSelected}
    >
      <Icon type="icon-tianjia" />
      {children}
    </InputFileText>
  );
};
export const DragAreaOuter = ({
  title,
  accept,
  fileSize,
  maxLength,
  onFileSelected,
  children,
  className,
}) => {
  const [open, onOpenChange] = useState(false);
  const dragButtonRef = useRef(null);
  const dragOuterRef = useOutside((e) => {
    if (!dragButtonRef.current) {
      return;
    }
    if (
      dragButtonRef.current.contains(e.target) ||
      e.target === dragButtonRef.current
    ) {
      return;
    }
    onOpenChange(false);
  });
  return (
    <IntlProvider importMessages={importMessages} moduleName="FileList">
      <Provider
        value={{
          open,
          onOpenChange,
          accept,
          fileSize,
          maxLength,
          onFileSelected,
          getDragButtonEl: (el) => {
            dragButtonRef.current = el;
          },
        }}
      >
        <Space className={style["file-list-outer"]} direction="vertical">
          {title}
          <div
            className={classnames(style["container"], className)}
            ref={dragOuterRef}
            onDragEnter={() => {
              onOpenChange(true);
            }}
          >
            {children}
          </div>
        </Space>
      </Provider>
    </IntlProvider>
  );
};

DragAreaOuter.defaultProps = {
  fileSize: 20,
  accept: [".png", ".jpg", ".pdf", ".docx", ".doc"],
};

export const UploadTips = ({ icon, title, renderTips }) => {
  const { accept, fileSize, maxLength } = useContext();
  const intl = useIntl({ moduleName: "FileList" });
  const tipsText = renderTips(
    intl.formatMessage(
      { id: "dragTips" },
      {
        accept: accept.map((str) => str.replace(/^\./, "")).join("、"),
        size: fileSize,
      }
    ),
    {
      fileSize,
      maxLength,
      accept,
    }
  );

  return (
    <div className={classnames(style["upload-drag-tips"], "upload-drag-tips")}>
      <div className={style["upload-drag-icon"]}>
        {icon || <Icon type="icon-shangchuan" size={64} />}
      </div>
      <div className={style["upload-drag-title"]}>
        {title || <FormattedMessage id="dragTitle" moduleName="FileList" />}
      </div>
      <div className={style["upload-drag-text"]}>{tipsText}</div>
    </div>
  );
};

UploadTips.defaultProps = {
  renderTips: (defaultTips) => {
    return defaultTips;
  },
};

const DragArea = ({ children, className }) => {
  const { open, accept, onOpenChange, onFileSelected } = useContext();
  if (!open) {
    return null;
  }
  return (
    <div
      className={classnames(style["drag-area"], className)}
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
      }}
      onDrop={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (e.dataTransfer.files.length === 0) {
          return;
        }
        onOpenChange(false);
        const fileList = Array.from(e.dataTransfer.files).filter((file) => {
          return acceptFunc(file, accept);
        });
        onFileSelected(fileList);
      }}
      onDragEnd={() => {
        onOpenChange(false);
      }}
    >
      <Button
        className={style["upload-drag-close"]}
        type="text"
        shape="circle"
        size="small"
        icon={<Icon type="icon-close-bold" />}
        onClick={() => {
          onOpenChange(false);
        }}
      />
      {children}
    </div>
  );
};

DragArea.defaultProps = {
  children: <UploadTips />,
};

export default DragArea;
