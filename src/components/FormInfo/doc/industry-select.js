const { IndustrySelect: _IndustrySelect } = _FormInfo;
const { PureGlobal } = global;
const { default: Content } = _Content;

const { range, get } = lodash;

const IndustrySelect = _IndustrySelect.Field;

const BaseExample = () => {
  return (
    <Content
      col={2}
      list={[
        {
          label: "行业选择",
          content: (
            <IndustrySelect
              defaultValue={["001"]}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "modal行业选择",
          content: (
            <IndustrySelect
              isPopup={false}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "职能枚举显示",
          content: <IndustrySelect.Enum name="004" />,
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
