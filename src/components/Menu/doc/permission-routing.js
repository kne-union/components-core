const { default: Menu } = _Menu;
const { Space, Card, Typography, Switch, Alert } = antd;
const { useState, useMemo } = React;

const { Title, Text } = Typography;

// 权限控制菜单示例
const PermissionMenuExample = () => {
  const [hasAdminPermission, setHasAdminPermission] = useState(true);
  const [hasUserPermission, setUserPermission] = useState(true);
  
  const menuItems = useMemo(() => [
    {
      label: "首页",
      iconType: "icon-shouye",
      path: "/home",
    },
    {
      label: "用户管理",
      iconType: "icon-yonghuguanli",
      request: {
        permission: "user:view",
      },
      children: [
        {
          label: "用户列表",
          path: "/users/list",
          request: {
            permission: "user:list",
          },
        },
        {
          label: "用户详情",
          path: "/users/detail",
          request: {
            permission: "user:detail",
          },
        },
        {
          label: "用户操作",
          path: "/users/actions",
          request: {
            permission: ["user:create", "user:edit", "user:delete"],
          },
        },
      ],
    },
    {
      label: "系统管理",
      iconType: "icon-xitongguanli",
      request: {
        permission: ["admin:view", "admin:full"],
      },
      children: [
        {
          label: "系统配置",
          path: "/system/config",
          request: {
            permission: "admin:config",
          },
        },
        {
          label: "权限管理",
          path: "/system/permission",
          request: {
            permission: "admin:permission",
          },
        },
      ],
    },
    {
      label: "数据统计",
      iconType: "icon-shujutongji",
      path: "/statistics",
    },
  ], []);
  
  return (
    <Card title="权限控制菜单" size="small">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Text>用户管理权限:</Text>
          <Switch checked={hasUserPermission} onChange={setUserPermission} />
          <Text>管理员权限:</Text>
          <Switch checked={hasAdminPermission} onChange={setHasAdminPermission} />
        </Space>
        <Alert
          message="权限说明"
          description="根据用户权限控制菜单项的显示，无权限的菜单项将不会显示"
          type="info"
          showIcon
        />
        <Menu
          defaultItems={menuItems}
        />
      </Space>
    </Card>
  );
};

// 自定义路径匹配示例
const PathMatchExample = () => {
  const [matchType, setMatchType] = useState("exact");
  
  const customPathMatch = (path, location) => {
    if (matchType === "exact") {
      // 精确匹配
      return location.pathname === path;
    } else if (matchType === "startsWith") {
      // 前缀匹配
      return location.pathname.startsWith(path);
    } else if (matchType === "custom") {
      // 自定义匹配逻辑 - 包含特定标识符
      return location.pathname.includes(path.split("/").pop());
    }
    return false;
  };
  
  return (
    <Card title="自定义路径匹配" size="small">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Text>匹配类型:</Text>
          <Switch 
            checked={matchType === "exact"} 
            onChange={(checked) => setMatchType(checked ? "exact" : "startsWith")}
          />精确匹配
          <Switch 
            checked={matchType === "custom"} 
            onChange={(checked) => setMatchType(checked ? "custom" : "startsWith")}
          />自定义匹配
        </Space>
        <Alert
          message="匹配说明"
          description="精确匹配要求路径完全相同，前缀匹配要求路径以指定路径开头，自定义匹配使用特殊规则"
          type="info"
          showIcon
        />
        <Menu
          pathMatch={customPathMatch}
          defaultItems={[
            {
              label: "用户管理",
              iconType: "icon-yonghuguanli",
              path: "/users",
              children: [
                {
                  label: "用户列表",
                  path: "/users/list",
                },
                {
                  label: "用户详情",
                  path: "/users/detail",
                },
              ],
            },
            {
              label: "产品管理",
              iconType: "icon-chanpin",
              path: "/products",
              children: [
                {
                  label: "产品列表",
                  path: "/products/list",
                },
                {
                  label: "产品详情",
                  path: "/products/detail",
                },
              ],
            },
          ]}
        />
      </Space>
    </Card>
  );
};

// 嵌套路由匹配示例
const NestedRouteExample = () => {
  return (
    <Card title="嵌套路由匹配" size="small">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Alert
          message="嵌套路由说明"
          description="当访问子菜单路径时，父菜单也会自动高亮显示"
          type="info"
          showIcon
        />
        <Menu
          defaultItems={[
            {
              label: "用户中心",
              iconType: "icon-yonghuzhongxin",
              path: "/user",
              children: [
                {
                  label: "基本信息",
                  path: "/user/profile",
                },
                {
                  label: "账户安全",
                  path: "/user/security",
                },
                {
                  label: "通知设置",
                  path: "/user/notifications",
                },
              ],
            },
            {
              label: "项目管理",
              iconType: "icon-xiangmuguanli",
              path: "/project",
              children: [
                {
                  label: "进行中项目",
                  path: "/project/active",
                },
                {
                  label: "已完成项目",
                  path: "/project/completed",
                },
                {
                  label: "项目详情",
                  path: "/project/detail",
                },
              ],
            },
          ]}
        />
      </Space>
    </Card>
  );
};

const PermissionRoutingExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ minWidth: '240px', flex: 1 }}>
          <PermissionMenuExample />
        </div>
        <div style={{ minWidth: '240px', flex: 1 }}>
          <PathMatchExample />
        </div>
      </div>
      <div style={{ minWidth: '240px', maxWidth: '480px' }}>
        <NestedRouteExample />
      </div>
    </Space>
  );
};

render(<PermissionRoutingExample />);