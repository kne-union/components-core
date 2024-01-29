const { default: LoadingButton } = _LoadingButton;
const { Space, message } = antd;

const clickHandler = () => {
  message.success("点击按钮1s后完成加载");
  return new Promise((resolve) => {
    setTimeout(() => {
      message.success("完成");
      resolve();
    }, 1000);
  });
};
const BaseExample = () => {
  return (
    <Space wrap>
      <LoadingButton onClick={clickHandler}>按钮</LoadingButton>
      <LoadingButton onClick={clickHandler}>
        {(isLoading) => (isLoading ? "正在加载中..." : "切换加载文案")}
      </LoadingButton>
    </Space>
  );
};

render(<BaseExample />);
