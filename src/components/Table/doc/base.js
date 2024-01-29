const { default: Table } = _Table;
const { PureGlobal } = _Global;
const { preset } = reactFetch;

const ajax = (config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (config.url === "/api/v1/user/user/user_key_get") {
        resolve({
          data: {
            code: 0,
            data: `{"date":{"visible":false},"serialNumber":{"width":400}}`,
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

const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        ajax,
        tableServerApis: {
          getDataApi: (name) => {
            return {
              url: "/api/v1/user/user/user_key_get",
              method: "GET",
              params: {
                key: `table_config_v2_${name}`,
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
                  [`table_config_v2_${name}`]: JSON.stringify(data),
                },
              },
            });
          },
        },
      }}
    >
      <Table
        name="test-table"
        onTablePropsReady={({ columns, dataSource }) => {
          console.log({ columns, dataSource });
        }}
        dataSource={[
          {
            id: 0,
            date: "2021-07-21",
            datetime: "2023-07-22 09:00:00",
            serialNumber: "SX00192932323434",
            serialNumberShort: "SH0023",
            userName: "林珊珊",
            title: "我是主要字段",
            tagEnum: null,
            enUserName: "Lin Shanshan",
            phoneNumber: "+86 18792877372",
            email: "a@a.com",
            count: 4,
            description:
              "我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",
            description2:
              "我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",
            other: "其他信息",
          },
          {
            id: 1,
            date: "",
            datetime: "2023-07-22 09:00:00",
            serialNumber: "SX00192932323434",
            serialNumberShort: "SH0023",
            userName: "林珊珊1",
            title: "我是主要字段",
            tagEnum: "Y",
            enUserName: "Lin Shanshan",
            phoneNumber: null,
            email: "a@a.com",
            count: 5,
            description: "我是一段描述",
            description2: "我是一段描述",
            other: "其他信息",
          },
        ]}
        columns={[
          {
            name: "date",
            title: "日期",
            type: "date",
            hover: true,
          },
          {
            name: "datetime",
            title: "日期时间",
            type: "datetime",
            hideSecond: true,
          },
          {
            name: "serialNumber",
            title: "编号",
            type: "serialNumber",
            primary: true,
            onClick: async (item) => {
              console.log(item);
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(true);
                }, 10000);
              });
            },
          },
          {
            name: "serialNumberShort",
            title: "短编号",
            type: "serialNumberShort",
          },
          {
            name: "title",
            title: "主要信息",
            type: "mainInfo",
          },
          {
            name: "tag",
            title: "状态标签",
            type: "tag",
            valueOf: () => ({ type: "success", text: "审核通过" }),
          },
          {
            name: "tagEnum",
            title: "标签枚举",
            type: "tag",
            valueOf: (item) =>
              item.tagEnum && {
                type: "success",
                isEnum: true,
                moduleName: "marital",
                name: item.tagEnum,
              },
          },
          {
            name: "avatar",
            title: "头像",
            type: "avatar",
            valueOf: () => ({ gender: "F" }),
          },
          {
            name: "user",
            title: "用户",
            type: "user",
            valueOf: (item) => `${item.enUserName} ${item.userName}`,
          },
          {
            name: "hideInfo",
            title: "隐藏字段",
            type: "hideInfo",
            valueOf: (item) =>
              item["phoneNumber"] && {
                loader: () => {
                  return item["phoneNumber"] + "-" + item["id"];
                },
              },
          },
          {
            name: "userName",
            title: "用户名",
            type: "userName",
          },
          {
            name: "contacts",
            title: "联系人",
            type: "contacts",
            valueOf: (item) => `${item.userName} ${item.phoneNumber}`,
          },
          {
            name: "count",
            title: "数量",
            type: "singleRow",
            render: ({ target }) => {
              return target.count === 5 ? { hover: true } : { hover: false };
            },
          },
          {
            name: "description",
            title: "描述",
            type: "description",
          },
          {
            name: "description2",
            title: "描述(省略)",
            type: "description",
            ellipsis: true,
          },
          {
            name: "other",
            title: "其他",
            type: "other",
            hover: true,
          },
          {
            name: "options",
            title: "操作",
            type: "options",
            valueOf: (item) => [
              {
                onClick: () => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                    }, 1000);
                  });
                },
                children: "分配Program及教练",
              } /*,
              {
                children: "审核",
              },
              {
                onClick: () => {
                  console.log(item);
                },
                children: "淘汰",
              },
              {
                onClick: () => {
                  console.log(item);
                },
                children: "一键约面",
              },
              {
                children: "删除",
              },*/,
            ],
          },
        ]}
      />
    </PureGlobal>
  );
};

render(<BaseExample />);
