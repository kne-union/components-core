import "@kne/react-file/dist/index.css";
import useRefCallback from "@kne/use-ref-callback";
import {
    FileButton as FileButtonBase, useFileModalProps, download
} from "@kne/react-file";
import Modal, {useModal} from "@components/Modal";
import classnames from "classnames";

export const FileButton = (p) => {
    return (<FileButtonBase
        {...Object.assign({}, p, {
            modalProps: {
                renderModal: ({onCancel, ...modalProps}) => {
                    return (<Modal {...Object.assign({}, modalProps)} onClose={onCancel}/>);
                },
            },
        })}
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

export const useFileModal = (p) => {
    const {title, children, footer} = useFileModalProps(Object.assign({}, p));
    const modal = useModal();
    return useRefCallback(() => {
        return modal({
            title, children, footer,
        });
    });
};

export {download};
export {default as Download, downloadBlobFile, useDownload} from "./Download";
export {default as List, OptionButtons} from "./List";
export {default, PrintButton} from "./File";