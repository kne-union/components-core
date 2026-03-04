const { default: Modal, useModal } = _Modal;
const { default: FormInfo, useFormModal, fields } = _FormInfo;
const { useState } = React;
const { Button, Space, message, Radio, Input } = antd;

// 基础弹窗示例
const BasicModalExample = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开基础弹窗
      </Button>
      
      <Modal
        title="基础弹窗"
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          message.success("操作成功");
          setOpen(false);
        }}
      >
        <p>这是一个基础弹窗的内容</p>
        <p>弹窗支持确认和取消操作</p>
      </Modal>
    </Space>
  );
};

// 不同尺寸的弹窗示例
const SizeModalExample = () => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState("default");
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Radio.Group
        value={size}
        options={[
          { label: "小号", value: "small" },
          { label: "默认", value: "default" },
          { label: "大号", value: "large" },
        ]}
        onChange={(e) => setSize(e.target.value)}
      />
      <Button type="primary" onClick={() => setOpen(true)}>
        打开{size === "small" ? "小号" : size === "large" ? "大号" : "默认"}弹窗
      </Button>
      
      <Modal
        title={`${size === "small" ? "小号" : size === "large" ? "大号" : "默认"}尺寸弹窗`}
        size={size}
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      >
        <p>这是一个{size}尺寸的弹窗</p>
        {size === "large" && (
          <div>
            <p>大号弹窗可以容纳更多内容</p>
            <p>适合展示复杂的表单或数据</p>
            <p>可以根据实际需求选择合适的尺寸</p>
            <p>内容会根据弹窗大小自动调整布局</p>
          </div>
        )}
      </Modal>
    </Space>
  );
};

// 异步确认的弹窗示例
const AsyncModalExample = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开异步确认弹窗
      </Button>
      
      <Modal
        title="异步确认弹窗"
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          return new Promise((resolve) => {
            message.loading("正在处理，请稍候...", 0);
            setTimeout(() => {
              message.destroy();
              message.success("处理成功！");
              resolve();
            }, 2000);
          });
        }}
      >
        <p>点击确认按钮后，将执行异步操作</p>
        <p>在操作完成前，确认按钮将显示为加载状态</p>
        <p>操作完成后，弹窗将自动关闭</p>
      </Modal>
    </Space>
  );
};

// 自定义按钮的弹窗示例
const CustomButtonModalExample = () => {
  const [open, setOpen] = useState(false);
  
  const handleSave = () => {
    return new Promise((resolve) => {
      message.loading("正在保存...", 0);
      setTimeout(() => {
        message.destroy();
        message.success("保存成功！");
        resolve();
      }, 1500);
    });
  };
  
  const handleCancel = () => {
    message.info("已取消操作");
    setOpen(false);
  };
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开自定义按钮弹窗
      </Button>
      
      <Modal
        title="自定义按钮弹窗"
        open={open}
        onClose={() => setOpen(false)}
        footerButtons={[
          {
            children: "取消",
            onClick: handleCancel,
          },
          {
            children: "保存",
            type: "primary",
            onClick: handleSave,
          },
          {
            children: "保存并新建",
            onClick: () => {
              handleSave().then(() => {
                message.info("可以继续添加新内容");
              });
            },
          },
        ]}
      >
        <p>这个弹窗有自定义的底部按钮</p>
        <p>每个按钮都可以有自己的点击处理逻辑</p>
      </Modal>
    </Space>
  );
};

// 命令式调用的弹窗示例
const CommandModalExample = () => {
  const modal = useModal();
  
  const openModal = () => {
    modal({
      title: "命令式弹窗",
      children: <div>
        <p>这是通过 useModal Hook 命令式打开的弹窗</p>
        <p>无需管理弹窗的显示状态</p>
        <p>适合在事件处理中直接使用</p>
      </div>,
      onConfirm: () => {
        message.success("确认操作");
      },
    });
  };
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" onClick={openModal}>
        打开命令式弹窗
      </Button>
    </Space>
  );
};

// 表单弹窗示例
const FormModalExample = () => {
  const formModal = useFormModal();
  
  const handleOpenForm = () => {
    formModal({
      title: "用户信息表单",
      formProps: {
        onSubmit: (data) => {
          console.log("表单值:", data);
          message.success("保存成功");
        },
      },
      children: (
        <FormInfo
          list={[
            <fields.Input name="name" label="姓名" rule="REQ" />,
            <fields.Input name="email" label="邮箱" rule="EMAIL" />,
            <fields.TextArea name="remark" label="备注" />,
          ]}
        />
      ),
    });
  };
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" onClick={handleOpenForm}>
        打开表单弹窗
      </Button>
    </Space>
  );
};

const BasicModalExamples = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <BasicModalExample />
      <SizeModalExample />
      <AsyncModalExample />
      <CustomButtonModalExample />
      <CommandModalExample />
      <FormModalExample />
    </Space>
  );
};

render(<BasicModalExamples />);