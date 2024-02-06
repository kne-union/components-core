
# Tooltip


### 概述

简单的文字提示气泡框


### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Tooltip(@components/Tooltip),space(antd/lib/space),formInfo(@components/FormInfo)

```jsx
const { default: Tooltip, TooltipInfoLabel } = _Tooltip;
const { default: Space } = space;
const { default: FormInfo, Form, Input, TypeDateRangePicker, SubmitButton, CancelButton } = formInfo;

const MoreInfo = () => {
  return (
    <Form>
      <FormInfo
        column={1}
        list={[
          <Input label="姓名" name="name" rule="REQ" />,
          <TypeDateRangePicker name="type_date" label="日期时间段" rule="REQ"/>,
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
      <Tooltip trigger="click"
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

```

- 带有远程数据加载的提示
- 展示带有远程数据加载的提示
- _Tooltip(@components/Tooltip),reactFetch(@kne/react-fetch),_Descriptions(@components/Descriptions),_StateTag(@components/StateTag)

```jsx
const { TooltipFetch } = _Tooltip;
const { preset } = reactFetch;
const { default: Descriptions } = _Descriptions;
const { default: StateTag } = _StateTag;

preset({
  ajax: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            code: 0,
            data: {
              clientName: "腾讯",
              title: "腾讯科技公司",
              type: "增值税专用发票",
              date: "2022-08-15",
            },
          },
        });
      }, 1000);
    });
  },
});

const BaseExample = () => {
  return (
    <TooltipFetch
      api={{
        url: "/api/data",
      }}
      size="large"
      fetchContent={(data) => {
        return {
          content: (
            <Descriptions
              dataSource={[
                [
                  { label: "客户名称", content: data.clientName },
                  { label: "发票抬头", content: data.title },
                ],
                [
                  { label: "发票类型", content: data.type },
                  { label: "发票日期", content: data.date },
                ],
              ]}
            />
          ),
        };
      }}
    >
      <StateTag text="哈哈哈" />
    </TooltipFetch>
  );
};

render(<BaseExample />);

```


### API

| 属性名               | 说明                           | 类型         | 默认值 |
|-------------------|------------------------------|------------|-----|
| size              | 默认宽度 360，small 宽度 240        | string     | -   |
| title             | 标题内容                         | string,jsx | -   |
| showInfo          | 展示标题旁的提示按钮                   | boolean    | -   |
| importantInfo     | 重要内容                         | string,jsx | -   |
| subtitle          | 副标题                          | string,jsx | -   |
| content           | 内容                           | string,jsx | -   |
| importantInfoType | 重要内容类型，success,error,warning | string,jsx | -   |
| moreInfo          | 其他内容                         | jsx        | -   |

### TooltipFetch

| 属性名          | 说明                                         | 类型       | 默认值 |
|--------------|--------------------------------------------|----------|-----|
| api          | 获取数据的接口，参考@kne/react-fetch                 | object   | -   |
| fetchContent | 当api接口返回值的时候调用，可以获取到接口参数，返回值会更新到Tootip的参数中 | function | -   |
