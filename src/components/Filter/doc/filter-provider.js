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
