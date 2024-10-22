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
