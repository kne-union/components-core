# Filter

### 概述

Filter 是一个功能强大的筛选组件库，用于构建灵活的筛选条件界面。该组件提供了多种预置的筛选字段类型，支持自定义筛选项，并提供了完整的筛选值管理和展示功能。

核心特性包括：丰富的预置筛选字段，涵盖文本输入、日期选择、城市选择、用户选择、行业选择、职能选择等多种类型；灵活的筛选值管理，支持受控和非受控模式；支持展开/收起筛选项，避免筛选条件过多导致界面混乱；提供高级筛选组件，适用于复杂筛选场景；支持自定义字段和组合使用，满足各种业务需求；内置搜索输入框和筛选值展示组件，提升用户体验。

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
