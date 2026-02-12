const { default: File } = _File;
const { PureGlobal } = global;
const { getPublicPath } = remoteLoader;
const { Typography, Card, Space, Alert } = antd;

const { Paragraph, Text } = Typography;

const BaseExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert
        message="文件地址获取示例"
        description="演示如何通过 OSS ID 获取文件访问地址"
        type="info"
        showIcon
      />

      <Card title="员工头像地址">
        <File id="employee-avatar-001">
          {({ url, isLoading }) => (
            <Space direction="vertical">
              <Text strong>访问地址：</Text>
              <Paragraph copyable>
                {isLoading ? '加载中...' : url}
              </Paragraph>
            </Space>
          )}
        </File>
      </Card>

      <Card title="公司 Logo 地址">
        <File id="company-logo-main">
          {({ url, isLoading }) => (
            <Space direction="vertical">
              <Text strong>访问地址：</Text>
              <Paragraph copyable>
                {isLoading ? '加载中...' : url}
              </Paragraph>
            </Space>
          )}
        </File>
      </Card>
    </Space>
  );
};

render(
  <PureGlobal
    preset={{
      apis: {
        file: {
          getUrl: {
            loader: async ({ params }) => {
              const mapping = {
                "employee-avatar-001": "/avatar.png",
                "company-logo-main": "/mock/resume.pdf"
              };
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(getPublicPath("components-core") + mapping[params.id] || "");
                }, 500);
              });
            },
          },
        },
      },
    }}
  >
    <BaseExample />
  </PureGlobal>
);
