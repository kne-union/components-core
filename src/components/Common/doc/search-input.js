const Common = _Common;

const { SearchInput } = Common;
const { useState } = React;

const BaseExample = () => {
  const [value, setValue] = useState("");
  return (
    <SearchInput
      value={value}
      onSearch={(value) => {
        setValue(value);
        console.log(value);
      }}
    />
  );
};

render(<BaseExample />);
