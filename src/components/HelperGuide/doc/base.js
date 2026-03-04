const { default: HelperGuide } = _HelperGuide;
const { PureGlobal } = Global;
const { Space, Typography, Card } = antd;

const { Title, Text } = Typography;

const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        enums: {
          helperGuide: () => [
            {
              value: "username",
              content: "请输入有效的用户名，长度为4-20个字符"
            },
            {
              value: "password",
              content: "密码必须包含字母、数字和特殊字符，长度为8-30个字符"
            }
          ]
        }
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card title="表单字段说明" size="small">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>用户名：</Text>
              <HelperGuide name="username" />
            </div>
            <div>
              <Text strong>密码：</Text>
              <HelperGuide name="password" />
            </div>
          </Space>
        </Card>
        <Card title="说明" size="small">
          <Text type="secondary">
            基础用法：只显示帮助内容，不显示链接。适用于简单的提示信息。
          </Text>
        </Card>
      </Space>
    </PureGlobal>
  );
};

render(<BaseExample />);
