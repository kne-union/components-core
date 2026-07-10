const { default: Layout, Page, PageHeader } = layout;
const { Button, Space } = antd;

const Example = () => {
  return (
    <Layout navigation={{ isFixed: false }}>
      <Page
        menu={<div className="layout-menu">左侧菜单区</div>}
        title="标题"
        hideCloseSvg={true}
        menuFixed={false}
        name="pageHeaderLayout"
        header={
          <PageHeader
            iconType="icon-color-shenpi-biaoti"
            title="详情页名称"
            info="编号:85767"
            buttonOptions={
              <Space wrap>
                <Button type="primary">新建</Button>
                <Button>操作1</Button>
                <Button>操作2</Button>
              </Space>
            }
            tags={['辅助信息', '辅助信息', '辅助信息', '辅助信息']}
          />
        }
        headerFixed={false}
      >
        <div>内容区</div>
      </Page>
    </Layout>
  );
};

render(<Example />);
