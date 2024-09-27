import Modal, { useModal } from "@components/Modal";
import classnames from "classnames";
import { CancelButton, SubmitButton } from "@kne/react-form-antd";
import { Form } from "./formModule";
import FetchButton from "@common/components/FetchButton";
import { IntlProvider, FormattedMessage } from "@components/Intl";
import style from "./style.module.scss";
import importMessages from "./locale";
import { Button } from "antd";

const localeModuleName = "FormInfo";

const computedCommonProps = ({
  className,
  withDecorator,
  footerButtons,
  formProps,
  cancelText,
  saveText,
  ...modalProps
}) => {
  return {
    ...modalProps,
    footerButtons: footerButtons || [
      {
        children: (
          <IntlProvider
            importMessages={importMessages}
            moduleName={localeModuleName}
          >
            {cancelText || (
              <FormattedMessage id={"Cancel"} moduleName={localeModuleName} />
            )}
          </IntlProvider>
        ),
        ButtonComponent: CancelButton,
      },
      {
        type: "primary",
        children: (
          <IntlProvider
            importMessages={importMessages}
            moduleName={localeModuleName}
          >
            {saveText || (
              <FormattedMessage id={"Save"} moduleName={localeModuleName} />
            )}
          </IntlProvider>
        ),
        ButtonComponent: SubmitButton,
        autoClose: false,
      },
    ],
    className: classnames(className, style["form-outer"], style["form-modal"]),
    withDecorator: (render) => {
      const innerRender = (props) => {
        const { onSubmit, ..._formProps } =
          typeof formProps === "function" ? formProps(props) : formProps;
        return (
          <Form
            {..._formProps}
            onSubmit={async (...args) => {
              const res = onSubmit && (await onSubmit(...args));
              if (res !== false) {
                modalProps?.onClose();
              }
            }}
          >
            <IntlProvider importMessages={importMessages} moduleName="FormInfo">
              {render(props)}
            </IntlProvider>
          </Form>
        );
      };
      return typeof withDecorator === "function"
        ? withDecorator(innerRender)
        : innerRender();
    },
  };
};

const FormModal = (props) => {
  return <Modal {...computedCommonProps(props)} />;
};

export default FormModal;

export const useFormModal = () => {
  const modal = useModal();
  return (props) => modal(computedCommonProps(props));
};

export const FormModalButton = (props) => {
  const formModal = useFormModal();
  if (!props.api) {
    const { modalProps, ...others } = props;
    return (
      <Button
        {...others}
        onClick={() => {
          formModal(modalProps);
        }}
      />
    );
  }
  return <FetchButton {...props} modalFunc={formModal} />;
};
