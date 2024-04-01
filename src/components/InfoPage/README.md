
# InfoPage


### 概述

### 何时使用

一般用在复杂的详情展示页面，InfoPage提供了一个标准的展示信息的格式

### 特点

* 支持Content组件Descriptions组件的组合
* 支持Collapse组件组合
* InfoPage.Part 需要放在InfoPage之下，InfoPage.Collapse,Content,Descriptions 需要放在 InfoPage.Part之下

### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _InfoPage(@components/InfoPage),_Content(@components/Content),_Descriptions(@components/Descriptions),antd(antd)

```jsx
const { default: InfoPage } = _InfoPage;
const { default: Content } = _Content;
const { default: Descriptions } = _Descriptions;
const { Space, Button } = antd;
const BaseExample = () => {
  return (
    <InfoPage>
      <InfoPage.Part
        title="退票信息"
        subTitle="我是一个退票信息"
        extra={<Button>操作</Button>}
      >
        <Descriptions
          dataSource={[
            [
              { label: "客户名称", content: "腾讯" },
              {
                label: "发票抬头",
                content: "腾讯科技公司",
              },
            ],
            [
              { label: "发票类型", content: "增值税专用发票" },
              {
                label: "发票开具日期",
                content: "2022-08-15",
              },
            ],
            [{ label: "退票金额", content: "22000.00元" }],
            [
              {
                label: "发票号",
                content: (
                  <div>
                    <div>00384895992774</div>
                    <div>00384895992774</div>
                    <div>00384895992774</div>
                    <div>00384895992774</div>
                  </div>
                ),
              },
            ],
            [
              { label: "是否需要重开发票", content: "否" },
              {
                label: "是否涉及金融变动",
                content: "否",
              },
            ],
            [
              { label: "是否造成实质损失", content: "否" },
              { label: "责任归属", content: "客户原因" },
            ],
            [
              {
                label: "退票原因",
                content: "退票原因的描述退票原因的描述退票原因的描",
              },
            ],
            [{ label: "附件", content: "附件名称" }],
            [
              {
                label: "操作时间",
                content: "2022-08-01 16:32",
              },
              { label: "操作人", content: "西西歪" },
            ],
          ]}
        />
      </InfoPage.Part>
      <InfoPage.Part title="开票信息">
        <Space direction="vertical" size={24}>
          <Descriptions
            dataSource={[
              [{ label: "客户名称", content: "腾讯" }],
              [{ label: "合同", content: "合同3" }],
            ]}
          />
          <InfoPage.Part title="发票费用信息">
            <Space direction="vertical">
              <InfoPage.Collapse defaultActiveKey={["0", "1"]}>
                <InfoPage.Collapse.Panel key="0" header="项目类型1">
                  <Content
                    labelAlign="auto"
                    col={3}
                    gutter={[0, 12]}
                    list={[
                      { label: "项目类型", content: "面试到岗" },
                      {
                        label: "费用类型",
                        content: "服务费",
                      },
                      { label: "费用总金额", content: "10,000元" },
                      {
                        label: "本次支付费用比例",
                        content: "30%",
                      },
                      { label: "本次支付费用金额", content: "3,000元" },
                      {
                        label: "开票候选人",
                        content: "李小萌",
                      },
                    ]}
                  />
                </InfoPage.Collapse.Panel>
                <InfoPage.Collapse.Panel key="1" header="项目类型2">
                  <Content
                    labelAlign="auto"
                    col={3}
                    gutter={[0, 12]}
                    list={[
                      { label: "项目类型", content: "面试到岗" },
                      {
                        label: "费用类型",
                        content: "服务费",
                      },
                      { label: "费用总金额", content: "10,000元" },
                      {
                        label: "本次支付费用比例",
                        content: "30%",
                      },
                      { label: "本次支付费用金额", content: "3,000元" },
                      {
                        label: "开票候选人",
                        content: "李小萌",
                      },
                    ]}
                  />
                </InfoPage.Collapse.Panel>
              </InfoPage.Collapse>
              <Descriptions
                dataSource={[
                  [
                    { label: "客户付税比例", content: "1%" },
                    {
                      label: "客户所付税金",
                      content: "30元",
                    },
                  ],
                  [
                    { label: "服务费", content: "2886.29元" },
                    {
                      label: "发票增值税",
                      content: "172.38元",
                    },
                  ],
                  [{ label: "发票金额", content: "22000.00元" }],
                  [
                    {
                      label: "发票备注",
                      content: "备注的内容备注的内容备注的内容备注的内容",
                    },
                  ],
                ]}
              />
            </Space>
          </InfoPage.Part>
          <InfoPage.Part title="发票信息">
            <Descriptions
              dataSource={[
                [{ label: "付款信息", content: "ASB54492789374983798" }],
                [
                  {
                    label: "发票收件人",
                    content: "西西歪",
                  },
                ],
                [{ label: "附件", content: "附件名称" }],
                [
                  {
                    label: "预计入职日期",
                    content: "2022-08-15",
                  },
                ],
              ]}
            />
          </InfoPage.Part>
          <InfoPage.Part title="业绩分配">
            <InfoPage.Collapse defaultActiveKey={["0", "1"]}>
              <InfoPage.Collapse.Panel key="0" header="项目类型1">
                <Content
                  labelAlign="auto"
                  col={3}
                  gutter={[0, 12]}
                  list={[
                    { label: "分配用户", content: "王亚男" },
                    {
                      label: "分配比例",
                      content: "40%",
                    },
                    { label: "分配金额", content: "1,200元" },
                  ]}
                />
              </InfoPage.Collapse.Panel>
              <InfoPage.Collapse.Panel key="1" header="项目类型2">
                <Content
                  labelAlign="auto"
                  col={3}
                  gutter={[0, 12]}
                  list={[
                    { label: "分配用户", content: "王亚男" },
                    {
                      label: "分配比例",
                      content: "40%",
                    },
                    { label: "分配金额", content: "1,200元" },
                  ]}
                />
              </InfoPage.Collapse.Panel>
            </InfoPage.Collapse>
          </InfoPage.Part>
        </Space>
      </InfoPage.Part>
    </InfoPage>
  );
};

render(<BaseExample />);

```


### API

| 属性名      | 说明 | 类型  | 默认值 |
|----------|----|-----|-----|
| children | 内容 | jsx | -   |

### InfoPage.Part

| 属性名      | 说明   | 类型  | 默认值 |
|----------|------|-----|-----|
| title    | 标题   | jsx | -   |
| extra    | 额外内容 | jsx | -   |
| children | 内容   | jsx | -   |

### InfoPage.Collapse

| 属性名      | 说明 | 类型  | 默认值 |
|----------|----|-----|-----|
| children | 内容 | jsx | -   |
