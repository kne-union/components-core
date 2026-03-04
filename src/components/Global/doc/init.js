const { PureGlobal } = _Global;
const { Space, Card, Typography, Alert, Spin, Button } = antd;

const { Title, Text } = Typography;

const InitExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="初始化加载演示" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text type="secondary">
            点击下方按钮查看初始化加载效果。init 方法会在系统首次加载时执行，
            可以返回 Promise 来处理异步操作，在加载完成前不会显示页面内容。
          </Text>
          <Space>
            <Button type="primary" onClick={() => window.location.reload()}>
              重新加载页面
            </Button>
          </Space>
        </Space>
      </Card>

      <Card title="模拟的异步数据加载" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>用户信息：</Text>
            <div style={{ marginTop: '8px', padding: '12px', backgroundColor: '#fafafa', borderRadius: '4px' }}>
              <div>用户ID：10001</div>
              <div>用户名：张三</div>
              <div>部门：技术部</div>
            </div>
          </div>
          <div>
            <Text strong>系统配置：</Text>
            <div style={{ marginTop: '8px', padding: '12px', backgroundColor: '#fafafa', borderRadius: '4px' }}>
              <div>主题色：#4096ff</div>
              <div>语言：zh-CN</div>
              <div>环境：production</div>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="说明" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text type="secondary">
            init 方法会在应用初始化时执行，通常用于加载用户信息、系统配置、权限数据等。
            在 init 方法返回的 Promise resolve 之前，页面会显示加载状态，不会渲染子组件。
          </Text>
          <Text type="secondary">
            这样可以确保在页面显示前，所有必要的全局数据都已经加载完成，
            避免页面出现闪烁或需要数据时的加载等待状态。
          </Text>
          <Alert
            message="注意：实际使用时，init 方法应该返回真实的异步请求 Promise"
            type="info"
            showIcon
          />
        </Space>
      </Card>
    </Space>
  );
};

// 模拟的 init 方法
const mockInit = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('初始化完成：加载用户数据和系统配置');
      resolve();
    }, 1500);
  });
};

const BaseExample = () => {
  return (
    <PureGlobal init={mockInit}>
      <InitExample />
    </PureGlobal>
  );
};

render(<BaseExample />);
