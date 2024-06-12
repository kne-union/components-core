const { default: FormInfo, Form, MultiField, SubmitButton, fields } = _FormInfo;
const { useModal } = _Modal;

const { Input, TextArea } = fields;

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
      <FormInfo
        list={[
          <MultiField
            name="no"
            label="单号"
            rule="REQ"
            field={Input}
            maxLength={5}
          />,
          <Input name="name" label="名称" />,
          <MultiField name="description" label="说明" field={TextArea} />,
        ]}
      />
      <SubmitButton>提交</SubmitButton>
    </Form>
  );
};

render(<BaseExample />);
