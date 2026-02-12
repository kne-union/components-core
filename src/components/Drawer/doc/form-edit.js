const {useFormDrawer, FormDrawerButton, default: FormInfo} = _FormInfo;
const {Button, Space, Typography, message, Divider} = _antd;
const {default: Global} = _Global;

const FormDrawerExample = () => {
    const formDrawer = useFormDrawer();
    const {Form} = FormInfo;
    const {Input} = FormInfo.fields;

    const handleEdit = (userData) => {
        formDrawer({
            title: "编辑员工信息", size: "small", formProps: {
                data: userData, onSubmit: async (data) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    message.success(`已更新员工信息：${data.name}`);
                }
            }, children: (<FormInfo
                column={1}
                list={[<Input
                    name="name"
                    label="姓名"
                    rule="REQ"
                    tips="请输入员工姓名"
                />, <Input
                    name="department"
                    label="部门"
                    rule="REQ"
                    options={[{label: "技术部", value: "tech"}, {
                        label: "产品部",
                        value: "product"
                    }, {label: "设计部", value: "design"}, {label: "市场部", value: "marketing"}]}
                    single
                    tips="请选择所属部门"
                />, <Input
                    name="position"
                    label="职位"
                    rule="REQ"
                    tips="请输入职位名称"
                />, <Input
                    name="email"
                    label="邮箱"
                    rule="REQ EMAIL"
                    tips="请输入有效的邮箱地址"
                />, <Input
                    name="phone"
                    label="电话"
                    rule="REQ TEL"
                    tips="请输入有效的手机号码"
                />]}
            />)
        });
    };

    return (<Space direction="vertical" style={{width: '100%'}}>
        <Typography.Text strong>使用 useFormDrawer 编辑员工信息</Typography.Text>
        <Typography.Text type="secondary" style={{fontSize: 12}}>
            FormDrawer 结合了 Drawer 和 FormInfo 的功能，提供了更便捷的表单抽屉体验，支持校验规则和自动数据加载
        </Typography.Text>

        <Divider/>

        <Button
            type="primary"
            onClick={() => {
                handleEdit({
                    name: "张三",
                    department: "tech",
                    position: "高级前端工程师",
                    email: "zhangsan@example.com",
                    phone: "13888888888",
                });
            }}
        >
            编辑员工信息
        </Button>
        <Button
            onClick={() => {
                handleEdit({
                    name: "李四",
                    department: "product",
                    position: "产品经理",
                    email: "lisi@example.com",
                    phone: "13999999999",
                });
            }}
        >
            编辑另一位员工
        </Button>
    </Space>);
};

render(<Global><FormDrawerExample/></Global>);
