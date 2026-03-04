| 属性名      | 说明                                                                                                      | 类型            | 默认值          |
|----------|---------------------------------------------------------------------------------------------------------|---------------|--------------|
| type     | 类型，可选值为hidden，tooltip，error，分别为隐藏，气泡提示，错误提示三种形式                                                         | string        | hidden       |
| tagName  | 当前组件的tagName，同React.createElement的type参数，默认为span                                                        | string        | span         |
| message  | 提示文案                                                                                                    | string        | 您暂无权限，请联系管理员 |
| request  | 权限列表可以为字符串数组、函数或混合类型，每个item为一项权限的key，所有权限在全局的permissions中存在则判断为权限通过                          | array,function | []           |
| children | 该参数可以传function类型，children({isPass, type, request})，isPass为权限校验是否通过，type为提示类型，request为所需权限列表，可以自行实现权限的展示 | jsx,function  | -            |

### Hooks

#### usePermissions

获取当前用户的权限列表

```javascript
const { permissions } = usePermissions();
```

#### usePermissionsPass

检查是否拥有指定权限

```javascript
const isPass = usePermissionsPass({ request: ['user:view'] });
```

### 工具函数

#### computedIsPass

计算权限验证结果

```javascript
const isPass = computedIsPass({ 
  permissions: ['user:view', 'user:edit'], 
  request: ['user:view'] 
});
```
