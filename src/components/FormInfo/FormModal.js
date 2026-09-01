import classnames from "classnames";
import Modal, { useModal } from "@components/Modal";
import { CancelButton, SubmitButton } from "@kne/react-form-antd";
import {FormattedMessage} from "@kne/react-intl";
import Form from "./Form";
import style from "./style.module.scss";

export const buildFormOverlayProps = (props, {close} = {}) => {
    const {
        formProps = {},
        saveText,
        okText,
        cancelText,
        autoClose = true,
        footerButtons,
        children,
        onClose,
        onCancel,
        className,
        ...rest
    } = props;
    const resolvedClose = close ?? onCancel ?? onClose;
    const resolvedFormProps = typeof formProps === "function" ? formProps({close: resolvedClose}) : formProps;
    const {onSubmit, ..._formProps} = Object.assign({}, resolvedFormProps);

    return {
        ...rest,
        className: classnames(style["form-modal"], className),
        onClose: resolvedClose,
        bodyScroll: true,
        footerButtons: footerButtons || [{
            children: cancelText || <FormattedMessage id="Cancel"/>, ButtonComponent: CancelButton,
        }, {
            type: "primary",
            children: okText ?? saveText ?? <FormattedMessage id="Save"/>,
            ButtonComponent: SubmitButton,
            autoClose: false,
        },],
        modalRender: (node) => (<Form
            {..._formProps}
            onSubmit={async (data, ...args) => {
                const res = onSubmit && (await onSubmit(data, {close: resolvedClose}, ...args));
                if (res !== false) {
                    autoClose && resolvedClose?.();
                }
            }}
        >
            {node}
        </Form>),
        children: typeof children === "function" ? children({close: resolvedClose}) : children,
    };
};

const FormModal = (props) => <Modal {...buildFormOverlayProps(props)} />;

export default FormModal;

export const useFormModal = () => {
    const modal = useModal();
    return (props) => {
        const api = {};
        const close = () => api.close?.();
        const opened = modal(buildFormOverlayProps({
            ...props, onClose: props.onClose || close,
        }, {close},),);
        api.close = opened.close;
        return opened;
    };
};
