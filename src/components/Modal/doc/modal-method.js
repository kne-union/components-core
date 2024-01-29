const { default: Modal, useConfirmModal } = _Modal;
const { useState } = React;
const { Button, Space, message } = antd;
const { PureGlobal } = global;
const BaseExample = () => {
  const confirmModal = useConfirmModal();
  return (
    <Space wrap>
      <Button
        onClick={() => {
          confirmModal({
            danger: true,
            type: "confirm",
            title: "确定要删除吗？",
            message:
              "确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除",
          });
        }}
      >
        confirm
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "confirm",
            confirmType: "warning",
            title: "确定要编辑吗？",
            message:
              "确定要编辑确定要编辑确定要编辑确定要编辑确定要编辑确定要编辑确定要编辑",
          });
        }}
      >
        confirm 警告
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "info",
            title: "确定要删除吗？",
            message:
              "确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除",
          });
        }}
      >
        info
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "info",
            message:
              "确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除",
          });
        }}
      >
        info无标题
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "success",
            title: "确定要删除吗？",
            message:
              "确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除",
          });
        }}
      >
        success
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "warning",
            title: "确定要删除吗？",
            message:
              "确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除",
          });
        }}
      >
        warning
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "error",
            title: "确定要删除吗？",
            message:
              "确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除",
          });
        }}
      >
        error
      </Button>
    </Space>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);
