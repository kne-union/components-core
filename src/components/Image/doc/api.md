### Image 基础图片组件

| 属性名     | 说明         | 类型     | 默认值 |
|---------|------------|--------|-----|
| src     | 图片的src地址   | string | -   |
| id      | oss的id     | string | -   |
| loading | 加载时显示的组件   | ReactNode | `<Skeleton.Avatar shape="square" active/>` |
| error   | 加载错误时显示的组件 | ReactNode | `<Icon role="error-icon" colorful type="icon-color-touxiang-nan"/>` |
| alt     | 图片的alt属性   | string | -   |
| className | 自定义类名     | string | -   |
| onClick | 点击图片的回调函数 | function | -   |
| apis    | API配置，用于加载OSS图片 | object | -   |

### Image.Avatar 头像组件

基于Antd的Avatar组件，支持图片头像和默认性别图标头像，其他参数参考Antd的Avatar组件

| 属性名    | 说明                  | 类型     | 默认值 |
|--------|---------------------|--------|-----|
| src     | 图片的src地址   | string | -   |
| id      | oss的id     | string | -   |
| gender  | 性别 F，female，f为女其他为男 | string | -   |
| size    | 头像大小 | number | 100   |
| width   | 头像宽度 | number | -   |
| height  | 头像高度 | number | -   |
| shape   | 头像形状，可选 'circle' | string | -   |
| gap     | 头像与图标之间的间距 | number | -   |
| icon    | 自定义图标 | ReactNode | -   |
| defaultAvatar | 默认头像 | string | 默认头像SVG |
| className | 自定义类名 | string | -   |
| apis    | API配置，用于加载OSS图片 | object | -   |
