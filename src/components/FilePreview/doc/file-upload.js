const {FileUpload} = _File;
const {PureGlobal} = global;
const {Flex, Typography} = antd;

const urls = {};

const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        ajax: async api => ({data: {code: 0, data: api.loader()}}),
        apis: {
          file: {
            staticUrl: window.PUBLIC_URL || "",
            getUrl: {
              loader: async ({params}) => urls[params.id] || `/mock/${params.id}`
            },
            upload: ({file}) => {
              const id = `local-${Date.now()}-${file.name}`;
              urls[id] = URL.createObjectURL(file);
              return Promise.resolve({
                data: {
                  code: 0,
                  data: {id, filename: file.name}
                }
              });
            }
          }
        }
      }}
    >
      <Flex vertical gap={12}>
        <Typography.Text type="secondary">
          上传列表预览走 components-core Modal（File.FileUpload 默认注入 renderModal）
        </Typography.Text>
        <FileUpload
          defaultValue={[
            {id: "resume.png", filename: "demo.png"},
            {id: "small-image.png", filename: "small-image.png"},
            {id: "resume.pdf", filename: "demo.pdf"},
            {id: "resume.docx", filename: "resume.docx"}
          ]}
        />
      </Flex>
    </PureGlobal>
  );
};

render(<BaseExample />);
