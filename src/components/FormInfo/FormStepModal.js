import FormModal, { FormModalButton, useFormModal } from "./FormModal";
import { Space, Steps } from "antd";
import { useEffect, useState } from "react";
import {
  CancelButton,
  SubmitButton,
  useFormContext,
} from "@kne/react-form-antd";

const StepsContent = ({
  setCurrent,
  current,
  items,
  setStepData,
  stepData,
}) => {
  const currentData = stepData[current];
  const currentItem = items[current];
  const { formData } = useFormContext();
  return (
    <Space className="full-space" direction="vertical">
      <Steps
        current={current}
        onChange={(current) => {
          setStepData((stepData) => {
            const newStepData = stepData.slice(0);
            newStepData[current] = formData;
            return newStepData;
          });
          setCurrent(current);
        }}
        items={items}
      />
      {currentItem.children}
    </Space>
  );
};

const useSteps = () => {
  const [stepData, setStepData] = useState([]);
  const [current, setCurrent] = useState(0);

  return ({ items, formProps }) => {
    const isLastStep = current === items.length - 1;
    return {
      stepData,
      formProps: Object.assign({}, formProps, {
        data: Object.assign({}, formProps.data?.[current], stepData[current]),
        onSubmit: (data) => {
          const newStepData = stepData.slice(0);
          newStepData[current] = data;
          setStepData(newStepData);
          if (isLastStep) {
            return formProps?.onSubmit(stepData);
          }
          setCurrent(current + 1);
        },
      }),
      children: (
        <StepsContent
          items={items}
          current={current}
          setCurrent={setCurrent}
          stepData={stepData}
          setStepData={setStepData}
        />
      ),
      footerButtons: [
        { children: "取消", ButtonComponent: CancelButton },
        {
          type: "primary",
          children: !isLastStep ? "下一步" : "保存",
          ButtonComponent: SubmitButton,
          autoClose: false,
        },
      ],
    };
  };
};

const FormStepModal = (props) => {
  const createSteps = useSteps();
  const { footerButtons, children, formProps } = createSteps(props);
  return (
    <FormModal {...props} formProps={formProps} footerButtons={footerButtons}>
      {children}
    </FormModal>
  );
};

export default FormStepModal;

export const useFormStepModal = () => {
  const formModal = useFormModal();
  const createSteps = useSteps();
  return (props) => {
    const { footerButtons, children, formProps } = createSteps(props);
    return formModal({
      ...props,
      formProps,
      footerButtons,
      children,
    });
  };
};

export const FormStepModalButton = ({ modalProps, ...props }) => {
  const createSteps = useSteps();
  const { footerButtons, children, formProps } = createSteps(modalProps);
  return (
    <FormModalButton
      {...props}
      modalProps={Object.assign({}, modalProps, {
        formProps,
        footerButtons,
        children,
      })}
    />
  );
};
