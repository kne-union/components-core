为组件库提供通用的组件、方法、hooks

### 组件

1. **FetchButton** - Button触发加载数据，支持弹窗展示加载结果
2. **ScrollLoader** - 下拉滚动加载组件，配合 Fetch 实现分页加载
3. **SearchInput** - 提供防抖的查询输入框
4. **SuperSelectCascaderField** - 级联选择组件，基于 @kne/super-select 的 SelectCascader，支持 api 远程加载
5. **TypeDateRangePickerField** - 类型日期范围选择器，支持按日、周、月选择
6. **SuperSelectField** - 新版高级选择组件，提供更强的自定义能力
7. **SuperSelectUserField** - 用户选择组件，展示用户头像和描述
8. **SuperSelectTableListField** - 表格列表选择组件
9. **SuperSelectTreeField** - 树形选择组件

### 方法

1. **changeMoneyToChinese** - 将金额转化为大写的人民币金额
2. **getPopupContainer** - 获取弹窗容器
3. **getContainerBody** - 获取 body 容器
4. **accept** - 文件类型验证
5. **createDeferred** - 创建延迟对象
6. **isNotEmpty** - 非空判断
7. **pxToNumber** - px 转数字
8. **numberToPx** - 数字转 px
9. **validateIDCard** - 身份证号验证

### HOC (高阶组件)

1. **withInputFile** - 文件上传高阶组件
2. **useFileUpload** - 文件上传 Hook
3. **InputFileButton** - 文件上传按钮组件
4. **InputFileLink** - 文件上传链接组件
5. **InputFileText** - 文件上传文本组件
6. **withOSSFile** - OSS 文件上传高阶组件

### Hooks

1. **useResize** - 监听元素尺寸变化
2. **usePreset** - 获取预设配置

### 其他工具

1. **createTreeUtils** - 创建树形数据工具函数
2. **getScrollEl** - 获取滚动元素
