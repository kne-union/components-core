const {default:EnumStateTag} = _EnumStateTag;
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
        <EnumStateTag moduleName="testEnums" name="1" />
        <EnumStateTag moduleName="testEnums" name="2" />
        <EnumStateTag moduleName="testEnums" name="3" />
      </Space>
    </PureGlobal>
  )
};

render(<BaseExample />);
