# Image

### 概述

Image 组件是一个增强的图片显示组件，支持两种加载方式：

1. 通过 src 属性直接加载图片URL
2. 通过 id 属性从 OSS 服务器加载图片

组件特性：
- 自动加载状态显示和错误处理
- 支持 Avatar 头像模式，可显示默认性别图标
- 支持自定义加载状态和错误状态组件
- 完全兼容原生 img 标签的基本属性

主要应用场景：
- 用户头像展示
- 商品图片展示
- 文档预览
- 需要加载状态的图片显示


### 示例

#### 示例样式

```scss
/* Image 组件示例样式 */
.product-card {
  .ant-card-cover {
    height: 180px;
    overflow: hidden;
  }
}

.user-avatar {
  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s;
  }
}

.image-preview {
  text-align: center;
  
  img {
    max-width: 100%;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
}
```

#### 示例代码

- 基础图片加载
- 通过src属性直接加载图片
- _Image(@components/Image),antd(antd)

```jsx
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

```

- OSS图片加载
- 通过id从OSS服务器加载图片，展示加载中和失败状态
- _Image(@components/Image),global(@components/Global),antd(antd)

```jsx
const {default: Image} = _Image;
const {PureGlobal} = global;
const {Space} = antd;
const BaseExample = () => {
    return <PureGlobal preset={{
        apis: {
            file: {
                getUrl: {
                    loader: ({params}) => {
                        if (params.id === 'logo513.png') {
                            return new Promise(() => {

                            });
                        }
                        return new Promise((resolve) => {
                            resolve(window.PUBLIC_URL + '/' + params.id);
                        });

                    }
                }
            }
        }
    }}>
        <Space>
            <Image id="logo512.png" style={{width: '100px', height: '100px'}}/>
            <Image id="logo513.png" style={{width: '100px', height: '100px'}}/>
            <Image id="logo511.png" style={{width: '100px', height: '100px'}}/>
        </Space>
    </PureGlobal>;
};

render(<BaseExample/>);

```

- 头像组件
- 展示Image.Avatar头像组件的各种用法
- _Image(@components/Image),antd(antd)

```jsx
const { default: Image } = _Image;
const { Space } = antd;
const BaseExample = () => {
  return (
    <Space>
      <Image.Avatar src={window.PUBLIC_URL + "/avatar.png"} shape="circle" />
      <Image.Avatar
        src={window.PUBLIC_URL + "/avatar.png"}
        shape="circle"
        size={80}
      />
      <Image.Avatar
        src={window.PUBLIC_URL + "/avatar.png"}
        shape="circle"
        size={50}
      />

      <Image.Avatar shape="circle" />
      <Image.Avatar gender="M" shape="circle" size={80} />
      <Image.Avatar gender="female" shape="circle" size={50} />
      <Image.Avatar gender="m" shape="circle" size={50} />
    </Space>
  );
};

render(<BaseExample />);

```

- 自定义状态组件
- 自定义加载中和错误状态的显示组件
- _Image(@components/Image),antd(antd),icon(@components/Icon)

```jsx
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
```

- 图片交互
- 展示图片点击事件和图片预览功能
- _Image(@components/Image),antd(antd)

```jsx
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
```

- 真实业务场景
- 用户信息卡片中的头像和商品列表中的图片展示
- _Image(@components/Image),antd(antd)

```jsx
const { default: Image } = _Image;
const { Space, Card, Typography, List, Avatar, Tag } = antd;

const { Title, Text, Paragraph } = Typography;

const RealScenarioExample = () => {
  // 模拟用户数据
  const users = [
    {
      id: 1,
      name: '张三',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan',
      position: '前端开发工程师',
      department: '技术部'
    },
    {
      id: 2,
      name: '李四',
      avatar: '',
      gender: 'male',
      position: '产品经理',
      department: '产品部'
    },
    {
      id: 3,
      name: '王五',
      avatar: '',
      gender: 'female',
      position: 'UI设计师',
      department: '设计部'
    }
  ];

  // 模拟商品数据
  const products = [
    {
      id: 1,
      name: '高端笔记本电脑',
      image: 'https://picsum.photos/seed/laptop/200/200.jpg',
      price: 8999,
      status: '在售'
    },
    {
      id: 2,
      name: '无线蓝牙耳机',
      image: 'https://picsum.photos/seed/earphone/200/200.jpg',
      price: 499,
      status: '在售'
    },
    {
      id: 3,
      name: '智能手表',
      image: 'https://picsum.photos/seed/watch/200/200.jpg',
      price: 1299,
      status: '缺货'
    }
  ];

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="用户信息卡片" size="small">
        <List
          dataSource={users}
          renderItem={(user) => (
            <List.Item style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
              <List.Item.Meta
                avatar={
                  user.avatar ? (
                    <Image.Avatar
                      src={user.avatar}
                      size={50}
                      shape="circle"
                      alt={user.name}
                    />
                  ) : (
                    <Image.Avatar
                      gender={user.gender}
                      size={50}
                      shape="circle"
                    />
                  )
                }
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Text strong>{user.name}</Text>
                    <Tag color="blue" style={{ marginLeft: 8 }}>
                      {user.department}
                    </Tag>
                  </div>
                }
                description={user.position}
              />
            </List.Item>
          )}
        />
      </Card>
      
      <Card title="商品展示列表" size="small">
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={products}
          renderItem={(product) => (
            <List.Item>
              <Card
                size="small"
                hoverable
                cover={
                  <Image
                    src={product.image}
                    style={{ 
                      width: '100%', 
                      height: 180, 
                      objectFit: 'cover' 
                    }}
                    alt={product.name}
                  />
                }
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text strong style={{ color: '#f5222d' }}>
                        ¥{product.price}
                      </Text>
                      <Tag color={product.status === '在售' ? 'green' : 'red'}>
                        {product.status}
                      </Tag>
                    </div>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      </Card>
      
      <Card title="说明" size="small">
        <Paragraph>
          本示例展示了 Image 组件在真实业务场景中的应用：
        </Paragraph>
        <ul>
          <li>用户信息卡片中的头像展示，支持图片头像和默认性别图标头像</li>
          <li>商品展示列表中的图片展示，支持加载状态和错误处理</li>
          <li>结合其他组件（List、Card、Tag等）实现完整的功能页面</li>
        </ul>
      </Card>
    </Space>
  );
};

render(<RealScenarioExample />);
```

### API

### Image 基础图片组件

| 属性名     | 说明         | 类型     | 默认值 |
|---------|------------|--------|-----|
| src     | 图片的src地址   | string | -   |
| id      | oss的id     | string | -   |
| loading | 加载时显示的组件   | ReactNode | `<Skeleton.Avatar shape="square" active/>` |
| error   | 加载错误时显示的组件 | ReactNode | `<Icon role="error-icon" colorful type="icon-color-touxiang-nan"/>` |
| alt     | 图片的alt属性   | string | -   |
| className | 自定义类名     | string | -   |
| onClick | 点击图片的回调函数 | function | -   |
| apis    | API配置，用于加载OSS图片 | object | -   |

### Image.Avatar 头像组件

基于Antd的Avatar组件，支持图片头像和默认性别图标头像，其他参数参考Antd的Avatar组件

| 属性名    | 说明                  | 类型     | 默认值 |
|--------|---------------------|--------|-----|
| src     | 图片的src地址   | string | -   |
| id      | oss的id     | string | -   |
| gender  | 性别 F，female，f为女其他为男 | string | -   |
| size    | 头像大小 | number | 100   |
| width   | 头像宽度 | number | -   |
| height  | 头像高度 | number | -   |
| shape   | 头像形状，可选 'circle' | string | -   |
| gap     | 头像与图标之间的间距 | number | -   |
| icon    | 自定义图标 | ReactNode | -   |
| defaultAvatar | 默认头像 | string | 默认头像SVG |
| className | 自定义类名 | string | -   |
| apis    | API配置，用于加载OSS图片 | object | -   |
