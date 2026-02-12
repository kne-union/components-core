const { DragArea, DragAreaOuter, UploadButton, DragButton, UploadTips } = _FileList;
const { Row, Col, Divider, Space, Typography, Alert, Card, message } = antd;

const { Text } = Typography;

const BaseExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert
        message="拖拽上传示例"
        description="支持拖拽文件到指定区域进行上传，或使用按钮点击上传"
        type="info"
        showIcon
      />

      <Card title="项目文档上传">
        <DragAreaOuter
          title={
            <Row>
              <Col flex={1}>
                <Text strong>上传项目文档</Text>
              </Col>
              <Col>
                <Space split={<Divider type="vertical" />}>
                  <DragButton />
                  <UploadButton>选择文件</UploadButton>
                </Space>
              </Col>
            </Row>
          }
          onFileSelected={(fileList) => {
            message.success(`已选择 ${fileList.length} 个文件`);
            console.log('选中的文件:', fileList);
          }}
          fileSize={10}
          maxLength={10}
        >
          <DragArea>
            <UploadTips
              icon={<span style={{ fontSize: '48px' }}>📁</span>}
              title="拖拽文件到这里"
              renderTips={(defaultTips, { fileSize, maxLength }) => (
                <div>
                  <div>{defaultTips}</div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    支持批量上传，最多 {maxLength} 个文件
                  </Text>
                </div>
              )}
            />
          </DragArea>
        </DragAreaOuter>
      </Card>

      <Card title="员工资料上传">
        <DragAreaOuter
          title={
            <Row>
              <Col flex={1}>
                <Text strong>上传员工资料</Text>
              </Col>
              <Col>
                <Space split={<Divider type="vertical" />}>
                  <DragButton />
                  <UploadButton>选择文件</UploadButton>
                </Space>
              </Col>
            </Row>
          }
          onFileSelected={(fileList) => {
            message.success(`已选择 ${fileList.length} 个文件`);
            console.log('选中的文件:', fileList);
          }}
          fileSize={5}
          accept={['.pdf', '.jpg', '.png', '.docx']}
        >
          <DragArea />
        </DragAreaOuter>
      </Card>
    </Space>
  );
};

render(<BaseExample />);
