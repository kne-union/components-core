const { default: Layout, StateBarPage } = _Layout;
const { PureGlobal } = global;
const { Card, Descriptions, Button, Space, Typography } = antd;

const { Text } = Typography;

const StateBarPageExample = () => {
  return (
    <PureGlobal preset={{
        enums: {
            helperGuide: () => [{
                value: 'order-detail-help',
                content: '这是一个订单详情页面，可以查看和管理订单详情信息。',
                url: 'https://example.com/help/order-detail'
            }]
        }
    }}>
      <Layout navigation={{ isFixed: false }}>
        <StateBarPage
          name="order-detail"
          helperGuideName="order-detail-help"
          page={{
            title: '订单详情',
            titleExtra: (
              <Space>
                <Button>编辑</Button>
                <Button type="primary">导出</Button>
              </Space>
            )
          }}
          stateBar={{
            list: [
              {
                label: '全部',
                value: 'all',
                count: 100
              },
              {
                label: '待处理',
                value: 'pending',
                count: 25
              },
              {
                label: '处理中',
                value: 'processing',
                count: 30
              },
              {
                label: '已完成',
                value: 'completed',
                count: 40
              },
              {
                label: '已取消',
                value: 'cancelled',
                count: 5
              }
            ],
            onChange: (value) => {
              console.log('状态切换：', value);
            }
          }}
        >
          <Card title="订单信息" size="small">
            <Descriptions column={2} bordered>
              <Descriptions.Item label="订单号">ORD202401001</Descriptions.Item>
              <Descriptions.Item label="客户姓名">张三</Descriptions.Item>
              <Descriptions.Item label="订单金额">¥1,200.00</Descriptions.Item>
              <Descriptions.Item label="创建时间">2024-01-15 10:30:00</Descriptions.Item>
              <Descriptions.Item label="收货地址" span={2}>
                北京市朝阳区某某街道123号
              </Descriptions.Item>
              <Descriptions.Item label="订单备注" span={2}>
                用户要求尽快发货
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </StateBarPage>
      </Layout>
    </PureGlobal>
  );
};

render(<StateBarPageExample />);
