const { default: Features } = _Features;
const { default: Layout, PermissionsPage } = layout;
const { PureGlobal } = global;
const { useState } = React;
const { Button, Space } = antd;
const BaseExample = () => {
  const [close, setClose] = useState(false);
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
                    options: {
                      state: "开启",
                    },
                    rejectedOptions: {
                      state: "关闭",
                    },
                    close: close,
                  },
                ],
              },
            ],
          },
        },
      }}
    >
      <Space direction="vertical">
        <Button
          onClick={() => {
            setClose((value) => !value);
          }}
        >
          切换
        </Button>
        <Layout navigation={{ isFixed: false }}>
          <PermissionsPage name="home" openFeatures>
            <Features id="test">
              {({ isPass, options }) => {
                return isPass
                  ? "模块开启,options:" + JSON.stringify(options)
                  : "模块关闭,options:" + JSON.stringify(options);
              }}
            </Features>
          </PermissionsPage>
        </Layout>
      </Space>
    </PureGlobal>
  );
};

render(<BaseExample />);
