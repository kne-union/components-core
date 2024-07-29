
# Global


### 概述

### 何时使用

在使用components-core的任何组件的业务系统，需要将该组件放置于最外层，并且按照要求正确设置preset。

以下是components-core组件系统中需要设置的preset值，及使用这些值的组件

| 名称                | 说明                                                          | 类型       | 使用组件                            |
|-------------------|-------------------------------------------------------------|----------|---------------------------------|
| permissions       | 配置功能权限列表，Permissions根据该列表里面是否存在某权限名称判断用户是否具有该功能权限，来控制对应操作行为 | array    | Permissions                     |
| ajax              | 用于发送ajax请求的方法，一般情况下其应该是一个axios对象                            | object   | Image                           |
| apis              | 用于和后端进行一些交互行为的接口集合                                          | object   | Image                           |
| apis.oss          | 用于通过一个ossId向后端oss服务获取一个可以访问到指定文件的url                        | object   | Image                           |
| apis.ossUpload    | 用于向oss服务上传一个文件                                              | object   | FormInfo.Upload,FormInfo.Avatar |
| features          | 用于配置系统的特性参数                                                 | object   | Features                        |
| features.profile  | 系统的特性列表参考组件Features                                         | object   | Features                        |
| features.debug    | 特性的调试模式，可以在控制台打印Features的id和状态                              | boolean  | Features                        |
| enums             | 公共枚举值，详情参看Enum组件                                            | object   | Enum                            |
| enums.helperGuide | 帮助文档枚举配置                                                    | function | HelperGuide                     |
| formInfo          | 表单配置                                                        | object   | FormInfo.formModule             |
| formInfo.rules    | 表单规则配置                                                      | object   | FormInfo.formModule             |

全局context管理设置及默认样式

* 请将全局覆盖性的样式放在此组件中
* 请将字体文件的引用放在此组件中
* 请将antd的覆盖性样式放在此组件中
* 该组件需要放置在应用根位置

更新字体文件:

* 将iconfont上下载的字体包解压后放在public文件夹下面
* 更新src/common/params.js 中的变量 iconfontBase
* 修改后构建该项目发布到对应环境


### 示例


#### 示例样式

```scss
.label{
  font-weight: bold;
}
```

#### 示例代码

- 基本示例
- 展示了文字大小颜色行高的设置
- _Global(@components/Global),antd(antd)

```jsx
const { PureGlobal } = _Global;
const { Space, Divider } = antd;
const BaseExample = () => {
    return (
        <PureGlobal>
            <Space direction="vertical">
                <div className="label">文字大小:</div>
                <div style={{ fontSize: 'var(--font-size-large)' }}>大号文字</div>
                <div>默认大小文字</div>
                <div style={{ fontSize: 'var(--font-size-small)' }}>小号文字</div>
                <Divider />
                <div className="label">文字颜色:</div>
                <div style={{ color: 'var(--font-color)' }}>默认颜色</div>
                <div style={{ color: 'var(--font-color-grey)' }}>灰色</div>
                <div style={{ color: 'var(--font-color-grey-1)' }}>灰色1</div>
                <div style={{ color: 'var(--font-color-grey-2)' }}>灰色2</div>
                <Divider />
                <div className="label">行高:</div>
                <div style={{ lineHeight: 'var(--line-height-large)' }}>
                    宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高
                </div>
                <div>
                    默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高
                </div>
                <div style={{ lineHeight: 'var(--line-height-small)' }}>
                    紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高
                </div>
            </Space>
        </PureGlobal>
    );
};

render(<BaseExample />);

```

- 警告提示
- 展示了警告提示的覆盖样式
- _Global(@components/Global),antd(antd),icon(@components/Icon)

```jsx
const { PureGlobal } = _Global;
const { Alert, Space } = antd;
const { default: Icon } = icon;

const BasicExample = () => {
  return (
      <PureGlobal>
          <Space direction="vertical">
              <Alert message="这是一条操作成功的状态反馈" type="success" showIcon />
              <Alert message="这是一条普通的信息说明" type="info" showIcon />
              <Alert message="这是一条提示信息" type="warning" showIcon />
              <Alert message="这是一条请求失败的状态反馈" type="error" showIcon />
              <Alert message="这是一条警示信息" type="error" showIcon icon={<Icon colorful type="icon-color-caisejingshi" />} />

              <Alert message="这是一条操作成功的状态反馈" description="提示提示提示提示提示提示提示提示提示" type="success" showIcon />
              <Alert message="这是一条普通的信息说明" description="提示提示提示提示提示提示提示提示提示" type="info" showIcon />
              <Alert message="这是一条提示信息" description="提示提示提示提示提示提示提示提示提示" type="warning" showIcon />
              <Alert message="这是一条请求失败的状态反馈" description="提示提示提示提示提示提示提示提示提示" type="error" showIcon />
              <Alert message="这是一条警示信息" description="提示提示提示提示提示提示提示提示提示" type="error" showIcon icon={<Icon colorful type="icon-color-caisejingshi" />} />

              <Alert message="这是一条操作成功的状态反馈" description="提示提示提示提示提示提示提示提示提示" type="success" showIcon closable />
              <Alert message="这是一条普通的信息说明" description="提示提示提示提示提示提示提示提示提示" type="info" showIcon closable />
              <Alert message="这是一条提示信息" description="提示提示提示提示提示提示提示提示提示" type="warning" showIcon closable />
              <Alert message="这是一条请求失败的状态反馈" description="提示提示提示提示提示提示提示提示提示" type="error" showIcon closable />
              <Alert message="这是一条警示信息" description="提示提示提示提示提示提示提示提示提示" type="error" showIcon closable icon={<Icon colorful type="icon-color-caisejingshi" />} />
          </Space>
      </PureGlobal>
  );
};

render(<BasicExample />);

```

- 按钮
- 展示了按钮的覆盖样式
- _Global(@components/Global),antd(antd),icon(@components/Icon)

```jsx
const { PureGlobal } = _Global;
const { Button, Typography, Space } = antd;
const { default: Icon } = icon;

const BaseExample = () => {
  return (
    <PureGlobal>
      <Space direction="vertical">
        <Space>
          <Button size="large">大按钮</Button>
          <Button>默认按钮</Button>
          <Button size="small">小按钮</Button>
        </Space>
        <Space>
          <Button type="primary">按钮</Button>
          <Button type="link">按钮</Button>
          <Button type="text">按钮</Button>
        </Space>
        <Space>
          <Button danger>危险按钮</Button>
          <Button type="primary" danger>
            危险按钮
          </Button>
          <Button type="link" danger>
            危险按钮
          </Button>
          <Button type="text" danger>
            危险按钮
          </Button>
        </Space>
        <Space>
          <Button disabled>禁用按钮</Button>
          <Button type="primary" danger disabled>
            禁用危险按钮
          </Button>
          <Button type="link" disabled>
            禁用Link按钮
          </Button>
          <Button type="text" disabled>
            禁用Text按钮
          </Button>
        </Space>
        <Space>
          <Button type="text" icon={<Icon type="icon-tianjia" />}>
            图标按钮
          </Button>
          <Button type="text">
            图标按钮右
            <Icon type="icon-arrow-thin-down" />
          </Button>
        </Space>
        <Space>
          <Button type="primary" icon={<Icon type="icon-tianjia" />} />
          <Button icon={<Icon type="icon-tianjia" />} />
          <Button danger icon={<Icon type="icon-tianjia" />} />
          <Button type="link" icon={<Icon type="icon-tianjia" />} />
          <Button type="text" icon={<Icon type="icon-tianjia" />} />
        </Space>
        <Space>
          <Button type="primary" disabled icon={<Icon type="icon-tianjia" />} />
          <Button disabled icon={<Icon type="icon-tianjia" />} />
          <Button disabled danger icon={<Icon type="icon-tianjia" />} />
          <Button disabled type="link" icon={<Icon type="icon-tianjia" />} />
          <Button disabled type="text" icon={<Icon type="icon-tianjia" />} />
        </Space>
        <Space>
          <Typography.Link>Link文字</Typography.Link>
          <Typography.Text className="ant-btn">文字</Typography.Text>
          <Typography.Link>
            <Icon type="icon-tianjia" />
            Link文字
          </Typography.Link>
          <Typography.Text className="ant-btn">
            <Icon type="icon-tianjia" />
            文字
          </Typography.Text>
          <Typography.Link className="ant-btn-dangerous">
            Link文字
          </Typography.Link>
        </Space>
        <Space>
          <Button className="btn-no-padding" type="link" size="large">
            大按钮
          </Button>
          <Button className="btn-no-padding" type="link">
            默认按钮
          </Button>
          <Button className="btn-no-padding" type="link" size="small">
            小按钮
          </Button>
          <Button className="btn-no-padding" type="text" size="large">
            大按钮
          </Button>
          <Button className="btn-no-padding" type="text">
            默认按钮
          </Button>
          <Button className="btn-no-padding" type="text" size="small">
            小按钮
          </Button>
          <Button className="btn-no-padding" type="link" size="large" danger>
            大按钮
          </Button>
          <Button className="btn-no-padding" type="link" danger>
            默认按钮
          </Button>
          <Button className="btn-no-padding" type="link" size="small" danger>
            小按钮
          </Button>
        </Space>
      </Space>
    </PureGlobal>
  );
};

render(<BaseExample />);

```


### API

| 属性名        | 说明                                           | 类型       | 默认值 |
|------------|----------------------------------------------|----------|-----|
| preset     | 全局预设参数，可以通过usePreset获取，由业务系统设置               | object   | {}  |
| themeToken | 设置主题，参看antd的themeToken，一般只需要设置{colorPrimary} | object   | {}  |
| init       | 初始化方法，在系统首次加载时执行，可以返回Promise。用来放置系统显示之前的异步操作 | function | -   |

### PureGlobal

api同Global，但是少了页面错误捕获和className:container-body带来的默认最小宽度等样式设置，主要用在组件库的演示环境和弹窗中

### usePreset

获取预设的preset，已经确定为系统需要使用的key值:permissions,apis,formOptions,modalOptions

### useGlobalContext

获取和设置全局状态，该状态保存在Global组件一级，不会随着内部组件本身的销毁而销毁。
主要给组件内部使用，业务应该避免使用该api设置新的global变量。业务如果有需要应当自行在顶级组件中设置context。

#### params:useGlobalContext(globalKey)

| 属性名       | 说明                                                                                                                           | 类型     | 默认值 |
|-----------|------------------------------------------------------------------------------------------------------------------------------|--------|-----|
| globalKey | 全局参数的key，当存在globalKey时，默认获取和设置都是global[key]，当不存在globalKey获取和设置的都是global，除非存在多个获取和设置global的key-value，否则不推荐直接使用不存在globalKey的情况 | string | -   |

#### return:{global,setGlobal}

| 属性名       | 说明           | 类型       |
|-----------|--------------|----------|
| global    | 当前的global值   | any      |
| setGlobal | 设置当前的global值 | function |




