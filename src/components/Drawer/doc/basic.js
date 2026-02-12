const { default: Drawer, useDrawer, DrawerButton } = _Drawer;
const { Button, Space, Typography, Descriptions, Avatar, Tag } = _antd;
const { useState } = React;
const {PureGlobal} = _Global;

const BasicExample = () => {
  const [open, setOpen] = useState(false);
  const drawer = useDrawer();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text strong>方式一：受控组件</Typography.Text>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开详情抽屉
      </Button>
      <Drawer
        title="用户信息"
        open={open}
        onClose={() => setOpen(false)}
        width={600}
      >
        <Descriptions column={1} bordered>
          <Descriptions.Item label="姓名">张三</Descriptions.Item>
          <Descriptions.Item label="部门">技术部</Descriptions.Item>
          <Descriptions.Item label="职位">高级前端工程师</Descriptions.Item>
          <Descriptions.Item label="邮箱">zhangsan@example.com</Descriptions.Item>
        </Descriptions>
      </Drawer>

      <Typography.Text strong>方式二：Hook调用</Typography.Text>
      <Button
        onClick={() => {
          drawer({
            title: "项目信息",
            children: (
              <div>
                <Typography.Paragraph>项目名称：电商平台</Typography.Paragraph>
                <Typography.Paragraph>项目负责人：李四</Typography.Paragraph>
                <Typography.Paragraph>开发周期：6个月</Typography.Paragraph>
                <Typography.Paragraph>团队成员：12人</Typography.Paragraph>
              </div>
            ),
          });
        }}
      >
        使用Hook打开
      </Button>
    </Space>
  );
};

render(<PureGlobal><BasicExample /></PureGlobal>);
