const { default: FormInfo, Form, List, TableList, SubmitButton, fields } = _FormInfo;
const { useModal } = _Modal;
const { Space } = antd;

const { Input, DatePicker, TextArea, Select } = fields;

const BaseExample = () => {
  const modal = useModal();
  return (
    <Form
      onSubmit={(data) => {
        modal({
          title: "研发项目信息提交成功",
          children: <pre>{JSON.stringify(data, null, 2)}</pre>,
        });
      }}
    >
      <Space direction="vertical" size={16}>
        <FormInfo
          title="项目基本信息"
          list={[
            <Input name="projectName" label="项目名称" rule="REQ" />,
            <TextArea name="projectDescription" label="项目描述" block />,
          ]}
        />

        <List
          name="releaseMilestones"
          title="发布里程碑"
          itemTitle={({ index }) => `里程碑 ${index + 1}`}
          maxLength={5}
          important
          list={[
            <Input name="milestoneName" label="里程碑名称" rule="REQ" />,
            <DatePicker name="releaseDate" label="发布日期" rule="REQ" />,
            <TableList
              name="deliverables"
              title="交付物清单"
              maxLength={10}
              block
              list={[
                <Input name="deliverableName" label="交付物名称" rule="REQ" />,
                <Select
                  name="deliverableType"
                  label="交付物类型"
                  rule="REQ"
                  options={[
                    { label: "源代码", value: "code" },
                    { label: "文档", value: "doc" },
                    { label: "测试用例", value: "test" },
                  ]}
                />,
              ]}
            />,
          ]}
        />

        <SubmitButton type="primary">提交项目信息</SubmitButton>
      </Space>
    </Form>
  );
};

render(<BaseExample />);
