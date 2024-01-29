const { default: TablePage } = tablePage;
const { range } = _;
const dayjs = dayjs;

const dateFormat = (target) => {
  return dayjs(target).format("YYYY-MM-DD HH:mm:ss");
};

const Example = () => {
  return (
    <TablePage
      sticky={false}
      columns={[
        {
          title: "职位名称",
          key: "positionName",
          fixed: "left",
          dataIndex: "positionName",
        },
        {
          title: "客户名称",
          key: "clientName",
          dataIndex: "clientName",
        },
        {
          title: "工作地点",
          key: "city",
          dataIndex: "city",
        },
        {
          title: "职位开始时间",
          key: "startTime",
          dataIndex: "startTime",
          render: dateFormat,
        },
        {
          title: "职位结束时间",
          key: "endTime",
          dataIndex: "endTime",
          render: dateFormat,
        },
      ]}
      data={{ currentPage: 1, perPage: 10 }}
      loader={({ data }) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              pageData: range(data.perPage).map((index) => ({
                id: index + (data.currentPage - 1) * data.perPage + 1,
                positionName:
                  "市场运营总监" +
                  (index + (data.currentPage - 1) * data.perPage + 1),
                clientName: "大众",
                city: "北京",
                startTime: "2020-01-10",
                endTime: "2020-02-10",
              })),
              totalCount: 48,
            });
          }, 1000);
        });
      }}
    />
  );
};

render(<Example />);
