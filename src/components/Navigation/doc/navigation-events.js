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
          message.success(`导航到路径: ${path}`);
        }}
        navigateTo={(path) => {
          message.info(`自定义导航: ${path}`);
        }}
      />
    </PureGlobal>
  );
};

render(<NavigationEventsExample />);
