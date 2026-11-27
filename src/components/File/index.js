import "@kne/react-file/dist/index.css";
import {useCallback} from "react";
import {
    FileButton as FileButtonBase,
    FileModal as FileModalBase,
    FileUpload as FileUploadBase,
    getFileModalProps,
    download
} from "@kne/react-file";
import {useModal} from "@components/Modal";
import renderModal from "./renderModal";
import classnames from "classnames";

export const FileButton = (p) => {
    return (<FileButtonBase
        {...Object.assign({}, p, {
            modalProps: Object.assign({renderModal}, p?.modalProps),
        })}
    />);
};

export const FileUpload = (p) => {
    return (<FileUploadBase
        {...p}
        renderModal={typeof p.renderModal === "function" ? p.renderModal : renderModal}
    />);
};

export const FileLink = (p) => {
    const {className, ...props} = Object.assign({}, p);
    return (<FileButton
        {...props}
        className={classnames(className, "btn-no-padding")}
        type="link"
    >
        {props.children || props.filename || props.originName}
    </FileButton>);
};

export const FileModal = ({onClose, onOpenChange, ...props}) => {
    return (<FileModalBase
        renderModal={renderModal}
        {...props}
        onOpenChange={(open) => {
            onOpenChange && onOpenChange(open);
            !open && onClose && onClose();
        }}
    />);
};

export const useFileModal = () => {
    const modal = useModal();
    return useCallback((props) => modal({
        ...getFileModalProps(props),
        noPadding: true,
        bodyScroll: false,
    }), [modal]);
};

export {download, getFileModalProps};
export {default as Download, downloadBlobFile, useDownload} from "./Download";
export {default as List, OptionButtons} from "./List";
export {default, PrintButton} from "./File";
export {FileSystem, PropertiesPanel, preset, globalParams, uploadFile, useUploadFile, calcPageSize} from "@kne/react-file";
