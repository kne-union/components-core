| 属性名                       | 说明                                                                                 | 类型                                         | 默认值  |
|---------------------------|------------------------------------------------------------------------------------|--------------------------------------------|------|
| dataSource                | 详情数据源，内部每个数组为一行数据，每行数据中每个对象为一列数据，每行最多包含2列内容，多余的会被丢弃                                | array[[{display,label,content,featureId}]] | -    |
| dataSource[[{display}]]   | 数据是否展示,当为function时可以接收到(item,dataSource)参数，item为当前项配置，dataSource为整个组件的dataSource配置 | boolean,function                           | true |
| dataSource[[{label}]]     | 数据展示的label                                                                         | jsx                                        | -    |
| dataSource[[{content}]]   | 数据展示的内容                                                                            | jsx                                        | -    |
| dataSource[[{featureId}]] | Features控制的id，参考Features组件的id参数                                                    | string                                     | -    |
