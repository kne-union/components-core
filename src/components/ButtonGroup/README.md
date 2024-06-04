
# ButtonGroup


### 概述

用于根据当前容器空间自动计算多余按钮收起


### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _ButtonGroup(@components/ButtonGroup),antd(antd)

```jsx
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

```

- 紧凑模式
- 紧凑模式
- _ButtonGroup(@components/ButtonGroup),antd(antd)

```jsx
const { default: ButtonGroup } = _ButtonGroup;
const { Button, Space } = antd;
const { useState } = React;
const BaseExample = () => {
  const [width, setWidth] = useState(200);
  return (
    <Space>
      <div style={{ width: `${width}px` }}>
        <ButtonGroup
          compact
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

```

- 渲染函数
- 渲染函数
- _ButtonGroup(@components/ButtonGroup),_ConfirmButton(@components/ConfirmButton),antd(antd)

```jsx
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

```


### API

| 属性名         | 说明                             | 类型                              | 默认值                                                    |
|-------------|--------------------------------|---------------------------------|--------------------------------------------------------|
| list        | button按钮属性的数组                  | array                           | []                                                     |
| more        | 更多按钮占位                         | jsx                             | <Button>更多<Icon type="icon-arrow-thin-down"/></Button> |
| compact     | 是否为紧凑模式                        | boolean                         | false                                                  |
| size        | 当compact为false时为按钮间隔大小，否则为按钮大小 | 'small','middle','large',number | 8                                                      |
| split,align | 参考antd Space                   | -                               | -                                                      |

