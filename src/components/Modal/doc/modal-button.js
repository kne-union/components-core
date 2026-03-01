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
          { label: "客户基本信息", content: "客户公司名称、联系人、联系电话、地址等基础信息" },
          {
            label: "合作记录",
            content: "历史合作项目、合作金额、合作状态、合同到期时间等合作相关信息",
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
