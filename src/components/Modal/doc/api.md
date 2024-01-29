| 属性名           | 说明                                                                                                                                      | 类型           | 默认值   |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------|--------------|-------|
| footer        | 弹窗的footer，当其被显式设置成null且footerButtons没有设置过时弹窗不显示footer。当它类型为function时可以得到close方法和withDecorator设置的props                                   | jsx,function | -     |
| footerButtons | 弹窗footer的按钮区，默认为确认和取消按钮，默认按钮分别响应onConfirm和onCancel方法，如果自定义设置footerButtons则需要自行传入onClick参数，onConfirm和onCancel方法将不生效                      | array        | -     |
| onClose       | 弹窗关闭时调用，弹窗受控时由该方法将外部open状态修改                                                                                                            | function     | -     |
| onConfirm     | 当footerButtons未自定义设置时点击确认按钮触发执行该方法，当其返回Promise点击后Promise，resolve之前确认按钮显示为loading状态，返回值为false或者Promise的resolve值为false时弹窗不会被关闭，其他情况弹窗默认关闭 | function     | -     |
| onCancel      | 和onConfirm类似，其为点击取消按钮触发                                                                                                                 | function     | -     |
| children      | 弹窗内容，可以为jsx或者function，为function时可以接收到close和withDecorator设置的props                                                                        | jsx,function | -     |
| withDecorator | 弹窗修饰器，会接收到弹窗children的render方法，可以在其外部添加修饰内容后执行render方法，给render方法传入的值可以在children,footer,rightOptions类型为function时接收到对应的参数                  | function     | -     |
| rightOptions  | 弹窗右侧区域，和children类似可以为jsx或者function类型                                                                                                    | jsx,function | -     |
| maskClosable  | 点击蒙层是否允许关闭                                                                                                  | boolean      | false |

其他参数参考antd Modal组件

### useModal

获取一个执行后可以弹出一个Modal组件的方法

#### return:modal

| 属性名   | 说明                            | 类型       |
|-------|-------------------------------|----------|
| modal | 执行后可以弹出一个Modal弹窗，参数同Modal组件参数 | function |

### TabsModal

一个Tabs和Modal组合起来的组件，对弹窗title做了特殊处理，更加符合UI交互逻辑

| 属性名              | 说明                                                                                   | 类型           | 默认值 |
|------------------|--------------------------------------------------------------------------------------|--------------|-----|
| items            | 同antd Tabs的items参数                                                                   | array        | -   |
| items[].label    | 选项卡头显示文字                                                                             | string       | -   |
| items[].children | 选项卡头显示内容，和antd Tabs不同的是它可以是一个function和Modal的children类似可以接收items[].withDecorator传入的参数 | jsx,function | -   |
| items[].key      | 对应activeKey值                                                                         | string       | -   |
| activeKey        | 当前激活 tab 面板的 key                                                                     | string       |     |
| withDecorator    | 弹窗修饰器和Modal的withDecorator作用一致                                                        | function     | -   |
| defaultActiveKey | 初始化选中面板的 key，如果没有设置 activeKey                                                        | string       |     |
| onChange         | 切换面板的回调                                                                              | function     |     |

### useTabsModal

获取一个执行后可以弹出一个TabsModal组件的方法

#### return:tabsModal

| 属性名       | 说明                                    | 类型       |
|-----------|---------------------------------------|----------|
| tabsModal | 执行后可以弹出一个TabsModal弹窗，参数同TabsModal组件参数 | function |

### ModalButton

点击以后可以执行获取数据，在数据未返回时按钮展示为loading状态，数据返回后弹出Modal弹窗

| 属性名        | 说明                                                | 类型                                     | 默认值 |
|------------|---------------------------------------------------|----------------------------------------|-----|
| api        | @kne/react-fetch 所需参数                             | object                                 | -   |
| modalProps | 同Modal参数,当它为function时，执行function后返回的值作为modalProps | object,function({data,fetchApi,close}) | -   |

其他参数同antd Button 组件

### TabsModalButton

点击以后可以执行获取数据，在数据未返回时按钮展示为loading状态，数据返回后弹出TabsModal弹窗

| 属性名        | 说明                                                    | 类型                                     | 默认值 |
|------------|-------------------------------------------------------|----------------------------------------|-----|
| api        | @kne/react-fetch 所需参数                                 | object                                 | -   |
| modalProps | 同TabsModal参数,当它为function时，执行function后返回的值作为modalProps | object,function({data,fetchApi,close}) | -   |

其他参数同antd Button 组件