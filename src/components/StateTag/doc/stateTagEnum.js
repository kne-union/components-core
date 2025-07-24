const { StateTagEnum } = _StateTag;
const { PureGlobal } = global;
const { Space } = antd;

const BaseExample = ()=>{
  return (
    <PureGlobal
      preset={{
        locale: "zh-CN",
        enums: {
          testEnums: async ({ locale }) => {
            console.log(locale);
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([
                  { value: "1", description: "第一项", type: 'success' },
                  { value: "2", description: "第二项", type: 'danger' },
                  { value: "3", description: "第三项", type: 'info'},
                ]);
              }, 1000);
            });
          },
        },
      }}
    >
      <Space>
        <StateTagEnum moduleName="testEnums" name="1" />
        <StateTagEnum moduleName="testEnums" name="2" />
        <StateTagEnum moduleName="testEnums" name="3" />
      </Space>
    </PureGlobal>
  )
};

render(<BaseExample />);
