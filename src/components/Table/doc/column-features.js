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
                children: `${target.progress}%`,
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
                return `¥${(item.budget / 10000).toFixed(1)}万`;
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
                message: `确定要删除项目 ${item.projectName} 吗？`,
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
