
# Enum


### 概述

枚举值管理和展示组件，用于统一管理应用中的枚举数据，如性别、状态、类型等选项列表。

## 何时使用

- 需要展示枚举值的描述文本时
- 需要将枚举列表渲染为下拉框、单选框等表单组件时
- 需要统一管理应用中的枚举数据时
- 需要支持多语言的枚举描述时

## 特性

- 📦 统一的枚举数据管理
- 🔄 支持同步/异步加载
- 📡 内置LRU缓存机制
- 🌍 支持多语言
- 🎨 多种格式化方式
- 🔧 灵活的渲染函数


### 示例

#### 示例代码

- 基础用法
- 展示枚举的基本使用，包括获取单个枚举值和枚举列表
- _Enum(@components/Enum),antd(antd),global(@components/Global)

```jsx
const { default: Enum } = _Enum;
const { PureGlobal } = global;
const { Space, Select, Divider } = antd;
const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        locale: "zh-CN",
        enums: {
          // 同步加载的枚举
          gender: [
            { value: "M", description: "男" },
            { value: "F", description: "女" },
          ],
          // 异步加载的枚举
          status: async ({ locale }) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([
                  { value: "1", description: "启用" },
                  { value: "0", description: "禁用" },
                ]);
              }, 500);
            });
          },
        },
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <h4>获取单个枚举值</h4>
          <Space>
            <span>性别：</span>
            <Enum moduleName="gender" name="M" />
            <Divider type="vertical" />
            <span>自定义渲染：</span>
            <Enum moduleName="gender" name="F">
              {(data) => <strong style={{ color: "#f5222d" }}>{data.description}</strong>}
            </Enum>
          </Space>
        </div>
        
        <div>
          <h4>获取枚举列表</h4>
          <Enum moduleName="gender">
            {(list) => {
              return (
                <Space>
                  <span>可选项：</span>
                  {list.map((item, index) => (
                    <span key={item.value}>
                      {item.description}
                      {index < list.length - 1 && "、"}
                    </span>
                  ))}
                </Space>
              );
            }}
          </Enum>
        </div>
        
        <div>
          <h4>渲染为下拉框</h4>
          <Enum moduleName="status">
            {(list) => {
              return (
                <Select
                  style={{ width: 150 }}
                  placeholder="请选择状态"
                  options={list.map((item) => ({
                    value: item.value,
                    label: item.description,
                  }))}
                />
              );
            }}
          </Enum>
        </div>
        
        <div>
          <h4>占位符和加载状态</h4>
          <Space>
            <span>状态：</span>
            <Enum 
              moduleName="status" 
              name="1"
              placeholder="加载中..."
            />
          </Space>
        </div>
        
        <div>
          <h4>使用format="option"直接获取选项格式</h4>
          <Enum moduleName="gender" format="option">
            {(list) => (
              <Select
                style={{ width: 150 }}
                placeholder="请选择性别"
                options={list}
              />
            )}
          </Enum>
        </div>
      </Space>
    </PureGlobal>
  );
};

render(<BaseExample />);
```

- 异步加载与缓存
- 展示异步加载枚举数据、Loading状态和强制刷新缓存
- _Enum(@components/Enum),antd(antd),global(@components/Global),React(react)

```jsx
const { default: Enum } = _Enum;
const { PureGlobal } = global;
const { Space, Button, message } = antd;
const { useState } = React;

const AsyncEnumExample = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  
  return (
    <PureGlobal
      preset={{
        locale: "zh-CN",
        enums: {
          // 异步加载枚举数据
          userStatus: async ({ language }) => {
            // 模拟从服务器获取数据
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([
                  { value: "active", description: "活跃" },
                  { value: "inactive", description: "非活跃" },
                  { value: "pending", description: "待审核" },
                  { value: "banned", description: "已禁用" },
                ]);
              }, 1500);
            });
          },
          // 同步枚举数据
          priority: [
            { value: "low", description: "低优先级" },
            { value: "medium", description: "中优先级" },
            { value: "high", description: "高优先级" },
            { value: "urgent", description: "紧急" },
          ],
        },
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <h4>异步加载枚举（带Loading状态）</h4>
          <Enum 
            key={refreshKey}
            moduleName="userStatus" 
            name="active"
            loading={<span>正在加载用户状态...</span>}
            placeholder="--"
          >
            {(data) => <div>当前状态：{data.description}</div>}
          </Enum>
        </div>
        
        <div>
          <h4>强制刷新缓存</h4>
          <Space>
            <Enum 
              moduleName="userStatus" 
              name="banned"
              force={refreshKey > 0}
            >
              {(data) => data.description}
            </Enum>
            <Button 
              onClick={() => {
                setRefreshKey(prev => prev + 1);
                message.info("已刷新缓存");
              }}
            >
              刷新缓存
            </Button>
          </Space>
        </div>
        
        <div>
          <h4>同步枚举数据（立即显示）</h4>
          <Space>
            <Enum moduleName="priority" name="high" />
            <Enum moduleName="priority" name="urgent">
              {(data) => <span style={{ color: "red" }}>{data.description}</span>}
            </Enum>
          </Space>
        </div>
      </Space>
    </PureGlobal>
  );
};

render(<AsyncEnumExample />);

```

- 格式化方式
- 展示不同的格式化方式和自定义渲染
- _Enum(@components/Enum),antd(antd),global(@components/Global)

```jsx
const { default: Enum } = _Enum;
const { PureGlobal } = global;
const { Space, Divider, Card } = antd;

const FormatEnumExample = () => {
  return (
    <PureGlobal
      preset={{
        locale: "zh-CN",
        enums: {
          orderStatus: [
            { value: "created", description: "已创建", color: "#666" },
            { value: "paid", description: "已支付", color: "#1890ff" },
            { value: "shipped", description: "已发货", color: "#52c41a" },
            { value: "completed", description: "已完成", color: "#52c41a" },
            { value: "cancelled", description: "已取消", color: "#f5222d" },
          ],
        },
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Card title="不同格式化方式" size="small">
          <Space direction="vertical">
            <div>
              <strong>默认格式（format="default"）：</strong>
              <Enum moduleName="orderStatus" name="paid" format="default" />
            </div>
            
            <Divider />
            
            <div>
              <strong>原始对象（format="origin"）：</strong>
              <Enum moduleName="orderStatus" name="paid" format="origin">
                {(data) => (
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                )}
              </Enum>
            </div>
            
            <Divider />
            
            <div>
              <strong>选项格式（format="option"）：</strong>
              <Enum moduleName="orderStatus" name="paid" format="option">
                {(data) => (
                  <span>label: {data.label}, value: {data.value}</span>
                )}
              </Enum>
            </div>
          </Space>
        </Card>
        
        <Card title="自定义渲染" size="small">
          <Space>
            <Enum moduleName="orderStatus" name="shipped" format="origin">
              {(data) => (
                <span style={{ color: data.color }}>
                  ● {data.description}
                </span>
              )}
            </Enum>
            
            <Enum moduleName="orderStatus" name="cancelled" format="origin">
              {(data) => (
                <span style={{ 
                  padding: "2px 8px",
                  backgroundColor: data.color,
                  color: "#fff",
                  borderRadius: "4px"
                }}>
                  {data.description}
                </span>
              )}
            </Enum>
          </Space>
        </Card>
      </Space>
    </PureGlobal>
  );
};

render(<FormatEnumExample />);

```

- 渲染枚举列表
- 将枚举列表渲染为各种表单组件
- _Enum(@components/Enum),antd(antd),global(@components/Global)

```jsx
const { default: Enum } = _Enum;
const { PureGlobal } = global;
const { Space, Select, Radio, Checkbox, Table } = antd;

const ListEnumExample = () => {
  return (
    <PureGlobal
      preset={{
        locale: "zh-CN",
        enums: {
          department: [
            { value: "tech", description: "技术部" },
            { value: "product", description: "产品部" },
            { value: "design", description: "设计部" },
            { value: "marketing", description: "市场部" },
            { value: "hr", description: "人力资源部" },
            { value: "finance", description: "财务部" },
          ],
          role: [
            { value: "admin", description: "管理员", level: 1 },
            { value: "manager", description: "经理", level: 2 },
            { value: "employee", description: "员工", level: 3 },
            { value: "intern", description: "实习生", level: 4 },
          ],
        },
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <h4>渲染为 Select 下拉框</h4>
          <Enum moduleName="department">
            {(list) => (
              <Select
                style={{ width: 200 }}
                placeholder="请选择部门"
                options={list.map((item) => ({
                  value: item.value,
                  label: item.description,
                }))}
              />
            )}
          </Enum>
        </div>
        
        <div>
          <h4>渲染为 Radio 单选组</h4>
          <Enum moduleName="role">
            {(list) => (
              <Radio.Group>
                {list.map((item) => (
                  <Radio key={item.value} value={item.value}>
                    {item.description}
                  </Radio>
                ))}
              </Radio.Group>
            )}
          </Enum>
        </div>
        
        <div>
          <h4>渲染为 Checkbox 多选组</h4>
          <Enum moduleName="department">
            {(list) => (
              <Checkbox.Group>
                {list.slice(0, 4).map((item) => (
                  <Checkbox key={item.value} value={item.value}>
                    {item.description}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            )}
          </Enum>
        </div>
        
        <div>
          <h4>渲染为 Table 表格</h4>
          <Enum moduleName="role" format="origin">
            {(list) => (
              <Table
                size="small"
                pagination={false}
                columns={[
                  { title: "编码", dataIndex: "value", key: "value" },
                  { title: "名称", dataIndex: "description", key: "description" },
                  { title: "级别", dataIndex: "level", key: "level" },
                ]}
                dataSource={list.map(item => ({ ...item, key: item.value }))}
              />
            )}
          </Enum>
        </div>
      </Space>
    </PureGlobal>
  );
};

render(<ListEnumExample />);

```

- 多枚举模块
- 同时获取多个枚举模块和错误处理
- _Enum(@components/Enum),antd(antd),global(@components/Global)

```jsx
const { default: Enum } = _Enum;
const { PureGlobal } = global;
const { Space, Card, Tag } = antd;

const MultiEnumExample = () => {
  return (
    <PureGlobal
      preset={{
        locale: "zh-CN",
        enums: {
          country: [
            { value: "CN", description: "中国" },
            { value: "US", description: "美国" },
            { value: "UK", description: "英国" },
            { value: "JP", description: "日本" },
          ],
          language: [
            { value: "zh-CN", description: "简体中文" },
            { value: "en-US", description: "英语" },
            { value: "ja-JP", description: "日语" },
            { value: "ko-KR", description: "韩语" },
          ],
          timezone: [
            { value: "UTC+8", description: "北京时间" },
            { value: "UTC+0", description: "格林威治时间" },
            { value: "UTC-5", description: "纽约时间" },
            { value: "UTC+9", description: "东京时间" },
          ],
        },
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Card title="同时获取多个枚举模块" size="small">
          <Enum moduleName={["country", "language", "timezone"]}>
            {([countries, languages, timezones]) => (
              <Space direction="vertical">
                <div>
                  <strong>国家列表：</strong>
                  <Space>
                    {countries.map(item => (
                      <Tag key={item.value}>{item.description}</Tag>
                    ))}
                  </Space>
                </div>
                <div>
                  <strong>语言列表：</strong>
                  <Space>
                    {languages.map(item => (
                      <Tag key={item.value} color="blue">{item.description}</Tag>
                    ))}
                  </Space>
                </div>
                <div>
                  <strong>时区列表：</strong>
                  <Space>
                    {timezones.map(item => (
                      <Tag key={item.value} color="green">{item.description}</Tag>
                    ))}
                  </Space>
                </div>
              </Space>
            )}
          </Enum>
        </Card>
        
        <Card title="组合使用多个枚举" size="small">
          <Space>
            <span>用户来自</span>
            <Enum moduleName="country" name="CN">
              {(data) => <strong>{data.description}</strong>}
            </Enum>
            <span>，使用</span>
            <Enum moduleName="language" name="zh-CN">
              {(data) => <strong>{data.description}</strong>}
            </Enum>
            <span>，时区为</span>
            <Enum moduleName="timezone" name="UTC+8">
              {(data) => <strong>{data.description}</strong>}
            </Enum>
          </Space>
        </Card>
        
        <Card title="错误处理" size="small">
          <Space direction="vertical">
            <div>
              <strong>不存在的枚举模块：</strong>
              <Enum 
                moduleName="notExist" 
                name="test"
                error={<span style={{ color: "red" }}>枚举加载失败</span>}
              />
            </div>
            <div>
              <strong>不存在的枚举值（显示占位符）：</strong>
              <Enum 
                moduleName="country" 
                name="XX"
                placeholder="未知国家"
              />
            </div>
          </Space>
        </Card>
      </Space>
    </PureGlobal>
  );
};

render(<MultiEnumExample />);

```


### API

## Enum 组件 API

### Enum（默认导出）

用于获取单个或多个枚举值的展示内容。

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| moduleName | 枚举模块名称，对应预设中配置的枚举名称 | string \| string[] | - |
| name | 枚举值，当提供时获取单个枚举项；不提供时获取整个枚举列表 | string \| number | - |
| format | 格式化方式：'default'返回描述文本，'origin'返回原始对象，'option'返回{label, value}格式 | 'default' \| 'origin' \| 'option' | 'default' |
| force | 是否强制刷新缓存，跳过缓存直接请求 | boolean | false |
| children | 子元素或渲染函数。函数接收(data, fetchApi)参数 | ReactNode \| Function | - |
| placeholder | 数据加载中时的占位内容 | ReactNode | '--' |
| error | 加载失败时的展示内容 | ReactNode \| Function | - |
| loading | 自定义加载中状态的展示 | ReactNode | - |

### EnumResource

用于获取完整的枚举列表资源。

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| moduleName | 枚举模块名称，支持数组以同时获取多个枚举 | string \| string[] | - |
| format | 格式化方式 | 'origin' \| 'option' \| 'default' | 'origin' |
| children | 渲染函数，接收枚举列表作为参数 | Function | - |
| placeholder | 数据加载中时的占位内容 | ReactNode | '--' |
| error | 加载失败时的展示内容 | ReactNode \| Function | - |
| loading | 自定义加载中状态的展示 | ReactNode | - |

### 枚举配置

枚举数据通过 `preset` 函数或 `PureGlobal/Global` 组件的 `preset.enums` 配置：

```javascript
// 全局配置
preset({
  base: {
    gender: () => [
      { value: 'M', description: '男' },
      { value: 'F', description: '女' }
    ]
  }
});

// 或通过 Global 组件配置
<PureGlobal preset={{
  enums: {
    status: async ({ language }) => {
      // 支持异步加载
      return [
        { value: '1', description: '启用' },
        { value: '0', description: '禁用' }
      ];
    }
  }
}}>
```

### 枚举项数据结构

| 字段名 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| value | 枚举值 | string \| number | 是 |
| description | 枚举描述文本 | string | 是 |
| translation | 多语言翻译对象 | object | 否 |

