import { useModal } from "./Modal";
import { useTabsModal } from "./TabsModal";
import FetchButton from "@common/components/FetchButton";
import { Button } from "antd";

const ModalButton = (props) => {
  const modal = useModal();
  if (!props.api) {
    const { modalProps, ...others } = props;
    return (
      <Button
        {...others}
        onClick={() => {
          modal(modalProps);
        }}
      />
    );
  }
  return <FetchButton {...props} modalFunc={modal} />;
};

export const TabsModalButton = (props) => {
  const tabsModal = useTabsModal();
  if (!props.api) {
    return (
      <Button
        {...props}
        onClick={() => {
          tabsModal(props.modalProps);
        }}
      />
    );
  }
  return <FetchButton {...props} modalFunc={tabsModal} />;
};
export default ModalButton;
