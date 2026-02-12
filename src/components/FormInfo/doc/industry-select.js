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
          label: "所属行业",
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
          label: "modal所属行业",
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
          label: "行业枚举显示",
          content: <IndustrySelect.Enum name="004" />,
        },
      ]}
    />
  );
};

render(
  <div className="input">
    <BaseExample />
  </div>
);
