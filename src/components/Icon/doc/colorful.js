const { default: Icon } = _Icon;
const { Space, Slider, Typography } = antd;
const { useState } = React;
const { createWithFetch } = ReactFetch;
const { createWithRemoteLoader } = remoteLoader;
const { default: axios } = _axios;

const BaseExample = createWithRemoteLoader({
  modules: ["components-iconfont:ColorfulFont"],
})(({ remoteModules }) => {
  const [ColorfulFont] = remoteModules;
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
      <ColorfulFont>
        {({ list }) => (
          <Space wrap align="top" size="large">
            {list.map(({ name }) => {
              return (
                <Space
                  className="item"
                  direction="vertical"
                  align="center"
                  key={name}
                >
                  <Icon colorful type={name} size={value} />
                  <Typography.Text
                    copyable={{
                      text:
                        '<Icon colorful type="' +
                        name +
                        '" size={' +
                        value +
                        "} />",
                    }}
                  >
                    {name}
                  </Typography.Text>
                </Space>
              );
            })}
          </Space>
        )}
      </ColorfulFont>
    </Space>
  );
});

render(<BaseExample />);
