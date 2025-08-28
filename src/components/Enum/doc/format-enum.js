const { default: Enum } = _Enum;
const { PureGlobal } = global;
const { Space, Divider, Card } = antd;

const FormatEnumExample = () => {
  return (
    <PureGlobal
      preset={{
        locale: "zh-CN",
        enums: {
          orderStatus: [
            { value: "created", description: "已创建", color: "#666" },
            { value: "paid", description: "已支付", color: "#1890ff" },
            { value: "shipped", description: "已发货", color: "#52c41a" },
            { value: "completed", description: "已完成", color: "#52c41a" },
            { value: "cancelled", description: "已取消", color: "#f5222d" },
          ],
        },
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Card title="不同格式化方式" size="small">
          <Space direction="vertical">
            <div>
              <strong>默认格式（format="default"）：</strong>
              <Enum moduleName="orderStatus" name="paid" format="default" />
            </div>
            
            <Divider />
            
            <div>
              <strong>原始对象（format="origin"）：</strong>
              <Enum moduleName="orderStatus" name="paid" format="origin">
                {(data) => (
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                )}
              </Enum>
            </div>
            
            <Divider />
            
            <div>
              <strong>选项格式（format="option"）：</strong>
              <Enum moduleName="orderStatus" name="paid" format="option">
                {(data) => (
                  <span>label: {data.label}, value: {data.value}</span>
                )}
              </Enum>
            </div>
          </Space>
        </Card>
        
        <Card title="自定义渲染" size="small">
          <Space>
            <Enum moduleName="orderStatus" name="shipped" format="origin">
              {(data) => (
                <span style={{ color: data.color }}>
                  ● {data.description}
                </span>
              )}
            </Enum>
            
            <Enum moduleName="orderStatus" name="cancelled" format="origin">
              {(data) => (
                <span style={{ 
                  padding: "2px 8px",
                  backgroundColor: data.color,
                  color: "#fff",
                  borderRadius: "4px"
                }}>
                  {data.description}
                </span>
              )}
            </Enum>
          </Space>
        </Card>
      </Space>
    </PureGlobal>
  );
};

render(<FormatEnumExample />);
