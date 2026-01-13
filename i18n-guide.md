# 组件国际化指南

## 概述

本指南用于将组件完成国际化。

## 一、创建的文件

1. **`[组件目录]/withLocale.js`** - HOC 包裹组件，提供国际化上下文
2. **`[组件目录]/locale/zh-CN.js`** - 中文语言包
3. **`[组件目录]/locale/en-US.js`** - 英文语言包

## 二、需要修改的文件类型

### 主组件文件
- 添加 `useIntl` Hook
- 用 `withLocale` 包裹导出

### FormInner 表单组件
- 添加 `useIntl` Hook
- 用 `withLocale` 包裹导出
- 表单 label 国际化

### getColumns 等工具函数
- 通过参数接收 `formatMessage`
- 移除内部的 `useIntl` 和 `withLocale` 引入

### Action 操作组件
- 添加 `useIntl` Hook
- 用 `withLocale` 包裹导出

## 三、国际化的关键模式

### 1. useIntl Hook 使用
```javascript
import { useIntl } from '@kne/react-intl';

const Component = () => {
  const { formatMessage } = useIntl();
  return <div>{formatMessage({ id: 'Key' })}</div>;
};
```

### 2. withLocale 包裹普通组件
```javascript
import withLocale from './withLocale';
import { useIntl } from '@kne/react-intl';

const Component = withLocale(({ ...props }) => {
  const { formatMessage } = useIntl();
  // 将所有中文替换为 formatMessage({ id: 'Key' })
  return <div>{formatMessage({ id: 'Key' })}</div>;
});

export default Component;
```

### 3. createWithRemoteLoader 组件（推荐格式）
```javascript
import withLocale from '../withLocale';
import { useIntl } from '@kne/react-intl';

const Component = createWithRemoteLoader({...})(withLocale(({ remoteModules, ...props }) => {
  const { formatMessage } = useIntl();
  // ...
}));

export default Component;
```

**注意：** 对于 `createWithRemoteLoader` 创建的组件，必须使用 `createWithRemoteLoader({...})(withLocale(...))` 这种链式调用格式，不要先定义中间变量再用 withLocale 包裹。

### 4. getColumns 等工具函数（formatMessage 从父组件传入）
```javascript
const getColumns = ({formatMessage}) => {
  return [
    {
      name: 'name',
      title: formatMessage({ id: 'Key' })
    }
  ];
};

// 父组件中使用
const columns = getColumns({formatMessage});
```

### 5. 带参数的翻译
```javascript
formatMessage({ id: 'KeyWithParam' }, { name: value })
```

## 四、注意事项

1. **所有使用 `useIntl` 的组件必须用 `withLocale` 包裹**
2. **`getColumns` 等工具函数通过参数接收 `formatMessage`，不使用 `useIntl`**
3. **语言包中避免重复的 key**，命名规则：`模块名 + 功能名`，如 `UserName`、`UserRole`
4. **`createWithRemoteLoader` 创建的组件内部使用 useIntl 时，外层需要重命名并用 withLocale 包裹**
5. 注意检查 `withLocale`文件的引用地址

---

# 组件国际化操作步骤

## 步骤

### 1. 创建国际化文件
- 创建 `[组件目录]/withLocale.js`（参考已有组件的 withLocale.js）
- 创建 `[组件目录]/locale/zh-CN.js` 中文语言包
- 创建 `[组件目录]/locale/en-US.js` 英文语言包

### 2. 修改组件文件

#### 主组件修改模式：
```javascript
import withLocale from './withLocale';
import { useIntl } from '@kne/react-intl';

const Component = withLocale(({ ...props }) => {
  const { formatMessage } = useIntl();
  // 将所有中文替换为 formatMessage({ id: 'Key' })
  return (
    // ...
  );
});

export default Component;
```

#### FormInner 修改模式：
```javascript
import withLocale from '../withLocale';
import { useIntl } from '@kne/react-intl';

const FormInner = createWithRemoteLoader({...})(withLocale(({ remoteModules, ...props }) => {
  const { formatMessage } = useIntl();
  // label={formatMessage({ id: 'Key' })}
  // ...
}));

export default FormInner;
```

#### Action 操作组件修改模式：
```javascript
import withLocale from '../withLocale';
import { useIntl } from '@kne/react-intl';

const ActionComponent = createWithRemoteLoader({...})(withLocale(({ remoteModules, ...props }) => {
  const { formatMessage } = useIntl();
  // ...
}));

export default ActionComponent;
```

#### getColumns 修改模式：
```javascript
// 移除 useIntl 和 withLocale 引入
const getColumns = ({formatMessage}) => {
  return [
    {
      name: 'xxx',
      title: formatMessage({ id: 'Key' })
    }
  ];
};
```

父组件中调用：`getColumns({formatMessage})`

### 3. 语言包 key 命名规范
- 避免重复，使用 `模块名+功能名` 格式，如 `UserName`、`UserRole`、`SettingType`
- 中文和英文语言包保持完全一致的 key 结构

### 4. 检查要点
- [ ] 所有使用 `useIntl` 的组件都用 `withLocale` 包裹
- [ ] `getColumns` 等工具函数通过参数接收 `formatMessage`
- [ ] 语言包中无重复 key
- [ ] `createWithRemoteLoader` 组件必须使用 `createWithRemoteLoader({...})(withLocale(...))` 链式调用格式，**禁止**先定义中间变量再包裹

### 5. 最后检查
运行命令找到所有使用 useIntl 的文件，确保都已正确包裹：
```bash
grep -r "useIntl" [组件目录] --include="*.js" -l
```
