import SuperSelect, { SelectedTagList } from "@kne/super-select";
import Modal from "@components/Modal";
import { Flex } from "antd";
import "@kne/super-select/dist/index.css";

const SuperSelectField = (p) => {
  const props = Object.assign(
    {},
    {
      children: ({ components }) => {
        return (
          <Flex vertical>
            {components.search}
            {components.selectedAll}
            {components.fetchList}
            {props.isPopup !== false && components.selectedTag}
          </Flex>
        );
      },
      renderModal: (contextProps) => {
        const { props, open, onOpenChange, onComplete } = contextProps;
        const { placeholder, children, showSelectedTag } = props;
        return (
          <Modal
            title={placeholder}
            open={open}
            onClose={() => {
              onOpenChange(false);
            }}
            footer={showSelectedTag && <SelectedTagList />}
            onConfirm={onComplete}
          >
            {children(contextProps)}
          </Modal>
        );
      },
    },
    p
  );

  return <SuperSelect {...props} />;
};

export default SuperSelectField;
