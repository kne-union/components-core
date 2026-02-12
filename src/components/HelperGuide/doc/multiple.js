const { default: HelperGuide } = _HelperGuide;
const { PureGlobal } = Global;
const { Space, Typography, Card, Divider } = antd;

const { Title, Text } = Typography;

const MultipleExample = () => {
  return (
    <PureGlobal
      preset={{
        enums: {
          helperGuide: () => [
            {
              value: "user-profile",
              content: "用户个人信息配置，包括基本资料和联系方式",
              url: "https://example.com/docs/user-profile"
            },
            {
              value: "security-settings",
              content: "安全设置包括密码修改、两步验证等安全功能配置"
            },
            {
              value: "notification-preferences",
              content: "通知偏好设置，控制接收哪些类型的通知消息"
            },
            {
              value: "data-privacy",
              content: "数据隐私设置，管理个人数据的访问权限和使用方式",
              url: "https://example.com/docs/privacy"
            }
          ]
        }
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card title="用户设置页面" size="small">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Title level={5}>个人信息</Title>
              <HelperGuide name="user-profile" />
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div>
              <Title level={5}>安全设置</Title>
              <HelperGuide name="security-settings" />
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div>
              <Title level={5}>通知设置</Title>
              <HelperGuide name="notification-preferences" />
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div>
              <Title level={5}>隐私设置</Title>
              <HelperGuide name="data-privacy" />
            </div>
          </Space>
        </Card>
        <Card title="说明" size="small">
          <Text type="secondary">
            可以在同一个页面中使用多个 HelperGuide 组件，每个组件通过 name 属性
            引用不同的帮助内容。这种方式特别适合在配置页面、设置页面等多字段场景中使用。
          </Text>
        </Card>
      </Space>
    </PureGlobal>
  );
};

render(<MultipleExample />);
