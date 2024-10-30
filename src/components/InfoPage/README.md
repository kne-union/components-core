
# InfoPage


### 概述

### *`InfoPage`* 何时使用

一般用在复杂的详情展示页面，`InfoPage` 提供了一个标准的展示信息的格式

### 特点

* 支持 `Content` 组件 `Descriptions` 组件的组合
* 支持 `Collapse` 组件组合
* `InfoPage.Part`、`InfoPage.Collapse` 需要放在 `InfoPage` 之下，`Content`、`Descriptions` 可以任意组合

### *`Content`* 何时使用

成组展示多个字段，常见于详情页的信息展示

### 特点

labelAlign 不为 auto 时会自动计算 label 的最小宽度使所有 label 的宽度等于最长的 label 宽度，使视觉上更加整齐有秩序感


### 示例

#### 示例代码

- InfoPage
- 这里填写示例说明
- _InfoPage(@components/InfoPage),antd(antd)

```jsx
const { default: InfoPage } = _InfoPage;
const { Button } = antd;

const BaseExample = () => {
  return (
    <InfoPage>
      InfoPage
      <InfoPage.Part
        title="Part Title"
        subtitle="我是一个subtitle"
        extra={<Button>操作</Button>}
      >
        InfoPage.Part
        <InfoPage.Part
          title="Part Title"
          subtitle="我是一个subtitle"
          extra={<Button>操作</Button>}
        >
          InfoPage.InfoPage.Part
        </InfoPage.Part>
      </InfoPage.Part>
      <InfoPage.Collapse
        items={[
          {
            key: "1",
            label: "This is default size panel header",
            children: <p>InfoPage.Collapse</p>,
          },
          {
            key: "2",
            label: "This is default size panel header2",
            children: <p>InfoPage.Collapse2</p>,
          },
        ]}
      />
    </InfoPage>
  );
};

render(<BaseExample />);

```

- Content
- 展示了一个基本内容
- _InfoPage(@components/InfoPage),antd(antd)

```jsx
const { Content } = _InfoPage;
const { Space, Radio } = antd;
const { useState } = React;

const BaseExample = () => {
  const [listProps, setListProps] = useState({
    col: 1,
    size: "default",
    labelAlign: "left",
  });
  const onChange = (e, name) => {
    const val = e?.target.value;
    setListProps((prevState) => Object.assign({}, prevState, { [name]: val }));
  };

  return (
    <Space direction="vertical" size={12}>
      <Radio.Group onChange={(e) => onChange(e, "col")} value={listProps.col}>
        <Radio.Button value={1}>1列</Radio.Button>
        <Radio.Button value={2}>2列</Radio.Button>
        <Radio.Button value={3}>3列</Radio.Button>
      </Radio.Group>
      <Radio.Group
        onChange={(e) => onChange(e, "labelAlign")}
        value={listProps.labelAlign}
      >
        <Radio.Button value="left">左对齐</Radio.Button>
        <Radio.Button value="center">中心对齐</Radio.Button>
        <Radio.Button value="right">右对齐</Radio.Button>
        <Radio.Button value="auto">自适应</Radio.Button>
      </Radio.Group>
      <Radio.Group onChange={(e) => onChange(e, "size")} value={listProps.size}>
        <Radio.Button value="default">默认</Radio.Button>
        <Radio.Button value="small">small</Radio.Button>
      </Radio.Group>
      <Content
        {...listProps}
        list={[
          { label: "标题", content: "内容" },
          { label: "标题标题", content: "内容内容" },
          {
            label: "标题标",
            content: "内容内容内容内容内容内容内容内容内容内容",
          },
          {
            label: "标题标题标题",
            content:
              "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
          },
        ]}
        itemRender={(inner, other) => {
          return other?.index === 2 ? "此处内容额外自定义" : inner;
        }}
      />
    </Space>
  );
};

render(<BaseExample />);

```

- Descriptions
- 展示一个信息详情
- _InfoPage(@components/InfoPage),antd(antd)

```jsx
const { Descriptions } = _InfoPage;

const BaseExample = () => {
  return (
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
          { label: "操作时间", content: "2022-08-01 16:32" },
          { label: "操作人", content: "西西歪", display: false },
        ],
        [
          {
            label: "超长内容",
            content:
              "超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容",
          },
          {
            label: "超长英文",
            content:
              "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          },
        ],
      ]}
    />
  );
};

render(<BaseExample />);

```

- CentralContent
- 请尽量使用该组件代替Descriptions组件。该组件比Descriptions组件添加了数据格式化和灵活的空判断和自定义空展示，并且优化了排列，可以实现任何栅格大小的数据项复杂组合。实现了尾行优化，使你不必担心末尾项的宽度问题，程序会自动计算并占满该行。
- _InfoPage(@components/InfoPage),antd(antd)

```jsx
const { CentralContent } = _InfoPage;

const BaseExample = () => {
  return (
    <CentralContent
      dataSource={{
        id: "RC00101",
        name: "张三",
        birthday: "2020-03-03",
        addTime: new Date(),
        count: 2000.1322,
        count2: 0.01234565,
        count3: 1234523,
        description: `描述描述描述描述描述描述描述描述\n描述描述描述描述描述描述描述描述\n描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述`,
        description2: `描述描述描述描述描述描述描述描述`,
      }}
      col={3}
      columns={[
        {
          name: "id",
          title: "ID",
          block: true,
        },
        {
          name: "name",
          title: "姓名",
          span: 10,
        },
        {
          name: "birthday",
          title: "出生日期",
          format: "date",
        },
        {
          name: "addTime",
          title: "添加时间",
          format: "datetime",
        },
        {
          name: "count",
          title: "数量",
          format: "number",
        },
        {
          name: "count2",
          title: "百分比",
          format: "number-percent money-百分比",
        },
        {
          name: "count3",
          title: "万元",
          format: "number--10000",
          render: (value) => `${value}万元`,
        },
        {
          name: "empty",
          title: "空值显示",
        },
        {
          name: "empty2",
          title: "空值显示2",
          placeholder: "空",
        },
        {
          name: "empty3",
          title: "空值显示3",
          emptyIsPlaceholder: false,
        },
        {
          name: "description",
          title: "描述",
        },
        {
          name: "description2",
          title: "描述",
        },
      ]}
    />
  );
};

render(<BaseExample />);

```

- TableView
- 
- _InfoPage(@components/InfoPage),antd(antd)

```jsx
const { TableView } = _InfoPage;
const { Flex } = antd;
const { useState } = React;

const dataSource = [
  {
    id: "RC00101",
    name: "张三",
    birthday: "2020-03-03",
    addTime: new Date(),
    count: 2000.1322,
    count2: 0.01234565,
    count3: 1234523,
    description: `描述描述描述描述描述描述描述描述`,
  },
  {
    id: "RC00102",
    name: "李四",
    birthday: "2020-03-03",
    addTime: new Date(),
    count: 2000.1322,
    count2: 0.01234565,
    count3: 1234523,
    description: `描述描述描述描述描述描述描述描述`,
  },
  {
    id: "RC00103",
    name: "王五",
    birthday: "2020-03-03",
    addTime: new Date(),
    count: 2000.1322,
    count2: 0.01234565,
    count3: 1234523,
    description: `描述描述描述描述描述描述描述描述`,
  },
  {
    id: "RC00104",
    name: "马七",
    birthday: "2020-03-03",
    addTime: new Date(),
    count: 2000.1322,
    count2: 0.01234565,
    count3: 1234523,
    description: `描述描述描述描述描述描述描述描述`,
  },
];

const columns = [
  {
    name: "id",
    title: "ID",
  },
  {
    name: "name",
    title: "姓名",
  },
  {
    name: "birthday",
    title: "出生日期",
    format: "date",
  },
  {
    name: "addTime",
    title: "添加时间",
    format: "datetime",
  },
  {
    name: "count",
    title: "数量",
    format: "number",
  },
  {
    name: "description",
    title: "描述",
    span: 10,
  },
];

const WithCheckbox = () => {
  const [selectKeys, setSelectKeys] = useState([]);
  return (
    <TableView
      dataSource={dataSource}
      columns={columns}
      rowSelection={{
        type: "checkbox",
        allowSelectedAll: true,
        selectedRowKeys: selectKeys,
        onChange: setSelectKeys,
      }}
    />
  );
};

const WithSelected = () => {
  const [selectKeys, setSelectKeys] = useState([]);
  return (
    <TableView
      dataSource={dataSource}
      columns={columns}
      rowSelection={{
        selectedRowKeys: selectKeys,
        onChange: setSelectKeys,
      }}
    />
  );
};

const BaseExample = () => {
  return (
    <Flex vertical gap={10}>
      <TableView dataSource={dataSource} columns={columns} />
      <WithCheckbox />
      <WithSelected />
      <TableView dataSource={[]} columns={columns} />
      <div
        style={{
          height: "200px",
          overflowY: "scroll",
        }}
      >
        <TableView dataSource={dataSource} columns={columns} sticky />
      </div>
    </Flex>
  );
};

render(<BaseExample />);

```

- Flow
- 
- _InfoPage(@components/InfoPage),antd(antd)

```jsx
const { Space, Flex, Divider } = antd;
const { Flow } = _InfoPage;
const BaseExample = () => {
  return (
    <Flex vertical gap={8}>
      <Flow
        current={2}
        dataSource={[
          {
            title: "title1",
            description: "This is a description.",
            createTime: "2022-08-15 10:29",
            descriptionContent: [
              {
                name: "王建国1",
                action: "添加了备注",
                time: "2023-08-15 10:30",
                content: "test",
              },
              {
                name: "王建国2",
                action: "添加了备注",
                time: "2023-08-15 10:31",
                content: "test",
              },
            ],
          },
          {
            title: "自定义DescriptionContentItem渲染样式",
            description: "This is a description.",
            descriptionContent: [
              {
                name: "王建国3",
                action: "添加了备注",
                time: "08-15 10:30",
                content: "test",
              },
              {
                name: "王建国4",
                action: "添加了备注",
                time: "08-15 10:31",
                content: "test",
              },
            ],
          },
          { title: "title3", description: "This is a description." },
          {
            title: "title4",
            description: "This is a description.",
          },
        ]}
        columns={[
          {
            name: "title",
          },
          {
            name: "description",
          },
          {
            type: "subTitle",
            name: "createTime",
            format: "datetime",
          },
          {
            name: "status",
          },
          {
            type: "actionList",
            name: "descriptionContent",
            children: [
              {
                name: "name",
              },
              {
                name: "action",
              },
              {
                type: "options",
                name: "time",
                format: "datetime",
              },
              {
                name: "content",
                render: (item, { target }) => {
                  return `@@@@@${target.name}-${target.action}-${target.content}`;
                },
              },
            ],
          },
        ]}
      />
      <Flow
        direction="horizontal"
        progressDot
        dataSource={[
          {
            title: "finish",
            description: "This is a description.",
            status: "finish",
          },
          {
            title: "process",
            description: "This is a description.",
            status: "process",
          },
          {
            title: "error",
            description: "This is a description.",
            status: "error",
          },
          {
            title: "wait",
            description: "This is a description.",
            status: "wait",
          },
        ]}
      />

      <Flow
        direction="vertical"
        progressDot
        dataSource={[
          {
            title: "finish",
            description: "This is a description.",
            status: "finish",
          },
          {
            title: "process",
            description: "This is a description.",
            status: "process",
          },
          {
            title: "error",
            description: "This is a description.",
            status: "error",
          },
          {
            title: "wait",
            description: "This is a description.",
            status: "wait",
          },
        ]}
      />
      <Flow
        dataSource={[
          {
            title: "finish",
            description: "This is a description.",
            subTitle: "2023-08-15 10:29",
            status: "finish",
          },
          {
            title: "process",
            description: "This is a description.",
            status: "process",
          },
          {
            title: "error",
            description: "This is a description.",
            status: "error",
          },
          {
            title: "wait",
            description: "This is a description.",
            status: "wait",
          },
        ]}
        columns={[{ name: "subTitle", format: "datetime" }]}
      />
    </Flex>
  );
};

render(<BaseExample />);

```


### API

### InfoPage

同 [`Ant Design Card`](https://ant.design/components/Card#api)

新增参数：

| 属性名       | 说明                       | 类型        | 默认值 |
|-----------|--------------------------|-----------|-----|
| subtitle  | 副标题                      | ReactNode | -   |
| className | `InfoPage` 的 `className` | string    | -   |

#### InfoPage.Part

同 [`Ant Design Card`](https://ant.design/components/Card#api)

新增参数：

| 属性名       | 说明                   | 类型        | 默认值 |
|-----------|----------------------|-----------|-----|
| subtitle  | 副标题                  | ReactNode | -   |
| className | `Part` 的 `className` | string    | -   |

#### InfoPage.Collapse

同 [`Ant Design Collapse`](https://ant.design/components/Collapse#collapse)

新增参数：

| 属性名       | 说明                   | 类型     | 默认值 |
|-----------|----------------------|--------|-----|
| className | `Part` 的 `className` | string | -   |

### Content

| 属性名        | 说明                                                                                  | 类型                | 默认值  |
|------------|-------------------------------------------------------------------------------------|-------------------|------|
| list       | `Content` 的内容列表                                                                     | `listItemProps[]` | []   |
| labelAlign | `label` 的对齐方式可以传入的值 `left,right,center,auto`,为 `auto` 时 `label` 不计算最小宽度             | string            | left |
| col        | 列数                                                                                  | number            | 1    |
| size       | 默认为 `14px`，可以传值为 `small`，`size` 为 `small` 时字号为 `12px`                               | string            | -    |
| gutter     | 栅格间隔，可以写成像素值或支持响应式的对象写法来设置水平间隔 `{ xs: 8, sm: 16, md: 24}`。或者使用数组形式同时设置 [水平间距, 垂直间距] | number            | 0    |
| className  | `Content` 的 `className`                                                             | string            | -    |
| itemRender | 接收 `Content Inner` 和 `Inner` 的 `label, content, index`，可以根据数据信息返回想要渲染的内容            | function          | -    |

#### listItemProps

| 属性名     | 说明                                                                                            | 类型                  | 默认值  |
|---------|-----------------------------------------------------------------------------------------------|---------------------|------|
| display | 数据是否展示，当为 `function` 时可以接收到 `item, list` 参数，`item` 为当前项配置，`dataSource` 为整个组件的 `dataSource` 配置 | boolean \| function | true |
| block   | 是否单行显示该条信息                                                                                    | ReactNode \| string | -    |
| label   | 标题                                                                                            | ReactNode \| string | -    |
| content | 内容                                                                                            | ReactNode \| string | -    |

### Descriptions

| 属性名        | 说明                                                                                      | 类型                      | 默认值 |
|------------|-----------------------------------------------------------------------------------------|-------------------------|-----|
| dataSource | 详情数据源，内部每个数组为一行数据，每行数据中每个对象为一列数据，每行最多包含 `2` 列内容，多余的会被丢弃                                 | `dataSourceItemProps[]` | -   |
| itemRender | 接收 `Descriptions Inner` 和 `Inner` 的 `label, content, displaty, index`，可以根据数据信息返回想要渲染的内容 | function                | -   |

#### dataSourceItemProps

| 属性名     | 说明                                                                                                  | 类型                  | 默认值  |
|---------|-----------------------------------------------------------------------------------------------------|---------------------|------|
| display | 数据是否展示，当为 `function` 时可以接收到 `item, dataSource` 参数，`item` 为当前项配置，`dataSource` 为整个组件的 `dataSource` 配置 | boolean \| function | true |
| label   | 数据展示的标题                                                                                             | ReactNode \| string | -    |
| content | 数据展示的内容                                                                                             | ReactNode \| string | -    |

