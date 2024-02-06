
# Icon


### 概述

可以显示一个图标，图标必须在字体文件中被定义过


### 示例(全屏)


#### 示例样式

```scss
.item{
  width: 150px;
  word-break:break-all;
}
```

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Icon(@components/Icon),antd(antd),ReactFetch(@kne/react-fetch),Global(@components/Global),_axios(axios),remoteLoader(@kne/remote-loader)

```jsx
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

```

- 这里填写示例标题
- 这里填写示例说明
- _Icon(@components/Icon),antd(antd),ReactFetch(@kne/react-fetch),Global(@components/Global),_axios(axios),remoteLoader(@kne/remote-loader)

```jsx
const { default: Icon } = _Icon;
const { Space, Slider } = antd;
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
                  <div>{name}</div>
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

```


### API

|属性名| 说明            |类型| 默认值   |
|  ---  |---------------| --- |-------|
|type| 图标类型，参考示例下的字符串 |string  | -     |
| colorful | 是否是彩色图标       | boolean| false |
| prefix| 图标前缀          |string| "" |
|size| 图标大小          |number| -     |

