const { default: FormInfo, Form, MultiField, SubmitButton, fields } = _FormInfo;
const { useModal } = _Modal;

const { Input, TextArea, DatePicker } = fields;

const BaseExample = () => {
  const modal = useModal();
  return (
    <Form
      onSubmit={(data) => {
        modal({
          title: "采购订单信息提交成功",
          children: <pre>{JSON.stringify(data, null, 2)}</pre>,
        });
      }}
    >
      <FormInfo
        list={[
          <MultiField
            name="purchaseOrderNo"
            label="采购单号"
            rule="REQ"
            field={Input}
            maxLength={20}
          />,
          <MultiField name="productName" label="采购产品" field={Input} />,
          <MultiField name="quantity" label="采购数量" field={Input} type="number" />,
          <MultiField name="unitPrice" label="单价" field={Input} type="number" />,
          <MultiField name="deliveryDate" label="交付日期" field={DatePicker} />,
          <MultiField name="note" label="备注说明" field={TextArea} />,
        ]}
      />
      <SubmitButton type="primary">提交采购订单</SubmitButton>
    </Form>
  );
};

render(<BaseExample />);
