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
        <Text code>{`pickSelectValues([{ value: 1 }, { id: 2 }, '3'])`}</Text>
        <br />
        <Text>结果：{JSON.stringify(pickSelectValues([{ value: 1 }, { id: 2 }, '3']))}</Text>
        <Divider />
        <Text code>{`pickSelectValues({ value: 'open' })`}</Text>
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
