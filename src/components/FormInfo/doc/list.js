const {
  default: FormInfo,
  Form,
  List,
  AdvancedSelect,
  TableList,
  Input,
  TextArea,
  SubmitButton,
  FormApiButton,
} = _FormInfo;
const { PureGlobal } = global;
const { useModal } = _Modal;
const { Space } = antd;

const BaseExample = () => {
  const modal = useModal();
  return (
    <Form
      onSubmit={(data) => {
        modal({
          title: "表单提交数据",
          children: <pre>{JSON.stringify(data, null, 2)}</pre>,
        });
      }}
    >
      <Space direction="vertical" size={16}>
        <FormInfo
          title="基本信息"
          list={[
            <Input name="name" label="基本名称" rule="REQ" block />,
            <TextArea name="des" label="基本描述" block />,
          ]}
        />
        <List
          name="list"
          title="列表"
          itemTitle={({ index }) => `经历${index + 1}`}
          maxLength={5}
          list={[
            <Input name="name" label="名称" rule="REQ" />,
            <Input name="title" label="标题" rule="REQ" />,
            <TextArea name="des" label="描述" block rule="REQ" />,
          ]}
        />
        <TableList
          name="tableList"
          title="表格列表"
          maxLength={5}
          minLength={1}
          list={[
            <Input name="name" label="名称" rule="REQ" value="xxxxx" />,
            <Input name="title" label="标题" rule="REQ" />,
            <AdvancedSelect
              name="select"
              label="选项"
              rule="REQ"
              value={[1]}
              api={{
                loader: () => {
                  return {
                    pageData: [
                      {
                        label: "第一项",
                        value: 1,
                      },
                      {
                        label: "第二项",
                        value: 2,
                        disabled: true,
                      },
                      {
                        label: "第三项",
                        value: 3,
                      },
                    ],
                  };
                },
              }}
            />,
          ]}
        />
        <FormInfo
          list={[
            <SubmitButton>提交</SubmitButton>,
            <FormApiButton
              onClick={({ openApi }) => {
                openApi.setFields(
                  [
                    {
                      groupName: "tableList",
                      name: "name",
                      value: "",
                    },
                    {
                      groupName: "tableList",
                      name: "title",
                      value: "ssssssss",
                    },
                  ],
                  { runValidate: false }
                );
              }}
            >
              设置表单值
            </FormApiButton>,
          ]}
        />
      </Space>
    </Form>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);
