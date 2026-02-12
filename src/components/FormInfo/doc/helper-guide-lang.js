const {default: FormInfo, Form, SubmitButton, fields, List} = _FormInfo;
const {useModal} = _Modal;
const {PureGlobal} = global;
const {Space, Alert, Radio} = antd;
const {useState} = React;

const {Input, TextArea, Select} = fields;

const BaseExample = () => {
    const modal = useModal();
    const [helperGuideName, setHelperGuideName] = useState("employee-form");
    const [langOpen, setLangOpen] = useState(true);

    return (<Space direction="vertical" size={24} style={{width: "100%"}}>
        <Alert
            message="helperGuideName 和 lang 使用说明"
            description="helperGuideName-为字段添加帮助指引功能 | lang-启用多语言支持，为每个字段生成多语言版本"
            type="info"
        />

        <Space direction="vertical" size={16} style={{width: "100%"}}>
            <div>
                <span style={{marginRight: 12, fontWeight: 500}}>帮助指引名称：</span>
                <Radio.Group
                    value={helperGuideName}
                    onChange={(e) => setHelperGuideName(e.target.value)}
                >
                    <Radio.Button value="employee-form">启用 (employee-form)</Radio.Button>
                    <Radio.Button value="">禁用</Radio.Button>
                </Radio.Group>
            </div>

            <div>
                <span style={{marginRight: 12, fontWeight: 500}}>多语言配置：</span>
                <Radio.Group
                    value={langOpen}
                    onChange={(e) => setLangOpen(e.target.value)}
                >
                    <Radio.Button value={true}>中文+英文</Radio.Button>
                    <Radio.Button value={false}>仅中文</Radio.Button>
                </Radio.Group>
            </div>
        </Space>

        <Form
            helperGuideName={helperGuideName}
            lang={langOpen ? ["cn", {
                name: "EnUS", label: "英文", options: {
                    labelTransform: (label) => label + "(en)",
                    ignore: [{name: "avatar"}, {name: "photo"}],
                    disabled: [{name: "file"}], //fields:[{name:'name'}]
                },
            },] : undefined}
            onSubmit={(data) => {
                modal({
                    title: "员工档案提交成功", children: <pre>{JSON.stringify(data, null, 2)}</pre>,
                });
            }}
        >
            <Space direction="vertical" size={16}>
                <FormInfo
                    title="基本信息"
                    list={[<Input name="name" label="员工姓名" rule="REQ"/>,
                        <Input name="email" label="工作邮箱" rule="REQ EMAIL"/>,
                        <TextArea name="description" label="个人简介" block/>,]}
                />

                <FormInfo
                    title="工作信息"
                    list={[<Select
                        name="department"
                        label="所属部门"
                        rule="REQ"
                        options={[{label: "技术研发中心", value: "tech"}, {
                            label: "产品管理中心", value: "product"
                        }, {label: "市场营销中心", value: "marketing"},]}
                    />, <Select
                        name="position"
                        label="职位名称"
                        rule="REQ"
                        options={[{label: "高级工程师", value: "senior"}, {
                            label: "产品经理", value: "pm"
                        }, {label: "UI设计师", value: "designer"},]}
                    />,]}
                />

                <List
                    name="skills"
                    title="专业技能列表"
                    itemTitle={({index}) => `技能 ${index + 1}`}
                    list={[<Input name="name" label="技能名称" rule="REQ"/>, <Select
                        name="level"
                        label="熟练程度"
                        rule="REQ"
                        options={[{label: "初级", value: "beginner"}, {
                            label: "中级", value: "intermediate"
                        }, {label: "高级", value: "advanced"},]}
                    />,]}
                />

                <SubmitButton type="primary">提交员工档案</SubmitButton>
            </Space>
        </Form>
    </Space>);
};

render(<PureGlobal
    preset={{
        enums: {
            helperGuide: () => [{
                value: "employee-form-name", content: "请输入员工的真实姓名，用于身份识别和档案管理", url: "#",
            }, {
                value: "employee-form-email", content: "请输入有效的电子邮箱地址，用于接收工作通知和系统消息", url: "#",
            }, {
                value: "employee-form-department",
                content: "请选择员工所属的部门，部门决定了员工的汇报关系和权限范围",
                url: "#",
            }, {
                value: "employee-form-position", content: "请选择员工的职位，职位决定了员工的级别和职责范围", url: "#",
            }, {
                value: "employee-form-skills-name", content: "请填写员工掌握的技能名称，如编程语言、专业技能等", url: "#",
            }, {
                value: "employee-form-skills-level",
                content: "请选择员工对该技能的熟练程度，便于合理分配工作任务",
                url: "#",
            },],
        },
    }}
>
    <BaseExample/>
</PureGlobal>);
