| 属性名                | 说明               | 类型                      | 默认值                             |
|--------------------|------------------|-------------------------|---------------------------------|
| stateOption        | state操作列表        | string                  | {key: string, tab: ReactNode}[] |
| activeKey          | 当前激活 tab 面板的 key | string                  | -                               |
| type               | 当前tab展示样式        | 'tab'、'radio'、'step'    | 'tab'                           |
| onChange           | 事件返回选中的key       | (value: string) => void |                                 |
| tabBarExtraContent | 展示在state bar右侧   | ReactNode               | null                            |
| isInner            | 底部线延展至总长         | boolean                 | false                           |

### Mapping
#### stateOption

| 属性名                 | 说明                | 类型                     | 默认值                |
|-----------------------|--------------------|-------------------------|-----------------------|
| key           | 对应 activeKey            | string                  | -                  |
| tab           | 	选项卡头显示文字            | ReactNode                 | -                  |
