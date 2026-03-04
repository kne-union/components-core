# Menu

### 概述

Menu 是一个功能丰富的菜单导航组件，支持多级菜单、远程数据加载、权限控制和路径匹配。适用于各种侧边栏导航、顶部导航和下拉菜单场景。


### 示例

#### 示例代码

- 基础菜单
- 展示菜单的基本用法，包括多级菜单、无图标菜单、不可折叠菜单和单级菜单
- _Menu(@components/Menu),antd(antd)

```jsx
const { default: Menu } = _Menu;
const { Space, Card, Typography } = antd;
const { useState } = React;

const { Title, Text } = Typography;

// 基础多级菜单示例
const BaseMenuExample = () => {
  return (
    <Card title="基础多级菜单" size="small">
      <Menu
        defaultItems={[
          {
            label: "用户管理",
            iconType: "icon-yonghuguanli",
            children: [
              {
                label: "用户列表",
                path: "/users",
              },
              {
                label: "角色管理",
                path: "/roles",
              },
            ],
          },
          {
            label: "系统设置",
            iconType: "icon-shezhi",
            children: [
              {
                label: "基础配置",
                path: "/settings/basic",
              },
              {
                label: "权限配置",
                path: "/settings/permissions",
              },
            ],
          },
          {
            label: "数据统计",
            iconType: "icon-tongji",
            path: "/statistics",
          },
        ]}
      />
    </Card>
  );
};

// 无图标菜单示例
const NoIconMenuExample = () => {
  return (
    <Card title="无图标菜单" size="small">
      <Menu
        defaultItems={[
          {
            label: "首页",
            path: "/home",
          },
          {
            label: "产品",
            children: [
              {
                label: "产品列表",
                path: "/products/list",
              },
              {
                label: "产品分类",
                path: "/products/categories",
              },
            ],
          },
          {
            label: "关于我们",
            path: "/about",
          },
        ]}
      />
    </Card>
  );
};

// 不可折叠菜单示例
const NoCollapsedMenuExample = () => {
  return (
    <Card title="不可折叠菜单" size="small">
      <Menu
        allowCollapsed={false}
        defaultItems={[
          {
            label: "订单管理",
            iconType: "icon-dingdanguanli",
            children: [
              {
                label: "所有订单",
                path: "/orders/all",
              },
              {
                label: "待处理",
                path: "/orders/pending",
              },
              {
                label: "已完成",
                path: "/orders/completed",
              },
            ],
          },
          {
            label: "客户管理",
            iconType: "icon-kehuguanli",
            children: [
              {
                label: "客户列表",
                path: "/customers/list",
              },
              {
                label: "客户分组",
                path: "/customers/groups",
              },
            ],
          },
        ]}
      />
    </Card>
  );
};

// 单级菜单示例
const SingleLevelMenuExample = () => {
  return (
    <Card title="单级菜单" size="small">
      <Menu
        defaultItems={[
          {
            label: "仪表盘",
            iconType: "icon-yibiaopan",
            path: "/dashboard",
          },
          {
            label: "文档",
            iconType: "icon-wendang",
            path: "/documents",
          },
          {
            label: "消息中心",
            iconType: "icon-xiaoxizhongxin",
            path: "/messages",
          },
          {
            label: "个人设置",
            iconType: "icon-gerenshezhi",
            path: "/profile",
          },
        ]}
      />
    </Card>
  );
};

// 受控菜单示例
const ControlledMenuExample = () => {
  const [currentKey, setCurrentKey] = useState("products");
  
  return (
    <Card title="受控菜单" size="small">
      <Text type="secondary">当前选中项: {currentKey}</Text>
      <Menu
        currentKey={currentKey}
        onChange={setCurrentKey}
        items={[
          {
            label: "产品",
            key: "products",
            iconType: "icon-chanpin",
            path: "/products",
          },
          {
            label: "订单",
            key: "orders",
            iconType: "icon-dingdan",
            path: "/orders",
          },
          {
            label: "客户",
            key: "customers",
            iconType: "icon-kehu",
            path: "/customers",
          },
          {
            label: "财务",
            key: "finance",
            iconType: "icon-caiwu",
            path: "/finance",
          },
        ]}
      />
    </Card>
  );
};

const BasicExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ minWidth: '240px', flex: 1 }}>
          <BaseMenuExample />
        </div>
        <div style={{ minWidth: '240px', flex: 1 }}>
          <NoIconMenuExample />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ minWidth: '240px', flex: 1 }}>
          <NoCollapsedMenuExample />
        </div>
        <div style={{ minWidth: '240px', flex: 1 }}>
          <SingleLevelMenuExample />
        </div>
      </div>
      <div style={{ minWidth: '240px', maxWidth: '480px' }}>
        <ControlledMenuExample />
      </div>
    </Space>
  );
};

render(<BasicExample />);
```

- 远程数据加载
- 展示菜单的远程数据加载功能，包括嵌套远程加载和自定义加载状态
- _Menu(@components/Menu),antd(antd)

```jsx
const { default: Menu } = _Menu;
const { Space, Card, Typography } = antd;
const { useState } = React;

const { Title, Text } = Typography;

// 远程加载数据的菜单示例
const RemoteDataMenuExample = () => {
  return (
    <Card title="远程加载数据" size="small">
      <Text type="secondary">点击"动态部门"菜单项，会异步加载子菜单数据</Text>
      <Menu
        defaultItems={[
          {
            label: "静态菜单",
            iconType: "icon-jingtai",
            children: [
              {
                label: "子菜单项1",
                path: "/static/item1",
              },
              {
                label: "子菜单项2",
                path: "/static/item2",
              },
            ],
          },
          {
            label: "动态部门",
            iconType: "icon-bumen",
            fetchOptions: {
              loader: () => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve([
                      {
                        label: "技术部",
                        path: "/dept/tech",
                      },
                      {
                        label: "产品部",
                        path: "/dept/product",
                      },
                      {
                        label: "市场部",
                        path: "/dept/marketing",
                      },
                      {
                        label: "人力资源部",
                        path: "/dept/hr",
                      },
                    ]);
                  }, 1000);
                });
              },
            },
          },
          {
            label: "动态项目",
            iconType: "icon-xiangmu",
            fetchOptions: {
              loader: () => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve([
                      {
                        label: "进行中项目",
                        children: [
                          {
                            label: "网站改版",
                            path: "/projects/website",
                          },
                          {
                            label: "APP开发",
                            path: "/projects/app",
                          },
                        ],
                      },
                      {
                        label: "已完成项目",
                        path: "/projects/completed",
                      },
                    ]);
                  }, 1500);
                });
              },
            },
          },
        ]}
      />
    </Card>
  );
};

// 嵌套远程加载的菜单示例
const NestedRemoteMenuExample = () => {
  return (
    <Card title="嵌套远程加载" size="small">
      <Text type="secondary">多级菜单可以嵌套远程加载，点击后逐级加载数据</Text>
      <Menu
        defaultItems={[
          {
            label: "数据中心",
            iconType: "icon-shujuzhongxin",
            fetchOptions: {
              loader: () => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve([
                      {
                        label: "数据报表",
                        fetchOptions: {
                          loader: () => {
                            return new Promise((resolve) => {
                              setTimeout(() => {
                                resolve([
                                  {
                                    label: "日报表",
                                    path: "/data/daily",
                                  },
                                  {
                                    label: "周报表",
                                    path: "/data/weekly",
                                  },
                                  {
                                    label: "月报表",
                                    path: "/data/monthly",
                                  },
                                ]);
                              }, 800);
                            });
                          },
                        },
                      },
                      {
                        label: "数据源管理",
                        path: "/data/sources",
                      },
                    ]);
                  }, 1000);
                });
              },
            },
          },
        ]}
      />
    </Card>
  );
};

// 自定义加载内容示例
const CustomLoadingMenuExample = () => {
  return (
    <Card title="自定义加载状态" size="small">
      <Text type="secondary">可以通过fetchOptions配置自定义加载状态</Text>
      <Menu
        defaultItems={[
          {
            label: "快速操作",
            iconType: "icon-kuaisucaozuo",
            children: [
              {
                label: "新建文档",
                path: "/quick/new-doc",
              },
              {
                label: "上传文件",
                path: "/quick/upload",
              },
            ],
          },
          {
            label: "云存储",
            iconType: "icon-yuncunchu",
            fetchOptions: {
              loader: () => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve([
                      {
                        label: "我的文档",
                        path: "/cloud/docs",
                      },
                      {
                        label: "共享文档",
                        path: "/cloud/shared",
                      },
                      {
                        label: "回收站",
                        path: "/cloud/trash",
                      },
                    ]);
                  }, 2000);
                });
              },
            },
          },
        ]}
      />
    </Card>
  );
};

const RemoteDataExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ minWidth: '240px', flex: 1 }}>
          <RemoteDataMenuExample />
        </div>
        <div style={{ minWidth: '240px', flex: 1 }}>
          <NestedRemoteMenuExample />
        </div>
      </div>
      <div style={{ minWidth: '240px', maxWidth: '480px' }}>
        <CustomLoadingMenuExample />
      </div>
    </Space>
  );
};

render(<RemoteDataExample />);
```

- 自定义交互
- 展示菜单的交互功能，包括菜单项点击、动态菜单控制和展开状态控制
- _Menu(@components/Menu),antd(antd)

```jsx
const { default: Menu } = _Menu;
const { Space, Card, Typography, Button, message } = antd;
const { useState } = React;

const { Title, Text } = Typography;

// 菜单项点击交互示例
const MenuInteractionExample = () => {
  const [currentKey, setCurrentKey] = useState("dashboard");
  
  const handleMenuClick = (key, props) => {
    setCurrentKey(key);
    message.info(&#96;点击了菜单项: ${props.label}&#96;);
  };
  
  return (
    <Card title="菜单项点击交互" size="small">
      <Text type="secondary">点击菜单项触发自定义交互和消息提示</Text>
      <Menu
        currentKey={currentKey}
        onChange={setCurrentKey}
        items={[
          {
            label: "仪表盘",
            key: "dashboard",
            iconType: "icon-yibiaopan",
            onClick: handleMenuClick,
          },
          {
            label: "用户管理",
            key: "users",
            iconType: "icon-yonghuguanli",
            onClick: handleMenuClick,
            children: [
              {
                label: "用户列表",
                key: "user-list",
                onClick: handleMenuClick,
              },
              {
                label: "角色管理",
                key: "roles",
                onClick: handleMenuClick,
              },
            ],
          },
          {
            label: "系统设置",
            key: "settings",
            iconType: "icon-shezhi",
            onClick: handleMenuClick,
            children: [
              {
                label: "基础配置",
                key: "basic-settings",
                onClick: handleMenuClick,
              },
              {
                label: "安全设置",
                key: "security-settings",
                onClick: handleMenuClick,
              },
            ],
          },
        ]}
      />
    </Card>
  );
};

// 动态菜单控制示例
const DynamicMenuExample = () => {
  const [menuItems, setMenuItems] = useState([
    {
      label: "任务管理",
      iconType: "icon-renwuguanli",
      key: "tasks",
      children: [
        {
          label: "我的任务",
          key: "my-tasks",
          path: "/tasks/my",
        },
        {
          label: "团队任务",
          key: "team-tasks",
          path: "/tasks/team",
        },
      ],
    },
    {
      label: "文档管理",
      iconType: "icon-wendangguanli",
      key: "docs",
      path: "/docs",
    },
  ]);
  
  const addMenuItem = () => {
    const newItem = {
      label: &#96;新菜单项 ${menuItems.length + 1}&#96;,
      iconType: "icon-xinjian",
      key: &#96;new-${Date.now()}&#96;,
      path: &#96;/new/${menuItems.length}&#96;,
    };
    setMenuItems([...menuItems, newItem]);
    message.success("已添加新菜单项");
  };
  
  const removeLastMenuItem = () => {
    if (menuItems.length > 0) {
      setMenuItems(menuItems.slice(0, -1));
      message.success("已移除最后一个菜单项");
    }
  };
  
  return (
    <Card title="动态菜单控制" size="small">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text type="secondary">通过代码动态添加和删除菜单项</Text>
        <Space>
          <Button type="primary" size="small" onClick={addMenuItem}>
            添加菜单项
          </Button>
          <Button size="small" onClick={removeLastMenuItem}>
            移除最后一项
          </Button>
        </Space>
        <Menu
          items={menuItems}
        />
      </Space>
    </Card>
  );
};

// 展开状态控制示例
const ExpandControlExample = () => {
  const [openKeys, setOpenKeys] = useState(["product", "orders"]);
  
  const expandAll = () => {
    setOpenKeys(["product", "orders", "users", "settings"]);
    message.success("已展开所有菜单");
  };
  
  const collapseAll = () => {
    setOpenKeys([]);
    message.success("已收起所有菜单");
  };
  
  return (
    <Card title="展开状态控制" size="small">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text type="secondary">通过代码控制菜单的展开和收起状态</Text>
        <Space>
          <Button type="primary" size="small" onClick={expandAll}>
            展开全部
          </Button>
          <Button size="small" onClick={collapseAll}>
            收起全部
          </Button>
        </Space>
        <Menu
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
          defaultItems={[
            {
              label: "产品管理",
              key: "product",
              iconType: "icon-chanpin",
              children: [
                {
                  label: "产品列表",
                  path: "/products/list",
                },
                {
                  label: "产品分类",
                  path: "/products/categories",
                },
              ],
            },
            {
              label: "订单管理",
              key: "orders",
              iconType: "icon-dingdan",
              children: [
                {
                  label: "订单列表",
                  path: "/orders/list",
                },
                {
                  label: "订单统计",
                  path: "/orders/stats",
                },
              ],
            },
            {
              label: "用户管理",
              key: "users",
              iconType: "icon-yonghuguanli",
              children: [
                {
                  label: "用户列表",
                  path: "/users/list",
                },
                {
                  label: "权限设置",
                  path: "/users/permissions",
                },
              ],
            },
            {
              label: "系统设置",
              key: "settings",
              iconType: "icon-shezhi",
              children: [
                {
                  label: "基础设置",
                  path: "/settings/basic",
                },
                {
                  label: "安全设置",
                  path: "/settings/security",
                },
              ],
            },
          ]}
        />
      </Space>
    </Card>
  );
};

const CustomInteractionExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ minWidth: '240px', flex: 1 }}>
          <MenuInteractionExample />
        </div>
        <div style={{ minWidth: '240px', flex: 1 }}>
          <DynamicMenuExample />
        </div>
      </div>
      <div style={{ minWidth: '240px', maxWidth: '480px' }}>
        <ExpandControlExample />
      </div>
    </Space>
  );
};

render(<CustomInteractionExample />);
```

- 权限控制与路由匹配
- 展示菜单的权限控制和路由匹配功能，包括自定义路径匹配和嵌套路由
- _Menu(@components/Menu),antd(antd)

```jsx
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
```

### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|allowCollapsed|是否允许子菜单折叠|boolean|true|
|className|自定义类名|string|-|
|currentKey|当前选中的菜单项key|string|-|
|defaultCurrentKey|默认选中的菜单项key|string|-|
|defaultItems|默认菜单项数组|MenuItemProps[]|-|
|defaultOpenKeys|默认展开的菜单项key数组|string[]|-|
|items|菜单项数组|MenuItemProps[]|-|
|onChange|选中项改变时的回调函数|(key: string) => void|-|
|onItemsChange|菜单项改变时的回调函数|(items: MenuItemProps[]) => void|-|
|onOpenChange|展开项改变时的回调函数|(openKeys: string[]) => void|-|
|openKeys|当前展开的菜单项key数组|string[]|-|
|pathMatch|路径匹配函数|(path: string, location: { pathname: string, search: string }) => boolean|-|

### MenuItemProps

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|children|子菜单项|MenuItemProps[]|-|
|fetchOptions|远程加载子菜单的配置|FetchOptions|-|
|icon|菜单项图标React节点|ReactNode|-|
|iconType|菜单项图标类型|string|-|
|label|菜单项标签|string|ReactNode|-|
|onClick|点击菜单项的回调函数|(key: string, props: MenuItemProps) => void|-|
|path|菜单项对应的路径|string|-|
|request|权限请求配置|object|-|

### FetchOptions

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|loader|数据加载函数|() => Promise<MenuItemProps[]>|-|
