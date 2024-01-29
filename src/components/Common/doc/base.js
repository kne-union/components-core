const Common = _Common;

const { FetchButton } = Common;

const BaseExample = () => {
  return (
    <FetchButton
      api={{
        loader: () => {
          return [
            { label: "1", content: "11" },
            { label: "2", content: "22" },
          ];
        },
      }}
      modalProps={({ data }) => {
        console.log(data);
        alert(JSON.stringify(data));
        return {
          children: (
            <div>
              <div>我是一个弹窗</div>
              <div>{data[0].label}</div>
              <div>{data[0].content}</div>
              <div>{data[1].label}</div>
              <div>{data[1].content}</div>
            </div>
          ),
        };
      }}
      modalFunc={() => {}}
    >
      FetchButton
    </FetchButton>
  );
};

render(<BaseExample />);
