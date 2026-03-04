|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|allowCollapsed|是否允许子菜单折叠|boolean|true|
|className|自定义类名|string|-|
|currentKey|当前选中的菜单项key|string|-|
|defaultCurrentKey|默认选中的菜单项key|string|-|
|defaultItems|默认菜单项数组|MenuItemProps[]|-|
|defaultOpenKeys|默认展开的菜单项key数组|string[]|-|
|items|菜单项数组|MenuItemProps[]|-|
|onChange|选中项改变时的回调函数|(key: string) => void|-|
|onItemsChange|菜单项改变时的回调函数|(items: MenuItemProps[]) => void|-|
|onOpenChange|展开项改变时的回调函数|(openKeys: string[]) => void|-|
|openKeys|当前展开的菜单项key数组|string[]|-|
|pathMatch|路径匹配函数|(path: string, location: { pathname: string, search: string }) => boolean|-|

### MenuItemProps

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|children|子菜单项|MenuItemProps[]|-|
|fetchOptions|远程加载子菜单的配置|FetchOptions|-|
|icon|菜单项图标React节点|ReactNode|-|
|iconType|菜单项图标类型|string|-|
|label|菜单项标签|string|ReactNode|-|
|onClick|点击菜单项的回调函数|(key: string, props: MenuItemProps) => void|-|
|path|菜单项对应的路径|string|-|
|request|权限请求配置|object|-|

### FetchOptions

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|loader|数据加载函数|() => Promise<MenuItemProps[]>|-|
