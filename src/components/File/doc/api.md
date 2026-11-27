### File 组件

File 组件用于通过 OSS ID 获取文件访问地址并展示文件内容。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | OSS 文件的唯一标识符 | string | 否* | - |
| url | 直接指定文件的访问地址 | string | 否* | - |
| children | 渲染函数，接收 `{ url }` 参数 | Function | 是 | - |
| apis | OSS 接口配置，包含 `oss` 属性 | object | 否 | - |
| error | 加载失败时显示的内容 | ReactNode | 否 | null |
| loading | 加载中显示的内容 | ReactNode | 否 | null |

**注意**：`id` 和 `url` 至少需要传入其中一个。

### Download 组件

文件下载按钮组件，支持通过 OSS ID 或 URL 下载文件。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | OSS 文件的唯一标识符 | string | 否* | - |
| url | 直接指定文件的下载地址 | string | 否* | - |
| filename | 下载后的文件名 | string | 否 | 未命名下载文件 |
| apis | OSS 接口配置，包含 `oss` 属性 | object | 否 | - |
| onSuccess | 下载成功回调函数 | function | 否 | - |
| onError | 下载失败回调函数 | function | 否 | - |
| children | 按钮内容 | ReactNode | 是 | - |

**注意**：`id` 和 `url` 至少需要传入其中一个。

### List 组件

文件列表展示组件，支持文件预览、编辑名称、下载、删除等操作。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| dataSource | 文件数据列表 | array | 否 | [] |
| getPermission | 权限控制函数，接收 `{ type, itemData }` 参数，返回 `false` 表示无权限 | function | 否 | - |
| hasPreview | 是否启用预览功能 | boolean | 否 | true |
| infoItemRenders | 自定义列配置，数组中每项包含 `span`（栅格数）和 `render`（渲染函数） | array | 否 | - |
| renderModal | 自定义 Modal 渲染函数 | function | 否 | - |
| apis | 操作 API 配置 | object | 否 | - |
| apis.onEdit | 编辑文件名称回调，接收参数 `(formData, itemData)` | function | 否 | - |
| apis.onPreview | 预览文件回调，接收参数 `(itemData)` | function | 否 | - |
| apis.onDelete | 删除文件回调，接收参数 `(itemData)` | function | 否 | - |

#### dataSource 数据结构

| 属性名 | 说明 | 类型 |
|--------|------|------|
| id | 文件唯一标识符（一般为 OSS ID） | string |
| uuid | 临时文件唯一标识符 | string |
| type | 文件状态，值为 `"uploading"` 时显示上传中状态 | string |
| filename | 文件名称 | string |
| date | 上传日期（时间戳或 Date 对象） | Date \| string |
| userName | 上传人姓名 | string |

### OptionButtons 组件

文件操作按钮组，提供预览、编辑、删除等操作按钮。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| itemData | 文件数据对象 | object | 是 | - |
| apis | 操作 API 配置 | object | 否 | - |
| apis.onEdit | 编辑文件名称回调 | function | 否 | - |
| apis.onPreview | 预览文件回调 | function | 否 | - |
| apis.onDelete | 删除文件回调 | function | 否 | - |
| hasPreview | 是否显示预览按钮 | boolean | 否 | true |
| renderModal | 自定义 Modal 渲染函数 | function | 否 | - |

### FileLink 组件

文件链接组件，点击后弹出文件预览弹窗。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | OSS 文件的唯一标识符 | string | 否* | - |
| url | 直接指定文件的访问地址 | string | 否* | - |
| originName | 文件原始名称 | string | 否 | - |
| title | 预览弹窗标题 | string \| ReactNode | 否 | originName |
| apis | OSS 接口配置，包含 `oss` 属性 | object | 否 | - |
| openDownload | 是否启用下载功能 | boolean | 否 | true |
| modalProps | Modal 组件的额外属性 | object | 否 | - |
| children | 链接文字内容，不传则显示 `originName` | ReactNode | 否 | originName |

**注意**：`id` 和 `url` 至少需要传入其中一个。

### downloadBlobFile 函数

下载文件的工具函数。

#### 函数签名

```typescript
downloadBlobFile(target: string | Blob, filename: string): void
```

#### 参数说明

| 参数名 | 说明 | 类型 | 必填 |
|--------|------|------|------|
| target | 文件下载地址或二进制数据（Blob） | string \| Blob | 是 |
| filename | 下载后的文件名 | string | 是 |

### useDownload Hook

生成下载函数并管理下载状态的 Hook。

#### Hook 返回值

| 属性名 | 说明 | 类型 |
|--------|------|------|
| download | 执行下载的函数 | function |
| isLoading | 是否正在下载 | boolean |
| others | 其他 useFetch 返回的属性 | object |

#### Hook 参数

| 参数名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | OSS 文件的唯一标识符 | string | 否* | - |
| url | 直接指定文件的下载地址 | string | 否* | - |
| filename | 下载后的文件名 | string | 否 | - |
| apis | OSS 接口配置，包含 `oss` 属性 | object | 否 | - |
| onSuccess | 下载成功回调函数 | function | 否 | - |
| onError | 下载失败回调函数 | function | 否 | - |

**注意**：`id` 和 `url` 至少需要传入其中一个。

### useFileModal Hook

命令式打开文件预览弹窗，用法与 `useModal`、`useFormModal` 一致。弹窗由 core Modal 承载，图片缩放、旋转工具栏可用。

```jsx
const fileModal = useFileModal();
const {close} = fileModal({id, filename, openDownload: true});
```

#### fileModal 函数参数

| 参数名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | OSS 文件的唯一标识符 | string | 否* | - |
| src | 直接指定文件的访问地址 | string | 否* | - |
| filename | 文件名称，用于判断预览类型 | string | 否 | - |
| originName | filename 的备选 | string | 否 | - |
| title | 预览弹窗标题 | string \| ReactNode | 否 | filename |
| apis | OSS 接口配置 | object | 否 | - |
| openDownload | 是否显示下载按钮 | boolean | 否 | true |
| openPrint | 是否显示打印按钮（仅 txt/pdf/image/html） | boolean | 否 | false |
| ...其他 | 透传给 Modal，如 `width` | - | 否 | - |

#### fileModal 返回值

| 属性名 | 说明 | 类型 |
|--------|------|------|
| close | 关闭弹窗 | function |

**注意**：`id` 和 `src` 至少需要传入其中一个。

### FileModal 组件

声明式文件预览弹窗，需要受控时使用；参数同 `useFileModal` 的 fileModal 函数参数。

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| open | 是否显示 | boolean | 否 | - |
| onClose | 关闭回调 | function | 否 | - |
| onOpenChange | 显示状态变化回调 | function(open) | 否 | - |
| renderModal | 自定义弹窗外壳 | function(modalProps) | 否 | core Modal |

### getFileModalProps 函数

返回文件预览弹窗内容配置 `{title, children, footer, width}` 的纯函数，可交给任意 `useModal()(config)`；`useFileModal` 即基于它实现。

### FileButton 组件

文件按钮组件，点击后弹出文件预览弹窗。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| id | OSS 文件的唯一标识符 | string | 否* | - |
| url | 直接指定文件的访问地址 | string | 否* | - |
| originName | 文件原始名称 | string | 否 | - |
| title | 预览弹窗标题 | string \| ReactNode | 否 | originName |
| apis | OSS 接口配置，包含 `oss` 属性 | object | 否 | - |
| openDownload | 是否启用下载功能 | boolean | 否 | true |
| modalProps | Modal 组件的额外属性 | object | 否 | - |
| type | 按钮类型 | string | 否 | default |
| children | 按钮内容 | ReactNode | 是 | - |

**注意**：`id` 和 `url` 至少需要传入其中一个。
