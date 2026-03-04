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