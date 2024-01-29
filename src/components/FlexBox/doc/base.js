const { default: FlexBox } = _FlexBox;
const { Card } = antd;
const BaseExample = () => {
  return (
    <FlexBox
      dataSource={[
        {
          title: "Title 1",
        },
        {
          title: "Title 2",
        },
        {
          title: "Title 3",
        },
        {
          title: "Title 4",
        },
        {
          title: "Title 5",
        },
        {
          title: "Title 6",
        },
      ]}
      renderItem={(item) => (
        <FlexBox.Item>
          <Card title={item.title}>Card content</Card>
        </FlexBox.Item>
      )}
    />
  );
};

render(<BaseExample />);
