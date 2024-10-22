### *`InfoPage`* 何时使用

一般用在复杂的详情展示页面，`InfoPage` 提供了一个标准的展示信息的格式

### 特点

* 支持 `Content` 组件 `Descriptions` 组件的组合
* 支持 `Collapse` 组件组合
* `InfoPage.Part`、`InfoPage.Collapse` 需要放在 `InfoPage` 之下，`Content`、`Descriptions` 可以任意组合

### *`Content`* 何时使用

成组展示多个字段，常见于详情页的信息展示

### 特点

labelAlign 不为 auto 时会自动计算 label 的最小宽度使所有 label 的宽度等于最长的 label 宽度，使视觉上更加整齐有秩序感
