const { default: Icon } = _Icon;
const { Slider, Space } = antd;
const { useState } = React;
const { createWithFetch } = ReactFetch;
const { loadFont } = Global;
const { default: axios } = _axios;

const BaseExample = createWithFetch({
  loader: async () => {
    const { font } = await loadFont;
    const { data } = await axios.get(
      window.ICONFONT_URL + "/" + font + "/iconfont.css"
    );
    return data
      .match(/.icon-.*:before/g)
      .map((name) => name.replace(":before", "").replace(/^./, ""));
  },
})(({ data }) => {
  const [value, setValue] = useState(30);
  return (
    <Space direction="vertical">
      <Space>
        <div>调整大小:</div>
        <Slider
          style={{ width: 100 }}
          max={60}
          min={12}
          value={value}
          onChange={setValue}
        />
        <div>{value}px</div>
      </Space>
      <Space wrap align="top" size="large">
        {data.map((name) => {
          return (
            <Space
              className="item"
              direction="vertical"
              align="center"
              key={name}
            >
              <Icon type={name} size={value} />
              <div>{name}</div>
            </Space>
          );
        })}
      </Space>
    </Space>
  );
});

render(<BaseExample />);
