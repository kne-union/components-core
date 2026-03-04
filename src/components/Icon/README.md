
# react-icon


### 描述

用于将一个font或svg展示为一个图标组件.


### 安装

```shell
npm i --save @kne/react-icon
```


### 概述

### Iconfont

`Iconfont` 是一个基于字体图标的 React 组件，支持两种模式：

- **单色模式**：使用传统字体图标渲染
- **多彩模式**：通过 SVG 方式渲染彩色图标

#### 基础图标
```jsx
<Iconfont type="user" />
```

#### 指定尺寸
```jsx
<Iconfont type="search" size={24} />
```

#### 多彩图标模式
```jsx
<Iconfont type="feedback" colorful />
```

#### 注意事项

1. 需要预先引入对应的字体文件/CSS
2. 多彩模式需要确保 SVG 资源可用
3. 组件会自动处理 `icon-` 前缀（无需手动添加）

**以上资源可以通过`FontLoader`进行加载**

### FontLoader

`FontLoader` 是一个用于动态加载/卸载字体资源的 React 组件，具有以下特性：

- 按需加载字体文件
- 自动卸载机制（组件卸载时）
- 纯逻辑组件（无UI渲染）

#### 加载本地字体
```jsx
<FontLoader 
  path="../assets/fonts/iconfont.woff" 
  name="app-iconfont"
/>
```

#### 加载CDN字体
```jsx
<FontLoader
  path="https://cdn.example.com/fonts/iconfont.woff2"
  name="cdn-iconfont"
/>
```

#### 注意事项

1. 需要配合 `@font-face` CSS 规则使用
2. 字体名称(`name`)需与CSS定义保持一致
3. 建议在应用根组件或路由组件中使用
4. 多次加载同名字体时会自动去重

### loadFont

该函数提供了动态加载字体资源的功能，主要包含两个实用函数：

1. **路径处理函数** - `getLastFolderName`
    - 从文件路径中提取最后一个非空文件夹名
    - 自动处理路径末尾的冗余斜杠

2. **字体加载函数** - `loadFont`
    - 智能避免重复加载相同字体
    - 支持通过JS脚本方式加载字体资源
    - 自动使用路径最后一段作为默认字体名称

#### 基本用法
```javascript
import { loadFont } from './loadFont';

// 加载字体（自动使用路径最后一段作为名称）
await loadFont('/assets/fonts/roboto/roboto.js');

// 指定字体名称
await loadFont('/assets/fonts/roboto/main.js', 'Roboto');
```

#### 实现特点
1. **防重复加载**：通过检查head中是否已存在相同href的script标签
2. **路径标准化**：自动处理路径末尾的冗余斜杠
3. **容错处理**：过滤路径中的空字符串部分

#### 注意事项
1. 当前仅支持通过.js文件加载字体
2. 需要确保字体JS文件符合标准格式
3. 在浏览器环境中使用，依赖document对象

### 示例(全屏)


#### 示例样式

```scss
.item {
  width: 150px;
  word-break: break-all;
  .ant-typography {
    position: relative;
  }
  .ant-typography-copy {
    visibility: hidden;
    position: absolute;
    right: -20px;
  }
  &:hover {
    .ant-typography-copy {
      visibility: visible;
    }
  }
}
```

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Icon(@kne/react-icon),antd(antd),ReactFetch(@kne/react-fetch),_axios(axios),remoteLoader(@kne/remote-loader)

```jsx
const {default: Icon} = _Icon;
const {Slider, Space, Typography} = antd;
const {useState} = React;
const {createWithFetch} = ReactFetch;
const {default: axios} = _axios;
const {createWithRemoteLoader} = remoteLoader;

const BaseExample = createWithRemoteLoader({
    modules: ["components-iconfont:Font"],
})(({remoteModules}) => {
    const [Font] = remoteModules;
    const [value, setValue] = useState(30);
    return (
        <Space direction="vertical">
            <Space>
                <div>调整大小:</div>
                <Slider
                    style={{width: 100}}
                    max={60}
                    min={12}
                    value={value}
                    onChange={setValue}
                />
                <div>{value}px</div>
            </Space>
            {
                <Font>
                    {({list}) => {
                        return (
                            <Space wrap align="top" size="large">
                                {list.map(({name, font_class}) => {
                                    return (
                                        <Space
                                            className="item"
                                            direction="vertical"
                                            align="center"
                                            key={name}
                                        >
                                            <Icon type={font_class} size={value}/>
                                            <Typography.Text
                                                copyable={{
                                                    text:
                                                        '<Icon type="' +
                                                        font_class +
                                                        '" size={' +
                                                        value +
                                                        "} />",
                                                }}
                                            >
                                                {font_class}
                                            </Typography.Text>
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

render(<BaseExample/>);

```

- 这里填写示例标题
- 这里填写示例说明
- _Icon(@kne/react-icon),antd(antd),ReactFetch(@kne/react-fetch),_axios(axios),remoteLoader(@kne/remote-loader)

```jsx
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

```


### API

### Iconfont

| 属性              | 类型            | 默认值          | 说明                     |
|-----------------|---------------|--------------|------------------------|
| `type`          | string        | **必填**       | 图标名称（如 `'home'`）       |
| `colorful`      | boolean       | `false`      | 是否启用多彩模式               |
| `className`     | string        | -            | 自定义 CSS 类名             |
| `fontClassName` | string        | `'iconfont'` | 字体图标基础类名               |
| `size`          | number/string | -            | 图标尺寸（如 `20` 或 `'2em'`） |
| `style`         | object        | -            | 行内样式对象                 |
| `prefix`        | string        | `''`         | 图标名前缀（自动处理 `icon-` 前缀） |
| `...other`      | any           | -            | 其他透传的 DOM 属性           |

### FontLoader

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `path` | string | 是 | 字体文件路径（支持相对/绝对路径） |
| `name` | string | 是 | 注册的字体名称（用于CSS引用） |

### `getLastFolderName(path)`
```javascript
/**
 * 从文件路径中提取最后一个文件夹名
 * @param {string} path - 文件路径
 * @return {string} 最后一个非空文件夹名
 */
```

### `loadFont(path, name)`
```javascript
/**
 * 动态加载字体资源
 * @param {string} path - 字体资源路径(.js)
 * @param {string} [name] - 可选字体名称，未提供时使用路径最后一段
 */
```
