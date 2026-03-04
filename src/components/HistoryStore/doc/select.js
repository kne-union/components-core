const { default: HistoryStore } = _HistoryStore;
const { Select, Space, Card, Typography, Input } = antd;

const { Text } = Typography;

const SelectExample = () => {
  const departmentOptions = [
    { label: '技术部', value: 'tech' },
    { label: '产品部', value: 'product' },
    { label: '运营部', value: 'operation' },
    { label: '市场部', value: 'marketing' },
    { label: '人力资源部', value: 'hr' },
    { label: '财务部', value: 'finance' }
  ];

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="Select 组件历史记录" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>部门选择：</Text>
            <div style={{ marginTop: 8 }}>
              <HistoryStore
                storeName="department_history"
                label="最近选择的部门"
              >
                {({ appendHistory, openHistory, close, open }) => (
                  <Select
                    placeholder="选择部门"
                    style={{ width: '100%' }}
                    options={departmentOptions}
                    open={open}
                    onDropdownVisibleChange={(visible) => {
                      if (visible) {
                        openHistory();
                      } else {
                        close();
                      }
                    }}
                    onSelect={(value, option) => {
                      appendHistory({
                        value,
                        label: option.label
                      });
                    }}
                  />
                )}
              </HistoryStore>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <Text strong>城市选择：</Text>
            <div style={{ marginTop: 8 }}>
              <HistoryStore
                storeName="city_history"
                label="最近选择的城市"
              >
                {({ appendHistory, openHistory, close, open }) => (
                  <Select
                    mode="tags"
                    placeholder="选择或输入城市"
                    style={{ width: '100%' }}
                    options={[
                      { label: '北京', value: 'beijing' },
                      { label: '上海', value: 'shanghai' },
                      { label: '广州', value: 'guangzhou' },
                      { label: '深圳', value: 'shenzhen' }
                    ]}
                    open={open}
                    onDropdownVisibleChange={(visible) => {
                      if (visible) {
                        openHistory();
                      } else {
                        close();
                      }
                    }}
                    onChange={(values) => {
                      if (values.length > 0) {
                        const lastValue = values[values.length - 1];
                        const option = [
                          { label: '北京', value: 'beijing' },
                          { label: '上海', value: 'shanghai' },
                          { label: '广州', value: 'guangzhou' },
                          { label: '深圳', value: 'shenzhen' }
                        ].find(opt => opt.value === lastValue);
                        if (option) {
                          appendHistory({
                            value: lastValue,
                            label: option.label
                          });
                        }
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
          HistoryStore 可以与 Select 组件结合使用，记录用户的选择历史。
          通过 storeName 区分不同的历史记录场景，互不干扰。
          使用 onDropdownVisibleChange 控制下拉框的打开状态，实现历史记录和选项列表的切换。
        </Text>
      </Card>
    </Space>
  );
};

render(<SelectExample />);
