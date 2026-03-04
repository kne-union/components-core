const { default: HelperGuide } = _HelperGuide;
const { PureGlobal } = Global;
const { Space, Typography, Card } = antd;

const { Text } = Typography;

const CustomStyleExample = () => {
  return (
    <PureGlobal
      preset={{
        enums: {
          helperGuide: () => [
            {
              value: "normal-style",
              content: "默认样式的帮助提示"
            },
            {
              value: "custom-color",
              content: "蓝色背景的自定义帮助提示"
            },
            {
              value: "custom-warning",
              content: "黄色警告样式的帮助提示"
            },
            {
              value: "custom-error",
              content: "红色错误样式的帮助提示"
            },
            {
              value: "custom-spacing",
              content: "自定义间距的帮助提示"
            }
          ]
        }
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card title="自定义样式示例" size="small">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>默认样式：</Text>
              <HelperGuide name="normal-style" />
            </div>
            <div style={{ marginTop: '16px' }}>
              <Text strong>蓝色自定义样式：</Text>
              <HelperGuide
                name="custom-color"
                className="helper-guide-custom"
              />
            </div>
            <div style={{ marginTop: '16px' }}>
              <Text strong>警告样式：</Text>
              <HelperGuide
                name="custom-warning"
                className="helper-guide-warning"
              />
            </div>
            <div style={{ marginTop: '16px' }}>
              <Text strong>错误样式：</Text>
              <HelperGuide
                name="custom-error"
                className="helper-guide-error"
              />
            </div>
            <div style={{ marginTop: '24px' }}>
              <Text strong>自定义间距：</Text>
              <HelperGuide
                name="custom-spacing"
                style={{ marginTop: '12px', marginBottom: '8px' }}
              />
              <Text type="secondary">（通过 style 属性添加边距）</Text>
            </div>
          </Space>
        </Card>
        <Card title="说明" size="small">
          <Text>
            <div>1. 通过 <Text code>className</Text> 属性可以自定义 HelperGuide 的样式，样式应用在外层容器上。</div>
            <div>2. 通过 <Text code>style</Text> 属性可以添加行内样式，如调整间距等。</div>
            <div>3. 自定义样式可以覆盖组件的默认背景色、边框、文字颜色等。</div>
          </Text>
        </Card>
      </Space>
    </PureGlobal>
  );
};

render(<CustomStyleExample />);
