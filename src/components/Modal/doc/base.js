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
