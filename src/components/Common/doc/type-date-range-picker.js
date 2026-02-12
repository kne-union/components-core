const { TypeDateRangePickerField } = _Common;
const { Space, Typography } = _antd;
const { useState } = React;

const BaseExample = () => {
  const [value, setValue] = useState({
    type: 'date',
    value: [],
  });

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text>当前值: {JSON.stringify(value)}</Typography.Text>
      <TypeDateRangePickerField
        value={value}
        onChange={setValue}
        placeholder={['开始日期', '结束日期']}
      />
    </Space>
  );
};

render(<BaseExample />);
