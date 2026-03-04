# StateTag

### 概述

### 概述

StateTag 是一个状态标签组件，用于展示不同状态的数据。支持多种预设类型和自定义样式，适用于列表、详情页等场景的状态展示。

### 何时使用

当需要展示数据的状态时使用，例如：
- 列表页表格中的状态列
- 详情页中的状态信息
- 筛选结果展示
- 技能标签展示

### 特点

* 提供多种预设状态类型（info、success、progress、danger、default 等）
* 支持自定义边框和背景色
* 支持筛选结果标签（filterResult 类型）
* 可显示前置筛选名称（filterName 属性）
* 基于 Ant Design Tag，兼容其大部分属性

### 使用场景

* **info**（蓝色 #155ACF）：待处理、待审核等状态
* **progress**（橙色 #F09700）：进行中、审核中等状态
* **success**（绿色 #027A48）：已完成、已通过等状态
* **danger**（红色 #D14343）：失败、拒绝、异常等状态
* **default**（灰色 #666666）：已取消、已关闭等状态
* **filterResult**（青色 #5CB8B2）：筛选结果标签
* **skill**（灰色 #666666）：技能标签，带特殊边框
* **result**（灰色 #666666）：下拉菜单、弹窗中的已选结果标签


### 示例(全屏)

#### 示例代码

- 基本示例
- 状态标签
- _StateTag(@components/StateTag),_Descriptions(@components/Descriptions),lodash(lodash),antd(antd)

```jsx
const { default: StateTag } = _StateTag;
const { default: Descriptions } = _Descriptions;
const { range } = lodash;
const { Space, Typography } = antd;

const BaseExample = () => {
  return (
    <div>
      <div>使用场景: 列表页Table,简历详情页</div>
      <br />
      <Descriptions
        dataSource={[
          [
            { label: "使用规则", content: "待XX，暂停" },
            {
              label: "示例",
              content: (
                <Space>
                  <StateTag {...{ type: "info", text: "待提交开票" }} />
                  <Typography.Text
                    copyable={{
                      text: '<StateTag type="info" text="标签内容" />',
                    }}
                  />
                </Space>
              ),
            },
          ],
          [
            { label: "使用规则", content: "XX中，正在XX中" },
            {
              label: "示例",
              content: (
                <Space>
                  <StateTag {...{ type: "progress", text: "退票审核中" }} />
                  <Typography.Text
                    copyable={{
                      text: '<StateTag type="progress" text="标签内容" />',
                    }}
                  />
                </Space>
              ),
            },
          ],
          [
            { label: "使用规则", content: "通过，成功，完成" },
            {
              label: "示例",
              content: (
                <Space>
                  <StateTag {...{ type: "success", text: "标签内容" }} />
                  <Typography.Text
                    copyable={{
                      text: '<StateTag type="success" text="标签内容" />',
                    }}
                  />
                </Space>
              ),
            },
          ],
          [
            { label: "使用规则", content: "不通过，失败，淘汰，缺席，拒绝" },
            {
              label: "示例",
              content: (
                <Space>
                  <StateTag {...{ type: "danger", text: "退票拒绝" }} />
                  <Typography.Text
                    copyable={{
                      text: '<StateTag type="danger" text="标签内容" />',
                    }}
                  />
                </Space>
              ),
            },
          ],
          [
            { label: "使用规则", content: "取消，撤销，停止" },
            {
              label: "示例",
              content: (
                <Space>
                  <StateTag {...{ type: "default", text: "撤销开票审核" }} />
                  <Typography.Text
                    copyable={{
                      text: '<StateTag type="default" text="标签内容" />',
                    }}
                  />
                </Space>
              ),
            },
          ],
          [
            { label: "使用规则", content: "（暂时还未用到）" },
            {
              label: "示例",
              content: (
                <Space>
                  <StateTag {...{ type: "other", text: "标签内容" }} />
                  <Typography.Text
                    copyable={{
                      text: '<StateTag type="other" text="标签内容" />',
                    }}
                  />
                </Space>
              ),
            },
          ],
        ]}
      />
      <br />
      <br />
      <div>个别特殊场景（需要单独询问UI):</div>
      <br />
      <Descriptions
        dataSource={[
          [
            { label: "使用规则", content: "待XX，暂停" },
            {
              label: "示例",
              content: (
                <div>
                  <StateTag {...{ type: "success", text: "已推荐简历" }} />
                  <StateTag {...{ type: "success", text: "已退票" }} />
                </div>
              ),
            },
          ],
          [
            { label: "使用规则", content: "已XX待XX" },
            {
              label: "示例",
              content: (
                <div>
                  <StateTag {...{ type: "success", text: "已开票待寄出" }} />
                  <StateTag {...{ type: "success", text: "已待寄待收款" }} />
                </div>
              ),
            },
          ],
          [
            {
              label: "使用规则",
              content: "已XX+词语：根据后面的词语语义进行判断",
            },
            {
              label: "示例",
              content: (
                <div>
                  <StateTag {...{ type: "success", text: "已成功" }} />
                  <StateTag {...{ type: "default", text: "已取消" }} />
                  <StateTag {...{ type: "danger", text: "已失败" }} />
                  <StateTag {...{ type: "progress", text: "已暂停" }} />
                </div>
              ),
            },
          ],
          [
            { label: "使用规则", content: "完全根据语义语境判断" },
            {
              label: "示例",
              content: (
                <div>
                  <StateTag {...{ type: "success", text: "全部到款" }} />
                  <StateTag {...{ type: "success", text: "部分到款" }} />
                  <StateTag {...{ type: "success", text: "简历亮点" }} />
                  <StateTag {...{ type: "danger", text: "简历风险点" }} />
                </div>
              ),
            },
          ],
        ]}
      />
    </div>
  );
};

render(<BaseExample />);

```

- 技能标签示例
- 展示技能标签的使用，包括边框和背景的配置
- _StateTag(@components/StateTag)

```jsx
const { default: StateTag } = _StateTag;

const BaseExample = () => {
  return (
    <div>
      <StateTag
        text={"技能标签"}
        type={"skill"}
        showBorder
        showBackground={false}
      />
    </div>
  );
};

render(<BaseExample />);

```

- 结果标签示例
- 展示下拉菜单、弹窗中已选结果标签的使用
- _StateTag(@components/StateTag)

```jsx
const { default: StateTag } = _StateTag;

const BaseExample = () => {
  return (
    <div>
      <StateTag
        text={"技能标签"}
        type={"result"}
        showBackground={false}
        closable
        onClose={() => console.log("close")}
      />
      <StateTag
        text={"技能标签"}
        type={"result"}
        closable
        onClose={() => console.log("close")}
      />
    </div>
  );
};

render(<BaseExample />);

```

- 筛选结果标签
- 展示筛选组件中筛选结果标签的使用，包括filterName属性
- _StateTag(@components/StateTag)

```jsx
const { default: StateTag } = _StateTag;

const BaseExample = () => {
  return (
    <div>
      <StateTag
        filterName={"BD"}
        text={"陈枫林，王晓晨"}
        type={"filterResult"}
        closable
        onClose={() => console.log("close")}
      />
      <br />
      <StateTag
        filterName={"添加人"}
        text={"陈枫林，王晓晨，陈路，张力"}
        type={"filterResult"}
        closable
        onClose={() => console.log("close")}
      />
    </div>
  );
};

render(<BaseExample />);

```

- 枚举状态标签
- 展示StateTagEnum组件的使用，从枚举数据自动生成状态标签
- _StateTag(@components/StateTag),antd(antd),global(@components/Global)

```jsx
const { StateTagEnum } = _StateTag;
const { PureGlobal } = global;
const { Space } = antd;

const BaseExample = ()=>{
  return (
    <PureGlobal
      preset={{
        locale: "zh-CN",
        enums: {
          testEnums: async ({ locale }) => {
            console.log(locale);
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([
                  { value: "1", description: "第一项", type: 'success' },
                  { value: "2", description: "第二项", type: 'danger' },
                  { value: "3", description: "第三项", type: 'info'},
                ]);
              }, 1000);
            });
          },
        },
      }}
    >
      <Space>
        <StateTagEnum moduleName="testEnums" name="1" />
        <StateTagEnum moduleName="testEnums" name="2" />
        <StateTagEnum moduleName="testEnums" name="3" />
      </Space>
    </PureGlobal>
  )
};

render(<BaseExample />);

```

- 边框背景组合
- 展示StateTag组件不同type下showBorder和showBackground属性的组合效果，以及Antd Tag的其他属性
- _StateTag(@components/StateTag),antd(antd)

```jsx
const { default: StateTag } = _StateTag;
const { Card, Divider, Space, Table, message } = antd;

const BorderBgCombinationsExample = () => {
  const types = [
    { key: "default", label: "默认", business: "已取消/已关闭" },
    { key: "skill", label: "技能", business: "技能标签" },
    { key: "result", label: "结果", business: "筛选结果" },
    { key: "filterResult", label: "筛选结果", business: "筛选条件" },
    { key: "success", label: "成功", business: "已通过/已完成" },
    { key: "progress", label: "进行中", business: "审核中/处理中" },
    { key: "danger", label: "危险", business: "已拒绝/已失败" },
    { key: "info", label: "信息", business: "待处理/待审核" },
    { key: "other", label: "其他", business: "其他状态" },
  ];

  const columns = [
    {
      title: "状态类型",
      dataIndex: "type",
      render: (_, record) => (
        <Space>
          <StateTag text={record.label} type={record.key} />
          <span>{record.label}</span>
        </Space>
      ),
    },
    {
      title: "无边框有背景（默认）",
      dataIndex: "noBorder",
      render: (_, record) => (
        <StateTag 
          text={record.business} 
          type={record.key} 
          showBorder={false} 
          showBackground={true} 
        />
      ),
    },
    {
      title: "有边框有背景",
      dataIndex: "withBorder",
      render: (_, record) => (
        <StateTag 
          text={record.business} 
          type={record.key} 
          showBorder={true} 
          showBackground={true} 
        />
      ),
    },
    {
      title: "有边框无背景",
      dataIndex: "borderNoBg",
      render: (_, record) => (
        <StateTag 
          text={record.business} 
          type={record.key} 
          showBorder={true} 
          showBackground={false} 
        />
      ),
    },
    {
      title: "业务场景示例",
      dataIndex: "businessExample",
      render: (_, record) => {
        const examples = {
          default: "已取消开票",
          skill: "React, Vue, JavaScript",
          result: "已选择: 5项",
          filterResult: "BD: 张三, 李四",
          success: "审核已通过",
          progress: "审核进行中",
          danger: "审核已拒绝",
          info: "待提交审核",
          other: "其他状态标签",
        };
        return (
          <StateTag 
            text={examples[record.key]} 
            type={record.key} 
            filterName={record.key === "filterResult" ? "BD" : undefined}
          />
        );
      },
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title="状态标签边框与背景组合效果">
        <p>展示不同状态下边框和背景的组合效果，帮助选择最适合业务场景的配置。</p>
        <Table
          columns={columns}
          dataSource={types}
          rowKey="key"
          pagination={false}
          bordered
        />
      </Card>
      
      <Divider />
      
      <Card title="Ant Design Tag 其他属性展示">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <h4>可关闭标签:</h4>
            <Space wrap>
              <StateTag 
                text="可关闭的成功标签" 
                type="success" 
                closable 
                onClose={() => console.log("关闭了成功标签")}
              />
              <StateTag 
                text="可关闭的筛选结果" 
                type="filterResult" 
                filterName="部门"
                closable 
                onClose={() => console.log("关闭了筛选结果")}
              />
            </Space>
          </div>
          
          <div>
            <h4>可点击标签（带事件）:</h4>
            <Space wrap>
              <StateTag 
                text="点击查看详情" 
                type="info" 
                onClick={() => message.info("点击了信息标签")}
                style={{ cursor: "pointer" }}
              />
              <StateTag 
                text="查看进度" 
                type="progress" 
                onClick={() => message.info("点击了进度标签")}
                style={{ cursor: "pointer" }}
              />
            </Space>
          </div>
          
          <div>
            <h4>自定义样式:</h4>
            <Space wrap>
              <StateTag 
                text="圆角标签" 
                type="success" 
                style={{ borderRadius: 20 }}
              />
              <StateTag 
                text="大字号标签" 
                type="danger" 
                style={{ fontSize: 16, padding: "4px 12px" }}
              />
            </Space>
          </div>
        </Space>
      </Card>
      
      <Card title="实际业务场景示例">
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div>
            <strong>项目状态:</strong>
            <Space>
              <StateTag text="项目立项" type="info" />
              <StateTag text="开发中" type="progress" />
              <StateTag text="测试阶段" type="progress" />
              <StateTag text="已上线" type="success" />
              <StateTag text="已暂停" type="default" />
            </Space>
          </div>
          
          <div>
            <strong>审批流程:</strong>
            <Space>
              <StateTag text="待提交" type="info" />
              <StateTag text="部门审核中" type="progress" />
              <StateTag text="财务审核中" type="progress" />
              <StateTag text="总经理审批中" type="progress" />
              <StateTag text="已通过" type="success" />
              <StateTag text="已拒绝" type="danger" />
            </Space>
          </div>
          
          <div>
            <strong>筛选条件:</strong>
            <Space>
              <StateTag text="北京分公司, 上海分公司" type="filterResult" filterName="分公司" />
              <StateTag text="技术部, 产品部" type="filterResult" filterName="部门" />
              <StateTag text="2024-01-01 至 2024-12-31" type="filterResult" filterName="日期范围" />
            </Space>
          </div>
          
          <div>
            <strong>技能标签:</strong>
            <Space>
              <StateTag text="React" type="skill" showBorder showBackground={false} />
              <StateTag text="Vue.js" type="skill" showBorder showBackground={false} />
              <StateTag text="JavaScript" type="skill" showBorder showBackground={false} />
              <StateTag text="TypeScript" type="skill" showBorder showBackground={false} />
              <StateTag text="Node.js" type="skill" showBorder showBackground={false} />
            </Space>
          </div>
        </Space>
      </Card>
    </Space>
  );
};

render(<BorderBgCombinationsExample />);

```

### API

### StateTag 属性

| 属性名            | 说明                            | 类型                                                                                                                                                                                             | 默认值       |
|----------------|-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| type           | tag的类型，类型决定显示的颜色              | 'default'(#666666)、'skill'(#666666)(此时边框颜色为 #EEEEEE)、'success'(#027A48)、'progress'(#F09700)、'danger'(#D14343)、'info'(#155ACF)、'other'(#6740C3)(待定颜色)、'result'(#666666)、'filterResult'(#5CB8B2) | 'default' |
| showBorder     | 是否展示边框                        | boolean                                                                                                                                                                                        | false     |
| showBackground | 是否展示背景色                       | boolean                                                                                                                                                                                        | true      |
| text           | tag文案                         | string                                                                                                                                                                                         | ''        |
| filterName     | tag类型为"filterResult"时显示在前边的文案 | string                                                                                                                                                                                         | ''        |

其他参数参考 [antd Tag.Tag](https://ant.design/components/tag-cn)

### StateTagEnum 属性

StateTagEnum 是基于 Enum 组件和 StateTag 组件的封装，用于从枚举数据中自动获取状态标签。

| 属性名        | 说明     | 类型     | 默认值 |
|------------|--------|--------|-----|
| moduleName | 枚举模块名称 | string | -   |
| name       | 枚举项名称  | string | -   |

其他属性继承自 StateTag 组件
