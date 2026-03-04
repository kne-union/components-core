const { default: Menu } = _Menu;
const { Space, Card, Typography, Button, message } = antd;
const { useState } = React;

const { Title, Text } = Typography;

// 菜单项点击交互示例
const MenuInteractionExample = () => {
  const [currentKey, setCurrentKey] = useState("dashboard");
  
  const handleMenuClick = (key, props) => {
    setCurrentKey(key);
    message.info(`点击了菜单项: ${props.label}`);
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
      label: `新菜单项 ${menuItems.length + 1}`,
      iconType: "icon-xinjian",
      key: `new-${Date.now()}`,
      path: `/new/${menuItems.length}`,
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