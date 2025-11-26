import style from "./style.module.scss";
import {useRef, useState} from "react";
import {Button, Space} from "antd";
import importMessages from "./locale";
import useOutside from "@kne/use-click-outside";
import classnames from "classnames";
import {Provider, useContext} from "./context";
import Icon from "@components/Icon";
import {FormattedMessage, useIntl, IntlProvider} from "@components/Intl";
import {FileInput} from "@kne/react-file";
import acceptFunc from "@common/utils/accept";

export const DragButton = ({children}) => {
    const {onOpenChange, getDragButtonEl} = useContext();
    return (<div
        ref={getDragButtonEl}
        className={style["upload-btn"]}
        onClick={() => {
            onOpenChange((open) => !open);
        }}
    >
        <Button type="text" className="btn-no-padding">
            <Icon type="icon-tuozhuaishangchuan"/>
            {children || <FormattedMessage id="dragText" moduleName="FileList"/>}
        </Button>
    </div>);
};

export const UploadButton = ({children}) => {
    const {accept, onFileSelected} = useContext();
    return (<FileInput
        className={classnames(style["upload-btn"], "btn-no-padding")}
        accept={accept}
        multiple
        onChange={onFileSelected}
    >
        {({children: input, ...props}) => {
            return (<Button {...props} type="text">
                <Icon type="icon-tianjia"/>
                {children}
                {input}
            </Button>);
        }}
    </FileInput>);
};
export const DragAreaOuter = ({
                                  title,
                                  accept = [".png", ".jpg", ".pdf", ".docx", ".doc"],
                                  fileSize = 20,
                                  maxLength,
                                  onFileSelected,
                                  children,
                                  className,
                                  defaultOpen = false
                              }) => {
    const [open, onOpenChange] = useState(defaultOpen);
    const dragButtonRef = useRef(null);
    const dragOuterRef = useOutside((e) => {
        if (!dragButtonRef.current) {
            return;
        }
        if (dragButtonRef.current.contains(e.target) || e.target === dragButtonRef.current) {
            return;
        }
        onOpenChange(false);
    });
    return (<IntlProvider importMessages={importMessages} moduleName="FileList">
        <Provider
            value={{
                open, onOpenChange, accept, fileSize, maxLength, onFileSelected, getDragButtonEl: (el) => {
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
    </IntlProvider>);
};

export const UploadTips = ({
                               icon, title, renderTips = (defaultTips) => {
        return defaultTips;
    }
                           }) => {
    const {accept, fileSize, maxLength} = useContext();
    const intl = useIntl({moduleName: "FileList"});
    const tipsText = renderTips(intl.formatMessage({id: "dragTips"}, {
        accept: accept.map((str) => str.replace(/^\./, "")).join("、"), size: fileSize,
    }), {
        fileSize, maxLength, accept,
    });

    return (<div className={classnames(style["upload-drag-tips"], "upload-drag-tips")}>
        <div className={style["upload-drag-icon"]}>
            {icon || <Icon type="icon-shangchuan" size={64}/>}
        </div>
        <div className={style["upload-drag-title"]}>
            {title || <FormattedMessage id="dragTitle" moduleName="FileList"/>}
        </div>
        <div className={style["upload-drag-text"]}>{tipsText}</div>
    </div>);
};

const DragArea = ({children = <UploadTips/>, className}) => {
    const {open, accept, onOpenChange, onFileSelected} = useContext();
    if (!open) {
        return null;
    }
    return (<div
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
            icon={<Icon type="icon-close-bold"/>}
            onClick={() => {
                onOpenChange(false);
            }}
        />
        {children}
    </div>);
};

export default DragArea;
