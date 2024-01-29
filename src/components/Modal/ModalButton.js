import { useModal } from "./Modal";
import { useTabsModal } from "./TabsModal";
import FetchButton from "@common/components/FetchButton";

const ModalButton = (props) => {
  const modal = useModal();
  return <FetchButton {...props} modalFunc={modal} />;
};

export const TabsModalButton = (props) => {
  const tabsModal = useTabsModal();
  return <FetchButton {...props} modalFunc={tabsModal} />;
};
export default ModalButton;
