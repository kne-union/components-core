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
