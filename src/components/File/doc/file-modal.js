const {FileModal} = _File;
const {PureGlobal} = global;
const {Button, Flex, Typography} = antd;
const {useState} = React;

const urlMap = {
  1: "/mock/resume.png",
  2: "/mock/resume.pdf"
};

const ControlledPreview = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState({id: "1", filename: "demo.png"});

  return (
    <Flex vertical gap={12}>
      <Flex wrap gap={8}>
        <Button
          type="primary"
          onClick={() => {
            setCurrent({id: "1", filename: "demo.png", openPrint: true});
            setOpen(true);
          }}
        >
          打开图片
        </Button>
        <Button
          onClick={() => {
            setCurrent({id: "2", filename: "demo.pdf"});
            setOpen(true);
          }}
        >
          打开 PDF
        </Button>
      </Flex>
      <FileModal
        open={open}
        onClose={() => setOpen(false)}
        id={current.id}
        filename={current.filename}
        openPrint={current.openPrint}
      />
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
          声明式受控 FileModal：自行管理 open；默认 renderModal 使用 components-core Modal
        </Typography.Text>
        <ControlledPreview />
      </Flex>
    </PureGlobal>
  );
};

render(<BaseExample />);
