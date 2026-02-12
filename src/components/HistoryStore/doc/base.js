const { default: HistoryStore } = _HistoryStore;
const { Input, Space, Card, Typography } = antd;

const { Text } = Typography;

const BaseExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="搜索框历史记录" size="small">
        <HistoryStore
          onSelect={(value, item) => {
            console.log('选中历史记录：', value, item);
          }}
        >
          {({ appendHistory, openHistory }) => (
            <Input.Search
              placeholder="输入关键词搜索"
              allowClear
              onFocus={openHistory}
              onSearch={(value) => {
                if (value) {
                  appendHistory({ value, label: value });
                }
              }}
            />
          )}
        </HistoryStore>
      </Card>

      <Card title="说明" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text type="secondary">
            基础用法：搜索框获取焦点时显示历史记录，点击历史记录标签或回车搜索后，
            该记录会被保存到历史记录中。
          </Text>
          <Text type="secondary">
            历史记录使用 localStorage 持久化存储，刷新页面后仍然可用。
          </Text>
        </Space>
      </Card>
    </Space>
  );
};

render(<BaseExample />);
