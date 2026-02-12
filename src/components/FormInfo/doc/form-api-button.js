const { default: FormInfo, Form, FormApiButton, fields } = _FormInfo;
const { Space, Flex } = antd;

const { Input, DatePicker, Select } = fields;

const BaseExample = () => {
  return (
    <Form
      onSubmit={(data) => {
        console.log("提交数据:", data);
        alert("员工信息保存成功！");
      }}
    >
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
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

        <FormInfo
          list={[
            <Flex gap={8} wrap>
              <FormApiButton
                type="default"
                onClick={({ openApi, formData }) => {
                  alert("当前表单数据：" + JSON.stringify(formData, null, 2));
                }}
              >
                查看表单数据
              </FormApiButton>
              <FormApiButton
                type="default"
                onClick={({ openApi }) => {
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
              </FormApiButton>
              <FormApiButton
                type="default"
                onClick={({ openApi }) => {
                    openApi.validateAll();
                }}
              >
                校验表单
              </FormApiButton>
              <FormApiButton
                type="default"
                danger
                onClick={({ openApi }) => {
                  openApi.reset();
                }}
              >
                重置表单
              </FormApiButton>
              <FormApiButton
                type="primary"
                htmlType="submit"
                onClick={({ openApi }) => {
                  openApi.submit();
                }}
              >
                保存员工信息
              </FormApiButton>
            </Flex>,
          ]}
        />
      </Space>
    </Form>
  );
};

render(<BaseExample />);
