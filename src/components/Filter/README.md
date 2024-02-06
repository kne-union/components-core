
# Filter


### 概述




### 示例(全屏)

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
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

- 这里填写示例标题
- 这里填写示例说明
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
        ],
      ]}
    />
  );
};

render(<BaseExample />);

```

- 这里填写示例标题
- 这里填写示例说明
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


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

