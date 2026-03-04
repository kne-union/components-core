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
    <PureGlobal preset={{ ajax }}>
      <Table
        name="candidate-list"
        controllerOpen={true}
        dataSource={[
          {
            id: "CAND001",
            date: "2024-01-15",
            dateShort: "2024-01",
            dateRange: ["2024-01-15", "2024-03-20"],
            datetime: "2024-01-15 14:30:00",
            serialNumber: "CAND-2024-001-A001",
            serialNumberShort: "C001",
            userName: "张明",
            enUserName: "Zhang Ming",
            title: "高级前端工程师",
            department: "技术研发部",
            tagEnum: "Y",
            phoneNumber: "+86 13800138001",
            email: "zhangming@example.com",
            count: 5,
            description:
              "拥有8年前端开发经验，精通React、Vue等主流框架，曾主导多个大型项目的技术架构设计，具备优秀的团队协作能力和问题解决能力。",
            salary: "35K-45K",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ZhangMing",
            gender: "M",
            age: 28,
            education: "硕士",
          },
          {
            id: "CAND002",
            date: "2024-01-18",
            dateShort: "2024-01",
            dateRange: ["2024-01-18", "2024-04-15"],
            datetime: "2024-01-18 09:15:00",
            serialNumber: "CAND-2024-002-B002",
            serialNumberShort: "C002",
            userName: "李婷",
            enUserName: "Li Ting",
            title: "产品经理",
            department: "产品设计部",
            tagEnum: null,
            phoneNumber: "+86 13900139002",
            email: "liting@example.com",
            count: 3,
            description: "资深产品经理，专注于B端产品设计和用户体验优化。",
            salary: "30K-40K",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LiTing",
            gender: "F",
            age: 26,
            education: "本科",
          },
          {
            id: "CAND003",
            date: "",
            dateShort: "2023-12",
            dateRange: null,
            datetime: "2024-01-20 16:45:00",
            serialNumber: "CAND-2024-003-C003",
            serialNumberShort: "C003",
            userName: "王强",
            enUserName: "Wang Qiang",
            title: "后端架构师",
            department: "技术研发部",
            tagEnum: "Y",
            phoneNumber: null,
            email: "wangqiang@example.com",
            count: 8,
            description: "10年后端开发经验，擅长微服务架构和分布式系统设计。",
            salary: "45K-60K",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=WangQiang",
            gender: "M",
            age: 32,
            education: "博士",
          },
        ]}
        columns={[
          {
            name: "avatar",
            title: "头像",
            type: "avatar",
            valueOf: (item) => ({
              src: item.avatar,
              gender: item.gender,
            }),
          },
          {
            name: "serialNumber",
            title: "候选人编号",
            type: "serialNumber",
            primary: true,
            onClick: async (item) => {
              console.log("查看候选人详情:", item);
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(true);
                }, 500);
              });
            },
          },
          {
            name: "serialNumberShort",
            title: "短编号",
            type: "serialNumberShort",
          },
          {
            name: "userName",
            title: "姓名",
            type: "userName",
          },
          {
            name: "user",
            title: "完整姓名",
            type: "user",
            valueOf: (item) => `${item.enUserName} ${item.userName}`,
          },
          {
            name: "title",
            title: "职位",
            type: "mainInfo",
          },
          {
            name: "department",
            title: "部门",
            type: "other",
          },
          {
            name: "date",
            title: "面试日期",
            type: "date",
            hover: true,
          },
          {
            name: "dateShort",
            title: "入职月份",
            type: "dateShort",
          },
          {
            name: "dateRange",
            title: "期望入职时间",
            type: "dateRange",
          },
          {
            name: "datetime",
            title: "面试时间",
            type: "datetime",
          },
          {
            name: "tagEnum",
            title: "状态",
            type: "tag",
            valueOf: (item) =>
              item.tagEnum
                ? {
                    type: "success",
                    isEnum: true,
                    moduleName: "marital",
                    name: item.tagEnum,
                  }
                : { type: "warning", text: "待审核" },
          },
          {
            name: "contacts",
            title: "联系方式",
            type: "contacts",
            valueOf: (item) =>
              item.phoneNumber
                ? `${item.userName} ${item.phoneNumber}`
                : item.email,
          },
          {
            name: "hideInfo",
            title: "手机号",
            type: "hideInfo",
            valueOf: (item) =>
              item.phoneNumber
                ? {
                    loader: () => {
                      return item.phoneNumber;
                    },
                  }
                : null,
          },
          {
            name: "salary",
            title: "期望薪资",
            type: "hideInfo",
            valueOf: (item) =>
              item.salary
                ? {
                    loader: () => {
                      return item.salary;
                    },
                  }
                : null,
          },
          {
            name: "count",
            title: "面试轮次",
            type: "singleRow",
          },
          {
            name: "age",
            title: "年龄",
            type: "otherSmall",
          },
          {
            name: "education",
            title: "学历",
            type: "otherSmall",
          },
          {
            name: "description",
            title: "简介",
            type: "description",
            ellipsis: true,
          },
          {
            name: "other",
            title: "备注",
            type: "otherLarge",
            render: ({ target }) => {
              return {
                children: `候选人: ${target.userName}, ${target.title}`,
              };
            },
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
                      console.log("通过:", item.userName);
                      resolve();
                    }, 1000);
                  });
                },
                children: "通过",
                isDelete: false,
              },
              {
                onClick: () => {
                  console.log("安排面试:", item.userName);
                },
                children: "安排面试",
              },
              {
                onClick: () => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      console.log("淘汰:", item.userName);
                      resolve();
                    }, 500);
                  });
                },
                children: "淘汰",
                confirm: true,
                message: `确定要淘汰候选人 ${item.userName} 吗？`,
              },
            ],
          },
        ]}
      />
    </PureGlobal>
  );
};

render(<BaseExample />);
