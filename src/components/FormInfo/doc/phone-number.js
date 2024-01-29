const { PhoneNumber: _PhoneNumber } = _FormInfo;
const { PureGlobal } = global;
const { default: Content } = _Content;

const PhoneNumber = _PhoneNumber.Field;

const BaseExample = () => {
  return (
    <Content
      col={2}
      list={[
        {
          label: "电话输入",
          content: (
            <PhoneNumber
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
      ]}
    />
  );
};

render(
  <PureGlobal>
    <div className="input">
      <BaseExample />
    </div>
  </PureGlobal>
);
