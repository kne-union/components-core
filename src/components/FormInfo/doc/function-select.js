const { FunctionSelect: _FunctionSelect } = _FormInfo;
const { PureGlobal } = global;
const { default: Content } = _Content;

const { range, get } = lodash;

const FunctionSelect = _FunctionSelect.Field;

const BaseExample = () => {
  return (
    <Content
      col={2}
      list={[
        {
          label: "职能选择",
          content: (
            <FunctionSelect
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "modal职能选择",
          content: (
            <FunctionSelect
              isPopup={false}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "职能选择无搜索",
          content: (
            <FunctionSelect
              search={null}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "职能枚举显示",
          content: <FunctionSelect.Enum name="001" />,
        },
      ]}
    />
  );
};

render(
  <PureGlobal preset={{ locale: "en-US" }}>
    <div className="input">
      <BaseExample />
    </div>
  </PureGlobal>
);
