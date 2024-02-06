
# TablePage


### 概述

可以从后端获取数据，然后展示为一个表格

***（已废弃，不建议使用，请用Table的TablePage组件代替）***


### 示例(全屏)


#### 示例样式

```scss
.table-Limit-height {
  height: 600px;
  overflow: auto;
  max-width: 1000px;
  margin: 0 auto;
}
```

#### 示例代码

- 普通表格
- 展示一个普通的表格
- tablePage(@components/TablePage),_(lodash),global(@components/Global),reactFetch(@kne/react-fetch)

```jsx
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

```

- 树形数据
- 展示一个树形数据的表格
- tablePage(@components/TablePage),_(lodash)

```jsx
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

```

- 固定表头表格
- 展示一个固定表头的表格
- tablePage(@components/TablePage),_(lodash)

```jsx
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

```

- 日期格式化表格
- 展示一个日期格式化表格
- tablePage(@components/TablePage),_(lodash),dayjs(dayjs)

```jsx
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

```

- 动态column获取
- 展示动态column获取的表格
- tablePage(@components/TablePage),_(lodash)

```jsx
const { default: TablePage } = tablePage;
const { range } = _;

const Example = () => {
  return (
    <TablePage
      sticky={false}
      getColumns={({ data, formatData }) => {
        console.log(data, formatData);
        return Promise.resolve([
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
        ]);
      }}
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
          }, 1000);
        });
      }}
    />
  );
};

render(<Example />);

```


### API

|属性名| 说明                                                                                           | 类型       | 默认值                                                                                                                                                                              |
|  ---  |----------------------------------------------------------------------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|  dataFormat   | 用于处理后端返回的数据，作为表格数据                                                                           | function | (data) => {return {list: data.data.pageData,total: data.data.totalCount};}                                                                                                       |
|   pagination  | 控制分页参数                                                                                       | object   | {showSizeChanger: true,showQuickJumper: true,open: true,paramsType: 'data',requestType: 'reload',current: 'currentPage',pageSize: 'perPage',defaultPageSize: 20,size: 'default'} |
|getColumns| 获取colums参数的函数,该函数的参数可以拿到请求结果数据,如果不传该函数则默认取colums属性 getColumns({data,formatData}),可以返回Promise | function | -                                                                                                                                                                                |
|stickyOffset| sticky模式，table header距离顶部位置，默认会取 --nav-height，注意：该组件会覆盖调sticky中设置的值，导致其设置不生效，需要配置该参数来实现功能    | string   | var(--nav-height)                                                                                                                                                                |
|      controllerOpen      | 是否开启列控制，调整列宽和列显示                                                                             | boolean  | true                                                                                                                                                                             |

其他参数参考

表格参数:

[antd Table](https://ant.design/components/table-cn/)

请求数据参数:

[react-fetch](/lib/react-fetch)

