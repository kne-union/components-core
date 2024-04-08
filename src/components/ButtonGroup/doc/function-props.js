const { default: ButtonGroup } = _ButtonGroup;
const { default: ConfirmButton } = _ConfirmButton;
const { Button, Space } = antd;
const { useState, useEffect } = React;

const LoadChildren = ({ children }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading) {
    return null;
  }
  return children({
    onClick: () => {
      console.log("加载完成");
    },
  });
};
const BaseExample = () => {
  const [width, setWidth] = useState(200);
  return (
    <Space>
      <div style={{ width: `${width}px` }}>
        <ButtonGroup
          list={[
            (props) => {
              return (
                <Button {...props} type="primary">
                  操作1
                </Button>
              );
            },
            (props) => {
              return <Button {...props}>操作2</Button>;
            },
            (props) => {
              return <Button {...props}>操作3</Button>;
            },
            (props) => {
              return (
                <LoadChildren key={props.key}>
                  {({ onClick }) => {
                    return (
                      <ConfirmButton
                        {...props}
                        isModal={props.isDropdown}
                        message="确定要执行操作吗？"
                        onClick={onClick}
                      >
                        操作4
                      </ConfirmButton>
                    );
                  }}
                </LoadChildren>
              );
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
