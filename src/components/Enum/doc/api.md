## Enum 组件 API

### Enum（默认导出）

用于获取单个或多个枚举值的展示内容。

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| moduleName | 枚举模块名称，对应预设中配置的枚举名称 | string \| string[] | - |
| name | 枚举值，当提供时获取单个枚举项；不提供时获取整个枚举列表 | string \| number | - |
| format | 格式化方式：'default'返回描述文本，'origin'返回原始对象，'option'返回{label, value}格式 | 'default' \| 'origin' \| 'option' | 'default' |
| force | 是否强制刷新缓存，跳过缓存直接请求 | boolean | false |
| children | 子元素或渲染函数。函数接收(data, fetchApi)参数 | ReactNode \| Function | - |
| placeholder | 数据加载中时的占位内容 | ReactNode | '--' |
| error | 加载失败时的展示内容 | ReactNode \| Function | - |
| loading | 自定义加载中状态的展示 | ReactNode | - |

### EnumResource

用于获取完整的枚举列表资源。

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| moduleName | 枚举模块名称，支持数组以同时获取多个枚举 | string \| string[] | - |
| format | 格式化方式 | 'origin' \| 'option' \| 'default' | 'origin' |
| children | 渲染函数，接收枚举列表作为参数 | Function | - |
| placeholder | 数据加载中时的占位内容 | ReactNode | '--' |
| error | 加载失败时的展示内容 | ReactNode \| Function | - |
| loading | 自定义加载中状态的展示 | ReactNode | - |

### 枚举配置

枚举数据通过 `preset` 函数或 `PureGlobal/Global` 组件的 `preset.enums` 配置：

```javascript
// 全局配置
preset({
  base: {
    gender: () => [
      { value: 'M', description: '男' },
      { value: 'F', description: '女' }
    ]
  }
});

// 或通过 Global 组件配置
<PureGlobal preset={{
  enums: {
    status: async ({ language }) => {
      // 支持异步加载
      return [
        { value: '1', description: '启用' },
        { value: '0', description: '禁用' }
      ];
    }
  }
}}>
```

### 枚举项数据结构

| 字段名 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| value | 枚举值 | string \| number | 是 |
| description | 枚举描述文本 | string | 是 |
| translation | 多语言翻译对象 | object | 否 |
