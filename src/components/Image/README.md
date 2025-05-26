
# Image


### 概述

用于展示一张图片，和img标签不同的是，可以展示一张普通图片，也可以通过id加载一张oss图片，在加载oss地址和图片数据的时候会显示loading状态


### 示例

#### 示例代码

- 通过src加载一个普通图片
- 通过src加载一个普通图片
- _Image(@components/Image)

```jsx
const {default: Image} = _Image;
const BaseExample = () => {
    return <Image src={window.PUBLIC_URL + "/logo512.png"} style={{width: '100px', height: '100px'}}/>;
};

render(<BaseExample/>);

```

- 通过id加载一个oss图片
- 图片一加载成功，图片二加载中，图片三加载失败
- _Image(@components/Image),global(@components/Global),antd(antd)

```jsx
const {default: Image} = _Image;
const {PureGlobal} = global;
const {Space} = antd;
const BaseExample = () => {
    return <PureGlobal preset={{
        apis: {
            file: {
                getUrl: {
                    loader: ({params}) => {
                        if (params.id === 'logo513.png') {
                            return new Promise(() => {

                            });
                        }
                        return new Promise((resolve) => {
                            resolve(window.PUBLIC_URL + '/' + params.id);
                        });

                    }
                }
            }
        }
    }}>
        <Space>
            <Image id="logo512.png" style={{width: '100px', height: '100px'}}/>
            <Image id="logo513.png" style={{width: '100px', height: '100px'}}/>
            <Image id="logo511.png" style={{width: '100px', height: '100px'}}/>
        </Space>
    </PureGlobal>;
};

render(<BaseExample/>);

```

- 显示一个头像
- 显示图片头像和默认头像
- _Image(@components/Image),antd(antd)

```jsx
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

```


### API

| 属性名     | 说明         | 类型     | 默认值 |
|---------|------------|--------|-----|
| src     | 图片的src地址   | string | -   |
| id      | oss的id     | string | -   |
| loading | 加载时显示的组件   | jsx    | -   |
| error   | 加载错误时显示的组件 | jsx    | -   |

### Image.Avatar

用antd的Avatar来显示图片，可以显示默认的男女头像，其他参数参考antd的Avatar组件

| 属性名    | 说明                  | 类型     | 默认值 |
|--------|---------------------|--------|-----|
| gender | 性别 F，female，f为女其他为男 | string | -   |

