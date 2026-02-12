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
      placeholder={`请选择${label}`}
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
