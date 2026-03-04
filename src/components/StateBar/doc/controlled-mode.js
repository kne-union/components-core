const { default: StateBar } = _StateBar;
const { Button, Card, Space, Tag } = antd;
const { useState } = React;

const ControlledModeExample = () => {
  const [activeKey, setActiveKey] = useState("1");
  
  const stateOption = [
    { key: "1", tab: "待处理" },
    { key: "2", tab: "处理中" },
    { key: "3", tab: "待审核" },
    { key: "4", tab: "已完成" },
    { key: "5", tab: "已拒绝" },
  ];
  
  const statusData = {
    "1": { count: 15, color: "orange", description: "等待处理的工单" },
    "2": { count: 8, color: "blue", description: "正在处理的工单" },
    "3": { count: 5, color: "purple", description: "等待审核的工单" },
    "4": { count: 128, color: "green", description: "已完成的工单" },
    "5": { count: 3, color: "red", description: "已拒绝的工单" },
  };

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title="工单状态管理" style={{ width: "100%" }}>
        <StateBar
          type="tab"
          activeKey={activeKey}
          stateOption={stateOption}
          onChange={handleTabChange}
          tabBarExtraContent={
            <Button type="primary" size="small">
              新建工单
            </Button>
          }
        />
        
        <Card style={{ marginTop: 20 }}>
          <Space direction="vertical" size="middle">
            <div>
              <Tag color={statusData[activeKey].color}>
                {stateOption.find(item => item.key === activeKey)?.tab}
              </Tag>
              <span style={{ marginLeft: 8 }}>数量: {statusData[activeKey].count} 个</span>
            </div>
            <div>
              <strong>状态描述:</strong> {statusData[activeKey].description}
            </div>
            <div>
              <strong>当前选中:</strong> {activeKey}
            </div>
          </Space>
        </Card>
      </Card>
      
      <Card title="快速切换" style={{ width: "100%" }}>
        <Space wrap>
          {stateOption.map(item => (
            <Button
              key={item.key}
              onClick={() => setActiveKey(item.key)}
              type={activeKey === item.key ? "primary" : "default"}
            >
              切换到: {item.tab}
            </Button>
          ))}
        </Space>
      </Card>
    </Space>
  );
};

render(<ControlledModeExample />);
