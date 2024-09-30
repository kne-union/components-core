import Modal, { useModal } from "@components/Modal";
import FetchButton from "@common/components/FetchButton";
import { Button } from "antd";
import computedCommonProps from "./computedModalCommonProps";
import style from "./style.module.scss";

const FormModal = (props) => {
  return (
    <Modal
      {...computedCommonProps(
        Object.assign({}, props, { className: style["form-modal"] })
      )}
    />
  );
};

export default FormModal;

export const useFormModal = () => {
  const modal = useModal();
  return (props) =>
    modal(
      computedCommonProps(
        Object.assign({}, props, { className: style["form-modal"] })
      )
    );
};

export const FormModalButton = ({ classNames, ...props }) => {
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
