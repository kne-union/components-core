const { default: InfoPage } = _InfoPage;
const { Button } = antd;

const BaseExample = () => {
  return (
    <InfoPage>
      InfoPage
      <InfoPage.Part
        title="Part Title"
        subtitle="我是一个subtitle"
        extra={<Button>操作</Button>}
      >
        InfoPage.Part
        <InfoPage.Part
          title="Part Title"
          subtitle="我是一个subtitle"
          extra={<Button>操作</Button>}
        >
          InfoPage.InfoPage.Part
        </InfoPage.Part>
      </InfoPage.Part>
      <InfoPage.Collapse
        items={[
          {
            key: "1",
            label: "This is default size panel header",
            children: <p>InfoPage.Collapse</p>,
          },
          {
            key: "2",
            label: "This is default size panel header2",
            children: <p>InfoPage.Collapse2</p>,
          },
        ]}
      />
    </InfoPage>
  );
};

render(<BaseExample />);
