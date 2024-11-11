import Modal, { useModal } from "@components/Modal";
import { useState, useRef } from "react";
import { CancelButton, SubmitButton } from "@kne/react-form-antd";
import FetchButton from "@common/components/FetchButton";
import { IntlProvider, FormattedMessage } from "@components/Intl";
import style from "./style.module.scss";
import importMessages from "./locale";
import { Button, Steps, Flex } from "antd";
import computedModalCommonProps from "./computedModalCommonProps";

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
  footerButtons,
  cancelText,
  completeText,
  nextText,
  items,
  withDecorator,
  ...others
}) => {
  return computedModalCommonProps(
    Object.assign({}, others, {
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
      withDecorator: (render, args) => {
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
                  typeof formProps === "function"
                    ? formProps(props)
                    : formProps;

                const formData = Object.assign(
                  {},
                  _formProps.data,
                  stepCacheRef.current[currentIndex]?.data
                );

                return render(
                  Object.assign({}, props, otherProps, {
                    currentIndex,
                    isLastStep,
                    setCurrentIndex,
                    stepCacheRef,
                    stepSection: (
                      <Steps
                        className={style["form-step-section"]}
                        current={currentIndex}
                        items={items.map(({ title }) => ({ title }))}
                      />
                    ),
                    formProps: Object.assign({}, _formProps, {
                      key: currentIndex,
                      data: formData,
                      onSubmit: async (data, ...args) => {
                        stepCacheRef.current[currentIndex] = { data };
                        const res =
                          onSubmit &&
                          (await onSubmit(
                            data,
                            Object.assign({}, props, {
                              currentIndex,
                              isLastStep,
                              setCurrentIndex,
                              currentProps,
                              stepCacheRef,
                            }),
                            ...args
                          ));
                        if (others.autoClose && !isLastStep && res !== false) {
                          setCurrentIndex((currentIndex) => currentIndex + 1);
                        }
                        if (!isLastStep) {
                          return false;
                        }

                        return res;
                      },
                    }),
                  })
                );
              }}
            </FormStepState>
          );
        };
        return typeof withDecorator === "function"
          ? withDecorator(innerRender, args)
          : innerRender(args);
      },
      formProps: ({ formProps, ...others }) =>
        Object.assign({}, others, formProps),
      children: ({ children, stepSection, ...props }) => {
        return (
          <Flex vertical gap={24}>
            <Flex justify="center">{stepSection}</Flex>
            {typeof children === "function" ? children(props) : children}
          </Flex>
        );
      },
    })
  );
};

const FormStepModal = (props) => {
  return (
    <Modal
      {...computedCommonProps(
        Object.assign({}, props, { className: style["form-modal"] })
      )}
    />
  );
};

export default FormStepModal;

export const useFormStepModal = () => {
  const modal = useModal();
  return (props) =>
    modal(
      computedCommonProps(
        Object.assign({}, props, { className: style["form-modal"] })
      )
    );
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
