### Drawer

屏幕边缘滑出的浮层面板，用于展示详细信息、表单编辑等场景。

#### 属性说明

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| title | 抽屉标题 | ReactNode | - |
| size | 抽屉尺寸，可选值：`small`(600px)、`default`(1000px)、`large`(calc(100vw-64px)) | string | `small` |
| children | 抽屉内容，可以是 JSX 或函数，函数时可接收 close 方法和 props | ReactNode \| function | - |
| footer | 抽屉底部内容，设为 null 且 footerButtons 未设置时不显示底部，函数时可接收 close 方法和 props | ReactNode \| function | - |
| footerButtons | 底部按钮配置数组，默认显示"取消"和"确定"按钮 | array | - |
| onConfirm | 点击确认按钮触发的回调，返回 Promise 时按钮显示 loading 状态，返回 false 时不关闭抽屉 | function | - |
| onCancel | 点击取消按钮触发的回调 | function | - |
| onClose | 抽屉关闭时的回调 | function | - |
| closable | 是否显示关闭按钮 | boolean | true |
| maskClosable | 点击蒙层是否允许关闭 | boolean | false |
| disabledScroller | 是否禁用滚动条美化 | boolean | false |
| withDecorator | 抽屉内容修饰器，可在内容外层添加装饰 | function | - |
| open | 受控模式下抽屉的显示状态 | boolean | - |
| width | 自定义抽屉宽度 | string \| number | - |

**注意**：其他未列出的属性可参考 Ant Design Drawer 组件

#### footerButtons 数组项说明

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| children | 按钮文字 | ReactNode | - |
| type | 按钮类型，参考 Ant Design Button | string | - |
| danger | 是否为危险按钮 | boolean | false |
| ButtonComponent | 自定义按钮组件 | Component | LoadingButton |
| onClick | 点击事件回调 | function | - |
| autoClose | 点击后是否自动关闭抽屉 | boolean | true |
| display | 是否显示该按钮 | boolean \| function | true |

### useDrawer

用于获取一个可以调用 Drawer 的 Hook 函数，配合 AppDrawer 使用。

#### 返回值

返回一个数组：`[drawer, DrawerContextHolder]`

- **drawer**: 函数，执行后可打开一个 Drawer，参数同 Drawer 组件属性
  - 返回对象包含 `destroy` 方法用于关闭 Drawer
  - 返回对象包含 `update` 方法用于更新 Drawer 配置

- **DrawerContextHolder**: 必须渲染在组件树中，用于承载 Drawer 实例

### DrawerButton

结合 FetchButton 功能的按钮组件，点击后加载数据，加载完成后自动打开 Drawer。

#### 属性说明

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| api | FetchButton 的 API 配置对象 | `{ loader: Function }` | - |
| modalProps | Drawer 属性配置，可以是对象或函数 | object \| function({ data, fetchApi, close }) | - |
| onError | 数据加载错误回调 | function | - |

**注意**：其他属性同 Ant Design Button 组件

#### modalProps 为函数时的参数说明

| 参数名 | 说明 | 类型 |
|--------|------|------|
| data | 加载的数据 | any |
| fetchApi | Fetch API 对象 | object |
| close | 关闭 Drawer 的方法 | function |

### AppDrawer

全局 Drawer 提供者组件，为内部使用 useDrawer 的组件提供上下文环境。

#### 使用方式

在应用最外层包裹 AppDrawer，即可在任意组件中使用 useDrawer：

```javascript
import { AppDrawer } from '@components/Drawer';

function App() {
  return (
    <AppDrawer>
      <YourAppContent />
    </AppDrawer>
  );
}
```
