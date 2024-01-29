const { default: Features } = _Features;
const { default: Layout, PermissionsPage } = layout;
const { PureGlobal } = global;
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
                    dependencies: ["erc:client"],
                  },
                ],
              },
              {
                id: "position",
                type: "module",
                name: "职位",
                children: [
                  {
                    id: "position-list",
                    type: "feature",
                    options: [],
                    rejectedOptions: [],
                  },
                ],
              },
              {
                id: "client",
                type: "module",
                name: "客户",
              },
            ],
          },
        },
      }}
    >
      <Layout navigation={{ isFixed: false }}>
        <PermissionsPage name="home" openFeatures>
          <Features id="test">功能模块一</Features>
          <Features id="test2">功能模块二</Features>
        </PermissionsPage>
      </Layout>
    </PureGlobal>
  );
};

render(<BaseExample />);
