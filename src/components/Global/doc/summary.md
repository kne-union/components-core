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
