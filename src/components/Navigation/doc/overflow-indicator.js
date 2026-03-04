const { default: Navigation } = _Navigation;
const { PureGlobal } = global;
const { Space } = antd;

const menuList = [
  { key: "home", title: "首页", path: "/" },
  { key: "module1", title: "业务模块一", path: "/module1" },
  { key: "module2", title: "业务模块二", path: "/module2" },
  { key: "module3", title: "业务模块三", path: "/module3" },
  { key: "module4", title: "业务模块四", path: "/module4" },
  { key: "module5", title: "业务模块五", path: "/module5" },
  { key: "module6", title: "业务模块六", path: "/module6" },
  { key: "module7", title: "业务模块七", path: "/module7" },
  { key: "module8", title: "业务模块八", path: "/module8" },
  { key: "module9", title: "业务模块九", path: "/module9" },
  { key: "module10", title: "业务模块十", path: "/module10" },
  { key: "module11", title: "业务模块十一", path: "/module11" },
  { key: "module12", title: "业务模块十二", path: "/module12" },
  { key: "module13", title: "业务模块十三", path: "/module13" },
  { key: "module14", title: "业务模块十四", path: "/module14" },
  { key: "module15", title: "业务模块十五", path: "/module15" },
];

const OverflowIndicatorExample = () => {
  return (
    <PureGlobal>
      <Navigation
        list={menuList}
        isFixed={false}
        showIndex={false}
        overflowedIndicator={
          <Space size={4}>
            <span>更多菜单</span>
            <span style={{ fontSize: 12 }}>▼</span>
          </Space>
        }
      />
    </PureGlobal>
  );
};

render(<OverflowIndicatorExample />);
