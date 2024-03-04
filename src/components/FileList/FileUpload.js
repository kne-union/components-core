import { Space, Divider, Row, Col } from "antd";
import DragArea, { DragAreaOuter, DragButton, UploadButton } from "./DragArea";
import { List } from "@components/File";
import { useFileUpload } from "@common/hocs/withInputFile";
import { usePreset } from "@components/Global";

const FileUpload = ({
  maxLength,
  list: previewList,
  setList,
  apis: currentApis,
  getPermission,
  fileSize,
  accept,
}) => {
  const { apis: baseApis } = usePreset();
  const apis = Object.assign({}, baseApis, currentApis);
  const { fileList: uploadingList, onFileSelected } = useFileUpload({
    maxLength,
    multiple: true,
    value: previewList,
    onChange: setList,
    concurrentCount: 1,
    onSave: apis.onSave,
    ossUpload: apis.ossUpload,
  });
  return (
    <DragAreaOuter
      title={
        <Row>
          <Col flex={1}></Col>
          <Col>
            <Space split={<Divider type="vertical" />}>
              <DragButton />
              <UploadButton>上传</UploadButton>
            </Space>
          </Col>
        </Row>
      }
      fileSize={fileSize}
      maxLength={maxLength}
      onFileSelected={onFileSelected}
      accept={accept}
    >
      <List
        dataSource={[...uploadingList, ...previewList]}
        getPermission={getPermission}
        apis={apis}
      />
      <DragArea />
    </DragAreaOuter>
  );
};

FileUpload.defaultProps = {
  accept: [".png", ".jpg", ".pdf", ".docx", ".doc"],
  fileSize: 20,
  maxLength: Number.MAX_VALUE,
  getPermission: () => true,
};

export default FileUpload;
