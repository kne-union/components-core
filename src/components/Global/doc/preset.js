const { PureGlobal, usePreset } = _Global;
const { Button, Space, Typography, Card } = antd;

const { Text } = Typography;

// 模拟的 preset 配置
const mockPreset = {
  locale: 'zh-CN',
  permissions: ['user:view', 'user:edit', 'user:delete'],
  apis: {
    getUserList: '/api/users',
    updateUser: '/api/user/update'
  },
  enums: {
    status: {
      active: '启用',
      inactive: '停用'
    }
  },
  features: {
    debug: true,
    profile: 'production'
  }
};

const PresetExample = () => {
  const preset = usePreset();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="Preset 配置信息" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>语言设置：</Text>
            <Text>{preset.locale || '未设置'}</Text>
          </div>
          <div>
            <Text strong>权限列表：</Text>
            <Text>{preset.permissions?.join(', ') || '未设置'}</Text>
          </div>
          <div>
            <Text strong>API 接口：</Text>
            <Text code>{preset.apis?.getUserList || '未设置'}</Text>
          </div>
          <div>
            <Text strong>状态枚举：</Text>
            <Text>{JSON.stringify(preset.enums?.status) || '未设置'}</Text>
          </div>
          <div>
            <Text strong>特性配置：</Text>
            <Text>debug: {preset.features?.debug?.toString() || '未设置'}, profile: {preset.features?.profile || '未设置'}</Text>
          </div>
        </Space>
      </Card>
      <Card title="说明" size="small">
        <Text type="secondary">
          preset 是通过 Global 组件传入的全局配置，所有子组件都可以通过 usePreset Hook 访问。
          在实际业务中，preset 通常包含权限列表、API 接口、枚举值等全局配置信息。
        </Text>
      </Card>
    </Space>
  );
};

const BaseExample = () => {
  return (
    <PureGlobal preset={mockPreset}>
      <PresetExample />
    </PureGlobal>
  );
};

render(<BaseExample />);
