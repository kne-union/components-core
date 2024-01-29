const { default: Layout, Page } = _Layout;
const { PureGlobal } = global;
const BaseExample = () => {
  return (
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
      <Layout navigation={{ isFixed: false }}>
        <Page name="base" helperGuideName="base-detail">
          <div className="layout-content">内容区</div>
        </Page>
      </Layout>
    </PureGlobal>
  );
};

render(<BaseExample />);
