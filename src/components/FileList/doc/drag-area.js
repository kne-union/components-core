const { DragArea, DragAreaOuter, UploadButton, DragButton } = _FileList;
const { Row, Col, Divider, Space } = antd;

const BaseExample = () => {
  return (
    <DragAreaOuter
      title={
        <Row>
          <Col flex={1}>标题</Col>
          <Col>
            <Space split={<Divider type="vertical" />}>
              <DragButton />
              <UploadButton>上传</UploadButton>
            </Space>
          </Col>
        </Row>
      }
      onFileSelected={(fileList) => {
        console.log(fileList);
      }}
    >
      <DragArea />
    </DragAreaOuter>
  );
};

render(<BaseExample />);
