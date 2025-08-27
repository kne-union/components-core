const { default: Enum } = _Enum;
const { PureGlobal } = global;
const { Space, Select, Divider } = antd;
const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        locale: "zh-CN",
        enums: {
          // 同步加载的枚举
          gender: [
            { value: "M", description: "男" },
            { value: "F", description: "女" },
          ],
          // 异步加载的枚举
          status: async ({ locale }) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([
                  { value: "1", description: "启用" },
                  { value: "0", description: "禁用" },
                ]);
              }, 500);
            });
          },
        },
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <h4>获取单个枚举值</h4>
          <Space>
            <span>性别：</span>
            <Enum moduleName="gender" name="M" />
            <Divider type="vertical" />
            <span>自定义渲染：</span>
            <Enum moduleName="gender" name="F">
              {(data) => <strong style={{ color: "#f5222d" }}>{data.description}</strong>}
            </Enum>
          </Space>
        </div>
        
        <div>
          <h4>获取枚举列表</h4>
          <Enum moduleName="gender">
            {(list) => {
              return (
                <Space>
                  <span>可选项：</span>
                  {list.map((item, index) => (
                    <span key={item.value}>
                      {item.description}
                      {index < list.length - 1 && "、"}
                    </span>
                  ))}
                </Space>
              );
            }}
          </Enum>
        </div>
        
        <div>
          <h4>渲染为下拉框</h4>
          <Enum moduleName="status">
            {(list) => {
              return (
                <Select
                  style={{ width: 150 }}
                  placeholder="请选择状态"
                  options={list.map((item) => ({
                    value: item.value,
                    label: item.description,
                  }))}
                />
              );
            }}
          </Enum>
        </div>
        
        <div>
          <h4>占位符和加载状态</h4>
          <Space>
            <span>状态：</span>
            <Enum 
              moduleName="status" 
              name="1"
              placeholder="加载中..."
            />
          </Space>
        </div>
        
        <div>
          <h4>使用format="option"直接获取选项格式</h4>
          <Enum moduleName="gender" format="option">
            {(list) => (
              <Select
                style={{ width: 150 }}
                placeholder="请选择性别"
                options={list}
              />
            )}
          </Enum>
        </div>
      </Space>
    </PureGlobal>
  );
};

render(<BaseExample />);