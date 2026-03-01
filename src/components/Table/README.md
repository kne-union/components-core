# Table

### 概述

Table 组件是一个功能强大的数据表格组件，基于 Ant Design Table 二次封装，提供了丰富的列类型、列配置、排序、分组表头、操作列等高级功能。

组件支持两种使用方式：
- **Table**: 基础表格组件，适用于静态数据展示
- **TablePage**: 集成数据加载、分页、权限控制的完整表格解决方案

主要特性：
- 内置 16+ 种列类型（日期、编号、用户、标签、头像等）
- 支持列拖拽调整宽度、列显示/隐藏、列排序
- 支持分组表头
- 支持行选择（checkbox）
- 支持操作列（options）
- 支持本地存储列配置
- 支持自定义列渲染


### 示例(全屏)

#### 示例代码

- 基础表格 - 所有列类型展示
- 展示 Table 组件的 16+ 种列类型（日期、日期时间、短日期、日期范围、编号、短编号、用户、用户名、联系人、头像、标签、隐藏信息、敏感信息、单行文本、描述、其他等），演示 primary、hover、ellipsis、onClick 等常用列属性。业务场景：候选人面试管理系统。
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
            data: &#96;{"date":{"visible":false},"serialNumber":{"width":400}}&#96;,
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
            valueOf: (item) => &#96;${item.enUserName} ${item.userName}&#96;,
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
                ? &#96;${item.userName} ${item.phoneNumber}&#96;
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
                children: &#96;候选人: ${target.userName}, ${target.title}&#96;,
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
                message: &#96;确定要淘汰候选人 ${item.userName} 吗？&#96;,
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

- 列配置详解
- 详细展示列配置的各种属性，包括 width、min、max 控制列宽，hidden 隐藏列，fixed 固定列，primary 主要字段标识，hover 效果，ellipsis 省略号等。业务场景：项目管理列表。
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
            data: "{}",
          },
        });
      } else if (config.url === "/api/v1/user/user/user_key_set") {
        resolve({
          data: { code: 0, data: "" },
        });
      }
    }, 100);
  });
};

preset({ ajax });

const BaseExample = () => {
  return (
    <PureGlobal preset={{ ajax }}>
      <Table
        name="project-list"
        controllerOpen={true}
        dataSource={[
          {
            id: "PRJ001",
            projectName: "智慧城市管理平台",
            projectCode: "SMART-CITY-2024",
            department: "技术研发部",
            pm: "陈伟",
            status: "progress",
            budget: 1500000,
            progress: 65,
            startDate: "2024-01-01",
            endDate: "2024-06-30",
            priority: "high",
            teamSize: 12,
            description:
              "基于物联网和大数据技术的智慧城市综合管理平台，包含交通、环保、安防等多个子系统，实现城市运行状态的实时监控和智能调度。",
            tags: ["物联网", "大数据", "微服务"],
          },
          {
            id: "PRJ002",
            projectName: "电商营销活动系统",
            projectCode: "E-COMMERCE-MKT",
            department: "产品设计部",
            pm: "赵敏",
            status: "completed",
            budget: 800000,
            progress: 100,
            startDate: "2023-09-01",
            endDate: "2024-01-31",
            priority: "medium",
            teamSize: 8,
            description: "支持多种营销活动的配置和执行，包括优惠券、满减、秒杀等功能。",
            tags: ["电商", "营销", "活动"],
          },
          {
            id: "PRJ003",
            projectName: "移动端OA办公系统",
            projectCode: "MOBILE-OA",
            department: "技术研发部",
            pm: "刘洋",
            status: "pending",
            budget: 500000,
            progress: 0,
            startDate: "2024-03-01",
            endDate: "2024-08-31",
            priority: "low",
            teamSize: 6,
            description: "企业移动办公应用，支持审批、考勤、公告等日常办公功能。",
            tags: ["移动端", "OA", "审批"],
          },
          {
            id: "PRJ004",
            projectName: "数据中台建设",
            projectCode: "DATA-PLATFORM",
            department: "数据平台部",
            pm: "孙磊",
            status: "progress",
            budget: 2000000,
            progress: 45,
            startDate: "2024-02-01",
            endDate: "2024-12-31",
            priority: "high",
            teamSize: 15,
            description: "构建企业级数据中台，实现数据采集、存储、处理和分析的统一平台。",
            tags: ["数据中台", "数据治理", "BI"],
          },
        ]}
        columns={[
          {
            name: "projectCode",
            title: "项目编号",
            type: "serialNumber",
            primary: true,
            width: 200,
            min: 150,
            max: 300,
            fixed: "left",
          },
          {
            name: "projectName",
            title: "项目名称",
            type: "mainInfo",
            width: 280,
            hover: true,
            fixed: "left",
          },
          {
            name: "department",
            title: "所属部门",
            type: "other",
            width: 150,
            hidden: false,
          },
          {
            name: "pm",
            title: "项目经理",
            type: "userName",
            width: 120,
            min: 100,
            max: 200,
          },
          {
            name: "status",
            title: "状态",
            type: "tag",
            width: 120,
            valueOf: (item) => {
              const statusMap = {
                progress: { type: "processing", text: "进行中" },
                completed: { type: "success", text: "已完成" },
                pending: { type: "warning", text: "待启动" },
              };
              return statusMap[item.status];
            },
          },
          {
            name: "priority",
            title: "优先级",
            type: "tag",
            width: 100,
            valueOf: (item) => {
              const priorityMap = {
                high: { type: "error", text: "高" },
                medium: { type: "warning", text: "中" },
                low: { type: "default", text: "低" },
              };
              return priorityMap[item.priority];
            },
          },
          {
            name: "progress",
            title: "进度",
            type: "singleRow",
            width: 100,
            render: ({ target }) => {
              return {
                children: &#96;${target.progress}%&#96;,
                style: {
                  color:
                    target.progress === 100
                      ? "#52c41a"
                      : target.progress >= 50
                      ? "#1890ff"
                      : "#faad14",
                },
              };
            },
          },
          {
            name: "budget",
            title: "预算",
            type: "hideInfo",
            width: 150,
            valueOf: (item) => ({
              loader: () => {
                return &#96;¥${(item.budget / 10000).toFixed(1)}万&#96;;
              },
            }),
          },
          {
            name: "teamSize",
            title: "团队规模",
            type: "otherSmall",
            width: 100,
            hover: true,
          },
          {
            name: "startDate",
            title: "开始日期",
            type: "date",
            width: 160,
          },
          {
            name: "endDate",
            title: "结束日期",
            type: "date",
            width: 160,
          },
          {
            name: "dateRange",
            title: "项目周期",
            type: "dateRange",
            width: 280,
            valueOf: (item) => [item.startDate, item.endDate],
          },
          {
            name: "description",
            title: "项目描述",
            type: "description",
            width: 400,
            min: 200,
            max: 600,
            ellipsis: { showTitle: true },
          },
          {
            name: "options",
            title: "操作",
            type: "options",
            width: 180,
            fixed: "right",
            valueOf: (item) => [
              {
                onClick: () => {
                  console.log("查看项目:", item.projectName);
                },
                children: "查看",
              },
              {
                onClick: () => {
                  console.log("编辑项目:", item.projectName);
                },
                children: "编辑",
                disabled: item.status === "completed",
                tooltipProps: {
                  title:
                    item.status === "completed" ? "已完成项目不可编辑" : "",
                },
              },
              {
                onClick: () => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      console.log("删除项目:", item.projectName);
                      resolve();
                    }, 500);
                  });
                },
                children: "删除",
                confirm: true,
                message: &#96;确定要删除项目 ${item.projectName} 吗？&#96;,
              },
            ],
          },
        ]}
        onTablePropsReady={({ columns, dataSource }) => {
          console.log("表格配置就绪:", { columns, dataSource });
        }}
      />
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- Table 高级功能
- 展示 Table 组件的高级功能：sticky 固定表头、stickyOffset 表头偏移、pagination 分页、summary 总结栏、scroll 滚动配置、controllerOpen 列控制开关、rowKey 自定义行键、className 自定义样式等。业务场景：订单管理系统。
- _Table(@components/Table),_Global(@components/Global),reactFetch(@kne/react-fetch),antd(antd)

```jsx
const { default: Table } = _Table;
const { PureGlobal } = _Global;
const { preset } = reactFetch;
const { Button, Space } = antd;

const ajax = (config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (config.url === "/api/v1/user/user/user_key_get") {
        resolve({
          data: { code: 0, data: "{}" },
        });
      } else if (config.url === "/api/v1/user/user/user_key_set") {
        resolve({
          data: { code: 0, data: "" },
        });
      }
    }, 100);
  });
};

preset({ ajax });

const BaseExample = () => {
  return (
    <PureGlobal preset={{ ajax }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <h3>固定表头 + 分页 + 总结栏</h3>
          <Table
            name="order-management"
            sticky={true}
            stickyOffset="60px"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => &#96;共 ${total} 条记录&#96;,
            }}
            scroll={{ y: 400 }}
            controllerOpen={true}
            rowKey="orderId"
            className="custom-table-class"
            columnRenderProps={{
              currentUserId: "user_001",
            }}
            summary={(current) => {
              const { pageData } = current;
              const totalAmount = pageData.reduce(
                (sum, item) => sum + item.amount,
                0
              );
              return (
                <Table.Summary fixed>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={5}>
                      <strong>本页合计</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={5}>
                      <strong>¥{totalAmount.toFixed(2)}</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={6} colSpan={2}>
                      <strong>
                        {pageData.length} 笔订单
                      </strong>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              );
            }}
            dataSource={[
              {
                orderId: "ORD202401150001",
                orderNo: "ORD-2024-0115-001",
                customer: "北京科技有限公司",
                product: "企业版SaaS订阅服务",
                quantity: 50,
                amount: 125000.0,
                status: "paid",
                createTime: "2024-01-15 10:30:00",
              },
              {
                orderId: "ORD202401150002",
                orderNo: "ORD-2024-0115-002",
                customer: "上海创新科技",
                product: "高级API调用套餐",
                quantity: 100000,
                amount: 89000.5,
                status: "paid",
                createTime: "2024-01-15 11:20:00",
              },
              {
                orderId: "ORD202401150003",
                orderNo: "ORD-2024-0115-003",
                customer: "深圳智能制造",
                product: "物联网设备管理平台",
                quantity: 1,
                amount: 350000.0,
                status: "pending",
                createTime: "2024-01-15 14:15:00",
              },
              {
                orderId: "ORD202401150004",
                orderNo: "ORD-2024-0115-004",
                customer: "广州贸易集团",
                product: "数据分析平台",
                quantity: 20,
                amount: 68000.0,
                status: "shipped",
                createTime: "2024-01-15 15:40:00",
              },
              {
                orderId: "ORD202401160001",
                orderNo: "ORD-2024-0116-001",
                customer: "杭州电商公司",
                product: "营销自动化工具",
                quantity: 30,
                amount: 45000.0,
                status: "paid",
                createTime: "2024-01-16 09:00:00",
              },
            ]}
            columns={[
              {
                name: "orderNo",
                title: "订单号",
                type: "serialNumber",
                primary: true,
                width: 200,
              },
              {
                name: "customer",
                title: "客户名称",
                type: "mainInfo",
                width: 200,
              },
              {
                name: "product",
                title: "产品",
                type: "other",
                width: 200,
              },
              {
                name: "quantity",
                title: "数量",
                type: "singleRow",
                width: 100,
              },
              {
                name: "amount",
                title: "金额",
                type: "other",
                width: 150,
                render: ({ target }) => ({
                  children: &#96;¥${target.amount.toFixed(2)}&#96;,
                }),
              },
              {
                name: "status",
                title: "状态",
                type: "tag",
                width: 120,
                valueOf: (item) => {
                  const statusMap = {
                    paid: { type: "success", text: "已支付" },
                    pending: { type: "warning", text: "待支付" },
                    shipped: { type: "processing", text: "已发货" },
                    cancelled: { type: "error", text: "已取消" },
                  };
                  return statusMap[item.status];
                },
              },
              {
                name: "createTime",
                title: "创建时间",
                type: "datetime",
                width: 190,
              },
            ]}
          />
        </div>

        <div>
          <h3>自定义行键 + 禁用列控制</h3>
          <Table
            name="simple-list"
            controllerOpen={false}
            rowKey={(record) => &#96;custom-key-${record.id}&#96;}
            dataSource={[
              { id: 1, name: "张三", role: "管理员", email: "zhangsan@example.com" },
              { id: 2, name: "李四", role: "编辑", email: "lisi@example.com" },
              { id: 3, name: "王五", role: "访客", email: "wangwu@example.com" },
            ]}
            columns={[
              { name: "name", title: "姓名", type: "userName" },
              { name: "role", title: "角色", type: "other", width: 120 },
              { name: "email", title: "邮箱", type: "other" },
            ]}
          />
        </div>

        <div>
          <h3>横向滚动表格</h3>
          <Table
            name="inventory-table"
            scroll={{ x: 1800 }}
            dataSource={[
              {
                id: "INV001",
                productCode: "SKU-2024-A001",
                productName: "智能手表Pro版",
                category: "智能穿戴",
                brand: "华为",
                spec: "42mm/午夜黑",
                color: "黑色",
                stockQty: 1250,
                inTransit: 300,
                warningQty: 200,
                costPrice: 899,
                retailPrice: 1299,
                supplier: "深圳华为供应链",
                warehouse: "A区-3层-15号",
                updateTime: "2024-01-15 14:30:00",
              },
              {
                id: "INV002",
                productCode: "SKU-2024-B002",
                productName: "无线降噪耳机",
                category: "音频设备",
                brand: "索尼",
                spec: "头戴式/银色",
                color: "银色",
                stockQty: 856,
                inTransit: 150,
                warningQty: 100,
                costPrice: 1599,
                retailPrice: 2299,
                supplier: "广州索尼授权经销商",
                warehouse: "B区-2层-08号",
                updateTime: "2024-01-15 12:20:00",
              },
              {
                id: "INV003",
                productCode: "SKU-2024-C003",
                productName: "机械键盘RGB版",
                category: "电脑配件",
                brand: "罗技",
                spec: "87键/青轴",
                color: "黑色",
                stockQty: 2340,
                inTransit: 500,
                warningQty: 300,
                costPrice: 399,
                retailPrice: 599,
                supplier: "东莞罗技工厂直供",
                warehouse: "C区-1层-22号",
                updateTime: "2024-01-15 16:45:00",
              },
            ]}
            columns={[
              {
                name: "productCode",
                title: "产品编号",
                type: "serialNumber",
                primary: true,
                fixed: "left",
                width: 150,
              },
              {
                name: "productName",
                title: "产品名称",
                type: "mainInfo",
                fixed: "left",
                width: 180,
              },
              {
                name: "category",
                title: "类别",
                type: "tag",
                width: 120,
                valueOf: (item) => {
                  const categoryMap = {
                    智能穿戴: { type: "processing", text: "智能穿戴" },
                    音频设备: { type: "success", text: "音频设备" },
                    电脑配件: { type: "warning", text: "电脑配件" },
                  };
                  return categoryMap[item.category];
                },
              },
              {
                name: "brand",
                title: "品牌",
                type: "other",
                width: 120,
              },
              {
                name: "spec",
                title: "规格",
                type: "other",
                width: 150,
              },
              {
                name: "color",
                title: "颜色",
                type: "otherSmall",
                width: 100,
              },
              {
                name: "stockQty",
                title: "库存数量",
                type: "singleRow",
                width: 120,
                render: ({ target }) => ({
                  children: target.stockQty,
                  style: {
                    color: target.stockQty < target.warningQty ? "#f5222d" : "#52c41a",
                    fontWeight: "bold",
                  },
                }),
              },
              {
                name: "inTransit",
                title: "在途数量",
                type: "singleRow",
                width: 120,
              },
              {
                name: "warningQty",
                title: "预警值",
                type: "singleRow",
                width: 100,
              },
              {
                name: "costPrice",
                title: "成本价",
                type: "other",
                width: 120,
                render: ({ target }) => ({
                  children: &#96;¥${target.costPrice}&#96;,
                }),
              },
              {
                name: "retailPrice",
                title: "零售价",
                type: "other",
                width: 120,
                render: ({ target }) => ({
                  children: &#96;¥${target.retailPrice}&#96;,
                }),
              },
              {
                name: "supplier",
                title: "供应商",
                type: "other",
                width: 180,
              },
              {
                name: "warehouse",
                title: "仓库位置",
                type: "other",
                width: 150,
              },
              {
                name: "updateTime",
                title: "更新时间",
                type: "datetime",
                width: 180,
              },
              {
                name: "options",
                title: "操作",
                type: "options",
                fixed: "right",
                width: 150,
                valueOf: (item) => [
                  {
                    onClick: () => {
                      console.log("查看详情:", item.productName);
                    },
                    children: "查看",
                  },
                  {
                    onClick: () => {
                      console.log("调整库存:", item.productName);
                    },
                    children: "调库",
                  },
                ],
              },
            ]}
          />
        </div>
      </Space>
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- TablePage 分页表格
- 展示 TablePage 组件的完整功能：loader 数据加载（支持分页参数）、featureId 权限控制（自动隐藏指定列）、pagination 详细配置、dataFormat 数据格式化、columns 列配置、columnRenderProps 列渲染属性、summary 总结栏。业务场景：员工管理系统。
- _Table(@components/Table),lodash(lodash),_Global(@components/Global)

```jsx
const {PureGlobal} = _Global;
const {default: Table, TablePage} = _Table;
const {range} = lodash;

const BaseExample = () => {
    return (<PureGlobal
        preset={{
            features: {
                debug: true, profile: {
                    id: "employee-management", type: "system", name: "员工管理系统", children: [{
                        id: "employee-list", type: "feature", name: "员工列表", options: {
                            hiddenColumns: ["workYears", "education"],
                        },
                    },],
                },
            },
        }}
    >
        <TablePage
            featureId="employee-list"
            name="employee-table"
            pagination={{
                open: true,
                showSizeChanger: true,
                showQuickJumper: true,
                pageSizeOptions: ["10", "20", "50", "100"],
                showTotal: (total) => &#96;共 ${total} 名员工&#96;,
            }}
            dataFormat={(data) => {
                return {
                    list: data.pageData, total: data.totalCount, data,
                };
            }}
            loader={({data}) => {
                const {currentPage = 1, perPage = 20} = data || {};
                const startIndex = (currentPage - 1) * perPage;

                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            pageData: range(startIndex, Math.min(startIndex + perPage, 156)).map((index) => ({
                                id: &#96;EMP${String(index + 1).padStart(4, "0")}&#96;,
                                employeeNo: &#96;EMP-2024-${String(index + 1).padStart(4, "0")}&#96;,
                                name: index % 3 === 0 ? &#96;张${["伟", "强", "敏", "磊", "杰"][index % 5]}&#96; : index % 3 === 1 ? &#96;李${["婷", "娜", "静", "丽", "娟"][index % 5]}&#96; : &#96;王${["刚", "磊", "勇", "涛", "鹏"][index % 5]}&#96;,
                                enName: index % 3 === 0 ? &#96;Zhang ${["Wei", "Qiang", "Min", "Lei", "Jie"][index % 5]}&#96; : index % 3 === 1 ? &#96;Li ${["Ting", "Na", "Jing", "Li", "Juan"][index % 5]}&#96; : &#96;Wang ${["Gang", "Lei", "Yong", "Tao", "Peng"][index % 5]}&#96;,
                                department: ["技术研发部", "产品设计部", "市场营销部", "人力资源部", "财务部"][index % 5],
                                position: ["工程师", "高级工程师", "经理", "总监", "专员"][index % 5],
                                status: index % 4 === 0 ? "active" : index % 4 === 1 ? "vacation" : index % 4 === 2 ? "resigned" : "probation",
                                email: &#96;employee${index + 1}@company.com&#96;,
                                phone: &#96;+86 138${String(index).padStart(8, "0")}&#96;,
                                joinDate: &#96;2023-${String((index % 12) + 1).padStart(2, "0")}-${String((index % 28) + 1).padStart(2, "0")}&#96;,
                                workYears: Math.floor(index / 12) + 1,
                                salary: &#96;${15 + (index % 20)}K-${20 + (index % 20)}K&#96;,
                                education: ["本科", "硕士", "博士", "大专"][index % 4],
                                performance: ["A", "B", "C", "S"][index % 4],
                            })), totalCount: 156,
                        });
                    }, 300);
                });
            }}
            columns={[{
                name: "employeeNo", title: "工号", type: "serialNumber", primary: true, fixed: "left", width: 180,
            }, {
                name: "name", title: "姓名", type: "userName", fixed: "left", width: 120,
            }, {
                name: "enName", title: "英文名", type: "otherSmall", width: 120,
            }, {
                name: "department", title: "部门", type: "other", width: 150,
            }, {
                name: "position", title: "职位", type: "mainInfo", width: 180,
            }, {
                name: "status", title: "状态", type: "tag", width: 120, valueOf: (item) => {
                    const statusMap = {
                        active: {type: "success", text: "在职"},
                        vacation: {type: "warning", text: "休假"},
                        resigned: {type: "error", text: "离职"},
                        probation: {type: "processing", text: "试用期"},
                    };
                    return statusMap[item.status];
                },
            }, {
                name: "performance", title: "绩效", type: "tag", width: 100, valueOf: (item) => {
                    const perfMap = {
                        S: {type: "success", text: "S"},
                        A: {type: "processing", text: "A"},
                        B: {type: "warning", text: "B"},
                        C: {type: "error", text: "C"},
                    };
                    return perfMap[item.performance];
                },
            }, {
                name: "phone", title: "手机号", type: "hideInfo", width: 150, valueOf: (item) => ({
                    loader: () => item.phone,
                }),
            }, {
                name: "email",
                title: "邮箱",
                type: "contacts",
                width: 200,
                valueOf: (item) => &#96;${item.name} ${item.email}&#96;,
            }, {
                name: "joinDate", title: "入职日期", type: "date", width: 160,
            }, {
                name: "workYears", title: "工龄", type: "singleRow", width: 100, render: ({target}) => ({
                    children: &#96;${target.workYears}年&#96;,
                }),
            }, {
                name: "salary", title: "薪资范围", type: "hideInfo", width: 150, valueOf: (item) => ({
                    loader: () => item.salary,
                }),
            }, {
                name: "education", title: "学历", type: "otherSmall", width: 100,
            }, {
                name: "options", title: "操作", type: "options", fixed: "right", width: 200, valueOf: (item) => [{
                    onClick: () => {
                        console.log("查看员工:", item.name);
                    }, children: "查看",
                }, {
                    onClick: () => {
                        console.log("编辑员工:", item.name);
                    }, children: "编辑", disabled: item.status === "resigned", tooltipProps: {
                        title: item.status === "resigned" ? "离职员工不可编辑" : "",
                    },
                }, {
                    onClick: () => {
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                console.log("导出数据:", item.name);
                                resolve();
                            }, 500);
                        });
                    }, children: "导出",
                },],
            },]}
            columnRenderProps={{
                currentUserId: "admin_001",
            }}
            summary={(current) => {
                const {pageData, data} = current;
                return (<Table.Summary fixed>
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0} colSpan={5}>
                            <strong>当前页统计</strong>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={5}>
                            <strong>{pageData.length} 人</strong>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={6} colSpan={8}>
                            <strong>总员工数: {data?.totalCount || 0} 人</strong>
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                </Table.Summary>);
            }}
        />
    </PureGlobal>);
};

render(<BaseExample/>);

```

- 行选择与批量操作
- 展示 useSelectedRow Hook 的使用方法，实现行选择（checkbox）功能，包括 selectedRowKeys、setSelectedRowKeys、onSelectAll、onSelect 等 API。演示批量审批、批量拒绝、批量导出等常见批量操作场景。业务场景：请假审批系统。
- _Table(@components/Table),_Global(@components/Global),antd(antd)

```jsx
const { default: Table } = _Table;
const { PureGlobal } = _Global;
const { Button, Space, Typography, message } = antd;
const { Text } = Typography;

const ajax = (config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: { code: 0, data: "{}" },
      });
    }, 100);
  });
};

const BaseExample = () => {
  const selectedProps = Table.useSelectedRow({
    rowKey: "id",
  });
  
  const { selectedRowKeys, setSelectedRowKeys } = selectedProps;

  const handleBatchApprove = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("请先选择要审批的记录");
      return;
    }
    message.success(&#96;已批量审批 ${selectedRowKeys.length} 条记录&#96;);
    setSelectedRowKeys([]);
  };

  const handleBatchReject = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("请先选择要拒绝的记录");
      return;
    }
    message.info(&#96;已批量拒绝 ${selectedRowKeys.length} 条记录&#96;);
    setSelectedRowKeys([]);
  };

  const handleBatchExport = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("请先选择要导出的记录");
      return;
    }
    message.info(&#96;正在导出 ${selectedRowKeys.length} 条记录&#96;);
  };

  return (
    <PureGlobal preset={{ ajax }}>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <div style={{ padding: "12px", background: "#f5f5f5", borderRadius: "4px" }}>
          <Space>
            <Text strong>已选择: {selectedRowKeys.length} 项</Text>
            <Button
              type="primary"
              size="small"
              onClick={handleBatchApprove}
              disabled={selectedRowKeys.length === 0}
            >
              批量通过
            </Button>
            <Button
              size="small"
              onClick={handleBatchReject}
              disabled={selectedRowKeys.length === 0}
            >
              批量拒绝
            </Button>
            <Button
              size="small"
              onClick={handleBatchExport}
              disabled={selectedRowKeys.length === 0}
            >
              批量导出
            </Button>
            <Button
              size="small"
              onClick={() => setSelectedRowKeys([])}
              disabled={selectedRowKeys.length === 0}
            >
              清空选择
            </Button>
          </Space>
        </div>

        <Table
          name="leave-approval"
          controllerOpen={false}
          rowSelection={selectedProps}
          dataSource={[
            {
              id: "LEAVE001",
              employeeNo: "EMP-0001",
              employeeName: "张明",
              department: "技术研发部",
              leaveType: "年假",
              startDate: "2024-02-01",
              endDate: "2024-02-05",
              days: 5,
              reason: "春节回家探亲，需要提前返乡准备",
              status: "pending",
              applyTime: "2024-01-20 10:30:00",
            },
            {
              id: "LEAVE002",
              employeeNo: "EMP-0002",
              employeeName: "李婷",
              department: "产品设计部",
              leaveType: "事假",
              startDate: "2024-02-10",
              endDate: "2024-02-10",
              days: 1,
              reason: "个人事务处理",
              status: "pending",
              applyTime: "2024-01-22 14:15:00",
            },
            {
              id: "LEAVE003",
              employeeNo: "EMP-0003",
              employeeName: "王强",
              department: "技术研发部",
              leaveType: "病假",
              startDate: "2024-01-25",
              endDate: "2024-01-26",
              days: 2,
              reason: "身体不适，需要休息治疗",
              status: "approved",
              applyTime: "2024-01-24 09:00:00",
            },
            {
              id: "LEAVE004",
              employeeNo: "EMP-0004",
              employeeName: "赵敏",
              department: "市场营销部",
              leaveType: "婚假",
              startDate: "2024-03-01",
              endDate: "2024-03-10",
              days: 10,
              reason: "结婚典礼及蜜月旅行",
              status: "pending",
              applyTime: "2024-01-25 16:20:00",
            },
            {
              id: "LEAVE005",
              employeeNo: "EMP-0005",
              employeeName: "陈伟",
              department: "人力资源部",
              leaveType: "年假",
              startDate: "2024-02-15",
              endDate: "2024-02-16",
              days: 2,
              reason: "家庭事务处理",
              status: "rejected",
              applyTime: "2024-01-23 11:00:00",
            },
          ]}
          columns={[
            {
              name: "employeeNo",
              title: "工号",
              type: "serialNumber",
              width: 150,
            },
            {
              name: "employeeName",
              title: "姓名",
              type: "userName",
              width: 120,
            },
            {
              name: "department",
              title: "部门",
              type: "other",
              width: 150,
            },
            {
              name: "leaveType",
              title: "假期类型",
              type: "tag",
              width: 120,
              valueOf: (item) => {
                const typeMap = {
                  年假: { type: "success", text: "年假" },
                  事假: { type: "warning", text: "事假" },
                  病假: { type: "error", text: "病假" },
                  婚假: { type: "processing", text: "婚假" },
                };
                return typeMap[item.leaveType];
              },
            },
            {
              name: "dateRange",
              title: "请假时间",
              type: "dateRange",
              width: 280,
              valueOf: (item) => [item.startDate, item.endDate],
            },
            {
              name: "days",
              title: "天数",
              type: "singleRow",
              width: 80,
            },
            {
              name: "reason",
              title: "请假原因",
              type: "description",
              width: 300,
              ellipsis: true,
            },
            {
              name: "status",
              title: "状态",
              type: "tag",
              width: 100,
              valueOf: (item) => {
                const statusMap = {
                  pending: { type: "warning", text: "待审批" },
                  approved: { type: "success", text: "已通过" },
                  rejected: { type: "error", text: "已拒绝" },
                };
                return statusMap[item.status];
              },
            },
            {
              name: "applyTime",
              title: "申请时间",
              type: "datetime",
              width: 180,
            },
            {
              name: "options",
              title: "操作",
              type: "options",
              width: 150,
              valueOf: (item) =>
                item.status === "pending"
                  ? [
                      {
                        onClick: () => {
                          message.success(&#96;已通过 ${item.employeeName} 的请假申请&#96;);
                        },
                        children: "通过",
                      },
                      {
                        onClick: () => {
                          message.info(&#96;已拒绝 ${item.employeeName} 的请假申请&#96;);
                        },
                        children: "拒绝",
                      },
                    ]
                  : [
                      {
                        onClick: () => {
                          console.log("查看详情:", item);
                        },
                        children: "查看",
                      },
                    ],
            },
          ]}
        />
      </Space>
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- 分组表头与排序
- 展示分组表头（groupHeader）功能，实现多级表头结构。演示 sort 排序功能（单列排序、多列排序）和 onSortChange 排序变更回调。同时展示 disableColItem 禁用 ColItem 包装，实现自定义编辑组件。业务场景：销售数据报表。
- _Table(@components/Table),_Global(@components/Global),reactFetch(@kne/react-fetch),antd(antd)

```jsx
const { default: Table } = _Table;
const { PureGlobal } = _Global;
const { preset } = reactFetch;
const { Input } = antd;

const ajax = (config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: { code: 0, data: "{}" },
      });
    }, 100);
  });
};

preset({ ajax });

const ValueEdit = ({ value, targetRender }) => {
  const [isEdit, setIsEdit] = React.useState(false);
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
          style={{ width: 150 }}
        />
      ) : (
        targetRender(value)
      )}
    </span>
  );
};

const BaseExample = () => {
  return (
    <PureGlobal preset={{ ajax }}>
      <Table
        name="sales-report"
        controllerOpen={true}
        dataSource={[
          {
            id: "SALE001",
            region: "华北区",
            province: "北京",
            city: "北京",
            productName: "企业版SaaS",
            productCode: "SAAS-ENT",
            salesAmount: 1250000.0,
            salesVolume: 50,
            growthRate: 23.5,
            marketShare: 18.2,
            customerCount: 128,
            newCustomerCount: 32,
            repurchaseRate: 85.5,
            avgOrderValue: 9765.6,
            targetCompletion: 92.5,
          },
          {
            id: "SALE002",
            region: "华北区",
            province: "天津",
            city: "天津",
            productName: "专业版SaaS",
            productCode: "SAAS-PRO",
            salesAmount: 890000.0,
            salesVolume: 120,
            growthRate: 15.8,
            marketShare: 12.5,
            customerCount: 95,
            newCustomerCount: 18,
            repurchaseRate: 78.2,
            avgOrderValue: 7416.7,
            targetCompletion: 88.3,
          },
          {
            id: "SALE003",
            region: "华东区",
            province: "上海",
            city: "上海",
            productName: "企业版SaaS",
            productCode: "SAAS-ENT",
            salesAmount: 1680000.0,
            salesVolume: 68,
            growthRate: 35.2,
            marketShare: 22.8,
            customerCount: 156,
            newCustomerCount: 45,
            repurchaseRate: 88.6,
            avgOrderValue: 24705.9,
            targetCompletion: 105.2,
          },
          {
            id: "SALE004",
            region: "华东区",
            province: "浙江",
            city: "杭州",
            productName: "专业版SaaS",
            productCode: "SAAS-PRO",
            salesAmount: 980000.0,
            salesVolume: 95,
            growthRate: 28.6,
            marketShare: 16.3,
            customerCount: 112,
            newCustomerCount: 28,
            repurchaseRate: 82.4,
            avgOrderValue: 10315.8,
            targetCompletion: 95.8,
          },
          {
            id: "SALE005",
            region: "华南区",
            province: "广东",
            city: "深圳",
            productName: "企业版SaaS",
            productCode: "SAAS-ENT",
            salesAmount: 1420000.0,
            salesVolume: 58,
            growthRate: 19.3,
            marketShare: 19.6,
            customerCount: 138,
            newCustomerCount: 35,
            repurchaseRate: 86.2,
            avgOrderValue: 24482.8,
            targetCompletion: 89.5,
          },
        ]}
        columns={[
          {
            name: "region",
            title: "大区",
            type: "other",
            width: 100,
            groupHeader: [
              { name: "area", title: "区域信息" },
            ],
          },
          {
            name: "province",
            title: "省份",
            type: "other",
            width: 100,
            groupHeader: [
              { name: "area", title: "区域信息" },
            ],
          },
          {
            name: "city",
            title: "城市",
            type: "other",
            width: 100,
            groupHeader: [
              { name: "area", title: "区域信息" },
            ],
          },
          {
            name: "productName",
            title: "产品名称",
            type: "mainInfo",
            width: 150,
            groupHeader: [
              { name: "product", title: "产品信息" },
            ],
          },
          {
            name: "productCode",
            title: "产品编码",
            type: "serialNumber",
            width: 150,
            groupHeader: [
              { name: "product", title: "产品信息" },
            ],
          },
          {
            name: "salesAmount",
            title: "销售金额",
            type: "other",
            width: 150,
            sort: { single: true },
            render: ({ target }) => ({
              children: &#96;¥${(target.salesAmount / 10000).toFixed(2)}万&#96;,
            }),
            groupHeader: [
              { name: "sales", title: "销售业绩" },
            ],
          },
          {
            name: "salesVolume",
            title: "销售数量",
            type: "singleRow",
            width: 120,
            sort: true,
            groupHeader: [
              { name: "sales", title: "销售业绩" },
            ],
          },
          {
            name: "growthRate",
            title: "增长率",
            type: "singleRow",
            width: 120,
            sort: true,
            render: ({ target }) => ({
              children: &#96;${target.growthRate}%&#96;,
              style: {
                color: target.growthRate > 20 ? "#52c41a" : target.growthRate > 10 ? "#1890ff" : "#faad14",
              },
            }),
            groupHeader: [
              { name: "sales", title: "销售业绩" },
            ],
          },
          {
            name: "marketShare",
            title: "市场份额",
            type: "singleRow",
            width: 120,
            sort: true,
            render: ({ target }) => ({
              children: &#96;${target.marketShare}%&#96;,
            }),
            groupHeader: [
              { name: "market", title: "市场分析" },
            ],
          },
          {
            name: "customerCount",
            title: "客户总数",
            type: "singleRow",
            width: 120,
            sort: true,
            groupHeader: [
              { name: "market", title: "市场分析" },
            ],
          },
          {
            name: "newCustomerCount",
            title: "新增客户",
            type: "singleRow",
            width: 120,
            sort: true,
            groupHeader: [
              { name: "market", title: "市场分析" },
            ],
          },
          {
            name: "repurchaseRate",
            title: "复购率",
            type: "singleRow",
            width: 120,
            sort: true,
            render: ({ target }) => ({
              children: &#96;${target.repurchaseRate}%&#96;,
            }),
            groupHeader: [
              { name: "customer", title: "客户指标" },
            ],
          },
          {
            name: "avgOrderValue",
            title: "客单价",
            type: "other",
            width: 130,
            sort: true,
            render: ({ target }) => ({
              children: &#96;¥${target.avgOrderValue.toFixed(2)}&#96;,
            }),
            groupHeader: [
              { name: "customer", title: "客户指标" },
            ],
          },
          {
            name: "targetCompletion",
            title: "目标完成率",
            type: "singleRow",
            width: 140,
            sort: true,
            render: ({ target }) => ({
              children: &#96;${target.targetCompletion}%&#96;,
              style: {
                color: target.targetCompletion >= 100 ? "#52c41a" : target.targetCompletion >= 90 ? "#1890ff" : "#faad14",
              },
            }),
            groupHeader: [
              { name: "target", title: "目标达成" },
            ],
          },
          {
            name: "editableField",
            title: "备注",
            type: "other",
            width: 150,
            disableColItem: true,
            valueOf: (item, { targetRender }) => (
              <ValueEdit value="点击编辑备注" targetRender={targetRender} />
            ),
            groupHeader: [
              { name: "target", title: "目标达成" },
            ],
          },
          {
            name: "options",
            title: "操作",
            type: "options",
            fixed: "right",
            width: 150,
            valueOf: (item) => [
              {
                onClick: () => {
                  console.log("查看详情:", item.city);
                },
                children: "查看详情",
              },
              {
                onClick: () => {
                  console.log("生成报告:", item.city);
                },
                children: "生成报告",
              },
            ],
          },
        ]}
        onSortChange={(sort) => {
          console.log("排序变更:", sort);
        }}
        onTablePropsReady={({ columns, dataSource }) => {
          console.log("表格就绪:", { columns, dataSource });
        }}
      />
    </PureGlobal>
  );
};

render(<BaseExample />);

```

### API

### Table 组件
| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| columns | 列配置 | array | - |
| className | 自定义类名 | string | - |
| getScrollEl | 获取滚动容器 | function | getScrollElDefault |
| sticky | 是否固定表头 | boolean | false |
| stickyOffset | 固定表头偏移量 | string | "var(--nav-height)" |
| pagination | 分页配置 | boolean/object | false |
| columnRenderProps | 列渲染属性 | object | {} |
| rowKey | 行key | string/function | "id" |
| dataSource | 数据源 | array | - |
| controllerOpen | 是否开启列控制 | boolean | true |
| name | 表格名称（用于存储配置） | string | - |
| summary | 总结栏 | function | - |
| scroll | 滚动配置 | object | - |
| scroller | 滚动器配置 | object | - |
| onTablePropsReady | 表格属性就绪回调 | function | - |

### TablePage 组件
| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| loader | 数据加载函数 | function | - |
| featureId | 功能ID（用于权限控制） | string | - |
| pagination | 分页配置 | object | {open: true, ...} |
| name | 表格名称 | string | - |
| dataFormat | 数据格式化函数 | function | (data) => ({list, total}) |
| className | 自定义类名 | string | - |
| columnRenderProps | 列渲染属性 | object | {} |
| summary | 总结栏 | function | - |
| sticky | 是否固定表头 | boolean | true |
| columns | 列配置 | array/function | - |
| getColumns | 获取列配置的函数 | function | - |

### useSelectedRow Hook
| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| options.rowKey | 行key | string/function | 'id' |
| selectedRowKeys | 选中行的keys | array | [] |
| onSelectAll | 全选回调 | function | - |
| onSelect | 单选回调 | function | - |
| setSelectedRowKeys | 设置选中行 | function | - |

### 列配置（Column）
| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| name | 列名称（唯一标识） | string | - |
| title | 列标题 | string | - |
| type | 列类型 | string | 'other' |
| width | 列宽度 | number | - |
| min | 最小宽度 | number | - |
| max | 最大宽度 | number | - |
| hidden | 是否隐藏 | boolean | false |
| fixed | 固定列 | 'left'/'right' | - |
| primary | 是否为主要字段 | boolean | false |
| hover | 是否显示hover效果 | boolean | false |
| ellipsis | 是否省略 | boolean/object | false |
| sort | 是否支持排序 | boolean/object | false |
| valueOf | 值转换函数 | function | - |
| render | 自定义渲染函数 | function | - |
| groupHeader | 分组表头配置 | array | - |
| disableColItem | 是否禁用ColItem包装 | boolean | false |

### 列类型（Type）
| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| date | 日期（YYYY-MM-DD） | width: 160, min: 120, max: 400 |
| dateShort | 短日期（YYYY-MM） | width: 120, min: 100, max: 400 |
| dateRange | 日期范围 | width: 240, min: 120, max: 400 |
| datetime | 日期时间 | width: 190, min: 190, max: 400 |
| serialNumber | 编号 | width: 190, min: 100, max: 400 |
| serialNumberShort | 短编号 | width: 120, min: 100, max: 400 |
| user | 用户 | width: 200, min: 120, max: 400 |
| userName | 用户名 | width: 100, min: 100, max: 400 |
| contacts | 联系人 | width: 240, min: 160, max: 400 |
| tag | 标签 | width: 140, min: 100, max: 400 |
| avatar | 头像 | width: 80, min: 64, max: 200 |
| singleRow | 单行文本 | width: 70, min: 70, max: 400 |
| hideInfo | 隐藏信息 | width: 120, min: 80, max: 400 |
| mainInfo | 主要信息 | width: 300, min: 160, max: 500 |
| description | 描述 | width: 400, min: 160, max: 600 |
| options | 操作列 | width: 180, min: 120, max: 400 |
| sensitiveInfo | 敏感信息 | width: 200, min: 100, max: 400 |
| other | 其他 | width: 200, min: 120, max: 400 |
| otherSmall | 其他（小） | width: 100, min: 70, max: 400 |
| otherLarge | 其他（大） | width: 300, min: 120, max: 500 |
