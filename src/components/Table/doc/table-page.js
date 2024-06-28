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
