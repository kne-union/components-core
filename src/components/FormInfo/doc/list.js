const { default: FormInfo, Form, List, TableList, SubmitButton, fields } = _FormInfo;
const { useModal } = _Modal;
const { Space } = antd;

const { Input, DatePicker, TextArea } = fields;

const BaseExample = () => {
  const modal = useModal();
  return (
    <Form
      onSubmit={(data) => {
        modal({
          title: "企业信息提交成功",
          children: <pre>{JSON.stringify(data, null, 2)}</pre>,
        });
      }}
    >
      <Space direction="vertical" size={16}>
        <FormInfo
          title="企业基本信息"
          list={[
            <Input name="companyName" label="企业名称" rule="REQ" />,
            <TextArea name="companyDescription" label="企业简介" block />,
          ]}
        />

        <List
          name="productLines"
          title="产品线列表"
          itemTitle={({ index }) => `产品线 ${index + 1}`}
          maxLength={10}
          list={[
            <Input name="lineName" label="产品线名称" rule="REQ" />,
            <Input name="annualSales" label="年销售额(万元)" rule="REQ" />,
            <TextArea name="lineFeatures" label="产品线特点" block />,
          ]}
        />

        <TableList
          name="partnerContacts"
          title="合作伙伴联系人"
          maxLength={5}
          list={[
            <Input name="contactName" label="联系人姓名" rule="REQ" />,
            <DatePicker name="cooperateDate" label="合作起始日期" />,
            <Input name="contactPhone" label="联系电话" rule="REQ" />,
          ]}
        />

        <SubmitButton type="primary">提交企业信息</SubmitButton>
      </Space>
    </Form>
  );
};

render(<BaseExample />);
