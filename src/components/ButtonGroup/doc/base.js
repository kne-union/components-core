const { default: ButtonGroup } = _ButtonGroup;
const { Button, Space } = antd;
const { useState } = React;
const BaseExample = () => {
  const [width, setWidth] = useState(200);
  return (
    <Space>
      <div style={{ width: `${width}px` }}>
        <ButtonGroup
          list={[
            {
              type: "primary",
              children: "操作1",
            },
            {
              children: "操作2",
            },
            {
              children: "操作3",
            },
            {
              children: "操作3",
              message: "确定要执行操作吗？",
              disabled: true,
            },
          ]}
        />
      </div>
      <Space>
        <Button
          onClick={() => {
            setWidth((width) => {
              return width + 20;
            });
          }}
        >
          增加容器宽度
        </Button>
        <Button
          onClick={() => {
            setWidth((width) => {
              return width - 20;
            });
          }}
        >
          减少容器宽度
        </Button>
      </Space>
    </Space>
  );
};

render(<BaseExample />);
