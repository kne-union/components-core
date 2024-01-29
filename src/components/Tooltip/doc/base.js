const { default: Tooltip, TooltipInfoLabel } = _Tooltip;
const { default: Space } = space;
const { default: FormInfo, Form, Input, SubmitButton, CancelButton } = formInfo;

const MoreInfo = () => {
  return (
    <Form>
      <FormInfo
        column={1}
        list={[
          <Input label="姓名" name="name" rule="REQ" />,
          <Space
            style={{
              width: "100%",
              justifyContent: "end",
            }}
          >
            <CancelButton>取消</CancelButton>
            <SubmitButton>确定</SubmitButton>
          </Space>,
        ]}
      />
    </Form>
  );
};

const BaseExample = () => {
  return (
    <Space>
      <Tooltip content="这里显示完整的信息">小段信息</Tooltip>
      <Tooltip
        size="small"
        content="这里显示完整的信息完整的信息，这里显示完整的信息完整的信息这里显示完整的信息完整的信息这里显示完整的信息完整的信息，这里显示完整的信息。"
      >
        大段信息
      </Tooltip>
      <Tooltip title="标题" content="内容描述内容描述内容。">
        带有标题的小段信息
      </Tooltip>
      <Tooltip
        title="标题"
        content="内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述"
      >
        带有标题的大段信息
      </Tooltip>
      <Tooltip
        importantInfo="筛选日期范围内，职位上安排顾问面试的候选人总数。根据所填写的顾问【面试面试】时间来进行统计，而非在系统的操作时间。"
        subtitle="示例:"
        content="2022.10.21在系统操作顾问面试，但填写的顾问面试时间为2022.10.20，则数据会统计在2022.10.20，而非2022.10.21 。"
      >
        带有重要信息
      </Tooltip>
      <TooltipInfoLabel
        title="带有Info信息"
        tooltipTitle={{
          importantInfo:
            "筛选日期范围内，职位上安排顾问面试的候选人总数。根据所填写的顾问【面试面试】时间来进行统计，而非在系统的操作时间。",
          subtitle: "示例:",
          content:
            "2022.10.21在系统操作顾问面试，但填写的顾问面试时间为2022.10.20，则数据会统计在2022.10.20，而非2022.10.21 。",
        }}
      />
      <Tooltip
        title="标题"
        content="辅助信息描述内容辅助信息描述内容辅助信息描述内容辅助信息描述内容辅助信息描述内容"
        moreInfo={<MoreInfo />}
      >
        带有表单信息
      </Tooltip>
    </Space>
  );
};

render(<BaseExample />);
