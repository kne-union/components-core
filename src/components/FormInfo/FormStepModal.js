import classnames from "classnames";
import { FormStepsModal as BaseFormStepsModal, FormSteps } from "@kne/form-info";
import {
  createModalRender,
  useModal,
  modalClassNames,
} from "@components/Modal";
import { CancelButton, SubmitButton } from "@kne/react-form-antd";
import { FormattedMessage } from "@kne/react-intl";
import { Flex } from "antd";
import style from "./style.module.scss";

const mapHostToOverlayProps = ({
  onCancel,
  footer,
  modalRender,
  formProps: _formProps,
  saveText: _saveText,
  autoClose: _autoClose,
  children,
  ...props
}) => ({
  ...props,
  onClose: onCancel,
  footer: typeof footer === "function" ? footer() : footer,
  modalRender,
  children,
});

const defaultRenderModal = (() => {
  const render = createModalRender({
    footerButtons: [],
    bodyScroll: true,
    className: classnames(style["form-modal"], modalClassNames.stepsForm),
  });
  return (hostProps) => render(mapHostToOverlayProps(hostProps));
})();

const FormStepModal = ({
  className,
  completeText,
  nextText,
  items,
  onComplete,
  autoClose = true,
  open,
  onClose,
  onCancel,
  title,
  size,
  renderModal = defaultRenderModal,
  ...others
}) => (
  <BaseFormStepsModal
    completeText={completeText}
    nextText={nextText}
    items={items}
    onComplete={onComplete}
    className={classnames(style["form-modal"], className)}
    modalProps={{
      autoClose,
      open,
      title,
      size,
      onCancel: onCancel || onClose,
      renderModal,
      ...others,
    }}
  />
);

export default FormStepModal;

export const useFormStepModal = () => {
  const modal = useModal();
  return (props) => {
    const {
      items = [],
      completeText,
      nextText,
      cancelText,
      onComplete,
      autoClose = true,
      className,
      children,
      ...rest
    } = props;
    const api = {};
    const close = () => api.close?.();

    const opened = modal({
      ...rest,
      className: classnames(
        style["form-modal"],
        modalClassNames.stepsForm,
        className
      ),
      footerButtons: [],
      footer: null,
      bodyScroll: true,
      onClose: close,
      children: (
        <FormSteps
          items={items}
          autoStep
          onComplete={async (cache) => {
            const res = await onComplete?.(cache);
            if (autoClose && res !== false) {
              close();
            }
            return res;
          }}
        >
          {({ children: stepInner, isLastStep, ...stepCtx }) => (
            <Flex vertical gap={24} style={{ minHeight: "100%" }}>
              <div style={{ flex: 1 }}>
                {typeof children === "function"
                  ? children({ ...stepCtx, isLastStep, close, children: stepInner })
                  : stepInner}
              </div>
              <Flex justify="flex-end" gap={8}>
                <CancelButton onClick={close}>
                  {cancelText || <FormattedMessage id="Cancel" />}
                </CancelButton>
                <SubmitButton type="primary">
                  {isLastStep
                    ? completeText || <FormattedMessage id="Complete" />
                    : nextText || <FormattedMessage id="Next" />}
                </SubmitButton>
              </Flex>
            </Flex>
          )}
        </FormSteps>
      ),
    });
    api.close = opened.close;
    return opened;
  };
};
