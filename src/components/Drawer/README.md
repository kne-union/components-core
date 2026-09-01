# Drawer

### 概述

#### Drawer

基于 `@kne/react-modal` 的侧滑组件。提供 Drawer / useDrawer / DrawerContextHolder / createDrawerRender。

已移除 AppDrawer、DrawerButton；命令式请用 Button + useDrawer。


### 示例

#### 示例代码

- 基础用法
- 展示 Drawer 受控组件与 Hook 调用
- _Drawer(@components/Drawer),_Global(@components/Global),_antd(antd)

```jsx
const { default: Drawer, useDrawer } = _Drawer;
const { Button, Space, Typography, Descriptions, Avatar, Tag } = _antd;
const { useState } = React;
const {PureGlobal} = _Global;

const BasicExample = () => {
  const [open, setOpen] = useState(false);
  const drawer = useDrawer();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text strong>方式一：受控组件</Typography.Text>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开详情抽屉
      </Button>
      <Drawer
        title="用户信息"
        open={open}
        onClose={() => setOpen(false)}
        width={600}
      >
        <Descriptions column={1} bordered>
          <Descriptions.Item label="姓名">张三</Descriptions.Item>
          <Descriptions.Item label="部门">技术部</Descriptions.Item>
          <Descriptions.Item label="职位">高级前端工程师</Descriptions.Item>
          <Descriptions.Item label="邮箱">zhangsan@example.com</Descriptions.Item>
        </Descriptions>
      </Drawer>

      <Typography.Text strong>方式二：Hook调用</Typography.Text>
      <Button
        onClick={() => {
          drawer({
            title: "项目信息",
            children: (
              <div>
                <Typography.Paragraph>项目名称：电商平台</Typography.Paragraph>
                <Typography.Paragraph>项目负责人：李四</Typography.Paragraph>
                <Typography.Paragraph>开发周期：6个月</Typography.Paragraph>
                <Typography.Paragraph>团队成员：12人</Typography.Paragraph>
              </div>
            ),
          });
        }}
      >
        使用Hook打开
      </Button>
    </Space>
  );
};

render(<PureGlobal><BasicExample /></PureGlobal>);

```

- 表单编辑
- 在 Drawer 中展示表单进行编辑，支持确认和取消操作
- _Drawer(@components/Drawer),_FormInfo(@components/FormInfo),_Global(@components/Global),_antd(antd)

```jsx
const { useFormDrawer, default: FormInfo } = _FormInfo;
const { Button, Space, Typography, message } = _antd;
const { PureGlobal } = _Global;

const FormDrawerExample = () => {
  const formDrawer = useFormDrawer();
  const { Input } = FormInfo.fields;

  const handleEdit = (userData) => {
    formDrawer({
      title: "编辑员工信息",
      size: "small",
      formProps: {
        data: userData,
        onSubmit: async (data) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          message.success(&#96;已更新员工信息：${data.name}&#96;);
        },
      },
      children: (
        <FormInfo
          column={1}
          list={[
            <Input name="name" label="姓名" rule="REQ" tips="请输入员工姓名" />,
            <Input name="department" label="部门" rule="REQ" tips="请输入部门" />,
            <Input name="position" label="职位" rule="REQ" tips="请输入职位名称" />,
            <Input name="email" label="邮箱" rule="REQ EMAIL" />,
          ]}
        />
      ),
    });
  };

  return (
    <Space direction="vertical">
      <Typography.Text strong>useFormDrawer 打开表单抽屉</Typography.Text>
      <Button
        type="primary"
        onClick={() =>
          handleEdit({
            name: "张三",
            department: "技术部",
            position: "前端工程师",
            email: "zhangsan@example.com",
          })
        }
      >
        编辑员工
      </Button>
    </Space>
  );
};

render(
  <PureGlobal>
    <FormDrawerExample />
  </PureGlobal>
);

```

- 不同尺寸
- 展示 small、default、large 三种不同尺寸的 Drawer
- _Drawer(@components/Drawer),_Global(@components/Global),_antd(antd)

```jsx
const { useDrawer } = _Drawer;
const { Button, Space, Typography, Descriptions, Timeline, Card } = _antd;
const {PureGlobal} = _Global;

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

render(<PureGlobal><SizesExample /></PureGlobal>);

```

- 自定义操作
- 自定义底部按钮，支持异步操作
- _Drawer(@components/Drawer),_Global(@components/Global),_antd(antd)

```jsx
const { useDrawer } = _Drawer;
const { Button, Space, Typography, message } = _antd;
const { PureGlobal } = _Global;

const CustomActionsExample = () => {
  const drawer = useDrawer();

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Typography.Text strong>自定义底部按钮和额外操作</Typography.Text>
      <Button
        onClick={() => {
          drawer({
            title: "自定义按钮",
            size: "small",
            children: (
              <div>
                <Typography.Paragraph>这个示例展示了如何自定义底部按钮。</Typography.Paragraph>
                <Typography.Paragraph>自定义了三个按钮：预览、取消、保存。</Typography.Paragraph>
              </div>
            ),
            footerButtons: [
              {
                children: "预览",
                onClick: () => {
                  message.info("预览功能");
                },
                autoClose: false,
              },
              {
                children: "取消",
              },
              {
                type: "primary",
                children: "保存",
                onClick: async () => {
                  await new Promise((r) => setTimeout(r, 500));
                  message.success("保存成功");
                },
              },
            ],
          });
        }}
      >
        打开自定义按钮抽屉
      </Button>
    </Space>
  );
};

render(
  <PureGlobal>
    <CustomActionsExample />
  </PureGlobal>
);

```

### API

#### Drawer API

基于 `@kne/react-modal`。

##### 导出

| 名称 | 说明 |
|------|------|
| `Drawer` | 声明式侧滑 |
| `useDrawer` | 命令式打开（需先挂载 `DrawerContextHolder`） |
| `DrawerContextHolder` | 挂在 antd `App` 内，承载命令式 Drawer |
| `createDrawerRender` | 对接 `renderModal` 宿主（FormDrawer） |

##### Global

`Global` 已内置 `<DrawerContextHolder />`，业务侧一般无需再包。

已移除：`AppDrawer`、`DrawerButton`。
