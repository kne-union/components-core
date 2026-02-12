const { InputFileButton, InputFileLink, InputFileText } = _Common;
const { Space, Typography, message, Alert } = _antd;

const BaseExample = () => {
  const handleFileChange = (file) => {
    console.log('选择的文件:', file);
    const sizeInMB = (file.size / 1024 / 1024).toFixed(2);
    message.success(`已选择文件: ${file.name} (${sizeInMB}MB)`);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Text strong>文件上传组件示例</Typography.Text>
      <Alert
        message="支持上传图片（JPG、PNG）和 PDF 文档，单个文件不超过 10MB"
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
      <Typography.Text>按钮形式上传：</Typography.Text>
      <InputFileButton
        accept=".jpg,.png,.pdf"
        onChange={handleFileChange}
      >
        点击上传文件
      </InputFileButton>

      <Typography.Text style={{ marginTop: 8 }}>链接形式上传：</Typography.Text>
      <InputFileLink
        accept=".jpg,.png,.pdf"
        onChange={handleFileChange}
      >
        选择要上传的文件
      </InputFileLink>

      <Typography.Text style={{ marginTop: 8 }}>文本形式上传：</Typography.Text>
      <InputFileText
        accept=".jpg,.png,.pdf"
        onChange={handleFileChange}
      >
        浏览文件
      </InputFileText>
    </Space>
  );
};

render(<BaseExample />);
