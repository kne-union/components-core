const { default: FlexBox } = _FlexBox;
const { Card, Button } = antd;
const { range } = lodash;
const { useRef } = React;
const BaseExample = () => {
  const ref = useRef();
  return (
    <div>
      <FlexBox.Fetch
        ref={ref}
        getFetchApi={({ size }) => {
          return {
            data: {
              pageSize: size,
            },
            loader: ({ data }) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve({
                    pageData: range(0, data.pageSize).map((index) => {
                      return {
                        key: index,
                        title: `第${index}项`,
                      };
                    }),
                  });
                }, 1000);
              });
            },
          };
        }}
        renderItem={(item) => (
          <FlexBox.Item>
            <Card title={item.title}>Card content</Card>
          </FlexBox.Item>
        )}
      />
      <Button
        onClick={() => {
          console.log(ref.current);
        }}
      >
        获取FetchApi
      </Button>
    </div>
  );
};

render(<BaseExample />);
