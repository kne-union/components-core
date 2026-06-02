# Filter

### 概述

Filter 是一个功能强大的筛选组件库，用于构建灵活的筛选条件界面。该组件提供了多种预置的筛选字段类型，支持自定义筛选项，并提供了完整的筛选值管理和展示功能。

核心特性包括：丰富的预置筛选字段，涵盖文本输入、日期选择、城市选择、用户选择、行业选择、职能选择等多种类型；灵活的筛选值管理，支持受控和非受控模式；声明式筛选值映射（`createFilterValueMapper`），统一处理多选、单选、自定义转换等值提取逻辑；URL 参数序列化与初始化（`filterToUrlParams` / `createUrlFilterReader` / `useUrlFilter`），筛选值以 `filterParams[key]` 格式序列化到 URL（前缀可自定义），从 URL 参数构建初始筛选状态并自动清理已消费参数；值格式拦截器（`filterInterceptors`），自动处理 SuperSelect 组件 `{ id, name }` 与 Filter 上下文 `{ label, value }` 格式之间的转换；支持展开/收起筛选项，避免筛选条件过多导致界面混乱；提供高级筛选组件，适用于复杂筛选场景；支持自定义字段和组合使用，满足各种业务需求；内置搜索输入框和筛选值展示组件，提升用户体验。

适用于数据列表、表格筛选、报表查询等需要多条件筛选的场景。组件采用 Context API 进行状态管理，支持嵌套使用和组合，能够满足企业级应用中各种复杂的筛选需求。

### 示例(全屏)

#### 示例代码

- 基础用法
- 展示 Filter 组件的基本使用方式，包括各种常见的筛选字段类型
- _Filter(@components/Filter)

```jsx
const {
  default: Filter,
  InputFilterItem,
  DatePickerFilterItem,
  DateRangePickerFilterItem,
  TypeDateRangePickerFilterItem,
  CityFilterItem,
  AdvancedSelectFilterItem,
  SuperSelectFilterItem,
  SuperSelectUserFilterItem,
  UserFilterItem,
  FunctionSelectFilterItem,
  IndustrySelectFilterItem,
  getFilterValue,
  FilterItemContainer,
} = _Filter;
const { useState } = React;
const BaseExample = () => {
  const [value, onChange] = useState([]);
  return (
    <Filter
      value={value}
      onChange={(value) => {
        console.log(getFilterValue(value));
        onChange(value);
      }}
      extra={<Filter.SearchInput name="name" label="姓名" />}
      list={[
        [
          <InputFilterItem label="文字" name="text" />,
          <CityFilterItem label="城市" name="city" />,
          <FilterItemContainer name="select" label="高级选择">
            {(props) => (
              <div>
                <AdvancedSelectFilterItem
                  {...props}
                  api={{
                    loader: () => {
                      return {
                        pageData: [
                          { label: "第一项", value: 1 },
                          {
                            label: "第二项",
                            value: 2,
                            disabled: true,
                          },
                          {
                            label: "第三项",
                            value: 3,
                          },
                        ],
                      };
                    },
                  }}
                />
              </div>
            )}
          </FilterItemContainer>,
          <DatePickerFilterItem label="日期" name="date" picker="week" />,
          <TypeDateRangePickerFilterItem
            label="复杂日期范围"
            name="type-data-range"
            allowEmpty={[true, true]}
          />,
          <DateRangePickerFilterItem label="日期范围" name="date-range" />,
          <SuperSelectFilterItem
            label="选择信息"
            name="select-value"
            options={[
              {
                label: "用户一",
                value: 1,
                description: "我是用户描述",
              },
              {
                label: "用户二",
                value: 2,
                description: "我是用户描述",
              },
            ]}
          />,
          <SuperSelectUserFilterItem
            label="用户选择"
            name="user"
            api={{
              loader: () => {
                return {
                  pageData: [
                    {
                      label: "用户一",
                      value: 1,
                      description: "我是用户描述",
                    },
                    {
                      label: "用户二",
                      value: 2,
                      description: "我是用户描述",
                    },
                    {
                      label: "用户三",
                      value: 3,
                      description: "我是用户描述",
                    },
                  ],
                };
              },
            }}
          />,
          <FunctionSelectFilterItem
            label="职能选择"
            name="functionLast"
            onlyAllowLastLevel
          />,
          <FunctionSelectFilterItem
            label="职能选择"
            name="function"
            selectLevel={3}
            maxLength={3}
          />,
          <FunctionSelectFilterItem
            label="职能选择"
            name="functionSingle"
            single
          />,
          <IndustrySelectFilterItem
            label="行业选择"
            name="industryLast"
            onlyAllowLastLevel
          />,
          <IndustrySelectFilterItem
            label="行业选择"
            name="industry"
            selectLevel={2}
            maxLength={3}
          />,
          <IndustrySelectFilterItem
            label="行业选择"
            name="industrySingle"
            single
          />,
        ],
      ]}
    />
  );
};

render(<BaseExample />);

```

- 展示和Enum一起使用
- 
- _Filter(@components/Filter),_Enum(@components/Enum)

```jsx
const {
    default: Filter, SuperSelectFilterItem, getFilterValue
} = _Filter;
const {default: Enum} = _Enum;
const {useState} = React;
const BaseExample = () => {
    const [value, onChange] = useState([]);
    return (<Filter
        value={value}
        onChange={(value) => {
            console.log(getFilterValue(value));
            onChange(value);
        }}
        list={[[<SuperSelectFilterItem name="degree" label="学历" render={({children}) => {
            return <Enum moduleName="degreeEnum" format="option">{(options) => children({options})}</Enum>
        }}/>]]}
    />);
};

render(<BaseExample/>);

```

- 高级筛选
- 展示 AdvancedFilter 组件的高级筛选功能，适用于复杂筛选场景
- _Filter(@components/Filter)

```jsx
const {
  default: Filter,
  AdvancedFilter,
  InputFilterItem,
  DatePickerFilterItem,
  DateRangePickerFilterItem,
  TypeDateRangePickerFilterItem,
  CityFilterItem,
  AdvancedSelectFilterItem,
  UserFilterItem,
  FunctionSelectFilterItem,
  IndustrySelectFilterItem,
  NumberRangeFilterItem,
  getFilterValue,
  FilterItemContainer,
} = _Filter;
const { useState } = React;

const {
  CityFilterItem: CityAdvancedFilterItem,
  ListFilterItem,
  InputFilterItem: InputAdvancedFilterItem,
} = AdvancedFilter.fields;
const BaseExample = () => {
  const [value, onChange] = useState([]);
  return (
    <AdvancedFilter
      value={value}
      onChange={(value) => {
        console.log(getFilterValue(value));
        onChange(value);
      }}
      list={[
        [<CityAdvancedFilterItem name="currentCity" label="当前城市" single />],
        [<CityAdvancedFilterItem name="expectCity" label="期望城市" />],
        [
          <ListFilterItem
            name="experience"
            label="工作经验"
            single
            items={[
              {
                value: [null, 1],
                label: "1年以下",
              },
              {
                value: [1, 5],
                label: "1-5年",
              },
              { value: [5, null], label: "5年以上" },
            ]}
            custom={<NumberRangeFilterItem label="自定义" unit="年" />}
          />,
        ],
        [<InputAdvancedFilterItem name="company" label="公司" />],
      ]}
      more={[
        <InputFilterItem label="文字" name="text" />,
        <CityFilterItem label="城市" name="city" />,
        <FilterItemContainer name="select" label="高级选择">
          {(props) => (
            <div>
              <AdvancedSelectFilterItem
                {...props}
                api={{
                  loader: () => {
                    return {
                      pageData: [
                        { label: "第一项", value: 1 },
                        {
                          label: "第二项",
                          value: 2,
                          disabled: true,
                        },
                        {
                          label: "第三项",
                          value: 3,
                        },
                      ],
                    };
                  },
                }}
              />
            </div>
          )}
        </FilterItemContainer>,
        <DatePickerFilterItem label="日期" name="date" picker="week" />,
        <TypeDateRangePickerFilterItem
          label="复杂日期范围"
          name="type-data-range"
          allowEmpty={[true, true]}
        />,
        <DateRangePickerFilterItem label="日期范围" name="date-range" />,
        <UserFilterItem
          label="用户选择"
          name="user"
          api={{
            loader: () => {
              return {
                pageData: [
                  {
                    label: "用户一",
                    value: 1,
                    description: "我是用户描述",
                  },
                  {
                    label: "用户二",
                    value: 2,
                    description: "我是用户描述",
                  },
                  {
                    label: "用户三",
                    value: 3,
                    description: "我是用户描述",
                  },
                ],
              };
            },
          }}
        />,
        <FunctionSelectFilterItem
          label="职能选择"
          name="function"
          onlyAllowLastLevel
          single
        />,
        <IndustrySelectFilterItem
          label="行业选择"
          name="industry"
          onlyAllowLastLevel
        />,
      ]}
    />
  );
};

render(<BaseExample />);

```

- 树形筛选
- 展示 TreeFilterItem 树形选择组件的使用
- _Filter(@components/Filter),antd(antd),_data(@components/Filter/doc/mock/tree-data.json)

```jsx
const { default: Filter, TreeFilterItem } = _Filter;
const { default: treeData } = _data;
const { useState } = React;
const { Space } = antd;

const BaseExample = () => {
  const [filter, setFilter] = useState([]);
  const [filter2, setFilter2] = useState([]);

  return (
    <Space direction="vertical">
      <Filter
        value={filter}
        onChange={setFilter}
        list={[
          [
            <TreeFilterItem
              name="tree"
              single
              label="树组件"
              fieldNames={{
                title: "name",
                key: "id",
                children: "children",
              }}
              api={{
                loader: () => {
                  return treeData.children;
                },
              }}
            />,
          ],
        ]}
      />
      <Filter
        value={filter2}
        onChange={setFilter2}
        list={[
          [
            <TreeFilterItem
              name="tree"
              label="树组件"
              fieldNames={{
                title: "name",
                key: "id",
                children: "children",
              }}
              api={{
                loader: () => {
                  return treeData.children;
                },
              }}
            />,
          ],
        ]}
      />
    </Space>
  );
};

render(<BaseExample />);

```

- 筛选值展示
- 展示 FilterValueDisplay、FilterItem、FilterLines、PopoverItem 等组件的独立使用
- _Filter(@components/Filter),antd(antd)

```jsx
const {
  FilterValueDisplay,
  FilterItem,
  FilterLines,
  PopoverItem,
  InputFilterItem,
  CityFilterItem,
  AdvancedSelectFilterItem,
  UserFilterItem,
  FunctionSelectFilterItem,
  IndustrySelectFilterItem,
} = _Filter;
const { Space, Input } = antd;
const { useState } = React;
const BaseExample = () => {
  const [value, setValue] = useState([
    {
      label: "城市",
      name: "city",
      value: [
        { label: "上海", value: "010" },
        { label: "北京", value: "020" },
      ],
    },
    {
      label: "职能",
      name: "function",
      value: [
        { label: "产品经理", value: "010" },
        { label: "销售", value: "020" },
        {
          label: "客户经理",
          value: "030",
        },
      ],
    },
  ]);
  return (
    <Space direction="vertical">
      <FilterValueDisplay value={value} onChange={setValue} />
      <Space>
        <FilterItem label="客户" />
        <FilterItem label="客户" active />
        <FilterItem label="客户" open />
        <FilterItem label="超长超长超长超长超长超长超长超长" active open />
      </Space>
      <FilterLines
        list={[
          [
            <FilterItem label="客户" />,
            <FilterItem label="职位" />,
            <FilterItem label="职位负责人" />,
          ],
          [
            <FilterItem label="开始时间" />,
            <FilterItem label="结束时间" />,
            <FilterItem label="职位BD人" />,
          ],
          [
            <FilterItem label="开始时间" />,
            <FilterItem label="结束时间" />,
            <FilterItem label="职位BD人" />,
          ],
          [
            <FilterItem label="开始时间" />,
            <FilterItem label="结束时间" />,
            <FilterItem label="职位BD人" />,
          ],
        ]}
      />
      <PopoverItem label="客户">
        {({ value, onChange }) => (
          <Input value={value} onChange={(e) => onChange(e.target.value)} />
        )}
      </PopoverItem>
      <FilterLines
        list={[
          [
            <InputFilterItem label="文字" />,
            <CityFilterItem label="城市" />,
            <AdvancedSelectFilterItem
              label="高级选择"
              api={{
                loader: () => {
                  return {
                    pageData: [
                      { label: "第一项", value: 1 },
                      { label: "第二项", value: 2, disabled: true },
                      {
                        label: "第三项",
                        value: 3,
                      },
                    ],
                  };
                },
              }}
            />,
            <UserFilterItem
              label="用户选择"
              api={{
                loader: () => {
                  return {
                    pageData: [
                      {
                        label: "用户一",
                        value: 1,
                        description: "我是用户描述",
                      },
                      {
                        label: "用户二",
                        value: 2,
                        description: "我是用户描述",
                      },
                      {
                        label: "用户三",
                        value: 3,
                        description: "我是用户描述",
                      },
                    ],
                  };
                },
              }}
            />,
            <FunctionSelectFilterItem label="职能选择" />,
            <IndustrySelectFilterItem label="行业选择" />,
          ],
        ]}
      />
    </Space>
  );
};

render(<BaseExample />);

```

- 数值范围筛选
- 展示 NumberRangeFilterItem 数值范围筛选组件的使用
- _Filter(@components/Filter)

```jsx
const {
  default: Filter,
  NumberRangeFilterItem,
  getFilterValue,
} = _Filter;
const { useState } = React;

const BaseExample = () => {
  const [value, onChange] = useState([]);

  return (
    <Filter
      value={value}
      onChange={(value) => {
        console.log('筛选值:', getFilterValue(value));
        onChange(value);
      }}
      list={[
        [
          <NumberRangeFilterItem label="年龄" name="age" unit="岁" />,
          <NumberRangeFilterItem label="薪资" name="salary" unit="万" />,
          <NumberRangeFilterItem label="工作经验" name="experience" unit="年" />,
        ],
      ]}
    />
  );
};

render(<BaseExample />);

```

- 级联筛选
- 展示 CascaderFilterItem 级联选择组件的使用
- _Filter(@components/Filter)

```jsx
const {
    default: Filter, CascaderFilterItem, getFilterValue,
} = _Filter;
const {useState} = React;

const options = [{
    label: '浙江', value: 'zhejiang', children: [{
        label: '杭州',
        value: 'hangzhou',
        children: [{label: '西湖区', value: 'xihu'}, {label: '滨江区', value: 'binjiang'}, {
            label: '余杭区', value: 'yuhang'
        },],
    }, {
        label: '宁波',
        value: 'ningbo',
        children: [{label: '海曙区', value: 'haishu'}, {label: '江北区', value: 'jiangbei'},],
    },],
}, {
    label: '江苏', value: 'jiangsu', children: [{
        label: '南京',
        value: 'nanjing',
        children: [{label: '玄武区', value: 'xuanwu'}, {label: '秦淮区', value: 'qinhuai'},],
    }, {
        label: '苏州',
        value: 'suzhou',
        children: [{label: '姑苏区', value: 'gusu'}, {label: '吴中区', value: 'wuzhong'},],
    },],
},];

const BaseExample = () => {
    const [value, onChange] = useState([]);

    return (<Filter
        value={value}
        onChange={(value) => {
            console.log('筛选值:', getFilterValue(value));
            onChange(value);
        }}
        list={[[<CascaderFilterItem
            label="地区选择"
            name="region"
            options={options}
            placeholder="请选择地区"
        />,],]}
    />);
};

render(<BaseExample/>);

```

- 自定义筛选字段
- 展示如何使用 withFilterValue 将原生 Select 组件包装成筛选字段
- _Filter(@components/Filter),antd(antd)

```jsx
const {
  default: Filter,
  InputFilterItem,
  CityFilterItem,
  withFilterValue,
} = _Filter;
const { Select } = antd;
const { useState } = React;

// 自定义下拉筛选组件 - 展示如何使用 withFilterValue 包装原生组件
const CustomSelectFilter = withFilterValue(({ label, value, onChange, options }) => {
  return (
    <Select
      placeholder={&#96;请选择${label}&#96;}
      value={value?.value}
      onChange={(val) => onChange({ label, value: val })}
      allowClear
      style={{ width: 200 }}
      options={options}
    />
  );
});

const BaseExample = () => {
  const [value, onChange] = useState([]);

  return (
    <Filter
      value={value}
      onChange={(value) => {
        console.log('筛选值:', value);
        onChange(value);
      }}
      list={[
        [
          <InputFilterItem label="部门" name="department" placeholder="请输入部门名称" />,
          <CityFilterItem label="城市" name="city" />,
          <CustomSelectFilter
            label="项目状态"
            name="status"
            options={[
              { label: '进行中', value: 'ongoing' },
              { label: '已完成', value: 'completed' },
              { label: '已暂停', value: 'paused' },
              { label: '已取消', value: 'cancelled' },
            ]}
          />,
          <CustomSelectFilter
            label="优先级"
            name="priority"
            options={[
              { label: '高', value: 'high' },
              { label: '中', value: 'medium' },
              { label: '低', value: 'low' },
            ]}
          />,
        ],
      ]}
    />
  );
};

render(<BaseExample />);

```

- FilterProvider 和 useFilter
- 展示如何使用 FilterProvider 和 useFilter Hook 自定义筛选界面
- _Filter(@components/Filter),antd(antd)

```jsx
const {
  FilterProvider,
  FilterLines,
  FilterValueDisplay,
  useFilter,
  InputFilterItem,
  CityFilterItem,
  UserFilterItem,
  FunctionSelectFilterItem,
  IndustrySelectFilterItem,
  DatePickerFilterItem,
  NumberRangeFilterItem,
} = _Filter;
const { Space, Card, Button, Modal, Tag, Alert } = antd;
const { useState } = React;

// 演示 FilterProvider 和 useFilter 的使用
const CustomFilterContent = () => {
  const { value, onChange } = useFilter();
  const [modalVisible, setModalVisible] = useState(false);

  const handleViewFilterValue = () => {
    setModalVisible(true);
  };

  const renderFilterValue = () => {
    if (!value) {
      return <p>暂无筛选条件</p>;
    }

    // 处理 value 可能是 Map 的情况
    const valueArray = value instanceof Map ? Array.from(value.values()) : (Array.isArray(value) ? value : []);

    if (valueArray.length === 0) {
      return <p>暂无筛选条件</p>;
    }

    return (
      <Space direction="vertical" size={12}>
        {valueArray.map((item, index) => (
          <Tag key={index} color="blue" style={{ fontSize: 14 }}>
            <strong>{item.label}</strong>: {Array.isArray(item.value)
              ? item.value.map(v => v.label).join(', ')
              : item.value?.label || item.value}
          </Tag>
        ))}
      </Space>
    );
  };

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Alert
        message="使用提示"
        description="点击筛选项，输入值后点击「确定」按钮，然后点击下方按钮查看筛选条件"
        type="info"
        showIcon
      />

      <Card title="筛选器" size="small">
        <FilterLines
          list={[
            [
              <InputFilterItem label="姓名" name="name" />,
              <CityFilterItem label="城市" name="city" />,
              <UserFilterItem label="用户" name="user" />,
              <FunctionSelectFilterItem label="职能" name="function" />,
            ],
            [
              <IndustrySelectFilterItem label="行业" name="industry" />,
              <DatePickerFilterItem label="创建时间" name="createTime" />,
              <NumberRangeFilterItem label="年龄" name="age" />,
            ],
          ]}
        />
      </Card>

      <Button type="primary" onClick={handleViewFilterValue}>
        查看筛选值
      </Button>

      <Modal
        title="当前筛选值"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            关闭
          </Button>,
        ]}
        width={600}
      >
        {renderFilterValue()}
        <div style={{ marginTop: 16 }}>
          <Button
            type="link"
            size="small"
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(value, null, 2));
            }}
          >
            复制 JSON 数据
          </Button>
        </div>
      </Modal>
    </Space>
  );
};

const BaseExample = () => {
  const [value, setValue] = useState([]);

  return (
    <FilterProvider value={value} onChange={setValue}>
      <CustomFilterContent />
      {value.length > 0 && (
        <FilterValueDisplay value={value} onChange={setValue} />
      )}
    </FilterProvider>
  );
};

render(<BaseExample />);

```

- 筛选值映射与提取
- 展示 createFilterValueMapper 声明式值映射和 pickSelectValues 值提取工具的用法
- _Filter(@components/Filter),antd(antd)

```jsx
const {
  default: Filter,
  SuperSelectFilterItem,
  CityFilterItem,
  InputFilterItem,
  getFilterValue,
  pickSelectValues,
  createFilterValueMapper,
} = _Filter;
const { useState } = React;
const { Space, Card, Divider, Typography } = antd;

const { Text, Title } = Typography;

// 声明式创建 mapFilterValue 函数
const mapFilterValue = createFilterValueMapper({
  keyword: 'string',        // 确保字符串类型
  city: 'multi',            // 多选 → string[]
  status: 'single',         // 单选 → string
});

const BaseExample = () => {
  const [value, onChange] = useState([
    { name: 'keyword', label: '关键词', value: { label: '搜索词', value: '搜索词' } },
    { name: 'city', label: '城市', value: [{ label: '上海', value: '010' }, { label: '北京', value: '020' }] },
    { name: 'status', label: '状态', value: [{ label: '启用', value: 'active', id: 'active' }] },
  ]);

  const rawFilterValue = getFilterValue(value);
  const mappedFilterValue = mapFilterValue(value, getFilterValue);

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Filter
        value={value}
        onChange={onChange}
        list={[
          [
            <InputFilterItem label="关键词" name="keyword" />,
            <CityFilterItem label="城市" name="city" />,
            <SuperSelectFilterItem
              label="状态"
              name="status"
              options={[
                { label: '启用', value: 'active' },
                { label: '禁用', value: 'disabled' },
              ]}
            />,
          ],
        ]}
      />

      <Card title="pickSelectValues 用法" size="small">
        <Text code>{&#96;pickSelectValues([{ value: 1 }, { id: 2 }, '3'])&#96;}</Text>
        <br />
        <Text>结果：{JSON.stringify(pickSelectValues([{ value: 1 }, { id: 2 }, '3']))}</Text>
        <Divider />
        <Text code>{&#96;pickSelectValues({ value: 'open' })&#96;}</Text>
        <br />
        <Text>结果：{JSON.stringify(pickSelectValues({ value: 'open' }))}</Text>
      </Card>

      <Card title="createFilterValueMapper 对比" size="small">
        <Title level={5}>原始 getFilterValue 结果</Title>
        <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 12 }}>
          {JSON.stringify(rawFilterValue, null, 2)}
        </pre>
        <Title level={5}>createFilterValueMapper 映射后结果</Title>
        <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 12 }}>
          {JSON.stringify(mappedFilterValue, null, 2)}
        </pre>
      </Card>
    </Space>
  );
};

render(<BaseExample />);

```

- URL 筛选参数
- 展示 filterToUrlParams、parseFilterEntry、takeFilterEntry、createUrlFilterReader 等 URL 参数序列化与反序列化工具的用法
- _Filter(@components/Filter),antd(antd)

```jsx
const {
  default: Filter,
  InputFilterItem,
  CityFilterItem,
  SuperSelectFilterItem,
  filterToUrlParams,
  parseFilterEntry,
  takeFilterEntry,
  createUrlFilterReader,
  getFilterValue,
  createFilterValueMapper,
  pickSelectValues,
  useUrlFilterValue,
} = _Filter;
const { useState, useMemo } = React;
const { Space, Card, Divider, Typography, Button, Alert, Tag } = antd;

const { Text, Title, Paragraph } = Typography;

// ========== 示例数据 ==========
const sampleFilterValue = [
  { name: 'keyword', label: '关键词', value: { label: '前端开发', value: '前端开发' } },
  { name: 'city', label: '城市', value: [{ label: '上海', value: '010' }, { label: '北京', value: '020' }] },
  { name: 'status', label: '状态', value: { label: '招聘中', value: 'active', id: 'active' } },
];

// 声明式创建 mapFilterValue，配合 URL 参数使用
const mapFilterValue = createFilterValueMapper({
  keyword: 'string',
  city: 'multi',
  status: 'single',
});

const BaseExample = () => {
  const [value, onChange] = useState([]);

  // ===== 1. filterToUrlParams：筛选值 → URL 参数 =====
  const sampleUrlParams = useMemo(() => filterToUrlParams(sampleFilterValue), []);
  const liveUrlParams = useMemo(() => filterToUrlParams(value), [value]);

  // ===== 2. parseFilterEntry：解析单个值 =====
  const parsedEntries = useMemo(() => [
    { input: "'前端开发'", output: parseFilterEntry('前端开发') },
    { input: "'招聘中:active'", output: parseFilterEntry('招聘中:active') },
    { input: "'上海:010'", output: parseFilterEntry('上海:010') },
  ], []);

  // ===== 3. 从 URL 参数反序列化还原筛选状态 =====
  const roundTripResult = useMemo(() => {
    const urlStr = sampleUrlParams.toString();
    const searchParams = new URLSearchParams(urlStr);

    // 使用 createUrlFilterReader 读取
    const reader = createUrlFilterReader(searchParams);
    const keyword = reader.takeFilterEntry('keyword');
    const city = reader.takeFilterEntry('city', { multi: true });
    const status = reader.takeFilterEntry('status');
    const consumedKeys = reader.getConsumedKeys();

    // 还原为 filter 数组
    const restored = [];
    if (keyword) restored.push({ name: 'keyword', label: '关键词', value: keyword });
    if (city) restored.push({ name: 'city', label: '城市', value: city });
    if (status) restored.push({ name: 'status', label: '状态', value: status });

    return { urlStr, keyword, city, status, consumedKeys, restored };
  }, [sampleUrlParams]);

  // ===== 4. takeFilterEntry 直接读取 =====
  const takeResults = useMemo(() => {
    const sp = sampleUrlParams;
    return [
      { input: "takeFilterEntry(params, 'keyword')", output: takeFilterEntry(sp, 'keyword') },
      { input: "takeFilterEntry(params, 'city', { multi: true })", output: takeFilterEntry(sp, 'city', { multi: true }) },
      { input: "takeFilterEntry(params, 'status')", output: takeFilterEntry(sp, 'status') },
    ];
  }, [sampleUrlParams]);

  // ===== 5. 映射后筛选值 =====
  const mappedSample = mapFilterValue(sampleFilterValue, getFilterValue);

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Alert
        message="URL 筛选参数工具"
        description="展示筛选值与 URL 参数之间的序列化/反序列化转换流程，以及 createFilterValueMapper 值映射工具"
        type="info"
        showIcon
      />

      {/* ===== 交互式 Filter ===== */}
      <Card title="交互式筛选器" size="small">
        <Paragraph type="secondary">选择筛选条件后，下方 URL 参数会实时更新</Paragraph>
        <Filter
          value={value}
          onChange={onChange}
          list={[
            [
              <InputFilterItem label="关键词" name="keyword" />,
              <CityFilterItem label="城市" name="city" />,
              <SuperSelectFilterItem
                label="状态"
                name="status"
                options={[
                  { label: '招聘中', value: 'active' },
                  { label: '已暂停', value: 'paused' },
                  { label: '已结束', value: 'closed' },
                ]}
              />,
            ],
          ]}
        />
        {value.length > 0 && (
          <>
            <Divider />
            <Title level={5}>当前筛选值</Title>
            <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 12 }}>
              {JSON.stringify(value, null, 2)}
            </pre>
            <Title level={5}>序列化后的 URL 参数</Title>
            <pre style={{ background: '#fff3cd', padding: 8, borderRadius: 4, fontSize: 12, wordBreak: 'break-all' }}>
              {liveUrlParams.toString() || '（无）'}
            </pre>
          </>
        )}
      </Card>

      {/* ===== filterToUrlParams ===== */}
      <Card title="filterToUrlParams — 筛选值 → URL 参数" size="small">
        <Paragraph type="secondary">
          将筛选值数组序列化为 URLSearchParams，保留 label 信息以便反序列化还原
        </Paragraph>
        <Title level={5}>输入：筛选值数组</Title>
        <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 12 }}>
{JSON.stringify(sampleFilterValue, null, 2)}
        </pre>
        <Title level={5}>输出：URL 参数字符串</Title>
        <pre style={{ background: '#d4edda', padding: 8, borderRadius: 4, fontSize: 12, wordBreak: 'break-all' }}>
          {roundTripResult.urlStr}
        </pre>
      </Card>

      {/* ===== parseFilterEntry ===== */}
      <Card title="parseFilterEntry — 解析单个筛选值项" size="small">
        <Paragraph type="secondary">
          将 URL 参数中的字符串反序列化为 {&#96;{ label, value }&#96;} 对象
        </Paragraph>
        {parsedEntries.map(({ input, output }, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <Text code>{&#96;parseFilterEntry(${input})&#96;}</Text>
            {' → '}
            <Tag color="green">{JSON.stringify(output)}</Tag>
          </div>
        ))}
      </Card>

      {/* ===== takeFilterEntry ===== */}
      <Card title="takeFilterEntry — 从 URL 参数读取筛选值" size="small">
        <Paragraph type="secondary">
          直接从 URLSearchParams 中读取并反序列化指定 key 的筛选值
        </Paragraph>
        {takeResults.map(({ input, output }, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <Text code>{input}</Text>
            <br />
            <Text>结果：</Text>
            <Tag color="blue">{JSON.stringify(output)}</Tag>
          </div>
        ))}
      </Card>

      {/* ===== createUrlFilterReader + 完整还原流程 ===== */}
      <Card title="createUrlFilterReader — 完整还原流程" size="small">
        <Paragraph type="secondary">
          使用 createUrlFilterReader 从 URL 参数读取并还原完整的筛选状态，同时追踪已消费的 key
        </Paragraph>
        <Title level={5}>步骤1：从 URL 参数读取各字段值</Title>
        <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 12 }}>
{&#96;const reader = createUrlFilterReader(searchParams);
const keyword = reader.takeFilterEntry('keyword');     // → ${JSON.stringify(roundTripResult.keyword)}
const city    = reader.takeFilterEntry('city', { multi: true }); // → ${JSON.stringify(roundTripResult.city)}
const status  = reader.takeFilterEntry('status');      // → ${JSON.stringify(roundTripResult.status)}
reader.getConsumedKeys();                               // → ${JSON.stringify(roundTripResult.consumedKeys)}&#96;}
        </pre>
        <Title level={5}>步骤2：还原为筛选值数组</Title>
        <pre style={{ background: '#d4edda', padding: 8, borderRadius: 4, fontSize: 12 }}>
          {JSON.stringify(roundTripResult.restored, null, 2)}
        </pre>
        <Divider />
        <Title level={5}>验证：还原后的数据与原始数据一致</Title>
        <Space>
          <Tag color="success">还原成功</Tag>
          <Text type="secondary">
            keyword: {roundTripResult.keyword?.value} | city: [{roundTripResult.city?.map(c => c.value).join(', ')}] | status: {roundTripResult.status?.value}
          </Text>
        </Space>
      </Card>

      {/* ===== createFilterValueMapper ===== */}
      <Card title="createFilterValueMapper + filterToUrlParams 配合使用" size="small">
        <Paragraph type="secondary">
          实际业务中，先用 createFilterValueMapper 将筛选值映射为接口参数格式，再用 filterToUrlParams 序列化到 URL
        </Paragraph>
        <Title level={5}>映射后的筛选值（用于接口请求）</Title>
        <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 12 }}>
{&#96;const mapFilterValue = createFilterValueMapper({
  keyword: 'string',   // 确保字符串
  city: 'multi',       // 多选 → string[]
  status: 'single',    // 单选 → string
});

mapFilterValue(filterValue, getFilterValue);
// →&#96;}
{'  ' + JSON.stringify(mappedSample, null, 2)}
        </pre>
      </Card>

      {/* ===== useUrlFilterValue ===== */}
      <Card title="useUrlFilterValue — 简化版 URL 筛选初始化" size="small">
        <Paragraph type="secondary">
          基于 useUrlFilter 封装的简化版 Hook，使用 createUrlFilterReader 解析 filterParams[key] 格式，自动解析 label:value，支持单选和多选
        </Paragraph>

        <Title level={5}>1. 数组形式 — 默认单选</Title>
        <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 12 }}>
{&#96;const [filter, setFilter] = useUrlFilterValue(['keyword', 'status']);

// URL: ?filterParams[keyword]=前端开发&filterParams[status]=招聘中:active
// → filter: [
//     { name: 'keyword', value: { label: '前端开发', value: '前端开发' } },
//     { name: 'status', value: { label: '招聘中', value: 'active' } }
//   ]&#96;}
        </pre>

        <Divider />

        <Title level={5}>2. 对象形式 — 多选 + 自定义转换</Title>
        <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 12 }}>
{&#96;// { multi: true } 表示多选，value 为数组
// 函数接收解析后的值，返回 filter 项或 null 跳过
const [filter, setFilter] = useUrlFilterValue({
  keyword: true,                   // 单选，默认转换
  city: { multi: true },           // 多选
  status: (parsed) => parsed       // 自定义：直接用解析值
    ? { name: 'status', value: parsed }
    : null
});

// URL: ?filterParams[city]=上海:010,北京:020
// → city 的 value: [{ label: '上海', value: '010' }, { label: '北京', value: '020' }]&#96;}
        </pre>

        <Divider />

        <Title level={5}>对比 useUrlFilter</Title>
        <pre style={{ background: '#fff3cd', padding: 8, borderRadius: 4, fontSize: 12 }}>
{&#96;// useUrlFilter（完整控制，需手动解析）
const [filter, setFilter] = useUrlFilter({
  readUrlParams: (searchParams) => {
    const { takeFilterEntry, getConsumedKeys } = createUrlFilterReader(searchParams);
    const keyword = takeFilterEntry('keyword');
    const city = takeFilterEntry('city', { multi: true });
    return { consumedKeys: getConsumedKeys(), keyword, city };
  },
  buildFilter: ({ keyword, city }) => [
    ...(keyword ? [{ name: 'keyword', value: keyword }] : []),
    ...(city ? [{ name: 'city', value: city }] : []),
  ]
});

// useUrlFilterValue（等价简化写法）
const [filter, setFilter] = useUrlFilterValue({
  keyword: true,
  city: { multi: true }
});&#96;}
        </pre>
      </Card>
    </Space>
  );
};

render(<BaseExample />);

```

- 筛选值拦截器
- 展示 filterInterceptors、singleSelectInterceptor、multiSelectInterceptor 拦截器的用法，解决 SuperSelect 组件 { id, name } 与 Filter 上下文 { label, value } 格式不匹配的问题
- _Filter(@components/Filter),antd(antd)

```jsx
const {
  default: Filter,
  SuperSelectFilterItem,
  filterInterceptors,
  singleSelectInterceptor,
  multiSelectInterceptor,
  getFilterValue,
  pickSelectValues,
} = _Filter;
const { useState } = React;
const { Space, Card, Divider, Typography, Alert } = antd;

const { Text, Title, Paragraph } = Typography;

// filterInterceptors 提供了 single 和 multi 两种预设拦截器
// 适用于 SuperSelectFilterItem 等使用 { id, name } 格式的组件
// interceptor.input：将 { label, value } 转为 { id, name }（传入组件的 value 格式）
// interceptor.output：将 { id, name } 转回 { label, value }（筛选上下文的 value 格式）

const BaseExample = () => {
  const [value1, onChange1] = useState([]);
  const [value2, onChange2] = useState([]);

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Alert
        message="拦截器（Interceptor）说明"
        description="SuperSelect 等组件使用 { id, name } 格式，而 Filter 上下文使用 { label, value } 格式。filterInterceptors 提供了预设的格式转换拦截器，通过 withFieldItem 的 interceptor 属性自动转换。"
        type="info"
        showIcon
      />

      <Card title="singleSelectInterceptor — 单选拦截器" size="small">
        <Paragraph type="secondary">
          适用于 valueKey="id" labelKey="name" 的单选 SuperSelect 场景，自动在 {&#96;{label, value}&#96;} 和 {&#96;{id, name}&#96;} 之间转换
        </Paragraph>
        <Filter
          value={value1}
          onChange={(value) => {
            console.log('筛选值:', getFilterValue(value));
            onChange1(value);
          }}
          list={[
            [
              <SuperSelectFilterItem
                label="项目负责人"
                name="manager"
                interceptor={singleSelectInterceptor}
                options={[
                  { label: '张明', value: 'zhangming', description: '技术部经理' },
                  { label: '李娜', value: 'lina', description: '产品部总监' },
                  { label: '王磊', value: 'wanglei', description: '设计部主管' },
                ]}
              />,
              <SuperSelectFilterItem
                label="项目状态"
                name="status"
                interceptor={singleSelectInterceptor}
                options={[
                  { label: '进行中', value: 'ongoing', description: '项目正在执行' },
                  { label: '已完成', value: 'completed', description: '项目已交付' },
                  { label: '已暂停', value: 'paused', description: '项目暂停中' },
                ]}
              />,
            ],
          ]}
        />
        {value1.length > 0 && (
          <>
            <Divider />
            <Title level={5}>当前筛选值</Title>
            <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 12 }}>
              {JSON.stringify(getFilterValue(value1), null, 2)}
            </pre>
            <Title level={5}>pickSelectValues 提取原始值</Title>
            <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 12 }}>
              {JSON.stringify(Object.fromEntries(
                value1.map(item => [item.name, pickSelectValues(item.value)])
              ), null, 2)}
            </pre>
          </>
        )}
      </Card>

      <Card title="multiSelectInterceptor — 多选拦截器" size="small">
        <Paragraph type="secondary">
          适用于 valueKey="id" labelKey="name" 的多选 SuperSelect 场景，自动在 {&#96;[{label, value}]&#96;} 和 {&#96;[{id, name}]&#96;} 之间转换
        </Paragraph>
        <Filter
          value={value2}
          onChange={(value) => {
            console.log('筛选值:', getFilterValue(value));
            onChange2(value);
          }}
          list={[
            [
              <SuperSelectFilterItem
                label="团队成员"
                name="members"
                interceptor={multiSelectInterceptor}
                options={[
                  { label: '陈思远', value: 'chensiyuan', description: '高级前端工程师' },
                  { label: '赵晓峰', value: 'zhaoxiaofeng', description: '后端架构师' },
                  { label: '刘雨桐', value: 'liuyutong', description: 'UI设计师' },
                  { label: '孙浩然', value: 'sunhaoran', description: '测试工程师' },
                ]}
              />,
              <SuperSelectFilterItem
                label="技术栈"
                name="techStack"
                interceptor={multiSelectInterceptor}
                options={[
                  { label: 'React', value: 'react', description: '前端框架' },
                  { label: 'Vue', value: 'vue', description: '前端框架' },
                  { label: 'Node.js', value: 'nodejs', description: '后端运行时' },
                  { label: 'Python', value: 'python', description: '后端语言' },
                ]}
              />,
            ],
          ]}
        />
        {value2.length > 0 && (
          <>
            <Divider />
            <Title level={5}>当前筛选值</Title>
            <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 12 }}>
              {JSON.stringify(getFilterValue(value2), null, 2)}
            </pre>
            <Title level={5}>pickSelectValues 提取原始值</Title>
            <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 12 }}>
              {JSON.stringify(Object.fromEntries(
                value2.map(item => [item.name, pickSelectValues(item.value)])
              ), null, 2)}
            </pre>
          </>
        )}
      </Card>

      <Card title="filterInterceptors 快捷引用" size="small">
        <Paragraph type="secondary">
          filterInterceptors 对象同时提供了 single 和 multi 两种拦截器，可以直接解构使用：
        </Paragraph>
        <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 12 }}>
{&#96;// 方式一：直接引用
import { singleSelectInterceptor, multiSelectInterceptor } from '@components/Filter';

// 方式二：从 filterInterceptors 解构
const { single, multi } = filterInterceptors;

// single 等价于 singleSelectInterceptor
// multi 等价于 multiSelectInterceptor&#96;}
        </pre>
      </Card>
    </Space>
  );
};

render(<BaseExample />);

```

### API

### Filter 组件

筛选组件的主入口，用于构建灵活的筛选条件界面。支持受控和非受控模式，自动管理筛选值状态。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| value | 筛选值数组，受控模式使用 | array | 否 | [] |
| onChange | 筛选值变化回调函数 | function | 否 | - |
| defaultValue | 默认筛选值 | array | 否 | [] |
| list | 筛选项配置数组，支持多行布局 | array | 否 | - |
| displayLine | 默认显示的行数，超过则支持展开/收起 | number | 否 | 1 |
| label | 筛选标题，默认显示"筛选" | ReactNode | 否 | - |
| extra | 额外内容，通常用于放置搜索输入框等 | ReactNode | 否 | - |
| extraExpand | 额外展开内容，显示在已选筛选值右侧 | ReactNode | 否 | - |
| className | 自定义类名 | string | 否 | - |

#### value 数据结构

筛选值数组中每个元素的结构：

```javascript
{
  name: 'city',      // 筛选字段名
  label: '城市',     // 筛选项标签
  value: [           // 筛选值，可以是单个值或数组
    { label: '上海', value: '010' },
    { label: '北京', value: '020' }
  ]
}
```

### AdvancedFilter 组件

高级筛选组件，适用于需要展示多个筛选条件且支持展开/收起的场景。相比普通 Filter 组件，提供更紧凑的布局。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| value | 筛选值数组 | array | 否 | [] |
| onChange | 筛选值变化回调函数 | function | 否 | - |
| defaultValue | 默认筛选值 | array | 否 | [] |
| list | 筛选项配置数组 | array | 否 | - |
| more | 更多筛选项，支持展开/收起 | ReactNode | 否 | - |

### FilterLines 组件

筛选项布局组件，用于按照行展示筛选项，支持展开/收起功能。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| list | 筛选项配置数组，支持多行布局 | array | 否 | - |
| displayLine | 默认显示的行数 | number | 否 | 1 |
| label | 筛选标题 | ReactNode | 否 | - |
| extra | 额外内容 | ReactNode | 否 | - |
| className | 自定义类名 | string | 否 | - |

### FilterValueDisplay 组件

筛选值展示组件，用于展示已选择的筛选条件，支持单个删除和清空全部。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| value | 筛选值数组 | array | 是 | - |
| onChange | 筛选值变化回调函数 | function | 是 | - |
| extraExpand | 额外展开内容，显示在清空按钮左侧 | ReactNode | 否 | - |

### FilterItem 组件

筛选项容器组件，提供统一的样式和交互效果。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 筛选项标签 | ReactNode | 否 | - |
| open | 是否打开下拉 | boolean | 否 | - |
| active | 是否激活状态（有选中值时自动激活） | boolean | 否 | - |
| children | 筛选项内容 | ReactNode | 否 | - |

### PopoverItem 组件

弹出式筛选项组件，基于 Popover 实现。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 筛选项标签 | ReactNode | 否 | - |
| name | 字段名 | string | 否 | - |
| children | 渲染函数，接收 { value, onChange } 参数 | function | 是 | - |

### SearchInput 组件

搜索输入框组件，通常用于放置在筛选器右侧的搜索功能。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| placeholder | 输入框占位符 | string | 否 | - |
| value | 输入框值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### FilterItemContainer 组件

筛选项容器组件，用于包装需要传递额外属性的筛选项。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| name | 字段名 | string | 否 | - |
| label | 字段标签 | string | 否 | - |
| children | 渲染函数，接收筛选项 props | function | 是 | - |

### InputFilterItem 组件

文本输入筛选项组件，用于文本类型的筛选。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| placeholder | 输入框占位符 | string | 否 | 请输入{label} |
| value | 输入框值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### DatePickerFilterItem 组件

日期选择筛选项组件，支持多种日期选择模式。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| picker | 日期选择器类型，可选值：`date`、`week`、`month`、`quarter`、`year` | string | 否 | `date` |
| value | 日期值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### DateRangePickerFilterItem 组件

日期范围选择筛选项组件，用于选择日期范围。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| value | 日期范围值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### TypeDateRangePickerFilterItem 组件

类型化日期范围选择筛选项组件，支持日期类型选择（如创建时间、更新时间等）。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| allowEmpty | 是否允许清空 [开始时间清空, 结束时间清空] | array | 否 | [false, false] |
| value | 日期范围值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### CityFilterItem 组件

城市选择筛选项组件，支持省市区三级联动选择。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| value | 城市值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |
| single | 是否单选 | boolean | 否 | false |

### NumberRangeFilterItem 组件

数值范围筛选项组件，用于选择数值范围。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| unit | 数值单位 | string | 否 | - |
| value | 数值范围值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### AdvancedSelectFilterItem 组件

高级选择筛选项组件，支持远程数据加载、分页、搜索等功能。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| api | API 配置对象 | object | 否 | - |
| api.loader | 数据加载函数 | function | 否 | - |
| value | 选择值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### SuperSelectFilterItem 组件

超级选择筛选项组件，支持展示描述信息、图标等丰富的选项内容。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| options | 选项数据数组 | array | 否 | - |
| interceptor | 值转换拦截器，用于在组件内部格式和筛选上下文格式之间转换 | object | 否 | - |
| interceptor.input | 输入拦截器，将上下文值转为组件内部格式 | function | 否 | - |
| interceptor.output | 输出拦截器，将组件内部值转为上下文格式 | function | 否 | - |
| value | 选择值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### SuperSelectTableListFilterItem 组件

超级表格列表选择筛选项组件，以表格形式展示选项，支持展示多列信息。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| interceptor | 值转换拦截器 | object | 否 | - |
| interceptor.input | 输入拦截器 | function | 否 | - |
| interceptor.output | 输出拦截器 | function | 否 | - |
| value | 选择值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### UserFilterItem 组件

用户选择筛选项组件，专门用于用户选择场景。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| api | API 配置对象 | object | 否 | - |
| api.loader | 数据加载函数 | function | 否 | - |
| value | 用户值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### SuperSelectUserFilterItem 组件

超级用户选择筛选项组件，支持展示用户描述信息。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| api | API 配置对象 | object | 否 | - |
| api.loader | 数据加载函数 | function | 否 | - |
| value | 用户值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### FunctionSelectFilterItem 组件

职能选择筛选项组件，用于选择职能信息。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| selectLevel | 选择层级 | number | 否 | - |
| maxLength | 最大选择数量 | number | 否 | - |
| single | 是否单选 | boolean | 否 | false |
| onlyAllowLastLevel | 是否只允许选择最后一级 | boolean | 否 | false |
| value | 职能值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### IndustrySelectFilterItem 组件

行业选择筛选项组件，用于选择行业信息。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| selectLevel | 选择层级 | number | 否 | - |
| maxLength | 最大选择数量 | number | 否 | - |
| single | 是否单选 | boolean | 否 | false |
| onlyAllowLastLevel | 是否只允许选择最后一级 | boolean | 否 | false |
| value | 行业值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### CascaderFilterItem 组件

级联选择筛选项组件，用于级联数据的选择。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| options | 选项数据数组 | array | 否 | - |
| value | 选择值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### TreeFilterItem 组件

树形选择筛选项组件，用于树形结构数据的选择。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| api | API 配置对象 | object | 否 | - |
| api.loader | 数据加载函数 | function | 否 | - |
| fieldNames | 字段名映射 | object | 否 | - |
| fieldNames.title | 标题字段名 | string | 否 | `title` |
| fieldNames.key | 键字段名 | string | 否 | `key` |
| fieldNames.children | 子节点字段名 | string | 否 | `children` |
| single | 是否单选 | boolean | 否 | false |
| value | 选择值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### 高级字段组件

#### ListFilterItem 组件（AdvancedFilter.fields）

列表选择筛选项组件，以标签形式展示选项，支持单选和多选。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| label | 字段标签 | string | 否 | - |
| name | 字段名 | string | 否 | - |
| items | 选项数据数组 | array | 否 | - |
| single | 是否单选 | boolean | 否 | false |
| maxLength | 最大选择数量 | number | 否 | 5 |
| custom | 自定义筛选项 | object | 否 | - |
| value | 选择值 | object | 否 | - |
| onChange | 值变化回调函数 | function | 否 | - |

### 工具函数

#### getFilterValue

将筛选值数组转换为对象格式。

**函数签名：**
```javascript
getFilterValue(filterValue: array): object
```

**参数说明：**

| 参数名 | 说明 | 类型 |
|--------|------|------|
| filterValue | 筛选值数组 | array |

**返回值：**

转换后的对象，格式为 `{ name: value, ... }`，其中 value 是提取的值数组或单个值。

**示例：**
```javascript
const filterValue = [
  { name: 'city', value: [{ label: '上海', value: '010' }] },
  { name: 'text', value: { label: '测试', value: 'test' } }
];
const result = getFilterValue(filterValue);
// result: { city: ['010'], text: 'test' }
```

#### useFilter

获取筛选上下文的 Hook。

**函数签名：**
```javascript
useFilter(): object
```

**返回值：**

| 属性名 | 说明 | 类型 |
|--------|------|------|
| value | 筛选值 Map | Map |
| onChange | 筛选值变化函数 | function |

#### withFilterValue

高阶组件，用于自动连接筛选上下文。

**函数签名：**
```javascript
withFilterValue(WrappedComponent): ReactComponent
```

**参数说明：**

| 参数名 | 说明 | 类型 |
|--------|------|------|
| WrappedComponent | 被包装的组件 | ReactComponent |

**新增 Props：**

| 属性名 | 说明 | 类型 |
|--------|------|------|
| name | 字段名 | string |
| label | 字段标签 | string |

#### withFieldItem

高阶组件，用于将表单字段组件包装为筛选项组件。

**函数签名：**
```javascript
withFieldItem(WrappedComponent): ReactComponent
```

**参数说明：**

| 参数名 | 说明 | 类型 |
|--------|------|------|
| WrappedComponent | 被包装的组件 | ReactComponent |

**新增 Props：**

| 属性名 | 说明 | 类型 |
|--------|------|------|
| name | 字段名 | string |
| label | 字段标签 | string |
| interceptor | 拦截器，用于值转换 | object |
| interceptor.input | 输入拦截器 | function |
| interceptor.output | 输出拦截器 | function |

#### pickSelectValues

从筛选值中提取原始值数组。支持 `null`/`undefined`、原始值、`{ value }` 对象、`{ id }` 对象、以及它们的数组。

**函数签名：**
```javascript
pickSelectValues(value): string[]
```

**参数说明：**

| 参数名 | 说明 | 类型 |
|--------|------|------|
| value | 筛选值，支持多种格式 | any |

**返回值：**

提取后的字符串值数组，空值会被过滤。

**示例：**
```javascript
pickSelectValues([{ value: 1 }, { id: 2 }, '3'])
// => ['1', '2', '3']

pickSelectValues({ value: 'open' })
// => ['open']

pickSelectValues(null)
// => []
```

#### createFilterValueMapper

声明式创建 `mapFilterValue` 函数。`Filter.getFilterValue` 默认只读取 `{ value }` 格式，而 SuperSelectFilterItem 等组件使用 `{ id, name }` 格式，需要额外处理。此工具通过声明字段映射规则，自动生成符合 `(filter, getFilterValue) => value` 签名的函数。

**函数签名：**
```javascript
createFilterValueMapper(fieldMappers): function
```

**参数说明：**

| 参数名 | 说明 | 类型 | 必填 |
|--------|------|------|------|
| fieldMappers | 字段名到映射规则的映射 | object | 是 |
| fieldMappers[fieldName] | 映射规则，支持字符串或函数 | string \| function | 是 |

**映射规则类型：**

| 类型值 | 说明 | 输出格式 |
|--------|------|----------|
| `'string'` | 确保值为字符串类型 | `string` |
| `'multi'` | 多选，从 filter entry 提取值数组 | `string[]` |
| `'single'` | 单选，从 filter entry 提取第一个值 | `string` |
| `function` | 自定义转换函数，接收 `(rawValue, { entry, filter, value })` 返回新值 | any |

**返回值：**

返回一个 `mapFilterValue` 函数，签名为 `(filter, getFilterValue) => object`，可直接传给 BizUnit 等组件的 `mapFilterValue` 选项。

**示例：**
```javascript
const mapFilterValue = createFilterValueMapper({
  id: 'string',
  roles: 'multi',
  tenantOrgId: 'single',
  status: (rawValue) => normalizeStatus(rawValue)
});
const filterValue = mapFilterValue(filter, Filter.getFilterValue);
```

#### useUrlFilter

从 URL 参数初始化 Filter 状态的 Hook。读取 URL 参数构建初始筛选值，并在挂载后自动清除已消费的 URL 参数。

**函数签名：**
```javascript
useUrlFilter(options): [array, function]
```

**参数说明：**

| 参数名 | 说明 | 类型 | 必填 |
|--------|------|------|------|
| options | 配置对象 | object | 是 |
| options.readUrlParams | 读取 URL 参数的函数，返回包含 `consumedKeys` 的对象 | function | 是 |
| options.buildFilter | 根据 readUrlParams 返回值构建初始 filter 数组 | function | 是 |

**返回值：**

| 返回值 | 说明 | 类型 |
|--------|------|------|
| [0] | 初始筛选值数组 | array |
| [1] | 设置筛选值的函数 | function |

**示例：**
```javascript
const [filter, setFilter] = useUrlFilter({
  readUrlParams: (searchParams) => {
    const { take, getConsumedKeys } = createUrlParamsReader(searchParams);
    const orgId = take('tenantOrgId');
    return { consumedKeys: getConsumedKeys(), orgId };
  },
  buildFilter: ({ orgId }) => [
    ...(orgId ? [{ name: 'tenantOrgId', value: { label: orgId, value: orgId } }] : [])
  ]
});
```

#### useUrlFilterValue

从 URL 参数初始化 Filter 状态的 Hook（简化版）。基于 `useUrlFilter` 封装，使用 `createUrlFilterReader` 解析 `filterParams[key]` 格式的 URL 参数，自动解析 `label:value` 格式，支持单选和多选。

**函数签名：**
```javascript
useUrlFilterValue(mapping): [array, function]
```

**参数说明：**

| 参数名 | 说明 | 类型 | 必填 |
|--------|------|------|------|
| mapping | URL 参数映射配置，支持数组或对象格式 | string[] \| object | 是 |

**mapping 格式：**

- **数组形式**：`['key1', 'key2']`，默认单选，自动创建 `{ name: key, value: { label, value } }` 格式的筛选项
- **对象形式**：`{ key1: true, key2: { multi: true }, key3: fn }`
  - 值为 `true`：单选，使用默认转换
  - 值为 `{ multi: true }`：多选，value 为 `[{ label, value }, ...]` 数组
  - 值为函数：自定义转换，接收解析后的值（单选为 `{ label, value }`，多选为数组），返回 filter 项或 `null`/falsy 跳过

**返回值：**

| 返回值 | 说明 | 类型 |
|--------|------|------|
| [0] | 初始筛选值数组 | array |
| [1] | 设置筛选值的函数 | function |

**示例：**
```javascript
// 数组形式（默认单选）
const [filter, setFilter] = useUrlFilterValue(['keyword', 'status']);
// URL: ?filterParams[keyword]=前端开发&filterParams[status]=招聘中:active
// → filter: [
//     { name: 'keyword', value: { label: '前端开发', value: '前端开发' } },
//     { name: 'status', value: { label: '招聘中', value: 'active' } }
//   ]

// 对象形式（多选 + 自定义转换）
const [filter, setFilter] = useUrlFilterValue({
  keyword: true,
  city: { multi: true },
  status: (parsed) => parsed ? { name: 'status', value: parsed } : null
});
// URL: ?filterParams[city]=上海:010,北京:020
// → city 的 value: [{ label: '上海', value: '010' }, { label: '北京', value: '020' }]
```

#### createUrlParamsReader

创建 URL 参数读取器，自动追踪已消费的参数 key。

**函数签名：**
```javascript
createUrlParamsReader(searchParams): { take, getConsumedKeys }
```

**参数说明：**

| 参数名 | 说明 | 类型 | 必填 |
|--------|------|------|------|
| searchParams | React Router 的 searchParams 对象 | URLSearchParams | 是 |

**返回值：**

| 属性名 | 说明 | 类型 |
|--------|------|------|
| take | 读取指定 key 的值并标记为已消费 | function |
| getConsumedKeys | 获取所有已消费的 key 列表 | function |

#### stripConsumedUrlParams

从 URL 参数中移除已消费的 key，返回新的 URLSearchParams。无变化时返回 `null`。

**函数签名：**
```javascript
stripConsumedUrlParams(searchParams, consumedKeys): URLSearchParams | null
```

**参数说明：**

| 参数名 | 说明 | 类型 | 必填 |
|--------|------|------|------|
| searchParams | 当前 URL 参数 | URLSearchParams | 是 |
| consumedKeys | 需要移除的 key 列表 | string[] | 是 |

**返回值：**

移除后的新 URLSearchParams 对象，无变化返回 `null`。

#### filterToUrlParams

将筛选值数组序列化为 URLSearchParams，保留 label 信息以便反序列化还原完整筛选状态。参数以 `prefix[key]` 格式存入 URL，避免与其他查询参数冲突。

**序列化格式**（使用冒号分隔 label 和 value，逗号分隔多值）：
- 单值且 label === value：`prefix[name]=value`（如输入框）
- 单值且 label !== value：`prefix[name]=label:value`
- 多值：`prefix[name]=label1:value1,label2:value2`

**函数签名：**
```javascript
filterToUrlParams(filterValue, options?): URLSearchParams
```

**参数说明：**

| 参数名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| filterValue | 筛选值数组，格式为 `[{ name, label, value }, ...]` | array | 是 | - |
| options.prefix | URL 参数前缀 | string | 否 | `'filterParams'` |

**示例：**
```javascript
const params = filterToUrlParams([
  { name: 'keyword', label: '关键词', value: { label: '测试', value: '测试' } },
  { name: 'city', label: '城市', value: [{ label: '上海', value: '010' }, { label: '北京', value: '020' }] },
  { name: 'status', label: '状态', value: { label: '启用', value: 'active' } },
]);
// params.toString() => 'filterParams[keyword]=测试&filterParams[city]=上海:010,北京:020&filterParams[status]=启用:active'
```

#### createUrlFilterReader

创建 URL 筛选参数读取器，自动追踪已消费的参数 key。配合 `useUrlFilter` 使用，读取后返回的 `consumedKeys` 可被自动从 URL 中清除。

**函数签名：**
```javascript
createUrlFilterReader(searchParams, options?): { takeFilterEntry, getConsumedKeys }
```

**参数说明：**

| 参数名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| searchParams | React Router 的 searchParams 对象 | URLSearchParams | 是 | - |
| options.prefix | URL 参数前缀，需与 `filterToUrlParams` 使用的前缀一致 | string | 否 | `'filterParams'` |

**返回值：**

| 属性名 | 说明 | 类型 |
|--------|------|------|
| takeFilterEntry | 读取指定 key 的筛选值并标记为已消费 | function |
| getConsumedKeys | 获取所有已消费的 key 列表（含前缀） | function |

**takeFilterEntry 签名：**
```javascript
takeFilterEntry(key, options?): { label: string, value: string } | { label: string, value: string }[] | null
```

| 参数名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| key | 参数名（不含前缀） | string | 是 | - |
| options.multi | 是否多选，多选返回数组 | boolean | 否 | false |

**示例：**
```javascript
const [filter, setFilter] = useUrlFilter({
  readUrlParams: (searchParams) => {
    const { takeFilterEntry, getConsumedKeys } = createUrlFilterReader(searchParams);
    const keyword = takeFilterEntry('keyword');
    const city = takeFilterEntry('city', { multi: true });
    return { consumedKeys: getConsumedKeys(), keyword, city };
  },
  buildFilter: ({ keyword, city }) => [
    ...(keyword ? [{ name: 'keyword', label: '关键词', value: keyword }] : []),
    ...(city ? [{ name: 'city', label: '城市', value: city }] : []),
  ],
});
```

#### parseFilterEntry

解析 URL 参数中的单个筛选值项，反序列化为 `{ label, value }` 对象。

**解析规则：**
- 无冒号：label 和 value 相同，如 `"测试"` → `{ label: '测试', value: '测试' }`
- 有冒号：冒号前为 label，冒号后为 value，如 `"启用:active"` → `{ label: '启用', value: 'active' }`

**函数签名：**
```javascript
parseFilterEntry(str): { label: string, value: string }
```

**参数说明：**

| 参数名 | 说明 | 类型 | 必填 |
|--------|------|------|------|
| str | URL 参数中的原始字符串 | string | 是 |

**示例：**
```javascript
parseFilterEntry('测试')
// => { label: '测试', value: '测试' }

parseFilterEntry('启用:active')
// => { label: '启用', value: 'active' }
```

#### takeFilterEntry

从 URL 参数中读取筛选值项（低级 API）。推荐使用 `createUrlFilterReader` 代替，可自动追踪已消费的 key。

**函数签名：**
```javascript
takeFilterEntry(searchParams, key, options?): { label: string, value: string } | { label: string, value: string }[] | null
```

**参数说明：**

| 参数名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| searchParams | URL 参数对象 | URLSearchParams | 是 | - |
| key | 参数名（不含前缀） | string | 是 | - |
| options.multi | 是否多选，多选返回数组 | boolean | 否 | false |
| options.prefix | URL 参数前缀 | string | 否 | `'filterParams'` |

**示例：**
```javascript
// URL: ?filterParams[city]=上海:010,北京:020
takeFilterEntry(searchParams, 'city', { multi: true })
// => [{ label: '上海', value: '010' }, { label: '北京', value: '020' }]
```

#### filterInterceptors

预设拦截器集合，提供用于 SuperSelect 系列组件的值格式转换拦截器。SuperSelect 等组件使用 `{ id, name }` 格式，而 Filter 上下文使用 `{ label, value }` 格式，需要通过拦截器进行自动转换。

**导出成员：**

|| 名称 | 说明 |
||------|------|
|| filterInterceptors | 拦截器集合对象，包含 `single` 和 `multi` 两个拦截器 |
|| singleSelectInterceptor | 单选拦截器，用于 valueKey="id" labelKey="name" 的单选场景 |
|| multiSelectInterceptor | 多选拦截器，用于 valueKey="id" labelKey="name" 的多选场景 |

**filterInterceptors 结构：**

|| 属性名 | 说明 | 类型 |
||--------|------|------|
|| single | 单选拦截器，等价于 singleSelectInterceptor | object |
|| multi | 多选拦截器，等价于 multiSelectInterceptor | object |

**拦截器结构：**

每个拦截器包含 `input` 和 `output` 两个函数：

|| 属性名 | 说明 | 转换方向 |
||--------|------|----------|
|| input | 输入拦截器 | 将上下文值 `{ label, value }` 转为组件内部格式 `{ id, name }` |
|| output | 输出拦截器 | 将组件内部值 `{ id, name }` 转回上下文格式 `{ label, value }` |

**使用方式：**

配合 `SuperSelectFilterItem` 的 `interceptor` 属性使用：

```javascript
import { SuperSelectFilterItem, singleSelectInterceptor, multiSelectInterceptor } from '@components/Filter';

// 单选场景
<SuperSelectFilterItem interceptor={singleSelectInterceptor} ... />

// 多选场景
<SuperSelectFilterItem interceptor={multiSelectInterceptor} ... />

// 或通过 filterInterceptors 解构
const { single, multi } = filterInterceptors;
<SuperSelectFilterItem interceptor={single} ... />
```
