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
