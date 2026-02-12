const { useDrawer } = _Drawer;
const { Button, Space, Typography, Descriptions, Timeline, Card } = _antd;
const {default: Global} = _Global;

const SizesExample = () => {
  const drawer = useDrawer();

  const content1 = (
    <Descriptions column={1} bordered>
      <Descriptions.Item label="项目名称">OA系统</Descriptions.Item>
      <Descriptions.Item label="负责人">张三</Descriptions.Item>
      <Descriptions.Item label="开始时间">2024-01-01</Descriptions.Item>
      <Descriptions.Item label="状态">进行中</Descriptions.Item>
      <Descriptions.Item label="进度">60%</Descriptions.Item>
    </Descriptions>
  );

  const content2 = (
    <div>
      <Typography.Paragraph>
        <strong>项目概述：</strong>
        这是一个企业办公自动化系统，提供包括审批流程、日程管理、文档协作等功能。
      </Typography.Paragraph>
      <Descriptions column={2} bordered style={{ marginTop: 16 }}>
        <Descriptions.Item label="项目经理">李四</Descriptions.Item>
        <Descriptions.Item label="技术负责人">王五</Descriptions.Item>
        <Descriptions.Item label="开发周期">6个月</Descriptions.Item>
        <Descriptions.Item label="团队规模">12人</Descriptions.Item>
        <Descriptions.Item label="预算">50万</Descriptions.Item>
        <Descriptions.Item label="截止时间">2024-06-30</Descriptions.Item>
      </Descriptions>
      <Typography.Title level={5} style={{ marginTop: 24 }}>
        项目里程碑
      </Typography.Title>
      <Timeline
        items={[
          {
            children: "需求分析与设计完成",
            color: "green",
          },
          {
            children: "前端框架搭建完成",
            color: "green",
          },
          {
            children: "后端接口开发进行中",
            color: "blue",
          },
          {
            children: "系统联调测试",
            color: "gray",
          },
          {
            children: "上线部署",
            color: "gray",
          },
        ]}
      />
    </div>
  );

  const content3 = (
    <div>
      <Card title="项目基本信息" style={{ marginBottom: 16 }}>
        <Descriptions column={3} bordered>
          <Descriptions.Item label="项目名称">电商平台重构</Descriptions.Item>
          <Descriptions.Item label="项目编号">PRJ-2024-001</Descriptions.Item>
          <Descriptions.Item label="项目类型">重构升级</Descriptions.Item>
          <Descriptions.Item label="负责人">赵六</Descriptions.Item>
          <Descriptions.Item label="开发团队">技术部</Descriptions.Item>
          <Descriptions.Item label="优先级">P0</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="团队成员" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {[
            { name: "张三", role: "技术负责人", count: 8 },
            { name: "李四", role: "前端组长", count: 12 },
            { name: "王五", role: "后端组长", count: 15 },
            { name: "赵六", role: "测试负责人", count: 6 },
            { name: "钱七", role: "UI设计师", count: 3 },
          ].map((member) => (
            <div key={member.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
              <span><strong>{member.name}</strong> - {member.role}</span>
              <span>{member.count} 人</span>
            </div>
          ))}
        </Space>
      </Card>

      <Card title="技术架构">
        <Space wrap>
          {["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "Redis", "Docker", "Kubernetes"].map((tech) => (
            <span key={tech} style={{ padding: '4px 12px', background: '#e6f7ff', borderRadius: '4px', color: '#1890ff' }}>
              {tech}
            </span>
          ))}
        </Space>
      </Card>

      <Card title="开发计划" style={{ marginTop: 16 }}>
        <Timeline
          items={[
            {
              children: <><strong>第一阶段（1-2月）：</strong>技术调研与架构设计</>,
              color: "green",
            },
            {
              children: <><strong>第二阶段（3-4月）：</strong>核心功能开发</>,
              color: "green",
            },
            {
              children: <><strong>第三阶段（5月）：</strong>联调测试与优化</>,
              color: "blue",
            },
            {
              children: <><strong>第四阶段（6月）：</strong>灰度发布与上线</>,
              color: "gray",
            },
          ]}
        />
      </Card>
    </div>
  );

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text strong>选择不同尺寸的抽屉</Typography.Text>
      <Button
        onClick={() => {
          drawer({
            title: "Small 尺寸",
            size: "small",
            children: content1,
          });
        }}
      >
        Small (600px)
      </Button>
      <Button
        onClick={() => {
          drawer({
            title: "Default 尺寸",
            size: "default",
            children: content2,
          });
        }}
      >
        Default (1000px)
      </Button>
      <Button
        onClick={() => {
          drawer({
            title: "Large 尺寸",
            size: "large",
            children: content3,
          });
        }}
      >
        Large (全屏-64px)
      </Button>
    </Space>
  );
};

render(<Global><SizesExample /></Global>);
