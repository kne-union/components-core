const { List } = _FileList;
const { Space, Card, Alert, Typography } = antd;
const { PureGlobal } = global;
const { getPublicPath } = remoteLoader;

const { Title } = Typography;

const BaseExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert
        message="文件列表示例"
        description="展示文件上传状态、文件信息及操作功能"
        type="info"
        showIcon
      />

      <Card title="项目文档库">
        <List
          dataSource={[
            {
              uuid: "upload-001",
              type: "uploading",
              filename: "项目需求规格说明书.docx",
            },
            {
              id: "doc-project-plan",
              filename: "项目执行计划.pdf",
              date: "2024-01-15T10:30:00.000+08:00",
              userName: "张三",
            },
            {
              id: "doc-technical-design",
              filename: "技术架构设计文档.pdf",
              date: "2024-01-16T14:20:00.000+08:00",
              userName: "李四",
            },
            {
              id: "doc-api-interface",
              filename: "API 接口文档.md",
              date: "2024-01-17T09:15:00.000+08:00",
              userName: "王五",
            },
          ]}
          apis={{
            onEdit: async (formData, itemData) => {
              console.log('编辑文件:', formData, itemData);
            },
            onDelete: async (itemData) => {
              console.log('删除文件:', itemData);
            },
            onPreview: async (itemData) => {
              console.log('预览文件:', itemData);
            },
          }}
        />
      </Card>

      <Card title="员工简历上传">
        <List
          dataSource={[
            {
              id: "resume-zhangsan",
              filename: "张三-高级前端工程师-简历.pdf",
              date: "2024-01-18T16:45:00.000+08:00",
              userName: "张三",
            },
            {
              id: "resume-lisi",
              filename: "李四-产品经理-简历.doc",
              date: "2024-01-19T11:20:00.000+08:00",
              userName: "李四",
            },
          ]}
          apis={{
            onEdit: async (formData, itemData) => {
              console.log('编辑简历:', formData, itemData);
            },
            onDelete: async (itemData) => {
              console.log('删除简历:', itemData);
            },
            onPreview: async (itemData) => {
              console.log('预览简历:', itemData);
            },
          }}
        />
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
                  resolve(getPublicPath("components-core") + "/mock/resume.pdf");
                }, 600);
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
