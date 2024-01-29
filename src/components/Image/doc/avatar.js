const { default: Image } = _Image;
const { Space } = antd;
const BaseExample = () => {
  return (
    <Space>
      <Image.Avatar src={window.PUBLIC_URL + "/avatar.png"} shape="circle" />
      <Image.Avatar
        src={window.PUBLIC_URL + "/avatar.png"}
        shape="circle"
        size={80}
      />
      <Image.Avatar
        src={window.PUBLIC_URL + "/avatar.png"}
        shape="circle"
        size={50}
      />

      <Image.Avatar shape="circle" />
      <Image.Avatar gender="M" shape="circle" size={80} />
      <Image.Avatar gender="female" shape="circle" size={50} />
      <Image.Avatar gender="m" shape="circle" size={50} />
    </Space>
  );
};

render(<BaseExample />);
