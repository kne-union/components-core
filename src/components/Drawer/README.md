# Drawer

### 概述

屏幕边缘滑出的浮层面板，适用于展示详细信息、表单编辑、数据查看等场景。支持三种使用方式：受控组件、Hook 调用、按钮触发。

核心特性包括：
- **灵活的打开方式**：支持受控模式、函数调用和按钮触发三种方式
- **多种尺寸规格**：提供 small（600px）、default（1000px）、large（全屏-64px）三种预设尺寸
- **丰富的自定义能力**：支持自定义底部按钮、装饰器修饰、异步操作等
- **数据加载集成**：DrawerButton 组件结合数据加载，自动在加载完成后打开抽屉
- **优雅的交互体验**：内置滚动条美化、加载状态支持、异步操作反馈

适用于用户详情查看、表单编辑、信息展示、操作确认等多种业务场景。


### 示例

#### 示例代码

- 基础用法
- 展示 Drawer 组件的三种使用方式：受控组件、Hook调用、按钮触发
- _Drawer(@components/Drawer),_Global(@components/Global),_antd(antd)

```jsx
const { default: Drawer, useDrawer, DrawerButton } = _Drawer;
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

- 用户详情
- 使用 DrawerButton 加载数据后展示用户详细信息，模拟真实业务场景
- _Drawer(@components/Drawer),_Global(@components/Global),_antd(antd),lodash(lodash)

```jsx
const { DrawerButton } = _Drawer;
const { Card, Avatar, Typography, Tag, Space, Divider, Descriptions, Timeline } = _antd;
const { range } = lodash;
const {PureGlobal} = _Global;

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

render(<PureGlobal><UserDetailExample /></PureGlobal>);

```

- 表单编辑
- 在 Drawer 中展示表单进行编辑，支持确认和取消操作
- _Drawer(@components/Drawer),_FormInfo(@components/FormInfo),_Global(@components/Global),_antd(antd)

```jsx
const {useFormDrawer, FormDrawerButton, default: FormInfo} = _FormInfo;
const {Button, Space, Typography, message, Divider} = _antd;
const {PureGlobal} = _Global;

const FormDrawerExample = () => {
    const formDrawer = useFormDrawer();
    const {Form} = FormInfo;
    const {Input} = FormInfo.fields;

    const handleEdit = (userData) => {
        formDrawer({
            title: "编辑员工信息", size: "small", formProps: {
                data: userData, onSubmit: async (data) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    message.success(&#96;已更新员工信息：${data.name}&#96;);
                }
            }, children: (<FormInfo
                column={1}
                list={[<Input
                    name="name"
                    label="姓名"
                    rule="REQ"
                    tips="请输入员工姓名"
                />, <Input
                    name="department"
                    label="部门"
                    rule="REQ"
                    options={[{label: "技术部", value: "tech"}, {
                        label: "产品部",
                        value: "product"
                    }, {label: "设计部", value: "design"}, {label: "市场部", value: "marketing"}]}
                    single
                    tips="请选择所属部门"
                />, <Input
                    name="position"
                    label="职位"
                    rule="REQ"
                    tips="请输入职位名称"
                />, <Input
                    name="email"
                    label="邮箱"
                    rule="REQ EMAIL"
                    tips="请输入有效的邮箱地址"
                />, <Input
                    name="phone"
                    label="电话"
                    rule="REQ TEL"
                    tips="请输入有效的手机号码"
                />]}
            />)
        });
    };

    return (<Space direction="vertical" style={{width: '100%'}}>
        <Typography.Text strong>使用 useFormDrawer 编辑员工信息</Typography.Text>
        <Typography.Text type="secondary" style={{fontSize: 12}}>
            FormDrawer 结合了 Drawer 和 FormInfo 的功能，提供了更便捷的表单抽屉体验，支持校验规则和自动数据加载
        </Typography.Text>

        <Divider/>

        <Button
            type="primary"
            onClick={() => {
                handleEdit({
                    name: "张三",
                    department: "tech",
                    position: "高级前端工程师",
                    email: "zhangsan@example.com",
                    phone: "13888888888",
                });
            }}
        >
            编辑员工信息
        </Button>
        <Button
            onClick={() => {
                handleEdit({
                    name: "李四",
                    department: "product",
                    position: "产品经理",
                    email: "lisi@example.com",
                    phone: "13999999999",
                });
            }}
        >
            编辑另一位员工
        </Button>
    </Space>);
};

render(<PureGlobal><FormDrawerExample/></PureGlobal>);

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
- 自定义底部按钮、添加额外功能按钮，支持异步操作
- _Drawer(@components/Drawer),_Global(@components/Global),_antd(antd)

```jsx
const { useDrawer, DrawerButton } = _Drawer;
const { Button, Space, Typography, message, Popconfirm, Tag, Descriptions } = _antd;
const {PureGlobal} = _Global;

const CustomActionsExample = () => {
  const drawer = useDrawer();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
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
              },
              {
                children: "取消",
                onClick: () => {
                  message.info("已取消");
                },
              },
              {
                type: "primary",
                children: "保存",
                onClick: async () => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  message.success("保存成功！");
                  return true;
                },
              },
            ],
          });
        }}
      >
        自定义按钮示例
      </Button>

      <DrawerButton
        api={{
          loader: () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({
                  id: 1,
                  name: "张三",
                  role: "高级前端工程师",
                  department: "技术部",
                  status: "在职",
                  joinDate: "2020-03-15",
                });
              }, 500);
            });
          },
        }}
        modalProps={(contextProps) => {
          const { data } = contextProps;
          return {
            title: "员工档案操作",
            size: "small",
            children: (
              <Descriptions column={1} bordered>
                <Descriptions.Item label="姓名">{data.name}</Descriptions.Item>
                <Descriptions.Item label="职位">{data.role}</Descriptions.Item>
                <Descriptions.Item label="部门">{data.department}</Descriptions.Item>
                <Descriptions.Item label="状态">
                  <Tag color="green">{data.status}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="入职时间">{data.joinDate}</Descriptions.Item>
              </Descriptions>
            ),
            footerButtons: [
              {
                children: "查看详情",
                onClick: () => {
                  message.info("查看更多详情");
                },
              },
              {
                children: "导出档案",
                onClick: () => {
                  message.info("正在导出档案...");
                },
              },
              {
                children: "编辑",
                type: "default",
                onClick: () => {
                  message.info("打开编辑模式");
                },
              },
              {
                type: "primary",
                children: "确认",
                onClick: async () => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  message.success("操作成功！");
                  return true;
                },
              },
            ],
          };
        }}
      >
        加载数据并自定义操作
      </DrawerButton>

      <Button
        danger
        onClick={() => {
          drawer({
            title: "删除确认",
            size: "small",
            children: (
              <div>
                <Typography.Paragraph>
                  <Typography.Text type="warning">⚠️ 警告：</Typography.Text>
                  此操作将永久删除该员工档案，删除后无法恢复。
                </Typography.Paragraph>
                <Typography.Paragraph>是否继续删除？</Typography.Paragraph>
              </div>
            ),
            footerButtons: [
              {
                children: "取消",
                onClick: () => {
                  message.info("已取消删除");
                },
              },
              {
                danger: true,
                type: "primary",
                children: "确认删除",
                onClick: async () => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  message.success("已删除员工档案");
                  return true;
                },
              },
            ],
          });
        }}
      >
        危险操作示例
      </Button>
    </Space>
  );
};

render(<PureGlobal><CustomActionsExample /></PureGlobal>);

```

### API

### Drawer

屏幕边缘滑出的浮层面板，用于展示详细信息、表单编辑等场景。

#### 属性说明

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| title | 抽屉标题 | ReactNode | - |
| size | 抽屉尺寸，可选值：`small`(600px)、`default`(1000px)、`large`(calc(100vw-64px)) | string | `small` |
| children | 抽屉内容，可以是 JSX 或函数，函数时可接收 close 方法和 props | ReactNode \| function | - |
| footer | 抽屉底部内容，设为 null 且 footerButtons 未设置时不显示底部，函数时可接收 close 方法和 props | ReactNode \| function | - |
| footerButtons | 底部按钮配置数组，默认显示"取消"和"确定"按钮 | array | - |
| onConfirm | 点击确认按钮触发的回调，返回 Promise 时按钮显示 loading 状态，返回 false 时不关闭抽屉 | function | - |
| onCancel | 点击取消按钮触发的回调 | function | - |
| onClose | 抽屉关闭时的回调 | function | - |
| closable | 是否显示关闭按钮 | boolean | true |
| maskClosable | 点击蒙层是否允许关闭 | boolean | false |
| disabledScroller | 是否禁用滚动条美化 | boolean | false |
| withDecorator | 抽屉内容修饰器，可在内容外层添加装饰 | function | - |
| open | 受控模式下抽屉的显示状态 | boolean | - |
| width | 自定义抽屉宽度 | string \| number | - |

**注意**：其他未列出的属性可参考 Ant Design Drawer 组件

#### footerButtons 数组项说明

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| children | 按钮文字 | ReactNode | - |
| type | 按钮类型，参考 Ant Design Button | string | - |
| danger | 是否为危险按钮 | boolean | false |
| ButtonComponent | 自定义按钮组件 | Component | LoadingButton |
| onClick | 点击事件回调 | function | - |
| autoClose | 点击后是否自动关闭抽屉 | boolean | true |
| display | 是否显示该按钮 | boolean \| function | true |

### useDrawer

用于获取一个可以调用 Drawer 的 Hook 函数，配合 AppDrawer 使用。

#### 返回值

返回一个数组：`[drawer, DrawerContextHolder]`

- **drawer**: 函数，执行后可打开一个 Drawer，参数同 Drawer 组件属性
  - 返回对象包含 `destroy` 方法用于关闭 Drawer
  - 返回对象包含 `update` 方法用于更新 Drawer 配置

- **DrawerContextHolder**: 必须渲染在组件树中，用于承载 Drawer 实例

### DrawerButton

结合 FetchButton 功能的按钮组件，点击后加载数据，加载完成后自动打开 Drawer。

#### 属性说明

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| api | FetchButton 的 API 配置对象 | `{ loader: Function }` | - |
| modalProps | Drawer 属性配置，可以是对象或函数 | object \| function({ data, fetchApi, close }) | - |
| onError | 数据加载错误回调 | function | - |

**注意**：其他属性同 Ant Design Button 组件

#### modalProps 为函数时的参数说明

| 参数名 | 说明 | 类型 |
|--------|------|------|
| data | 加载的数据 | any |
| fetchApi | Fetch API 对象 | object |
| close | 关闭 Drawer 的方法 | function |

### AppDrawer

全局 Drawer 提供者组件，为内部使用 useDrawer 的组件提供上下文环境。

#### 使用方式

在应用最外层包裹 AppDrawer，即可在任意组件中使用 useDrawer：

```javascript
import { AppDrawer } from '@components/Drawer';

function App() {
  return (
    <AppDrawer>
      <YourAppContent />
    </AppDrawer>
  );
}
```
