const {useFileModal} = _File;
const {PureGlobal} = global;
const {Button, Flex, Typography} = antd;

const urlMap = {
  1: "/mock/resume.png",
  2: "/mock/resume.pdf",
  6: "/mock/resume.docx",
  8: "/mock/resume.xlsx"
};

const PreviewButtons = () => {
  const fileModal = useFileModal();
  return (
    <Flex wrap gap={8}>
      <Button
        type="primary"
        onClick={() => fileModal({id: "1", filename: "demo.png", openPrint: true})}
      >
        预览图片
      </Button>
      <Button onClick={() => fileModal({id: "2", filename: "demo.pdf"})}>预览 PDF</Button>
      <Button onClick={() => fileModal({id: "6", filename: "resume.docx"})}>预览 DOCX</Button>
      <Button onClick={() => fileModal({id: "8", filename: "resume.xlsx"})}>预览 XLSX</Button>
    </Flex>
  );
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
        <Typography.Text type="secondary">
          命令式调用 useFileModal，与 useModal / useFormModal 同形；弹窗外壳为 components-core Modal，图片工具栏可用
        </Typography.Text>
        <PreviewButtons />
      </Flex>
    </PureGlobal>
  );
};

render(<BaseExample />);
