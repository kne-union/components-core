const { MoneyInput: _MoneyInput } = _FormInfo;
const { PureGlobal } = global;
const { default: Content } = _Content;

const MoneyInput = _MoneyInput.Field;

const BaseExample = () => {
  return (
    <Content
      col={2}
      list={[
        {
          label: "金额输入",
          content: <MoneyInput />,
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
