| 属性名        | 说明                     | 类型     | 默认值 |
|------------|------------------------|--------|-----|
| navigation | 导航参数参考 Navigation 组件参数 | object | -   |
| children   | 一般放置Page组件             | jsx    | -   |

### Page

| 属性名             | 说明                                                                  | 类型         | 默认值   |
|-----------------|--------------------------------------------------------------------|------------|-------|
| menu            | 左菜单区内容                                                              | jsx        | -     |
| filter          | 页面标题位置筛选器参数,参考 Filter 组件参数                                          | object     | -     |
| menuOpen        | 左菜单是否默认打开                                                           | boolean    | true  |
| menuWidth       | 左菜单宽度                                                               | string     | 240px |
| menuFixed       | 左菜单是否fixed布局                                                        | boolean    | true  |
| menuCloseButton | 控制左菜单显示隐藏的按钮是否显示                                                    | boolean    | true  |
| header          | 页头区内容                                                               | jsx        | -     |
| headerFixed     | 页头区是否fixed布局                                                        | boolean    | true  |
| headerInfo      | 页头信息区内容                                                             | jsx        | -     |
| backUrl         | 右侧内容区的标题前展示返回按钮，并返回到该url                                   | 参考 useNavigate     | -       |
| title           | 页面标题                                                                | string,jsx | -     |
| titleExtra      | 页面标题区右侧位置内容                                                         | jsx        | -     |
| titleLeftExtra  | 页面标题区左侧位置内容                                                         | jsx        | -     |
| noMargin        | 页面内容区是否去掉Margin                                                     | boolean    | false |
| noPadding       | 页面内容区是否去掉Padding                                                    | boolean    | false |
| option          | 右操作区内容                                                              | jsx        | -     |
| optionWidth     | 右操作区宽度                                                              | string     | 400px |
| optionNoPadding | 右操作区是否去掉Padding                                                     | boolean    | false |
| optionFixed     | 右操作区是否fixed布局                                                       | boolean    | false |
| optionFooter    | 右操作区底部内容                                                            | jsx        | -     |
| openFeatures    | Page是否启用Features，启用时如果配置文件中没有该模块id则判断为模块关闭，会将name作为Features的id进行设置  | boolean    | false |

### Affix

可以控制其中的内容是否是fixed布局

| 属性名          | 说明               | 类型       | 默认值  |
|--------------|------------------|----------|------|
| isFixed      | 内容是否fixed布局      | boolean  | true |
| offsetTop    | 距离窗口顶部达到指定偏移量后触发 | number   | 0    |
| offsetBottom | 距离窗口底部达到指定偏移量后触发 | number   | -    |
| onChange     | 固定状态改变时触发的回调函数   | function | -    |

### Menu

显示一个菜单，最多支持两级，支持第一级展开收起，支持路径匹配自动高亮

| 属性名              | 说明                                                          | 类型            | 默认值  |
|------------------|-------------------------------------------------------------|---------------|------|
| items            | 菜单项                                                         | array[object] | []   |
| items[].label    | 菜单项显示内容                                                     | jsx           | -    |
| items[].key      | 菜单项的key要求必须唯一                                               | string        | -    |
| items[].iconType | 菜单项前面的icon类型参考 Icon组件的type参数                                | string        | -    |
| items[].path     | 菜单项的路径                                                      | string        | -    |
| items[].onClick  | 菜单项点击触发事件，注意：如果菜单项已经传入path参数则该参数不生效                         | function      | -    |
| items[].children | 菜单项的第二级项列表，参考items参数。注意该组件只支持两级菜单，所以该参数内部的菜单项不再支持children参数 | array[object] | -    |
| currentKey       | 当前被选中的菜单项的key，如果菜单项又path参数，不需要传递该参数，组件会根据路由自动判断选中项          | string        | -    |
| onChange         | currentKey产生修改时触发函数，注意：如果菜单项已经传入path参数则该参数不生效               | function      | -    |
| allowCollapsed   | 是否允许一级菜单收起                                                  | boolean       | true |
| defaultOpenKeys   | 初始展开的 SubMenu 菜单项 key 数组                                                  | string[]      | -    |

### PermissionsPage

加入权限判断的Page，错误类型默认为error，即在该页面没有权限时显示错误

| 属性名         | 说明                      | 类型     | 默认值 |
|-------------|-------------------------|--------|-----|
| permissions | 权限列表参考 Permissions 组件参数 | object | -   |