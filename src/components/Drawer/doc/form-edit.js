const { useFormDrawer, default: FormInfo } = _FormInfo;
const { Button, Space, Typography, message } = _antd;
const { PureGlobal } = _Global;

const FormDrawerExample = () => {
  const formDrawer = useFormDrawer();
  const { Input } = FormInfo.fields;

  const handleEdit = (userData) => {
    formDrawer({
      title: "编辑员工信息",
      size: "small",
      formProps: {
        data: userData,
        onSubmit: async (data) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          message.success(`已更新员工信息：${data.name}`);
        },
      },
      children: (
        <FormInfo
          column={1}
          list={[
            <Input name="name" label="姓名" rule="REQ" tips="请输入员工姓名" />,
            <Input name="department" label="部门" rule="REQ" tips="请输入部门" />,
            <Input name="position" label="职位" rule="REQ" tips="请输入职位名称" />,
            <Input name="email" label="邮箱" rule="REQ EMAIL" />,
          ]}
        />
      ),
    });
  };

  return (
    <Space direction="vertical">
      <Typography.Text strong>useFormDrawer 打开表单抽屉</Typography.Text>
      <Button
        type="primary"
        onClick={() =>
          handleEdit({
            name: "张三",
            department: "技术部",
            position: "前端工程师",
            email: "zhangsan@example.com",
          })
        }
      >
        编辑员工
      </Button>
    </Space>
  );
};

render(
  <PureGlobal>
    <FormDrawerExample />
  </PureGlobal>
);
