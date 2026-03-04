# Global

### 概述

Global 是 components-core 组件库的全局配置组件，负责为整个应用提供统一的上下文环境、样式主题和全局配置。它集成了 Antd ConfigProvider、国际化支持、字体加载、主题定制等功能，是使用 components-core 组件库时必须包含的最外层组件。

**核心特性**

- **统一的主题管理**：支持自定义主题色，自动生成主题色透明度渐变，提供丰富的 CSS 变量用于全局样式控制
- **国际化支持**：内置中文和英文两种语言，支持 Antd 组件库的国际化以及第三方组件的本地化
- **全局上下文管理**：通过 preset 参数统一配置权限、API、枚举等全局资源，所有子组件都可以通过 usePreset Hook 访问
- **错误边界处理**：自动捕获页面错误并展示友好的错误提示，提升用户体验
- **字体资源管理**：自动加载图标字体，支持自定义字体配置
- **响应式设计**：提供多种尺寸的文字、颜色和行高变量，适配不同场景

**适用场景**

在使用 components-core 组件库的任何业务系统中，都需要将 Global 组件放置在应用根位置，并按照要求配置 preset 参数。这样所有 components-core 的组件才能正确获取全局配置并正常工作。

**Preset 配置说明**

preset 是一个对象，包含 components-core 组件系统所需的全局配置，以下是常用的配置项：

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

**样式管理**

Global 组件提供了全局样式管理功能，所有全局覆盖性的样式、Antd 的样式覆盖都应放置在此组件中。组件内置了丰富的 CSS 变量，包括字体大小、颜色、行高、圆角、背景色等，开发者可以通过这些变量快速定制应用风格。

**字体配置**

如需自定义图标字体，请按照以下步骤操作：
1. 将 iconfont 上下载的字体包解压后放在 public 文件夹下
2. 更新 src/common/params.js 中的变量 iconfontBase
3. 修改后构建项目并发布到对应环境

**组件位置**

Global 组件必须放置在应用的最外层，包裹所有其他组件，确保全局配置能够正确传递到所有子组件。


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

- Preset 配置
- 展示了 preset 全局配置的使用方法
- _Global(@components/Global),antd(antd)

```jsx
const { PureGlobal, usePreset } = _Global;
const { Button, Space, Typography, Card } = antd;

const { Text } = Typography;

// 模拟的 preset 配置
const mockPreset = {
  locale: 'zh-CN',
  permissions: ['user:view', 'user:edit', 'user:delete'],
  apis: {
    getUserList: '/api/users',
    updateUser: '/api/user/update'
  },
  enums: {
    status: {
      active: '启用',
      inactive: '停用'
    }
  },
  features: {
    debug: true,
    profile: 'production'
  }
};

const PresetExample = () => {
  const preset = usePreset();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="Preset 配置信息" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>语言设置：</Text>
            <Text>{preset.locale || '未设置'}</Text>
          </div>
          <div>
            <Text strong>权限列表：</Text>
            <Text>{preset.permissions?.join(', ') || '未设置'}</Text>
          </div>
          <div>
            <Text strong>API 接口：</Text>
            <Text code>{preset.apis?.getUserList || '未设置'}</Text>
          </div>
          <div>
            <Text strong>状态枚举：</Text>
            <Text>{JSON.stringify(preset.enums?.status) || '未设置'}</Text>
          </div>
          <div>
            <Text strong>特性配置：</Text>
            <Text>debug: {preset.features?.debug?.toString() || '未设置'}, profile: {preset.features?.profile || '未设置'}</Text>
          </div>
        </Space>
      </Card>
      <Card title="说明" size="small">
        <Text type="secondary">
          preset 是通过 Global 组件传入的全局配置，所有子组件都可以通过 usePreset Hook 访问。
          在实际业务中，preset 通常包含权限列表、API 接口、枚举值等全局配置信息。
        </Text>
      </Card>
    </Space>
  );
};

const BaseExample = () => {
  return (
    <PureGlobal preset={mockPreset}>
      <PresetExample />
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- 主题配置
- 展示了主题色的自定义和预览效果
- _Global(@components/Global),antd(antd)

```jsx
const { PureGlobal } = _Global;
const { Space, Button, Card, ColorPicker, Typography, Divider } = antd;

const { Text, Title } = Typography;

const ThemeExample = ({ themeToken }) => {
  const primaryColor = themeToken?.colorPrimary || '#4096ff';

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="主题色演示" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>当前主题色：</Text>
            <span style={{
              display: 'inline-block',
              width: '24px',
              height: '24px',
              backgroundColor: primaryColor,
              marginLeft: '8px',
              borderRadius: '4px',
              border: '1px solid #d9d9d9'
            }} />
            <Text code style={{ marginLeft: '8px' }}>{primaryColor}</Text>
          </div>
          <Divider style={{ margin: '12px 0' }} />
          <div>
            <Text strong>主色按钮：</Text>
            <Button type="primary" style={{ marginLeft: '8px' }}>
              主色按钮
            </Button>
          </div>
          <div>
            <Text strong>链接文字：</Text>
            <Typography.Link style={{ marginLeft: '8px' }}>
              链接文字
            </Typography.Link>
          </div>
          <Divider style={{ margin: '12px 0' }} />
          <div>
            <Text strong>Alert 组件（使用主题色）：</Text>
            <Space direction="vertical" style={{ width: '100%', marginTop: '8px' }}>
              <Button type="primary">Primary 按钮</Button>
              <Button danger>Danger 按钮</Button>
            </Space>
          </div>
        </Space>
      </Card>
      <Card title="说明" size="small">
        <Text type="secondary">
          通过 themeToken 属性可以自定义主题色。Global 组件会自动根据主题色生成透明度渐变，
          并应用到所有使用主题色的组件上，包括按钮、链接、输入框等。
        </Text>
      </Card>
    </Space>
  );
};

const BaseExample = () => {
  const [color, setColor] = React.useState('#4096ff');

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="主题色选择" size="small">
        <Space>
          <Text>选择主题色：</Text>
          <ColorPicker
            value={color}
            onChange={(color) => setColor(color.toHexString())}
            showText
          />
        </Space>
      </Card>
      <PureGlobal themeToken={{ colorPrimary: color }}>
        <ThemeExample themeToken={{ colorPrimary: color }} />
      </PureGlobal>
    </Space>
  );
};

render(<BaseExample />);

```

- 全局状态管理
- 展示了 useGlobalContext、SetGlobal、GetGlobal 的使用
- _Global(@components/Global),antd(antd)

```jsx
const { PureGlobal, useGlobalContext, SetGlobal, GetGlobal } = _Global;
const { Space, Button, Input, Card, Typography, Divider } = antd;

const { Text } = Typography;

const GlobalContextExample = () => {
  const { global: userName, setGlobal: setUserName } = useGlobalContext('userName');
  const { global: userCount, setGlobal: setUserCount } = useGlobalContext('userCount');

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="全局状态管理 - 用户信息" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>用户名：</Text>
            <Text>{userName || '未设置'}</Text>
          </div>
          <div>
            <Text strong>用户数量：</Text>
            <Text>{userCount || 0}</Text>
          </div>
          <Divider style={{ margin: '12px 0' }} />
          <Space>
            <Button
              onClick={() => setUserName('张三')}
              disabled={userName === '张三'}
            >
              设置用户名为"张三"
            </Button>
            <Button
              onClick={() => setUserName('李四')}
              disabled={userName === '李四'}
            >
              设置用户名为"李四"
            </Button>
            <Button
              onClick={() => setUserName('')}
            >
              清空用户名
            </Button>
          </Space>
          <Space>
            <Button
              onClick={() => setUserCount((userCount || 0) + 1)}
            >
              用户数量 +1
            </Button>
            <Button
              onClick={() => setUserCount(0)}
              disabled={userCount === 0}
            >
              重置用户数量
            </Button>
          </Space>
        </Space>
      </Card>

      <SetGlobal globalKey="appName" value="Components-Core 示例应用">
        {({ global: appName }) => (
          <Card title="使用 SetGlobal 组件" size="small">
            <Text>应用名称：{appName}</Text>
          </Card>
        )}
      </SetGlobal>

      <GetGlobal globalKey="userName">
        {({ value }) => (
          <Card title="使用 GetGlobal 组件" size="small">
            <Text>当前用户名：{value || '未设置'}</Text>
          </Card>
        )}
      </GetGlobal>

      <Card title="说明" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text type="secondary">
            useGlobalContext Hook 提供了全局状态管理功能，状态保存在 Global 组件一级，
            不会随着组件销毁而销毁。适合用于需要在多个组件间共享的状态。
          </Text>
          <Text type="secondary">
            SetGlobal 和 GetGlobal 组件提供了更声明式的方式来设置和获取全局值，
            特别适合在 JSX 中直接使用。
          </Text>
        </Space>
      </Card>
    </Space>
  );
};

const BaseExample = () => {
  return (
    <PureGlobal>
      <GlobalContextExample />
    </PureGlobal>
  );
};

render(<BaseExample />);

```

- 初始化加载
- 展示了 init 方法的使用，用于系统首次加载时的异步操作
- _Global(@components/Global),antd(antd)

```jsx
const { PureGlobal } = _Global;
const { Space, Card, Typography, Alert, Spin, Button } = antd;

const { Title, Text } = Typography;

const InitExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="初始化加载演示" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text type="secondary">
            点击下方按钮查看初始化加载效果。init 方法会在系统首次加载时执行，
            可以返回 Promise 来处理异步操作，在加载完成前不会显示页面内容。
          </Text>
          <Space>
            <Button type="primary" onClick={() => window.location.reload()}>
              重新加载页面
            </Button>
          </Space>
        </Space>
      </Card>

      <Card title="模拟的异步数据加载" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>用户信息：</Text>
            <div style={{ marginTop: '8px', padding: '12px', backgroundColor: '#fafafa', borderRadius: '4px' }}>
              <div>用户ID：10001</div>
              <div>用户名：张三</div>
              <div>部门：技术部</div>
            </div>
          </div>
          <div>
            <Text strong>系统配置：</Text>
            <div style={{ marginTop: '8px', padding: '12px', backgroundColor: '#fafafa', borderRadius: '4px' }}>
              <div>主题色：#4096ff</div>
              <div>语言：zh-CN</div>
              <div>环境：production</div>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="说明" size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text type="secondary">
            init 方法会在应用初始化时执行，通常用于加载用户信息、系统配置、权限数据等。
            在 init 方法返回的 Promise resolve 之前，页面会显示加载状态，不会渲染子组件。
          </Text>
          <Text type="secondary">
            这样可以确保在页面显示前，所有必要的全局数据都已经加载完成，
            避免页面出现闪烁或需要数据时的加载等待状态。
          </Text>
          <Alert
            message="注意：实际使用时，init 方法应该返回真实的异步请求 Promise"
            type="info"
            showIcon
          />
        </Space>
      </Card>
    </Space>
  );
};

// 模拟的 init 方法
const mockInit = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('初始化完成：加载用户数据和系统配置');
      resolve();
    }, 1500);
  });
};

const BaseExample = () => {
  return (
    <PureGlobal init={mockInit}>
      <InitExample />
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
        <Alert
          message="这是一条警示信息"
          type="error"
          showIcon
          icon={<Icon colorful type="icon-color-caisejingshi" />}
        />

        <Alert
          message="这是一条操作成功的状态反馈"
          description="提示提示提示提示提示提示提示提示提示"
          type="success"
          showIcon
        />
        <Alert
          message="这是一条普通的信息说明"
          description="提示提示提示提示提示提示提示提示提示"
          type="info"
          showIcon
        />
        <Alert
          message="这是一条提示信息"
          description="提示提示提示提示提示提示提示提示提示"
          type="warning"
          showIcon
        />
        <Alert
          message="这是一条请求失败的状态反馈"
          description="提示提示提示提示提示提示提示提示提示"
          type="error"
          showIcon
        />
        <Alert
          message="这是一条警示信息"
          description="提示提示提示提示提示提示提示提示提示"
          type="error"
          showIcon
          icon={<Icon colorful type="icon-color-caisejingshi" />}
        />

        <Alert
          message="这是一条操作成功的状态反馈"
          description="提示提示提示提示提示提示提示提示提示"
          type="success"
          showIcon
          closable
        />
        <Alert
          message="这是一条普通的信息说明"
          description="提示提示提示提示提示提示提示提示提示"
          type="info"
          showIcon
          closable
        />
        <Alert
          message="这是一条提示信息"
          description="提示提示提示提示提示提示提示提示提示"
          type="warning"
          showIcon
          closable
        />
        <Alert
          message="这是一条请求失败的状态反馈"
          description="提示提示提示提示提示提示提示提示提示"
          type="error"
          showIcon
          closable
        />
        <Alert
          message="这是一条警示信息"
          description="提示提示提示提示提示提示提示提示提示"
          type="error"
          showIcon
          closable
          icon={<Icon colorful type="icon-color-caisejingshi" />}
        />
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

- 无边框标签
- 展示了无边框标签
- _Global(@components/Global),antd(antd)

```jsx
const { PureGlobal } = _Global;
const { Tag, Space } = antd;

const BasicExample = () => {
  return (
    <PureGlobal>
      <Space>
        <Tag className="no-border" closable>
          标签1
        </Tag>
        <Tag className="no-border" closable>
          标签2
        </Tag>
        <Tag className="no-border" closable>
          标签3
        </Tag>
      </Space>
    </PureGlobal>
  );
};

render(<BasicExample />);

```

### API

### Global

Global 组件是 components-core 的全局配置组件，必须放置在应用最外层。它提供了全局上下文、主题配置、国际化支持、错误边界等功能。

#### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| preset | object | 否 | {} | 全局预设参数，可通过 usePreset 获取，由业务系统设置 |
| themeToken | object | 否 | {} | 主题配置，参考 Antd 的 themeToken，一般只需设置 {colorPrimary} |
| init | function | 否 | - | 初始化方法，在系统首次加载时执行，可返回 Promise，用于放置系统显示前的异步操作 |
| children | ReactNode | 是 | - | 子组件 |
| className | string | 否 | - | 自定义类名 |

### PureGlobal

纯全局组件，API 与 Global 相同。去除了页面错误捕获和 container-body 类名带来的默认最小宽度等样式设置，主要用于组件库的演示环境和弹窗中。

### GlobalProvider

全局上下文提供者组件，是 Global 和 PureGlobal 的底层实现，一般不直接使用。

#### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| preset | object | 否 | {locale: "zh-CN", apis: {}} | 全局预设参数 |
| themeToken | object | 否 | - | 主题配置 |
| init | function | 否 | - | 初始化方法 |
| children | ReactNode | 是 | - | 子组件 |

### usePreset

获取预设的 preset 参数 Hook。已确定的系统需要使用的 key 值包括：permissions、apis、formOptions、modalOptions。

#### 返回值

返回 preset 对象，包含所有通过 Global 组件传入的全局配置。

### useGlobalContext

获取和设置全局状态的 Hook。该状态保存在 Global 组件一级，不会随着内部组件的销毁而销毁。主要用于组件内部，业务应避免使用该 API 设置新的 global 变量。业务如有需要应自行在顶级组件中设置 context。

#### 参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| globalKey | string | 否 | - | 全局参数的 key。当存在 globalKey 时，获取和设置的是 global[key]，否则获取和设置的是整个 global 对象。除非存在多个 key-value，否则不推荐直接使用不存在 globalKey 的情况 |

#### 返回值

返回包含 global 和 setGlobal 的对象：

| 属性名 | 类型 | 说明 |
|--------|------|------|
| global | any | 当前的 global 值 |
| setGlobal | function | 设置当前的 global 值 |

### useGlobalValue

获取指定 key 的全局值的 Hook，类似 useGlobalContext 的简化版本。

#### 参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| globalKey | string | 是 | - | 要获取的全局参数的 key |

#### 返回值

返回指定 key 对应的 global 值。

### GlobalValue

通过 render props 模式获取指定 global 值的组件。

#### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| globalKey | string | 是 | - | 要获取的全局参数的 key |
| children | function | 是 | - | 渲染函数，接收 {value} 参数 |

### containerClassName

Global 组件容器的 CSS 类名常量。当需要使用 CSS 选择器选中 Global 组件容器时，可以使用该常量确保选择器的准确性。

该值是 Global 组件内部使用的 CSS 类名的转义版本，用于处理类名中的特殊字符（如 + 和 /），确保在 CSS 选择器中能够正确匹配。

### GlobalSetting

设置全局值的组件（文档中未详细说明具体用法）。

### SetGlobal

设置全局值的组件，支持条件渲染和函数作为 children。

#### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| globalKey | string | 是 | - | 要设置的全局参数的 key |
| value | any | 是 | - | 要设置的值 |
| needReady | boolean | 否 | false | 是否需要等待 global 有值后再渲染 children |
| children | ReactNode \| function | 是 | - | 子组件，当为函数时会接收 {global, setGlobal} 参数 |

### GetGlobal

获取全局值的组件，通过 render props 模式访问。

#### 属性说明

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| globalKey | string | 是 | - | 要获取的全局参数的 key |
| children | function | 是 | - | 渲染函数，接收 {value} 参数 |

### containerClassName

Global 组件容器的 CSS 类名常量。当需要使用 CSS 选择器选中 Global 组件容器时，可以使用该常量确保选择器的准确性。

该值是 Global 组件内部使用的 CSS 类名的转义版本，用于处理类名中的特殊字符（如 + 和 /），确保在 CSS 选择器中能够正确匹配。



