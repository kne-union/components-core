const { default: Navigation } = _Navigation;
const { PureGlobal } = global;
const { Space, Switch, Divider } = antd;

const menuList = [
  {
    key: "dashboard",
    title: "仪表盘",
    path: "/dashboard",
    icon: <span style={{ fontSize: 16 }}>📊</span>,
  },
  {
    key: "products",
    title: "产品管理",
    path: "/products",
    icon: <span style={{ fontSize: 16 }}>📦</span>,
  },
  {
    key: "orders",
    title: "订单管理",
    path: "/orders",
    icon: <span style={{ fontSize: 16 }}>📋</span>,
  },
  {
    key: "customers",
    title: "客户管理",
    path: "/customers",
    icon: <span style={{ fontSize: 16 }}>👥</span>,
  },
  {
    key: "settings",
    title: "系统设置",
    path: "/settings",
    icon: <span style={{ fontSize: 16 }}>⚙️</span>,
  },
];

const MobileResponsiveExample = () => {
  const [forceMobile, setForceMobile] = React.useState(undefined);

  return (
    <PureGlobal>
      <div style={{ maxWidth: '100%' }}>
        <div style={{ marginBottom: 16, padding: 16, background: '#f0f5ff' }}>
          <Space direction="vertical" size={12}>
            <div style={{ fontSize: 14, color: '#666' }}>
              <strong>移动端模式控制：</strong>
            </div>
            <Space>
              <span>自动检测（根据窗口宽度）</span>
              <Switch
                checked={forceMobile === true}
                onChange={(checked) => setForceMobile(checked)}
                checkedChildren="强制移动端"
                unCheckedChildren="自动"
              />
            </Space>
            <div style={{ fontSize: 12, color: '#999' }}>
              开启开关可强制切换到移动端布局，关闭则根据窗口宽度自动检测
            </div>
          </Space>
        </div>

        <Navigation
          list={menuList}
          isFixed={false}
          defaultTitle="企业管理系统"
          isMobile={forceMobile}
        />

        <div style={{ marginTop: 24, padding: 16, background: '#f5f5f5' }}>
          <p>1. 调整浏览器窗口宽度至小于 768px，导航将自动切换为移动端模式</p>
          <p>2. 或者使用上方开关强制指定为移动端模式</p>
          <p>3. 在移动端模式下，导航菜单将显示为汉堡菜单，点击后从右侧滑出</p>
        </div>
      </div>
    </PureGlobal>
  );
};

render(<MobileResponsiveExample />);
