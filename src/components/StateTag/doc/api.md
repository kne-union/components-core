| 属性名            | 说明                            | 类型                                                                                                                                               | 默认值       |
|----------------|-------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| type           | tag的类型，类型决定显示的颜色              | 'default'(#666666)、'skill'(#666666)(此时边框颜色为 #EEEEEE)、'success'(#027A48)、'progress'(#F09700)、'danger'(#D14343)、'info'(#155ACF)、'other'(#6740C3)(待定颜色)、'result'(#666666)、'filterResult'(#5CB8B2) | 'default' |
| showBorder     | 是否展示边框                        | boolean                                                                                                                                          | false     |
| showBackground | 是否展示背景色                       | boolean                                                                                                                                          | true      |
| text           | tag文案                         | string                                                                                                                                           | ''        |
| filterName           | tag类型为“filterResult”时显示在前边的文案 | string                                                                                                                                           | ''        |

其他参数参考 [antd Tag.Tag](https://ant.design/components/tag-cn)