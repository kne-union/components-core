const { default: Image } = _Image;
const { Space, Card, Modal, Typography, Button } = antd;
const { useState } = React;

const { Text } = Typography;

const ImageInteractionExample = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handleImageClick = (src) => {
    setPreviewImage(src);
    setPreviewVisible(true);
  };

  const handlePreviewClose = () => {
    setPreviewVisible(false);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="图片点击事件" size="small">
        <Space direction="vertical">
          <Text type="secondary">点击图片查看大图：</Text>
          <Space wrap>
            <Image
              src="https://picsum.photos/seed/product1/150/150.jpg"
              style={{ 
                width: '150px', 
                height: '150px', 
                cursor: 'pointer',
                border: '1px solid #d9d9d9',
                borderRadius: '4px'
              }}
              onClick={() => handleImageClick('https://picsum.photos/seed/product1/600/600.jpg')}
              alt="产品图片1"
            />
            <Image
              src="https://picsum.photos/seed/product2/150/150.jpg"
              style={{ 
                width: '150px', 
                height: '150px', 
                cursor: 'pointer',
                border: '1px solid #d9d9d9',
                borderRadius: '4px'
              }}
              onClick={() => handleImageClick('https://picsum.photos/seed/product2/600/600.jpg')}
              alt="产品图片2"
            />
            <Image
              src="https://picsum.photos/seed/product3/150/150.jpg"
              style={{ 
                width: '150px', 
                height: '150px', 
                cursor: 'pointer',
                border: '1px solid #d9d9d9',
                borderRadius: '4px'
              }}
              onClick={() => handleImageClick('https://picsum.photos/seed/product3/600/600.jpg')}
              alt="产品图片3"
            />
          </Space>
        </Space>
      </Card>
      
      <Card title="可点击头像" size="small">
        <Space>
          <div style={{ textAlign: 'center' }}>
            <Image.Avatar
              src="https://picsum.photos/seed/user1/100/100.jpg"
              size={80}
              shape="circle"
              onClick={() => console.log('点击了用户头像')}
              style={{ cursor: 'pointer' }}
              alt="用户头像"
            />
            <div style={{ marginTop: 8, fontSize: 12 }}>用户头像</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Image.Avatar
              gender="female"
              size={80}
              shape="circle"
              onClick={() => console.log('点击了默认女性头像')}
              style={{ cursor: 'pointer' }}
            />
            <div style={{ marginTop: 8, fontSize: 12 }}>默认女性头像</div>
          </div>
        </Space>
      </Card>
      
      <Card title="说明" size="small">
        <Text>
          <div>1. Image 和 Image.Avatar 组件都支持 onClick 事件，可以添加交互功能。</div>
          <div>2. 结合 Modal 组件可以实现图片预览功能。</div>
          <div>3. 通过设置 cursor: 'pointer' 样式可以提示用户图片是可点击的。</div>
        </Text>
      </Card>
      
      <Modal
        open={previewVisible}
        title="图片预览"
        footer={[
          <Button key="close" onClick={handlePreviewClose}>
            关闭
          </Button>
        ]}
        width={700}
        onCancel={handlePreviewClose}
      >
        <div style={{ textAlign: 'center' }}>
          <img src={previewImage} alt="预览" style={{ maxWidth: '100%' }} />
        </div>
      </Modal>
    </Space>
  );
};

render(<ImageInteractionExample />);