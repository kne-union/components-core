const { default: Layout, Page } = layout;
const { Button, Space } = antd;
const { PureGlobal } = global;

const Example = () => {
  return (
    <Layout navigation={{ isFixed: false }}>
      <Page
        name="fix-right-menu"
        optionFixed={false}
        option={<div className="right-options">右侧操作区域</div>}
        optionFooter={
          <Space>
            <Button type="primary">新建</Button>
          </Space>
        }
        titleExtra={
          <Space>
            <Button type="primary">新建</Button>
          </Space>
        }
        title="标题"
        header={<div className="header">header</div>}
        headerFixed={false}
        menuFixed={false}
        footer={
          <div
            style={{ backgroundColor: "pink", height: "50px", clolr: "#FFF" }}
          >
            footer
          </div>
        }
        footerFixed
      >
        <div>内容区</div>
      </Page>
    </Layout>
  );
};

render(
  <PureGlobal>
    <Example />
  </PureGlobal>
);
