const { default: HelperGuide } = _HelperGuide;
const { default: FormInfo, Form, SubmitButton, fields } = _FormInfo;
const { useModal } = _Modal;
const { PureGlobal } = Global;
const { Space, Card, Typography } = antd;

const { Input, Select } = fields;

const RealScenarioExample = () => {
  const modal = useModal();

  return (
    <PureGlobal
      preset={{
        enums: {
          helperGuide: () => [
            {
              value: "employee-form-employeeId",
              content: "员工ID是员工的唯一标识，由系统自动生成，不可修改"
            },
            {
              value: "employee-form-department",
              content: "请选择员工所属部门，部门决定了员工的权限范围",
              url: "https://example.com/docs/departments"
            },
            {
              value: "employee-form-email",
              content: "邮箱地址用于系统通知和密码找回，请确保邮箱地址有效"
            },
            {
              value: "employee-form-phone",
              content: "手机号码用于接收短信验证码和紧急通知"
            },
            {
              value: "employee-form-hireDate",
              content: "入职日期决定了员工的年假计算和试用期时长"
            }
          ]
        }
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card title="员工信息录入" size="small">
          <Form
            helperGuideName="employee-form"
            onSubmit={(data) => {
              modal({
                title: "员工信息提交成功",
                children: <pre>{JSON.stringify(data, null, 2)}</pre>
              });
            }}
          >
            <FormInfo
              list={[
                <Input 
                  name="employeeId" 
                  label="员工ID" 
                  placeholder="自动生成" 
                  disabled 
                />,
                <Select
                  name="department"
                  label="所属部门"
                  rule="REQ"
                  options={[
                    { label: "技术部", value: "tech" },
                    { label: "产品部", value: "product" },
                    { label: "运营部", value: "operation" },
                    { label: "人力资源部", value: "hr" }
                  ]}
                />,
                <Input 
                  name="email" 
                  label="邮箱地址" 
                  rule="REQ EMAIL"
                  placeholder="请输入邮箱地址" 
                />,
                <Input 
                  name="phone" 
                  label="手机号码" 
                  rule="REQ TEL"
                  placeholder="请输入手机号码" 
                />,
                <Input 
                  name="hireDate" 
                  label="入职日期" 
                  rule="REQ"
                  type="date"
                />
              ]}
            />
            <SubmitButton 
              type="primary" 
              style={{ marginRight: 8 }}
            >
              保存
            </SubmitButton>
          </Form>
        </Card>
        <Card title="说明" size="small">
          <Typography.Text type="secondary">
            真实业务场景示例：在员工信息录入表单中，为每个字段提供相应的帮助提示，
            帮助用户理解字段含义和要求。这样可以提高表单填写的准确性和效率。
          </Typography.Text>
        </Card>
      </Space>
    </PureGlobal>
  );
};

render(<RealScenarioExample />);
