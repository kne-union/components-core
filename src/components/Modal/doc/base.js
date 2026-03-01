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
          <div>这是一个基础弹窗示例，展示了Modal组件的基本用法，包括确认和取消操作</div>
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
              children: <div>通过hooks方式调用的弹窗，无需手动管理状态</div>,
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
                <div style={{ height: "2000px", padding: '20px' }}>
                  <h3>这是一个用于测试滚动功能的高内容弹窗</h3>
                  <p>此处放置大量内容以展示弹窗的滚动效果和内部布局能力。当内容超出弹窗可视区域时，会自动显示滚动条，确保所有内容都可以访问。</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <p>在实际的业务场景中，这种长内容弹窗常用于展示详细的使用条款、产品说明、操作指南等信息。</p>
                  <p>您可以通过滚动查看所有内容，同时保持底部操作按钮始终可见。</p>
                  <p>继续添加更多内容以测试滚动效果...</p>
                  <p>这是第5段测试内容。</p>
                  <p>这是第6段测试内容。</p>
                  <p>这是第7段测试内容。</p>
                  <p>这是第8段测试内容。</p>
                  <p>这是第9段测试内容。</p>
                  <p>这是第10段测试内容，可以看到滚动条已经出现。</p>
                  <p>继续向下滚动查看更多内容...</p>
                  <p>第12段内容：在实际应用中，这里可能是长文本、图片、表格等复杂内容。</p>
                  <p>第13段内容：弹窗的滚动功能确保用户能够访问所有信息。</p>
                  <p>第14段内容：同时保持操作按钮在底部固定，方便用户随时进行操作。</p>
                  <p>第15段内容：测试长内容在弹窗中的显示效果。</p>
                  <p>第16段内容：确保用户体验的流畅性和可用性。</p>
                  <p>第17段内容：这是测试内容的最后几段。</p>
                  <p>第18段内容：长内容弹窗在复杂的业务场景中非常有用。</p>
                  <p>第19段内容：例如展示合同条款、技术文档、详细报告等。</p>
                  <p>第20段内容：滚动到底部，测试完成。</p>
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
              children: <div>自定义footer的弹窗内容，底部按钮区域被完全自定义</div>,
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
              children: <div>无footer的弹窗示例，适合展示信息或自定义操作</div>,
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
              children: <div>带右侧选项的弹窗布局示例</div>,
              rightOptions: <div>右侧辅助信息区域，常用于显示相关数据或快捷操作</div>,
              rightSpan: 12,
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
                  子组件状态控制示例，当前disabled状态：[{String(disabled)}]
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
