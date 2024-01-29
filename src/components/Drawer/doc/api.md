|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
| footer        | 弹窗的footer，当其被显式设置成null且footerButtons没有设置过时弹窗不显示footer。当它类型为function时可以得到close方法和withDecorator设置的props                                   | jsx,function | -     |
| footerButtons | 弹窗footer的按钮区，默认为确认和取消按钮，默认按钮分别响应onConfirm和onCancel方法，如果自定义设置footerButtons则需要自行传入onClick参数，onConfirm和onCancel方法将不生效                      | array        | -     |
| onClose       | 弹窗关闭时调用，弹窗受控时由该方法将外部open状态修改                                                                                                            | function     | -     |
| onConfirm     | 当footerButtons未自定义设置时点击确认按钮触发执行该方法，当其返回Promise点击后Promise，resolve之前确认按钮显示为loading状态，返回值为false或者Promise的resolve值为false时弹窗不会被关闭，其他情况弹窗默认关闭 | function     | -     |
| onCancel      | 和onConfirm类似，其为点击取消按钮触发                                                                                                                 | function     | -     |
| children      | 弹窗内容，可以为jsx或者function，为function时可以接收到close和withDecorator设置的props                                                                        | jsx,function | -     |
| withDecorator | 弹窗修饰器，会接收到弹窗children的render方法，可以在其外部添加修饰内容后执行render方法，给render方法传入的值可以在children,footer,rightOptions类型为function时接收到对应的参数                  | function     | -     |
| maskClosable  | 点击蒙层是否允许关闭                                                                                                  | boolean      | false |

其他参数参考antd Drawer组件

### AppDrawer

全局抽屉包裹组件，提供消费上下文的默认环境，提供可消费 React context 的 drawer 的静态方法，可以简化 useDrawer 等方法需要手动植入 contextHolder 的问题。

### useDrawer

获取一个执行后可以弹出一个Drawer组件的方法,前置条件是需要再全局注入AppDrawer包裹组件

#### return:drawer

| 属性名   | 说明                            | 类型       |
|-------|-------------------------------|----------|
| drawer | 执行后可以弹出一个Drawer弹窗，参数同Drawer组件参数 | function |

### DrawerButton

点击以后可以执行获取数据，在数据未返回时按钮展示为loading状态，数据返回后弹出Drawer弹窗

| 属性名         | 说明                                                | 类型                                     | 默认值 |
|-------------|---------------------------------------------------|----------------------------------------|-----|
| api         | @kne/react-fetch 所需参数                             | object                                 | -   |
| drawerProps | 同Drawer参数,当它为function时，执行function后返回的值作为drawerProps | object,function({data,fetchApi,close}) | -   |

其他参数同antd Button 组件