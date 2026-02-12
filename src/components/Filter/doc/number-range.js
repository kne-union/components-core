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
