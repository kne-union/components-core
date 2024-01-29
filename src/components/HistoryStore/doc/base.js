const { default: HistoryStore } = _HistoryStore;
const { Input } = antd;
const { useState } = React;
const BaseExample = () => {
  const [value, setValue] = useState("");
  return (
    <HistoryStore
      onSelect={(value) => {
        setValue(value);
      }}
    >
      {({ appendHistory, openHistory }) => (
        <Input.Search
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onFocus={openHistory}
          onSearch={(value) => {
            appendHistory({
              value,
              label: value,
            });
          }}
        />
      )}
    </HistoryStore>
  );
};

render(<BaseExample />);
