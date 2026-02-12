# Features

### 概述

Features 是一个功能开关管理组件，用于在系统中通过条件控制功能的开启或关闭，实现系统功能的灵活配置。

通过全局配置的方式，Features 组件可以统一管理系统功能的可见性和可访问性，避免在代码中散落大量判断逻辑。它支持基于依赖关系的智能判断，只有当功能及其依赖项都满足条件时才会被标记为可用状态。同时，该组件还支持为功能的开启和关闭状态传递不同的配置参数，实现更精细的交互控制。

核心特性：
- **集中配置管理**：通过 Global preset 统一声明，避免判断语句散落在代码各处
- **依赖关系支持**：智能判断功能是否可用，只有满足所有依赖条件才开启
- **双状态参数**：可为开启和关闭状态分别配置不同的参数（options/rejectedOptions）
- **调试模式**：提供 debug 模式方便开发时查看功能状态和真实 ID
- **嵌套功能管理**：支持 system/module/feature 三级结构，通过冒号连接完整 ID

适用于企业级管理系统、SaaS 平台、多租户应用等需要精细化功能控制的场景。

### 示例(全屏)

#### 示例代码

- 基础用法 - 依赖关系控制功能开关
- 展示如何通过依赖关系控制功能模块的开启与关闭，批量导入功能依赖编辑模块
- _Features(@components/Features),global(@components/Global),layout(@components/Layout)

```jsx
const { default: Features } = _Features;
const { default: Layout, PermissionsPage } = layout;
const { PureGlobal } = global;

const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        features: {
          debug: true,
          profile: {
            id: "hr-system",
            type: "system",
            name: "人力资源管理系统",
            children: [
              {
                id: "employee",
                type: "module",
                name: "员工管理",
                children: [
                  {
                    id: "import",
                    type: "feature",
                    name: "批量导入",
                    dependencies: ["hr-system:employee:edit"],
                  },
                  {
                    id: "export",
                    type: "feature",
                    name: "数据导出",
                  },
                ],
              },
              {
                id: "attendance",
                type: "module",
                name: "考勤管理",
                children: [
                  {
                    id: "check-in",
                    type: "feature",
                    name: "签到打卡",
                  },
                ],
              },
              {
                id: "edit",
                type: "module",
                name: "编辑模块",
              },
            ],
          },
        },
      }}
    >
      <Layout navigation={{ isFixed: false }}>
        <PermissionsPage name="employee" openFeatures>
          <Features id="import">
            <div>
              <h3>批量导入员工数据</h3>
              <p>支持 Excel 文件批量导入，一次性添加多名员工</p>
            </div>
          </Features>
          <Features id="export">
            <div>
              <h3>导出员工数据</h3>
              <p>导出员工列表到 Excel，支持自定义筛选条件</p>
            </div>
          </Features>
          <Features id="analytics">
            <div>
              <h3>数据分析</h3>
              <p>统计分析员工数据，生成可视化报表</p>
            </div>
          </Features>
        </PermissionsPage>
      </Layout>
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- 页面级功能控制
- 展示如何在多页面应用中使用 Features 控制不同页面的功能模块，销售趋势图、客户增长图等功能展示
- _Features(@components/Features),global(@components/Global),layout(@components/Layout),Router(react-router-dom)

```jsx
const {default: Features} = _Features;
const {default: Layout, PermissionsPage} = layout;
const {PureGlobal} = global;
const {Route, Routes} = Router;

const ModuleExample = () => {
    return (<PureGlobal
            preset={{
                features: {
                    debug: true, profile: {
                        id: "crm-system", type: "system", name: "客户关系管理系统", children: [{
                            id: "dashboard", type: "module", name: "数据看板", children: [{
                                id: "sales-chart", type: "feature", name: "销售趋势图",
                            }, {
                                id: "customer-chart", type: "feature", name: "客户增长图",
                            },],
                        }, {
                            id: "customer", type: "module", name: "客户管理", children: [{
                                id: "advanced-filter",
                                type: "feature",
                                name: "高级筛选",
                                dependencies: ["crm-system:dashboard"],
                            },],
                        },],
                    },
                },
            }}
        >
            <Layout
                navigation={{
                    isFixed: false, showIndex: false, base: '/Features', list: [{
                        key: "dashboard", title: "数据看板", path: "/Features",
                    }, {
                        key: "customer", title: "客户管理", path: "/Features/customer",
                    },],
                }}
            >
                <Routes>
                    <Route
                        path="/Features"
                        element={<PermissionsPage name="dashboard" openFeatures>
                            <div>
                                <h2>数据看板</h2>
                                <div style={{
                                    padding: '16px',
                                    marginBottom: '16px',
                                    border: '1px solid #d9d9d9',
                                    borderRadius: '4px'
                                }}>
                                    <Features id="sales-chart">
                                        <h3>销售趋势分析</h3>
                                        <p>展示最近30天销售数据变化趋势</p>
                                    </Features>
                                </div>
                                <div style={{padding: '16px', border: '1px solid #d9d9d9', borderRadius: '4px'}}>
                                    <Features id="customer-chart">
                                        <h3>客户增长分析</h3>
                                        <p>展示客户数量变化趋势</p>
                                    </Features>
                                </div>
                            </div>
                        </PermissionsPage>}
                    />
                    <Route
                        path="/Features/customer"
                        element={<PermissionsPage name="customer" openFeatures>
                            <div>
                                <h2>客户管理</h2>
                                <div style={{padding: '16px', border: '1px solid #d9d9d9', borderRadius: '4px'}}>
                                    <Features id="advanced-filter">
                                        <h3>高级筛选功能</h3>
                                        <p>支持多维度组合筛选客户数据</p>
                                    </Features>
                                </div>
                            </div>
                        </PermissionsPage>}
                    />
                </Routes>
            </Layout>
        </PureGlobal>);
};

render(<ModuleExample/>);

```

- 动态参数传递
- 展示如何根据功能开启/关闭状态传递不同的配置参数（options/rejectedOptions），薪资可见性和绩效考核功能
- _Features(@components/Features),global(@components/Global),layout(@components/Layout),antd(antd)

```jsx
const { default: Features } = _Features;
const { default: Layout, PermissionsPage } = layout;
const { PureGlobal } = global;
const { useState } = React;
const { Button, Space, Card, Tag, Alert } = antd;

const OptionsExample = () => {
  const [featureEnabled, setFeatureEnabled] = useState(true);

  return (
    <PureGlobal
      preset={{
        features: {
          debug: true,
          profile: {
            id: "hr-system",
            type: "system",
            name: "人力资源系统",
            children: [
              {
                id: "employee",
                type: "module",
                name: "员工管理",
                children: [
                  {
                    id: "salary-visibility",
                    type: "feature",
                    name: "薪资可见性",
                    options: {
                      permission: "full",
                      canEdit: true,
                      maxViewLevel: "all"
                    },
                    rejectedOptions: {
                      permission: "limited",
                      canEdit: false,
                      maxViewLevel: "self"
                    },
                    close: !featureEnabled,
                  },
                  {
                    id: "performance",
                    type: "feature",
                    name: "绩效考核",
                    options: {
                      scoreRange: "0-100",
                      hasReview: true,
                      allowAppeal: true
                    },
                    rejectedOptions: {
                      scoreRange: "0-10",
                      hasReview: false,
                      allowAppeal: false
                    }
                  }
                ],
              },
            ],
          },
        },
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card>
          <Button
            type="primary"
            onClick={() => {
              setFeatureEnabled((value) => !value);
            }}
          >
            {featureEnabled ? "关闭薪资功能" : "开启薪资功能"}
          </Button>
          <p style={{ marginTop: 12 }}>
            点击按钮切换薪资可见性功能，观察不同状态下传递的参数变化
          </p>
        </Card>

        <Layout navigation={{ isFixed: false }}>
          <PermissionsPage name="employee" openFeatures>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Card title="薪资可见性功能" size="small">
                <Features id="salary-visibility">
                  {({ isPass, options }) => (
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Alert
                        message={isPass ? "功能已开启" : "功能已关闭"}
                        type={isPass ? "success" : "warning"}
                        showIcon
                      />
                      <div>
                        <strong>权限级别：</strong>
                        <Tag color={isPass ? "green" : "orange"}>
                          {options.permission}
                        </Tag>
                      </div>
                      <div>
                        <strong>编辑权限：</strong>
                        <Tag color={options.canEdit ? "blue" : "default"}>
                          {options.canEdit ? "允许编辑" : "只读"}
                        </Tag>
                      </div>
                      <div>
                        <strong>查看范围：</strong>
                        <Tag>{options.maxViewLevel}</Tag>
                      </div>
                    </Space>
                  )}
                </Features>
              </Card>

              <Card title="绩效考核功能" size="small">
                <Features id="performance">
                  {({ isPass, options }) => (
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Alert
                        message={isPass ? "功能已开启" : "功能已关闭"}
                        type="success"
                        showIcon
                      />
                      <div>
                        <strong>评分范围：</strong>
                        <Tag>{options.scoreRange}</Tag>
                      </div>
                      <div>
                        <strong>绩效复核：</strong>
                        <Tag color={options.hasReview ? "blue" : "default"}>
                          {options.hasReview ? "启用" : "禁用"}
                        </Tag>
                      </div>
                      <div>
                        <strong>申诉功能：</strong>
                        <Tag color={options.allowAppeal ? "blue" : "default"}>
                          {options.allowAppeal ? "允许" : "禁止"}
                        </Tag>
                      </div>
                    </Space>
                  )}
                </Features>
              </Card>
            </Space>
          </PermissionsPage>
        </Layout>
      </Space>
    </PureGlobal>
  );
};

render(<OptionsExample />);

```

### API

### Features 组件

Features 是一个功能开关组件，用于根据配置控制子组件的显示或隐藏。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | 功能标识符，对应 preset.features.profile 中定义的 id | string | 是 | - |
| children | 子内容，可以是 JSX 或函数。为函数时接收 {isPass, options, currentId} 参数 | ReactNode \| Function | 是 | - |

#### children 函数参数

当 children 为函数时，接收的参数对象包含以下属性：

| 参数名 | 说明 | 类型 |
|--------|------|------|
| isPass | 功能是否通过（开启） | boolean |
| options | 开启或关闭状态对应的配置参数 | any |
| currentId | 当前功能的完整 ID（包含父级路径） | string |

### features 配置

features 配置在 Global preset 中定义。

#### features 配置属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| debug | 是否开启调试模式，开启后会在控制台打印所有功能的 ID 和判断状态 | boolean | 否 | false |
| profile | 功能配置树结构 | object | 是 | - |

### profile 配置结构

profile 采用树形结构配置系统的功能模块。

#### profile 节点属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | 当前节点的标识符，同级节点中需唯一，完整 ID 由父级 ID 和当前 ID 通过冒号连接 | string | 是 | - |
| type | 节点类型，可选值为：system（系统根节点）、module（功能模块）、feature（具体功能） | string | 是 | - |
| name | 节点中文名称，仅用于标识和说明 | string | 否 | - |
| close | 是否强制关闭该功能。true 表示关闭，false 或不配置表示开启（存在该节点配置时） | boolean | 否 | false |
| dependencies | 依赖的功能列表，数组中的 ID 必须是完整的功能 ID。只有所有依赖功能都开启时，当前功能才会被标记为开启 | array\<string\> | 否 | - |
| options | 功能开启时传递给 children 的参数 | any | 否 | - |
| rejectedOptions | 功能关闭时传递给 children 的参数 | any | 否 | - |
| children | 子功能节点数组 | array\<object\> | 否 | - |

#### 功能判断规则

1. 功能开启条件：profile 中存在该节点配置，且 close 不为 true，且所有 dependencies 依赖的功能都已开启
2. 功能关闭条件：profile 中不存在该节点配置，或 close 为 true，或存在依赖项功能关闭
3. 根节点 type 必须为 system