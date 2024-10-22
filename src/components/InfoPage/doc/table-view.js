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
