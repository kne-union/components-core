const { default: Icon } = _Icon;
const { Space, Slider } = antd;
const { useState } = React;
const { createWithFetch } = ReactFetch;
const { loadFont } = Global;
const { default: axios } = _axios;

const BaseExample = createWithFetch({
  loader: async () => {
    const { colorful } = await loadFont;
    const { data } = await axios.get(
      window.ICONFONT_URL + "/" + colorful + "/iconfont.json"
    );
    return data.glyphs.map(({ font_class }) => font_class);
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
              <Icon colorful type={name} size={value} />
              <div>{name}</div>
            </Space>
          );
        })}
      </Space>
    </Space>
  );
});

render(<BaseExample />);
