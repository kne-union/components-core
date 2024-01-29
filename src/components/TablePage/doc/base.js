const { default: TablePage } = tablePage;
const { PureGlobal } = global;
const { range } = _;
const { preset } = reactFetch;

const ajax = (config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (config.url === "/api/v1/user/user/user_key_get") {
        resolve({
          data: {
            code: 0,
            data: `[{\"id\":\"clientName\",\"name\":\"客户名称\",\"width\":341,\"chosen\":false,\"selected\":false},{\"id\":\"city\",\"name\":\"工作地点\",\"width\":341,\"chosen\":false,\"selected\":false},{\"id\":\"startTime\",\"name\":\"职位开始时间\",\"hidden\":false,\"width\":200,\"chosen\":false,\"selected\":false},{\"id\":\"options\",\"name\":\"操作\",\"fixed\":\"right\",\"width\":341}]`,
          },
        });
      } else if (config.url === "/api/v1/user/user/user_key_set") {
        console.log(config.data);
        resolve({
          data: {
            code: 0,
            data: "",
          },
        });
      }
    }, 100);
  });
};

preset({
  ajax,
});

const Example = () => {
  return (
    <PureGlobal
      preset={{
        ajax,
        tablePageServerApis: {
          getDataApi: (name) => {
            return {
              url: "/api/v1/user/user/user_key_get",
              method: "GET",
              params: {
                key: `table_config_${name}`,
              },
              transformResponse: (response) => {
                const { data } = response;
                response.data = Object.assign({}, data, {
                  data: (() => {
                    try {
                      return JSON.parse(data.data);
                    } catch (e) {
                      return [];
                    }
                  })(),
                });

                response.data = {
                  code: response.data.code === 0 ? 200 : data.code,
                  msg: response.data.msg,
                  results: response.data.data,
                };

                return response;
              },
              cache: "TABLE_PAGE_CONFIG",
            };
          },
          setDataFunc: (name, data) => {
            return ajax({
              url: "/api/v1/user/user/user_key_set",
              data: {
                map: {
                  [`table_config_${name}`]: JSON.stringify(data),
                },
              },
            });
          },
        },
      }}
    >
      <TablePage
        name="test1"
        rowSelection={{
          type: "checkbox",
        }}
        columns={[
          {
            title: (
              <div>
                职位名称<i>~</i>
              </div>
            ),
            titleText: "职位名称",
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
            title: "工作地点1",
            key: "city1",
            dataIndex: "city",
          },
          {
            title: "工作地点2",
            key: "city2",
            dataIndex: "city",
          },
          {
            title: "工作地点3",
            key: "city3",
            dataIndex: "city",
          },
          {
            title: "工作地点4",
            key: "city4",
            dataIndex: "city",
          },
          {
            title: "工作地点5",
            key: "city5",
            dataIndex: "city",
          },
          {
            title: "工作地点6",
            key: "city6",
            dataIndex: "city",
          },
          {
            title: "工作地点7",
            key: "city7",
            dataIndex: "city",
          },
          {
            title: "工作地点8",
            key: "city8",
            dataIndex: "city",
          },
          {
            title: "工作地点9",
            key: "city9",
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
                })),
                totalCount: 100,
              });
            }, 100);
          });
        }}
      />
    </PureGlobal>
  );
};

render(<Example />);
