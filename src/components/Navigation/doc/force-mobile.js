const { default: Navigation } = _Navigation;
const { PureGlobal } = global;
const { Space, Switch } = antd;
const { useState } = React;

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

const ForceMobileExample = () => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <PureGlobal>
      <div style={{ maxWidth: '100%' }}>
        <div style={{ marginBottom: 16, padding: 16, background: '#f0f5ff' }}>
          <Space direction="vertical" size={12}>
            <div style={{ fontSize: 14, color: '#666' }}>
              <strong>强制移动端模式：</strong>
            </div>
            <Switch
              checked={isMobile}
              onChange={setIsMobile}
              checkedChildren="开启移动端"
              unCheckedChildren="桌面端"
            />
            <div style={{ fontSize: 12, color: '#999' }}>
              通过 <code>isMobile</code> 属性可以强制指定导航栏的显示模式
            </div>
          </Space>
        </div>

        <Navigation
          list={menuList}
          isFixed={false}
          defaultTitle="企业管理系统"
          isMobile={isMobile}
        />

        <div style={{ marginTop: 24, padding: 16, background: '#f5f5f5' }}>
          <p>点击上方开关可以强制切换导航栏的显示模式：</p>
          <ul style={{ marginTop: 8, paddingLeft: 20 }}>
            <li>关闭开关：显示桌面端水平菜单</li>
            <li>打开开关：显示移动端汉堡菜单（点击后显示下拉菜单）</li>
          </ul>
          <p style={{ marginTop: 8, color: '#666' }}>
            注意：当不指定 <code>isMobile</code> 属性时，组件会根据窗口宽度自动检测
          </p>
        </div>
      </div>
    </PureGlobal>
  );
};

render(<ForceMobileExample />);
