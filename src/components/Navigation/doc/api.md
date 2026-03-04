|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|base|导航基础路径|string|-|
|className|自定义类名|string|-|
|defaultTitle|默认页面标题|string|-|
|headerLogo|导航栏Logo配置|object|内置logo|
|indexLabel|首页导航标签|string|ReactNode|首页|
|isFixed|是否固定在页面顶部|boolean|true|
|list|导航菜单项配置|array|-|
|navigateTo|自定义导航函数|function|-|
|onChange|导航切换回调|function|-|
|overflowedIndicator|导航项溢出时的指示器|ReactNode|默认"更多"下拉|
|permissions|当前用户的权限列表|array|-|
|rightOptions|导航栏右侧区域内容|ReactNode|-|
|showIndex|是否显示首页导航|boolean|true|

### list项配置

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|key|导航项唯一标识|string|-|
|title|导航项显示标题|string|ReactNode|-|
|path|导航项路径|string|function|-|
|permission|权限控制，可以是字符串、数组或函数|string|array|function|-|
|icon|导航项图标|ReactNode|-|
