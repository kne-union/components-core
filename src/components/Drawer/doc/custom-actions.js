const { useDrawer, DrawerButton } = _Drawer;
const { Button, Space, Typography, message, Popconfirm, Tag, Descriptions } = _antd;
const {PureGlobal} = _Global;

const CustomActionsExample = () => {
  const drawer = useDrawer();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
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
              },
              {
                children: "取消",
                onClick: () => {
                  message.info("已取消");
                },
              },
              {
                type: "primary",
                children: "保存",
                onClick: async () => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  message.success("保存成功！");
                  return true;
                },
              },
            ],
          });
        }}
      >
        自定义按钮示例
      </Button>

      <DrawerButton
        api={{
          loader: () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({
                  id: 1,
                  name: "张三",
                  role: "高级前端工程师",
                  department: "技术部",
                  status: "在职",
                  joinDate: "2020-03-15",
                });
              }, 500);
            });
          },
        }}
        modalProps={(contextProps) => {
          const { data } = contextProps;
          return {
            title: "员工档案操作",
            size: "small",
            children: (
              <Descriptions column={1} bordered>
                <Descriptions.Item label="姓名">{data.name}</Descriptions.Item>
                <Descriptions.Item label="职位">{data.role}</Descriptions.Item>
                <Descriptions.Item label="部门">{data.department}</Descriptions.Item>
                <Descriptions.Item label="状态">
                  <Tag color="green">{data.status}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="入职时间">{data.joinDate}</Descriptions.Item>
              </Descriptions>
            ),
            footerButtons: [
              {
                children: "查看详情",
                onClick: () => {
                  message.info("查看更多详情");
                },
              },
              {
                children: "导出档案",
                onClick: () => {
                  message.info("正在导出档案...");
                },
              },
              {
                children: "编辑",
                type: "default",
                onClick: () => {
                  message.info("打开编辑模式");
                },
              },
              {
                type: "primary",
                children: "确认",
                onClick: async () => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  message.success("操作成功！");
                  return true;
                },
              },
            ],
          };
        }}
      >
        加载数据并自定义操作
      </DrawerButton>

      <Button
        danger
        onClick={() => {
          drawer({
            title: "删除确认",
            size: "small",
            children: (
              <div>
                <Typography.Paragraph>
                  <Typography.Text type="warning">⚠️ 警告：</Typography.Text>
                  此操作将永久删除该员工档案，删除后无法恢复。
                </Typography.Paragraph>
                <Typography.Paragraph>是否继续删除？</Typography.Paragraph>
              </div>
            ),
            footerButtons: [
              {
                children: "取消",
                onClick: () => {
                  message.info("已取消删除");
                },
              },
              {
                danger: true,
                type: "primary",
                children: "确认删除",
                onClick: async () => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  message.success("已删除员工档案");
                  return true;
                },
              },
            ],
          });
        }}
      >
        危险操作示例
      </Button>
    </Space>
  );
};

render(<PureGlobal><CustomActionsExample /></PureGlobal>);
