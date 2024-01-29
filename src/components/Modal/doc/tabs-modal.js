const { TabsModal, useTabsModal } = _Modal;
const { useState } = React;
const { default: Fetch } = fetch;
const { Button, Space } = antd;
const { PureGlobal } = global;
const { default: Content } = _Content;

const BaseExample = () => {
  const [open, setOpen] = useState(false);
  const tabsModal = useTabsModal();
  return <Space wrap>
    <TabsModal open={open} onClose={() => {
      setOpen(false);
    }} items={[{
      label: "项目 1", key: "item-1", children: <div>项目 1项目 1项目 1项目 1项目 1项目 1项目 1项目 1</div>
    }, {
      label: "项目 2", key: "item-2", children: <div>项目 2项目 2项目 2项目 2项目 2项目 2项目 2项目 2</div>
    }]} rightOptions={<div>右边栏内容右边栏内容右边栏内容右边栏内容</div>}>
      <div>弹窗弹窗弹窗弹窗弹窗弹窗弹窗</div>
    </TabsModal>
    <Button onClick={() => {
      setOpen(true);
    }}>组件调用方式</Button>
    <Button onClick={() => {
      tabsModal({
        rightOptions: <div>右边栏内容右边栏内容右边栏内容右边栏内容</div>, items: [{
          label: "项目 1", key: "item-1", children: <div>项目 1项目 1项目 1项目 1项目 1项目 1项目 1项目 1</div>
        }, {
          label: "项目 2", key: "item-2", children: <div>项目 2项目 2项目 2项目 2项目 2项目 2项目 2项目 2</div>
        }]
      });
    }}>hooks调用方式</Button>
    <Button onClick={() => {
      tabsModal({
        title: "此title不展示",
        rightOptions: ({ data }) => <Content list={data} />,
        withDecorator: (render) => <Fetch loader={() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve([{ label: "内容1", content: "内容1内容1内容1内容1内容1内容1内容1" }, {
                label: "内容2", content: "内容2内容2内容2内容2内容2内容2内容2内容2"
              }]);
            }, 1000);
          });
        }} render={({ data }) => render({ data })} />,
        items: [{
          label: "项目 1", key: "item-1", children: ({ data }) => <Content list={data} col={2} />
        }, {
          withDecorator: (render) => <Fetch loader={() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([{ label: "内容3", content: "内容3内容3内容3内容3内容3内容3内容3" }, {
                  label: "内容4", content: "内容4内容4内容4内容4内容4内容4内容4内容4"
                }]);
              }, 1000);
            });
          }} render={({ data }) => render({ tabData: data })} />,
          label: "项目 2",
          key: "item-2",
          children: ({ data, tabData }) => <Content list={[...data, ...tabData]} col={2} />
        }]
      });
    }}>复杂数据加载</Button>
  </Space>;
};

render(<PureGlobal><BaseExample /></PureGlobal>);