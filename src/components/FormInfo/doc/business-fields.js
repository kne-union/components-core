const { default: FormInfo, Form, SubmitButton, fields } = _FormInfo;
const { useModal } = _Modal;
const { PureGlobal } = global;
const { Space } = antd;

const {
  PhoneNumber,
  FunctionSelect,
  IndustrySelect,
  AddressSelect,
  SuperSelectUser,
  Avatar,
  Upload,
  SalaryInput,
  Input,
} = fields;

const BaseExample = () => {
  const modal = useModal();
  return (
    <Form
      onSubmit={(data) => {
        modal({
          title: "候选人信息提交成功",
          children: <pre>{JSON.stringify(data, null, 2)}</pre>,
        });
      }}
    >
      <Space direction="vertical" size={16}>
        <FormInfo
          title="候选人基本信息"
          list={[
            <Avatar name="avatar" label="头像照片" />,
            <SuperSelectUser name="userId" label="内部推荐人" rule="REQ" />,
            <PhoneNumber name="phone" label="联系电话" rule="REQ" />,
            <Input name="email" label="电子邮箱" rule="EMAIL" />,
          ]}
        />

        <FormInfo
          title="职业发展信息"
          list={[
            <FunctionSelect name="function" label="职能领域" rule="REQ" />,
            <IndustrySelect name="industry" label="所属行业" rule="REQ" />,
            <SalaryInput
              name="salaryRange"
              label="期望薪资范围"
              rule="REQ"
              showMonth
              remindUnit
            />,
          ]}
        />

        <FormInfo
          title="其他补充信息"
          list={[
            <AddressSelect name="address" label="工作地址" level={3} />,
            <Upload name="resume" label="简历附件" block />,
          ]}
        />

        <SubmitButton type="primary">提交候选人信息</SubmitButton>
      </Space>
    </Form>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);
