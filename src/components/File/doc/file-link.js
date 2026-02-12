const { FileLink, useFileModal } = _File;
const { getPublicPath } = remoteLoader;
const { PureGlobal } = global;
const { Space, Card, Alert, Typography, Button, Descriptions } = antd;

const { Title, Text } = Typography;

const CustomPreviewButton = ({ children, ...props }) => {
  const modal = useFileModal(props);
  return (
    <Button type="primary" onClick={() => modal()}>
      {props.originName || children}
    </Button>
  );
};

const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        apis: {
          file: {
            getUrl: {
              loader: async ({ params }) => {
                const mapping = {
                  "contract-001": "/avatar.png",
                  "contract-002": "/mock/resume.pdf",
                  "invoice-001": "/avatar.png",
                  "policy-001": "/mock/resume.pdf",
                };
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve(getPublicPath("components-core") + (mapping[params.id] || ""));
                  }, 500);
                });
              },
            },
          },
        },
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Alert
          message="文件链接示例"
          description="展示 FileLink 和 useFileModal 的使用方式"
          type="info"
          showIcon
        />

        <Card title="合同文档（FileLink）">
          <Space direction="vertical">
            <FileLink
              id="contract-001"
              originName="员工劳动合同.pdf"
            />
            <FileLink
              id="contract-002"
              originName="保密协议.docx"
            />
          </Space>
        </Card>

        <Card title="财务发票（使用 useFileModal 自定义按钮）">
          <Descriptions column={1} size="small">
            <Descriptions.Item label="发票编号">INV-2024-0001</Descriptions.Item>
            <Descriptions.Item label="开票日期">2024-01-20</Descriptions.Item>
            <Descriptions.Item label="发票类型">增值税专用发票</Descriptions.Item>
          </Descriptions>
          <div style={{ marginTop: 16 }}>
            <CustomPreviewButton
              id="invoice-001"
              originName="查看发票详情"
            />
          </div>
        </Card>

        <Card title="政策文档">
          <Space direction="vertical">
            <Text type="secondary">点击下方链接预览公司政策文档：</Text>
            <FileLink
              id="policy-001"
              originName="2024年度绩效考核管理办法.pdf"
            />
          </Space>
        </Card>
      </Space>
    </PureGlobal>
  );
};

render(<BaseExample />);
