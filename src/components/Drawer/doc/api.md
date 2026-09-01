# Drawer API

基于 `@kne/react-modal`。

## 导出

| 名称 | 说明 |
|------|------|
| `Drawer` | 声明式侧滑 |
| `useDrawer` | 命令式打开（需先挂载 `DrawerContextHolder`） |
| `DrawerContextHolder` | 挂在 antd `App` 内，承载命令式 Drawer |
| `createDrawerRender` | 对接 `renderModal` 宿主（FormDrawer） |

## Global

`Global` 已内置 `<DrawerContextHolder />`，业务侧一般无需再包。

已移除：`AppDrawer`、`DrawerButton`。
