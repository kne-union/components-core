const { default: Layout, Affix } = _Layout;
const { Space, Card, Button, Typography } = antd;

const { Text } = Typography;

const AffixExample = () => {
  const [fixed, setFixed] = React.useState(false);

  return (
    <Layout navigation={{ isFixed: false }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card title="Affix 固定布局组件" size="small">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>固定到顶部（offsetTop: 100）：</Text>
              <div style={{ marginTop: 16 }}>
                <Affix offsetTop={100} onChange={(fixed) => setFixed(fixed)}>
                  <div style={{
                    background: 'var(--primary-color)',
                    color: 'white',
                    padding: '16px 24px',
                    borderRadius: '4px',
                    textAlign: 'center',
                    width: '200px'
                  }}>
                    我会在距离顶部 100px 时固定
                    {fixed && ' (已固定)'}
                  </div>
                </Affix>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <Text strong>不固定（isFixed: false）：</Text>
              <div style={{ marginTop: 16 }}>
                <Affix isFixed={false}>
                  <div style={{
                    background: 'var(--state-warning-color)',
                    color: 'white',
                    padding: '16px 24px',
                    borderRadius: '4px',
                    textAlign: 'center',
                    width: '200px'
                  }}>
                    我不会被固定
                  </div>
                </Affix>
              </div>
            </div>
          </Space>
        </Card>

        <Card title="说明" size="small">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text type="secondary">
              Affix 组件用于控制内容的固定布局行为，基于 Antd 的 Affix 组件进行了封装。
            </Text>
            <Text type="secondary">
              当 isFixed 为 true 时，内容会在滚动到指定位置后固定显示；
              当 isFixed 为 false 时，内容固定行为被禁用。
            </Text>
          </Space>
        </Card>

        <div style={{ height: 800 }}>
          <Text type="secondary">（向下滚动查看 Affix 固定效果）</Text>
        </div>
      </Space>
    </Layout>
  );
};

render(<AffixExample />);
