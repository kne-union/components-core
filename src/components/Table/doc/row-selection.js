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
    message.success(`已批量审批 ${selectedRowKeys.length} 条记录`);
    setSelectedRowKeys([]);
  };

  const handleBatchReject = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("请先选择要拒绝的记录");
      return;
    }
    message.info(`已批量拒绝 ${selectedRowKeys.length} 条记录`);
    setSelectedRowKeys([]);
  };

  const handleBatchExport = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("请先选择要导出的记录");
      return;
    }
    message.info(`正在导出 ${selectedRowKeys.length} 条记录`);
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
                          message.success(`已通过 ${item.employeeName} 的请假申请`);
                        },
                        children: "通过",
                      },
                      {
                        onClick: () => {
                          message.info(`已拒绝 ${item.employeeName} 的请假申请`);
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
