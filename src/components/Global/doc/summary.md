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
