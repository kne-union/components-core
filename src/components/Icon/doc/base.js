const { default: Icon } = _Icon;
const { Slider, Space } = antd;
const { useState } = React;
const { createWithFetch } = ReactFetch;
const { loadFont } = Global;
const { default: axios } = _axios;
const { createWithRemoteLoader } = remoteLoader;

const BaseExample = createWithRemoteLoader({
  modules: ["components-iconfont:Font"],
})(({ remoteModules }) => {
  const [Font] = remoteModules;
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
      {
        <Font>
          {({ list }) => {
            return (
              <Space wrap align="top" size="large">
                {list.map(({ name, font_class }) => {
                  return (
                    <Space
                      className="item"
                      direction="vertical"
                      align="center"
                      key={name}
                    >
                      <Icon type={font_class} size={value} />
                      <div>{name}</div>
                    </Space>
                  );
                })}
              </Space>
            );
          }}
        </Font>
      }
    </Space>
  );
});

render(<BaseExample />);
