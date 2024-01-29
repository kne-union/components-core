|属性名| 说明                                                                                           | 类型       | 默认值                                                                                                                                                                              |
|  ---  |----------------------------------------------------------------------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|  dataFormat   | 用于处理后端返回的数据，作为表格数据                                                                           | function | (data) => {return {list: data.data.pageData,total: data.data.totalCount};}                                                                                                       |
|   pagination  | 控制分页参数                                                                                       | object   | {showSizeChanger: true,showQuickJumper: true,open: true,paramsType: 'data',requestType: 'reload',current: 'currentPage',pageSize: 'perPage',defaultPageSize: 20,size: 'default'} |
|getColumns| 获取colums参数的函数,该函数的参数可以拿到请求结果数据,如果不传该函数则默认取colums属性 getColumns({data,formatData}),可以返回Promise | function | -                                                                                                                                                                                |
|stickyOffset| sticky模式，table header距离顶部位置，默认会取 --nav-height，注意：该组件会覆盖调sticky中设置的值，导致其设置不生效，需要配置该参数来实现功能    | string   | var(--nav-height)                                                                                                                                                                |
|      controllerOpen      | 是否开启列控制，调整列宽和列显示                                                                             | boolean  | true                                                                                                                                                                             |

其他参数参考

表格参数:

[antd Table](https://ant.design/components/table-cn/)

请求数据参数:

[react-fetch](/lib/react-fetch)
