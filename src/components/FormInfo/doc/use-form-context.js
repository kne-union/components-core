const { default: FormInfo, Form, useFormContext, fields } = _FormInfo;
const { Space, Card, Button, Tag, Divider } = antd;
const { useState } = React;

const { Input, DatePicker, Select } = fields;

const FormActions = () => {
  const { openApi, formData } = useFormContext();
  const [showData, setShowData] = useState(false);

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <Space wrap>
        <Button
          type="primary"
          onClick={() => {
            openApi.setFields(
              [
                { name: "employeeName", value: "王建国" },
                { name: "workEmail", value: "wangjianguo@company.com" },
                { name: "department", value: "tech" },
              ],
              { runValidate: false }
            );
          }}
        >
          填充员工信息
        </Button>
        <Button
          onClick={() => {
            setShowData(!showData);
          }}
        >
          {showData ? "隐藏数据" : "查看数据"}
        </Button>
        <Button
          onClick={() => {
            openApi.validateAll();
          }}
        >
          校验表单
        </Button>
        <Button onClick={openApi.reset}>重置表单</Button>
      </Space>

      {showData && (
        <Card title="当前表单数据" size="small">
          <Space direction="vertical" size={8}>
            {Object.entries(formData).map(([key, value]) => (
              <Tag key={key} color="blue">
                <strong>{key}</strong>:{" "}
                {typeof value === "object" && value !== null
                  ? JSON.stringify(value)
                  : String(value)}
              </Tag>
            ))}
          </Space>
        </Card>
      )}
      <Divider />
    </Space>
  );
};

const BaseExample = () => {
  return (
    <Form
      onSubmit={(data) => {
        console.log("提交数据:", data);
        alert("员工信息保存成功！");
      }}
    >
      <Space direction="vertical" size={16}>
        <FormInfo
          title="员工基本信息"
          list={[
            <Input name="employeeName" label="员工姓名" rule="REQ" />,
            <Input name="workEmail" label="工作邮箱" rule="REQ EMAIL" />,
            <DatePicker name="onboardingDate" label="入职日期" />,
            <Select
              name="department"
              label="所属部门"
              options={[
                { label: "技术研发中心", value: "tech" },
                { label: "产品管理中心", value: "product" },
                { label: "市场营销中心", value: "marketing" },
              ]}
            />,
          ]}
        />

        <FormActions />
      </Space>
    </Form>
  );
};

render(<BaseExample />);
