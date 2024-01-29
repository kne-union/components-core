const { default: Drawer, useDrawer, DrawerButton } = _Drawer;
const { Button, Space } = antd;
const { range } = lodash;
const { useRef, useState } = React;
const { PureGlobal } = global;
const { default: Content } = _Content;

const api = {
  loader: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            label: "内容1",
            content:
              "内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1",
          },
          {
            label: "内容2",
            content:
              "内容2内容2内内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2容2内容2内容2内容2内容2内容2",
          },
          { label: "内容1", content: "内容1内容1内容1内容1内容1内容1内容1" },
          {
            label: "内容2",
            content: "内容2内容2内容2内容2内容2内容2内容2内容2",
          },
          { label: "内容1", content: "内容1内容1内容1内容1内容1内容1内容1" },
          {
            label: "内容2",
            content: "内容2内容2内容2内容2内容2内容2内容2内容2",
          },
          { label: "内容1", content: "内容1内容1内容1内容1内容1内容1内容1" },
          {
            label: "内容2",
            content: "内容2内容2内容2内容2内容2内容2内容2内容2",
          },
          { label: "内容1", content: "内容1内容1内容1内容1内容1内容1内容1" },
          {
            label: "内容2",
            content: "内容2内容2内容2内容2内容2内容2内容2内容2",
          },
          { label: "内容1", content: "内容1内容1内容1内容1内容1内容1内容1" },
          {
            label: "内容2",
            content: "内容2内容2内容2内容2内容2内容2内容2内容2",
          },
        ]);
      }, 1000);
    });
  },
};

const BaseExample = () => {
  const drawer = useDrawer();
  const [open, setOpen] = useState(false);
  return (
    <Space>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        open 组件打开
      </Button>
      <Button
        onClick={() => {
          drawer({
            title: "标题",
            children: "打开了一个抽屉",
          });
        }}
      >
        hook 打开
      </Button>
      <DrawerButton
        api={api}
        modalProps={({ data }) => {
          return {
            title: "加载数据的弹窗",
            children: <Content list={data} col={1} />,
          };
        }}
      >
        按钮点击加载数据
      </DrawerButton>
      <Drawer title="Basic Drawer" onClose={() => setOpen(false)} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </Space>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);
