const { default: FetchButton } = _FetchButton;

const BaseExample = () => {
  return (
    <div>
      <FetchButton
        api={{
          loader: async () => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve({ data: "xxxxx" });
              }, 1000);
            });
          },
        }}
        onClick={(data) => {
          console.log(data);
        }}
      >
        点击加载数据
      </FetchButton>
    </div>
  );
};

render(<BaseExample />);
