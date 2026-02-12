const {
  default: Filter,
  CascaderFilterItem,
  getFilterValue,
} = _Filter;
const { useState } = React;

const options = [
  {
    label: '浙江',
    value: 'zhejiang',
    children: [
      {
        label: '杭州',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '滨江区', value: 'binjiang' },
          { label: '余杭区', value: 'yuhang' },
        ],
      },
      {
        label: '宁波',
        value: 'ningbo',
        children: [
          { label: '海曙区', value: 'haishu' },
          { label: '江北区', value: 'jiangbei' },
        ],
      },
    ],
  },
  {
    label: '江苏',
    value: 'jiangsu',
    children: [
      {
        label: '南京',
        value: 'nanjing',
        children: [
          { label: '玄武区', value: 'xuanwu' },
          { label: '秦淮区', value: 'qinhuai' },
        ],
      },
      {
        label: '苏州',
        value: 'suzhou',
        children: [
          { label: '姑苏区', value: 'gusu' },
          { label: '吴中区', value: 'wuzhong' },
        ],
      },
    ],
  },
];

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
          <CascaderFilterItem
            label="地区选择"
            name="region"
            options={options}
            placeholder="请选择地区"
          />,
        ],
      ]}
    />
  );
};

render(<BaseExample />);
