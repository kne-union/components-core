const { default: Layout, Page, Menu, PageHeader } = layout;

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
            options={[
              {
                children: "新建",
              },
              {
                children: "操作1",
              },
              {
                children: "操作2",
              },
              {
                children: "操作3",
              },
              {
                children: "操作4",
              },
            ]}
            tags={["辅助信息", "辅助信息", "辅助信息", "辅助信息"]}
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
