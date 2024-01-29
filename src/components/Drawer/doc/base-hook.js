const { useDrawer } = _Drawer;
const { Button, Space } = antd;
const { PureGlobal } = global;
const { range } = lodash;

const Content = () => {
  const drawer = useDrawer();
  return (
    <Space>
      <Button
        onClick={() => {
          const drawerApi = drawer({
            title: "标题",
            children: "打开了一个抽屉",
          });
        }}
      >
        hooks打开
      </Button>
    </Space>
  );
};

const BaseExample = () => {
  return (
    <PureGlobal>
      <Content />
    </PureGlobal>
  );
};

render(<BaseExample />);
