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