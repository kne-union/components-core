const { default: HistoryStore } = _HistoryStore;
const { Input, Space, Card, Typography, Divider } = antd;

const { Text } = Typography;

const CustomConfigExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="自定义配置示例" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>默认配置（最多5条，标题"最近搜索"）：</Text>
            <div style={{ marginTop: 8 }}>
              <HistoryStore>
                {({ appendHistory, openHistory }) => (
                  <Input.Search
                    placeholder="输入关键词"
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

          <Divider style={{ margin: '16px 0' }} />

          <div>
            <Text strong>自定义最大数量（最多10条）：</Text>
            <div style={{ marginTop: 8 }}>
              <HistoryStore maxLength={10}>
                {({ appendHistory, openHistory }) => (
                  <Input.Search
                    placeholder="输入关键词"
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

          <Divider style={{ margin: '16px 0' }} />

          <div>
            <Text strong>自定义标题（"搜索历史"）：</Text>
            <div style={{ marginTop: 8 }}>
              <HistoryStore label="搜索历史">
                {({ appendHistory, openHistory }) => (
                  <Input.Search
                    placeholder="输入关键词"
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

          <Divider style={{ margin: '16px 0' }} />

          <div>
            <Text strong>不限制数量（maxLength={0}）：</Text>
            <div style={{ marginTop: 8 }}>
              <HistoryStore maxLength={0}>
                {({ appendHistory, openHistory }) => (
                  <Input.Search
                    placeholder="输入关键词"
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
        </Space>
      </Card>

      <Card title="说明" size="small">
        <Text type="secondary">
          通过 maxLength、label 等属性可以自定义历史记录的配置。
          maxLength 为 0 时不限制保存数量，但建议设置合理的最大值以避免占用过多存储空间。
        </Text>
      </Card>
    </Space>
  );
};

render(<CustomConfigExample />);
