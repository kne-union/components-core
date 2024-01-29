const { ModalButton, TabsModalButton } = _Modal;
const { Space } = antd;
const { PureGlobal } = global;
const { default: Content } = _Content;
const { default: FormInfo, Input, TextArea } = _FormInfo;

const api = {
  loader: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
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
  return (
    <Space wrap>
      <ModalButton
        api={api}
        modalProps={({ data }) => {
          return {
            title: "加载数据的弹窗",
            children: <Content list={data} col={2} />,
          };
        }}
      >
        点击加载数据
      </ModalButton>
      <TabsModalButton
        api={api}
        modalProps={({ data }) => {
          return {
            items: data.map(({ label, content }, index) => {
              return {
                key: index,
                children: content,
                label,
              };
            }),
          };
        }}
      >
        点击加载数据的Tabs弹窗
      </TabsModalButton>
    </Space>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);
