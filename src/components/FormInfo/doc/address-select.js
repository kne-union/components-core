const { AddressSelect: _AddressSelect, AddressInput: _AddressInput } =
  _FormInfo;
const { PureGlobal } = global;
const { Space, Button } = antd;
const { default: Content } = _Content;
const { range, uniqueId } = lodash;

const AddressSelect = _AddressSelect.Field;
const AddressEnum = _AddressSelect.AddressEnum;
const AddressInput = _AddressInput.Field;

const BaseExample = () => {
  return (
    <Content
      col={2}
      list={[
        {
          label: "多选",
          content: (
            <AddressSelect
              maxLength={3}
              defaultValue={["110"]}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "单选",
          content: (
            <AddressSelect
              single
              defaultValue={"110"}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "modal多选",
          content: (
            <AddressSelect
              maxLength={3}
              isPopup={false}
              defaultValue={["110"]}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "modal单选",
          content: (
            <AddressSelect
              isPopup={false}
              single
              defaultValue={"110"}
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "valueType为all",
          content: (
            <AddressSelect
              valueType="all"
              onChange={(value) => {
                console.log(value);
              }}
            />
          ),
        },
        {
          label: "地址显示",
          content: <AddressEnum name="270070" />,
        },
        {
          label: "显示父级",
          content: <AddressEnum name="270070" displayParent />,
        },
        {
          label: "地址输入",
          content: (
            <AddressInput
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
  <PureGlobal preset={{ locale: "en-US" }}>
    <div className="input">
      <BaseExample />
    </div>
  </PureGlobal>
);
