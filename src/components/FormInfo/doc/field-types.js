const { default: FormInfo, Form, SubmitButton, fields } = _FormInfo;
const { useModal } = _Modal;
const { Space, Divider } = antd;

const {
  Input,
  TextArea,
  InputNumber,
  DatePicker,
  DateRangePicker,
  Select,
  Switch,
  Rate,
  Slider,
  MoneyInput,
  ColorPicker,
} = fields;

const BaseExample = () => {
  const modal = useModal();
  return (
    <Form
      onSubmit={(data) => {
        modal({
          title: "供应商信息提交成功",
          children: <pre>{JSON.stringify(data, null, 2)}</pre>,
        });
      }}
    >
      <Space direction="vertical" size={24}>
        <FormInfo
          title="基本资料"
          list={[
            <Input name="companyName" label="供应商名称" rule="REQ LEN-3-50" />,
            <TextArea name="description" label="公司简介" maxLength={500} />,
            <InputNumber name="creditScore" label="信用评分" min={0} max={100} />,
            <MoneyInput name="annualRevenue" label="年营业额" />,
          ]}
        />

        <Divider />

        <FormInfo
          title="合作信息"
          list={[
            <DatePicker name="cooperateDate" label="合作起始日期" />,
            <DateRangePicker name="contractPeriod" label="合同有效期" />,
            <Select
              name="cooperateType"
              label="合作类型"
              rule="REQ"
              options={[
                { label: "独家代理", value: "exclusive" },
                { label: "一般代理", value: "normal" },
                { label: "战略合作伙伴", value: "strategic" },
              ]}
            />,
            <Select
              name="productCategory"
              label="供应产品类别"
              mode="multiple"
              options={[
                { label: "电子元器件", value: "electronics" },
                { label: "机械配件", value: "machinery" },
                { label: "原材料", value: "materials" },
                { label: "包装材料", value: "packaging" },
              ]}
            />,
          ]}
        />

        <Divider />

        <FormInfo
          title="其他配置"
          list={[
            <Switch name="isPreferred" label="是否优先供应商" />,
            <Rate name="qualityRating" label="质量评级" />,
            <Slider name="deliveryScore" label="交付及时性评分" />,
            <ColorPicker name="brandColor" label="品牌标识色" />,
          ]}
        />

        <SubmitButton type="primary">提交供应商信息</SubmitButton>
      </Space>
    </Form>
  );
};

render(<BaseExample />);
