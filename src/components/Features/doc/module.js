const { default: Features } = _Features;
const { default: Layout, PermissionsPage } = layout;
const { PureGlobal } = global;
const { Route, Routes } = Router;
const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        features: {
          debug: true,
          profile: {
            id: "erc",
            type: "system",
            name: "业务系统",
            children: [
              {
                id: "home",
                type: "module",
                name: "首页",
                children: [
                  {
                    id: "test",
                    type: "feature",
                    name: "测试功能",
                  },
                  {
                    id: "test2",
                    type: "feature",
                    name: "测试功能2",
                    dependencies: ["erc:client"],
                  },
                ],
              },
            ],
          },
        },
      }}
    >
      <Layout
        navigation={{
          isFixed: false,
          list: [
            {
              key: "position",
              title: "职位",
              path: "/position",
            },
            {
              key: "client",
              title: "客户",
              path: "/client",
            },
          ],
        }}
      >
        <Routes>
          <Route
            index
            element={
              <PermissionsPage name="home" openFeatures>
                home页面模块
                <div>
                  <Features id="test">开启模块</Features>
                  <Features id="test2">关闭模块</Features>
                </div>
              </PermissionsPage>
            }
          />
          <Route
            path="/position"
            element={
              <PermissionsPage name="position" openFeatures>
                position页面模块
              </PermissionsPage>
            }
          />
          <Route
            path="/client"
            element={
              <PermissionsPage name="client">
                client页面模块,未打开features
              </PermissionsPage>
            }
          />
        </Routes>
      </Layout>
    </PureGlobal>
  );
};

render(<BaseExample />);
