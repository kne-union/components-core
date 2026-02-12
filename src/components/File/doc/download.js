const { Download } = _File;
const { PureGlobal } = global;
const { getPublicPath } = remoteLoader;
const { Space, Card, Alert, Typography, message } = antd;

const { Title, Text } = Typography;

const BaseExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert
        message="文件下载示例"
        description="演示不同类型文件的下载功能，包括成功和失败回调"
        type="info"
        showIcon
      />

      <Card title="人力资源相关文档下载">
        <Space direction="vertical">
          <div>
            <Text type="secondary">员工入职手册：</Text>
            <br />
            <Download
              id="doc-employee-handbook"
              filename="员工入职手册.pdf"
              onSuccess={() => message.success('员工入职手册下载成功')}
              onError={() => message.error('文件下载失败')}
            >
              点击下载
            </Download>
          </div>

          <div>
            <Text type="secondary">公司规章制度：</Text>
            <br />
            <Download
              id="doc-company-rules"
              filename="公司规章制度.docx"
              onSuccess={() => message.success('公司规章制度下载成功')}
            >
              点击下载
            </Download>
          </div>

          <div>
            <Text type="secondary">薪酬福利政策：</Text>
            <br />
            <Download
              id="doc-salary-policy"
              filename="薪酬福利政策.pdf"
              onSuccess={() => message.success('薪酬福利政策下载成功')}
            >
              点击下载
            </Download>
          </div>
        </Space>
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
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(getPublicPath("components-core") + "/avatar.png");
                }, 800);
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
