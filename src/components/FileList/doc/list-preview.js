const {List} = _File;
const {PureGlobal} = global;
const {Flex, Typography} = antd;

const urlMap = {
  1: "/mock/resume.png",
  2: "/mock/resume.pdf",
  3: "/mock/resume.html",
  6: "/mock/resume.docx",
  8: "/mock/resume.xlsx",
  9: "/mock/small-image.png"
};

const dataSource = [
  {id: "1", filename: "demo.png", date: "2024-07-15T11:09:15.000+08:00", userName: "用户"},
  {id: "9", filename: "small-image.png", date: "2024-07-15T11:09:15.000+08:00", userName: "用户"},
  {id: "2", filename: "demo.pdf", date: "2024-07-15T11:09:15.000+08:00", userName: "用户"},
  {id: "6", filename: "resume.docx", date: "2024-07-15T11:09:15.000+08:00", userName: "用户"},
  {id: "8", filename: "resume.xlsx", date: "2024-07-15T11:09:15.000+08:00", userName: "用户"}
];

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
      <Flex vertical gap={12}>
        <Typography.Text type="secondary">
          File.List 预览按钮走 components-core Modal（与 FileButton / useFileModal 同一套 renderModal）
        </Typography.Text>
        <List
          dataSource={dataSource}
          apis={{
            onDelete: () => false,
            onEdit: () => false
          }}
        />
      </Flex>
    </PureGlobal>
  );
};

render(<BaseExample />);
