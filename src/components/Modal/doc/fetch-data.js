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
                      label: "用户基本信息",
                      content: "展示用户的姓名、邮箱、部门等基础信息，用于身份识别和管理",
                    },
                    {
                      label: "联系信息",
                      content: "电话号码、地址、紧急联系人等通讯信息，便于工作沟通和紧急联络",
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
                          label: "订单详情",
                          content: "订单编号、下单时间、客户信息、订单状态等订单基本信息",
                        },
                        {
                          label: "支付信息",
                          content: "支付方式、支付时间、支付金额、交易流水号等支付相关信息",
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
                          label: "订单详情",
                          content: "订单编号、下单时间、客户信息、订单状态等订单基本信息",
                        },
                        {
                          label: "支付信息",
                          content: "支付方式、支付时间、支付金额、交易流水号等支付相关信息",
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
