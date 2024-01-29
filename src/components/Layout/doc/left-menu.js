const { default: Layout, Page, Menu } = layout;
const { Button, Space } = antd;
const { PureGlobal } = global;

const Example = () => {
  return (
    <Layout navigation={{ isFixed: false }}>
      <Page
        name="left-menu"
        menuFixed={false}
        menu={
          <Menu
            items={[
              {
                label: "父级标题1",
                key: "p-0",
                iconType: "icon-zhanghaodenglu",
                children: [
                  {
                    label: "子标题1",
                    key: "s-0",
                    path: "/link1",
                  },
                  {
                    label: "子标题2",
                    key: "s-1",
                    path: "/link2",
                  },
                ],
              },
              {
                label: "父级标题2",
                key: "p-1",
                iconType: "icon-zhanghaodenglu",
                children: [
                  {
                    label: "子标题1",
                    key: "s-2",
                    path: "/link3",
                  },
                  {
                    label: "子标题2",
                    key: "s-3",
                    path: "/link4",
                  },
                ],
              },
              {
                label: "父级标题3",
                key: "p-2",
                iconType: "icon-zhanghaodenglu",
                path: "/link5",
              },
            ]}
          />
        }
        titleExtra={
          <Space>
            <Button type="primary">新建</Button>
          </Space>
        }
        backUrl={"/"}
        title="标题"
      >
        <div className="layout-content with-title-layout-content">内容区</div>
      </Page>
    </Layout>
  );
};

render(
  <PureGlobal>
    <Example />
  </PureGlobal>
);
