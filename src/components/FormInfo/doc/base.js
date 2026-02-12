const { default: FormInfo, Form, SubmitButton, fields } = _FormInfo;
const { useModal } = _Modal;
const { Space } = antd;

const { Input, TextArea, DatePicker, Select } = fields;

const BaseExample = () => {
  const modal = useModal();
  return (
    <Form
      onSubmit={(data) => {
        modal({
          title: "客户信息提交成功",
          children: <pre>{JSON.stringify(data, null, 2)}</pre>,
        });
      }}
    >
      <Space direction="vertical" size={16}>
        <FormInfo
          title="客户基本信息"
          list={[
            <Input name="name" label="客户姓名" rule="REQ" />,
            <Input name="phone" label="联系电话" rule="REQ PHONE" />,
            <Input name="email" label="电子邮箱" rule="EMAIL" />,
            <DatePicker name="birthday" label="出生日期" />,
            <Select
              name="gender"
              label="性别"
              rule="REQ"
              options={[
                { label: "男", value: "male" },
                { label: "女", value: "female" },
              ]}
            />,
            <TextArea name="remark" label="备注说明" />,
          ]}
        />
        <SubmitButton type="primary">保存客户信息</SubmitButton>
      </Space>
    </Form>
  );
};

render(<BaseExample />);
