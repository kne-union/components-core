# react-filter

### 描述

A React filter component library with multiple filter types, flexible layouts, and searchParams-based filter seeding.

### 安装

```shell
npm i --save @kne/react-filter
```

### 概述

### React Filter

一个功能强大的 React 筛选组件库，支持多种筛选字段类型、灵活的布局方式，以及从 searchParams 种子化筛选初始值的能力。

### 主要特性

- **多种筛选字段类型**：支持输入框、数字区间、日期选择、日期范围、下拉选择等常用筛选类型，以及职能、行业、城市等业务选择器
- **灵活布局**：支持普通筛选（横向布局）和高级筛选（垂直布局）两种模式
- **展开收起**：筛选行支持展开收起功能，优化页面空间利用
- **已选值展示**：自动展示已选筛选条件，支持单独删除和清空全部
- **弹出层交互**：支持弹出层形式的筛选交互，确认后才生效
- **searchParams 种子**：`useSearchParamsValue` 从 URL 平铺参数解析筛选初始值，可选清理已消费 key
- **稳定全局类名**：根 `react-filter`，内部短类名；用 `.react-filter .xxx` / `FILTER_CLASS` 定制
- **数据格式拦截器**：内置 `{id, name}` ↔ `{label, value}` 格式转换拦截器，适配 SuperSelect 场景
- **声明式值映射**：提供 `createFilterValueMapper` 按字段声明转换规则，简化 `getFilterValue` 结果处理
- **国际化支持**：内置中英文语言包，支持多语言切换
- **高阶组件**：提供 `withFilterValue` 和 `withFieldItem` 高阶组件，便于扩展自定义字段

### 适用场景

- 数据列表页面的筛选功能
- 复杂表单的筛选条件配置
- 多条件组合查询场景
- 需要展示已选筛选条件的场景
- 需要从 URL 参数带入初始筛选条件的页面

### 快速开始

```javascript
import Filter, { fields } from '@kne/react-filter';
import '@kne/react-filter/dist/index.css';

const { InputFilterItem, NumberRangeFilterItem, DatePickerFilterItem } = fields;

function MyComponent() {
  const [filterValue, setFilterValue] = useState([]);

  const handleSearch = () => {
    const params = Filter.getFilterValue(filterValue);
    console.log('筛选参数:', params);
  };

  return (
    <Filter
      value={filterValue}
      onChange={setFilterValue}
      list={[
        [
          { type: InputFilterItem, props: { name: 'keyword', label: '关键词' } },
          { type: NumberRangeFilterItem, props: { name: 'amount', label: '金额' } }
        ],
        [
          { type: DatePickerFilterItem, props: { name: 'date', label: '日期' } }
        ]
      ]}
      displayLine={1}
      extra={<Button type="primary" onClick={handleSearch}>搜索</Button>}
    />
  );
}
```

### 核心组件

| 组件 | 说明 |
|------|------|
| `Filter` | 主筛选组件，横向布局，支持展开收起 |
| `AdvancedFilter` | 高级筛选组件，垂直布局 |
| `FilterValueDisplay` | 已选值展示组件 |
| `PopoverItem` | 弹出层筛选项组件 |
| `FilterItem` | 筛选项容器组件 |
| `FilterLines` | 筛选行组件 |
| `FilterProvider` | 状态管理组件 |

### 筛选字段

| 字段组件 | 说明 |
|----------|------|
| `InputFilterItem` | 输入框筛选 |
| `NumberRangeFilterItem` | 数字区间筛选 |
| `DatePickerFilterItem` | 日期选择筛选 |
| `DateRangePickerFilterItem` | 日期范围筛选 |
| `TypeDateRangePickerFilterItem` | 类型日期范围筛选（日/周/月切换） |
| `SuperSelectFilterItem` | 通用选择器筛选（单选/多选/搜索/全选） |
| `SelectTableListFilterItem` | 表格选择器筛选（多列数据展示） |
| `SelectTreeFilterItem` | 树形选择器筛选（层级数据） |
| `SelectCascaderFilterItem` | 级联选择器筛选（父子关联、搜索过滤） |
| `SelectFunctionFilterItem` | 职能筛选（多级数据、拼音搜索） |
| `SelectIndustryFilterItem` | 行业筛选（多级数据、拼音搜索） |
| `SelectAddressFilterItem` | 城市筛选（国内外城市搜索） |

### searchParams 工具

| 工具 | 说明 |
|------|------|
| `useSearchParamsValue` | 从 searchParams 解析筛选初始值数组；可选 strip 已消费 key |


### 其他工具

| 工具 | 说明 |
|------|------|
| `FILTER_CLASS` | 稳定全局类名常量（根 `react-filter` + 内部短类名（无 `filter-` 前缀）），见 api.md |
| `pickSelectValues` | 从筛选值中提取原始值数组 |
| `createFilterValueMapper` | 声明式创建 mapFilterValue 函数 |
| `filterInterceptors` | `{single, multi}` 拦截器集合 |
| `singleSelectInterceptor` | 单选格式转换拦截器 |
| `multiSelectInterceptor` | 多选格式转换拦截器 |


### 示例

#### 示例代码

- 基础筛选
- 使用 Filter 主组件，展示关键词、金额、日期、部门等多种筛选字段的组合使用
- _ReactFilter(@kne/react-filter)[import * as _ReactFilter from "@kne/react-filter"],(@kne/react-filter/dist/index.css),antd(antd)

```jsx
const { default: Filter, fields } = _ReactFilter;
const {
  InputFilterItem, NumberRangeFilterItem, DatePickerFilterItem,
  DateRangePickerFilterItem, TypeDateRangePickerFilterItem,
  SuperSelectFilterItem, SelectFunctionFilterItem,
  SelectIndustryFilterItem, SelectAddressFilterItem
} = fields;
const { Flex, Button, message } = antd;
const { useState, useRef, useEffect } = React;

const departmentOptions = [
  { value: 'tech', label: '技术研发部' },
  { value: 'product', label: '产品设计部' },
  { value: 'operation', label: '运营管理部' },
  { value: 'hr', label: '人力资源部' },
  { value: 'finance', label: '财务部' },
  { value: 'marketing', label: '市场营销部' }
];

const filterList = [
  {
    type: InputFilterItem,
    props: { name: 'keyword', label: '关键词', placeholder: '请输入关键词搜索' }
  },
  {
    type: NumberRangeFilterItem,
    props: { name: 'amount', label: '金额', unit: '元', min: 0, max: 999999 }
  },
  {
    type: DatePickerFilterItem,
    props: { name: 'createTime', label: '创建时间', format: 'YYYY-MM-DD' }
  },
  {
    type: DateRangePickerFilterItem,
    props: { name: 'dateRange', label: '日期范围', format: 'YYYY-MM-DD' }
  },
  {
    type: TypeDateRangePickerFilterItem,
    props: { name: 'typeDateRange', label: '快捷日期' }
  },
  {
    type: SuperSelectFilterItem,
    props: { name: 'department', label: '部门', options: departmentOptions }
  },
  {
    type: SelectFunctionFilterItem,
    props: { name: 'function', label: '职能' }
  },
  {
    type: SelectIndustryFilterItem,
    props: { name: 'industry', label: '行业' }
  },
  {
    type: SelectAddressFilterItem,
    props: { name: 'city', label: '城市' }
  }
];

const ContainerWidthIndicator = ({ containerRef }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const update = () => setWidth(Math.round(el.clientWidth));
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  return (
    <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>
      中间容器宽度: {width}px（观察收起/更多时是否持续增大或跳动）
    </div>
  );
};

const BaseExample = () => {
  const [filterValue, setFilterValue] = useState([]);
  const filterContainerRef = useRef(null);

  const handleSearch = () => {
    const params = Filter.getFilterValue(filterValue);
    message.info(&#96;搜索参数: ${JSON.stringify(params, null, 2)}&#96;);
    console.log('筛选参数:', params);
  };

  return (
    <Flex vertical gap={16} style={{ width: '100%' }}>
      <div style={{ width: '100%' }}>
        <ContainerWidthIndicator containerRef={filterContainerRef} />
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 8
          }}
        >
          <Button>左侧操作</Button>
          <div
            ref={filterContainerRef}
            style={{
              flex: 1,
              minWidth: 0,
              overflow: 'hidden',
              border: '1px dashed #d9d9d9',
              borderRadius: 4
            }}
          >
            <Filter value={filterValue} onChange={setFilterValue} list={filterList} />
          </div>
          <Button type="primary" onClick={handleSearch}>
            搜索
          </Button>
        </div>
      </div>
      <Flex gap={8}>
        <span>当前筛选值:</span>
        <pre style={{ margin: 0, background: '#f5f5f5', padding: 8, borderRadius: 4, flex: 1 }}>{JSON.stringify(filterValue, null, 2)}</pre>
      </Flex>
    </Flex>
  );
};

render(<BaseExample />);

```

- searchParamsValue
- useSearchParamsValue 从平铺 URL 参数解析筛选初始值，可选清理已消费 key；Filter value/onChange 由业务自行 seed
- _ReactFilter(@kne/react-filter)[import * as _ReactFilter from "@kne/react-filter"],(@kne/react-filter/dist/index.css),antd(antd)

```jsx
const { default: Filter, fields, useSearchParamsValue, getFilterValue } = _ReactFilter;
const { InputFilterItem } = fields;
const { Flex, Typography, Card } = antd;
const { useState, useMemo } = React;

/**
 * 示例：用 mock URLSearchParams 演示 useSearchParamsValue。
 * 真实环境请使用 react-router 的 useSearchParams。
 *
 * hook 只在首次挂载时解析一次；传入 setSearchParams 后会清理已消费 key。
 * Filter 的 value/onChange 由业务自行 seed / 管理。
 */
const BaseExample = () => {
  const initialSearch = useMemo(() => {
    const params = new URLSearchParams();
    params.set('userId', 'u-1001');
    params.set('tenantOrgId', 'org-1');
    params.set('tenantOrgName', '技术部');
    return params;
  }, []);

  const [searchParams, setSearchParams] = useState(initialSearch);

  const searchParamsValue = useSearchParamsValue({
    searchParams,
    setSearchParams,
    fields: [
      { name: 'userId', label: '用户Id' },
      { name: 'tenantOrgId', label: '部门', labelKey: 'tenantOrgName' }
    ]
  });

  const [filter, setFilter] = useState(searchParamsValue);

  return (
    <Flex vertical gap={16}>
      <Card size="small" title="说明">
        <Typography.Paragraph style={{ marginBottom: 8 }}>
          模拟进入页时 URL 为{' '}
          <Typography.Text code>
            ?userId=u-1001&amp;tenantOrgId=org-1&amp;tenantOrgName=技术部
          </Typography.Text>
          。hook 同步解析为 <Typography.Text code>searchParamsValue</Typography.Text>，并用{' '}
          <Typography.Text code>useState(searchParamsValue)</Typography.Text> seed 到 Filter。
          配置了 <Typography.Text code>labelKey</Typography.Text> 的字段会用对应 URL 参数作为选中值展示文案。
        </Typography.Paragraph>
        <Typography.Text type="secondary">
          传入 <Typography.Text code>setSearchParams</Typography.Text> 后，mount 会以 replace
          清掉已消费 key（含 labelKey，下方 URL 应变空）；之后改 URL 不会再次解析，需自行重新挂载或业务侧处理。
        </Typography.Text>
      </Card>
      <Card size="small" title="当前 URL search（模拟，strip 后）">
        <Typography.Text code>?{searchParams.toString() || '(已清空已消费参数)'}</Typography.Text>
      </Card>
      <Card size="small" title="searchParamsValue（仅首次解析，用于 seed）">
        <pre style={{ margin: 0, fontSize: 12 }}>{JSON.stringify(searchParamsValue, null, 2)}</pre>
      </Card>
      <Filter
        value={filter}
        onChange={value => {
          setFilter(value);
          console.log('filter onChange', getFilterValue(value));
        }}
        list={[
          [
            { type: InputFilterItem, props: { name: 'userId', label: '用户Id' } },
            { type: InputFilterItem, props: { name: 'tenantOrgId', label: '部门' } },
            { type: InputFilterItem, props: { name: 'keyword', label: '关键词' } }
          ]
        ]}
        displayLine={1}
      />
    </Flex>
  );
};

render(<BaseExample />);

```

- 定制 className
- 通过稳定全局类名（根 react-filter + 内部短类名）用 CSS 选择器定制 Filter 内部样式；可用 FILTER_CLASS 引用类名
- _ReactFilter(@kne/react-filter)[import * as _ReactFilter from "@kne/react-filter"],(@kne/react-filter/dist/index.css),antd(antd)

```jsx
const { default: Filter, fields, FILTER_CLASS, getFilterValue } = _ReactFilter;
const { InputFilterItem, SuperSelectFilterItem } = fields;
const { Flex, Button, Typography, Card, Space } = antd;
const { useState, useEffect } = React;

const statusOptions = [
  { value: 'open', label: '开启' },
  { value: 'closed', label: '关闭' }
];

/**
 * 用稳定全局类名定制 Filter 内部样式。
 * 根：react-filter；内部短类名；选择器写 .react-filter .xxx
 */
const CUSTOM_CSS = &#96;
.demo-filter-skin.${FILTER_CLASS.root} .${FILTER_CLASS.title} {
  padding: 12px 16px;
  background: #f7f9fc;
  border-bottom-color: #d6e4ff;
}
.demo-filter-skin.${FILTER_CLASS.root} .${FILTER_CLASS.label} {
  color: #1d39c4;
  font-weight: 600;
}
.demo-filter-skin.${FILTER_CLASS.root} .${FILTER_CLASS.item} {
  border-radius: 6px;
  border-color: #adc6ff;
}
.demo-filter-skin.${FILTER_CLASS.root} .${FILTER_CLASS.item}.${FILTER_CLASS.itemActive} {
  color: #1d39c4;
  border-color: #2f54eb;
  background: #f0f5ff;
}
.demo-filter-skin.${FILTER_CLASS.root} .${FILTER_CLASS.valueDisplay} {
  background: #fcfcff;
}
.demo-filter-skin.${FILTER_CLASS.root} .${FILTER_CLASS.valueTag} {
  border-radius: 4px;
  border-color: #adc6ff;
  background: #f0f5ff;
  color: #1d39c4;
}
.demo-filter-skin.${FILTER_CLASS.root} .${FILTER_CLASS.valueClear} {
  border-radius: 4px;
  color: #1d39c4;
  border-color: #adc6ff;
}
&#96;;

const BaseExample = () => {
  const [filter, setFilter] = useState([
    { name: 'status', label: '状态', value: { label: '开启', value: 'open' } }
  ]);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.setAttribute('data-demo', 'filter-classname');
    styleEl.textContent = CUSTOM_CSS;
    document.head.appendChild(styleEl);
    return () => {
      styleEl.remove();
    };
  }, []);

  return (
    <Flex vertical gap={16}>
      <Card size="small" title="说明">
        <Typography.Paragraph style={{ marginBottom: 8 }}>
          根挂 <Typography.Text code>{FILTER_CLASS.root}</Typography.Text>
          ，内部短类名如 <Typography.Text code>{FILTER_CLASS.title}</Typography.Text> /{' '}
          <Typography.Text code>{FILTER_CLASS.item}</Typography.Text>。用{' '}
          <Typography.Text code>.{FILTER_CLASS.root} .{FILTER_CLASS.item}</Typography.Text> 定制。
        </Typography.Paragraph>
        <Typography.Text type="secondary">
          本示例额外加了 <Typography.Text code>demo-filter-skin</Typography.Text> 作为页面作用域，避免污染其他示例。
        </Typography.Text>
      </Card>
      <Filter
        className="demo-filter-skin"
        value={filter}
        onChange={setFilter}
        list={[
          [
            { type: InputFilterItem, props: { name: 'keyword', label: '关键词', placeholder: '搜索' } },
            {
              type: SuperSelectFilterItem,
              props: {
                name: 'status',
                label: '状态',
                single: true,
                isPopup: true,
                options: statusOptions
              }
            },
            { type: InputFilterItem, props: { name: 'owner', label: '负责人' } }
          ]
        ]}
        displayLine={1}
        extra={
          <Button
            type="primary"
            onClick={() => {
              console.log(getFilterValue(filter));
            }}
          >
            搜索
          </Button>
        }
      />
      <Space>
        <Typography.Text type="secondary">当前筛选参数：</Typography.Text>
        <Typography.Text code>{JSON.stringify(getFilterValue(filter))}</Typography.Text>
      </Space>
    </Flex>
  );
};

render(<BaseExample />);

```

- 高级筛选
- 使用 AdvancedFilter 组件实现更复杂的筛选布局
- _ReactFilter(@kne/react-filter)[import * as _ReactFilter from "@kne/react-filter"],(@kne/react-filter/dist/index.css),antd(antd)

```jsx
const { AdvancedFilter } = _ReactFilter;
const { InputFilterItem, ListFilterItem, CityFilterItem } = AdvancedFilter.fields;
const { Flex, Button, message } = antd;
const { useState } = React;

const AdvancedFilterExample = () => {
  const [filterValue, setFilterValue] = useState([]);

  const handleSearch = () => {
    const params = {};
    filterValue.forEach(item => {
      params[item.name] = Array.isArray(item.value)
        ? item.value.map(v => v.value)
        : item.value?.value;
    });
    message.info(&#96;搜索参数: ${JSON.stringify(params, null, 2)}&#96;);
    console.log('筛选参数:', params);
  };

  return (
    <Flex vertical gap={16}>
      <AdvancedFilter
        value={filterValue}
        onChange={setFilterValue}
        list={[
          [
            {
              type: InputFilterItem,
              props: {
                name: 'name',
                label: '姓名'
              }
            },
            {
              type: InputFilterItem,
              props: {
                name: 'phone',
                label: '手机号'
              }
            }
          ],
          [
            {
              type: ListFilterItem,
              props: {
                name: 'status',
                label: '状态',
                single: true,
                items: [
                  { label: '待处理', value: 'pending' },
                  { label: '处理中', value: 'processing' },
                  { label: '已完成', value: 'completed' },
                  { label: '已取消', value: 'cancelled' }
                ]
              }
            }
          ],
          [
            {
              type: ListFilterItem,
              props: {
                name: 'tags',
                label: '标签',
                single: false,
                maxLength: 3,
                items: [
                  { label: '前端', value: 'frontend' },
                  { label: '后端', value: 'backend' },
                  { label: '全栈', value: 'fullstack' },
                  { label: 'UI设计', value: 'ui' },
                  { label: '产品', value: 'product' }
                ]
              }
            }
          ],
          [
            {
              type: CityFilterItem,
              props: {
                name: 'city',
                label: '城市',
                maxLength: 3
              }
            }
          ]
        ]}
      />
      <Flex justify="end">
        <Button type="primary" onClick={handleSearch}>
          查询
        </Button>
      </Flex>
      <Flex gap={8}>
        <span>当前筛选值:</span>
        <pre style={{ margin: 0, background: '#f5f5f5', padding: 8, borderRadius: 4, flex: 1 }}>
          {JSON.stringify(filterValue, null, 2)}
        </pre>
      </Flex>
    </Flex>
  );
};

render(<AdvancedFilterExample />);

```

- 筛选字段组件
- 展示所有筛选字段组件类型，包括输入框筛选、数字区间、日期选择、下拉选择以及 SuperSelect 选择器（列表/表格/树形/级联）和业务选择器（职能/行业/城市）
- _ReactFilter(@kne/react-filter)[import * as _ReactFilter from "@kne/react-filter"],(@kne/react-filter/dist/index.css),antd(antd)

```jsx
const { fields, PopoverItem } = _ReactFilter;
const {
  InputFilterItem, NumberRangeFilterItem, DatePickerFilterItem,
  DateRangePickerFilterItem, TypeDateRangePickerFilterItem,
  SuperSelectFilterItem, SelectTableListFilterItem, SelectTreeFilterItem, SelectCascaderFilterItem,
  SelectFunctionFilterItem, SelectIndustryFilterItem, SelectAddressFilterItem
} = fields;
const { Input, InputNumber, Space, Flex, Select, Divider, Tag } = antd;
const { useState } = React;

// 自定义下拉选择筛选项
const SelectFilterItem = ({ label, value, onChange, options = [] }) => {
  return (
    <PopoverItem
      label={label}
      value={value}
      onChange={onChange}
    >
      {({ value, onChange }) => (
        <Select
          style={{ width: 200 }}
          placeholder={&#96;请选择${label}&#96;}
          value={value?.value}
          onChange={(val, option) => {
            onChange({
              value: val,
              label: option?.label || val
            });
          }}
          options={options}
        />
      )}
    </PopoverItem>
  );
};

const FilterFieldsExample = () => {
  const [values, setValues] = useState({});

  const fieldConfigs = [
    {
      name: 'input',
      label: '输入筛选',
      component: InputFilterItem,
      props: {}
    },
    {
      name: 'numberRange',
      label: '数字区间',
      component: NumberRangeFilterItem,
      props: { unit: '万', min: 0 }
    },
    {
      name: 'date',
      label: '日期选择',
      component: DatePickerFilterItem,
      props: { picker: 'date' }
    },
    {
      name: 'month',
      label: '月份选择',
      component: DatePickerFilterItem,
      props: { picker: 'month' }
    },
    {
      name: 'dateRange',
      label: '日期范围',
      component: DateRangePickerFilterItem,
      props: {}
    },
    {
      name: 'typeDateRange',
      label: '类型日期范围',
      component: TypeDateRangePickerFilterItem,
      props: {}
    },
    {
      name: 'select',
      label: '下拉选择',
      component: SelectFilterItem,
      props: {
        options: [
          { value: 'pending', label: '待处理' },
          { value: 'processing', label: '处理中' },
          { value: 'completed', label: '已完成' },
          { value: 'cancelled', label: '已取消' }
        ]
      }
    }
  ];

  return (
    <Flex vertical gap={24}>
      <h4>筛选字段组件展示</h4>
      <Flex wrap gap={16}>
        {fieldConfigs.map(({ name, label, component: Component, props }) => (
          <Component
            key={name}
            label={label}
            value={values[name]}
            onChange={(val) => setValues(prev => ({ ...prev, [name]: val }))}
            {...props}
          />
        ))}
      </Flex>
      <Flex gap={8}>
        <span>当前值:</span>
        <pre style={{ margin: 0, background: '#f5f5f5', padding: 8, borderRadius: 4, flex: 1 }}>
          {JSON.stringify(values, null, 2)}
        </pre>
      </Flex>
    </Flex>
  );
};

// SuperSelect 业务选择器示例
const departmentOptions = [
  { value: 'tech', label: '技术研发部' },
  { value: 'product', label: '产品设计部' },
  { value: 'operation', label: '运营管理部' },
  { value: 'hr', label: '人力资源部' },
  { value: 'finance', label: '财务部' },
  { value: 'marketing', label: '市场营销部' }
];

const SuperSelectExample = () => {
  const [values, setValues] = useState({});

  return (
    <Flex vertical gap={24}>
      <Flex align="center" gap={8}>
        <h4 style={{ margin: 0 }}>SuperSelect 业务选择器</h4>
        <Tag color="blue">单选/多选</Tag>
        <Tag color="blue">搜索</Tag>
        <Tag color="blue">全选</Tag>
      </Flex>
      <p style={{ margin: 0, color: '#666', fontSize: 12 }}>
        基于 @kne/super-select 的通用选择器筛选项，支持单选/多选、搜索、全选等功能
      </p>
      <Flex wrap gap={16}>
        <SuperSelectFilterItem
          label="部门（多选）"
          value={values.dept}
          onChange={(val) => setValues(prev => ({ ...prev, dept: val }))}
          options={departmentOptions}
        />
        <SuperSelectFilterItem
          label="状态（单选）"
          single
          value={values.status}
          onChange={(val) => setValues(prev => ({ ...prev, status: val }))}
          options={[
            { value: 'active', label: '启用' },
            { value: 'inactive', label: '停用' }
          ]}
        />
        <SuperSelectFilterItem
          label="角色（全选）"
          value={values.role}
          onChange={(val) => setValues(prev => ({ ...prev, role: val }))}
          options={[
            { value: 'admin', label: '管理员' },
            { value: 'editor', label: '编辑者' },
            { value: 'viewer', label: '查看者' }
          ]}
          allowSelectedAll
        />
      </Flex>
      <pre style={{ margin: 0, background: '#f5f5f5', padding: 8, borderRadius: 4 }}>
        {JSON.stringify(values, null, 2)}
      </pre>
    </Flex>
  );
};

// SuperSelect 其他选择组件示例（表格/树形/级联）
const employeeOptions = [
  { id: 'emp_1', name: '张三', department: '技术研发部', position: '工程师' },
  { id: 'emp_2', name: '李四', department: '产品设计部', position: '设计师' },
  { id: 'emp_3', name: '王五', department: '运营部', position: '经理' },
  { id: 'emp_4', name: '赵六', department: '市场部', position: '专员' },
  { id: 'emp_5', name: '钱七', department: '技术研发部', position: '工程师' }
];

const employeeColumns = [
  { name: 'name', title: '姓名', span: 8 },
  { name: 'department', title: '部门', span: 8 },
  { name: 'position', title: '职位', span: 8 }
];

const organizationTree = [
  { id: 'root', parentId: null, name: '集团总部' },
  { id: 'tech', parentId: 'root', name: '技术中心' },
  { id: 'tech-fe', parentId: 'tech', name: '前端开发组' },
  { id: 'tech-be', parentId: 'tech', name: '后端开发组' },
  { id: 'product', parentId: 'root', name: '产品中心' },
  { id: 'product-design', parentId: 'product', name: '产品设计组' }
];

const regionData = [
  {
    id: 'beijing',
    name: '北京市',
    children: [
      { id: 'haidian', name: '海淀区' },
      { id: 'chaoyang', name: '朝阳区' }
    ]
  },
  {
    id: 'guangdong',
    name: '广东省',
    children: [
      {
        id: 'guangzhou',
        name: '广州市',
        children: [
          { id: 'tianhe', name: '天河区' },
          { id: 'yuexiu', name: '越秀区' }
        ]
      },
      {
        id: 'shenzhen',
        name: '深圳市',
        children: [
          { id: 'nanshan', name: '南山区' },
          { id: 'futian', name: '福田区' }
        ]
      }
    ]
  }
];

const SuperSelectVariantsExample = () => {
  const [values, setValues] = useState({});

  return (
    <Flex vertical gap={24}>
      <Flex align="center" gap={8}>
        <h4 style={{ margin: 0 }}>SuperSelect 其他选择组件</h4>
        <Tag color="blue">表格</Tag>
        <Tag color="blue">树形</Tag>
        <Tag color="blue">级联</Tag>
      </Flex>
      <p style={{ margin: 0, color: '#666', fontSize: 12 }}>
        基于 @kne/super-select 的表格、树形、级联选择器筛选项，适用于多列数据、层级结构、级联数据等场景
      </p>
      <Flex wrap gap={16}>
        <SelectTableListFilterItem
          label="员工（表格多选）"
          value={values.employee}
          onChange={(val) => setValues(prev => ({ ...prev, employee: val }))}
          options={employeeOptions}
          columns={employeeColumns}
          valueKey="id"
          labelKey="name"
        />
        <SelectTreeFilterItem
          label="部门（树形多选）"
          value={values.department}
          onChange={(val) => setValues(prev => ({ ...prev, department: val }))}
          options={organizationTree}
          valueKey="id"
          labelKey="name"
        />
        <SelectCascaderFilterItem
          label="地区（级联多选）"
          value={values.region}
          onChange={(val) => setValues(prev => ({ ...prev, region: val }))}
          options={regionData}
          valueKey="id"
          labelKey="name"
        />
        <SelectCascaderFilterItem
          label="地区（级联单选）"
          single
          value={values.singleRegion}
          onChange={(val) => setValues(prev => ({ ...prev, singleRegion: val }))}
          options={regionData}
          valueKey="id"
          labelKey="name"
        />
      </Flex>
      <pre style={{ margin: 0, background: '#f5f5f5', padding: 8, borderRadius: 4 }}>
        {JSON.stringify(values, null, 2)}
      </pre>
    </Flex>
  );
};

// 业务选择器示例（职能/行业/城市）
const BusinessSelectExample = () => {
  const [values, setValues] = useState({});

  return (
    <Flex vertical gap={24}>
      <Flex align="center" gap={8}>
        <h4 style={{ margin: 0 }}>业务选择器筛选项</h4>
        <Tag color="blue">多级数据</Tag>
        <Tag color="blue">拼音搜索</Tag>
        <Tag color="blue">国际化</Tag>
      </Flex>
      <p style={{ margin: 0, color: '#666', fontSize: 12 }}>
        基于 @kne/super-select-plus 的职能、行业、城市选择器，支持多级数据、拼音搜索、国际化
      </p>
      <Flex wrap gap={16}>
        <SelectFunctionFilterItem
          label="职能"
          value={values.function}
          onChange={(val) => setValues(prev => ({ ...prev, function: val }))}
        />
        <SelectIndustryFilterItem
          label="行业"
          value={values.industry}
          onChange={(val) => setValues(prev => ({ ...prev, industry: val }))}
        />
        <SelectAddressFilterItem
          label="城市（多选）"
          value={values.city}
          onChange={(val) => setValues(prev => ({ ...prev, city: val }))}
        />
        <SelectAddressFilterItem
          label="城市（单选）"
          single
          value={values.singleCity}
          onChange={(val) => setValues(prev => ({ ...prev, singleCity: val }))}
        />
      </Flex>
    </Flex>
  );
};

const FilterFieldsDemo = () => (
  <Flex vertical>
    <FilterFieldsExample />
    <Divider />
    <SuperSelectExample />
    <Divider />
    <SuperSelectVariantsExample />
    <Divider />
    <BusinessSelectExample />
  </Flex>
);

render(<FilterFieldsDemo />);

```

- 搜索输入
- 使用 SearchInput 实现顶部关键词搜索，输入停止 500ms 后自动提交筛选值，输入法组合输入完成后才开始触发搜索
- _ReactFilter(@kne/react-filter)[import * as _ReactFilter from "@kne/react-filter"],(@kne/react-filter/dist/index.css),antd(antd)

```jsx
const { SearchInput, FilterProvider, getFilterValue } = _ReactFilter;
const { Flex, Button, Typography, message } = antd;
const { useState } = React;

const SearchInputExample = () => {
  const [filterValue, setFilterValue] = useState([]);

  const handleSearch = () => {
    const params = getFilterValue(filterValue);
    message.info(&#96;搜索参数: ${JSON.stringify(params)}&#96;);
    console.log('搜索参数:', params);
  };

  return (
    <Flex vertical gap={16}>
      <Typography.Title level={4}>SearchInput 搜索输入</Typography.Title>
      <Typography.Paragraph style={{ margin: 0 }}>
        输入停止 500ms 后自动写入筛选值并触发搜索；中文等输入法组合输入期间不会触发搜索，确认文本后才开始计时。按回车或点击搜索按钮会立即提交。 清空后也会在 500ms 后移除该筛选条件。
      </Typography.Paragraph>
      <FilterProvider value={filterValue} onChange={setFilterValue}>
        <Flex gap={8} align="center">
          <SearchInput name="keyword" label="关键词" placeholder="请输入关键词" style={{ width: 320 }} allowClear />
          <Button type="primary" onClick={handleSearch}>
            查看搜索参数
          </Button>
        </Flex>
      </FilterProvider>
      <Flex gap={8}>
        <span>当前筛选值:</span>
        <pre style={{ margin: 0, background: '#f5f5f5', padding: 8, borderRadius: 4, flex: 1 }}>{JSON.stringify(filterValue, null, 2)}</pre>
      </Flex>
    </Flex>
  );
};

render(<SearchInputExample />);

```

- 已选值展示
- 使用 FilterValueDisplay 组件展示已选择的筛选条件，支持单独删除和清空全部
- _ReactFilter(@kne/react-filter)[import * as _ReactFilter from "@kne/react-filter"],(@kne/react-filter/dist/index.css),antd(antd)

```jsx
const { FilterValueDisplay } = _ReactFilter;
const { Flex } = antd;
const { useState } = React;

const FilterValueDisplayExample = () => {
  const [filterValue, setFilterValue] = useState([
    { name: 'keyword', label: '关键词', value: { label: 'React', value: 'React' } },
    { name: 'status', label: '状态', value: { label: '已完成', value: 'completed' } },
    { name: 'amount', label: '金额', value: { label: '100-500万', value: [100, 500] } },
    {
      name: 'tags',
      label: '标签',
      value: [
        { label: '前端', value: 'frontend' },
        { label: 'React', value: 'react' }
      ]
    }
  ]);

  return (
    <Flex vertical gap={16}>
      <h4>已选筛选条件展示</h4>
      <FilterValueDisplay
        value={filterValue}
        onChange={setFilterValue}
        extraExpand={
          <span style={{ fontSize: 12, color: '#999' }}>
            共 {filterValue.length} 项
          </span>
        }
      />
      <Flex gap={8}>
        <span>当前值:</span>
        <pre style={{ margin: 0, background: '#f5f5f5', padding: 8, borderRadius: 4, flex: 1 }}>
          {JSON.stringify(filterValue, null, 2)}
        </pre>
      </Flex>
    </Flex>
  );
};

render(<FilterValueDisplayExample />);

```

- 弹出层筛选
- 使用 PopoverItem 组件实现弹出层形式的筛选项，支持文本输入、数字输入、下拉选择和数值范围等多种交互形式
- _ReactFilter(@kne/react-filter)[import * as _ReactFilter from "@kne/react-filter"],(@kne/react-filter/dist/index.css),antd(antd)

```jsx
const { PopoverItem } = _ReactFilter;
const { Input, InputNumber, Space, Select, Radio, Flex } = antd;
const { useState } = React;

const PopoverItemExample = () => {
  const [inputValue, setInputValue] = useState(null);
  const [numberValue, setNumberValue] = useState(null);
  const [selectValue, setSelectValue] = useState(null);
  const [rangeValue, setRangeValue] = useState(null);

  return (
    <Flex vertical gap={24}>
      <h4>弹出层筛选组件示例</h4>
      <Flex wrap gap={16}>
        {/* 输入框筛选 */}
        <PopoverItem
          label="文本输入"
          value={inputValue}
          onChange={setInputValue}
        >
          {({ value, onChange }) => (
            <Input
              style={{ width: 240 }}
              placeholder="请输入文本"
              value={value?.value || ''}
              onChange={(e) => onChange(
                e.target.value ? { label: e.target.value, value: e.target.value } : null
              )}
            />
          )}
        </PopoverItem>

        {/* 数字输入筛选 */}
        <PopoverItem
          label="数字输入"
          value={numberValue}
          onChange={setNumberValue}
          onValidate={(val) => val?.value !== undefined}
        >
          {({ value, onChange }) => (
            <InputNumber
              style={{ width: 240 }}
              placeholder="请输入数字"
              value={value?.value}
              onChange={(val) => onChange(
                val !== null ? { label: String(val), value: val } : null
              )}
            />
          )}
        </PopoverItem>

        {/* 下拉选择筛选 */}
        <PopoverItem
          label="状态选择"
          value={selectValue}
          onChange={setSelectValue}
        >
          {({ value, onChange }) => (
            <Select
              style={{ width: 240 }}
              placeholder="请选择状态"
              value={value?.value}
              onChange={(val, option) => onChange({
                value: val,
                label: option?.label || val
              })}
              options={[
                { value: 'active', label: '激活' },
                { value: 'inactive', label: '未激活' },
                { value: 'pending', label: '待处理' }
              ]}
            />
          )}
        </PopoverItem>

        {/* 数字范围筛选 */}
        <PopoverItem
          label="数值范围"
          value={rangeValue}
          onChange={setRangeValue}
          onValidate={(val) => {
            const range = val?.value;
            return !(range && range[0] !== undefined && range[1] !== undefined && range[1] < range[0]);
          }}
        >
          {({ value, onChange }) => (
            <Space.Compact>
              <InputNumber
                style={{ width: 100 }}
                placeholder="最小值"
                value={value?.value?.[0]}
                onChange={(val) => onChange({
                  label: &#96;${val || '?'}-${value?.value?.[1] || '?'}&#96;,
                  value: [val, value?.value?.[1]]
                })}
              />
              <Input
                style={{ width: 30, textAlign: 'center', borderLeft: 0, borderRight: 0 }}
                placeholder="~"
                disabled
              />
              <InputNumber
                style={{ width: 100 }}
                placeholder="最大值"
                value={value?.value?.[1]}
                onChange={(val) => onChange({
                  label: &#96;${value?.value?.[0] || '?'}-${val || '?'}&#96;,
                  value: [value?.value?.[0], val]
                })}
              />
            </Space.Compact>
          )}
        </PopoverItem>
      </Flex>

      <Flex vertical gap={8}>
        <h5>当前值:</h5>
        <pre style={{ margin: 0, background: '#f5f5f5', padding: 12, borderRadius: 4 }}>
          {JSON.stringify({
            文本输入: inputValue,
            数字输入: numberValue,
            状态选择: selectValue,
            数值范围: rangeValue
          }, null, 2)}
        </pre>
      </Flex>
    </Flex>
  );
};

render(<PopoverItemExample />);

```

### API

### Filter 主组件

筛选组件，用于展示筛选项和处理筛选条件。

#### 属性

| 属性         | 类型                                                 | 默认值   | 说明                           |
| ------------ | ---------------------------------------------------- | -------- | ------------------------------ |
| value        | `Array<{ name: string, label: string, value: any }>` | -        | 筛选值数组                     |
| defaultValue | `Array<{ name: string, label: string, value: any }>` | `[]`     | 默认筛选值                     |
| onChange     | `(value: Array) => void`                             | -        | 筛选值变化回调                 |
| list         | `Array<Array>`                                       | `[]`     | 筛选项配置数组，支持多行       |
| displayLine  | `number`                                             | `1`      | 默认展示的行数，超出部分折叠   |
| label        | `string`                                             | `'筛选'` | 筛选区域标题                   |
| extra        | `ReactNode`                                          | -        | 额外操作区域，通常放置搜索按钮 |
| extraExpand  | `ReactNode`                                          | -        | 已选区域额外内容               |
| className    | `string`                                             | -        | 挂到根容器的自定义类名；内部节点见「稳定全局类名」 |

#### 静态方法

| 方法                                                        | 说明                                                                |
| ----------------------------------------------------------- | ------------------------------------------------------------------- |
| `Filter.getFilterValue(filterValue)`                        | 将筛选值数组转换为参数对象，如 `{ name: value }`                    |
| `Filter.useFilter()`                                        | 获取 Filter Context，返回 `{ value, onChange }`                     |
| `Filter.pickSelectValues(value)`                            | 从筛选值中提取原始值数组，支持 `{ value }`、`{ id }` 格式           |
| `Filter.createFilterValueMapper(fieldMappers)`              | 声明式创建 mapFilterValue 函数，按字段映射转换规则                  |
| `Filter.useSearchParamsValue(options)`                      | 从 searchParams 解析筛选初始值数组；可选 strip 已消费 URL key       |
| `Filter.filterInterceptors.single`                          | 单选拦截器：`{id, name}` ↔ `{label, value}` 数据格式转换            |
| `Filter.filterInterceptors.multi`                           | 多选拦截器：`[{id, name}]` ↔ `[{label, value}]` 数据格式转换        |
| `Filter.FILTER_CLASS`                                       | 稳定全局类名常量对象，见下方「稳定全局类名」                         |

#### 稳定全局类名

根节点挂 `react-filter`；内部节点挂短类名（与 CSS Modules 默认样式并行）。调用方用 **`.react-filter .xxx`** 限定作用域定制；`className` 仍只挂根。命名可通过 `FILTER_CLASS` / `Filter.FILTER_CLASS` 引用。

| 常量键 | 类名 | 节点 |
|--------|------|------|
| `root` | `react-filter` | 根容器 |
| `isMobile` | `is-mobile` | 移动端根修饰 |
| `title` | `title` | 筛选项标题行 |
| `label` | `label` | 行标题文案（筛选 / 已选 / 更多） |
| `list` | `list` | 筛选项列表区 |
| `listScrollWrap` | `list-scroll-wrap` | 列表滚动外层 |
| `listScroll` | `list-scroll` | 列表滚动容器 |
| `line` | `line` | 筛选项行 |
| `extra` | `extra` | 行右侧 extra |
| `more` | `more` | 「更多」按钮 |
| `moreRow` | `more-row` | 展开后的更多行 |
| `children` | `children` | FilterLines children 行 |
| `itemWrap` | `item-wrap` | 筛选项外层 |
| `item` | `item` | 筛选项 |
| `itemActive` | `is-active` | 筛选项激活（挂在 item 上） |
| `itemVisited` | `is-visited` | 筛选项打开中（挂在 item 上） |
| `itemLabel` | `item-label` | 筛选项标签 |
| `itemIcon` | `item-icon` | 筛选项箭头 |
| `itemField` | `item-field` | 筛选项字段区 |
| `valueDisplay` | `value-display` | 已选值展示根 |
| `valueTag` | `value-tag` | 已选 Tag |
| `valueTagLabel` | `value-tag-label` | Tag 字段名 |
| `valueTagContent` | `value-tag-content` | Tag 值文案 |
| `valueActions` | `value-actions` | 已选操作区 |
| `valueClear` | `value-clear` | 清空按钮 |
| `valueToggle` | `value-toggle` | 展开/收起按钮 |
| `advanced` | `advanced` | AdvancedFilter 内容区 |

**迁移：** 根由裸 `filter` 改为 `react-filter`；内部类名去掉 `filter-` / `react-filter-` 前缀（如原 `filter-title` → `title`，在 `.react-filter` 下使用）。

```css
.react-filter .title { padding: 12px 0; }
.react-filter .item.is-active { color: var(--primary-color); }
.react-filter .value-tag { border-radius: 4px; }
```

```javascript
import { FILTER_CLASS } from '@kne/react-filter';
// `.${FILTER_CLASS.root} .${FILTER_CLASS.item}`
```

#### 使用示例

```javascript
import Filter, { fields } from '@kne/react-filter';

const { InputFilterItem, NumberRangeFilterItem } = fields;

<Filter
  value={filterValue}
  onChange={setFilterValue}
  list={[
    [
      { type: InputFilterItem, props: { name: 'keyword', label: '关键词' } },
      { type: NumberRangeFilterItem, props: { name: 'amount', label: '金额' } }
    ]
  ]}
  displayLine={1}
  extra={<Button type="primary">搜索</Button>}
/>;
```

---

### AdvancedFilter 高级筛选组件

高级筛选组件，用于更复杂的筛选场景，采用垂直布局。

#### 属性

| 属性         | 类型                                                 | 默认值 | 说明             |
| ------------ | ---------------------------------------------------- | ------ | ---------------- |
| value        | `Array<{ name: string, label: string, value: any }>` | -      | 筛选值数组       |
| defaultValue | `Array<{ name: string, label: string, value: any }>` | `[]`   | 默认筛选值       |
| onChange     | `(value: Array) => void`                             | -      | 筛选值变化回调   |
| list         | `Array<Array>`                                       | `[]`   | 筛选项配置数组   |
| more         | `Array`                                              | -      | 额外折叠的筛选项 |
| className    | `string`                                             | -      | 自定义类名       |

#### 使用示例

```javascript
import { AdvancedFilter, fields } from '@kne/react-filter';

<AdvancedFilter value={filterValue} onChange={setFilterValue} list={[[{ type: InputFilterItem, props: { name: 'name', label: '姓名' } }]]} />;
```

---

### FilterValueDisplay 已选值展示

展示已选择的筛选条件，支持单独删除和清空全部。

#### 属性

| 属性        | 类型                                                 | 默认值 | 说明           |
| ----------- | ---------------------------------------------------- | ------ | -------------- |
| value       | `Array<{ name: string, label: string, value: any }>` | -      | 筛选值数组     |
| onChange    | `(value: Array) => void`                             | -      | 筛选值变化回调 |
| extraExpand | `ReactNode`                                          | -      | 额外展示内容   |

---

### PopoverItem 弹出层筛选项

弹出层形式的筛选项，支持确认取消操作。

#### 属性

| 属性             | 类型                                        | 默认值         | 说明               |
| ---------------- | ------------------------------------------- | -------------- | ------------------ |
| label            | `string`                                    | -              | 筛选项标签         |
| value            | `{ label: string, value: any }`             | -              | 当前值             |
| onChange         | `(value: object) => void`                   | -              | 值变化回调         |
| onValidate       | `(value: object) => boolean`                | -              | 确认按钮校验函数   |
| onOpenChange     | `(open: boolean) => void`                   | -              | 弹出层状态变化回调 |
| placement        | `string`                                    | `'bottomLeft'` | 弹出层位置         |
| overlayClassName | `string`                                    | -              | 弹出层自定义类名   |
| children         | `(props: { value, onChange }) => ReactNode` | -              | 内容渲染函数       |

#### 使用示例

```javascript
import { PopoverItem } from '@kne/react-filter';

<PopoverItem label="文本输入" value={inputValue} onChange={setInputValue}>
  {({ value, onChange }) => <Input value={value?.value} onChange={e => onChange({ label: e.target.value, value: e.target.value })} />}
</PopoverItem>;
```

---

### FilterItem 筛选项容器

筛选项的基础容器组件。

#### 属性

| 属性     | 类型        | 默认值 | 说明                 |
| -------- | ----------- | ------ | -------------------- |
| label    | `string`    | -      | 筛选项标签           |
| open     | `boolean`   | -      | 是否展开状态         |
| active   | `boolean`   | -      | 是否激活状态（有值） |
| children | `ReactNode` | -      | 子元素               |

---

### FilterLines 筛选行

筛选行组件，支持多行展开收起。

#### 属性

| 属性        | 类型           | 默认值   | 说明           |
| ----------- | -------------- | -------- | -------------- |
| list                 | `Array`                  | `[]`      | 筛选项配置数组，默认支持单层数组，也兼容双层数组 |
| displayLine          | `number`                 | `1`       | 双层数组模式下默认展示行数 |
| visibleCountStrategy | `'asc' \| 'desc'`        | `'asc'`   | 单层数组模式下可见项计算策略，`asc` 从少往多累加，`desc` 从多往少递减 |
| label                | `string`                 | `'筛选'`  | 标题 |
| extra                | `ReactNode`              | -         | 额外操作区域 |
| className            | `string`                 | -         | 自定义类名 |

---

### FilterProvider 状态管理

Filter 状态管理组件，用于自定义 Filter 结构。

#### 属性

| 属性         | 类型                                  | 默认值 | 说明             |
| ------------ | ------------------------------------- | ------ | ---------------- |
| value        | `Array`                               | -      | 筛选值数组       |
| defaultValue | `Array`                               | `[]`   | 默认筛选值       |
| onChange     | `(value: Array) => void`              | -      | 筛选值变化回调   |
| children     | `ReactNode \| (context) => ReactNode` | -      | 子元素或渲染函数 |

---

### 高阶组件

#### withFilterValue

为组件注入筛选值和变更函数。

```javascript
import { withFilterValue } from '@kne/react-filter';

const MyFilterItem = withFilterValue(({ name, label, value, onChange, ...props }) => {
  return <Component value={value} onChange={onChange} />;
});
```

#### withFieldItem

为组件包装 FilterItem 样式。

```javascript
import { withFieldItem } from '@kne/react-filter';

const MyFieldItem = withFieldItem(MyComponent);
```

---

### 筛选字段组件

#### InputFilterItem 输入筛选

弹出层形式的输入框筛选组件。

| 属性        | 类型                 | 默认值 | 说明         |
| ----------- | -------------------- | ------ | ------------ |
| name        | `string`             | -      | 字段名称     |
| label       | `string`             | -      | 标签         |
| placeholder | `string`             | -      | 占位符       |
| onValidate  | `(value) => boolean` | -      | 确认校验函数 |

#### NumberRangeFilterItem 数字区间筛选

数字区间输入筛选组件。

| 属性        | 类型     | 默认值 | 说明     |
| ----------- | -------- | ------ | -------- |
| name        | `string` | -      | 字段名称 |
| label       | `string` | -      | 标签     |
| unit        | `string` | -      | 单位     |
| min         | `number` | -      | 最小值   |
| max         | `number` | -      | 最大值   |
| placeholder | `string` | -      | 占位符   |

#### DatePickerFilterItem 日期筛选

日期选择筛选组件。

| 属性   | 类型                                                 | 默认值         | 说明       |
| ------ | ---------------------------------------------------- | -------------- | ---------- |
| name   | `string`                                             | -              | 字段名称   |
| label  | `string`                                             | -              | 标签       |
| picker | `'date' \| 'week' \| 'month' \| 'quarter' \| 'year'` | `'date'`       | 选择器类型 |
| format | `string`                                             | `'YYYY-MM-DD'` | 日期格式   |

#### DateRangePickerFilterItem 日期范围筛选

日期范围选择筛选组件。

| 属性   | 类型                                | 默认值         | 说明     |
| ------ | ----------------------------------- | -------------- | -------- |
| name   | `string`                            | -              | 字段名称 |
| label  | `string`                            | -              | 标签     |
| format | `string`                            | `'YYYY-MM-DD'` | 日期格式 |
| header | `ReactNode \| (props) => ReactNode` | -              | 头部内容 |

#### TypeDateRangePickerFilterItem 类型日期范围筛选

支持按日/周/月切换的日期范围选择筛选组件。

| 属性   | 类型     | 默认值         | 说明     |
| ------ | -------- | -------------- | -------- |
| name   | `string` | -              | 字段名称 |
| label  | `string` | -              | 标签     |
| format | `string` | `'YYYY-MM-DD'` | 日期格式 |

#### SuperSelectFilterItem 通用选择器筛选

基于 `@kne/super-select` 的通用选择器筛选项，支持单选/多选、搜索、全选等功能。

| 属性             | 类型                      | 默认值  | 说明         |
| ---------------- | ------------------------- | ------- | ------------ |
| name             | `string`                  | -       | 字段名称     |
| label            | `string`                  | -       | 标签         |
| options          | `Array<{ value, label }>` | -       | 选项数据     |
| single           | `boolean`                 | `false` | 是否单选     |
| allowSelectedAll | `boolean`                 | `false` | 是否支持全选 |
| maxLength        | `number`                  | -       | 最多可选数量 |

**使用示例：**

```javascript
import { SuperSelectFilterItem } from '@kne/react-filter';

// 多选
<SuperSelectFilterItem
  label="部门"
  options={[
    { value: 'tech', label: '技术研发部' },
    { value: 'product', label: '产品设计部' }
  ]}
/>

// 单选
<SuperSelectFilterItem
  label="状态"
  single
  options={[
    { value: 'active', label: '启用' },
    { value: 'inactive', label: '停用' }
  ]}
/>
```

> 注意：需要安装 `@kne/super-select` 依赖。

#### SelectTableListFilterItem 表格选择器筛选

基于 `@kne/super-select` 的 `SelectTableList` 组件，适用于需要展示多列数据的筛选场景。

| 属性      | 类型       | 默认值  | 说明         |
| --------- | ---------- | ------- | ------------ |
| name      | `string`   | -       | 字段名称     |
| label     | `string`   | -       | 标签         |
| options   | `Array`    | -       | 选项数据     |
| columns   | `Array`    | -       | 表格列配置   |
| valueKey  | `string`   | `'id'`  | 值字段名     |
| labelKey  | `string`   | `'name'`| 标签字段名   |
| single    | `boolean`  | `false` | 是否单选     |
| maxLength | `number`   | -       | 最多可选数量 |

> 注意：需要安装 `@kne/super-select` 依赖。

#### SelectTreeFilterItem 树形选择器筛选

基于 `@kne/super-select` 的 `SelectTree` 组件，适用于组织架构、分类等层级数据筛选。

| 属性      | 类型       | 默认值  | 说明         |
| --------- | ---------- | ------- | ------------ |
| name      | `string`   | -       | 字段名称     |
| label     | `string`   | -       | 标签         |
| options   | `Array`    | -       | 树形数据（含 `parentId`） |
| valueKey  | `string`   | `'id'`  | 值字段名     |
| labelKey  | `string`   | `'name'`| 标签字段名   |
| single    | `boolean`  | `false` | 是否单选     |
| maxLength | `number`   | -       | 最多可选数量 |

> 注意：需要安装 `@kne/super-select` 依赖。

#### SelectCascaderFilterItem 级联选择器筛选

基于 `@kne/super-select` 的 `SelectCascader` 组件，支持多列菜单展示、父子关联选择、搜索过滤。

| 属性      | 类型       | 默认值  | 说明         |
| --------- | ---------- | ------- | ------------ |
| name      | `string`   | -       | 字段名称     |
| label     | `string`   | -       | 标签         |
| options   | `Array`    | -       | 级联数据（含 `children`） |
| valueKey  | `string`   | `'id'`  | 值字段名     |
| labelKey  | `string`   | `'name'`| 标签字段名   |
| single    | `boolean`  | `false` | 是否单选     |
| maxLength | `number`   | -       | 最多可选数量 |

> 注意：需要安装 `@kne/super-select` 依赖。

#### SelectFunctionFilterItem 职能筛选

基于 `@kne/super-select-plus` 的职能选择器筛选项，支持多级职能数据选择、拼音搜索。

| 属性      | 类型      | 默认值  | 说明         |
| --------- | --------- | ------- | ------------ |
| name      | `string`  | -       | 字段名称     |
| label     | `string`  | -       | 标签         |
| single    | `boolean` | `false` | 是否单选     |
| maxLength | `number`  | -       | 最多可选数量 |

> 注意：需要安装 `@kne/super-select-plus` 依赖。

#### SelectIndustryFilterItem 行业筛选

基于 `@kne/super-select-plus` 的行业选择器筛选项，支持多级行业数据选择、拼音搜索。

| 属性      | 类型      | 默认值  | 说明         |
| --------- | --------- | ------- | ------------ |
| name      | `string`  | -       | 字段名称     |
| label     | `string`  | -       | 标签         |
| single    | `boolean` | `false` | 是否单选     |
| maxLength | `number`  | -       | 最多可选数量 |

> 注意：需要安装 `@kne/super-select-plus` 依赖。

#### SelectAddressFilterItem 城市筛选

基于 `@kne/super-select-plus` 的城市选择器筛选项，支持国内外城市搜索选择。

| 属性      | 类型      | 默认值  | 说明         |
| --------- | --------- | ------- | ------------ |
| name      | `string`  | -       | 字段名称     |
| label     | `string`  | -       | 标签         |
| single    | `boolean` | `false` | 是否单选     |
| maxLength | `number`  | -       | 最多可选数量 |

> 注意：需要安装 `@kne/super-select-plus` 依赖。

#### CityFilterItem（高级筛选）

城市选择器的高级筛选版本，用于 `AdvancedFilter` 组件的 `list` 配置中。展示热门城市标签，支持搜索选择其他城市。

| 属性      | 类型      | 默认值  | 说明         |
| --------- | --------- | ------- | ------------ |
| single    | `boolean` | `false` | 是否单选     |
| maxLength | `number`  | `5`     | 最多可选数量 |

**在高级筛选中使用：**

```javascript
import { AdvancedFilter } from '@kne/react-filter';
import { CityFilterItem } from './AdvancedFilter/fields';

<AdvancedFilter list={[[{ type: CityFilterItem, props: { label: '城市', single: true } }]]} />;
```

---

### TypeDateRangePickerField 类型日期范围选择器

支持按日/周/月切换的日期范围选择器基础组件。

| 属性            | 类型                                                       | 默认值                          | 说明             |
| --------------- | ---------------------------------------------------------- | ------------------------------- | ---------------- |
| value           | `{ type: string, value: [Date, Date] }`                    | -                               | 当前值           |
| defaultValue    | `{ type: string, value: [Date, Date] }`                    | `{ type: 'date', value: null }` | 默认值           |
| onChange        | `(value: object) => void`                                  | -                               | 值变化回调       |
| shortcuts       | `boolean`                                                  | `true`                          | 是否显示快捷选项 |
| shortcutOptions | `Array<{ label: string, getValue: () => [Dayjs, Dayjs] }>` | -                               | 自定义快捷选项   |

**value 结构：**

```typescript
interface TypeDateRangeValue {
  type: 'date' | 'week' | 'month'; // 日期类型
  value: [Date, Date] | null; // 日期范围 [开始时间, 结束时间]
}
```

**默认快捷选项：**

- 近7天：`dayjs().subtract(7, 'day')` 至今天
- 本月：本月第一天至最后一天
- 近三个月：`dayjs().subtract(3, 'month')` 至今天
- 当年：本年第一天至最后一天

**自定义快捷选项示例：**

```javascript
import { TypeDateRangePickerField } from '@kne/react-filter';

<TypeDateRangePickerField
  shortcuts={true}
  shortcutOptions={[
    {
      label: '最近一周',
      getValue: () => [dayjs().subtract(7, 'day').startOf('day'), dayjs().endOf('day')]
    },
    {
      label: '最近一月',
      getValue: () => [dayjs().subtract(1, 'month').startOf('day'), dayjs().endOf('day')]
    }
  ]}
/>;
```

---

### SearchInput 搜索输入

搜索输入组件，适合放在列表顶部做关键词搜索。输入过程中维护本地输入值，停止输入 500ms 后自动提交筛选值；中文等输入法组合输入期间不会触发搜索，确认文本后才开始计时。按回车或点击搜索按钮会立即提交。清空后搜索会提交 `null`，用于移除该筛选条件。

| 属性        | 类型                               | 默认值 | 说明                                 |
| ----------- | ---------------------------------- | ------ | ------------------------------------ |
| name        | `string`                           | -      | 字段名称，用于写入筛选值             |
| label       | `string`                           | -      | 标签，用于展示已选筛选条件           |
| value       | `{ label: string, value: string }` | -      | 当前搜索值                           |
| onChange    | `(value: object \| null) => void`  | -      | 搜索提交回调，清空搜索时返回 `null`  |
| placeholder | `string`                           | -      | 占位符                               |
| searchDelay | `number`                           | `500`  | 自动提交搜索的防抖等待时间，单位毫秒 |

#### 使用示例

```javascript
import { SearchInput, FilterProvider, getFilterValue } from '@kne/react-filter';

const [filterValue, setFilterValue] = useState([]);

<FilterProvider value={filterValue} onChange={setFilterValue}>
  <SearchInput name="keyword" label="关键词" placeholder="请输入关键词" searchDelay={500} allowClear />
</FilterProvider>;

const params = getFilterValue(filterValue);
// { keyword: 'React' }
```

---

### 工具方法

#### getFilterValue

将筛选值数组转换为参数对象。

```javascript
import { getFilterValue } from '@kne/react-filter';

const filterValue = [
  { name: 'keyword', value: { label: 'test', value: 'test' } },
  { name: 'status', value: [{ label: '已完成', value: 'done' }] }
];

const params = getFilterValue(filterValue);
// { keyword: 'test', status: ['done'] }
```

---

### 筛选值结构

筛选值数组中的每一项结构：

```typescript
interface FilterValueItem {
  name: string; // 字段名称
  label: string; // 字段标签（用于展示）
  value:
    | {
        // 单个值
        label: string; // 显示文本
        value: any; // 实际值
      }
    | Array<{
        // 或多个值
        label: string;
        value: any;
      }>
    | null; // 或空值
}
```

---

### searchParams 相关

#### useSearchParamsValue

从 `searchParams` 同步解析筛选初始值数组。不管理 Filter 的 `value` / `defaultValue` / `onChange`，由调用方自行 seed。若传入 `setSearchParams`（function），mount 后会以 `replace: true` 清除已消费的 URL key。

**函数签名：**
```javascript
useSearchParamsValue(options): array
```

**参数：**

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| options.searchParams | URL 查询参数 | URLSearchParams | 是 |
| options.setSearchParams | 清理已消费 key；非 function 则只读 | function | 否 |
| options.fields | `[{ name, label, labelKey? }]`。`name` 为 URL key 与筛选 name；`label` 为筛选项标题；可选 `labelKey` 为选中值展示文案的 URL key | array | 是 |

**返回值：** `searchParamsValue` 筛选值数组（可能为 `[]`）。每项形如 `{ name, label, value: { label, value } }`；有 `labelKey` 时 `value.label` 取自对应 URL 参数，否则等于 `value.value`。

**示例：**
```javascript
import { useSearchParamsValue } from '@kne/react-filter';
import { useSearchParams } from 'react-router-dom';

const [searchParams, setSearchParams] = useSearchParams();
const searchParamsValue = useSearchParamsValue({
  searchParams,
  setSearchParams,
  fields: [
    { name: 'status', label: '状态' },
    { name: 'tenantOrgId', label: '部门', labelKey: 'tenantOrgName' }
  ]
});
// ?tenantOrgId=org-1&tenantOrgName=技术部
// → { name: 'tenantOrgId', label: '部门', value: { label: '技术部', value: 'org-1' } }
const [filter, setFilter] = useState(searchParamsValue);
// 或 <Filter defaultValue={searchParamsValue} ... />
```


#### singleSelectInterceptor

单选拦截器：`{id, name}` ↔ `{label, value}`。

| 属性   | 类型       | 说明                                   |
| ------ | ---------- | -------------------------------------- |
| input  | `Function` | `{id, name}` → `{label, value}` 的转换 |
| output | `Function` | `{label, value}` → `{id, name}` 的转换 |

#### multiSelectInterceptor

多选拦截器：`[{id, name}]` ↔ `[{label, value}]`。

| 属性   | 类型       | 说明                                       |
| ------ | ---------- | ------------------------------------------ |
| input  | `Function` | `[{id, name}]` → `[{label, value}]` 的转换 |
| output | `Function` | `[{label, value}]` → `[{id, name}]` 的转换 |

#### filterInterceptors

拦截器集合对象。

```javascript
import { filterInterceptors, singleSelectInterceptor, multiSelectInterceptor } from '@kne/react-filter';

// 两种引用方式等价
filterInterceptors.single === singleSelectInterceptor; // true
filterInterceptors.multi === multiSelectInterceptor; // true
```

**使用示例：**

```javascript
import { filterInterceptors } from '@kne/react-filter';

// 在 SuperSelect 组件中使用单选拦截
<SuperSelect
  valueKey="id"
  labelKey="name"
  interceptor={filterInterceptors.single}
  /* ... */
/>

// 多选拦截
<SuperSelect
  valueKey="id"
  labelKey="name"
  interceptor={filterInterceptors.multi}
  /* ... */
/>
```

---

### 工具方法

#### pickSelectValues

从筛选值中提取原始值数组。支持原始值、`{ value }` 对象、`{ id }` 对象以及它们的数组。

| 参数  | 类型  | 说明                 |
| ----- | ----- | -------------------- |
| value | `any` | 筛选值，支持多种格式 |

```javascript
import { pickSelectValues } from '@kne/react-filter';

pickSelectValues([{ value: 1 }, { id: 2 }, '3']);
// => ['1', '2', '3']

pickSelectValues({ value: 'open' });
// => ['open']

pickSelectValues(null);
// => []
```

#### createFilterValueMapper

声明式创建 mapFilterValue 函数。`Filter.getFilterValue` 默认只读取 `{ value }`，而 SuperSelectFilterItem 等组件使用 `{ id, name }` 格式，需要额外处理。此工具通过声明字段映射规则，自动生成转换函数。

| 参数         | 类型     | 说明                   |
| ------------ | -------- | ---------------------- |
| fieldMappers | `Object` | 字段名到映射规则的映射 |

**映射规则类型：**

| 规则       | 说明                                                    |
| ---------- | ------------------------------------------------------- |
| `'string'` | 确保值为字符串类型                                      |
| `'multi'`  | 多选，从 filter entry 提取值数组                        |
| `'single'` | 单选，从 filter entry 提取第一个值                      |
| `Function` | 自定义转换，接收 `(rawValue, { entry, filter, value })` |

```javascript
import { createFilterValueMapper } from '@kne/react-filter';

const mapFilterValue = createFilterValueMapper({
  id: 'string',
  roles: 'multi',
  tenantOrgId: 'single',
  status: rawValue => normalizeStatus(rawValue)
});

const filterValue = mapFilterValue(filter, Filter.getFilterValue);
```
