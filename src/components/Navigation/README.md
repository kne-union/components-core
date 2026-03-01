# Navigation

### 概述

### 概述

Navigation 是一个基于 Ant Design Menu 组件的顶部导航栏组件，支持权限控制、响应式布局和自定义配置。适用于需要顶部导航的各种应用场景。

### 何时使用

系统的顶部导航，一级导航项偏左靠近 logo 放置，辅助菜单偏右放置。

### 特点

* 集成了Permissions权限判断，可以通过权限列表来判断导航项是否显示 
* 在屏幕显示不了全部的一级导航时可以自动将后面的导航项收起到更多下拉菜单里面
* 支持自定义导航项点击处理和路由跳转
* 自动更新页面标题，基于当前导航项配置

### 示例(全屏)

#### 示例样式

```scss
.fold-items{
  width: 600px;
}
```

#### 示例代码

- 基础导航
- 展示Navigation组件的基本用法，包括基础导航和权限控制
- _Navigation(@components/Navigation),global(@components/Global)

```jsx
const { default: Navigation } = _Navigation;
const { PureGlobal } = global;

const menuList = [
  {
    key: "client",
    title: "客户",
    path: "/client",
    permission: "client:client:look",
  },
  {
    key: "position",
    title: "职位",
    path: "/position",
    permission: "jd:job:look",
  },
  {
    key: "ats",
    title: "招聘流程",
    path: "/ats",
  },
  {
    key: "talent",
    title: "人才库",
    permission: "cv:cv:look",
    path: "/talent",
  },
  {
    key: "contract",
    title: "合同",
    permission: "contract:mgr:look",
    path: "/contract",
  },
  {
    key: "payment",
    title: "付款信息",
    permission: "payment:mgr:look",
    path: "/payment",
  },
  {
    key: "invoice-center",
    title: "开票",
    permission: "client:invoice:center",
    path: "/invoice-center",
  },
  {
    key: "invoice-manage",
    title: "发票管理",
    permission: "client:invoice:manager",
    path: "/invoice-manage",
  },
  {
    key: "setting",
    title: "设置",
    permission: (permissions) =>
      permissions.some(
        (x) =>
          [
            "system:permissions:mgr",
            "system:org:mgr",
            "system:user:mgr",
          ].indexOf(x) !== -1
      ),
    path: "/setting",
  },
];

render(
  <PureGlobal>
    <Navigation
      list={menuList}
      isFixed={false}
      permissions={[
        "client:client:look",
        "jd:job:look",
        "cv:cv:look",
        "contract:mgr:look",
        "payment:mgr:look",
        "client:invoice:center",
        "client:invoice:manager",
        "system:permissions:mgr",
      ]}
    />
  </PureGlobal>
);

```

- 导航功能特性
- 展示Navigation组件的各种功能特性，包括权限控制、自定义右侧选项、图标和标题
- _Navigation(@components/Navigation),global(@components/Global),antd(antd)

```jsx
const { default: Navigation } = _Navigation;
const { PureGlobal } = global;
const { Card, Space, Avatar, Button, Dropdown, Badge } = antd;
const { UserOutlined, SettingOutlined, BellOutlined, DownOutlined } = antd.icons;
const { useState } = React;

// 基础导航示例
const BasicNavigationExample = () => {
  const menuList = [
    {
      key: "dashboard",
      title: "仪表盘",
      path: "/dashboard",
    },
    {
      key: "products",
      title: "产品管理",
      path: "/products",
    },
    {
      key: "orders",
      title: "订单管理",
      path: "/orders",
    },
    {
      key: "customers",
      title: "客户管理",
      path: "/customers",
    },
  ];

  return (
    <Card title="基础导航" size="small">
      <Navigation
        list={menuList}
        isFixed={false}
      />
    </Card>
  );
};

// 带权限控制的导航示例
const PermissionNavigationExample = () => {
  const [userPermissions, setUserPermissions] = useState([
    "dashboard:view",
    "products:view",
    "orders:view"
  ]);
  
  const menuList = [
    {
      key: "dashboard",
      title: "仪表盘",
      path: "/dashboard",
      permission: "dashboard:view",
    },
    {
      key: "products",
      title: "产品管理",
      path: "/products",
      permission: "products:view",
    },
    {
      key: "orders",
      title: "订单管理",
      path: "/orders",
      permission: "orders:view",
    },
    {
      key: "customers",
      title: "客户管理",
      path: "/customers",
      permission: "customers:view",
    },
    {
      key: "settings",
      title: "系统设置",
      path: "/settings",
      permission: (permissions) => permissions.some(p => p.includes("admin")),
    },
  ];

  const userMenuItems = [
    {
      key: "admin-permissions",
      label: "管理员权限",
      onClick: () => {
        setUserPermissions([
          "dashboard:view",
          "products:view",
          "orders:view",
          "customers:view",
          "admin:full"
        ]);
      },
    },
    {
      key: "user-permissions",
      label: "普通用户权限",
      onClick: () => {
        setUserPermissions([
          "dashboard:view",
          "products:view",
          "orders:view"
        ]);
      },
    },
  ];

  return (
    <Card title="权限控制导航" size="small">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Dropdown menu={{ items: userMenuItems }} placement="bottomLeft">
          <Button>切换用户权限</Button>
        </Dropdown>
        <Navigation
          list={menuList}
          isFixed={false}
          permissions={userPermissions}
        />
      </Space>
    </Card>
  );
};

// 自定义右侧选项的导航示例
const CustomOptionsNavigationExample = () => {
  const menuList = [
    {
      key: "dashboard",
      title: "仪表盘",
      path: "/dashboard",
    },
    {
      key: "products",
      title: "产品管理",
      path: "/products",
    },
    {
      key: "orders",
      title: "订单管理",
      path: "/orders",
    },
  ];

  const rightOptions = (
    <Space size="middle">
      <Badge count={5} size="small">
        <Button type="text" icon={<BellOutlined />} />
      </Badge>
      <Avatar icon={<UserOutlined />} />
      <Dropdown menu={{ 
        items: [
          { key: 'profile', label: '个人资料' },
          { key: 'settings', label: '系统设置' },
          { key: 'logout', label: '退出登录' },
        ]
      }}>
        <Button type="text" icon={<DownOutlined />} />
      </Dropdown>
    </Space>
  );

  return (
    <Card title="自定义右侧选项" size="small">
      <Navigation
        list={menuList}
        isFixed={false}
        rightOptions={rightOptions}
      />
    </Card>
  );
};

// 带图标的导航示例
const IconNavigationExample = () => {
  const { DashboardOutlined, ShoppingOutlined, FileTextOutlined, TeamOutlined } = antd.icons;
  
  const menuList = [
    {
      key: "dashboard",
      title: "仪表盘",
      path: "/dashboard",
      icon: <DashboardOutlined />,
    },
    {
      key: "products",
      title: "产品管理",
      path: "/products",
      icon: <ShoppingOutlined />,
    },
    {
      key: "orders",
      title: "订单管理",
      path: "/orders",
      icon: <FileTextOutlined />,
    },
    {
      key: "customers",
      title: "客户管理",
      path: "/customers",
      icon: <TeamOutlined />,
    },
  ];

  return (
    <Card title="带图标导航" size="small">
      <Navigation
        list={menuList}
        isFixed={false}
      />
    </Card>
  );
};

// 自定义标题的导航示例
const CustomTitleNavigationExample = () => {
  const menuList = [
    {
      key: "dashboard",
      title: "仪表盘",
      path: "/dashboard",
    },
    {
      key: "products",
      title: "产品管理",
      path: "/products",
    },
    {
      key: "orders",
      title: "订单管理",
      path: "/orders",
    },
  ];

  return (
    <Card title="自定义标题" size="small">
      <Navigation
        list={menuList}
        isFixed={false}
        defaultTitle="企业管理系统"
      />
    </Card>
  );
};

const NavigationFeaturesExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <BasicNavigationExample />
      <PermissionNavigationExample />
      <CustomOptionsNavigationExample />
      <IconNavigationExample />
      <CustomTitleNavigationExample />
    </Space>
  );
};

render(<NavigationFeaturesExample />);
```

- 折叠导航
- 展示Navigation组件在空间不足时的折叠功能
- _Navigation(@components/Navigation),global(@components/Global)

```jsx
const { default: Navigation } = _Navigation;
const { PureGlobal } = global;

const menuList = [
  {
    key: "client",
    title: "客户",
    path: "/client",
    permission: "client:client:look",
  },
  {
    key: "position",
    title: "职位",
    path: "/position",
    permission: "jd:job:look",
  },
  {
    key: "ats",
    title: "招聘流程",
    path: "/ats",
  },
  {
    key: "talent",
    title: "人才库",
    permission: "cv:cv:look",
    path: "/talent",
  },
  {
    key: "contract",
    title: "合同",
    permission: "contract:mgr:look",
    path: "/contract",
  },
  {
    key: "payment",
    title: "付款信息",
    permission: "payment:mgr:look",
    path: "/payment",
  },
  {
    key: "invoice-center",
    title: "开票",
    permission: "client:invoice:center",
    path: "/invoice-center",
  },
  {
    key: "invoice-manage",
    title: "发票管理",
    permission: "client:invoice:manager",
    path: "/invoice-manage",
  },
  {
    key: "setting",
    title: "设置",
    permission: (permissions) =>
      permissions.some(
        (x) =>
          [
            "system:permissions:mgr",
            "system:org:mgr",
            "system:user:mgr",
          ].indexOf(x) !== -1
      ),
    path: "/setting",
  },
];

render(
  <PureGlobal>
    <div className="fold-items">
      <Navigation
        isFixed={false}
        list={menuList}
        permissions={[
          "client:client:look",
          "jd:job:look",
          "cv:cv:look",
          "contract:mgr:look",
          "payment:mgr:look",
          "client:invoice:center",
          "client:invoice:manager",
          "system:permissions:mgr",
        ]}
      />
    </div>
  </PureGlobal>
);

```

- 权限控制
- 展示Navigation组件的权限控制功能
- _Navigation(@components/Navigation),antd(antd),global(@components/Global)

```jsx
const { useState } = React;
const { PureGlobal } = global;
const { default: Navigation } = _Navigation;
const { Checkbox, Space } = antd;

const menuList = [
  {
    key: "client",
    title: "客户",
    path: "/client",
    permission: "client:client:look",
  },
  {
    key: "position",
    title: "职位",
    path: "/position",
    permission: "jd:job:look",
  },
  {
    key: "ats",
    title: "招聘流程",
    path: "/ats",
  },
  {
    key: "talent",
    title: "人才库",
    permission: "cv:cv:look",
    path: "/talent",
  },
  {
    key: "contract",
    title: "合同",
    permission: "contract:mgr:look",
    path: "/contract",
  },
  {
    key: "payment",
    title: "付款信息",
    permission: "payment:mgr:look",
    path: "/payment",
  },
  {
    key: "invoice-center",
    title: "开票",
    permission: "client:invoice:center",
    path: "/invoice-center",
  },
  {
    key: "invoice-manage",
    title: "发票管理",
    permission: "client:invoice:manager",
    path: "/invoice-manage",
  },
  {
    key: "setting",
    title: "设置",
    permission: (permissions) =>
      permissions.some(
        (x) =>
          [
            "system:permissions:mgr",
            "system:org:mgr",
            "system:user:mgr",
          ].indexOf(x) !== -1
      ),
    path: "/setting",
  },
];

const Example = () => {
  const [permissions, setPermissions] = useState([]);
  return (
    <PureGlobal>
      <Space className="container" direction="vertical" size={32}>
        <Navigation isFixed={false} list={menuList} permissions={permissions} />
        <Checkbox.Group
          value={permissions}
          options={[
            "client:client:look",
            "jd:job:look",
            "cv:cv:look",
            "contract:mgr:look",
            "payment:mgr:look",
            "client:invoice:center",
            "client:invoice:manager",
            "system:permissions:mgr",
          ]}
          onChange={(values) => {
            setPermissions(values);
          }}
        />
      </Space>
    </PureGlobal>
  );
};

render(<Example />);

```

- 自定义配置
- 展示Navigation组件的自定义基础配置，包括base、headerLogo、indexLabel、rightOptions等属性
- _Navigation(@components/Navigation),global(@components/Global),antd(antd)

```jsx
const { default: Navigation } = _Navigation;
const { PureGlobal } = global;
const { Avatar, Badge, Dropdown, Space } = antd;

const menuList = [
  {
    key: "dashboard",
    title: "数据概览",
    path: "/dashboard",
    icon: <span style={{ fontSize: 16 }}>📊</span>,
  },
  {
    key: "project",
    title: "项目管理",
    path: "/project",
    icon: <span style={{ fontSize: 16 }}>📁</span>,
  },
  {
    key: "contract",
    title: "合同管理",
    path: "/contract",
    icon: <span style={{ fontSize: 16 }}>📄</span>,
  },
  {
    key: "invoice",
    title: "发票管理",
    path: "/invoice",
    icon: <span style={{ fontSize: 16 }}>🧾</span>,
  },
  {
    key: "approval",
    title: "审批中心",
    path: "/approval",
    icon: <span style={{ fontSize: 16 }}>✅</span>,
  },
  {
    key: "report",
    title: "报表分析",
    path: "/report",
    icon: <span style={{ fontSize: 16 }}>📈</span>,
  },
];

const CustomConfigExample = () => {
  return (
    <PureGlobal>
      <Navigation
        base="/app"
        className="custom-navigation"
        defaultTitle="企业管理系统"
        headerLogo={{
          src: "https://api.dicebear.com/7.x/icons/svg?seed=company",
          width: 32,
          height: 32,
        }}
        indexLabel="🏠 首页"
        isFixed={false}
        list={menuList}
        showIndex={true}
        permissions={[
          "dashboard:view",
          "project:view",
          "contract:view",
          "invoice:view",
          "approval:view",
          "report:view",
        ]}
        rightOptions={
          <Space size="middle">
            <Badge count={5}>
              <span style={{ fontSize: 18, cursor: "pointer" }}>🔔</span>
            </Badge>
            <Dropdown
              menu={{
                items: [
                  { key: "profile", label: "个人设置" },
                  { key: "logout", label: "退出登录" },
                ],
              }}
            >
              <Avatar
                size="small"
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=manager"
                style={{ cursor: "pointer" }}
              />
            </Dropdown>
          </Space>
        }
      />
    </PureGlobal>
  );
};

render(<CustomConfigExample />);

```

- 导航事件
- 展示Navigation组件的导航事件处理，包括onChange回调和navigateTo自定义导航函数
- _Navigation(@components/Navigation),global(@components/Global),antd(antd)

```jsx
const { default: Navigation } = _Navigation;
const { PureGlobal } = global;
const { message } = antd;

const menuList = [
  {
    key: "home",
    title: "首页",
    path: "/",
  },
  {
    key: "client",
    title: "客户管理",
    path: "/client",
    permission: "client:view",
  },
  {
    key: "project",
    title: "项目管理",
    path: "/project",
    permission: "project:view",
  },
  {
    key: "talent",
    title: "人才库",
    path: "/talent",
    permission: ["talent:view", "resume:view"],
  },
];

const NavigationEventsExample = () => {
  return (
    <PureGlobal>
      <Navigation
        list={menuList}
        isFixed={false}
        permissions={["client:view", "project:view", "talent:view", "resume:view"]}
        onChange={(path) => {
          message.success(&#96;导航到路径: ${path}&#96;);
        }}
        navigateTo={(path) => {
          message.info(&#96;自定义导航: ${path}&#96;);
        }}
      />
    </PureGlobal>
  );
};

render(<NavigationEventsExample />);

```

- 溢出指示器
- 展示Navigation组件的自定义溢出指示器和大量菜单项的处理
- _Navigation(@components/Navigation),global(@components/Global),antd(antd)

```jsx
const { default: Navigation } = _Navigation;
const { PureGlobal } = global;
const { Space } = antd;

const menuList = [
  { key: "home", title: "首页", path: "/" },
  { key: "module1", title: "业务模块一", path: "/module1" },
  { key: "module2", title: "业务模块二", path: "/module2" },
  { key: "module3", title: "业务模块三", path: "/module3" },
  { key: "module4", title: "业务模块四", path: "/module4" },
  { key: "module5", title: "业务模块五", path: "/module5" },
  { key: "module6", title: "业务模块六", path: "/module6" },
  { key: "module7", title: "业务模块七", path: "/module7" },
  { key: "module8", title: "业务模块八", path: "/module8" },
  { key: "module9", title: "业务模块九", path: "/module9" },
  { key: "module10", title: "业务模块十", path: "/module10" },
  { key: "module11", title: "业务模块十一", path: "/module11" },
  { key: "module12", title: "业务模块十二", path: "/module12" },
  { key: "module13", title: "业务模块十三", path: "/module13" },
  { key: "module14", title: "业务模块十四", path: "/module14" },
  { key: "module15", title: "业务模块十五", path: "/module15" },
];

const OverflowIndicatorExample = () => {
  return (
    <PureGlobal>
      <Navigation
        list={menuList}
        isFixed={false}
        showIndex={false}
        overflowedIndicator={
          <Space size={4}>
            <span>更多菜单</span>
            <span style={{ fontSize: 12 }}>▼</span>
          </Space>
        }
      />
    </PureGlobal>
  );
};

render(<OverflowIndicatorExample />);

```

### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|base|导航基础路径|string|-|
|className|自定义类名|string|-|
|defaultTitle|默认页面标题|string|-|
|headerLogo|导航栏Logo配置|object|内置logo|
|indexLabel|首页导航标签|string|ReactNode|首页|
|isFixed|是否固定在页面顶部|boolean|true|
|list|导航菜单项配置|array|-|
|navigateTo|自定义导航函数|function|-|
|onChange|导航切换回调|function|-|
|overflowedIndicator|导航项溢出时的指示器|ReactNode|默认"更多"下拉|
|permissions|当前用户的权限列表|array|-|
|rightOptions|导航栏右侧区域内容|ReactNode|-|
|showIndex|是否显示首页导航|boolean|true|

### list项配置

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|key|导航项唯一标识|string|-|
|title|导航项显示标题|string|ReactNode|-|
|path|导航项路径|string|function|-|
|permission|权限控制，可以是字符串、数组或函数|string|array|function|-|
|icon|导航项图标|ReactNode|-|
