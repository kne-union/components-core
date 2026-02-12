const { DrawerButton } = _Drawer;
const { Card, Avatar, Typography, Tag, Space, Divider, Descriptions, Timeline } = _antd;
const { range } = lodash;
const {default: Global} = _Global;

const UserDetailExample = () => {
  const mockUserData = {
    id: 1,
    name: "张三",
    avatar: { src: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhang" },
    role: "高级前端工程师",
    department: "技术部-前端组",
    email: "zhangsan@company.com",
    phone: "138****8888",
    joinDate: "2020-03-15",
    skills: ["React", "Vue", "TypeScript", "Node.js"],
    projects: [
      { name: "电商平台重构", role: "负责人", status: "进行中", date: "2024-01" },
      { name: "OA系统开发", role: "核心开发", status: "已完成", date: "2023-08" },
      { name: "数据大屏", role: "参与", status: "已完成", date: "2023-03" },
    ],
    performance: [
      { quarter: "2024 Q1", score: 95, comment: "工作表现优异，项目交付及时" },
      { quarter: "2023 Q4", score: 92, comment: "技术能力强，团队协作好" },
      { quarter: "2023 Q3", score: 88, comment: "稳步提升，建议加强文档能力" },
    ],
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <DrawerButton
        type="primary"
        api={{
          loader: () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(mockUserData);
              }, 800);
            });
          },
        }}
        modalProps={(contextProps) => {
          const { data } = contextProps;
          return {
            title: "员工档案详情",
            size: "large",
            children: (
              <div>
                <Card style={{ marginBottom: 16 }}>
                  <Space align="start" size="large">
                    <Avatar size={80} src={data.avatar.src} />
                    <Space direction="vertical" size={4}>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        {data.name}
                      </Typography.Title>
                      <Space>
                        <Tag color="blue">{data.role}</Tag>
                        <Tag color="green">{data.department}</Tag>
                      </Space>
                      <Typography.Text type="secondary">
                        入职时间：{data.joinDate}
                      </Typography.Text>
                    </Space>
                  </Space>
                </Card>

                <Descriptions title="基本信息" column={2} bordered style={{ marginBottom: 16 }}>
                  <Descriptions.Item label="工号">EMP{String(data.id).padStart(4, '0')}</Descriptions.Item>
                  <Descriptions.Item label="姓名">{data.name}</Descriptions.Item>
                  <Descriptions.Item label="部门">{data.department}</Descriptions.Item>
                  <Descriptions.Item label="职位">{data.role}</Descriptions.Item>
                  <Descriptions.Item label="邮箱">{data.email}</Descriptions.Item>
                  <Descriptions.Item label="电话">{data.phone}</Descriptions.Item>
                </Descriptions>

                <Typography.Title level={5}>技术栈</Typography.Title>
                <Space wrap style={{ marginBottom: 16 }}>
                  {data.skills.map((skill) => (
                    <Tag key={skill} color="processing">{skill}</Tag>
                  ))}
                </Space>

                <Typography.Title level={5}>项目经历</Typography.Title>
                <Card size="small" style={{ marginBottom: 16 }}>
                  {data.projects.map((project, index) => (
                    <div key={index}>
                      <Space>
                        <Typography.Text strong>{project.name}</Typography.Text>
                        <Tag color={project.status === "进行中" ? "processing" : "success"}>
                          {project.status}
                        </Tag>
                      </Space>
                      <Typography.Text type="secondary" style={{ marginLeft: 16 }}>
                        {project.role} · {project.date}
                      </Typography.Text>
                      {index < data.projects.length - 1 && <Divider style={{ margin: "8px 0" }} />}
                    </div>
                  ))}
                </Card>

                <Typography.Title level={5}>绩效考核</Typography.Title>
                <Timeline
                  items={data.performance.map((item) => ({
                    children: (
                      <Space direction="vertical" size={2}>
                        <Space>
                          <Typography.Text strong>{item.quarter}</Typography.Text>
                          <Tag color={item.score >= 90 ? "success" : "warning"}>
                            {item.score}分
                          </Tag>
                        </Space>
                        <Typography.Text type="secondary">{item.comment}</Typography.Text>
                      </Space>
                    ),
                  }))}
                />
              </div>
            ),
          };
        }}
      >
        查看员工档案
      </DrawerButton>
    </Space>
  );
};

render(<Global><UserDetailExample /></Global>);
