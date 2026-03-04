const { PureGlobal } = _Global;
const { Space, Button, Card, ColorPicker, Typography, Divider } = antd;

const { Text, Title } = Typography;

const ThemeExample = ({ themeToken }) => {
  const primaryColor = themeToken?.colorPrimary || '#4096ff';

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="主题色演示" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>当前主题色：</Text>
            <span style={{
              display: 'inline-block',
              width: '24px',
              height: '24px',
              backgroundColor: primaryColor,
              marginLeft: '8px',
              borderRadius: '4px',
              border: '1px solid #d9d9d9'
            }} />
            <Text code style={{ marginLeft: '8px' }}>{primaryColor}</Text>
          </div>
          <Divider style={{ margin: '12px 0' }} />
          <div>
            <Text strong>主色按钮：</Text>
            <Button type="primary" style={{ marginLeft: '8px' }}>
              主色按钮
            </Button>
          </div>
          <div>
            <Text strong>链接文字：</Text>
            <Typography.Link style={{ marginLeft: '8px' }}>
              链接文字
            </Typography.Link>
          </div>
          <Divider style={{ margin: '12px 0' }} />
          <div>
            <Text strong>Alert 组件（使用主题色）：</Text>
            <Space direction="vertical" style={{ width: '100%', marginTop: '8px' }}>
              <Button type="primary">Primary 按钮</Button>
              <Button danger>Danger 按钮</Button>
            </Space>
          </div>
        </Space>
      </Card>
      <Card title="说明" size="small">
        <Text type="secondary">
          通过 themeToken 属性可以自定义主题色。Global 组件会自动根据主题色生成透明度渐变，
          并应用到所有使用主题色的组件上，包括按钮、链接、输入框等。
        </Text>
      </Card>
    </Space>
  );
};

const BaseExample = () => {
  const [color, setColor] = React.useState('#4096ff');

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="主题色选择" size="small">
        <Space>
          <Text>选择主题色：</Text>
          <ColorPicker
            value={color}
            onChange={(color) => setColor(color.toHexString())}
            showText
          />
        </Space>
      </Card>
      <PureGlobal themeToken={{ colorPrimary: color }}>
        <ThemeExample themeToken={{ colorPrimary: color }} />
      </PureGlobal>
    </Space>
  );
};

render(<BaseExample />);
