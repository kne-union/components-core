const { default: HelperGuide } = _HelperGuide;
const { PureGlobal } = Global;
const { Space, Typography, Card } = antd;

const { Text } = Typography;

const LinkExample = () => {
  return (
    <PureGlobal
      preset={{
        enums: {
          helperGuide: () => [
            {
              value: "api-doc",
              content: "查看 API 接口文档，了解详细的接口定义和使用说明",
              url: "https://example.com/api-docs"
            },
            {
              value: "quick-start",
              content: "快速开始指南，帮助您快速上手使用系统",
              url: "https://example.com/quick-start"
            }
          ]
        }
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card title="带帮助链接的提示" size="small">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>API 文档：</Text>
              <HelperGuide name="api-doc" />
            </div>
            <div>
              <Text strong>快速开始：</Text>
              <HelperGuide name="quick-start" />
            </div>
          </Space>
        </Card>
        <Card title="说明" size="small">
          <Text type="secondary">
            当配置中包含 url 字段时，HelperGuide 会显示"查看帮助"链接，
            点击后可以在新窗口打开对应的帮助文档。
          </Text>
        </Card>
      </Space>
    </PureGlobal>
  );
};

render(<LinkExample />);
