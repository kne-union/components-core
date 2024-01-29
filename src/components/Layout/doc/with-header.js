const { default: Layout, Page } = layout;
const { Button, Space } = antd;
const { PureGlobal } = global;

const Example = () => {
  return (
    <Space className="container" direction="vertical">
      <Layout navigation={{ isFixed: false }}>
        <Page
          name="with-header"
          helperGuideName="base-detail"
          menu={<div className="layout-menu">左侧菜单区</div>}
          titleExtra={
            <Space>
              <Button type="primary">新建</Button>
            </Space>
          }
          title="标题"
          hideCloseSvg={true}
          headerHeight="40px"
          menuFixed={false}
          header={<div className="header">header</div>}
          headerFixed={false}
          headerInfo={<div className="header-info">header info区域</div>}
        >
          <div>内容区</div>
        </Page>
      </Layout>
    </Space>
  );
};

render(
  <PureGlobal
    preset={{
      enums: {
        helperGuide: () => [
          {
            value: "base-detail",
            content: "测试帮助文档",
            url: "/",
          },
        ],
      },
    }}
  >
    <Example />
  </PureGlobal>
);
