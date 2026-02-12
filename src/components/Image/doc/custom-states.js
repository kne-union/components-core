const { default: Image } = _Image;
const { Space, Card, Spin, Alert } = antd;
const { default: Icon } = icon;

const CustomStatesExample = () => {
  const customLoading = (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100px', height: '100px' }}>
      <Spin size="large" />
    </div>
  );
  
  const customError = (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100px', height: '100px', background: '#f5f5f5' }}>
      <Icon type="icon-exclamation-circle" style={{ fontSize: 24, color: '#ff4d4f' }} />
    </div>
  );

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="自定义加载状态" size="small">
        <Space>
          <div>
            <div style={{ marginBottom: 8 }}>默认加载状态:</div>
            <Image src="https://picsum.photos/seed/loading1/100/100.jpg" style={{ width: '100px', height: '100px' }} />
          </div>
          <div>
            <div style={{ marginBottom: 8 }}>自定义加载状态:</div>
            <Image 
              src="https://picsum.photos/seed/loading2/100/100.jpg" 
              loading={customLoading}
              style={{ width: '100px', height: '100px' }} 
            />
          </div>
        </Space>
      </Card>
      
      <Card title="自定义错误状态" size="small">
        <Space>
          <div>
            <div style={{ marginBottom: 8 }}>默认错误状态:</div>
            <Image src="https://invalid-url.example.com/image.jpg" style={{ width: '100px', height: '100px' }} />
          </div>
          <div>
            <div style={{ marginBottom: 8 }}>自定义错误状态:</div>
            <Image 
              src="https://invalid-url2.example.com/image.jpg" 
              error={customError}
              style={{ width: '100px', height: '100px' }} 
            />
          </div>
        </Space>
      </Card>
      
      <Card title="说明" size="small">
        <Alert 
          message="自定义状态组件" 
          description="Image 组件支持自定义加载中和错误状态的显示组件，可以通过 loading 和 error 属性传入自定义的 ReactNode。"
          type="info" 
        />
      </Card>
    </Space>
  );
};

render(<CustomStatesExample />);