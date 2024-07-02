
# Modal


### 概述

### 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以在当前页面正中打开一个浮层，承载相应的操作。

### 特点

该组件是antd Modal组件的再封装：

* 修改了footer部分的设置逻辑,能更加简单的定义footer区域的功能
* 添加了withDecorator可以更加方便的处理Modal外层的显示逻辑
* 扩展了用于方法调用的useModal的hooks，可以通过hooks获得一个Modal的调用方法，并且保证其和Modal组件式调用有相同的UI表现和行为
* 扩展了ModalButton组件，可以在点击该按钮时执行加载数据，并且Button的状态变为loading，在数据加载完成之后再弹出弹窗
* 扩展了TabsModal组件，它是一个Tabs和Modal组合起来的组件，对弹窗title做了特殊处理，更加符合UI交互逻辑

### 示例

#### 示例代码

- 普通弹窗
- 展示弹窗的基本用法，自定义footer等功能。
注意:
1.onConfirm和onCancel只对于默认的footerButtons生效，如果是自定义的footerButtons则不需要传这两个参数，直接定义按钮的onClick即可。
2.自定义的footerButtons的onClick可以返回一个Promise来延迟关闭弹窗，resolve的值为false不关闭弹窗，其他情况会自动关闭弹窗。在resolve未返回之前按钮会变成loading状态
- _Modal(@components/Modal),global(@components/Global),antd(antd)

```jsx
const { default: Modal, useModal } = _Modal;
const { useState } = React;
const { Button, Space, message, Radio } = antd;
const { PureGlobal } = global;

const BaseExample = () => {
  const modal = useModal();
  const [size, setSize] = useState("default");
  const [open, setOpen] = useState(false);
  return (
    <Space direction="vertical">
      <Radio.Group
        value={size}
        options={[
          { label: "small", value: "small" },
          { label: "default", value: "default" },
          {
            label: "large",
            value: "large",
          },
        ]}
        onChange={(e) => {
          setSize(e.target.value);
        }}
        optionType="button"
        buttonStyle="solid"
      />
      <Space wrap>
        <Modal
          title="确定延迟关闭弹窗"
          size={size}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          onConfirm={() => {
            return new Promise((resolve) => {
              message.success("弹窗1s后关闭");
              setTimeout(() => {
                message.success("弹窗关闭");
                resolve();
              }, 1000);
            });
          }}
        >
          <div>弹窗弹窗弹窗弹窗弹窗弹窗弹窗</div>
        </Modal>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          确定延迟关闭弹窗
        </Button>
        <Button
          onClick={() => {
            modal({
              title: "hooks调用弹框",
              size,
              children: <div>弹窗弹窗弹窗弹窗弹窗弹窗弹窗</div>,
            });
          }}
        >
          hooks调用弹框
        </Button>
        <Button
          onClick={() => {
            modal({
              title: "超高弹窗",
              size,
              children: (
                <div style={{ height: "2000px" }}>
                  超高弹窗超高弹窗超高弹窗超高弹窗超高弹窗超高弹窗超高弹窗超高弹窗超高弹窗超高弹窗
                </div>
              ),
            });
          }}
        >
          展示超高弹窗
        </Button>
        <Button
          onClick={() => {
            modal({
              title: "自定义footer弹框",
              size,
              children: <div>弹窗弹窗弹窗弹窗弹窗弹窗弹窗</div>,
              footer: ({ close }) => (
                <Space>
                  <span>自定义footer</span>
                  <Button
                    type="link"
                    onClick={() => {
                      close();
                    }}
                  >
                    关闭
                  </Button>
                </Space>
              ),
            });
          }}
        >
          展示自定义footer弹框
        </Button>
        <Button
          onClick={() => {
            modal({
              title: "无footer弹框",
              size,
              children: <div>弹窗弹窗弹窗弹窗弹窗弹窗弹窗</div>,
              footer: null,
            });
          }}
        >
          无footer弹框
        </Button>
        <Button
          onClick={() => {
            modal({
              title: "自定义按钮组",
              size,
              children: <div>弹窗弹窗弹窗弹窗弹窗弹窗弹窗</div>,
              footerButtons: [
                {
                  children: "按钮一",
                },
                {
                  type: "primary",
                  children: "按钮二",
                },
                {
                  children: "按钮三",
                },
              ],
            });
          }}
        >
          自定义按钮组
        </Button>
        <Button
          onClick={() => {
            modal({
              title: "有rightOptions的弹窗",
              size,
              children: <div>弹窗弹窗弹窗弹窗弹窗弹窗弹窗</div>,
              rightOptions: <div>右侧内容右侧内容右侧内容右侧内容</div>,
            });
          }}
        >
          有rightOptions的弹窗
        </Button>
        <Button
          onClick={() => {
            const StateContainer = ({ children }) => {
              const [disabled, setDisabled] = useState(false);
              return children({ disabled, setDisabled });
            };

            modal({
              title: "有rightOptions的弹窗",
              size,
              withDecorator: (render) => {
                return <StateContainer>{render}</StateContainer>;
              },
              footerButtons: ({ disabled }) => [
                {
                  type: "primary",
                  disabled,
                  children: "确定",
                },
              ],
              children: ({ disabled, setDisabled }) => (
                <div>
                  弹窗弹窗弹窗弹窗弹窗弹窗弹窗[{String(disabled)}]
                  <Button
                    onClick={() => {
                      setDisabled((disabled) => !disabled);
                    }}
                  >
                    切换确定按钮disabled
                  </Button>
                </div>
              ),
            });
          }}
        >
          children控制footerButtons状态
        </Button>
      </Space>
    </Space>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);

```

- childrenRef的使用
- 
- _Modal(@components/Modal),antd(antd)

```jsx
const { default: Modal, useModal } = _Modal;
const { Button } = antd;
const BaseExample = () => {
  const modal = useModal();

  return (
    <Button
      onClick={() => {
        modal({
          title: "示例弹框",
          children: ({ childrenRef }) => {
            return (
              <div ref={childrenRef}>
                示例弹框示例弹框示例弹框示例弹框示例弹框示例弹框
              </div>
            );
          },
          onConfirm: (e, { childrenRef }) => {
            console.log(childrenRef.current);
          },
        });
      }}
    >
      点击弹出弹框
    </Button>
  );
};

render(<BaseExample />);

```

- 需要加载数据的弹窗
- 可以通过withDecorator属性实现弹窗的加载数据或者加载远程组件的逻辑，在数据或者远程组件加载完成之前弹窗展示loading状态，加载完成之后children可以获取到加载的数据
- _Modal(@components/Modal),global(@components/Global),antd(antd),fetch(@kne/react-fetch),_Content(@components/Content)

```jsx
const { default: Modal, useModal } = _Modal;
const { useState } = React;
const { Button, Space } = antd;
const { default: Fetch } = fetch;
const { PureGlobal } = global;
const { default: Content } = _Content;

const BaseExample = () => {
  const modal = useModal();
  const [open, setOpen] = useState(false);
  return (
    <Space wrap>
      <Modal
        title="组件调用方式"
        withDecorator={(render) => (
          <Fetch
            loader={() => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve([
                    {
                      label: "内容1",
                      content: "内容1内容1内容1内容1内容1内容1内容1",
                    },
                    {
                      label: "内容2",
                      content: "内容2内容2内容2内容2内容2内容2内容2内容2",
                    },
                  ]);
                }, 1000);
              });
            }}
            render={({ data }) => render({ data })}
          />
        )}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        {({ data }) => <Content list={data} col={2} />}
      </Modal>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        组件调用方式
      </Button>
      <Button
        onClick={() => {
          modal({
            title: "hooks调用方式",
            withDecorator: (render) => (
              <Fetch
                loader={() => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve([
                        {
                          label: "内容1",
                          content: "内容1内容1内容1内容1内容1内容1内容1",
                        },
                        {
                          label: "内容2",
                          content: "内容2内容2内容2内容2内容2内容2内容2内容2",
                        },
                      ]);
                    }, 1000);
                  });
                }}
                render={({ data }) => render({ data })}
              />
            ),
            children: ({ data }) => <Content list={data} col={2} />,
          });
        }}
      >
        hooks调用方式
      </Button>
      <Button
        onClick={() => {
          modal({
            title: (props) => {
              return "hooks调用方式";
            },
            withDecorator: (render) => (
              <Fetch
                loader={() => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve([
                        {
                          label: "内容1",
                          content: "内容1内容1内容1内容1内容1内容1内容1",
                        },
                        {
                          label: "内容2",
                          content: "内容2内容2内容2内容2内容2内容2内容2内容2",
                        },
                      ]);
                    }, 1000);
                  });
                }}
                render={({ data }) => render({ data })}
              />
            ),
            children: ({ data }) => <Content list={data} col={2} />,
          });
        }}
      >
        hooks title调用方式
      </Button>
    </Space>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);

```

- 可以弹出弹窗的按钮
- 可以点击按钮弹出弹窗，并且在弹窗弹出之前可以加载数据，加载数据时，按钮为loading状态，数据加载完成之后再弹出弹窗
- _Modal(@components/Modal),global(@components/Global),antd(antd),_Content(@components/Content),_FormInfo(@components/FormInfo)

```jsx
const { ModalButton, TabsModalButton } = _Modal;
const { Space } = antd;
const { PureGlobal } = global;
const { default: Content } = _Content;
const { default: FormInfo, Input, TextArea } = _FormInfo;

const api = {
  loader: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { label: "内容1", content: "内容1内容1内容1内容1内容1内容1内容1" },
          {
            label: "内容2",
            content: "内容2内容2内容2内容2内容2内容2内容2内容2",
          },
        ]);
      }, 1000);
    });
  },
};

const BaseExample = () => {
  return (
    <Space wrap>
      <ModalButton
        api={api}
        modalProps={({ data }) => {
          return {
            title: "加载数据的弹窗",
            children: <Content list={data} col={2} />,
          };
        }}
      >
        点击加载数据
      </ModalButton>
      <TabsModalButton
        api={api}
        modalProps={({ data }) => {
          return {
            items: data.map(({ label, content }, index) => {
              return {
                key: index,
                children: content,
                label,
              };
            }),
          };
        }}
      >
        点击加载数据的Tabs弹窗
      </TabsModalButton>
    </Space>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);

```

- tabs弹窗
- 展示一个tabs弹窗，tabs的选项的label会占据弹窗title位置，弹框的title将不显示
tabs的items多加了withDecorator参数和Modal的withDecorator参数类似可以控制其外部显示及渲染内容
tabs的items的children也可以是function，同样可以接收到TabsModal的withDecorator传回的参数
- _Modal(@components/Modal),global(@components/Global),antd(antd),fetch(@kne/react-fetch),_Content(@components/Content)

```jsx
const { TabsModal, useTabsModal } = _Modal;
const { useState } = React;
const { default: Fetch } = fetch;
const { Button, Space } = antd;
const { PureGlobal } = global;
const { default: Content } = _Content;

const BaseExample = () => {
  const [open, setOpen] = useState(false);
  const tabsModal = useTabsModal();
  return <Space wrap>
    <TabsModal open={open} onClose={() => {
      setOpen(false);
    }} items={[{
      label: "项目 1", key: "item-1", children: <div>项目 1项目 1项目 1项目 1项目 1项目 1项目 1项目 1</div>
    }, {
      label: "项目 2", key: "item-2", children: <div>项目 2项目 2项目 2项目 2项目 2项目 2项目 2项目 2</div>
    }]} rightOptions={<div>右边栏内容右边栏内容右边栏内容右边栏内容</div>}>
      <div>弹窗弹窗弹窗弹窗弹窗弹窗弹窗</div>
    </TabsModal>
    <Button onClick={() => {
      setOpen(true);
    }}>组件调用方式</Button>
    <Button onClick={() => {
      tabsModal({
        rightOptions: <div>右边栏内容右边栏内容右边栏内容右边栏内容</div>, items: [{
          label: "项目 1", key: "item-1", children: <div>项目 1项目 1项目 1项目 1项目 1项目 1项目 1项目 1</div>
        }, {
          label: "项目 2", key: "item-2", children: <div>项目 2项目 2项目 2项目 2项目 2项目 2项目 2项目 2</div>
        }]
      });
    }}>hooks调用方式</Button>
    <Button onClick={() => {
      tabsModal({
        title: "此title不展示",
        rightOptions: ({ data }) => <Content list={data} />,
        withDecorator: (render) => <Fetch loader={() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve([{ label: "内容1", content: "内容1内容1内容1内容1内容1内容1内容1" }, {
                label: "内容2", content: "内容2内容2内容2内容2内容2内容2内容2内容2"
              }]);
            }, 1000);
          });
        }} render={({ data }) => render({ data })} />,
        items: [{
          label: "项目 1", key: "item-1", children: ({ data }) => <Content list={data} col={2} />
        }, {
          withDecorator: (render) => <Fetch loader={() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([{ label: "内容3", content: "内容3内容3内容3内容3内容3内容3内容3" }, {
                  label: "内容4", content: "内容4内容4内容4内容4内容4内容4内容4内容4"
                }]);
              }, 1000);
            });
          }} render={({ data }) => render({ tabData: data })} />,
          label: "项目 2",
          key: "item-2",
          children: ({ data, tabData }) => <Content list={[...data, ...tabData]} col={2} />
        }]
      });
    }}>复杂数据加载</Button>
  </Space>;
};

render(<PureGlobal><BaseExample /></PureGlobal>);
```

- 消息确认和提示
- 展示确认消息提醒
- _Modal(@components/Modal),global(@components/Global),antd(antd),fetch(@kne/react-fetch),_Content(@components/Content)

```jsx
const { default: Modal, useConfirmModal } = _Modal;
const { useState } = React;
const { Button, Space, message } = antd;
const { PureGlobal } = global;
const BaseExample = () => {
  const confirmModal = useConfirmModal();
  return (
    <Space wrap>
      <Button
        onClick={() => {
          confirmModal({
            danger: true,
            type: "confirm",
            title: "确定要删除吗？",
            message:
              "确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除",
          });
        }}
      >
        confirm
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "confirm",
            confirmType: "warning",
            title: "确定要编辑吗？",
            message:
              "确定要编辑确定要编辑确定要编辑确定要编辑确定要编辑确定要编辑确定要编辑",
          });
        }}
      >
        confirm 警告
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "info",
            title: "确定要删除吗？",
            message:
              "确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除",
          });
        }}
      >
        info
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "info",
            message:
              "确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除",
          });
        }}
      >
        info无标题
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "success",
            title: "确定要删除吗？",
            message:
              "确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除",
          });
        }}
      >
        success
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "warning",
            title: "确定要删除吗？",
            message:
              "确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除",
          });
        }}
      >
        warning
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "error",
            title: "确定要删除吗？",
            message:
              "确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除",
          });
        }}
      >
        error
      </Button>
    </Space>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);

```


### API

| 属性名           | 说明                                                                                                                                      | 类型           | 默认值   |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------|--------------|-------|
| footer        | 弹窗的footer，当其被显式设置成null且footerButtons没有设置过时弹窗不显示footer。当它类型为function时可以得到close方法和withDecorator设置的props                                   | jsx,function | -     |
| footerButtons | 弹窗footer的按钮区，默认为确认和取消按钮，默认按钮分别响应onConfirm和onCancel方法，如果自定义设置footerButtons则需要自行传入onClick参数，onConfirm和onCancel方法将不生效                      | array        | -     |
| onClose       | 弹窗关闭时调用，弹窗受控时由该方法将外部open状态修改                                                                                                            | function     | -     |
| onConfirm     | 当footerButtons未自定义设置时点击确认按钮触发执行该方法，当其返回Promise点击后Promise，resolve之前确认按钮显示为loading状态，返回值为false或者Promise的resolve值为false时弹窗不会被关闭，其他情况弹窗默认关闭 | function     | -     |
| onCancel      | 和onConfirm类似，其为点击取消按钮触发                                                                                                                 | function     | -     |
| children      | 弹窗内容，可以为jsx或者function，为function时可以接收到close和withDecorator设置的props                                                                        | jsx,function | -     |
| withDecorator | 弹窗修饰器，会接收到弹窗children的render方法，可以在其外部添加修饰内容后执行render方法，给render方法传入的值可以在children,footer,rightOptions类型为function时接收到对应的参数                  | function     | -     |
| rightOptions  | 弹窗右侧区域，和children类似可以为jsx或者function类型                                                                                                    | jsx,function | -     |
| maskClosable  | 点击蒙层是否允许关闭                                                                                                  | boolean      | false |

其他参数参考antd Modal组件

### useModal

获取一个执行后可以弹出一个Modal组件的方法

#### return:modal

| 属性名   | 说明                            | 类型       |
|-------|-------------------------------|----------|
| modal | 执行后可以弹出一个Modal弹窗，参数同Modal组件参数 | function |

### TabsModal

一个Tabs和Modal组合起来的组件，对弹窗title做了特殊处理，更加符合UI交互逻辑

| 属性名              | 说明                                                                                   | 类型           | 默认值 |
|------------------|--------------------------------------------------------------------------------------|--------------|-----|
| items            | 同antd Tabs的items参数                                                                   | array        | -   |
| items[].label    | 选项卡头显示文字                                                                             | string       | -   |
| items[].children | 选项卡头显示内容，和antd Tabs不同的是它可以是一个function和Modal的children类似可以接收items[].withDecorator传入的参数 | jsx,function | -   |
| items[].key      | 对应activeKey值                                                                         | string       | -   |
| activeKey        | 当前激活 tab 面板的 key                                                                     | string       |     |
| withDecorator    | 弹窗修饰器和Modal的withDecorator作用一致                                                        | function     | -   |
| defaultActiveKey | 初始化选中面板的 key，如果没有设置 activeKey                                                        | string       |     |
| onChange         | 切换面板的回调                                                                              | function     |     |

### useTabsModal

获取一个执行后可以弹出一个TabsModal组件的方法

#### return:tabsModal

| 属性名       | 说明                                    | 类型       |
|-----------|---------------------------------------|----------|
| tabsModal | 执行后可以弹出一个TabsModal弹窗，参数同TabsModal组件参数 | function |

### ModalButton

点击以后可以执行获取数据，在数据未返回时按钮展示为loading状态，数据返回后弹出Modal弹窗

| 属性名        | 说明                                                | 类型                                     | 默认值 |
|------------|---------------------------------------------------|----------------------------------------|-----|
| api        | @kne/react-fetch 所需参数                             | object                                 | -   |
| modalProps | 同Modal参数,当它为function时，执行function后返回的值作为modalProps | object,function({data,fetchApi,close}) | -   |

其他参数同antd Button 组件

### TabsModalButton

点击以后可以执行获取数据，在数据未返回时按钮展示为loading状态，数据返回后弹出TabsModal弹窗

| 属性名        | 说明                                                    | 类型                                     | 默认值 |
|------------|-------------------------------------------------------|----------------------------------------|-----|
| api        | @kne/react-fetch 所需参数                                 | object                                 | -   |
| modalProps | 同TabsModal参数,当它为function时，执行function后返回的值作为modalProps | object,function({data,fetchApi,close}) | -   |

其他参数同antd Button 组件
