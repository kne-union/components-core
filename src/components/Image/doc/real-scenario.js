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