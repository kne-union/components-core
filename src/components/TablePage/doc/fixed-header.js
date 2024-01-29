const { default: TablePage } = tablePage;
const { range } = _;
const { useRef } = React;

const Example = () => {
  const ref = useRef();
  return (
    <div className="table-Limit-height" ref={ref}>
      <div
        style={{
          height: 700,
        }}
      >
        请往下拉
      </div>
      <TablePage
        stickyOffset="0px"
        scroller={{
          getContainer: () => ref.current,
        }}
        data={{ currentPage: 1, perPage: 20 }}
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
          },
        ]}
        loader={({ data }) => {
          return {
            pageData: range(data.perPage).map((index) => ({
              id: index + (data.currentPage - 1) * data.perPage + 1,
              positionName:
                "市场运营总监" +
                (index + (data.currentPage - 1) * data.perPage + 1),
              clientName: "大众",
              city: "北京",
              startTime: "2020-01-10",
            })),
            totalCount: 100,
          };
        }}
      />
    </div>
  );
};

render(<Example />);
