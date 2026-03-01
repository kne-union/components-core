### StateTag 属性

| 属性名            | 说明                            | 类型                                                                                                                                                                                             | 默认值       |
|----------------|-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| type           | tag的类型，类型决定显示的颜色              | 'default'(#666666)、'skill'(#666666)(此时边框颜色为 #EEEEEE)、'success'(#027A48)、'progress'(#F09700)、'danger'(#D14343)、'info'(#155ACF)、'other'(#6740C3)(待定颜色)、'result'(#666666)、'filterResult'(#5CB8B2) | 'default' |
| showBorder     | 是否展示边框                        | boolean                                                                                                                                                                                        | false     |
| showBackground | 是否展示背景色                       | boolean                                                                                                                                                                                        | true      |
| text           | tag文案                         | string                                                                                                                                                                                         | ''        |
| filterName     | tag类型为"filterResult"时显示在前边的文案 | string                                                                                                                                                                                         | ''        |

其他参数参考 [antd Tag.Tag](https://ant.design/components/tag-cn)

### StateTagEnum 属性

StateTagEnum 是基于 Enum 组件和 StateTag 组件的封装，用于从枚举数据中自动获取状态标签。

| 属性名        | 说明     | 类型     | 默认值 |
|------------|--------|--------|-----|
| moduleName | 枚举模块名称 | string | -   |
| name       | 枚举项名称  | string | -   |

其他属性继承自 StateTag 组件
