![npm version](https://img.shields.io/npm/v/@kne-components/components-core.svg?logo=react)
![Auto Assign](https://github.com/kne-union/components-core/actions/workflows/publish.yml/badge.svg)
![antd version](https://img.shields.io/badge/antd-5.x-blue?logo=antdesign)


提供了一个使用于tob业务场景的增强组件库，依赖了 antd


<!--START_SECTION:DOC_MD-->

| 组件 | 简介 |
|------|------|
| [ButtonGroup](docs/ButtonGroup.md) |  |
| [Common](docs/Common.md) | 为组件库提供通用的组件、方法、hooks ### 组件 1. **FetchButton** - Button触发加载数据，支持弹窗展示加载结果 2. **ScrollLoader** - 下拉滚动加载组件，配合 Fetch 实现分页加载… |
| [ConfirmButton](docs/ConfirmButton.md) | ConfirmButton 从 `@kne/button-group` 重新导出，提供带确认功能的按钮组件，支持 Popconfirm 与 Modal 两种确认模式，并包含… |
| [Content](docs/Content.md) | Content 从 `@kne/info-page` 重新导出，用于详情页中的多列内容展示，支持标签对齐、列数配置、数据格式化等能力。 本组件文档仅展示常用示例。完整概述、使用说明与 API 请前往 **InfoPage** 组件文档查看。 |
| [Descriptions](docs/Descriptions.md) | Descriptions 从 `@kne/info-page` 重新导出，用于详情页中的描述列表展示，适合以二维数组结构呈现分组字段信息。 本组件文档仅展示常用示例。完整概述、使用说明与 API 请前往 **InfoPage**… |
| [Drawer](docs/Drawer.md) | 屏幕边缘滑出的浮层面板，适用于展示详细信息、表单编辑、数据查看等场景。支持三种使用方式：受控组件、Hook 调用、按钮触发。 核心特性包括： - **灵活的打开方式**：支持受控模式、函数调用和按钮触发三种方式 -… |
| [Enum](docs/Enum.md) |  |
| [Features](docs/Features.md) | Features 是一个功能开关管理组件，用于在系统中通过条件控制功能的开启或关闭，实现系统功能的灵活配置。 通过全局配置的方式，Features… |
| [File](docs/File.md) | File 组件提供了一套完整的文件管理解决方案，包括文件展示、OSS 文件 ID 转换、文件列表展示、文件下载等功能。 该组件集成了文件上传、预览、编辑、删除等常见操作，支持通过 OSS ID… |
| [FileList](docs/FileList.md) | FileList 组件提供了一套完整的文件管理解决方案，集成了文件列表展示、文件预览、文件上传等功能。… |
| [FilePreview](docs/FilePreview.md) | FilePreview 是一个功能全面的文件预览组件库，支持多种常见文件格式的在线预览。该组件基于 @kne/react-file 封装，提供了统一的 API 接口，可根据文件类型自动选择合适的预览方式，极大简化了文件预览功能的集成。… |
| [Filter](docs/Filter.md) | Filter 是一个功能强大的筛选组件库，用于构建灵活的筛选条件界面。该组件提供了多种预置的筛选字段类型，支持自定义筛选项，并提供了完整的筛选值管理和展示功能。… |
| [FlexBox](docs/FlexBox.md) |  |
| [FormInfo](docs/FormInfo.md) | 功能强大的表单组件，提供完整的数据管理、校验和样式解决方案 FormInfo 是一个全功能的表单解决方案，集成了数据录入、校验规则管理、样式布局等功能，适用于各种复杂场景的表单需求。 ### 核心特性 **分层校验规则管理** -… |
| [Global](docs/Global.md) | Global 是 components-core 组件库的全局配置组件，负责为整个应用提供统一的上下文环境、样式主题和全局配置。它集成了 Antd ConfigProvider、国际化支持、字体加载、主题定制等功能，是使用… |
| [HelperGuide](docs/HelperGuide.md) | HelperGuide 是一个轻量级的帮助文档提示组件，用于在页面上显示帮助说明和可选的帮助链接。它采用图标+文字的形式，样式简洁，适用于在表单、配置页面等场景中为用户提供操作指引或功能说明。 **核心特性** -… |
| [HistoryStore](docs/HistoryStore.md) | HistoryStore 是一个历史记录管理组件，用于保存和展示用户的操作历史记录（如搜索记录、选择记录等）。它利用 localStorage 持久化存储数据，在用户再次访问时可以快速选择历史记录，提升用户体验。 **核心特性** -… |
| [Icon](docs/Icon.md) | 可以显示一个图标，图标必须在字体文件中被定义过 |
| [Image](docs/Image.md) | Image 组件是一个增强的图片显示组件，支持两种加载方式： 1. 通过 src 属性直接加载图片URL 2. 通过 id 属性从 OSS 服务器加载图片 组件特性： - 自动加载状态显示和错误处理 - 支持 Avatar… |
| [InfoPage](docs/InfoPage.md) |  |
| [Layout](docs/Layout.md) | Layout 是一个完整的页面布局框架，为登录后的系统页面提供统一的布局结构和样式规范。它将页面划分为多个区域，包括导航区、内容区、左菜单区、右操作区、页头区、页头信息区、页面标题区等，通过灵活的配置可以组合出不同布局风格的页面。… |
| [Menu](docs/Menu.md) | Menu 是一个功能丰富的菜单导航组件，支持多级菜单、远程数据加载、权限控制和路径匹配。适用于各种侧边栏导航、顶部导航和下拉菜单场景。 |
| [Modal](docs/Modal.md) | ### 概述 Modal 是一个基于 Ant Design Modal 组件的增强型弹窗组件，提供了更丰富的功能和更简洁的API。支持多种弹窗形式，适用于需要弹窗交互的各种场景。 ### 何时使用… |
| [Navigation](docs/Navigation.md) | ### 概述 Navigation 是一个基于 Ant Design Menu 组件的顶部导航栏组件，支持权限控制、响应式布局和自定义配置。适用于需要顶部导航的各种应用场景。 ### 何时使用 系统的顶部导航，一级导航项偏左靠近 logo… |
| [Permissions](docs/Permissions.md) | ### 概述 Permissions 是一个权限控制组件，用于根据用户权限控制页面内容的显示。支持多种权限控制方式和展示形式，适用于各种需要权限控制的场景。 ### 何时使用… |
| [StateBar](docs/StateBar.md) | ### 概述 StateBar 是一个基于 Ant Design Tabs 组件的状态栏组件，支持多种展示类型（tab、radio、step），适用于需要状态切换和流程展示的场景。 ### 何时使用… |
| [StateTag](docs/StateTag.md) | ### 概述 StateTag 是一个状态标签组件，用于展示不同状态的数据。支持多种预设类型和自定义样式，适用于列表、详情页等场景的状态展示。 ### 何时使用 当需要展示数据的状态时使用，例如： - 列表页表格中的状态列 -… |
| [Table](docs/Table.md) | Table 组件是一个功能强大的数据表格组件，基于 Ant Design Table 二次封装，提供了丰富的列类型、列配置、排序、分组表头、操作列等高级功能。 组件支持两种使用方式： - **Table**:… |
| [TablePage](docs/TablePage.md) |  |
| [Tooltip](docs/Tooltip.md) | Tooltip 组件是一个功能强大的文字提示气泡框，基于 Ant Design Tooltip 二次封装，提供了丰富的内容展示能力。 组件支持三种使用方式： - **Tooltip**:… |

<!--END_SECTION:DOC_MD-->
