# Layout

### 概述

Layout 是一个完整的页面布局框架，为登录后的系统页面提供统一的布局结构和样式规范。它将页面划分为多个区域，包括导航区、内容区、左菜单区、右操作区、页头区、页头信息区、页面标题区等，通过灵活的配置可以组合出不同布局风格的页面。

**核心特性**

- **统一布局**：提供标准化的页面布局结构，确保系统页面风格统一
- **灵活配置**：通过 Page 组件的参数配置不同区域的显示和样式
- **性能优化**：页面参数通过 Context 保存，页面跳转时非页面区域走更新周期而非挂载周期，提升渲染速度
- **区域划分**：支持导航区、内容区、左菜单区、右操作区、页头区、页头信息区、页面标题区等多种区域
- **权限集成**：内置权限判断，支持 PermissionsPage 快速实现权限控制
- **组件丰富**：提供 Page、Menu、PageHeader、TablePage、StateBarPage 等多个子组件满足不同需求

**适用场景**

- **基础页面**：简单的上下布局，导航栏+内容区
- **左侧菜单页**：带有左侧导航菜单的页面，支持多级菜单
- **筛选列表页**：顶部带筛选器的列表页面
- **详情页**：带有页面头和额外信息的详情页面
- **表格页**：快速集成 Table 组件的列表页面
- **状态栏页**：带有状态栏的状态展示页面

**重要说明**

- Page 组件的 `name` 参数必须传递，用于页面跳转时判断是否为同一页面，决定是否走挂载周期
- 请尽量通过 Page 提供的参数配置页面布局，避免自定义 CSS，以便 Layout 组件统一控制页面形式和样式
- Page 组件参数通过 Context 保存，页面跳转时非页面区域会走更新周期，提升性能

### 示例(全屏)

#### 示例样式

```scss
.layout-content {
  color: #fff;
  background: var(--primary-color-4);
  height: 100%;
  text-align: center;
  line-height: 300px;
}

.with-title-layout-content {
  height: 100%;
  //height: calc(100% - 49px);
}

.layout-menu {
  background: #ff9c6e;
  color: #fff;
  height: 110vh;
  text-align: center;
  line-height: 300px;
}

.header {
  background: #ff9c6e;
  height: 100px;
  padding: 10px;
  color: #fff;
}

.right-options {
  background: var(--primary-color-4);
  height: 110vh;
  color: #fff;
}

.header-info {
  padding: 10px;
  height: 100px;
  background: var(--primary-color-4);
  color: #fff;
}
```

#### 示例代码

- 基础上下布局
- 展示最基础的上导航栏，下内容的布局
- _Layout(@components/Layout),global(@components/Global)

```jsx
const { default: Layout, Page } = _Layout;
const { PureGlobal } = global;
const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        enums: {
          helperGuide: () => [
            {
              value: "base-detail",
              content: "测试帮助文档",
              url: "/",
            },
          ],
        },
      }}
    >
      <Layout navigation={{ isFixed: false }}>
        <Page name="base" helperGuideName="base-detail">
          <div className="layout-content">内容区</div>
        </Page>
      </Layout>
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- 带有左侧菜单布局
- 展示带有左侧菜单布局
- layout(@components/Layout),antd(antd),global(@components/Global)

```jsx
const { default: Layout, Page, Menu } = layout;
const { Button, Space } = antd;
const { PureGlobal } = global;

const Example = () => {
  return (
    <Layout navigation={{ isFixed: false }}>
      <Page
        name="left-menu"
        menuFixed={false}
        menu={
          <Menu
            items={[
              {
                label: "父级标题1",
                key: "p-0",
                iconType: "icon-zhanghaodenglu",
                children: [
                  {
                    label: "子标题1",
                    key: "s-0",
                    path: "/link1",
                  },
                  {
                    label: "子标题2",
                    key: "s-1",
                    path: "/link2",
                  },
                ],
              },
              {
                label: "父级标题2",
                key: "p-1",
                iconType: "icon-zhanghaodenglu",
                children: [
                  {
                    label: "子标题1",
                    key: "s-2",
                    path: "/link3",
                  },
                  {
                    label: "子标题2",
                    key: "s-3",
                    path: "/link4",
                  },
                ],
              },
              {
                label: "父级标题3",
                key: "p-2",
                iconType: "icon-zhanghaodenglu",
                path: "/link5",
              },
            ]}
          />
        }
        titleExtra={
          <Space>
            <Button type="primary">新建</Button>
          </Space>
        }
        backUrl={"/"}
        title="标题"
      >
        <div className="layout-content with-title-layout-content">内容区</div>
      </Page>
    </Layout>
  );
};

render(
  <PureGlobal>
    <Example />
  </PureGlobal>
);

```

- 左侧固定带Header
- 展示带有header的左侧固定菜单布局
- layout(@components/Layout),antd(antd),global(@components/Global)

```jsx
const { default: Layout, Page } = layout;
const { Button, Space } = antd;
const { PureGlobal } = global;

const Example = () => {
  return (
    <Space className="container" direction="vertical">
      <Layout navigation={{ isFixed: false }}>
        <Page
          name="with-header"
          helperGuideName="base-detail"
          menu={<div className="layout-menu">左侧菜单区</div>}
          titleExtra={
            <Space>
              <Button type="primary">新建</Button>
            </Space>
          }
          title="标题"
          hideCloseSvg={true}
          headerHeight="40px"
          menuFixed={false}
          header={<div className="header">header</div>}
          headerFixed={false}
          headerInfo={<div className="header-info">header info区域</div>}
        >
          <div>内容区</div>
        </Page>
      </Layout>
    </Space>
  );
};

render(
  <PureGlobal
    preset={{
      enums: {
        helperGuide: () => [
          {
            value: "base-detail",
            content: "测试帮助文档",
            url: "/",
          },
        ],
      },
    }}
  >
    <Example />
  </PureGlobal>
);

```

- 右侧固定
- 展示带有header的右侧固定菜单布局
- layout(@components/Layout),antd(antd),global(@components/Global)

```jsx
const { default: Layout, Page } = layout;
const { Button, Space } = antd;
const { PureGlobal } = global;

const Example = () => {
  return (
    <Layout navigation={{ isFixed: false }}>
      <Page
        name="fix-right-menu"
        optionFixed={false}
        option={<div className="right-options">右侧操作区域</div>}
        optionFooter={
          <Space>
            <Button type="primary">新建</Button>
          </Space>
        }
        titleExtra={
          <Space>
            <Button type="primary">新建</Button>
          </Space>
        }
        title="标题"
        header={<div className="header">header</div>}
        headerFixed={false}
        menuFixed={false}
      >
        <div>内容区</div>
      </Page>
    </Layout>
  );
};

render(
  <PureGlobal>
    <Example />
  </PureGlobal>
);

```

- 带有filter的列表页
- 展示带有filter的列表页
- layout(@components/Layout),antd(antd),global(@components/Global),filter(@components/Filter)

```jsx
const { default: Layout, Page } = layout;
const {
  InputFilterItem,
  CityFilterItem,
  AdvancedSelectFilterItem,
  UserFilterItem,
  FunctionSelectFilterItem,
  IndustrySelectFilterItem,
  getFilterValue,
} = filter;
const { useState } = React;
const { Space, Button } = antd;
const { PureGlobal } = global;
const BaseExample = () => {
  const [filter, setFilter] = useState([]);
  return (
    <PureGlobal preset={{}}>
      <Layout navigation={{ isFixed: false }}>
        <Page
          name="base"
          helperGuideName="base-detail"
          titleExtra={
            <Space>
              <Button type="primary">添加</Button>
            </Space>
          }
          filter={{
            extraExpand: (
              <Button type="primary" size="small">
                订阅筛选项
              </Button>
            ),
            value: filter,
            onChange: (value) => {
              setFilter(value);
              console.log(getFilterValue(value));
            },
            list: [
              [
                <InputFilterItem label="文字" name="text" />,
                <CityFilterItem label="城市" name="city" />,
                <AdvancedSelectFilterItem
                  label="高级选择"
                  name="select"
                  api={{
                    loader: () => {
                      return {
                        pageData: [
                          { label: "第一项", value: 1 },
                          { label: "第二项", value: 2, disabled: true },
                          {
                            label: "第三项",
                            value: 3,
                          },
                        ],
                      };
                    },
                  }}
                />,
                <UserFilterItem
                  label="用户选择"
                  name="user"
                  api={{
                    loader: () => {
                      return {
                        pageData: [
                          {
                            label: "用户一",
                            value: 1,
                            description: "我是用户描述",
                          },
                          {
                            label: "用户二",
                            value: 2,
                            description: "我是用户描述",
                          },
                          {
                            label: "用户三",
                            value: 3,
                            description: "我是用户描述",
                          },
                        ],
                      };
                    },
                  }}
                />,
                <FunctionSelectFilterItem
                  label="职能选择"
                  name="function"
                  onlyAllowLastLevel
                  single
                />,
                <IndustrySelectFilterItem
                  label="行业选择"
                  name="industry"
                  onlyAllowLastLevel
                />,
              ],
              [
                <UserFilterItem
                  label="职位协助人"
                  name="position_user"
                  api={{
                    loader: () => {
                      return {
                        pageData: [
                          {
                            label: "用户一",
                            value: 1,
                            description: "我是用户描述",
                          },
                          {
                            label: "用户二",
                            value: 2,
                            description: "我是用户描述",
                          },
                          {
                            label: "用户三",
                            value: 3,
                            description: "我是用户描述",
                          },
                        ],
                      };
                    },
                  }}
                />,
              ],
            ],
          }}
        >
          <div className="layout-content">内容区</div>
        </Page>
      </Layout>
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- 左侧导航菜单
- 展示一个左侧导航菜单
- layout(@components/Layout),antd(antd)

```jsx
const { Menu } = layout;
const { Space } = antd;
const { useState } = React;

const ControlMenu = () => {
  const [current, setCurrent] = useState();
  return (
    <Menu
      currentKey={current}
      onChange={setCurrent}
      items={[
        {
          label: "父级标题1",
          key: "p-0",
          iconType: "icon-zhanghaodenglu",
          children: [
            {
              label: "子标题1",
              key: "s-0",
            },
            {
              label: "子标题2",
              key: "s-1",
            },
          ],
        },
        {
          label: "父级标题2",
          key: "p-1",
          iconType: "icon-zhanghaodenglu",
          children: [
            {
              label: "子标题1",
              key: "s-2",
            },
            {
              label: "子标题2",
              key: "s-3",
            },
          ],
        },
        {
          label: "父级标题3",
          key: "p-2",
          iconType: "icon-zhanghaodenglu",
        },
      ]}
    />
  );
};

const Example = () => {
  return (
    <Space size={10}>
      <Menu
        items={[
          {
            label: "父级标题1",
            key: "p-0",
            iconType: "icon-zhanghaodenglu",
            children: [
              {
                label: "子标题1",
                key: "s-0",
                path: "/link1",
              },
              {
                label: "子标题2",
                key: "s-1",
                path: "/link2",
              },
            ],
          },
          {
            label: "父级标题2",
            key: "p-1",
            iconType: "icon-zhanghaodenglu",
            children: [
              {
                label: "子标题1",
                key: "s-2",
                path: "/link3",
              },
              {
                label: "子标题2",
                key: "s-3",
                path: "/link4",
              },
            ],
          },
          {
            label: "父级标题3",
            key: "p-2",
            iconType: "icon-zhanghaodenglu",
            path: "/link5",
          },
        ]}
      />
      <Menu
        items={[
          {
            iconType: "icon-zhanghaodenglu",
            label: "子标题1",
            key: "s-0",
            path: "/link1",
          },
          {
            iconType: "icon-zhanghaodenglu",
            label: "子标题2",
            key: "s-1",
            path: "/link2",
          },
          {
            iconType: "icon-zhanghaodenglu",
            label: "子标题1",
            key: "s-2",
            path: "/link3",
          },
          {
            iconType: "icon-zhanghaodenglu",
            label: "子标题2",
            key: "s-3",
            path: "/link4",
          },
        ]}
      />
      <Menu
        allowCollapsed={false}
        items={[
          {
            label: "父级标题1",
            key: "p-0",
            iconType: "icon-zhanghaodenglu",
            children: [
              {
                label: "子标题1",
                key: "s-0",
                path: "/link1",
              },
              {
                label: "子标题2",
                key: "s-1",
                path: "/link2",
              },
            ],
          },
          {
            label: "父级标题2",
            key: "p-1",
            iconType: "icon-zhanghaodenglu",
            children: [
              {
                label: "子标题1",
                key: "s-2",
                path: "/link3",
              },
              {
                label: "子标题2",
                key: "s-3",
                path: "/link4",
              },
            ],
          },
          {
            label: "父级标题3",
            key: "p-2",
            iconType: "icon-zhanghaodenglu",
            path: "/link5",
          },
        ]}
      />
      <ControlMenu />
    </Space>
  );
};

render(<Example />);

```

- PageHeader
- 页面头
- layout(@components/Layout),antd(antd)

```jsx
const { default: Layout, Page, Menu, PageHeader } = layout;

const Example = () => {
  return (
    <Layout navigation={{ isFixed: false }}>
      <Page
        menu={<div className="layout-menu">左侧菜单区</div>}
        title="标题"
        hideCloseSvg={true}
        menuFixed={false}
        name="pageHeaderLayout"
        header={
          <PageHeader
            iconType="icon-color-shenpi-biaoti"
            title="详情页名称"
            info="编号:85767"
            options={[
              {
                children: "新建",
              },
              {
                children: "操作1",
              },
              {
                children: "操作2",
              },
              {
                children: "操作3",
              },
              {
                children: "操作4",
              },
            ]}
            tags={["辅助信息", "辅助信息", "辅助信息", "辅助信息"]}
          />
        }
        headerFixed={false}
      >
        <div>内容区</div>
      </Page>
    </Layout>
  );
};

render(<Example />);

```

- Affix 固定布局
- 展示 Affix 组件的固定布局功能
- _Layout(@components/Layout),antd(antd)

```jsx
const { default: Layout, Affix } = _Layout;
const { Space, Card, Button, Typography } = antd;

const { Text } = Typography;

const AffixExample = () => {
  const [fixed, setFixed] = React.useState(false);

  return (
    <Layout navigation={{ isFixed: false }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card title="Affix 固定布局组件" size="small">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>固定到顶部（offsetTop: 100）：</Text>
              <div style={{ marginTop: 16 }}>
                <Affix offsetTop={100} onChange={(fixed) => setFixed(fixed)}>
                  <div style={{
                    background: 'var(--primary-color)',
                    color: 'white',
                    padding: '16px 24px',
                    borderRadius: '4px',
                    textAlign: 'center',
                    width: '200px'
                  }}>
                    我会在距离顶部 100px 时固定
                    {fixed && ' (已固定)'}
                  </div>
                </Affix>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <Text strong>不固定（isFixed: false）：</Text>
              <div style={{ marginTop: 16 }}>
                <Affix isFixed={false}>
                  <div style={{
                    background: 'var(--state-warning-color)',
                    color: 'white',
                    padding: '16px 24px',
                    borderRadius: '4px',
                    textAlign: 'center',
                    width: '200px'
                  }}>
                    我不会被固定
                  </div>
                </Affix>
              </div>
            </div>
          </Space>
        </Card>

        <Card title="说明" size="small">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text type="secondary">
              Affix 组件用于控制内容的固定布局行为，基于 Antd 的 Affix 组件进行了封装。
            </Text>
            <Text type="secondary">
              当 isFixed 为 true 时，内容会在滚动到指定位置后固定显示；
              当 isFixed 为 false 时，内容固定行为被禁用。
            </Text>
          </Space>
        </Card>

        <div style={{ height: 800 }}>
          <Text type="secondary">（向下滚动查看 Affix 固定效果）</Text>
        </div>
      </Space>
    </Layout>
  );
};

render(<AffixExample />);

```

- TablePage 表格页面
- 展示 TablePage 组件快速创建表格列表页
- _Layout(@components/Layout),global(@components/Global),antd(antd)

```jsx
const {default: Layout, TablePage} = _Layout;
const {PureGlobal} = global;
const {Button} = antd;

const TablePageExample = () => {
    const columns = [{
        title: '订单号', name: 'orderNo'
    }, {
        title: '客户姓名', name: 'customerName'
    }, {
        title: '金额', name: 'amount', render: (amount) => &#96;¥${amount.toLocaleString()}&#96;
    }, {
        title: '状态', name: 'status'
    }, {
        title: '创建时间', name: 'createTime'
    }];

    return (<PureGlobal preset={{
        enums: {
            helperGuide: () => [{
                value: 'order-list-help',
                content: '这是一个订单列表页面，可以查看和管理所有订单信息。',
                url: 'https://example.com/help/order-list'
            }]
        }
    }}>
        <Layout navigation={{isFixed: false}}>
            <TablePage
                name="order-list"
                helperGuideName="order-list-help"
                page={{
                    title: '订单列表', titleExtra: <Button type="primary">新建订单</Button>
                }}
                columns={columns}
                loader={() => {
                    return {
                        pageData: [{
                            key: '1',
                            orderNo: 'ORD202401001',
                            customerName: '张三',
                            amount: 1200.00,
                            status: '已完成',
                            createTime: '2024-01-15 10:30:00'
                        }, {
                            key: '2',
                            orderNo: 'ORD202401002',
                            customerName: '李四',
                            amount: 3500.00,
                            status: '处理中',
                            createTime: '2024-01-15 11:20:00'
                        }, {
                            key: '3',
                            orderNo: 'ORD202401003',
                            customerName: '王五',
                            amount: 890.00,
                            status: '待处理',
                            createTime: '2024-01-15 14:45:00'
                        }], total: 3
                    };
                }}
                topArea={(tableData) => (<div style={{padding: '16px', background: '#fafafa', marginBottom: '16px'}}>
                    <div>数据统计：共 {tableData?.pageData?.length || 0} 条记录</div>
                </div>)}
            />
        </Layout>
    </PureGlobal>);
};

render(<TablePageExample/>);

```

- StateBarPage 状态栏页面
- 展示 StateBarPage 组件创建带状态栏的页面
- _Layout(@components/Layout),global(@components/Global),antd(antd)

```jsx
const { default: Layout, StateBarPage } = _Layout;
const { PureGlobal } = global;
const { Card, Descriptions, Button, Space, Typography } = antd;

const { Text } = Typography;

const StateBarPageExample = () => {
  return (
    <PureGlobal preset={{}}>
      <Layout navigation={{ isFixed: false }}>
        <StateBarPage
          name="order-detail"
          helperGuideName="order-detail-help"
          page={{
            title: '订单详情',
            titleExtra: (
              <Space>
                <Button>编辑</Button>
                <Button type="primary">导出</Button>
              </Space>
            )
          }}
          stateBar={{
            list: [
              {
                label: '全部',
                value: 'all',
                count: 100
              },
              {
                label: '待处理',
                value: 'pending',
                count: 25
              },
              {
                label: '处理中',
                value: 'processing',
                count: 30
              },
              {
                label: '已完成',
                value: 'completed',
                count: 40
              },
              {
                label: '已取消',
                value: 'cancelled',
                count: 5
              }
            ],
            onChange: (value) => {
              console.log('状态切换：', value);
            }
          }}
        >
          <Card title="订单信息" size="small">
            <Descriptions column={2} bordered>
              <Descriptions.Item label="订单号">ORD202401001</Descriptions.Item>
              <Descriptions.Item label="客户姓名">张三</Descriptions.Item>
              <Descriptions.Item label="订单金额">¥1,200.00</Descriptions.Item>
              <Descriptions.Item label="创建时间">2024-01-15 10:30:00</Descriptions.Item>
              <Descriptions.Item label="收货地址" span={2}>
                北京市朝阳区某某街道123号
              </Descriptions.Item>
              <Descriptions.Item label="订单备注" span={2}>
                用户要求尽快发货
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </StateBarPage>
      </Layout>
    </PureGlobal>
  );
};

render(<StateBarPageExample />);

```

- PermissionsPage 权限页面
- 展示 PermissionsPage 组件的权限控制功能
- _Layout(@components/Layout),global(@components/Global),antd(antd)

```jsx
const { default: Layout, PermissionsPage } = _Layout;
const { PureGlobal } = global;
const { Card, Button, Space, Typography, Alert } = antd;

const { Text } = Typography;

const PermissionsPageExample = () => {
  return (
    <PureGlobal
      preset={{
        permissions: ['order:view', 'order:edit', 'order:delete']
      }}
    >
      <Layout navigation={{ isFixed: false }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Card title="有权限访问的页面" size="small">
            <PermissionsPage
              name="order-detail-with-perm"
              permissions={{
                permissions: ['order:view']
              }}
              page={{
                title: '订单详情（有权限）'
              }}
            >
              <Alert
                message="您有权限访问此页面"
                description="当前用户拥有 order:view 权限，可以查看订单详情"
                type="success"
                showIcon
                style={{ marginBottom: 16 }}
              />
              <Card size="small">
                <Text>这里是订单详情内容</Text>
              </Card>
            </PermissionsPage>
          </Card>

          <Card title="无权限访问的页面" size="small">
            <PermissionsPage
              name="order-edit-without-perm"
              permissions={{
                permissions: ['order:edit:advanced']
              }}
              page={{
                title: '订单编辑（无权限）'
              }}
            >
              <Alert
                message="您不会看到这个内容"
                description="因为当前用户没有 order:edit:advanced 权限"
                type="info"
                showIcon
              />
              <Card size="small">
                <Text>这里不会显示，因为缺少权限</Text>
              </Card>
            </PermissionsPage>
          </Card>

          <Card title="说明" size="small">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text type="secondary">
                PermissionsPage 组件在 Page 的基础上增加了权限判断功能。
              </Text>
              <Text type="secondary">
                如果用户没有所需权限，会显示错误提示页面，不会渲染页面内容。
              </Text>
              <Text type="secondary">
                权限通过 preset.permissions 配置，组件内部会自动检查是否拥有所需权限。
              </Text>
            </Space>
          </Card>
        </Space>
      </Layout>
    </PureGlobal>
  );
};

render(<PermissionsPageExample />);

```

### API

### Layout

Layout 组件是页面布局的容器组件，包裹所有页面内容并提供统一的布局结构。

#### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| navigation | object | 否 | {} | 导航参数，参考 Navigation 组件参数 |
| children | ReactNode | 是 | - | 子组件，一般放置 Page 组件 |
| className | string | 否 | - | 自定义类名 |
| theme | object | 否 | - | 主题样式配置 |

### Page

| 属性名             | 说明                                                                  | 类型         | 默认值   |
|-----------------|--------------------------------------------------------------------|------------|-------|
| menu            | 左菜单区内容                                                              | jsx        | -     |
| filter          | 页面标题位置筛选器参数,参考 Filter 组件参数                                          | object     | -     |
| menuOpen        | 左菜单是否默认打开                                                           | boolean    | true  |
| menuWidth       | 左菜单宽度                                                               | string     | 240px |
| menuFixed       | 左菜单是否fixed布局                                                        | boolean    | true  |
| menuCloseButton | 控制左菜单显示隐藏的按钮是否显示                                                    | boolean    | true  |
| header          | 页头区内容                                                               | jsx        | -     |
| headerFixed     | 页头区是否fixed布局                                                        | boolean    | true  |
| headerInfo      | 页头信息区内容                                                             | jsx        | -     |
| backUrl         | 右侧内容区的标题前展示返回按钮，并返回到该url                                   | 参考 useNavigate     | -       |
| title           | 页面标题                                                                | string,jsx | -     |
| titleExtra      | 页面标题区右侧位置内容                                                         | jsx        | -     |
| titleLeftExtra  | 页面标题区左侧位置内容                                                         | jsx        | -     |
| noMargin        | 页面内容区是否去掉Margin                                                     | boolean    | false |
| noPadding       | 页面内容区是否去掉Padding                                                    | boolean    | false |
| option          | 右操作区内容                                                              | jsx        | -     |
| optionWidth     | 右操作区宽度                                                              | string     | 400px |
| optionNoPadding | 右操作区是否去掉Padding                                                     | boolean    | false |
| optionFixed     | 右操作区是否fixed布局                                                       | boolean    | false |
| optionFooter    | 右操作区底部内容                                                            | jsx        | -     |
| openFeatures    | Page是否启用Features，启用时如果配置文件中没有该模块id则判断为模块关闭，会将name作为Features的id进行设置  | boolean    | false |

### Affix

可以控制其中的内容是否是fixed布局

| 属性名          | 说明               | 类型       | 默认值  |
|--------------|------------------|----------|------|
| isFixed      | 内容是否fixed布局      | boolean  | true |
| offsetTop    | 距离窗口顶部达到指定偏移量后触发 | number   | 0    |
| offsetBottom | 距离窗口底部达到指定偏移量后触发 | number   | -    |
| onChange     | 固定状态改变时触发的回调函数   | function | -    |

### Menu

显示一个菜单，最多支持两级，支持第一级展开收起，支持路径匹配自动高亮

| 属性名              | 说明                                                          | 类型            | 默认值  |
|------------------|-------------------------------------------------------------|---------------|------|
| items            | 菜单项                                                         | array[object] | []   |
| items[].label    | 菜单项显示内容                                                     | jsx           | -    |
| items[].key      | 菜单项的key要求必须唯一                                               | string        | -    |
| items[].iconType | 菜单项前面的icon类型参考 Icon组件的type参数                                | string        | -    |
| items[].path     | 菜单项的路径                                                      | string        | -    |
| items[].onClick  | 菜单项点击触发事件，注意：如果菜单项已经传入path参数则该参数不生效                         | function      | -    |
| items[].children | 菜单项的第二级项列表，参考items参数。注意该组件只支持两级菜单，所以该参数内部的菜单项不再支持children参数 | array[object] | -    |
| currentKey       | 当前被选中的菜单项的key，如果菜单项又path参数，不需要传递该参数，组件会根据路由自动判断选中项          | string        | -    |
| onChange         | currentKey产生修改时触发函数，注意：如果菜单项已经传入path参数则该参数不生效               | function      | -    |
| allowCollapsed   | 是否允许一级菜单收起                                                  | boolean       | true |
| defaultOpenKeys   | 初始展开的 SubMenu 菜单项 key 数组                                                  | string[]      | -    |

### PermissionsPage

加入权限判断的 Page 组件，错误类型默认为 error，即在该页面没有权限时显示错误。

#### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| permissions | object | 否 | - | 权限配置，参考 Permissions 组件参数 |
| name | string | 是 | - | 页面名称，必填 |
| openFeatures | boolean | 否 | false | 是否启用 Features 功能特性 |

注意：PermissionsPage 继承了 Page 的所有属性。

### TablePage

快速集成 Table 组件的列表页面，内置了权限控制和帮助文档支持。

#### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| helperGuideName | string | 否 | - | 帮助文档的名称 |
| permissions | object | 否 | - | 权限配置，参考 Permissions 组件参数 |
| page | object | 否 | - | Page 组件的配置参数 |
| openFeatures | boolean | 否 | false | 是否启用 Features 功能特性 |
| name | string | 是 | - | 页面名称，必填 |
| topArea | ReactNode \| function | 否 | - | 顶部额外内容区，可以是组件或函数（接收 tableData 参数） |

注意：除了以上属性，TablePage 还支持 Table 组件的所有属性（如 columns、api、pagination 等）。

### StateBarPage

带有状态栏的状态展示页面，内置了权限控制和帮助文档支持。

#### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| helperGuideName | string | 否 | - | 帮助文档的名称 |
| permissions | object | 否 | - | 权限配置，参考 Permissions 组件参数 |
| page | object | 否 | - | Page 组件的配置参数 |
| stateBar | object | 否 | - | StateBar 组件的配置参数 |
| children | ReactNode | 否 | - | 页面内容区 |

注意：除了以上属性，StateBarPage 还继承了 Page 的所有属性。