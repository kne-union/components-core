const { default: HistoryStore } = _HistoryStore;
const { Input, Select, Space, Card, Typography, Divider } = antd;

const { Text } = Typography;

const MultipleStoresExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="多个独立的历史记录存储" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>用户搜索（storeName: user_search）：</Text>
            <div style={{ marginTop: 8 }}>
              <HistoryStore
                storeName="user_search"
                label="最近搜索的用户"
                maxLength={5}
              >
                {({ appendHistory, openHistory }) => (
                  <Input.Search
                    placeholder="搜索用户名或手机号"
                    onFocus={openHistory}
                    onSearch={(value) => {
                      if (value) {
                        appendHistory({ value, label: value });
                      }
                    }}
                  />
                )}
              </HistoryStore>
            </div>
          </div>

          <Divider style={{ margin: '12px 0' }} />

          <div>
            <Text strong>订单搜索（storeName: order_search）：</Text>
            <div style={{ marginTop: 8 }}>
              <HistoryStore
                storeName="order_search"
                label="最近搜索的订单"
                maxLength={5}
              >
                {({ appendHistory, openHistory }) => (
                  <Input.Search
                    placeholder="搜索订单号或商品名称"
                    onFocus={openHistory}
                    onSearch={(value) => {
                      if (value) {
                        appendHistory({ value, label: value });
                      }
                    }}
                  />
                )}
              </HistoryStore>
            </div>
          </div>

          <Divider style={{ margin: '12px 0' }} />

          <div>
            <Text strong>部门筛选（storeName: department_filter）：</Text>
            <div style={{ marginTop: 8 }}>
              <HistoryStore
                storeName="department_filter"
                label="最近筛选的部门"
                maxLength={3}
              >
                {({ appendHistory, openHistory, close, open }) => (
                  <Select
                    placeholder="选择部门"
                    style={{ width: '100%' }}
                    options={[
                      { label: '技术部', value: 'tech' },
                      { label: '产品部', value: 'product' },
                      { label: '运营部', value: 'operation' }
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
                      appendHistory({ value, label: option.label });
                    }}
                  />
                )}
              </HistoryStore>
            </div>
          </div>

          <Divider style={{ margin: '12px 0' }} />

          <div>
            <Text strong>状态筛选（storeName: status_filter）：</Text>
            <div style={{ marginTop: 8 }}>
              <HistoryStore
                storeName="status_filter"
                label="最近筛选的状态"
                maxLength={3}
              >
                {({ appendHistory, openHistory, close, open }) => (
                  <Select
                    placeholder="选择状态"
                    style={{ width: '100%' }}
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
                      appendHistory({ value, label: option.label });
                    }}
                  />
                )}
              </HistoryStore>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="说明" size="small">
        <Text type="secondary">
          通过不同的 storeName 可以创建多个独立的历史记录存储，每个存储互不干扰。
          这样可以在同一个页面中使用多个 HistoryStore 组件，分别记录不同操作的历史记录。
          常用于多个搜索框、多个筛选器等场景。
        </Text>
      </Card>
    </Space>
  );
};

render(<MultipleStoresExample />);
