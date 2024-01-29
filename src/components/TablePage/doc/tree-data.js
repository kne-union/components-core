const { default: TablePage } = tablePage;
const { range } = _;

const Example = () => {
  return (
    <TablePage
      name="test1"
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
          hidden: true,
        },
        {
          title: "操作",
          key: "options",
          fixed: "right",
          width: 300,
          render: () => {
            return "操作";
          },
        },
      ]}
      sticky={false}
      data={{ currentPage: 1, perPage: 20 }}
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
                children: range(10).map((i) => {
                  return {
                    id:
                      index +
                      (data.currentPage - 1) * data.perPage +
                      1 +
                      "-" +
                      i,
                    positionName:
                      "市场运营总监" +
                      (index + (data.currentPage - 1) * data.perPage + 1) +
                      "-" +
                      i,
                    clientName: "大众",
                    city: "北京",
                    startTime: "2020-01-10",
                    children:
                      index === 0
                        ? [
                            {
                              id:
                                index +
                                (data.currentPage - 1) * data.perPage +
                                1 +
                                "-" +
                                i +
                                "-last",
                              positionName: "最后一层",
                              clientName: "最后一层",
                              city: "最后一层",
                              startTime: "2020-01-10",
                            },
                          ]
                        : null,
                  };
                }),
              })),
              totalCount: 100,
            });
          }, 100);
        });
      }}
    />
  );
};

render(<Example />);
