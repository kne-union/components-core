const { default: HistoryStore } = _HistoryStore;
const { Input, Select, Button, Space, Table, Card, Typography, Tag } = antd;

const { Text } = Typography;

const RealScenarioExample = () => {
  const [filters, setFilters] = React.useState({});

  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo'
    },
    {
      title: '客户姓名',
      dataIndex: 'customerName',
      key: 'customerName'
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `¥${amount}`
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusMap = {
          pending: <Tag color="orange">待处理</Tag>,
          processing: <Tag color="blue">处理中</Tag>,
          completed: <Tag color="green">已完成</Tag>,
          cancelled: <Tag color="red">已取消</Tag>
        };
        return statusMap[status] || status;
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    }
  ];

  const mockData = [
    {
      key: '1',
      orderNo: 'ORD202401001',
      customerName: '张三',
      amount: 1200.00,
      status: 'completed',
      createTime: '2024-01-15 10:30:00'
    },
    {
      key: '2',
      orderNo: 'ORD202401002',
      customerName: '李四',
      amount: 3500.00,
      status: 'processing',
      createTime: '2024-01-15 11:20:00'
    },
    {
      key: '3',
      orderNo: 'ORD202401003',
      customerName: '王五',
      amount: 890.00,
      status: 'pending',
      createTime: '2024-01-15 14:45:00'
    }
  ];

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="订单管理页面" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Space wrap>
            <div>
              <Text>订单搜索：</Text>
              <HistoryStore
                storeName="order_search"
                label="最近搜索的订单"
                maxLength={5}
              >
                {({ appendHistory, openHistory }) => (
                  <Input.Search
                    placeholder="搜索订单号或客户姓名"
                    style={{ width: 280 }}
                    onFocus={openHistory}
                    onSearch={(value) => {
                      if (value) {
                        setFilters({ ...filters, keyword: value });
                        appendHistory({ value, label: value });
                      }
                    }}
                  />
                )}
              </HistoryStore>
            </div>

            <div>
              <Text>状态：</Text>
              <HistoryStore
                storeName="order_status_filter"
                label="最近筛选的状态"
                maxLength={3}
              >
                {({ appendHistory, openHistory, close, open }) => (
                  <Select
                    placeholder="选择状态"
                    style={{ width: 150 }}
                    allowClear
                    options={[
                      { label: '待处理', value: 'pending' },
                      { label: '处理中', value: 'processing' },
                      { label: '已完成', value: 'completed' },
                      { label: '已取消', value: 'cancelled' }
                    ]}
                    open={open}
                    onDropdownVisibleChange={(visible) => {
                      if (visible) {
                        openHistory();
                      } else {
                        close();
                      }
                    }}
                    onSelect={(value, option) => {
                      setFilters({ ...filters, status: value });
                      appendHistory({ value, label: option.label });
                    }}
                    onClear={() => {
                      setFilters({ ...filters, status: undefined });
                    }}
                  />
                )}
              </HistoryStore>
            </div>

            <Button type="primary">查询</Button>
            <Button>重置</Button>
          </Space>

          <div style={{ marginTop: 16 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              当前筛选条件：{Object.keys(filters).length > 0 ? JSON.stringify(filters) : '无'}
            </Text>
          </div>

          <Table
            columns={columns}
            dataSource={mockData}
            pagination={false}
            size="small"
          />
        </Space>
      </Card>

      <Card title="说明" size="small">
        <Text type="secondary">
          真实业务场景示例：在订单管理页面中，使用两个独立的 HistoryStore 组件，
          分别记录订单搜索历史和状态筛选历史。这样用户可以快速选择之前的搜索条件，
          提高操作效率。通过不同的 storeName 确保两个历史记录互不干扰。
        </Text>
      </Card>
    </Space>
  );
};

render(<RealScenarioExample />);
