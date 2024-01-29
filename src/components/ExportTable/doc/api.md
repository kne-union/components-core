| 属性名     | 说明 | 类型              | 默认值 |
|---------|--|-----------------|-----|
| columns | 配置同TablePage列,属性key对应后端导出的字段名，不需要参与导出的列可以配置属性exportHidden:true | function, array | []  |
| name | 缓存的名称key（导出接口的key） | string |   |
| onExport | 导出事件 | function({name,downloadBlobFile}) |   |
| saveDataApi | 保存接口APi,如果配置优先取当前值，否则取全局中的配置 |  |   |
| getDataApi | 获取上一次保存的列名数据，如果配置优先取当前值，否则取全局中的配置 |  |   |

