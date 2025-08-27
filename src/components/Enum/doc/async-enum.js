const { default: Enum } = _Enum;
const { PureGlobal } = global;
const { Space, Button, message } = antd;
const { useState } = React;

const AsyncEnumExample = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  
  return (
    <PureGlobal
      preset={{
        locale: "zh-CN",
        enums: {
          // 异步加载枚举数据
          userStatus: async ({ language }) => {
            // 模拟从服务器获取数据
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([
                  { value: "active", description: "活跃" },
                  { value: "inactive", description: "非活跃" },
                  { value: "pending", description: "待审核" },
                  { value: "banned", description: "已禁用" },
                ]);
              }, 1500);
            });
          },
          // 同步枚举数据
          priority: [
            { value: "low", description: "低优先级" },
            { value: "medium", description: "中优先级" },
            { value: "high", description: "高优先级" },
            { value: "urgent", description: "紧急" },
          ],
        },
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <h4>异步加载枚举（带Loading状态）</h4>
          <Enum 
            key={refreshKey}
            moduleName="userStatus" 
            name="active"
            loading={<span>正在加载用户状态...</span>}
            placeholder="--"
          >
            {(data) => <div>当前状态：{data.description}</div>}
          </Enum>
        </div>
        
        <div>
          <h4>强制刷新缓存</h4>
          <Space>
            <Enum 
              moduleName="userStatus" 
              name="banned"
              force={refreshKey > 0}
            >
              {(data) => data.description}
            </Enum>
            <Button 
              onClick={() => {
                setRefreshKey(prev => prev + 1);
                message.info("已刷新缓存");
              }}
            >
              刷新缓存
            </Button>
          </Space>
        </div>
        
        <div>
          <h4>同步枚举数据（立即显示）</h4>
          <Space>
            <Enum moduleName="priority" name="high" />
            <Enum moduleName="priority" name="urgent">
              {(data) => <span style={{ color: "red" }}>{data.description}</span>}
            </Enum>
          </Space>
        </div>
      </Space>
    </PureGlobal>
  );
};

render(<AsyncEnumExample />);
