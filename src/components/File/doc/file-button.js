const {FileButton, FileLink} = _File;
const {PureGlobal} = global;
const {Flex, Typography} = antd;

const urlMap = {
  1: "/mock/resume.png",
  2: "/mock/resume.pdf",
  3: "/mock/resume.html",
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
        <Typography.Text type="secondary">
          点击打开预览：弹窗外壳为 components-core Modal（FileButton 默认注入 renderModal）
        </Typography.Text>
        <Flex wrap gap={8}>
          <FileButton id="1" filename="demo.png" openPrint>
            demo.png
          </FileButton>
          <FileButton id="9" filename="small-image.png" openPrint>
            小图
          </FileButton>
          <FileButton id="2" filename="demo.pdf">
            demo.pdf
          </FileButton>
          <FileButton id="6" filename="resume.docx">
            resume.docx
          </FileButton>
          <FileLink id="3" filename="demo.html">
            链接预览 HTML
          </FileLink>
        </Flex>
      </Flex>
    </PureGlobal>
  );
};

render(<BaseExample />);
