### 概述

Modal 是一个基于 Ant Design Modal 组件的增强型弹窗组件，提供了更丰富的功能和更简洁的API。支持多种弹窗形式，适用于需要弹窗交互的各种场景。

### 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以在当前页面正中打开一个浮层，承载相应的操作。

### 特点

该组件是antd Modal组件的再封装：

* 修改了footer部分的设置逻辑,能更加简单的定义footer区域的功能
* 添加了withDecorator可以更加方便的处理Modal外层的显示逻辑
* 扩展了用于方法调用的useModal的hooks，可以通过hooks获得一个Modal的调用方法，并且保证其和Modal组件式调用有相同的UI表现和行为
* 扩展了ModalButton组件，可以在点击该按钮时执行加载数据，并且Button的状态变为loading，在数据加载完成之后再弹出弹窗
* 扩展了TabsModal组件，它是一个Tabs和Modal组合起来的组件，对弹窗title做了特殊处理，更加符合UI交互逻辑

### 组件构成

Modal 组件家族包含以下组件：
- **Modal**: 基础弹窗组件
- **useModal**: Hook，用于命令式调用弹窗
- **TabsModal**: 带选项卡的弹窗组件
- **useTabsModal**: Hook，用于命令式调用选项卡弹窗
- **ModalButton**: 可加载数据的弹窗按钮
- **TabsModalButton**: 可加载数据的选项卡弹窗按钮