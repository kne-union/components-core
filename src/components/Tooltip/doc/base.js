const { default: Tooltip } = _Tooltip;
const { Space, Button, Tag, Typography } = antd;
const { Text } = Typography;

const BaseExample = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <div>
        <Text strong>基础用法 - 纯文本提示</Text>
        <Space style={{ marginTop: 12 }}>
          <Tooltip content="这是一段简单的提示文本，用于解释说明。">
            <Tag color="blue">简单提示</Tag>
          </Tooltip>
          <Tooltip content="审批流程需要经过部门主管、财务部门、总经理三级审批，整个流程预计需要3-5个工作日完成。">
            <Tag color="green">流程说明</Tag>
          </Tooltip>
        </Space>
      </div>

      <div>
        <Text strong>带标题的提示</Text>
        <Space style={{ marginTop: 12 }}>
          <Tooltip
            title="数据统计规则"
            content="统计范围：2024年1月1日至当前日期的所有有效订单数据。"
          >
            <Tag color="purple">销售额统计</Tag>
          </Tooltip>
          <Tooltip
            title="权限说明"
            content="仅系统管理员和部门主管可以查看完整的员工薪资信息，普通用户只能看到薪资范围。"
          >
            <Tag color="orange">薪资权限</Tag>
          </Tooltip>
        </Space>
      </div>

      <div>
        <Text strong>带副标题的提示</Text>
        <Space style={{ marginTop: 12 }}>
          <Tooltip
            title="候选人推荐指数"
            subtitle="计算规则："
            content="根据候选人的面试评分、项目经验、技能匹配度、薪资期望等多个维度综合计算得出。"
          >
            <Tag color="cyan">推荐算法</Tag>
          </Tooltip>
        </Space>
      </div>

      <div>
        <Text strong>点击触发</Text>
        <Space style={{ marginTop: 12 }}>
          <Tooltip
            trigger="click"
            title="操作指南"
            content='点击"编辑"按钮可以修改订单信息，点击"取消"按钮可以撤销订单，点击"导出"按钮可以导出订单详情。'
          >
            <Button size="small">查看操作说明</Button>
          </Tooltip>
        </Space>
      </div>

      <div>
        <Text strong>自定义位置</Text>
        <Space style={{ marginTop: 12 }}>
          <Tooltip placement="top" content="顶部提示 Top">
            <Button size="small">Top</Button>
          </Tooltip>
          <Tooltip placement="bottom" content="底部提示 Bottom">
            <Button size="small">Bottom</Button>
          </Tooltip>
          <Tooltip placement="left" content="左侧提示 Left">
            <Button size="small">Left</Button>
          </Tooltip>
          <Tooltip placement="right" content="右侧提示 Right">
            <Button size="small">Right</Button>
          </Tooltip>
        </Space>
      </div>
    </Space>
  );
};

render(<BaseExample />);
