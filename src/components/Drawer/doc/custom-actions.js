const { useDrawer } = _Drawer;
const { Button, Space, Typography, message } = _antd;
const { PureGlobal } = _Global;

const CustomActionsExample = () => {
  const drawer = useDrawer();

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Typography.Text strong>自定义底部按钮和额外操作</Typography.Text>
      <Button
        onClick={() => {
          drawer({
            title: "自定义按钮",
            size: "small",
            children: (
              <div>
                <Typography.Paragraph>这个示例展示了如何自定义底部按钮。</Typography.Paragraph>
                <Typography.Paragraph>自定义了三个按钮：预览、取消、保存。</Typography.Paragraph>
              </div>
            ),
            footerButtons: [
              {
                children: "预览",
                onClick: () => {
                  message.info("预览功能");
                },
                autoClose: false,
              },
              {
                children: "取消",
              },
              {
                type: "primary",
                children: "保存",
                onClick: async () => {
                  await new Promise((r) => setTimeout(r, 500));
                  message.success("保存成功");
                },
              },
            ],
          });
        }}
      >
        打开自定义按钮抽屉
      </Button>
    </Space>
  );
};

render(
  <PureGlobal>
    <CustomActionsExample />
  </PureGlobal>
);
