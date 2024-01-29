const { TableInput, Form, Input, SubmitButton } = _FormInfo;
const { PureGlobal } = global;
const { default: Content } = _Content;

const BaseExample = () => {
  return (
    <div>
      <Form
        data={{
          tableInput: {
            1: { otherCode: "111" },
            2: { otherCode: "222" },
          },
        }}
        onSubmit={(formData) => {
          console.log(formData);
        }}
      >
        <TableInput
          controllerOpen={false}
          name="tableInput"
          label="表格表单"
          columns={[
            {
              title: "系统字段",
              dataIndex: "systemCode",
              key: "systemCode",
              width: 200,
            },
            {
              title: "对应的字段",
              dataIndex: "otherCode",
              key: "otherCode",
              editable: (text, record, index) => index !== 0,
              field: {
                type: Input,
                rule: "REQ",
                getValue: (e) => e.target.value,
              },
            },
          ]}
          api={{
            loader: () => {
              return {
                pageData: [
                  {
                    id: 1,
                    systemCode: "流水号",
                  },
                  {
                    id: 2,
                    systemCode: "流水号2",
                  },
                ],
              };
            },
          }}
          onChange={(value) => {
            console.log(value);
          }}
        />
        <SubmitButton>提交</SubmitButton>
      </Form>
    </div>
  );
};

render(
  <PureGlobal>
    <div className="input">
      <BaseExample />
    </div>
  </PureGlobal>
);
