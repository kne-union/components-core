const { default: Modal } = _Modal;
const { useState } = React;
const { Button, Space, message } = antd;

const NoPaddingModalExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开无内边距弹窗
      </Button>

      <Modal
        title="自定义内容区内边距"
        open={open}
        noPadding
        onClose={() => setOpen(false)}
        onConfirm={() => {
          message.success("操作成功");
          setOpen(false);
        }}
      >
        <div
          style={{
            padding: "16px 32px",
            background: "linear-gradient(180deg, #f5f7fa 0%, #ffffff 120px)",
          }}
        >
          <p>已通过 noPadding 去掉默认 Content 内边距。</p>
          <p>可在内容区内部自行控制 padding、背景和布局。</p>
        </div>
      </Modal>
    </Space>
  );
};

render(<NoPaddingModalExample />);
