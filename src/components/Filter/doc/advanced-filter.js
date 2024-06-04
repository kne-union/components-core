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
  getFilterValue,
  FilterItemContainer,
} = _Filter;
const { useState } = React;

const { CityFilterItem: CityAdvancedFilterItem, ListFilterItem } =
  AdvancedFilter.fields;
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
          />,
        ],
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
