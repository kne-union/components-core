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
