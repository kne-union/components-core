
# Table


### 概述

可以从后端获取数据，然后展示为一个表格


### 示例(全屏)

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Table(@components/Table),_Global(@components/Global),reactFetch(@kne/react-fetch)

```jsx
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
        /*tableServerApis: {
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
        },*/
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
                children: "分配",
                message: "确定要分配吗",
                isDelete: false,
              },
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
                confirm: true,
                onClick: () => {
                  console.log("删除");
                },
              },
            ],
          },
        ]}
      />
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- 这里填写示例标题
- 这里填写示例说明
- _Table(@components/Table),lodash(lodash),_Global(@components/Global)

```jsx
const { PureGlobal } = _Global;
const { TablePage } = _Table;
const { range } = lodash;
const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        features: {
          debug: true,
          profile: {
            id: "erc",
            type: "system",
            name: "业务系统",
            children: [
              {
                id: "test",
                type: "feature",
                name: "测试功能",
                options: {
                  hiddenColumns: ["date", "datetime"],
                },
              },
            ],
          },
        },
      }}
    >
      <TablePage
        featureId="test"
        name="test-2"
        sticky={false}
        rowSelection={{
          type: "checkbox",
        }}
        loader={() => {
          return {
            addUserName: "我是大魔王",
            pageData: range(0, 50).map((index) => ({
              id: index,
              date: "2021-07-21",
              datetime: "2023-07-22 09:00:00",
              serialNumber: "SX00192932323434",
              serialNumberShort: "SH0023",
              userName: "林珊珊" + index,
              title: "我是主要字段",
              enUserName: "Lin Shanshan",
              phoneNumber: "+86 18792877372",
              email: "a@a.com",
              count: 5,
              description:
                "我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",
              other: "其他信息",
            })),
            totalCount: 50,
          };
        }}
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
          },
          {
            name: "dateRange",
            title: "日期范围",
            type: "dateRange",
            valueOf: ({ date, datetime }) => [date, datetime],
          },
          {
            name: "serialNumber",
            title: "编号",
            type: "serialNumber",
            primary: true,
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
            name: "phone",
            title: "手机号",
            type: "hideInfo",
            primary: true,
            valueOf: (item) => ({
              loader: () => {
                return item["phoneNumber"] + "-" + item["id"];
              },
            }),
          },
          {
            name: "email",
            title: "邮箱",
            type: "hideInfo",
            valueOf: (item) => ({
              loader: () => {
                return item["email"] + "-" + item["id"];
              },
              children: (data) => {
                return `${data},${item["userName"]}`;
              },
            }),
          },
          {
            name: "tag",
            title: "状态标签",
            type: "tag",
            valueOf: () => ({ type: "success", text: "审核通过" }),
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
          },
          {
            name: "description",
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
            name: "addUser",
            title: "添加人",
            type: "user",
            render: ({ data }) => ({ valueOf: () => data.addUserName }),
          },
          {
            name: "options",
            title: "操作",
            type: "options",
            fixed: "right",
            valueOf: (item) => [
              {
                onClick: () => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                    }, 1000);
                  });
                },
                children: "编辑",
                disabled: true,
              },
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
              },
            ],
          },
        ]}
      />
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- 这里填写示例标题
- 这里填写示例说明
- _Table(@components/Table),_Global(@components/Global),reactFetch(@kne/react-fetch),antd(antd)

```jsx
const { default: Table } = _Table;
const { PureGlobal } = _Global;
const { preset } = reactFetch;
const { useState } = React;
const { Input } = antd;
const ajax = (config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (config.url === "/api/v1/user/user/user_key_get") {
        resolve({
          data: {
            code: 0,
            data: `{"date":{},"serialNumber":{"width":400}}`,
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

const ValueEdit = ({ value, targetRender }) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <span
      onClick={() => {
        setIsEdit(true);
      }}
    >
      {isEdit ? (
        <Input
          type="text"
          size="small"
          defaultValue={value}
          onBlur={() => {
            setIsEdit(false);
          }}
        />
      ) : (
        targetRender(value)
      )}
    </span>
  );
};

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
        dataSource={[
          {
            id: 0,
            date: "2021-07-21",
            datetime: "2023-07-22 09:00:00",
            serialNumber: "SX00192932323434",
            serialNumberShort: "SH0023",
            userName: "林珊珊",
            title: "我是主要字段",
            tagEnum: "Y",
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
            phoneNumber: "+86 18792877372",
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
            sort: true,
            groupHeader: [
              {
                name: "group1",
                title: "分组1",
              },
              {
                name: "group1-1",
                title: "分组1-1",
              },
            ],
            type: "date",
            hover: true,
          },
          {
            name: "datetime",
            title: "日期时间",
            sort: true,
            groupHeader: [
              {
                name: "group1",
                title: "分组1",
              },
              {
                name: "group1-2",
                title: "分组1-2",
              },
            ],
            type: "datetime",
          },
          {
            name: "serialNumber",
            title: "编号",
            sort: true,
            groupHeader: [
              {
                name: "group1",
                title: "分组1",
              },
              {
                name: "group1-1",
                title: "分组1-1",
              },
            ],
            type: "serialNumber",
            primary: true,
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
            disableColItem: true,
            valueOf: (item, { targetRender }) => (
              <ValueEdit value={item["title"]} targetRender={targetRender} />
            ),
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
            valueOf: (item) => ({
              type: "success",
              isEnum: true,
              moduleName: "marital",
              name: item.tagEnum,
            }),
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
            valueOf: (item) => ({
              loader: () => {
                return item["phoneNumber"] + "-" + item["id"];
              },
            }),
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
            sort: true,
          },
          {
            name: "options",
            title: "操作",
            type: "options",
            fixed: "right",
            sort: true,
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
              },
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
              },
            ],
          },
        ]}
        onSortChange={(sort) => {
          console.log(">>>>>>", sort);
        }}
      />
    </PureGlobal>
  );
};

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

