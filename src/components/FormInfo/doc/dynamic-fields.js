const { default: FormInfo, Form, SubmitButton, fields } = _FormInfo;
const { useModal } = _Modal;
const { Space, Alert } = antd;
const { useState } = React;

const { Input, Select, TextArea } = fields;

const BaseExample = () => {
  const modal = useModal();
  const [employmentType, setEmploymentType] = useState("fulltime");

  return (
    <Form
      onSubmit={(data) => {
        modal({
          title: "人才录用信息提交成功",
          children: <pre>{JSON.stringify(data, null, 2)}</pre>,
        });
      }}
    >
      <Space direction="vertical" size={16}>
        <Alert
          message="动态字段展示"
          description="根据录用类型显示不同的字段信息，实现字段联动效果"
          type="info"
        />

        <FormInfo
          title="候选人基本信息"
          list={[
            <Input name="candidateName" label="候选人姓名" rule="REQ" />,
            <Select
              name="employmentType"
              label="录用类型"
              rule="REQ"
              onChange={(value) => {
                setEmploymentType(value);
              }}
              options={[
                { label: "全职员工", value: "fulltime" },
                { label: "兼职顾问", value: "parttime" },
                { label: "外包合同", value: "contract" },
              ]}
            />,
          ]}
        />

        {employmentType === "fulltime" && (
          <FormInfo
            title="全职员工信息"
            list={[
              <Input name="employeeId" label="员工工号" rule="REQ" />,
              <Input name="monthlySalary" label="月薪(元)" rule="REQ" />,
              <Input name="socialSecurityNo" label="社保账号" />,
              <Select
                name="benefitLevel"
                label="福利等级"
                options={[
                  { label: "基础福利", value: "basic" },
                  { label: "标准福利", value: "standard" },
                  { label: "优厚福利", value: "premium" },
                ]}
              />,
            ]}
          />
        )}

        {employmentType === "parttime" && (
          <FormInfo
            title="兼职顾问信息"
            list={[
              <Input name="hourlyRate" label="时薪(元/小时)" rule="REQ" />,
              <Input name="maxMonthlyHours" label="最大月工时" rule="REQ" />,
              <TextArea name="serviceScope" label="服务范围" block />,
            ]}
          />
        )}

        {employmentType === "contract" && (
          <FormInfo
            title="外包合同信息"
            list={[
              <Input name="contractPeriod" label="合同期限" rule="REQ" />,
              <Input name="projectFee" label="项目费用(元)" rule="REQ" />,
              <Select
                name="paymentTerm"
                label="付款方式"
                options={[
                  { label: "一次性付款", value: "onetime" },
                  { label: "分期付款", value: "installment" },
                  { label: "按里程碑付款", value: "milestone" },
                ]}
              />,
            ]}
          />
        )}

        <FormInfo
          title="其他备注"
          list={[<TextArea name="remark" label="录用备注说明" block />]}
        />

        <SubmitButton type="primary">提交录用信息</SubmitButton>
      </Space>
    </Form>
  );
};

render(<BaseExample />);
