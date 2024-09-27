import Modal, { useModal } from "@components/Modal";
import { useState, useRef } from "react";
import classnames from "classnames";
import { CancelButton, SubmitButton } from "@kne/react-form-antd";
import { Form } from "./formModule";
import FetchButton from "@common/components/FetchButton";
import { IntlProvider, FormattedMessage } from "@components/Intl";
import style from "./style.module.scss";
import importMessages from "./locale";
import { Button, Steps, Flex } from "antd";

const localeModuleName = "FormInfo";

const FormStepState = ({ items, children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const stepCacheRef = useRef({});
  return children({
    currentIndex,
    setCurrentIndex,
    stepCacheRef,
    isLastStep: currentIndex === items.length - 1,
    currentProps: Object.assign({}, items[currentIndex]),
  });
};

const computedCommonProps = ({
  className,
  withDecorator,
  cancelText,
  nextText,
  completeText,
  items,
  ...modalProps
}) => {
  return {
    ...modalProps,
    footerButtons: ({ currentIndex, isLastStep }) => {
      const { footerButtons } = Object.assign({}, items[currentIndex]);
      return (
        footerButtons || [
          {
            children: (
              <IntlProvider
                importMessages={importMessages}
                moduleName={localeModuleName}
              >
                {cancelText || (
                  <FormattedMessage
                    id={"Cancel"}
                    moduleName={localeModuleName}
                  />
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
                {isLastStep
                  ? completeText || (
                      <FormattedMessage
                        id={"Complete"}
                        moduleName={localeModuleName}
                      />
                    )
                  : nextText || (
                      <FormattedMessage
                        id={"Next"}
                        moduleName={localeModuleName}
                      />
                    )}
              </IntlProvider>
            ),
            ButtonComponent: SubmitButton,
            autoClose: false,
          },
        ]
      );
    },
    className: classnames(className, style["form-outer"], style["form-modal"]),
    withDecorator: (render) => {
      const innerRender = (props) => {
        return (
          <FormStepState items={items}>
            {({
              currentIndex,
              isLastStep,
              setCurrentIndex,
              currentProps,
              stepCacheRef,
            }) => {
              const { formProps, title, ...otherProps } = currentProps;
              const { onSubmit, ..._formProps } =
                typeof formProps === "function" ? formProps(props) : formProps;
              return (
                <Form
                  {..._formProps}
                  onSubmit={async (data, ...args) => {
                    stepCacheRef.current[currentIndex] = { data };
                    const res =
                      onSubmit &&
                      (await onSubmit(
                        data,
                        Object.assign(
                          {},
                          {
                            currentIndex,
                            isLastStep,
                            setCurrentIndex,
                            currentProps,
                            stepCacheRef,
                          }
                        ),
                        ...args
                      ));
                    if (!isLastStep && res !== false) {
                      setCurrentIndex((currentIndex) => currentIndex + 1);
                      return;
                    }
                    if (isLastStep && res !== false) {
                      modalProps?.onClose();
                    }
                  }}
                  key={currentIndex}
                >
                  <IntlProvider
                    importMessages={importMessages}
                    moduleName="FormInfo"
                  >
                    {render(
                      Object.assign({}, props, otherProps, {
                        currentIndex,
                        isLastStep,
                        setCurrentIndex,
                        stepSection: (
                          <Steps
                            className={style["form-step-section"]}
                            current={currentIndex}
                            items={items.map(({ title }) => ({ title }))}
                          />
                        ),
                      })
                    )}
                  </IntlProvider>
                </Form>
              );
            }}
          </FormStepState>
        );
      };
      return typeof withDecorator === "function"
        ? withDecorator(innerRender)
        : innerRender();
    },
    children: ({ children, stepSection, ...props }) => {
      return (
        <Flex vertical gap={24}>
          <Flex justify="center">{stepSection}</Flex>
          {typeof children === "function" ? children(props) : children}
        </Flex>
      );
    },
  };
};

const FormStepModal = (props) => {
  return <Modal {...computedCommonProps(props)} />;
};

export default FormStepModal;

export const useFormStepModal = () => {
  const modal = useModal();
  return (props) => modal(computedCommonProps(props));
};

export const FormStepModalButton = (props) => {
  const formModal = useFormStepModal();
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
