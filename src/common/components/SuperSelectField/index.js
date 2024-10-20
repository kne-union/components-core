import { forwardRef } from "react";
import SuperSelect, {
  SelectedTagList,
  SelectTableList,
} from "@kne/super-select";
import Modal from "@components/Modal";
import { Flex } from "antd";
import "@kne/super-select/dist/index.css";

const SuperSelectField = forwardRef((p, ref) => {
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

  return <SuperSelect {...props} ref={ref} />;
});

export default SuperSelectField;

export const SuperSelectTableListField = forwardRef((p, ref) => {
  const props = Object.assign(
    {},
    {
      renderModal: (contextProps) => {
        const { props, open, onOpenChange, onComplete } = contextProps;
        const { placeholder, children } = props;
        return (
          <Modal
            title={placeholder}
            open={open}
            onClose={() => {
              onOpenChange(false);
            }}
            onConfirm={onComplete}
          >
            {children(contextProps)}
          </Modal>
        );
      },
    },
    p
  );
  return <SelectTableList {...props} ref={ref} />;
});
