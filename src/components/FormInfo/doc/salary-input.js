const { SalaryInput, Form } = _FormInfo;
const { PureGlobal } = global;
const { default: Content } = _Content;

const SalaryInputField = SalaryInput.Field;

const BaseExample = () => {
  return (
    <div>
      <Content
        col={1}
        list={[
          {
            label: "薪资范围",
            content: (
              <SalaryInputField
                onChange={(value) => {
                  console.log(value);
                }}
              />
            ),
          },
        ]}
      />
      <Form
        rules={{
          SALARYRANGE: ({ min, max, type }) => {
            if (type !== 1) {
              if (!min || !max) {
                return {
                  result: false,
                  errMsg: `${!min ? "最低薪资" : "最高薪资"}不能为空`,
                };
              }
              if (min > max) {
                return {
                  result: false,
                  errMsg: "最高薪资应大于最低薪资",
                };
              }
            }
            return {
              result: true,
              errMsg: "",
            };
          },
        }}
        data={{ salaryRange: { type: 5, month: 12 } }}
      >
        <SalaryInput
          name="salaryRange"
          label="薪资范围"
          rule="REQ SALARYRANGE"
          showMonth
          remindUnit
        />
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
