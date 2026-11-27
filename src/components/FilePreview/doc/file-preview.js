const {default: FilePreview} = _FilePreview;
const {PureGlobal} = global;
const {Flex, Typography} = antd;

const urlMap = {
  1: "/mock/resume.png",
  2: "/mock/resume.pdf",
  6: "/mock/resume.docx",
  9: "/mock/small-image.png"
};

const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        ajax: async api => ({data: {code: 0, data: api.loader()}}),
        apis: {
          file: {
            staticUrl: window.PUBLIC_URL || "",
            getUrl: {
              loader: async ({params}) => urlMap[params.id]
            }
          }
        }
      }}
    >
      <Flex vertical gap={16}>
        <Typography.Text type="secondary">页面内嵌预览（非弹窗）</Typography.Text>
        <FilePreview id="1" filename="demo.png" />
        <FilePreview id="2" filename="demo.pdf" />
      </Flex>
    </PureGlobal>
  );
};

render(<BaseExample />);
