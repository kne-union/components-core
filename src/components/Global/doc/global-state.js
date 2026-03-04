const { PureGlobal, useGlobalContext, SetGlobal, GetGlobal } = _Global;
const { Space, Button, Input, Card, Typography, Divider } = antd;

const { Text } = Typography;

const GlobalContextExample = () => {
  const { global: userName, setGlobal: setUserName } = useGlobalContext('userName');
  const { global: userCount, setGlobal: setUserCount } = useGlobalContext('userCount');

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="全局状态管理 - 用户信息" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>用户名：</Text>
            <Text>{userName || '未设置'}</Text>
          </div>
          <div>
            <Text strong>用户数量：</Text>
            <Text>{userCount || 0}</Text>
          </div>
          <Divider style={{ margin: '12px 0' }} />
          <Space>
            <Button
              onClick={() => setUserName('张三')}
              disabled={userName === '张三'}
            >
              设置用户名为"张三"
            </Button>
            <Button
              onClick={() => setUserName('李四')}
              disabled={userName === '李四'}
            >
              设置用户名为"李四"
            </Button>
            <Button
              onClick={() => setUserName('')}
            >
              清空用户名
            </Button>
          </Space>
          <Space>
            <Button
              onClick={() => setUserCount((userCount || 0) + 1)}
            >
              用户数量 +1
            </Button>
            <Button
              onClick={() => setUserCount(0)}
              disabled={userCount === 0}
            >
              重置用户数量
            </Button>
          </Space>
        </Space>
      </Card>

      <SetGlobal globalKey="appName" value="Components-Core 示例应用">
        {({ global: appName }) => (
          <Card title="使用 SetGlobal 组件" size="small">
            <Text>应用名称：{appName}</Text>
          </Card>
        )}
      </SetGlobal>

      <GetGlobal globalKey="userName">
        {({ value }) => (
          <Card title="使用 GetGlobal 组件" size="small">
            <Text>当前用户名：{value || '未设置'}</Text>
          </Card>
        )}
      </GetGlobal>

      <Card title="说明" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text type="secondary">
            useGlobalContext Hook 提供了全局状态管理功能，状态保存在 Global 组件一级，
            不会随着组件销毁而销毁。适合用于需要在多个组件间共享的状态。
          </Text>
          <Text type="secondary">
            SetGlobal 和 GetGlobal 组件提供了更声明式的方式来设置和获取全局值，
            特别适合在 JSX 中直接使用。
          </Text>
        </Space>
      </Card>
    </Space>
  );
};

const BaseExample = () => {
  return (
    <PureGlobal>
      <GlobalContextExample />
    </PureGlobal>
  );
};

render(<BaseExample />);
