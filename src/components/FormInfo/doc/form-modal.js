const {default: FormInfo, useFormModal, fields} = _FormInfo;
const {PureGlobal} = global;
const {Button, Space} = antd;
const {useState} = React;

const {Input, DatePicker, Select} = fields;

const EmployeeModal = () => {
    const modal = useFormModal();

    const handleAddEmployee = () => {
        const modalApi = modal({
            title: "新建员工档案", formProps: {
                onSubmit: (data) => {
                    console.log("提交数据:", data);
                    modalApi.close();
                },
            }, children: (<FormInfo
                list={[<Input name="name" label="员工姓名" rule="REQ"/>,
                    <Input name="phone" label="联系电话" rule="REQ PHONE"/>,
                    <DatePicker name="joinDate" label="入职日期" rule="REQ"/>, <Select
                        name="department"
                        label="所属部门"
                        rule="REQ"
                        options={[{label: "技术研发中心", value: "tech"}, {
                            label: "产品管理中心",
                            value: "product"
                        }, {label: "市场营销中心", value: "marketing"},]}
                    />, <Select
                        name="position"
                        label="职位名称"
                        rule="REQ"
                        options={[{label: "高级工程师", value: "senior"}, {
                            label: "产品经理",
                            value: "pm"
                        }, {label: "UI设计师", value: "designer"},]}
                    />,]}
            />),
        });
    };

    return (<Space>
        <Button type="primary" onClick={handleAddEmployee}>
            新建员工档案
        </Button>
        <Button onClick={() => modalApi.close()}>关闭</Button>
    </Space>);
};

const BaseExample = () => {
    return (<PureGlobal>
        <EmployeeModal/>
    </PureGlobal>);
};

render(<BaseExample/>);
