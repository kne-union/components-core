const { default: Image } = _Image;
const { Space, Card, Typography } = antd;

const { Text } = Typography;

const BaseExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="基础图片加载" size="small">
        <Space direction="vertical">
          <div>
            <Text strong>通过 src 属性加载图片：</Text>
            <div style={{ marginTop: 8 }}>
              <Image src={window.PUBLIC_URL + "/logo512.png"} style={{ width: '100px', height: '100px' }} alt="Logo图片" />
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <Text strong>通过 URL 加载网络图片：</Text>
            <div style={{ marginTop: 8 }}>
              <Image src="https://picsum.photos/seed/example/200/200.jpg" style={{ width: '100px', height: '100px' }} alt="示例图片" />
            </div>
          </div>
        </Space>
      </Card>
      
      <Card title="说明" size="small">
        <Text>
          <div>1. Image 组件通过 src 属性直接加载图片URL。</div>
          <div>2. 支持本地图片和网络图片加载。</div>
          <div>3. 可以通过 style 属性设置图片大小。</div>
          <div>4. 自动处理加载状态和错误状态。</div>
        </Text>
      </Card>
    </Space>
  );
};

render(<BaseExample />);
