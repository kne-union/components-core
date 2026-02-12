### FileList 组件

文件列表组件，提供文件展示、预览、上传等完整功能。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| list | 文件列表数据 | array | 否 | [] |
| setList | 更新文件列表的函数 | function | 否* | - |
| defaultPreviewFileId | 默认预览的文件 ID | string | 否 | - |
| defaultTab | 默认显示的标签页，可选值为 `"list"` 或 `"preview"` | string | 否 | `"list"` |
| maxLength | 最大文件数量 | number | 否 | Number.MAX_VALUE |
| fileSize | 单个文件最大大小（MB） | number | 否 | 20 |
| accept | 允许上传的文件类型数组 | array\<string\> | 否 | `[".png", ".jpg", ".pdf", ".docx", ".doc"]` |
| getPermission | 权限控制函数，接收参数 `(type, itemData)`，返回 `false` 表示无权限 | function | 否 | `() => true` |
| infoItemRenders | 自定义列渲染配置 | array | 否 | - |
| apis | 操作 API 配置 | object | 否 | - |
| apis.onSave | 保存文件回调，接收参数 `(response, ...args)` | function | 否 | - |
| apis.onEdit | 编辑文件名称回调，接收参数 `({formData, item})` | function | 否 | - |
| apis.onPreview | 预览文件回调，接收参数 `(item)` | function | 否 | - |
| apis.onDelete | 删除文件回调，接收参数 `(item)` | function | 否 | - |
| apis.onUpload | 文件上传回调 | function | 否 | - |
| titleExtra | 标题额外内容，可以是 ReactNode 或函数 | ReactNode \| function | 否 | - |
| getPopupContainer | 指定下拉菜单挂载的父节点 | function | 否 | - |

**注意**：使用受控模式时需要同时提供 `list` 和 `setList` 属性。

#### list 数据结构

| 属性名 | 说明 | 类型 |
|--------|------|------|
| id | 文件唯一标识符 | string |
| ossId | OSS 文件标识符 | string |
| filename | 文件名称 | string |
| date | 上传日期（时间戳或 Date 对象） | Date \| string |
| userName | 上传人姓名 | string |

### FileUpload 组件

简化的文件上传组件，专注于文件上传和列表展示功能。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| list | 文件列表数据 | array | 否 | - |
| defaultList | 默认文件列表数据 | array | 否 | [] |
| setList | 更新文件列表的函数 | function | 否 | - |
| maxLength | 最大文件数量 | number | 否 | Number.MAX_VALUE |
| fileSize | 单个文件最大大小（MB） | number | 否 | 20 |
| accept | 允许上传的文件类型数组 | array\<string\> | 否 | `[".png", ".jpg", ".pdf", ".docx", ".doc"]` |
| getPermission | 权限控制函数，接收参数 `(type, itemData)`，返回 `false` 表示无权限 | function | 否 | `() => true` |
| apis | 操作 API 配置 | object | 否 | - |
| apis.onSave | 保存文件回调 | function | 否 | - |
| apis.onEdit | 编辑文件名称回调 | function | 否 | - |
| apis.onPreview | 预览文件回调 | function | 否 | - |
| apis.onDelete | 删除文件回调 | function | 否 | - |

### DragArea 组件

拖拽上传区域组件。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| children | 拖拽区域内显示的内容 | ReactNode | 否 | `<UploadTips />` |
| className | 自定义类名 | string | 否 | - |

### DragAreaOuter 组件

拖拽上传区域外层容器组件。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| title | 标题内容 | ReactNode | 否 | - |
| children | 子内容 | ReactNode | 是 | - |
| accept | 允许上传的文件类型数组 | array\<string\> | 否 | `[".png", ".jpg", ".pdf", ".docx", ".doc"]` |
| fileSize | 单个文件最大大小（MB） | number | 否 | 20 |
| maxLength | 最大文件数量 | number | 否 | Number.MAX_VALUE |
| onFileSelected | 文件选择回调，接收参数 `(fileList)` | function | 否 | - |
| defaultOpen | 默认是否打开拖拽区域 | boolean | 否 | false |
| className | 自定义类名 | string | 否 | - |

### DragButton 组件

拖拽上传按钮组件。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| children | 按钮文字内容 | ReactNode | 否 | - |

### UploadButton 组件

点击上传按钮组件。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| children | 按钮文字内容 | ReactNode | 否 | - |

### UploadTips 组件

上传提示组件，显示上传说明信息。

#### 组件属性

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------|--------|
| icon | 自定义图标 | ReactNode | 否 | - |
| title | 提示标题 | ReactNode | 否 | - |
| renderTips | 自定义提示内容渲染函数，接收参数 `(defaultTips, {fileSize, maxLength, accept})` | function | 否 | - |
