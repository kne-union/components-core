const {default: FormInfo, Form, SubmitButton, fields, Avatar, Upload} = _FormInfo;
const {useModal} = _Modal;
const {PureGlobal} = global;
const {Space, Alert, Radio, Divider} = antd;
const {useState} = React;

const {Input, TextArea, Select, PhoneNumber} = fields;

const BaseExample = () => {
    const modal = useModal();
    const [lang, setLang] = useState([]);

    return (<Space direction="vertical" size={24} style={{width: "100%"}}>
        <Alert
            message="lang.ignore 使用说明"
            description="ignore-在多语言模式下排除指定字段，这些字段不会生成多语言版本"
            type="info"
        />

        <Space direction="vertical" size={16} style={{width: "100%"}}>
            <div>
                <span style={{marginRight: 12, fontWeight: 500}}>多语言配置：</span>
                <Radio.Group
                    value={lang.length > 0 ? lang.join(",") : ""}
                    onChange={(e) => {
                        if (e.target.value) {
                            setLang(["zh", {
                                name: "en", label: "英文", options: {
                                    labelTransform: (label) => `${label}(EN)`, // 忽略以下字段，不生成英文版本
                                    ignore: [{name: "avatar"}, {name: "phone"}, {name: "resume"},],
                                },
                            },]);
                        } else {
                            setLang([]);
                        }
                    }}
                >
                    <Radio.Button value="zh,en">中文+英文 (忽略头像/手机/简历)</Radio.Button>
                    <Radio.Button value="">仅中文</Radio.Button>
                </Radio.Group>
            </div>

            <Divider/>

            <Form
                lang={lang.length > 0 ? lang : undefined}
                onSubmit={(data) => {
                    modal({
                        title: "表单提交数据", children: <pre>{JSON.stringify(data, null, 2)}</pre>,
                    });
                }}
            >
                <Space direction="vertical" size={16}>
                    <FormInfo
                        title="基本信息"
                        list={[<Avatar name="avatar" label="头像"/>, <Input name="name" label="姓名" rule="REQ"/>,
                            <Input name="email" label="邮箱" rule="REQ EMAIL"/>,
                            <PhoneNumber name="phone" label="手机号" rule="REQ"/>,]}
                    />

                    <FormInfo
                        title="工作信息"
                        list={[<Select
                            name="department"
                            label="部门"
                            rule="REQ"
                            options={[{label: "技术部", value: "tech"}, {
                                label: "产品部",
                                value: "product"
                            }, {label: "市场部", value: "marketing"},]}
                        />, <Select
                            name="position"
                            label="职位"
                            rule="REQ"
                            options={[{label: "工程师", value: "engineer"}, {
                                label: "产品经理",
                                value: "pm"
                            }, {label: "设计师", value: "designer"},]}
                        />,]}
                    />

                    <FormInfo
                        title="其他信息"
                        list={[<TextArea name="description" label="个人简介" block/>,
                            <Upload name="resume" label="简历" maxCount={1} block/>,]}
                    />

                    <SubmitButton>提交</SubmitButton>
                </Space>
            </Form>
        </Space>
    </Space>);
};

render(<PureGlobal>
    <BaseExample/>
</PureGlobal>);
