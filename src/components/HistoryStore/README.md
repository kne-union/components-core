# HistoryStore

### 概述

HistoryStore 是一个历史记录管理组件，用于保存和展示用户的操作历史记录（如搜索记录、选择记录等）。它利用 localStorage 持久化存储数据，在用户再次访问时可以快速选择历史记录，提升用户体验。

**核心特性**

- **持久化存储**：基于 localStorage 实现数据持久化，刷新页面后数据不丢失
- **多场景支持**：通过 storeName 属性区分不同场景的历史记录，互不干扰
- **智能去重**：自动去除重复的历史记录，相同值只会保留最新的一次
- **数量限制**：可配置最大保存数量，避免占用过多存储空间
- **灵活触发**：支持通过焦点、点击等多种方式触发历史记录展示
- **Render Props**：通过 render props 模式提供完整的控制能力，可自定义触发逻辑

**适用场景**

- 搜索框历史记录：保存用户的搜索关键词，方便快速重新搜索
- 下拉框选择历史：保存用户选择过的选项，提供快捷选择入口
- 过滤器历史：保存用户设置过的过滤条件，一键应用历史配置
- 其他需要记录用户操作历史的场景


### 示例

#### 示例代码

- 搜索框历史记录
- 展示基础用法，搜索框获取焦点时显示历史记录
- _HistoryStore(@components/HistoryStore),antd(antd)

```jsx
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

```

- 自定义配置
- 展示 maxLength、label 等配置属性的用法
- _HistoryStore(@components/HistoryStore),antd(antd)

```jsx
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

```

- Select 组件历史记录
- 展示与 Select 组件结合使用，记录选择历史
- _HistoryStore(@components/HistoryStore),antd(antd)

```jsx
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

```

- 多个独立存储
- 展示通过不同 storeName 创建多个独立的历史记录
- _HistoryStore(@components/HistoryStore),antd(antd)

```jsx
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

```

- 真实业务场景
- 展示在订单管理页面中的实际应用
- _HistoryStore(@components/HistoryStore),antd(antd)

```jsx
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
      render: (amount) => &#96;¥${amount}&#96;
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

```

### API

### HistoryStore

HistoryStore 组件用于管理用户的历史记录，支持将搜索、选择等操作保存到 localStorage，并在需要时展示历史记录列表供用户快速选择。

#### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| className | string | 否 | - | 自定义类名 |
| overlayClassName | string | 否 | - | 弹窗内容的自定义类名 |
| storeName | string | 否 | 'HISTORY_STORE_KEY' | localStorage 的键名，用于区分不同场景的历史记录 |
| maxLength | number | 否 | 5 | 最多保存的历史记录数量，为 0 时不限制 |
| label | string | 否 | '最近搜索' | 历史记录列表的标题文字 |
| children | function | 是 | - | 子组件，接收 render props |
| onSelect | function | 否 | - | 选中历史记录时的回调函数，接收参数：(value, item) |
| zIndex | number | 否 | - | 弹窗的 z-index 层级 |
| getPopupContainer | function | 否 | - | 获取弹窗容器的函数 |

#### Render Props

children 是一个函数，接收以下参数：

| 参数名 | 类型 | 说明 |
|--------|------|------|
| open | boolean | 弹窗是否打开 |
| openHistory | function | 打开历史记录弹窗的方法 |
| appendHistory | function | 添加历史记录的方法，参数：{value, label} |
| setOnSelect | function | 设置选中回调的方法，参数：callback |
| close | function | 关闭弹窗的方法 |

#### 历史记录数据格式

每条历史记录是一个对象，包含以下字段：

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| value | string | 是 | 历史记录的值 |
| label | string | 是 | 历史记录的显示文本 |
