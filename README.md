![npm version](https://img.shields.io/npm/v/@kne-components/components-core.svg?logo=react)
![Auto Assign](https://github.com/kne-union/components-core/actions/workflows/publish.yml/badge.svg)
![antd version](https://img.shields.io/badge/antd-5.x-blue?logo=antdesign)


提供了一个使用于tob业务场景的增强组件库，依赖了 antd


<!--START_SECTION:DOC_MD-->

# ButtonGroup

### 概述

用于根据当前容器空间自动计算多余按钮收起

### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _ButtonGroup(@components/ButtonGroup),antd(antd)

```jsx
const {default: ButtonGroup} = _ButtonGroup;
const {Button, Space} = antd;
const {useState} = React;
const BaseExample = () => {
    const [width, setWidth] = useState(200);
    return (
        <Space>
            <div style={{width: `${width}px`}}>
                <ButtonGroup
                    list={[
                        {
                            type: "primary",
                            children: "操作1",
                        },
                        {
                            children: "操作2",
                        },
                        {
                            children: "操作3",
                        },
                        {
                            children: "操作3",
                            message: "确定要执行操作吗？",
                            disabled: true,
                        },
                    ]}
                />
            </div>
            <Space>
                <Button
                    onClick={() => {
                        setWidth((width) => {
                            return width + 20;
                        });
                    }}
                >
                    增加容器宽度
                </Button>
                <Button
                    onClick={() => {
                        setWidth((width) => {
                            return width - 20;
                        });
                    }}
                >
                    减少容器宽度
                </Button>
            </Space>
        </Space>
    );
};

render(<BaseExample/>);

```

- 紧凑模式
- 紧凑模式
- _ButtonGroup(@components/ButtonGroup),antd(antd)

```jsx
const {default: ButtonGroup} = _ButtonGroup;
const {Button, Space} = antd;
const {useState} = React;
const BaseExample = () => {
    const [width, setWidth] = useState(200);
    return (
        <Space>
            <div style={{width: `${width}px`}}>
                <ButtonGroup
                    compact
                    list={[
                        {
                            type: "primary",
                            children: "操作1",
                        },
                        {
                            children: "操作2",
                        },
                        {
                            children: "操作3",
                        },
                        {
                            children: "操作3",
                            message: "确定要执行操作吗？",
                        },
                    ]}
                />
            </div>
            <Space>
                <Button
                    onClick={() => {
                        setWidth((width) => {
                            return width + 20;
                        });
                    }}
                >
                    增加容器宽度
                </Button>
                <Button
                    onClick={() => {
                        setWidth((width) => {
                            return width - 20;
                        });
                    }}
                >
                    减少容器宽度
                </Button>
            </Space>
        </Space>
    );
};

render(<BaseExample/>);

```

- 渲染函数
- 渲染函数
- _ButtonGroup(@components/ButtonGroup),_ConfirmButton(@components/ConfirmButton),antd(antd)

```jsx
const {default: ButtonGroup} = _ButtonGroup;
const {default: ConfirmButton} = _ConfirmButton;
const {Button, Space} = antd;
const {useState, useEffect} = React;

const LoadChildren = ({children}) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    if (loading) {
        return null;
    }
    return children({
        onClick: () => {
            console.log("加载完成");
        },
    });
};
const BaseExample = () => {
    const [width, setWidth] = useState(200);
    return (
        <Space>
            <div style={{width: `${width}px`}}>
                <ButtonGroup
                    list={[
                        (props) => {
                            return (
                                <Button {...props} type="primary">
                                    操作1
                                </Button>
                            );
                        },
                        (props) => {
                            return <Button {...props}>操作2</Button>;
                        },
                        (props) => {
                            return <Button {...props}>操作3</Button>;
                        },
                        (props) => {
                            return (
                                <LoadChildren key={props.key}>
                                    {({onClick}) => {
                                        return (
                                            <ConfirmButton
                                                {...props}
                                                isModal={props.isDropdown}
                                                message="确定要执行操作吗？"
                                                onClick={onClick}
                                            >
                                                操作4
                                            </ConfirmButton>
                                        );
                                    }}
                                </LoadChildren>
                            );
                        },
                    ]}
                />
            </div>
            <Space>
                <Button
                    onClick={() => {
                        setWidth((width) => {
                            return width + 20;
                        });
                    }}
                >
                    增加容器宽度
                </Button>
                <Button
                    onClick={() => {
                        setWidth((width) => {
                            return width - 20;
                        });
                    }}
                >
                    减少容器宽度
                </Button>
            </Space>
        </Space>
    );
};

render(<BaseExample/>);

```

### API

| 属性名         | 说明                             | 类型                              | 默认值                                                    |
|-------------|--------------------------------|---------------------------------|--------------------------------------------------------|
| list        | button按钮属性的数组                  | array                           | []                                                     |
| more        | 更多按钮占位                         | jsx                             | <Button>更多<Icon type="icon-arrow-thin-down"/></Button> |
| compact     | 是否为紧凑模式                        | boolean                         | false                                                  |
| size        | 当compact为false时为按钮间隔大小，否则为按钮大小 | 'small','middle','large',number | 8                                                      |
| split,align | 参考antd Space                   | -                               | -                                                      |

---

# ConfirmButton

### 概述

### 何时使用

执行操作前确认后再执行

### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _ConfirmButton(@components/ConfirmButton),antd(antd),global(@components/Global)

```jsx
const {default: ConfirmButton, ConfirmLink} = _ConfirmButton;
const {Space} = antd;
const {PureGlobal} = global;
const BaseExample = () => {
    return (
        <Space direction={"vertical"}>
            <Space>
                <ConfirmButton
                    isDelete={false}
                    message="确定要删除吗"
                    onClick={() => {
                        console.log("执行删除");
                    }}
                >
                    非警告-气泡-正文
                </ConfirmButton>
                <ConfirmButton
                    onClick={() => {
                        console.log("执行删除");
                    }}
                >
                    警告-气泡-正文
                </ConfirmButton>
            </Space>
            <Space>
                <ConfirmButton
                    title="确定要删除吗？"
                    isDelete={false}
                    message="确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除"
                    onClick={() => {
                        console.log("执行删除");
                    }}
                >
                    非警告-气泡-标题正文
                </ConfirmButton>
                <ConfirmButton
                    title="确定要删除吗？"
                    message="确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除"
                    onClick={() => {
                        console.log("执行删除");
                    }}
                >
                    警告-气泡-标题正文
                </ConfirmButton>
            </Space>
            <Space>
                <ConfirmButton
                    isModal
                    isDelete={false}
                    message="确定提交XX吗？"
                    onClick={() => {
                        console.log("执行删除");
                    }}
                >
                    非警告-modal-正文
                </ConfirmButton>
                <ConfirmButton
                    isModal
                    onClick={() => {
                        console.log("执行删除");
                    }}
                >
                    警告-modal-正文
                </ConfirmButton>
            </Space>
            <Space>
                <ConfirmButton
                    isModal
                    title="确定提交XX吗？"
                    isDelete={false}
                    message="这里显示详情说明这里显示详情说明这里显示详情说明这里显示详情说明这里显示详情说明"
                    onClick={() => {
                        console.log("执行删除");
                    }}
                >
                    非警告-modal-标题正文
                </ConfirmButton>
                <ConfirmButton
                    isModal
                    title="确定要删除吗？"
                    message="确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除"
                    onClick={() => {
                        console.log("执行删除");
                    }}
                >
                    有title的Modal确认删除
                </ConfirmButton>
            </Space>
            <ConfirmLink
                onClick={() => {
                    console.log("执行删除");
                }}
            >
                Link-警告-气泡-正文
            </ConfirmLink>
        </Space>
    );
};

render(
    <PureGlobal>
        <BaseExample/>
    </PureGlobal>
);

```

### API

| 属性名          | 说明                                  | 类型       | 默认值     |
|--------------|-------------------------------------|----------|---------|
| message      | 删除提示                                | jsx      | 确定要删除吗？ |
| title        | 删除提示标题                              | jsx      | -       |
| isDelete     | 是否为删除操作                             | boolean  | true    |
| onClick      | 点击确认后执行的事件                          | function | -       |
| onCancel     | 点击取消后执行的事件                          | function | -       |
| disabled     | 按钮是否禁用                              | boolean  | -       |
| showCancel   | 是否显示取消按钮                            | boolean  | -       |
| cancelText   | 取消按钮文案                              | string   | 取消      |
| okText       | 确认按钮文案                              | string   | 确认      |
| isModal      | 是否以弹窗方式展示，默认为Popconfirm             | boolean  | false   |
| placement    | 当isModal为false时生效，指定Popconfirm的弹出方向 | string   | -       |
| getContainer | 指定Popconfirm或Modal弹出位置，一般不需要指定      | function | -       |

### ConfirmLink

另外的一种按钮形式参数同ConfirmButton

### withConfirm

高阶组件可以自定义按钮

---

# Common

### 概述

为组件库提供通用的组件、方法、hooks

### 组件

1. FetchButton Button触发加载数据
2. ScrollLoader 下拉滚动加载组件
3. SearchInput 提供防抖的查询输入框
4. SimpleBarBox

### 方法

1. changeMoneyToChinese 将金额转化为大写的人民币金额
2. getPopupContainer
3. getScrollEl
4. getContainerBody

### hooks

1. withOSSFile

### 示例

#### 示例样式

```scss
.scroll-list {
  max-height: 300px;
}
```

#### 示例代码

- FetchButton
- 这里填写示例说明
- _Common(@components/Common)

```jsx
const Common = _Common;

const {FetchButton} = Common;

const BaseExample = () => {
    return (
        <FetchButton
            api={{
                loader: () => {
                    return [
                        {label: "1", content: "11"},
                        {label: "2", content: "22"},
                    ];
                },
            }}
            modalProps={({data}) => {
                console.log(data);
                alert(JSON.stringify(data));
                return {
                    children: (
                        <div>
                            <div>我是一个弹窗</div>
                            <div>{data[0].label}</div>
                            <div>{data[0].content}</div>
                            <div>{data[1].label}</div>
                            <div>{data[1].content}</div>
                        </div>
                    ),
                };
            }}
            modalFunc={() => {
            }}
        >
            FetchButton
        </FetchButton>
    );
};

render(<BaseExample/>);

```

- Enum
- 这里填写示例说明
- _Common(@components/Common),_antd(antd)

```jsx
const Common = _Common;
const {Space} = _antd;

const {AddressEnum, FunctionEnum, IndustryEnum} = Common;

const BaseExample = () => {
    return (
        <Space direction={"vertical"}>
            <AddressEnum name={"010"}/>
            <FunctionEnum name={"010"}/>
            <IndustryEnum name={"010"}/>
        </Space>
    );
};

render(<BaseExample/>);

```

- ScrollLoader
- 这里填写示例说明
- _Common(@components/Common),_reactFetch(@kne/react-fetch),lodash(lodash)

```jsx
const {get, merge, range} = lodash;
const Common = _Common;
const {default: Fetch} = _reactFetch;

const {ScrollLoader} = Common;

const BaseExample = () => {
    console.log(Fetch, _reactFetch);
    return (
        <Fetch
            loader={({data}) => {
                const params = Object.assign(
                    {
                        perPage: 20,
                        currentPage: 1,
                    },
                    data
                );
                return new Promise((resolve) => {
                    const start = (params.currentPage - 1) * params.perPage;
                    setTimeout(() => {
                        resolve({
                            totalCount: 100,
                            pageData: range(start, start + params.perPage).map((key) => {
                                return {
                                    label: `第${key + 1}项`,
                                    value: key + 1,
                                };
                            }),
                        });
                    }, 500);
                });
            }}
            render={(fetchApi) => {
                const pagination = {
                    paramsType: "data",
                    current: "currentPage",
                    pageSize: "perPage",
                    defaultPageSize: 20,
                };
                const current = get(
                        fetchApi.requestParams,
                        [pagination.paramsType, pagination.current],
                        1
                    ),
                    pageSize =
                        get(fetchApi.requestParams, [
                            pagination.paramsType,
                            pagination.pageSize,
                        ]) || pagination.defaultPageSize;

                const formatData = {
                    list: fetchApi.data.pageData,
                    total: fetchApi.data.totalCount,
                };
                return (
                    <ScrollLoader
                        completeTips=""
                        className="scroll-list"
                        isLoading={!fetchApi.isComplete}
                        noMore={!formatData.total || current * pageSize >= formatData.total}
                        onLoader={async () => {
                            await fetchApi.loadMore(
                                merge({
                                    data: {
                                        [pagination.pageSize]: pageSize,
                                        [pagination.current]: current + 1,
                                    },
                                }),
                                (data, newData) => {
                                    return Object.assign({}, newData, {
                                        pageData: data.pageData.concat(newData.pageData),
                                    });
                                }
                            );
                        }}
                    >
                        {formatData.list.map((item) => {
                            return <div>{item.label}</div>;
                        })}
                    </ScrollLoader>
                );
            }}
        />
    );
};

render(<BaseExample/>);

```

- SearchInput
- 搜索框
- _Common(@components/Common)

```jsx
const Common = _Common;

const {SearchInput} = Common;
const {useState} = React;

const BaseExample = () => {
    const [value, setValue] = useState("");
    return (
        <SearchInput
            value={value}
            onSearch={(value) => {
                setValue(value);
                console.log(value);
            }}
        />
    );
};

render(<BaseExample/>);

```

- AdvancedSelect
- 高级选择
- _Common(@components/Common),antd(antd)

```jsx
const {UserField} = _Common;
const {Space} = antd;

const BaseExample = () => {
    return (
        <Space>
            <UserField
                defaultValue={[1]}
                getSearchProps={(text) => {
                    return {
                        data: {keyword: text},
                    };
                }}
                allowSelectAll
                showSelectedCount
                countUnit="人"
                allLabel="所有人"
                showSelectedTag={false}
                api={{
                    loader: () => {
                        return {
                            pageData: [
                                {
                                    label: "用户一",
                                    value: 1,
                                    description: "我是用户描述",
                                },
                                {
                                    label: "用户二",
                                    value: 2,
                                    description: "我是用户描述",
                                },
                                {
                                    label: "用户三",
                                    value: 3,
                                    description: "我是用户描述",
                                },
                            ],
                        };
                    },
                }}
                onChange={(value) => {
                    console.log(value);
                }}
            />
        </Space>
    );
};

render(<BaseExample/>);

```

### API

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|

---

# Content

### 概述

### 何时使用

成组展示多个字段，常见于详情页的信息展示

### 特点

labelAlign不为auto时会自动计算label的最小宽度使所有label的宽度等于最长的label宽度使视觉上更加整齐有秩序感

### 示例

#### 示例代码

- 基本示例
- 展示了一个基本内容
- _Content(@components/Content)

```jsx
const {default: Content} = _Content;
const BaseExample = () => {
    return <Content list={[
        {label: '标题', content: '内容'},
        {label: '标题标题', content: '内容内容'},
        {label: '标题标', content: '内容内容内容内容内容内容内容内容内容内容'},
        {
            label: '标题标题标题',
            content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
        }
    ]}/>;
};

render(<BaseExample/>);

```

- labelAlign auto
- 展示了设置labelAlign为auto的情况
- _Content(@components/Content)

```jsx
const {default: Content} = _Content;
const BaseExample = () => {
    return <Content labelAlign="auto" list={[
        {label: '标题', content: '内容'},
        {label: '标题标题', content: '内容内容'},
        {label: '标题标', content: '内容内容内容内容内容内容内容内容内容内容'},
        {
            label: '标题标题标题',
            content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
        }
    ]}/>;
};

render(<BaseExample/>);

```

- 多列
- 展示了两列的情况
- _Content(@components/Content)

```jsx
const {default: Content} = _Content;
const BaseExample = () => {
    return <Content col={2} labelAlign="auto" list={[
        {label: '标题', content: '内容'},
        {label: '标题标题', content: '内容内容'},
        {label: '标题标', content: '内容内容内容内容内容内容内容内容内容内容'},
        {
            label: '标题标题标题',
            content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
        }
    ]}/>;
};

render(<BaseExample/>);

```

### API

| 属性名        | 说明                                                                                | 类型     | 默认值  |
|------------|-----------------------------------------------------------------------------------|--------|------|
| list       | 内容，为一个数组，数组里面每一个值{label,content}                                                  | array  | []   |
| labelAlign | label的对齐方式可以传入的值 left,right,center,auto,为auto时label不计算最小宽度                        | string | left |
| col        | 显示列数                                                                              | number | 1    |
| gutter     | 栅格间隔，可以写成像素值或支持响应式的对象写法来设置水平间隔 { xs: 8, sm: 16, md: 24}。或者使用数组形式同时设置 [水平间距, 垂直间距] | number | 0    |

---

# Descriptions

### 概述

### 何时使用

常见于详情页的信息展示

### 特点

* 最多支持两列数据展示，多余的列将不展示
* 支持Features控制列内容开启和关闭

### 示例

#### 示例代码

- 展示一个信息详情
- 展示一个信息详情
- _Descriptions(@components/Descriptions)

```jsx
const {default: Descriptions} = _Descriptions;
const BaseExample = () => {
    return (
        <Descriptions
            dataSource={[
                [
                    {label: "客户名称", content: "腾讯"},
                    {
                        label: "发票抬头",
                        content: "腾讯科技公司",
                    },
                ],
                [
                    {label: "发票类型", content: "增值税专用发票"},
                    {
                        label: "发票开具日期",
                        content: "2022-08-15",
                    },
                ],
                [{label: "退票金额", content: "22000.00元"}],
                [
                    {
                        label: "发票号",
                        content: (
                            <div>
                                <div>00384895992774</div>
                                <div>00384895992774</div>
                                <div>00384895992774</div>
                                <div>00384895992774</div>
                            </div>
                        ),
                    },
                ],
                [
                    {label: "是否需要重开发票", content: "否"},
                    {
                        label: "是否涉及金融变动",
                        content: "否",
                    },
                ],
                [
                    {label: "是否造成实质损失", content: "否"},
                    {label: "责任归属", content: "客户原因"},
                ],
                [
                    {
                        label: "退票原因",
                        content: "退票原因的描述退票原因的描述退票原因的描",
                    },
                ],
                [{label: "附件", content: "附件名称"}],
                [
                    {label: "操作时间", content: "2022-08-01 16:32"},
                    {
                        label: "操作人",
                        content: "西西歪",
                    },
                ],
                [
                    {
                        label: "超长内容",
                        content:
                            "超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容",
                    },
                    {
                        label: "超长英文",
                        content:
                            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    },
                ],
            ]}
        />
    );
};

render(<BaseExample/>);

```

### API

| 属性名                       | 说明                                                                                 | 类型                                         | 默认值  |
|---------------------------|------------------------------------------------------------------------------------|--------------------------------------------|------|
| dataSource                | 详情数据源，内部每个数组为一行数据，每行数据中每个对象为一列数据，每行最多包含2列内容，多余的会被丢弃                                | array[[{display,label,content,featureId}]] | -    |
| dataSource[[{display}]]   | 数据是否展示,当为function时可以接收到(item,dataSource)参数，item为当前项配置，dataSource为整个组件的dataSource配置 | boolean,function                           | true |
| dataSource[[{label}]]     | 数据展示的label                                                                         | jsx                                        | -    |
| dataSource[[{content}]]   | 数据展示的内容                                                                            | jsx                                        | -    |
| dataSource[[{featureId}]] | Features控制的id，参考Features组件的id参数                                                    | string                                     | -    |

---

# Drawer

### 概述

屏幕边缘滑出的浮层面板

### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Drawer(@components/Drawer),global(@components/Global),_Content(@components/Content),antd(antd),lodash(lodash)

```jsx
const {default: Drawer, useDrawer, DrawerButton} = _Drawer;
const {Button, Space} = antd;
const {range} = lodash;
const {useRef, useState} = React;
const {PureGlobal} = global;
const {default: Content} = _Content;

const api = {
    loader: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        label: "内容1",
                        content:
                            "内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1",
                    },
                    {
                        label: "内容2",
                        content:
                            "内容2内容2内内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2容2内容2内容2内容2内容2内容2",
                    },
                    {label: "内容1", content: "内容1内容1内容1内容1内容1内容1内容1"},
                    {
                        label: "内容2",
                        content: "内容2内容2内容2内容2内容2内容2内容2内容2",
                    },
                    {label: "内容1", content: "内容1内容1内容1内容1内容1内容1内容1"},
                    {
                        label: "内容2",
                        content: "内容2内容2内容2内容2内容2内容2内容2内容2",
                    },
                    {label: "内容1", content: "内容1内容1内容1内容1内容1内容1内容1"},
                    {
                        label: "内容2",
                        content: "内容2内容2内容2内容2内容2内容2内容2内容2",
                    },
                    {label: "内容1", content: "内容1内容1内容1内容1内容1内容1内容1"},
                    {
                        label: "内容2",
                        content: "内容2内容2内容2内容2内容2内容2内容2内容2",
                    },
                    {label: "内容1", content: "内容1内容1内容1内容1内容1内容1内容1"},
                    {
                        label: "内容2",
                        content: "内容2内容2内容2内容2内容2内容2内容2内容2",
                    },
                ]);
            }, 1000);
        });
    },
};

const BaseExample = () => {
    const drawer = useDrawer();
    const [open, setOpen] = useState(false);
    return (
        <Space>
            <Button
                onClick={() => {
                    setOpen(true);
                }}
            >
                open 组件打开
            </Button>
            <Button
                onClick={() => {
                    drawer({
                        title: "标题",
                        children: "打开了一个抽屉",
                    });
                }}
            >
                hook 打开
            </Button>
            <DrawerButton
                api={api}
                modalProps={({data}) => {
                    return {
                        title: "加载数据的弹窗",
                        children: <Content list={data} col={1}/>,
                    };
                }}
            >
                按钮点击加载数据
            </DrawerButton>
            <Drawer title="Basic Drawer" onClose={() => setOpen(false)} open={open}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </Space>
    );
};

render(
    <PureGlobal>
        <BaseExample/>
    </PureGlobal>
);

```

### API

| 属性名           | 说明                                                                                                                                      | 类型           | 默认值   |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------|--------------|-------|
| footer        | 弹窗的footer，当其被显式设置成null且footerButtons没有设置过时弹窗不显示footer。当它类型为function时可以得到close方法和withDecorator设置的props                                   | jsx,function | -     |
| footerButtons | 弹窗footer的按钮区，默认为确认和取消按钮，默认按钮分别响应onConfirm和onCancel方法，如果自定义设置footerButtons则需要自行传入onClick参数，onConfirm和onCancel方法将不生效                      | array        | -     |
| onClose       | 弹窗关闭时调用，弹窗受控时由该方法将外部open状态修改                                                                                                            | function     | -     |
| onConfirm     | 当footerButtons未自定义设置时点击确认按钮触发执行该方法，当其返回Promise点击后Promise，resolve之前确认按钮显示为loading状态，返回值为false或者Promise的resolve值为false时弹窗不会被关闭，其他情况弹窗默认关闭 | function     | -     |
| onCancel      | 和onConfirm类似，其为点击取消按钮触发                                                                                                                 | function     | -     |
| children      | 弹窗内容，可以为jsx或者function，为function时可以接收到close和withDecorator设置的props                                                                        | jsx,function | -     |
| withDecorator | 弹窗修饰器，会接收到弹窗children的render方法，可以在其外部添加修饰内容后执行render方法，给render方法传入的值可以在children,footer,rightOptions类型为function时接收到对应的参数                  | function     | -     |
| maskClosable  | 点击蒙层是否允许关闭                                                                                                                              | boolean      | false |

其他参数参考antd Drawer组件

### AppDrawer

全局抽屉包裹组件，提供消费上下文的默认环境，提供可消费 React context 的 drawer 的静态方法，可以简化 useDrawer 等方法需要手动植入
contextHolder 的问题。

### useDrawer

获取一个执行后可以弹出一个Drawer组件的方法,前置条件是需要再全局注入AppDrawer包裹组件

#### return:drawer

| 属性名    | 说明                              | 类型       |
|--------|---------------------------------|----------|
| drawer | 执行后可以弹出一个Drawer弹窗，参数同Drawer组件参数 | function |

### DrawerButton

点击以后可以执行获取数据，在数据未返回时按钮展示为loading状态，数据返回后弹出Drawer弹窗

| 属性名         | 说明                                                  | 类型                                     | 默认值 |
|-------------|-----------------------------------------------------|----------------------------------------|-----|
| api         | @kne/react-fetch 所需参数                               | object                                 | -   |
| drawerProps | 同Drawer参数,当它为function时，执行function后返回的值作为drawerProps | object,function({data,fetchApi,close}) | -   |

其他参数同antd Button 组件

---

# FilePreview

### 概述

文件预览

### 示例(全屏)

#### 示例代码

- HtmlPreview
- 这里填写示例说明
- _FilePreview(@components/FilePreview),remoteLoader(@kne/remote-loader)

```jsx
const {default: FilePreview, HtmlPreview} = _FilePreview;
const {getPublicPath} = remoteLoader;
const BaseExample = () => {
    return (
        <HtmlPreview
            maxWidth={900}
            url={getPublicPath("components-core") + "/mock/demo2.html"}
        />
    );
};

render(<BaseExample/>);

```

- PdfPreview
- 这里填写示例说明
- _FilePreview(@components/FilePreview),remoteLoader(@kne/remote-loader)

```jsx
const {PdfPreview} = _FilePreview;
const {getPublicPath} = remoteLoader;
const BaseExample = () => {
    return (
        <PdfPreview
            maxWidth={900}
            url={getPublicPath("components-core") + "/mock/1_王晶简历-2023_06_2.pdf"}
            renderTextLayer={true}
        />
    );
};

render(<BaseExample/>);

```

- TextPreview
- 这里填写示例说明
- _FilePreview(@components/FilePreview),remoteLoader(@kne/remote-loader)

```jsx
const {TextPreview} = _FilePreview;
const {getPublicPath} = remoteLoader;
const BaseExample = () => {
    return (
        <TextPreview
            maxWidth={900}
            url={getPublicPath("components-core") + "/mock/demo.txt"}
        />
    );
};

render(<BaseExample/>);

```

- ImagePreview
- 这里填写示例说明
- _FilePreview(@components/FilePreview),remoteLoader(@kne/remote-loader)

```jsx
const {ImagePreview} = _FilePreview;
const {getPublicPath} = remoteLoader;
const BaseExample = () => {
    return (
        <ImagePreview url={getPublicPath("components-core") + "/mock/demo2.jpg"}/>
    );
};

render(<BaseExample/>);

```

- unknown
- 这里填写示例说明
- _FilePreview(@components/FilePreview),remoteLoader(@kne/remote-loader)

```jsx
const {UnknownPreview} = _FilePreview;
const {getPublicPath} = remoteLoader;
const BaseExample = () => {
    return (
        <UnknownPreview url={getPublicPath("components-core") + "/mock/demo.des"}/>
    );
};

render(<BaseExample/>);

```

- office
- 这里填写示例说明
- _FilePreview(@components/FilePreview),remoteLoader(@kne/remote-loader),_Global(@components/Global)

```jsx
const {default: FilePreview} = _FilePreview;
const {getPublicPath} = remoteLoader;
const {PureGlobal} = _Global;
const BaseExample = () => {
    return (
        <PureGlobal
            preset={{
                ajax: () => {
                    return {
                        data: "http://video.ch9.ms/build/2011/slides/TOOL-532T_Sutter.pptx",
                    };
                },
                apis: {
                    oss: {
                        url: "http://oss.com",
                    },
                },
            }}
        >
            <FilePreview
                id="63bb2013-c743-4d2d-9d91-935c865f1c4d"
                originName="TOOL-532T_Sutter.pptx"
            />
        </PureGlobal>
    );
};

render(<BaseExample/>);

```

- audio
- 这里填写示例说明
- _FilePreview(@components/FilePreview),remoteLoader(@kne/remote-loader),_Global(@components/Global)

```jsx
const {AudioPreview} = _FilePreview;
const {getPublicPath} = remoteLoader;
const BaseExample = () => {
    return (
        <AudioPreview
            maxWidth={900}
            url={getPublicPath("components-core") + "/mock/audio.wav"}
        />
    );
};

render(<BaseExample/>);

```

- video
- 这里填写示例说明
- _FilePreview(@components/FilePreview),remoteLoader(@kne/remote-loader),_Global(@components/Global)

```jsx
const {VideoPreview} = _FilePreview;
const {getPublicPath} = remoteLoader;
const BaseExample = () => {
    return (
        <VideoPreview
            maxWidth={900}
            url={getPublicPath("components-core") + "/mock/video.mp4"}
        />
    );
};

render(<BaseExample/>);

```

### API

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|

---

# Enum

### 概述

### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Enum(@components/Enum),antd(antd),global(@components/Global)

```jsx
const {default: Enum} = _Enum;
const {PureGlobal} = global;
const {Space, Select} = antd;
const BaseExample = () => {
    return (
        <PureGlobal
            preset={{
                locale: "zh-CN",
                enums: {
                    testEnums: async ({locale}) => {
                        console.log(locale);
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                resolve([
                                    {value: "1", description: "第一项"},
                                    {value: "2", description: "第二项"},
                                    {
                                        value: "3",
                                        description: "第三项",
                                    },
                                ]);
                            }, 1000);
                        });
                    },
                },
            }}
        >
            <Space>
                <Enum moduleName="gender" name="M">
                    {(data) => data.description}
                </Enum>
                <Enum moduleName="testEnums" name="1">
                    {(data) => data.description}
                </Enum>
                <Enum moduleName="testEnums" name="2">
                    {(data) => data.description}
                </Enum>
                <Enum moduleName="testEnums">
                    {(list) => {
                        return (
                            <Select
                                placeholder="请选择"
                                options={list.map((item) => ({
                                    value: item.value,
                                    label: item.description,
                                }))}
                            />
                        );
                    }}
                </Enum>
            </Space>
        </PureGlobal>
    );
};

render(<BaseExample/>);

```

### API

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|

---

# FileList

### 概述

文件列表展示，预览，上传

### 示例(全屏)

#### 示例代码

- 完整示例
- 提供一个上传文件，显示文件列表，预览文件的展示
- _FileList(@components/FileList),remoteLoader(@kne/remote-loader),lodash(lodash)

```jsx
const {default: FileList} = _FileList;
const {createWithRemoteLoader, getPublicPath} = remoteLoader;
const {useState} = React;
const {uniqueId} = lodash;

const ajax = {
    postForm: (config) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        code: 0,
                        data: {
                            id: "uBFNeYQBnHRXlZaTGZpA",
                            originalName: config.file.name,
                        },
                    },
                });
            }, 1000);
        });
    },
};

const apis = {
    onSave: async ({data}) => {
        return {
            ossId: uniqueId(),
            filename: data.originalName,
            date: new Date(),
            userName: "哈哈哈",
        };
    },
    onDelete: () => {
    },
};

const preset = {
    apis: {
        oss: {
            loader: async ({params}) => {
                const mapping = {
                    "01": "/avatar.png",
                    "02": "/mock/demo.html",
                    "03": "/mock/1_王晶简历-2023_06_2.pdf",
                };
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(getPublicPath("components-core") + mapping["03"]);
                    }, 1000);
                });
            },
        },
        previewOffice: {
            loader: async () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            name: "测试开发_夏永昱_本科_5年.docx",
                            data: [
                                {
                                    id: "gWw26Y0BeK_D6zxND5vh",
                                    originalName: "attachment/gWw26Y0BeK_D6zxND5vh.pdf",
                                    url:
                                        getPublicPath("components-core") +
                                        "/mock/1_王晶简历-2023_06_2.pdf",
                                },
                            ],
                        });
                    }, 1000);
                });
            },
        },
        ossUpload: ({file}) => {
            return ajax.postForm({file});
        },
    },
};

const BaseExample = createWithRemoteLoader({
    modules: ["components-core:Global@PureGlobal"],
})(({remoteModules}) => {
    const [PureGlobal] = remoteModules;
    const [list, setList] = useState([
        {
            ossId: "uBFNeYQBnHRXlZaTGZpA",
            filename: "avatar.pdf",
        },
        {
            ossId: "gWw26Y0BeK_D6zxND5vh",
            filename: "测试开发_夏永昱_本科_5年.docx",
        },
    ]);
    console.log(list);
    return (
        <PureGlobal preset={preset}>
            <FileList
                defaultPreviewFileId="gWw26Y0BeK_D6zxND5vh"
                list={list}
                setList={setList}
                apis={apis}
            />
        </PureGlobal>
    );
});

render(<BaseExample/>);

```

- 上传文件列表
- 展示一个上传文件展示上传成功文件列表
- _FileList(@components/FileList),remoteLoader(@kne/remote-loader),lodash(lodash)

```jsx
const {FileUpload} = _FileList;
const {createWithRemoteLoader, getPublicPath} = remoteLoader;
const {useState} = React;
const {uniqueId} = lodash;

const ajax = {
    postForm: (config) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        code: 0,
                        data: {
                            id: "uBFNeYQBnHRXlZaTGZpA",
                            originalName: config.file.name,
                        },
                    },
                });
            }, 1000);
        });
    },
};

const apis = {
    onSave: async ({data}) => {
        const id = uniqueId();
        return {
            id: id,
            ossId: id,
            filename: data.originalName,
            date: new Date(),
            userName: "哈哈哈",
        };
    },
    onDelete: () => {
    },
};

const preset = {
    apis: {
        oss: {
            loader: async ({params}) => {
                const mapping = {
                    "01": "/avatar.png",
                    "02": "/mock/demo.html",
                    "03": "/mock/1_王晶简历-2023_06_2.pdf",
                };
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(getPublicPath("components-core") + mapping["03"]);
                    }, 1000);
                });
            },
        },
        ossUpload: ({file}) => {
            return ajax.postForm({file});
        },
    },
};

const BaseExample = createWithRemoteLoader({
    modules: ["components-core:Global@PureGlobal"],
})(({remoteModules}) => {
    const [PureGlobal] = remoteModules;
    const [list, setList] = useState([]);
    console.log(list);
    return (
        <PureGlobal preset={preset}>
            <FileUpload list={list} setList={setList} apis={apis}/>
            <div>非受控情况</div>
            <FileUpload
                setList={(fileList) => {
                    console.log(">>>>>>>>>>", fileList);
                }}
                apis={apis}
            />
        </PureGlobal>
    );
});

render(<BaseExample/>);

```

- 拖拽上传
- 展示一个拖拽上传文件，得到File对象
- _FileList(@components/FileList),antd(antd)

```jsx
const {DragArea, DragAreaOuter, UploadButton, DragButton} = _FileList;
const {Row, Col, Divider, Space} = antd;

const BaseExample = () => {
    return (
        <DragAreaOuter
            title={
                <Row>
                    <Col flex={1}>标题</Col>
                    <Col>
                        <Space split={<Divider type="vertical"/>}>
                            <DragButton/>
                            <UploadButton>上传</UploadButton>
                        </Space>
                    </Col>
                </Row>
            }
            onFileSelected={(fileList) => {
                console.log(fileList);
            }}
        >
            <DragArea/>
        </DragAreaOuter>
    );
};

render(<BaseExample/>);

```

### API

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|
|     |    |    |     |

---

# File

### 概述

提供文件展示，OSS文件id转换访问地址，文件列表，下载等操作

注意：

* 如果需要显示或者转换oss id的文件，需要Global的preset apis设置过oss接口或者传入apis.oss参数，oss返回访问地址

### 示例

#### 示例代码

- 获取文件地址
- 通过一个ossId获取文件地址
- _File(@components/File),global(@components/Global),remoteLoader(@kne/remote-loader)

```jsx
const {default: File} = _File;
const {PureGlobal} = global;
const {getPublicPath} = remoteLoader;
const BaseExample = () => {
    return <File id="qqq">{({url}) => url}</File>;
};

render(
    <PureGlobal
        preset={{
            apis: {
                oss: {
                    loader: async ({params}) => {
                        console.log(params);
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                resolve(getPublicPath("components-core") + "/avatar.png");
                            }, 1000);
                        });
                    },
                },
            },
        }}
    >
        <BaseExample/>
    </PureGlobal>
);

```

- 文件下载
- 展示文件下载
- _File(@components/File),global(@components/Global),remoteLoader(@kne/remote-loader)

```jsx
const {Download} = _File;
const {PureGlobal} = global;
const {getPublicPath} = remoteLoader;
const BaseExample = () => {
    return (
        <Download
            id="123"
            filename="下载的文件"
            onSuccess={() => {
                console.log("下载成功");
            }}
        >
            文件下载
        </Download>
    );
};

render(
    <PureGlobal
        preset={{
            apis: {
                oss: {
                    loader: async ({params}) => {
                        console.log(params);
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                resolve(getPublicPath("components-core") + "/avatar.png");
                            }, 1000);
                        });
                    },
                },
            },
        }}
    >
        <BaseExample/>
    </PureGlobal>
);

```

- 文件列表
- 展示文件列表
- _FileList(@components/File),lodash(lodash),global(@components/Global),antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const {List} = _FileList;
const {Space} = antd;
const {PureGlobal} = global;
const {getPublicPath} = remoteLoader;

const BaseExample = () => {
    return (
        <Space direction="vertical">
            <List
                dataSource={[
                    {
                        uuid: "121233",
                        type: "uploading",
                        filename: "张三的简历.doc",
                    },
                    {
                        id: "xxxxx",
                        filename: "我是一份简历.pdf",
                        date: "2022-07-15T11:09:15.000+08:00",
                        userName: "用户名",
                    },
                ]}
            />
            <List dataSource={[]}/>
        </Space>
    );
};

render(
    <PureGlobal
        preset={{
            apis: {
                oss: {
                    loader: async ({params}) => {
                        console.log(params);
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                resolve(getPublicPath("components-core") + "/mock/demo.pdf");
                            }, 1000);
                        });
                    },
                },
            },
        }}
    >
        <BaseExample/>
    </PureGlobal>
);

```

- 文件链接
- 展示文件链接
- _File(@components/File),remoteLoader(@kne/remote-loader),global(@components/Global)

```jsx
const {FileLink} = _File;
const {getPublicPath} = remoteLoader;
const {PureGlobal} = global;
const BaseExample = () => {
    return (
        <PureGlobal
            preset={{
                apis: {
                    oss: {
                        loader: async ({params}) => {
                            const mapping = {
                                "01": "/avatar.png",
                                "02": "/mock/demo.html",
                                "03": "/mock/1_王晶简历-2023_06_2.pdf",
                            };
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve(
                                        getPublicPath("components-core") + mapping[params.id]
                                    );
                                }, 1000);
                            });
                        },
                    },
                },
            }}
        >
            <FileLink id="01" originName="我是一个图片.jpg"/>
            <FileLink id="02" originName="我是一个网页.html"/>
            <FileLink id="03" originName="我是一个pdf.pdf"/>
        </PureGlobal>
    );
};

render(<BaseExample/>);

```

### API

| 属性名     | 说明                                                                                       | 类型     | 默认值  |
|---------|------------------------------------------------------------------------------------------|--------|------|
| id      | 如果文件为oss文件，传入ossId                                                                       | string | -    |
| url     | 如果文件为普通文件地址，传入该参数                                                                        | string | -    |
| error   | 加载文件失败展示组件                                                                               | jsx    | null |
| apis    | 通过oss id获取oss文件地址接口{oss} oss为一个@kne/react-fetch参数，如果Global的preset已设置该值，切当前组件也需要应用该值时可以不传 | object | -    |
| loading | 加载文件loading过程中显示组件                                                                       | jsx    | null |

#### Download

下载文件按钮

| 属性名       | 说明                                                                                       | 类型       | 默认值     |
|-----------|------------------------------------------------------------------------------------------|----------|---------|
| filename  | 下载文件的文件名                                                                                 | string   | 未命名下载文件 |
| onSuccess | 下载成功回调函数                                                                                 | function | -       |
| onError   | 下载失败回调函数                                                                                 | function | -       |
| id        | 如果文件为oss文件，传入ossId                                                                       | string   | -       |
| url       | 如果文件为普通文件地址，传入该参数                                                                        | string   | -       |
| apis      | 通过oss id获取oss文件地址接口{oss} oss为一个@kne/react-fetch参数，如果Global的preset已设置该值，切当前组件也需要应用该值时可以不传 | object   | -       |

#### List

显示文件列表，可以带有编辑文件名称，文件预览，文件删除等功能

| 属性名                      | 说明                                                                                                   | 类型                                      | 默认值  |
|--------------------------|------------------------------------------------------------------------------------------------------|-----------------------------------------|------|
| dataSource               | 文件列表                                                                                                 | array[{id,type,filename,date,userName}] | []   |
| dataSource[].id          | id:文件的id，一般为ossId                                                                                    | string                                  | -    |
| dataSource[].type        | 文件状态为uploading时该行文件展示为loading状态                                                                      | string                                  | -    |
| dataSource[].filename    | 文件名                                                                                                  | string                                  | -    |
| dataSource[].date        | 文件上传日期                                                                                               | Date,date timestamp                     | -    |
| dataSource[].userName    | 文件上传人                                                                                                | string                                  | -    |
| getPermission            | 获取操作权限，会在render每条数据时调用，获取到参数列表[type,itemData],type:preview预览,edit编辑,download下载，返回false为没有权限，其他情况为有权限 | function                                | -    |
| hasPreview               | 是否开启预览功能，和getPermission type:preview预览结果同事控制，全都判断通过才能开启预览功能                                          | boolean                                 | true |
| infoItemRenders          | 自定义列                                                                                                 | array[{span,render}]                    | -    |
| infoItemRenders[].span   | 当前列栅格数                                                                                               | number                                  | 4    |
| infoItemRenders[].render | render函数                                                                                             | function                                | -    |
| apis                     | 用于操作的api                                                                                             | object{onEdit,onPreview,onDelete}       | -    |
| apis.onEdit              | 文件名编辑回调接口                                                                                            | function                                | -    |
| apis.onPreview           | 文件预览回调接口                                                                                             | function                                | -    |
| apis.onDelete            | 文件删除回调接口                                                                                             | function                                | -    |

#### OptionButtons

文件操作按钮，可以带有编辑文件名称，文件预览，文件删除等功能

| 属性名            | 说明                                                          | 类型                                | 默认值  |
|----------------|-------------------------------------------------------------|-----------------------------------|------|
| apis           | 用于操作的api                                                    | object{onEdit,onPreview,onDelete} | -    |
| apis.onEdit    | 文件名编辑回调接口                                                   | function                          | -    |
| apis.onPreview | 文件预览回调接口                                                    | function                          | -    |
| apis.onDelete  | 文件删除回调接口                                                    | function                          | -    |
| hasPreview     | 是否开启预览功能，和getPermission type:preview预览结果同事控制，全都判断通过才能开启预览功能 | boolean                           | true |

#### FileLink

外观类似Link的组件，点击后可以弹出文件预览框

| 属性名          | 说明                                                                                       | 类型         | 默认值        |
|--------------|------------------------------------------------------------------------------------------|------------|------------|
| title        | 弹窗标题                                                                                     | string,jsx | originName |
| id           | 文件oss id                                                                                 | string     | -          |
| originName   | 文件名称                                                                                     | string     | -          |
| apis         | 通过oss id获取oss文件地址接口{oss} oss为一个@kne/react-fetch参数，如果Global的preset已设置该值，切当前组件也需要应用该值时可以不传 | object     | -          |
| openDownload | 是否开启文件下载                                                                                 | boolean    | true       |
| modalProps   | modal的其他参数，参考Modal组件                                                                     | object     | -          |

#### downloadBlobFile(target, filename)

下载文件的方法

| 属性名      | 说明             | 类型     | 默认值 |
|----------|----------------|--------|-----|
| target   | 下载链接地址,或者二进制数据 | string | -   |
| filename | 下载后的文件名        | string | -   |

#### {isLoading,download,...others} = useDownload({id,filename,apis,onError,onSuccess});

生成下载文件function的hooks，带有下载中的状态控制

| 属性名       | 说明                                                                                       | 类型       | 默认值 |
|-----------|------------------------------------------------------------------------------------------|----------|-----|
| id        | 文件ossId                                                                                  | string   | -   |
| filename  | 下载后的文件名                                                                                  | string   | -   |
| onError   | 下载失败回调                                                                                   | function | -   |
| onSuccess | 下载成功回调                                                                                   | function | -   |
| apis      | 通过oss id获取oss文件地址接口{oss} oss为一个@kne/react-fetch参数，如果Global的preset已设置该值，切当前组件也需要应用该值时可以不传 | object   | -   |
| isLoading | 是否正在下载中                                                                                  | boolean  | -   |
| download  | 执行该方法开始下载                                                                                | function | -   |
| others    | 其他@kne/react-fetch useFetch参数                                                            | object   | -   |

#### modal = useFileModal()

文件预览弹框方法生成的hooks

| 属性名                   | 说明                                                                                       | 类型                                                                   | 默认值        |
|-----------------------|------------------------------------------------------------------------------------------|----------------------------------------------------------------------|------------|
| modal                 | 执行后弹出文件预览弹窗                                                                              | function({title, id, originName, apis, openDownload, ...modalProps}) | -          |
| modal({title})        | 弹窗标题                                                                                     | string,jsx                                                           | originName |
| modal({id})           | 文件oss id                                                                                 | string                                                               | -          |
| modal({originName})   | 文件名称                                                                                     | string                                                               | -          |
| modal({apis})         | 通过oss id获取oss文件地址接口{oss} oss为一个@kne/react-fetch参数，如果Global的preset已设置该值，切当前组件也需要应用该值时可以不传 | object                                                               | -          |
| modal({openDownload}) | 是否开启文件下载                                                                                 | boolean                                                              | true       |
| modalProps            | modal的其他参数，参考Modal组件                                                                     | object                                                               | -          |

---

# Features

### 概述

### 何时使用

在系统中需要通过一些条件，系统性地让整个系统的某些功能屏蔽或者有另外的一些展现方式，可以用该组件来实现

### 特点

* 全局性配置，一次性声明，避免将各种判断语句散落在项目各处造成难以维护
* 具有特征判断和依赖性判断，即当系统描述性文件中含有某个模块且含有所有依赖项模块则判断该组件为正常状态，其他情况为关闭状态
* 可以通过配置文件给正常状态和关闭状态的组件传递不同的props来控制两种状态下组件的不同逻辑
* 在配置文件中，组件的id是简写，只需要保证同一层级的组件id不重复就可以了，它的真实id会通过其所在的上下级关系，通过冒号将每一层的组件id链接起来组成其真实的id，你可以打开调试模式查看每一个组件实际运行时的id和判断状态
*

组件的type可以设置为三种：system,module,feature。system为配置文件最顶级组件，module为功能模块，默认Layout的Page组件openFeatures为true时它的name会被设置成module，feature为具体的功能项

### 示例(全屏)

#### 示例代码

- 展示了一个系统中功能一开启功能二关闭的情况
- 展示了一个系统中功能一开启功能二关闭的情况
- _Features(@components/Features),global(@components/Global),layout(@components/Layout)

```jsx
const {default: Features} = _Features;
const {default: Layout, PermissionsPage} = layout;
const {PureGlobal} = global;
const BaseExample = () => {
    return (
        <PureGlobal
            preset={{
                features: {
                    debug: true,
                    profile: {
                        id: "erc",
                        type: "system",
                        name: "业务系统",
                        children: [
                            {
                                id: "home",
                                type: "module",
                                name: "首页",
                                children: [
                                    {
                                        id: "test",
                                        type: "feature",
                                        name: "测试功能",
                                        dependencies: ["erc:client"],
                                    },
                                ],
                            },
                            {
                                id: "position",
                                type: "module",
                                name: "职位",
                                children: [
                                    {
                                        id: "position-list",
                                        type: "feature",
                                        options: [],
                                        rejectedOptions: [],
                                    },
                                ],
                            },
                            {
                                id: "client",
                                type: "module",
                                name: "客户",
                            },
                        ],
                    },
                },
            }}
        >
            <Layout navigation={{isFixed: false}}>
                <PermissionsPage name="home" openFeatures>
                    <Features id="test">功能模块一</Features>
                    <Features id="test2">功能模块二</Features>
                </PermissionsPage>
            </Layout>
        </PureGlobal>
    );
};

render(<BaseExample/>);

```

- 展示了打开页面特性配置开启和关闭的情况
- 展示了打开页面特性配置开启和关闭的情况
- _Features(@components/Features),global(@components/Global),layout(@components/Layout),Router(react-router-dom)

```jsx
const {default: Features} = _Features;
const {default: Layout, PermissionsPage} = layout;
const {PureGlobal} = global;
const {Route, Routes} = Router;
const BaseExample = () => {
    return (
        <PureGlobal
            preset={{
                features: {
                    debug: true,
                    profile: {
                        id: "erc",
                        type: "system",
                        name: "业务系统",
                        children: [
                            {
                                id: "home",
                                type: "module",
                                name: "首页",
                                children: [
                                    {
                                        id: "test",
                                        type: "feature",
                                        name: "测试功能",
                                    },
                                    {
                                        id: "test2",
                                        type: "feature",
                                        name: "测试功能2",
                                        dependencies: ["erc:client"],
                                    },
                                ],
                            },
                        ],
                    },
                },
            }}
        >
            <Layout
                navigation={{
                    isFixed: false,
                    list: [
                        {
                            key: "position",
                            title: "职位",
                            path: "/position",
                        },
                        {
                            key: "client",
                            title: "客户",
                            path: "/client",
                        },
                    ],
                }}
            >
                <Routes>
                    <Route
                        index
                        element={
                            <PermissionsPage name="home" openFeatures>
                                home页面模块
                                <div>
                                    <Features id="test">开启模块</Features>
                                    <Features id="test2">关闭模块</Features>
                                </div>
                            </PermissionsPage>
                        }
                    />
                    <Route
                        path="/position"
                        element={
                            <PermissionsPage name="position" openFeatures>
                                position页面模块
                            </PermissionsPage>
                        }
                    />
                    <Route
                        path="/client"
                        element={
                            <PermissionsPage name="client">
                                client页面模块,未打开features
                            </PermissionsPage>
                        }
                    />
                </Routes>
            </Layout>
        </PureGlobal>
    );
};

render(<BaseExample/>);

```

- 展示了一个系统中功能开启和关闭参数获取
- 展示了一个系统中功能开启和关闭参数获取
- _Features(@components/Features),global(@components/Global),layout(@components/Layout),antd(antd)

```jsx
const {default: Features} = _Features;
const {default: Layout, PermissionsPage} = layout;
const {PureGlobal} = global;
const {useState} = React;
const {Button, Space} = antd;
const BaseExample = () => {
    const [close, setClose] = useState(false);
    return (
        <PureGlobal
            preset={{
                features: {
                    debug: true,
                    profile: {
                        id: "erc",
                        type: "system",
                        name: "业务系统",
                        children: [
                            {
                                id: "home",
                                type: "module",
                                name: "首页",
                                children: [
                                    {
                                        id: "test",
                                        type: "feature",
                                        name: "测试功能",
                                        options: {
                                            state: "开启",
                                        },
                                        rejectedOptions: {
                                            state: "关闭",
                                        },
                                        close: close,
                                    },
                                ],
                            },
                        ],
                    },
                },
            }}
        >
            <Space direction="vertical">
                <Button
                    onClick={() => {
                        setClose((value) => !value);
                    }}
                >
                    切换
                </Button>
                <Layout navigation={{isFixed: false}}>
                    <PermissionsPage name="home" openFeatures>
                        <Features id="test">
                            {({isPass, options}) => {
                                return isPass
                                    ? "模块开启,options:" + JSON.stringify(options)
                                    : "模块关闭,options:" + JSON.stringify(options);
                            }}
                        </Features>
                    </PermissionsPage>
                </Layout>
            </Space>
        </PureGlobal>
    );
};

render(<BaseExample/>);

```

### API

| 属性名 | 说明                                              | 类型     | 默认值 |
|-----|-------------------------------------------------|--------|-----|
| id  | 模块或功能id，通过Global里面的preset的features配置确定该模块开启或者关闭 | string | -   |

* features 参数设置

| 属性名     | 说明                             | 类型      | 默认值   |
|---------|--------------------------------|---------|-------|
| debug   | 是否开启调试模式，开启后控制台会打印所有模块的id和判断结果 | boolean | false |
| profile | 模块配置列表，具体参考下面profile参数说明       | object  | -     |

* profile参数说明

| 属性名             | 说明                                                                                                                                                          | 类型            | 默认值   |
|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-------|
| id              | 模块的唯一标识符，需要保证在当前一级中不重复，实际id为所有父级的id用’:‘链接的字符串                                                                                                               | string        | -     |
| type            | 可能取值为system,module,feature，注意最外层的type必须为system                                                                                                              | string        | -     |
| name            | 模块的中文名称，不参与判断，只标识模块名帮助开发者识别                                                                                                                                 | string        | -     |
| close           | 模块是否关闭，可以缺省该值，缺省时profile里面存在某id的模块即为模块开启，不存在即为关闭。在特殊情况下，在profile存在该模块配置但是希望其关闭时可以显示指定该参数为true来关闭模块                                                          | boolean       | false |
| dependencies    | 依赖模块列表，每一项为一个模块id（该id必须为完整的id串，即带有所有父级id的用’:‘链接起来的字符串）,当所有id的指代模块都被判断开启时，该模块被判断为开启                                                                          | array[string] | -     |
| options         | 模块开启时获取的参数                                                                                                                                                  | any           | -     |
| rejectedOptions | 模块关闭时获取的参数                                                                                                                                                  | any           | -     |
| children        | 被控制的模块，为function时可以接收到({isPass,options})参数 isPass为模块是否开启，options在模块开启时为options参数，在模块关闭时为rejectedOptions参数，其不为function类型时当模块关闭则不显示children，模块开启时正常显示children | jsx,function  | -     |

---

# Filter

### 概述

### 示例(全屏)

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Filter(@components/Filter)

```jsx
const {
    default: Filter,
    InputFilterItem,
    DatePickerFilterItem,
    DateRangePickerFilterItem,
    TypeDateRangePickerFilterItem,
    CityFilterItem,
    AdvancedSelectFilterItem,
    UserFilterItem,
    FunctionSelectFilterItem,
    IndustrySelectFilterItem,
    getFilterValue,
    FilterItemContainer,
} = _Filter;
const {useState} = React;
const BaseExample = () => {
    const [value, onChange] = useState([]);
    return (
        <Filter
            value={value}
            onChange={(value) => {
                console.log(getFilterValue(value));
                onChange(value);
            }}
            extra={<Filter.SearchInput name="name" label="姓名"/>}
            list={[
                [
                    <InputFilterItem label="文字" name="text"/>,
                    <CityFilterItem label="城市" name="city"/>,
                    <FilterItemContainer name="select" label="高级选择">
                        {(props) => (
                            <div>
                                <AdvancedSelectFilterItem
                                    {...props}
                                    api={{
                                        loader: () => {
                                            return {
                                                pageData: [
                                                    {label: "第一项", value: 1},
                                                    {
                                                        label: "第二项",
                                                        value: 2,
                                                        disabled: true,
                                                    },
                                                    {
                                                        label: "第三项",
                                                        value: 3,
                                                    },
                                                ],
                                            };
                                        },
                                    }}
                                />
                            </div>
                        )}
                    </FilterItemContainer>,
                    <DatePickerFilterItem label="日期" name="date" picker="week"/>,
                    <TypeDateRangePickerFilterItem
                        label="复杂日期范围"
                        name="type-data-range"
                        allowEmpty={[true, true]}
                    />,
                    <DateRangePickerFilterItem label="日期范围" name="date-range"/>,
                    <UserFilterItem
                        label="用户选择"
                        name="user"
                        api={{
                            loader: () => {
                                return {
                                    pageData: [
                                        {
                                            label: "用户一",
                                            value: 1,
                                            description: "我是用户描述",
                                        },
                                        {
                                            label: "用户二",
                                            value: 2,
                                            description: "我是用户描述",
                                        },
                                        {
                                            label: "用户三",
                                            value: 3,
                                            description: "我是用户描述",
                                        },
                                    ],
                                };
                            },
                        }}
                    />,
                    <FunctionSelectFilterItem
                        label="职能选择"
                        name="functionLast"
                        onlyAllowLastLevel
                    />,
                    <FunctionSelectFilterItem
                        label="职能选择"
                        name="function"
                        selectLevel={3}
                        maxLength={3}
                    />,
                    <FunctionSelectFilterItem
                        label="职能选择"
                        name="functionSingle"
                        single
                    />,
                    <IndustrySelectFilterItem
                        label="行业选择"
                        name="industryLast"
                        onlyAllowLastLevel
                    />,
                    <IndustrySelectFilterItem
                        label="行业选择"
                        name="industry"
                        selectLevel={2}
                        maxLength={3}
                    />,
                    <IndustrySelectFilterItem
                        label="行业选择"
                        name="industrySingle"
                        single
                    />,
                ],
            ]}
        />
    );
};

render(<BaseExample/>);

```

- 高级筛选
- 高级筛选
- _Filter(@components/Filter)

```jsx
const {
    default: Filter,
    AdvancedFilter,
    InputFilterItem,
    DatePickerFilterItem,
    DateRangePickerFilterItem,
    TypeDateRangePickerFilterItem,
    CityFilterItem,
    AdvancedSelectFilterItem,
    UserFilterItem,
    FunctionSelectFilterItem,
    IndustrySelectFilterItem,
    NumberRangeFilterItem,
    getFilterValue,
    FilterItemContainer,
} = _Filter;
const {useState} = React;

const {
    CityFilterItem: CityAdvancedFilterItem,
    ListFilterItem,
    InputFilterItem: InputAdvancedFilterItem,
} = AdvancedFilter.fields;
const BaseExample = () => {
    const [value, onChange] = useState([]);
    return (
        <AdvancedFilter
            value={value}
            onChange={(value) => {
                console.log(getFilterValue(value));
                onChange(value);
            }}
            list={[
                [<CityAdvancedFilterItem name="currentCity" label="当前城市" single/>],
                [<CityAdvancedFilterItem name="expectCity" label="期望城市"/>],
                [
                    <ListFilterItem
                        name="experience"
                        label="工作经验"
                        single
                        items={[
                            {
                                value: [null, 1],
                                label: "1年以下",
                            },
                            {
                                value: [1, 5],
                                label: "1-5年",
                            },
                            {value: [5, null], label: "5年以上"},
                        ]}
                        custom={<NumberRangeFilterItem label="自定义" unit="年"/>}
                    />,
                ],
                [<InputAdvancedFilterItem name="company" label="公司"/>],
            ]}
            more={[
                <InputFilterItem label="文字" name="text"/>,
                <CityFilterItem label="城市" name="city"/>,
                <FilterItemContainer name="select" label="高级选择">
                    {(props) => (
                        <div>
                            <AdvancedSelectFilterItem
                                {...props}
                                api={{
                                    loader: () => {
                                        return {
                                            pageData: [
                                                {label: "第一项", value: 1},
                                                {
                                                    label: "第二项",
                                                    value: 2,
                                                    disabled: true,
                                                },
                                                {
                                                    label: "第三项",
                                                    value: 3,
                                                },
                                            ],
                                        };
                                    },
                                }}
                            />
                        </div>
                    )}
                </FilterItemContainer>,
                <DatePickerFilterItem label="日期" name="date" picker="week"/>,
                <TypeDateRangePickerFilterItem
                    label="复杂日期范围"
                    name="type-data-range"
                    allowEmpty={[true, true]}
                />,
                <DateRangePickerFilterItem label="日期范围" name="date-range"/>,
                <UserFilterItem
                    label="用户选择"
                    name="user"
                    api={{
                        loader: () => {
                            return {
                                pageData: [
                                    {
                                        label: "用户一",
                                        value: 1,
                                        description: "我是用户描述",
                                    },
                                    {
                                        label: "用户二",
                                        value: 2,
                                        description: "我是用户描述",
                                    },
                                    {
                                        label: "用户三",
                                        value: 3,
                                        description: "我是用户描述",
                                    },
                                ],
                            };
                        },
                    }}
                />,
                <FunctionSelectFilterItem
                    label="职能选择"
                    name="function"
                    onlyAllowLastLevel
                    single
                />,
                <IndustrySelectFilterItem
                    label="行业选择"
                    name="industry"
                    onlyAllowLastLevel
                />,
            ]}
        />
    );
};

render(<BaseExample/>);

```

- 这里填写示例标题
- 这里填写示例说明
- _Filter(@components/Filter),antd(antd),_data(@components/Filter/doc/mock/tree-data.json)

```jsx
const {default: Filter, TreeFilterItem} = _Filter;
const {default: treeData} = _data;
const {useState} = React;
const {Space} = antd;

const BaseExample = () => {
    const [filter, setFilter] = useState([]);
    const [filter2, setFilter2] = useState([]);

    return (
        <Space direction="vertical">
            <Filter
                value={filter}
                onChange={setFilter}
                list={[
                    [
                        <TreeFilterItem
                            name="tree"
                            single
                            label="树组件"
                            fieldNames={{
                                title: "name",
                                key: "id",
                                children: "children",
                            }}
                            api={{
                                loader: () => {
                                    return treeData.children;
                                },
                            }}
                        />,
                    ],
                ]}
            />
            <Filter
                value={filter2}
                onChange={setFilter2}
                list={[
                    [
                        <TreeFilterItem
                            name="tree"
                            label="树组件"
                            fieldNames={{
                                title: "name",
                                key: "id",
                                children: "children",
                            }}
                            api={{
                                loader: () => {
                                    return treeData.children;
                                },
                            }}
                        />,
                    ],
                ]}
            />
        </Space>
    );
};

render(<BaseExample/>);

```

- 这里填写示例标题
- 这里填写示例说明
- _Filter(@components/Filter),antd(antd)

```jsx
const {
    FilterValueDisplay,
    FilterItem,
    FilterLines,
    PopoverItem,
    InputFilterItem,
    CityFilterItem,
    AdvancedSelectFilterItem,
    UserFilterItem,
    FunctionSelectFilterItem,
    IndustrySelectFilterItem,
} = _Filter;
const {Space, Input} = antd;
const {useState} = React;
const BaseExample = () => {
    const [value, setValue] = useState([
        {
            label: "城市",
            name: "city",
            value: [
                {label: "上海", value: "010"},
                {label: "北京", value: "020"},
            ],
        },
        {
            label: "职能",
            name: "function",
            value: [
                {label: "产品经理", value: "010"},
                {label: "销售", value: "020"},
                {
                    label: "客户经理",
                    value: "030",
                },
            ],
        },
    ]);
    return (
        <Space direction="vertical">
            <FilterValueDisplay value={value} onChange={setValue}/>
            <Space>
                <FilterItem label="客户"/>
                <FilterItem label="客户" active/>
                <FilterItem label="客户" open/>
                <FilterItem label="超长超长超长超长超长超长超长超长" active open/>
            </Space>
            <FilterLines
                list={[
                    [
                        <FilterItem label="客户"/>,
                        <FilterItem label="职位"/>,
                        <FilterItem label="职位负责人"/>,
                    ],
                    [
                        <FilterItem label="开始时间"/>,
                        <FilterItem label="结束时间"/>,
                        <FilterItem label="职位BD人"/>,
                    ],
                    [
                        <FilterItem label="开始时间"/>,
                        <FilterItem label="结束时间"/>,
                        <FilterItem label="职位BD人"/>,
                    ],
                    [
                        <FilterItem label="开始时间"/>,
                        <FilterItem label="结束时间"/>,
                        <FilterItem label="职位BD人"/>,
                    ],
                ]}
            />
            <PopoverItem label="客户">
                {({value, onChange}) => (
                    <Input value={value} onChange={(e) => onChange(e.target.value)}/>
                )}
            </PopoverItem>
            <FilterLines
                list={[
                    [
                        <InputFilterItem label="文字"/>,
                        <CityFilterItem label="城市"/>,
                        <AdvancedSelectFilterItem
                            label="高级选择"
                            api={{
                                loader: () => {
                                    return {
                                        pageData: [
                                            {label: "第一项", value: 1},
                                            {label: "第二项", value: 2, disabled: true},
                                            {
                                                label: "第三项",
                                                value: 3,
                                            },
                                        ],
                                    };
                                },
                            }}
                        />,
                        <UserFilterItem
                            label="用户选择"
                            api={{
                                loader: () => {
                                    return {
                                        pageData: [
                                            {
                                                label: "用户一",
                                                value: 1,
                                                description: "我是用户描述",
                                            },
                                            {
                                                label: "用户二",
                                                value: 2,
                                                description: "我是用户描述",
                                            },
                                            {
                                                label: "用户三",
                                                value: 3,
                                                description: "我是用户描述",
                                            },
                                        ],
                                    };
                                },
                            }}
                        />,
                        <FunctionSelectFilterItem label="职能选择"/>,
                        <IndustrySelectFilterItem label="行业选择"/>,
                    ],
                ]}
            />
        </Space>
    );
};

render(<BaseExample/>);

```

### API

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|

---

# FlexBox

### 概述

用于根据盒子大小响应式展示不同列

### 示例(全屏)

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _FlexBox(@components/FlexBox),antd(antd)

```jsx
const {default: FlexBox} = _FlexBox;
const {Card} = antd;
const BaseExample = () => {
    return (
        <FlexBox
            dataSource={[
                {
                    title: "Title 1",
                },
                {
                    title: "Title 2",
                },
                {
                    title: "Title 3",
                },
                {
                    title: "Title 4",
                },
                {
                    title: "Title 5",
                },
                {
                    title: "Title 6",
                },
            ]}
            renderItem={(item) => (
                <FlexBox.Item>
                    <Card title={item.title}>Card content</Card>
                </FlexBox.Item>
            )}
        />
    );
};

render(<BaseExample/>);

```

- 这里填写示例标题
- 这里填写示例说明
- _FlexBox(@components/FlexBox),antd(antd),lodash(lodash)

```jsx
const {default: FlexBox} = _FlexBox;
const {Card, Button} = antd;
const {range} = lodash;
const {useRef} = React;
const BaseExample = () => {
    const ref = useRef();
    return (
        <div>
            <FlexBox.Fetch
                ref={ref}
                getFetchApi={({size}) => {
                    return {
                        data: {
                            pageSize: size,
                        },
                        loader: ({data}) => {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve({
                                        pageData: range(0, data.pageSize).map((index) => {
                                            return {
                                                key: index,
                                                title: `第${index}项`,
                                            };
                                        }),
                                    });
                                }, 1000);
                            });
                        },
                    };
                }}
                renderItem={(item) => (
                    <FlexBox.Item>
                        <Card title={item.title}>Card content</Card>
                    </FlexBox.Item>
                )}
            />
            <Button
                onClick={() => {
                    console.log(ref.current);
                }}
            >
                获取FetchApi
            </Button>
        </div>
    );
};

render(<BaseExample/>);

```

### API

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|

---

# FormInfo

### 概述

表单控件，自带数据域管理。包含数据录入、校验以及对应样式

### 何时使用

* 用于创建或编辑一个实体或收集信息
* 需要对输入的数据类型进行校验时

### 概念

* Form Data：
  Form提交时获取到的输出值通常用来提交给后端，不包含Form的校验信息，只包含Form组件可以向外部提供的数据输出信息。
* Form State：
  Form中用来存储一切状态的值，包含Field信息，校验信息，Form的值（需要一定的转换从才能变成Form Data），表单是否验证通过，表单错误信息等值。
* 字段或称Field：
  Form中的一个项，必须拥有参数name,label,可选参数rule。name作为Form提交时获取到data的key值。
  label为字段展示给用户的名字以及字段报错时提示用户错误的语句中指代该字段的名字。
  rule为下方介绍的RULE。
  一个Field的取值可以是简单的Number，Boolean，String也可以是复杂的Array，Object等，所以在考虑一些值需要分成多个Field还是集中在一个Field时非常重要的。
  一个通用的规则是：***对于Form来说，它的最小校验单元是一个Field***。
* Field组件：
  Field组件是Field的一部分，可以由用户自己实现也可以由组件库提供，通过Form提供的Field hooks将其变成Field。
  field hooks主要接管Field组件的value，onChange参数，用来把Field组件的值获取到Form管理。Field组件必须为***受控组件***。
  field hooks还会接管triggerValidate，用来获取Field的校验时机。field hooks会向Field组件提供Field的校验状态和校验错误信息。
* RULE：
  用于字段的校验。RULE可以为一个function或者正则表达式，不过推荐以大写字符串调用。
  字符串形式的RULE以空格为间隔可以传入多条规则，如："REQ TEL"，
  执行校验时会从左至右依次校验，如果左侧的规则校验失败则不再执行其右侧规则，返回校验失败状态及该规则失败原因提示作为字段校验失败原因。
  字符串RULE允许传入参数，参数以中划线隔开，可传入多个参数，如："LEN-3-10"。
  字符串RULE使用前必须在Form组件中有所声明，Form的RULE声明有3个级别：
  默认级，包含于Form内部，提供了一些基本的校验规则。preset级：在项目的preset中声明，应该把项目中常用的或者是比较复杂的RULE声明集中维护于此。
  Form级：以rules参数传入Form组件，主要是某Form单独使用的RULE。
  如果声明字符相同，会以 Form级>preset级>默认级 进行覆盖。
  RULE声明为一个对象，key和去掉参数的字符串RULE相同，value为一个function称为校验函数。此function接收到的参数有三部分(
  value,[...args]
  ,{data,{field}}),第一个参数value为当前字段的值，最后一个参数为form的状态，data是form的当前值，field是form里面当前字段的信息，
  中间参数args为字符串参数如："LEN-3-10"会接收到3和20两个参数。校验函数返回{result,errMsg}，
  或者一个Promise.resolve({result,errMsg})的Promise对象。result为校验是否通过，errMsg为失败提示，失败提示可以用%s占位，展示时会替换成字段的label。
* 校验或称Validate：
  Form会在Field组件执行triggerValidate时执行当前Field的Validate，表单提交时执行所有Field的Validate。
  Validate会串行执行RULE里面的所有规则的校验函数，校验函数返回Promise时也会等待左边的校验函数的Promise完成再执行右边的规则校验函数。
  表单提交时，正在执行异步的校验函数的Field将不会重复执行Validate。表单提交时所有Field的校验状态为通过时才会执行onSubmit方法，否则会执行onError方法，
  onPrevSubmit方法在用户点击提交按钮时就会触发，不管Validate结果是否为通过。
* Event：
  Form采用了事件驱动的方式来设计，用以满足多种异步校验，和给Form提供强大的可扩展性。
  Form的API里面可以获取到的emitter就是Form内部的事件发射器，可以触发Form内部定义的事件，也可以自定义一些事件。同时可以通过emitter.addListener监听事件。
  Form内部定义的事件有：
  form-field-add：Field被添加进Form时触发，
  form-field-edit：Field的参数发生改变时触发，
  orm-field-remove：Field被卸载时触发，
  form-field-validate：Field执行Validate时触发，
  form-field-data-change：Field的值发生修改时触发，
  form-data-reset：Form组件重置data时触发，
  form-data-set-field：Form组件给data赋值时触发，
  form-data-set-field-validate：Field被赋值时触发，
  form-validate-all：Form执行全部Field的Validate时触发，一般为表单提交时，
  form-submit：表单提交时触发。
* 拦截器或称Interceptor：
  没有Field可以接收一个interceptor参数，字符串类型，和RULE类似可以再preset或者Form的interceptors props中声明以后使用，可以配置多个用空格连接。
  拦截器的作用是，在Field接收到一个新的值时，会串行执行拦截器的output部分，把其返回值输出到Form Data。
  在执行Form Data的赋值操作时把赋值作为输入串行执行拦截器的input部分，把其结果作为Form Data的输入。
  现在有个Field是日期选择，输出Date类型值，但是Form Data输出希望将其格式化为日期字符串，在表单编辑时Form
  Data输入格式化后的日期字符串，但是Field只接收Date类型的值，
  以下例子可以来解决此问题：
  ```jsx
  interceptors.input.use("date-string", (value) => {
    return value ? new Date(value) : null;
  });

  interceptors.output.use("date-string", (value) => {
    return value ? dayjs(value).format("YYYY-MM-DD") : "";
  });
  
  <Field name="date" label="日期" interceptor="date-string"/>
  ```
* Group：
  当Form的data需要接收到一个复杂值的时候，可以使用Group来实现，如：
  ```jsx
  <Group name="baseInfo">
    <Field name="name" label="名称"/>
    <Field name="des" label="说明"/>
  </Group>
  ```
  Form的data可以接收到 {baseInfo:{name:"xxx",des:"xxx"}}，Group的name和Field的name一致时也可以用来表示数组如：
  ```jsx
  <Group name="name">
    <Field name="name" label="名称"/>
  </Group>
  <Group name="des">
    <Field name="des" label="说明"/>
  </Group>
  ```
  Form的data可以接收到 {name:["name1","name2"],des:["des1","des2"]}。
  Group可以嵌套，如
  ```jsx
  <Group name="baseInfo">
    <Group name="info">
      <Field name="name" label="名称"/>
    </Group>
    <Field name="des" label="说明"/>
  </Group>
  ```
  Form的data可以接收到 {baseInfo:{info:{name:'xxx'},des:'xxx'}}。
  支持点操作，如：
  ```jsx
  <Group name="baseInfo.info">
    <Field name="name" label="名称"/>
    <Field name="des" label="说明"/>
  </Group>
  ```
  Form的data可以接收到 {baseInfo:{info:{name:'xxx',des:'xxx'}}}。
* GroupList：
  使用Group实现的一个特殊的区域用来更方便的实现多段式的表单如：
  ```jsx
  <Button onClick={()=>ref.current.onAdd()}>添加</Button>
  <GroupList name="edu" ref={ref}>
    {(key,{index,length,onAdd,onRemore})=><>
      <Button onClick={onRemore}>删除</Button>
      <Field name="schoolName" label="学校名称"/>
      <Field name="degree" label="学历"/>
      <Field name="des" label="说明"/>
    </>}
  </GroupList>
  ```
  以上是一个简历的学历列表的实现，可以点击添加按钮添加多段学历Field，可以点击删除按钮删除当前一段学历Field，
  Form的data可以接收到的 {edu:[{schoolName:'xxx',degree:'xxx',des:'xxx'}]}。
  当然你可以不用使用这样底层的API，FormInfo.List 已经帮你处理好一切。

### 特点

* 集中化校验规则管理，分层抽象，调用简便
* 支持异步校验规则
* 事件驱动式架构设计，便于扩展
* 支持Group及GroupList，可轻松实现复杂表单
* UI，校验逻辑分层抽象，一次封装使用简单
* context和ref双重API暴露，在Form内还是Form外都能轻松获取
* form-helper提供基本的表单封装，灵活组合
* 支持拦截器，便捷实现FormData和Field的值之间的转换

### Field实现规范

* FormInfo里面的Field都会放置在fields文件夹，其中每个文件夹代表一个Field
* 一个Field只能默认导出会被引用，其他的方法枚举等需要放置在默认导出的组件的function的静态属性上
* 一个Field的默认导出组件只能被放置在Form中作为Field被使用，它的Field组件会被挂载在默认导出的组件的function的Field静态属性上
* 一个Field的Field组件必须支持受控和非受控两种形式
* 一个Field的导出必须被包含在FormInfo导出的formModule中和FormInfo中，即：以下两种方法都可以获取到该Field
  ```jsx
  import {SomeField} from "@component/FormInfo";
  ```
  ```jsx
  import {formModule} from "@component/FormInfo";
  const {SomeField} = formModule;
  ```

### 选择器类型Field组件实现规范

* 必须使用SelectInnerInput作为选择器的值显示和触发的输入框
*

SelectInnerInput可以通过isPopup提供popup和modal两种展示形态和交互逻辑，Field组件可以通过自身的默认值或者调用SelectInnerInput时显式指定来设置最佳推荐的默认形式，一般情况一种选择器需要良好支持两种形式

* SelectInnerInput可以通过single决定输出值是单项还是多项，单项和多项的交互逻辑也可能不同，SelectInnerInput的内部value
  state都是使用多项值来处理的，在输入值和在onChange输出时根据参数转化成数组，一般情况一种选择器需要支持两种情况
*

选择器可能会在顶部有一个搜索框，通过使用时是否传入getSearchProps来决定搜索框是否显示，在FormInfo/common中提供了默认的SearchInput实现，SelectInnerInput中管理了其searchText和setSearchText状态

* FormInfo/fields/AdvancedSelect/createList.js 实现了一个列表式选择器，实现了包括搜索，下拉加载等逻辑，只需要实现列表渲染逻辑就可以方便的扩展出新的List类型选择器
* 通过SelectInnerInput.useContext
  可以拿到选择器的用户传入属性（props），值到选项的映射（mapping），搜索框的state（searchText,setSearchText），数据加载器的API（fetchApi）原始value值（valueState），添加映射方法（appendItems）

### 示例(全屏)

#### 示例样式

```scss
.input > .ant-row > .ant-col {
  padding: 10px 0;
}

.input .ant-space-item:last-child {
  width: 100%;
}
```

#### 示例代码

- 一个简单表单示例
- 展示了一个简单表单示例
- _FormInfo(@components/FormInfo),global(@components/Global),_Modal(@components/Modal),lodash(lodash)

```jsx
const {default: FormInfo, Form, SubmitButton, ErrorTip, fields} = _FormInfo;
const {PureGlobal} = global;
const {useModal} = _Modal;
const {uniqueId} = lodash;

const {
    Input,
    TextArea,
    Upload,
    Avatar,
    PhoneNumber,
    TypeDateRangePicker,
    Rate,
    Switch,
    Slider,
    MoneyInput,
} = fields;

const BaseExample = () => {
    const modal = useModal();
    return (
        <Form
            helperGuideName="test-from"
            lang={[
                "cn",
                {
                    name: "EnUS",
                    label: "英文",
                    options: {
                        //labelTransform: (label) => label + "(en)",
                        ignore: [{name: "avatar"}, {name: "photo"}],
                        disabled: [{name: "file"}], //fields:[{name:'name'}]
                    },
                },
            ]}
            rules={{
                REP: (value) => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve({
                                result: false,
                                errMsg: "%s重复",
                                data: {
                                    user: "我是一个重复的东西",
                                },
                            });
                        }, 1000);
                    });
                },
            }}
            onSubmit={(data) => {
                modal({
                    title: "表单提交数据",
                    children: <pre>{JSON.stringify(data, null, 2)}</pre>,
                });
            }}
        >
            <FormInfo
                title="基本信息"
                list={[
                    <Avatar name="avatar" label="头像" labelHidden block/>,
                    <Avatar
                        name="photo"
                        label="证件照"
                        dropModalSize="default"
                        border={50}
                        width={960}
                        height={540}
                        block
                    />,
                    <ErrorTip
                        name="name"
                        errorRender={({validateData}) => {
                            console.log(validateData);
                            if (!validateData.REP) {
                                return null;
                            }
                            return <div>哈哈哈{validateData.REP.user}</div>;
                        }}
                    >
                        <Input
                            name="name"
                            label="姓名"
                            rule="REQ LEN-3-10 REP"
                            tips="姓名"
                        />
                    </ErrorTip>,
                    <MoneyInput name="money" label="金额" rule="REQ" tips={"money"}/>,
                    <PhoneNumber name="phone" label="手机" rule="REQ" disabled/>,
                    <Input name="email" label="邮箱" rule="EMAIL"/>,
                    <Upload name="file" label="文件" tips="文件" block/>,
                    <Rate name="rate" label="评分" tips="评分"/>,
                    <Switch name="switch" label="开关" tips="开关">
                        {({checked}) => (checked ? "开" : "关")}
                    </Switch>,
                    <Slider name="slider" label="滑动条" tips="滑动条"/>,
                    <TypeDateRangePicker
                        name="type_date"
                        label="日期时间段"
                        tips="日期时间段"
                        rule="REQ"
                    />,
                    <TextArea name="des" label="备注" tips="备注" block/>,
                    <SubmitButton>提交</SubmitButton>,
                ]}
            />
        </Form>
    );
};

render(
    <PureGlobal
        preset={{
            locale: "en-US",
            enums: {
                helperGuide: () => [
                    {
                        value: "test-from-name",
                        content: "测试帮助文档",
                        url: "/",
                    },
                ],
            },
            apis: {
                oss: {
                    loader: () => {
                        return window.PUBLIC_URL + "/avatar.png";
                    },
                },
                ossUpload: async ({file}) => {
                    console.log(file);
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            const id = uniqueId("file-");
                            resolve({
                                data: {
                                    code: 0,
                                    data: {
                                        id,
                                        originalName: id + "简历.pdf",
                                    },
                                },
                            });
                        }, 1000);
                    });
                },
            },
        }}
    >
        <BaseExample/>
    </PureGlobal>
);

```

- 多行
- 展示了一个多行字段示例
- _FormInfo(@components/FormInfo),_Modal(@components/Modal)

```jsx
const {default: FormInfo, Form, MultiField, SubmitButton, fields} = _FormInfo;
const {useModal} = _Modal;

const {Input, TextArea} = fields;

const BaseExample = () => {
    const modal = useModal();
    return (
        <Form
            onSubmit={(data) => {
                modal({
                    title: "表单提交数据",
                    children: <pre>{JSON.stringify(data, null, 2)}</pre>,
                });
            }}
        >
            <FormInfo
                list={[
                    <MultiField
                        name="no"
                        label="单号"
                        rule="REQ"
                        field={Input}
                        maxLength={5}
                        tips={"单号"}
                    />,
                    <Input name="name" label="名称"/>,
                    <MultiField name="description" label="说明" field={TextArea}/>,
                ]}
            />
            <SubmitButton>提交</SubmitButton>
        </Form>
    );
};

render(<BaseExample/>);

```

- 一个含有多段列表的表单示例
- 展示了一个含有多段列表的表单示例，列表的最大长度为5，在添加5段之后添加按钮自动隐藏
- _FormInfo(@components/FormInfo),global(@components/Global),_Modal(@components/Modal),antd(antd)

```jsx
const {
    default: FormInfo,
    Form,
    List,
    AdvancedSelect,
    TableList,
    Input,
    TextArea,
    SubmitButton,
    FormApiButton,
} = _FormInfo;
const {PureGlobal} = global;
const {useModal} = _Modal;
const {Space} = antd;

const BaseExample = () => {
    const modal = useModal();
    return (
        <Form
            onSubmit={(data) => {
                modal({
                    title: "表单提交数据",
                    children: <pre>{JSON.stringify(data, null, 2)}</pre>,
                });
            }}
        >
            <Space direction="vertical" size={16}>
                <FormInfo
                    title="基本信息"
                    list={[
                        <Input name="name" label="基本名称" rule="REQ" block/>,
                        <TextArea name="des" label="基本描述" block/>,
                    ]}
                />
                <List
                    name="list"
                    title="列表"
                    itemTitle={({index}) => `经历${index + 1}`}
                    maxLength={5}
                    list={[
                        <Input name="name" label="名称" rule="REQ"/>,
                        <Input name="title" label="标题" rule="REQ"/>,
                        <TextArea name="des" label="描述" block rule="REQ"/>,
                    ]}
                />
                <TableList
                    name="tableList"
                    title="表格列表"
                    maxLength={5}
                    minLength={1}
                    list={[
                        <Input name="name" label="名称" rule="REQ" value="xxxxx"/>,
                        <Input name="title" label="标题" rule="REQ"/>,
                        <AdvancedSelect
                            name="select"
                            label="选项"
                            rule="REQ"
                            value={[1]}
                            api={{
                                loader: () => {
                                    return {
                                        pageData: [
                                            {
                                                label: "第一项",
                                                value: 1,
                                            },
                                            {
                                                label: "第二项",
                                                value: 2,
                                                disabled: true,
                                            },
                                            {
                                                label: "第三项",
                                                value: 3,
                                            },
                                        ],
                                    };
                                },
                            }}
                        />,
                    ]}
                />
                <List
                    name="mult-list"
                    important
                    title="复杂列表"
                    itemTitle={({index}) => `经历${index + 1}`}
                    maxLength={5}
                    minLength={1}
                    list={[
                        <Input name="name" label="名称" rule="REQ"/>,
                        <Input name="title" label="标题" rule="REQ"/>,
                        <TextArea name="des" label="描述" block rule="REQ"/>,
                        <TableList
                            block
                            isUnshift={false}
                            name="tableList"
                            title="表格列表"
                            maxLength={5}
                            minLength={1}
                            list={[
                                <Input name="name" label="名称" rule="REQ" value="xxxxx"/>,
                                <Input name="title" label="标题" rule="REQ"/>,
                                <AdvancedSelect
                                    name="select"
                                    label="选项"
                                    rule="REQ"
                                    value={[1]}
                                    api={{
                                        loader: () => {
                                            return {
                                                pageData: [
                                                    {
                                                        label: "第一项",
                                                        value: 1,
                                                    },
                                                    {
                                                        label: "第二项",
                                                        value: 2,
                                                        disabled: true,
                                                    },
                                                    {
                                                        label: "第三项",
                                                        value: 3,
                                                    },
                                                ],
                                            };
                                        },
                                    }}
                                />,
                            ]}
                        />,
                    ]}
                />

                <List
                    name="mult-list-2"
                    important
                    title="复杂列表2"
                    itemTitle={({index}) => `经历${index + 1}`}
                    maxLength={5}
                    minLength={1}
                    list={[
                        <Input name="name" label="名称" rule="REQ"/>,
                        <Input name="title" label="标题" rule="REQ"/>,
                        <TextArea name="des" label="描述" block rule="REQ"/>,
                        <List
                            block
                            name="tableList"
                            title="列表"
                            maxLength={5}
                            minLength={1}
                            list={[
                                <Input name="name" label="名称" rule="REQ" value="xxxxx"/>,
                                <Input name="title" label="标题" rule="REQ"/>,
                                <TextArea name="des" label="描述" block rule="REQ"/>,
                            ]}
                        />,
                    ]}
                />
                <FormInfo
                    list={[
                        <SubmitButton>提交</SubmitButton>,
                        <FormApiButton
                            onClick={({openApi}) => {
                                openApi.setFields(
                                    [
                                        {
                                            groupName: "tableList",
                                            name: "name",
                                            value: "",
                                        },
                                        {
                                            groupName: "tableList",
                                            name: "title",
                                            value: "ssssssss",
                                        },
                                    ],
                                    {runValidate: false}
                                );
                            }}
                        >
                            设置表单值
                        </FormApiButton>,
                    ]}
                />
            </Space>
        </Form>
    );
};

render(
    <PureGlobal>
        <BaseExample/>
    </PureGlobal>
);

```

- Modal Form弹窗
- 展示一个form弹窗
- _FormInfo(@components/FormInfo),global(@components/Global),antd(antd),fetch(@kne/react-fetch)

```jsx
const {Space, Button} = antd;
const {PureGlobal} = global;
const {
    default: FormInfo,
    List,
    Input,
    TextArea,
    FormModal,
    useFormModal,
    CancelButton,
    FormApiButton,
    SubmitButton,
    FormModalButton,
} = _FormInfo;
const {useState} = React;
const {default: Fetch} = fetch;

const BaseExample = () => {
    const [open, setOpen] = useState(false);
    const formModal = useFormModal();
    return (
        <Space wrap>
            <FormModal
                open={open}
                title="表单弹窗"
                onClose={() => {
                    setOpen(false);
                }}
                formProps={{
                    data: {
                        field1: "field1field1field1field1",
                    },
                    onSubmit: async (data) => {
                        console.log(data);
                        await new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                            }, 1000);
                        });
                        setOpen(false);
                    },
                }}
            >
                <FormInfo
                    title="基本信息"
                    list={[
                        <Input name="field1" label="字段1" rule="REQ LEN-0-10"/>,
                        <Input name="field2" label="字段2" rule="REQ LEN-0-10"/>,
                        <TextArea name="field3" label="字段3"/>,
                    ]}
                />
                <List
                    title="列表"
                    name="list"
                    maxLength={3}
                    list={[
                        <Input name="field1" label="字段1" rule="REQ LEN-0-10"/>,
                        <Input name="field2" label="字段2" rule="REQ LEN-0-10"/>,
                        <TextArea name="field3" label="字段3"/>,
                    ]}
                />
            </FormModal>
            <Button
                onClick={() => {
                    setOpen(true);
                }}
            >
                组件调用
            </Button>
            <Button
                onClick={() => {
                    const api = formModal({
                        title: "表单弹窗",
                        formProps: {
                            data: {
                                field1: "field1field1field1field1",
                            },
                            onSubmit: async (data) => {
                                console.log(data);
                                await new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                    }, 1000);
                                });
                                api.close();
                            },
                        },
                        children: (
                            <div>
                                <FormInfo
                                    title="基本信息"
                                    list={[
                                        <Input name="field1" label="字段1" rule="REQ LEN-0-10"/>,
                                        <Input name="field2" label="字段2" rule="REQ LEN-0-10"/>,
                                        <TextArea name="field3" label="字段3"/>,
                                    ]}
                                />
                                <List
                                    title="列表"
                                    name="list"
                                    maxLength={3}
                                    list={[
                                        <Input name="field1" label="字段1" rule="REQ LEN-0-10"/>,
                                        <Input name="field2" label="字段2" rule="REQ LEN-0-10"/>,
                                        <TextArea name="field3" label="字段3"/>,
                                    ]}
                                />
                            </div>
                        ),
                    });
                }}
            >
                hooks调用
            </Button>
            <Button
                onClick={() => {
                    const api = formModal({
                        title: "表单弹窗",
                        formProps: ({data}) => {
                            return {
                                data: data,
                                onSubmit: async (data) => {
                                    console.log(data);
                                    await new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve();
                                        }, 1000);
                                    });
                                    api.close();
                                },
                            };
                        },
                        withDecorator: (render) => (
                            <Fetch
                                loader={() => {
                                    return new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve({
                                                field1: "我接口获取的数据",
                                            });
                                        }, 1000);
                                    });
                                }}
                                render={({data}) => render({data})}
                            />
                        ),
                        children: (
                            <div>
                                <FormInfo
                                    title="基本信息"
                                    list={[
                                        <Input name="field1" label="字段1" rule="REQ LEN-0-10"/>,
                                        <Input name="field2" label="字段2" rule="REQ LEN-0-10"/>,
                                        <TextArea name="field3" label="字段3"/>,
                                    ]}
                                />
                                <List
                                    title="列表"
                                    name="list"
                                    maxLength={3}
                                    list={[
                                        <Input name="field1" label="字段1" rule="REQ LEN-0-10"/>,
                                        <Input name="field2" label="字段2" rule="REQ LEN-0-10"/>,
                                        <TextArea name="field3" label="字段3"/>,
                                    ]}
                                />
                            </div>
                        ),
                    });
                }}
            >
                hooks加载form数据调用
            </Button>
            <Button
                onClick={() => {
                    const api = formModal({
                        title: "表单弹窗",
                        footerButtons: [
                            {ButtonComponent: CancelButton, children: "取消"},
                            {
                                ButtonComponent: FormApiButton,
                                autoClose: false,
                                onClick: (context) => {
                                    console.log(context);
                                },
                                children: "FormApiButton",
                            },
                            {
                                ButtonComponent: SubmitButton,
                                autoClose: false,
                                children: "提交",
                            },
                        ],
                        formProps: {
                            data: {
                                field1: "field1field1field1field1",
                            },
                            onSubmit: async (data) => {
                                console.log(data);
                                await new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                    }, 1000);
                                });
                                api.close();
                            },
                        },
                        children: (
                            <div>
                                <FormInfo
                                    title="基本信息"
                                    list={[
                                        <Input name="field1" label="字段1" rule="REQ LEN-0-10"/>,
                                        <Input name="field2" label="字段2" rule="REQ LEN-0-10"/>,
                                        <TextArea name="field3" label="字段3"/>,
                                    ]}
                                />
                                <List
                                    title="列表"
                                    name="list"
                                    maxLength={3}
                                    list={[
                                        <Input name="field1" label="字段1" rule="REQ LEN-0-10"/>,
                                        <Input name="field2" label="字段2" rule="REQ LEN-0-10"/>,
                                        <TextArea name="field3" label="字段3"/>,
                                    ]}
                                />
                            </div>
                        ),
                    });
                }}
            >
                自定义footerButtons
            </Button>
            <FormModalButton
                api={{
                    loader: () => {
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                resolve({
                                    name: "Lucy",
                                    desc: "个人介绍个人介绍个人介绍个人介绍个人介绍个人介绍个人介绍",
                                });
                            }, 1000);
                        });
                    },
                }}
                modalProps={({data, close}) => {
                    return {
                        title: "加载数据的form弹窗",
                        formProps: {
                            data,
                            onSubmit: async (data) => {
                                console.log(data);
                                await new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                    }, 1000);
                                });
                                close();
                            },
                        },
                        children: (
                            <FormInfo
                                title="基本信息"
                                column={1}
                                list={[
                                    <Input name="name" label="姓名" rule="REQ"/>,
                                    <TextArea name="desc" label="介绍" rule="REQ"/>,
                                ]}
                            />
                        ),
                    };
                }}
            >
                加载form数据按钮
            </FormModalButton>
        </Space>
    );
};

render(
    <PureGlobal>
        <BaseExample/>
    </PureGlobal>
);

```

- Modal Step Form弹窗
- 展示一个step form弹窗
- _FormInfo(@components/FormInfo),global(@components/Global),antd(antd),fetch(@kne/react-fetch)

```jsx
const {Space, Button} = antd;
const {PureGlobal} = global;
const {
    default: FormInfo,
    List,
    Input,
    TextArea,
    FormModal,
    FormStepModal,
    useFormModal,
    useFormStepModal,
    CancelButton,
    FormApiButton,
    SubmitButton,
    FormModalButton,
} = _FormInfo;
const {useState} = React;
const {default: Fetch} = fetch;

const BaseExample = () => {
    const [open, setOpen] = useState(false);
    const formModal = useFormStepModal();
    return (
        <Space wrap>
            <FormStepModal
                open={open}
                title="表单弹窗"
                onClose={() => {
                    setOpen(false);
                }}
                formProps={{
                    data: {
                        field1: "field1field1field1field1",
                    },
                    onSubmit: async (data) => {
                        console.log(data);
                        await new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                            }, 1000);
                        });
                        setOpen(false);
                    },
                }}
                items={[
                    {
                        name: "basic",
                        title: "基本信息",
                        children: (
                            <FormInfo
                                title="基本信息"
                                list={[
                                    <Input name="field1" label="字段1" rule="REQ LEN-0-10"/>,
                                    <Input name="field2" label="字段2" rule="REQ LEN-0-10"/>,
                                    <TextArea name="field3" label="字段3"/>,
                                ]}
                            />
                        ),
                    },
                    {
                        name: "list",
                        title: "列表信息",
                        children: (
                            <List
                                title="列表"
                                name="list"
                                maxLength={3}
                                list={[
                                    <Input name="field1" label="字段1" rule="REQ LEN-0-10"/>,
                                    <Input name="field2" label="字段2" rule="REQ LEN-0-10"/>,
                                    <TextArea name="field3" label="字段3"/>,
                                ]}
                            />
                        ),
                    },
                ]}
            ></FormStepModal>
            <Button
                onClick={() => {
                    setOpen(true);
                }}
            >
                组件调用
            </Button>
            <Button
                onClick={() => {
                    const api = formModal({
                        title: "表单弹窗",
                        formProps: {
                            data: {
                                field1: "field1field1field1field1",
                            },
                            onSubmit: async (data) => {
                                console.log(data);
                                await new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                    }, 1000);
                                });
                                api.close();
                            },
                        },
                        children: (
                            <div>
                                <FormInfo
                                    title="基本信息"
                                    list={[
                                        <Input name="field1" label="字段1" rule="REQ LEN-0-10"/>,
                                        <Input name="field2" label="字段2" rule="REQ LEN-0-10"/>,
                                        <TextArea name="field3" label="字段3"/>,
                                    ]}
                                />
                                <List
                                    title="列表"
                                    name="list"
                                    maxLength={3}
                                    list={[
                                        <Input name="field1" label="字段1" rule="REQ LEN-0-10"/>,
                                        <Input name="field2" label="字段2" rule="REQ LEN-0-10"/>,
                                        <TextArea name="field3" label="字段3"/>,
                                    ]}
                                />
                            </div>
                        ),
                    });
                }}
            >
                hooks调用
            </Button>
            <Button
                onClick={() => {
                    const api = formModal({
                        title: "表单弹窗",
                        formProps: ({data}) => {
                            return {
                                data: data,
                                onSubmit: async (data) => {
                                    console.log(data);
                                    await new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve();
                                        }, 1000);
                                    });
                                    api.close();
                                },
                            };
                        },
                        withDecorator: (render) => (
                            <Fetch
                                loader={() => {
                                    return new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve({
                                                field1: "我接口获取的数据",
                                            });
                                        }, 1000);
                                    });
                                }}
                                render={({data}) => render({data})}
                            />
                        ),
                        children: (
                            <div>
                                <FormInfo
                                    title="基本信息"
                                    list={[
                                        <Input name="field1" label="字段1" rule="REQ LEN-0-10"/>,
                                        <Input name="field2" label="字段2" rule="REQ LEN-0-10"/>,
                                        <TextArea name="field3" label="字段3"/>,
                                    ]}
                                />
                                <List
                                    title="列表"
                                    name="list"
                                    maxLength={3}
                                    list={[
                                        <Input name="field1" label="字段1" rule="REQ LEN-0-10"/>,
                                        <Input name="field2" label="字段2" rule="REQ LEN-0-10"/>,
                                        <TextArea name="field3" label="字段3"/>,
                                    ]}
                                />
                            </div>
                        ),
                    });
                }}
            >
                hooks加载form数据调用
            </Button>
            <Button
                onClick={() => {
                    const api = formModal({
                        title: "表单弹窗",
                        footerButtons: [
                            {ButtonComponent: CancelButton, children: "取消"},
                            {
                                ButtonComponent: FormApiButton,
                                autoClose: false,
                                onClick: (context) => {
                                    console.log(context);
                                },
                                children: "FormApiButton",
                            },
                            {
                                ButtonComponent: SubmitButton,
                                autoClose: false,
                                children: "提交",
                            },
                        ],
                        formProps: {
                            data: {
                                field1: "field1field1field1field1",
                            },
                            onSubmit: async (data) => {
                                console.log(data);
                                await new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                    }, 1000);
                                });
                                api.close();
                            },
                        },
                        children: (
                            <div>
                                <FormInfo
                                    title="基本信息"
                                    list={[
                                        <Input name="field1" label="字段1" rule="REQ LEN-0-10"/>,
                                        <Input name="field2" label="字段2" rule="REQ LEN-0-10"/>,
                                        <TextArea name="field3" label="字段3"/>,
                                    ]}
                                />
                                <List
                                    title="列表"
                                    name="list"
                                    maxLength={3}
                                    list={[
                                        <Input name="field1" label="字段1" rule="REQ LEN-0-10"/>,
                                        <Input name="field2" label="字段2" rule="REQ LEN-0-10"/>,
                                        <TextArea name="field3" label="字段3"/>,
                                    ]}
                                />
                            </div>
                        ),
                    });
                }}
            >
                自定义footerButtons
            </Button>
            <FormModalButton
                api={{
                    loader: () => {
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                resolve({
                                    name: "Lucy",
                                    desc: "个人介绍个人介绍个人介绍个人介绍个人介绍个人介绍个人介绍",
                                });
                            }, 1000);
                        });
                    },
                }}
                modalProps={({data, close}) => {
                    return {
                        title: "加载数据的form弹窗",
                        formProps: {
                            data,
                            onSubmit: async (data) => {
                                console.log(data);
                                await new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                    }, 1000);
                                });
                                close();
                            },
                        },
                        children: (
                            <FormInfo
                                title="基本信息"
                                column={1}
                                list={[
                                    <Input name="name" label="姓名" rule="REQ"/>,
                                    <TextArea name="desc" label="介绍" rule="REQ"/>,
                                ]}
                            />
                        ),
                    };
                }}
            >
                加载form数据按钮
            </FormModalButton>
        </Space>
    );
};

render(
    <PureGlobal>
        <BaseExample/>
    </PureGlobal>
);

```

- Drawer Form 抽屉弹窗
- 展示一个form抽屉弹窗
- _FormInfo(@components/FormInfo),global(@components/Global),antd(antd),fetch(@kne/react-fetch)

```jsx
const {Space, Button} = antd;
const {PureGlobal} = global;
const {
    default: FormInfo,
    List,
    Input,
    TextArea,
    FormDrawer,
    useFormDrawer,
    CancelButton,
    FormApiButton,
    SubmitButton,
    FormDrawerButton,
} = _FormInfo;
const {useState} = React;
const {default: Fetch} = fetch;

const BaseExample = () => {
    const [open, setOpen] = useState(false);
    const formDrawer = useFormDrawer();
    return (
        <Space wrap>
            <FormDrawer
                open={open}
                title="表单弹窗"
                onClose={() => {
                    setOpen(false);
                }}
                formProps={{
                    data: {
                        field1: "field1field1field1field1",
                    },
                    onSubmit: async (data) => {
                        console.log(data);
                        await new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                            }, 1000);
                        });
                        setOpen(false);
                    },
                }}
            >
                <FormInfo
                    title="基本信息"
                    list={[
                        <Input name="field1" label="字段1" rule="REQ LEN-0-10"/>,
                        <Input name="field2" label="字段2" rule="REQ LEN-0-10"/>,
                        <TextArea name="field3" label="字段3"/>,
                    ]}
                />
                <List
                    title="列表"
                    name="list"
                    maxLength={3}
                    list={[
                        <Input name="field1" label="字段1" rule="REQ LEN-0-10"/>,
                        <Input name="field2" label="字段2" rule="REQ LEN-0-10"/>,
                        <TextArea name="field3" label="字段3"/>,
                    ]}
                />
            </FormDrawer>
            <Button
                onClick={() => {
                    setOpen(true);
                }}
            >
                组件调用
            </Button>
            <Button
                onClick={() => {
                    const api = formDrawer({
                        title: "表单弹窗",
                        formProps: {
                            data: {
                                field1: "field1field1field1field1",
                            },
                            onSubmit: async (data) => {
                                console.log(data);
                                await new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                    }, 1000);
                                });
                                api.close();
                            },
                        },
                        children: (
                            <div>
                                <FormInfo
                                    title="基本信息"
                                    list={[
                                        <Input name="field1" label="字段1" rule="REQ LEN-0-10"/>,
                                        <Input name="field2" label="字段2" rule="REQ LEN-0-10"/>,
                                        <TextArea name="field3" label="字段3"/>,
                                    ]}
                                />
                                <List
                                    title="列表"
                                    name="list"
                                    maxLength={3}
                                    list={[
                                        <Input name="field1" label="字段1" rule="REQ LEN-0-10"/>,
                                        <Input name="field2" label="字段2" rule="REQ LEN-0-10"/>,
                                        <TextArea name="field3" label="字段3"/>,
                                    ]}
                                />
                            </div>
                        ),
                    });
                }}
            >
                hooks调用
            </Button>
            <Button
                onClick={() => {
                    const api = formDrawer({
                        title: "表单弹窗",
                        formProps: ({data}) => {
                            return {
                                data: data,
                                onSubmit: async (data) => {
                                    console.log(data);
                                    await new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve();
                                        }, 1000);
                                    });
                                    api.close();
                                },
                            };
                        },
                        withDecorator: (render) => (
                            <Fetch
                                loader={() => {
                                    return new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve({
                                                field1: "我接口获取的数据",
                                            });
                                        }, 1000);
                                    });
                                }}
                                render={({data}) => render({data})}
                            />
                        ),
                        children: (
                            <div>
                                <FormInfo
                                    title="基本信息"
                                    list={[
                                        <Input name="field1" label="字段1" rule="REQ LEN-0-10"/>,
                                        <Input name="field2" label="字段2" rule="REQ LEN-0-10"/>,
                                        <TextArea name="field3" label="字段3"/>,
                                    ]}
                                />
                                <List
                                    title="列表"
                                    name="list"
                                    maxLength={3}
                                    list={[
                                        <Input name="field1" label="字段1" rule="REQ LEN-0-10"/>,
                                        <Input name="field2" label="字段2" rule="REQ LEN-0-10"/>,
                                        <TextArea name="field3" label="字段3"/>,
                                    ]}
                                />
                            </div>
                        ),
                    });
                }}
            >
                hooks加载form数据调用
            </Button>
            <Button
                onClick={() => {
                    const api = formDrawer({
                        title: "表单弹窗",
                        footerButtons: [
                            {ButtonComponent: CancelButton, children: "取消"},
                            {
                                ButtonComponent: FormApiButton,
                                autoClose: false,
                                onClick: (context) => {
                                    console.log(context);
                                },
                                children: "FormApiButton",
                            },
                            {
                                ButtonComponent: SubmitButton,
                                autoClose: false,
                                children: "提交",
                            },
                        ],
                        formProps: {
                            data: {
                                field1: "field1field1field1field1",
                            },
                            onSubmit: async (data) => {
                                console.log(data);
                                await new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                    }, 1000);
                                });
                                api.close();
                            },
                        },
                        children: (
                            <div>
                                <FormInfo
                                    title="基本信息"
                                    list={[
                                        <Input name="field1" label="字段1" rule="REQ LEN-0-10"/>,
                                        <Input name="field2" label="字段2" rule="REQ LEN-0-10"/>,
                                        <TextArea name="field3" label="字段3"/>,
                                    ]}
                                />
                                <List
                                    title="列表"
                                    name="list"
                                    maxLength={3}
                                    list={[
                                        <Input name="field1" label="字段1" rule="REQ LEN-0-10"/>,
                                        <Input name="field2" label="字段2" rule="REQ LEN-0-10"/>,
                                        <TextArea name="field3" label="字段3"/>,
                                    ]}
                                />
                            </div>
                        ),
                    });
                }}
            >
                自定义footerButtons
            </Button>
            <FormDrawerButton
                api={{
                    loader: () => {
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                resolve({
                                    name: "Lucy",
                                    desc: "个人介绍个人介绍个人介绍个人介绍个人介绍个人介绍个人介绍",
                                });
                            }, 1000);
                        });
                    },
                }}
                modalProps={({data, close}) => {
                    return {
                        title: "加载数据的form弹窗",
                        formProps: {
                            data,
                            onSubmit: async (data) => {
                                console.log(data);
                                await new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                    }, 1000);
                                });
                                close();
                            },
                        },
                        children: (
                            <FormInfo
                                title="基本信息"
                                column={1}
                                list={[
                                    <Input name="name" label="姓名" rule="REQ"/>,
                                    <TextArea name="desc" label="介绍" rule="REQ"/>,
                                ]}
                            />
                        ),
                    };
                }}
            >
                加载form数据按钮
            </FormDrawerButton>
        </Space>
    );
};

render(
    <PureGlobal>
        <BaseExample/>
    </PureGlobal>
);

```

- 选择控件的数据展示框
- 展示了一个选择控件的数据展示框，它是其他选择器的子组件一般不独立使用，开放该组件是为了方面自定义新的选择控件，但是请谨慎使用
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content),antd(antd)

```jsx
const {SelectInnerInput} = _FormInfo;
const {PureGlobal} = global;
const {Space, Button, List} = antd;
const {default: Content} = _Content;
const {useState} = React;

const ControlledSelectInnerInput = (props) => {
    const [value, setValue] = useState([1, 2, 3]);

    return <SelectInnerInput {...props} value={value} onChange={setValue}/>;
};

const useSelectInnerContext = SelectInnerInput.useContext;

const ResetMapping = () => {
    const {mapping, appendMapping} = useSelectInnerContext();
    return (
        <span>
      <Button
          onClick={() => {
              appendMapping([
                  {label: "修改的项", value: 1},
                  {label: "新增的项", value: 4},
              ]);
          }}
      >
        点击设置mapping值
      </Button>
      <List
          dataSource={mapping.values()}
          renderItem={(item) => <div>{item.label}</div>}
      />
    </span>
    );
};

const BaseExample = () => {
    const children = "选区内容";
    return (
        <Content
            col={2}
            list={[
                {
                    label: "非受控状态",
                    content: (
                        <SelectInnerInput
                            defaultValue={[1, 2, 3]}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        >
                            {children}
                        </SelectInnerInput>
                    ),
                },
                {
                    label: "受控状态",
                    content: (
                        <ControlledSelectInnerInput>{children}</ControlledSelectInnerInput>
                    ),
                },
                {
                    label: "mapping值显示",
                    content: (
                        <SelectInnerInput
                            defaultValue={[1, 2, 3]}
                            api={{
                                loader: () => {
                                    return new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve([
                                                {label: "第一项", value: 1},
                                                {label: "第二项", value: 2},
                                                {
                                                    label: "第三项",
                                                    value: 3,
                                                },
                                            ]);
                                        }, 1000);
                                    });
                                },
                            }}
                        >
                            {children}
                        </SelectInnerInput>
                    ),
                },
                {
                    label: "单项值显示",
                    content: (
                        <SelectInnerInput
                            single
                            defaultValue={1}
                            api={{
                                loader: () => {
                                    return new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve([
                                                {label: "第一项", value: 1},
                                                {label: "第二项", value: 2},
                                                {
                                                    label: "第三项",
                                                    value: 3,
                                                },
                                            ]);
                                        }, 1000);
                                    });
                                },
                            }}
                        >
                            {children}
                        </SelectInnerInput>
                    ),
                },
                {
                    label: "多项超出情况",
                    content: (
                        <SelectInnerInput
                            defaultValue={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                            api={{
                                loader: () => {
                                    return [
                                        {
                                            label:
                                                "第一项超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长",
                                            value: 1,
                                        },
                                        {
                                            label:
                                                "第二项超级长超级长超级长超级长超级长超级长超级长超级长",
                                            value: 2,
                                        },
                                        {
                                            label: "第三项",
                                            value: 3,
                                        },
                                        {
                                            label:
                                                "第四项超级长超级长超级长超级长超级长超级长超级长超级长",
                                            value: 4,
                                        },
                                        {
                                            label:
                                                "第五项超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长",
                                            value: 5,
                                        },
                                        {
                                            label:
                                                "第六项超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长",
                                            value: 6,
                                        },
                                        {
                                            label:
                                                "第七项超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长",
                                            value: 7,
                                        },
                                        {label: "第八项", value: 8},
                                        {label: "第九项", value: 9},
                                    ];
                                },
                            }}
                        >
                            {children}
                        </SelectInnerInput>
                    ),
                },
                {
                    label: "单项超出情况",
                    content: (
                        <SelectInnerInput
                            defaultValue={1}
                            single
                            api={{
                                loader: () => {
                                    return [
                                        {
                                            label:
                                                "第一项超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长",
                                            value: 1,
                                        },
                                        {
                                            label:
                                                "第二项超级长超级长超级长超级长超级长超级长超级长超级长",
                                            value: 2,
                                        },
                                        {
                                            label: "第三项",
                                            value: 3,
                                        },
                                        {
                                            label:
                                                "第四项超级长超级长超级长超级长超级长超级长超级长超级长",
                                            value: 4,
                                        },
                                        {
                                            label:
                                                "第五项超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长",
                                            value: 5,
                                        },
                                        {
                                            label:
                                                "第六项超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长",
                                            value: 6,
                                        },
                                        {
                                            label:
                                                "第七项超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长",
                                            value: 7,
                                        },
                                        {label: "第八项", value: 8},
                                        {label: "第九项", value: 9},
                                    ];
                                },
                            }}
                        >
                            {children}
                        </SelectInnerInput>
                    ),
                },
                {
                    label: "popup多项超出情况",
                    content: (
                        <SelectInnerInput
                            isPopup
                            defaultValue={[1, 2, 3, 4, 5, 6, 7, 8]}
                            api={{
                                loader: () => {
                                    return [
                                        {
                                            label:
                                                "第一项超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长",
                                            value: 1,
                                        },
                                        {
                                            label:
                                                "第二项超级长超级长超级长超级长超级长超级长超级长超级长",
                                            value: 2,
                                        },
                                        {
                                            label: "第三项",
                                            value: 3,
                                        },
                                        {
                                            label:
                                                "第四项超级长超级长超级长超级长超级长超级长超级长超级长",
                                            value: 4,
                                        },
                                        {
                                            label: "第五项",
                                            value: 5,
                                        },
                                        {
                                            label: "第六项",
                                            value: 6,
                                        },
                                        {label: "第七项", value: 7},
                                        {label: "第八项", value: 8},
                                    ];
                                },
                            }}
                        >
                            {children}
                        </SelectInnerInput>
                    ),
                },
                {
                    label: "popup选区",
                    content: (
                        <SelectInnerInput
                            single
                            isPopup
                            defaultValue={1}
                            api={{
                                loader: () => {
                                    return new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve([
                                                {label: "第一项", value: 1},
                                                {label: "第二项", value: 2},
                                                {
                                                    label: "第三项",
                                                    value: 3,
                                                },
                                            ]);
                                        }, 1000);
                                    });
                                },
                            }}
                        >
                            {children}
                        </SelectInnerInput>
                    ),
                },
                {
                    label: "更新mapping",
                    content: (
                        <SelectInnerInput
                            single
                            isPopup
                            defaultValue={1}
                            api={{
                                loader: () => {
                                    return new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve([
                                                {label: "第一项", value: 1},
                                                {label: "第二项", value: 2},
                                                {
                                                    label: "第三项",
                                                    value: 3,
                                                },
                                            ]);
                                        }, 1000);
                                    });
                                },
                            }}
                        >
                            <ResetMapping/>
                            {children}
                        </SelectInnerInput>
                    ),
                },
                {
                    label: "隐藏已选标签",
                    content: (
                        <SelectInnerInput
                            showSelectedTag={false}
                            defaultValue={[1, 2, 3]}
                            api={{
                                loader: () => {
                                    return [
                                        {label: "第一项", value: 1},
                                        {label: "第二项", value: 2},
                                        {label: "第三项", value: 3},
                                    ];
                                },
                            }}
                        >
                            {children}
                        </SelectInnerInput>
                    ),
                },
                {
                    label: "popup隐藏已选标签",
                    content: (
                        <SelectInnerInput
                            isPopup
                            showSelectedTag={false}
                            defaultValue={[1, 2, 3]}
                            api={{
                                loader: () => {
                                    return [
                                        {label: "第一项", value: 1},
                                        {label: "第二项", value: 2},
                                        {label: "第三项", value: 3},
                                    ];
                                },
                            }}
                        >
                            {children}
                        </SelectInnerInput>
                    ),
                },
                {
                    label: "extra",
                    content: (
                        <SelectInnerInput
                            extra={<Button>添加</Button>}
                            defaultValue={[1, 2, 3]}
                            api={{
                                loader: () => {
                                    return [
                                        {label: "第一项", value: 1},
                                        {label: "第二项", value: 2},
                                        {label: "第三项", value: 3},
                                    ];
                                },
                            }}
                        >
                            {children}
                        </SelectInnerInput>
                    ),
                },
                {
                    label: "popup的extra",
                    content: (
                        <SelectInnerInput
                            isPopup
                            extra={({close}) => <Button onClick={close}>添加</Button>}
                            defaultValue={[1, 2, 3]}
                            api={{
                                loader: () => {
                                    return [
                                        {label: "第一项", value: 1},
                                        {label: "第二项", value: 2},
                                        {label: "第三项", value: 3},
                                    ];
                                },
                            }}
                        >
                            {children}
                        </SelectInnerInput>
                    ),
                },
                {
                    label: "valueType为all",
                    content: (
                        <SelectInnerInput
                            isPopup
                            valueType="all"
                            defaultValue={[
                                {label: "额外的一项", value: 100},
                                {label: "额外的二项", value: 200},
                            ]}
                            api={{
                                loader: () => {
                                    return [
                                        {label: "第一项", value: 1},
                                        {label: "第二项", value: 2},
                                        {label: "第三项", value: 3},
                                    ];
                                },
                            }}
                        >
                            {children}
                        </SelectInnerInput>
                    ),
                },
            ]}
        />
    );
};

render(
    <PureGlobal>
        <div className="input">
            <BaseExample/>
        </div>
    </PureGlobal>
);

```

- 高级选择组件
- 展示了高级选择组件的List形态
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content),antd(antd),lodash(lodash)

```jsx
const {AdvancedSelect: _AdvancedSelect, SelectInnerInput} = _FormInfo;
const {PureGlobal} = global;
const {Space, Button} = antd;
const {default: Content} = _Content;
const {range, uniqueId} = lodash;

const AdvancedSelect = _AdvancedSelect.Field;

const useSelectInnerContext = SelectInnerInput.useContext;

const AddExtraButton = () => {
    const {appendItems, fetchApi} = useSelectInnerContext();

    return (
        <Button
            type="link"
            onClick={() => {
                const id = uniqueId("new_item_");
                appendItems({
                    pageData: [
                        {
                            label: "添加的新项目_" + id,
                            value: id,
                        },
                        ...fetchApi.data.pageData,
                    ],
                    totalCount: fetchApi.data.totalCount,
                });
            }}
        >
            添加
        </Button>
    );
};

const BaseExample = () => {
    return (
        <Content
            col={2}
            list={[
                {
                    label: "多选",
                    content: (
                        <AdvancedSelect
                            defaultValue={[1]}
                            api={{
                                loader: () => {
                                    return {
                                        pageData: [
                                            {label: "第一项", value: 1},
                                            {label: "第二项", value: 2, disabled: true},
                                            {
                                                label: "第三项",
                                                value: 3,
                                            },
                                        ],
                                    };
                                },
                            }}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
                {
                    label: "单选",
                    content: (
                        <AdvancedSelect
                            single
                            defaultValue={1}
                            api={{
                                loader: () => {
                                    return {
                                        pageData: range(0, 100).map((key) => {
                                            return {
                                                label: `第${key + 1}项`,
                                                value: key + 1,
                                                disabled: key === 2,
                                            };
                                        }),
                                    };
                                },
                            }}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
                {
                    label: "多选modal",
                    content: (
                        <AdvancedSelect
                            defaultValue={[1]}
                            isPopup={false}
                            api={{
                                loader: () => {
                                    return {
                                        pageData: [
                                            {label: "第一项", value: 1},
                                            {label: "第二项", value: 2},
                                            {
                                                label: "第三项",
                                                value: 3,
                                            },
                                        ],
                                    };
                                },
                            }}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
                {
                    label: "单选modal",
                    content: (
                        <AdvancedSelect
                            single
                            defaultValue={1}
                            isPopup={false}
                            api={{
                                loader: () => {
                                    return {
                                        pageData: [
                                            {label: "第一项", value: 1},
                                            {label: "第二项", value: 2},
                                            {
                                                label: "第三项",
                                                value: 3,
                                            },
                                        ],
                                    };
                                },
                            }}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
                {
                    label: "描述信息",
                    content: (
                        <AdvancedSelect
                            single
                            defaultValue={1}
                            api={{
                                loader: () => {
                                    return {
                                        pageData: [
                                            {label: "第一项", value: 1, description: "描述信息"},
                                            {
                                                label: "第二项",
                                                value: 2,
                                                description: "描述信息",
                                            },
                                            {
                                                label: "第三项",
                                                value: 3,
                                                description: "描述信息",
                                            },
                                        ],
                                    };
                                },
                            }}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
                {
                    label: "分页加载数据",
                    content: (
                        <AdvancedSelect
                            single
                            defaultValue={90}
                            getSearchProps={(text) => {
                                return {
                                    data: {keyword: text},
                                };
                            }}
                            displayItems={[{label: "第九十项", value: 90}]}
                            extra={<AddExtraButton/>}
                            api={{
                                loader: ({data}) => {
                                    const params = Object.assign(
                                        {
                                            perPage: 20,
                                            currentPage: 1,
                                        },
                                        data
                                    );
                                    return new Promise((resolve) => {
                                        setTimeout(() => {
                                            const start = (params.currentPage - 1) * params.perPage;
                                            resolve({
                                                totalCount: 100,
                                                pageData: range(start, start + 20)
                                                    .map((key) => {
                                                        return {
                                                            label: `第${key + 1}项`,
                                                            value: key + 1,
                                                        };
                                                    })
                                                    .filter(({label}) => {
                                                        return params.keyword
                                                            ? label.indexOf(params.keyword) > -1
                                                            : true;
                                                    }),
                                            });
                                        }, 1000);
                                    });
                                },
                            }}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
                {
                    label: "modal分页加载数据",
                    content: (
                        <AdvancedSelect
                            defaultValue={[90]}
                            isPopup={false}
                            extra={<AddExtraButton/>}
                            getSearchProps={(text) => {
                                return {
                                    data: {keyword: text},
                                };
                            }}
                            displayItems={[{label: "第九十项", value: 90}]}
                            api={{
                                data: {
                                    perPage: 10,
                                },
                                loader: ({data}) => {
                                    const params = Object.assign(
                                        {
                                            perPage: 20,
                                            currentPage: 1,
                                        },
                                        data
                                    );
                                    return new Promise((resolve) => {
                                        setTimeout(() => {
                                            const start = (params.currentPage - 1) * params.perPage;
                                            resolve({
                                                totalCount: 100,
                                                pageData: range(start, start + params.perPage)
                                                    .map((key) => {
                                                        return {
                                                            label: `第${key + 1}项`,
                                                            value: key + 1,
                                                        };
                                                    })
                                                    .filter(({label}) => {
                                                        return params.keyword
                                                            ? label.indexOf(params.keyword) > -1
                                                            : true;
                                                    }),
                                            });
                                        }, 1000);
                                    });
                                },
                            }}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
            ]}
        />
    );
};

render(
    <PureGlobal>
        <div className="input">
            <BaseExample/>
        </div>
    </PureGlobal>
);

```

- 用户选择组件
- 在List的交互逻辑基础上扩展出的不同列表样式
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content),antd(antd),lodash(lodash)

```jsx
const {AdvancedSelect: _AdvancedSelect} = _FormInfo;
const {PureGlobal} = global;
const {Space, Button} = antd;
const {default: Content} = _Content;
const {range, uniqueId} = lodash;

const UserSelect = _AdvancedSelect.User.Field;

const BaseExample = () => {
    return (
        <Content
            col={2}
            list={[
                {
                    label: "多选",
                    content: (
                        <UserSelect
                            defaultValue={[1]}
                            api={{
                                loader: () => {
                                    return {
                                        pageData: [
                                            {
                                                label: "用户一",
                                                value: 1,
                                                description: "我是用户描述",
                                            },
                                            {
                                                label: "用户二",
                                                value: 2,
                                                description: "我是用户描述",
                                            },
                                            {
                                                label: "用户三",
                                                value: 3,
                                                description: "我是用户描述",
                                            },
                                        ],
                                    };
                                },
                            }}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
                {
                    label: "单选",
                    content: (
                        <UserSelect
                            single
                            defaultValue={1}
                            api={{
                                loader: () => {
                                    return {
                                        pageData: range(0, 30).map((key) => {
                                            return {
                                                label: `用户${key + 1}`,
                                                description: "我是用户描述",
                                                value: key + 1,
                                            };
                                        }),
                                    };
                                },
                            }}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
                {
                    label: "多选modal",
                    content: (
                        <UserSelect
                            defaultValue={[1]}
                            isPopup={false}
                            api={{
                                loader: () => {
                                    return {
                                        pageData: [
                                            {
                                                label: "用户一",
                                                value: 1,
                                                description: "我是用户描述",
                                            },
                                            {
                                                label: "用户二",
                                                value: 2,
                                                description: "我是用户描述",
                                            },
                                            {
                                                label: "用户三",
                                                value: 3,
                                                description: "我是用户描述",
                                            },
                                        ],
                                    };
                                },
                            }}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
                {
                    label: "单选modal",
                    content: (
                        <UserSelect
                            single
                            defaultValue={1}
                            isPopup={false}
                            api={{
                                loader: () => {
                                    return {
                                        pageData: [
                                            {
                                                label: "用户一",
                                                value: 1,
                                                description: "我是用户描述",
                                            },
                                            {
                                                label: "用户二",
                                                value: 2,
                                                description: "我是用户描述",
                                            },
                                            {
                                                label: "用户三",
                                                value: 3,
                                                description: "我是用户描述",
                                            },
                                        ],
                                    };
                                },
                            }}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
            ]}
        />
    );
};

render(
    <PureGlobal>
        <div className="input">
            <BaseExample/>
        </div>
    </PureGlobal>
);

```

- 表格选择组件
- 在List的交互逻辑基础上扩展出的不同列表样式
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content),antd(antd),lodash(lodash)

```jsx
const {AdvancedSelect: _AdvancedSelect} = _FormInfo;
const {PureGlobal} = global;
const {Space, Button} = antd;
const {default: Content} = _Content;
const {range, uniqueId} = lodash;

const TableSelect = _AdvancedSelect.Table.Field;

const BaseExample = () => {
    return (
        <Content
            col={2}
            list={[
                {
                    label: "多选",
                    content: (
                        <TableSelect
                            defaultValue={[1]}
                            getSearchProps={(text) => {
                                return {
                                    data: {keyword: text},
                                };
                            }}
                            api={{
                                data: {
                                    perPage: 10,
                                },
                                loader: ({data}) => {
                                    const params = Object.assign(
                                        {
                                            perPage: 20,
                                            currentPage: 1,
                                        },
                                        data
                                    );
                                    return new Promise((resolve) => {
                                        setTimeout(() => {
                                            const start = (params.currentPage - 1) * params.perPage;
                                            resolve({
                                                totalCount: 100,
                                                pageData: range(start, start + params.perPage)
                                                    .map((key) => {
                                                        return {
                                                            label: `员工${key + 1}`,
                                                            company: "北京科技有限公司",
                                                            department: "技术部",
                                                            value: key + 1,
                                                        };
                                                    })
                                                    .filter(({label}) => {
                                                        return params.keyword
                                                            ? label.indexOf(params.keyword) > -1
                                                            : true;
                                                    }),
                                            });
                                        }, 1000);
                                    });
                                },
                            }}
                            columns={[
                                {
                                    title: "姓名",
                                    dataIndex: "label",
                                },
                                {
                                    title: "所属公司",
                                    dataIndex: "company",
                                },
                                {
                                    title: "所属部门",
                                    dataIndex: "department",
                                },
                            ]}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
                {
                    label: "单选",
                    content: (
                        <TableSelect
                            single
                            defaultValue={1}
                            api={{
                                loader: () => {
                                    return {
                                        pageData: [
                                            {
                                                label: "用户一",
                                                company: "北京科技有限公司",
                                                department: "财务部",
                                                value: 1,
                                            },
                                            {
                                                label: "用户二",
                                                company: "北京科技有限公司",
                                                department: "技术部",
                                                value: 2,
                                            },
                                            {
                                                label: "用户三",
                                                company: "北京科技有限公司",
                                                department: "商务部",
                                                value: 3,
                                            },
                                        ],
                                    };
                                },
                            }}
                            columns={[
                                {
                                    title: "姓名",
                                    dataIndex: "label",
                                },
                                {
                                    title: "所属公司",
                                    dataIndex: "company",
                                },
                                {
                                    title: "所属部门",
                                    dataIndex: "department",
                                },
                            ]}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
                {
                    label: "多选modal",
                    content: (
                        <TableSelect
                            defaultValue={[1]}
                            isPopup={false}
                            getSearchProps={(text) => {
                                return {
                                    data: {keyword: text},
                                };
                            }}
                            api={{
                                data: {
                                    perPage: 10,
                                },
                                loader: ({data}) => {
                                    const params = Object.assign(
                                        {
                                            perPage: 20,
                                            currentPage: 1,
                                        },
                                        data
                                    );
                                    return new Promise((resolve) => {
                                        setTimeout(() => {
                                            const start = (params.currentPage - 1) * params.perPage;
                                            resolve({
                                                totalCount: 100,
                                                pageData: range(start, start + params.perPage)
                                                    .map((key) => {
                                                        return {
                                                            label: `员工${key + 1}`,
                                                            company: "北京科技有限公司",
                                                            department: "技术部",
                                                            value: key + 1,
                                                        };
                                                    })
                                                    .filter(({label}) => {
                                                        return params.keyword
                                                            ? label.indexOf(params.keyword) > -1
                                                            : true;
                                                    }),
                                            });
                                        }, 1000);
                                    });
                                },
                            }}
                            columns={[
                                {
                                    title: "姓名",
                                    dataIndex: "label",
                                },
                                {
                                    title: "所属公司",
                                    dataIndex: "company",
                                },
                                {
                                    title: "所属部门",
                                    dataIndex: "department",
                                },
                            ]}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
                {
                    label: "单选modal",
                    content: (
                        <TableSelect
                            single
                            isPopup={false}
                            defaultValue={1}
                            api={{
                                loader: () => {
                                    return {
                                        pageData: [
                                            {
                                                label: "用户一",
                                                company: "北京科技有限公司",
                                                department: "财务部",
                                                value: 1,
                                            },
                                            {
                                                label: "用户二",
                                                company: "北京科技有限公司",
                                                department: "技术部",
                                                value: 2,
                                            },
                                            {
                                                label: "用户三",
                                                company: "北京科技有限公司",
                                                department: "商务部",
                                                value: 3,
                                            },
                                        ],
                                    };
                                },
                            }}
                            columns={[
                                {
                                    title: "姓名",
                                    dataIndex: "label",
                                },
                                {
                                    title: "所属公司",
                                    dataIndex: "company",
                                },
                                {
                                    title: "所属部门",
                                    dataIndex: "department",
                                },
                            ]}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
            ]}
        />
    );
};

render(
    <PureGlobal>
        <div className="input">
            <BaseExample/>
        </div>
    </PureGlobal>
);

```

- 地址选择组件
- 展示地址选择组件
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content),antd(antd),lodash(lodash)

```jsx
const {AddressSelect: _AddressSelect, AddressInput: _AddressInput} =
    _FormInfo;
const {PureGlobal} = global;
const {Space, Button} = antd;
const {default: Content} = _Content;
const {range, uniqueId} = lodash;

const AddressSelect = _AddressSelect.Field;
const AddressEnum = _AddressSelect.AddressEnum;
const AddressInput = _AddressInput.Field;

const BaseExample = () => {
    return (
        <Content
            col={2}
            list={[
                {
                    label: "多选",
                    content: (
                        <AddressSelect
                            maxLength={3}
                            defaultValue={["110"]}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
                {
                    label: "单选",
                    content: (
                        <AddressSelect
                            single
                            defaultValue={"110"}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
                {
                    label: "modal多选",
                    content: (
                        <AddressSelect
                            maxLength={3}
                            isPopup={false}
                            defaultValue={["110"]}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
                {
                    label: "modal单选",
                    content: (
                        <AddressSelect
                            isPopup={false}
                            single
                            defaultValue={"110"}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
                {
                    label: "valueType为all",
                    content: (
                        <AddressSelect
                            valueType="all"
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
                {
                    label: "地址显示",
                    content: <AddressEnum name="270070"/>,
                },
                {
                    label: "显示父级",
                    content: <AddressEnum name="270070" displayParent/>,
                },
                {
                    label: "地址输入",
                    content: (
                        <AddressInput
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
            ]}
        />
    );
};

render(
    <PureGlobal preset={{locale: "en-US"}}>
        <div className="input">
            <BaseExample/>
        </div>
    </PureGlobal>
);

```

- 级联选择组件
- 展示级联选择组件
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content),lodash(lodash)

```jsx
const {Cascader: _Cascader} = _FormInfo;
const {PureGlobal} = global;
const {default: Content} = _Content;

const {range, get} = lodash;

const Cascader = _Cascader.Field;

const BaseExample = () => {
    return (
        <Content
            col={2}
            list={[
                {
                    label: "一次性获取数据",
                    content: (
                        <Cascader
                            onlyAllowLastLevel
                            single
                            api={{
                                loader: async () => {
                                    return new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve([
                                                {
                                                    id: "client",
                                                    value: "client",
                                                    type: "module",
                                                    name: "客户",
                                                    label: "客户",
                                                    children: [
                                                        {
                                                            id: "client-list",
                                                            value: "client-list",
                                                            type: "feature",
                                                            name: "客户列表页",
                                                            label: "客户列表页",
                                                        },
                                                        {
                                                            id: "client-detail",
                                                            value: "client-detail",
                                                            type: "module",
                                                            name: "客户详情页",
                                                            label: "客户详情页",
                                                            children: [
                                                                {
                                                                    id: "contract",
                                                                    value: "contract",
                                                                    type: "module",
                                                                    name: "合同信息",
                                                                    label: "合同信息",
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            id: "client-form",
                                                            value: "client-form",
                                                            type: "feature",
                                                            name: "客户表单",
                                                            label: "客户表单",
                                                            children: [
                                                                {
                                                                    id: "taxpayerIdNumber",
                                                                    value: "taxpayerIdNumber",
                                                                    type: "feature",
                                                                    name: "税号",
                                                                    label: "税号",
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                                {
                                                    id: "position",
                                                    value: "position",
                                                    type: "module",
                                                    name: "职位",
                                                    label: "职位",
                                                    children: [
                                                        {
                                                            id: "position-list",
                                                            value: "position-list",
                                                            type: "feature",
                                                            name: "职位列表页",
                                                            label: "职位列表页",
                                                        },
                                                        {
                                                            id: "position-detail",
                                                            value: "position-detail",
                                                            type: "module",
                                                            name: "职位详情页",
                                                            label: "职位详情页",
                                                        },
                                                        {
                                                            id: "position-form",
                                                            value: "position-form",
                                                            type: "feature",
                                                            name: "职位表单",
                                                            label: "职位表单",
                                                            children: [
                                                                {
                                                                    id: "industry",
                                                                    value: "industry",
                                                                    type: "feature",
                                                                    name: "行业",
                                                                    label: "行业",
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ]);
                                        }, 1000);
                                    });
                                },
                            }}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
                {
                    label: "分层加载数据",
                    content: (
                        <Cascader
                            openLoadData
                            onSearch={async (searchText) => {
                                return range(0, 20).map((key) => {
                                    const parentId = "2";
                                    return {
                                        id: `${parentId ? `${parentId}-` : ""}${key + 1}`,
                                        label: `节点-${searchText}-${
                                            parentId ? `${parentId}-` : ""
                                        }${key + 1}`,
                                        parentId,
                                    };
                                });
                            }}
                            api={{
                                loader: async ({data}) => {
                                    const parentId = get(data, "id", "");
                                    const level = parentId.split("-").length;
                                    console.log("loadData", parentId, level);
                                    return new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve(
                                                range(0, 20).map((key) => {
                                                    return Object.assign(
                                                        {
                                                            id: `${parentId ? `${parentId}-` : ""}${key + 1}`,
                                                            label: `节点-${parentId ? `${parentId}-` : ""}${
                                                                key + 1
                                                            }`,
                                                            parentId,
                                                        },
                                                        level >= 3 ? {children: null} : {}
                                                    );
                                                })
                                            );
                                        }, 1000);
                                    });
                                },
                            }}
                        />
                    ),
                },
                {
                    label: "modal分层加载数据",
                    content: (
                        <Cascader
                            openLoadData
                            isPopup={false}
                            api={{
                                loader: async ({data}) => {
                                    const parentId = get(data, "id", "");
                                    const level = parentId.split("-").length;
                                    console.log("loadData", parentId, level);
                                    return new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve(
                                                range(0, 20).map((key) => {
                                                    return Object.assign(
                                                        {
                                                            id: `${parentId ? `${parentId}-` : ""}${key + 1}`,
                                                            label: `节点-${parentId ? `${parentId}-` : ""}${
                                                                key + 1
                                                            }`,
                                                            parentId,
                                                        },
                                                        level >= 3 ? {children: null} : {}
                                                    );
                                                })
                                            );
                                        }, 1000);
                                    });
                                },
                            }}
                        />
                    ),
                },
            ]}
        />
    );
};

render(
    <PureGlobal>
        <div className="input">
            <BaseExample/>
        </div>
    </PureGlobal>
);

```

- 职能选择
- 展示行业职能选择
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content),lodash(lodash)

```jsx
const {FunctionSelect: _FunctionSelect} = _FormInfo;
const {PureGlobal} = global;
const {default: Content} = _Content;

const {range, get} = lodash;

const FunctionSelect = _FunctionSelect.Field;

const BaseExample = () => {
    return (
        <Content
            col={2}
            list={[
                {
                    label: "职能选择",
                    content: (
                        <FunctionSelect
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
                {
                    label: "modal职能选择",
                    content: (
                        <FunctionSelect
                            isPopup={false}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
                {
                    label: "职能选择无搜索",
                    content: (
                        <FunctionSelect
                            search={null}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
                {
                    label: "职能枚举显示",
                    content: <FunctionSelect.Enum name="001"/>,
                },
            ]}
        />
    );
};

render(
    <PureGlobal preset={{locale: "en-US"}}>
        <div className="input">
            <BaseExample/>
        </div>
    </PureGlobal>
);

```

- 行业选择
- 展示行业选择组件
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content),lodash(lodash)

```jsx
const {IndustrySelect: _IndustrySelect} = _FormInfo;
const {PureGlobal} = global;
const {default: Content} = _Content;

const {range, get} = lodash;

const IndustrySelect = _IndustrySelect.Field;

const BaseExample = () => {
    return (
        <Content
            col={2}
            list={[
                {
                    label: "行业选择",
                    content: (
                        <IndustrySelect
                            defaultValue={["001"]}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
                {
                    label: "modal行业选择",
                    content: (
                        <IndustrySelect
                            isPopup={false}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
                {
                    label: "职能枚举显示",
                    content: <IndustrySelect.Enum name="004"/>,
                },
            ]}
        />
    );
};

render(
    <PureGlobal preset={{locale: "en-US"}}>
        <div className="input">
            <BaseExample/>
        </div>
    </PureGlobal>
);

```

- 金额输入
- 展示金额输入组件
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content)

```jsx
const {MoneyInput: _MoneyInput} = _FormInfo;
const {PureGlobal} = global;
const {default: Content} = _Content;

const MoneyInput = _MoneyInput.Field;

const BaseExample = () => {
    return (
        <Content
            col={2}
            list={[
                {
                    label: "金额输入",
                    content: <MoneyInput/>,
                },
            ]}
        />
    );
};

render(
    <PureGlobal>
        <div className="input">
            <BaseExample/>
        </div>
    </PureGlobal>
);

```

- 电话号码输入
- 展示电话号码输入组件
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content)

```jsx
const {PhoneNumber: _PhoneNumber} = _FormInfo;
const {PureGlobal} = global;
const {default: Content} = _Content;

const PhoneNumber = _PhoneNumber.Field;

const BaseExample = () => {
    return (
        <Content
            col={2}
            list={[
                {
                    label: "电话输入",
                    content: (
                        <PhoneNumber
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
            ]}
        />
    );
};

render(
    <PureGlobal>
        <div className="input">
            <BaseExample/>
        </div>
    </PureGlobal>
);

```

- 薪资组件
- 展示填写薪资范围输入组件
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content)

```jsx
const {SalaryInput, Form} = _FormInfo;
const {PureGlobal} = global;
const {default: Content} = _Content;

const SalaryInputField = SalaryInput.Field;

const BaseExample = () => {
    return (
        <div>
            <Content
                col={1}
                list={[
                    {
                        label: "薪资范围",
                        content: (
                            <SalaryInputField
                                onChange={(value) => {
                                    console.log(value);
                                }}
                            />
                        ),
                    },
                ]}
            />
            <Form
                rules={{
                    SALARYRANGE: ({min, max, type}) => {
                        if (type !== 1) {
                            if (!min || !max) {
                                return {
                                    result: false,
                                    errMsg: `${!min ? "最低薪资" : "最高薪资"}不能为空`,
                                };
                            }
                            if (min > max) {
                                return {
                                    result: false,
                                    errMsg: "最高薪资应大于最低薪资",
                                };
                            }
                        }
                        return {
                            result: true,
                            errMsg: "",
                        };
                    },
                }}
                data={{salaryRange: {type: 5, month: 12}}}
            >
                <SalaryInput
                    name="salaryRange"
                    label="薪资范围"
                    rule="REQ SALARYRANGE"
                    showMonth
                    remindUnit
                />
            </Form>
        </div>
    );
};

render(
    <PureGlobal>
        <div className="input">
            <BaseExample/>
        </div>
    </PureGlobal>
);

```

- 可编辑的表格表单
- 可编辑的表格表单
- _FormInfo(@components/FormInfo),global(@components/Global),_Content(@components/Content),antd(antd)

```jsx
const {TableInput, Form, Input, SubmitButton} = _FormInfo;
const {PureGlobal} = global;
const {default: Content} = _Content;

const BaseExample = () => {
    return (
        <div>
            <Form
                data={{
                    tableInput: {
                        1: {otherCode: "111"},
                        2: {otherCode: "222"},
                    },
                }}
                onSubmit={(formData) => {
                    console.log(formData);
                }}
            >
                <TableInput
                    controllerOpen={false}
                    name="tableInput"
                    label="表格表单"
                    columns={[
                        {
                            title: "系统字段",
                            dataIndex: "systemCode",
                            key: "systemCode",
                            width: 200,
                        },
                        {
                            title: "对应的字段",
                            dataIndex: "otherCode",
                            key: "otherCode",
                            editable: (text, record, index) => index !== 0,
                            field: {
                                type: Input,
                                rule: "REQ",
                                getValue: (e) => e.target.value,
                            },
                        },
                    ]}
                    api={{
                        loader: () => {
                            return {
                                pageData: [
                                    {
                                        id: 1,
                                        systemCode: "流水号",
                                    },
                                    {
                                        id: 2,
                                        systemCode: "流水号2",
                                    },
                                ],
                            };
                        },
                    }}
                    onChange={(value) => {
                        console.log(value);
                    }}
                />
                <SubmitButton>提交</SubmitButton>
            </Form>
        </div>
    );
};

render(
    <PureGlobal>
        <div className="input">
            <BaseExample/>
        </div>
    </PureGlobal>
);

```

- 可扩展的AdvanceSelect
- AdvanceSelect支持左右布局
- _FormInfo(@components/FormInfo),icon(@components/Icon),_antd(antd),global(@components/Global),_lodash(lodash),_dayjs(
  dayjs)

```jsx
const {AdvancedSelect} = _FormInfo;
const {PureGlobal} = global;
const {default: Icon} = icon;
const {useState} = React;
const {range, merge, get} = _lodash;
const dayjs = _dayjs;
const {Col} = _antd;

const BaseExample = () => {
    return (
        <PureGlobal
            preset={{
                ajax: () => {
                    return Promise.resolve({data: {code: 0, data: []}});
                },
            }}
        >
            <AdvancedSelect.Field
                getSearchProps={(text) => {
                    return {
                        data: {keyword: text},
                    };
                }}
                displayItems={[{label: "第九十项", value: 90}]}
                api={{
                    loader: ({data}) => {
                        const params = Object.assign(
                            {
                                perPage: 20,
                                currentPage: 1,
                            },
                            data
                        );
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                const start = (params.currentPage - 1) * params.perPage;
                                resolve({
                                    totalCount: 100,
                                    pageData: range(start, start + 20)
                                        .map((key) => {
                                            return {
                                                label: `第${key + 1}项`,
                                                value: key + 1,
                                            };
                                        })
                                        .filter(({label}) => {
                                            return params.keyword
                                                ? label.indexOf(params.keyword) > -1
                                                : true;
                                        }),
                                });
                            }, 1000);
                        });
                    },
                }}
                onChange={(value) => {
                    console.log(value);
                }}
                single
                isPopup={false}
                label={"面试官"}
                placeholder={"选择面试官"}
                modalSize={"large"}
                wrapClassName={"calendar-modal"}
                selectIcon={
                    <div>
                        <Icon type={"icon-gouxuan"}/>
                    </div>
                }
                leftSpan={6}
                right={() => (
                    <Col flex={1}>
                        <div>我是header</div>
                        <div>我是body</div>
                    </Col>
                )}
                leftBottom={() => <div>我是leftBottom</div>}
            />
        </PureGlobal>
    );
};
render(<BaseExample/>);

```

### API

| 属性名          | 说明 | 类型 | 默认值 |
|--------------|----|----|-----|
| data         |    |    |     |
| debug        |    |    |     |
| rules        |    |    |     |
| interceptors |    |    |     |
| noFilter     |    |    |     |
| onError      |    |    |     |
| onSubmit     |    |    |     |
| onPrevSubmit |    |    |     |

### SelectInnerInput

### formModule

### FormInfo

### preset

### List

### Form

同default导出组件

### useField

### useReset

### useSubmit

### Group

### GroupList

### useFormContext

### RULES

### interceptors

### SubmitButton

### CancelButton

### ResetButton

### Field类型:antd组件

以下组件请参考antd具体的组件文档此处不再赘述

Checkbox,CheckboxGroup,DatePicker,Input,InputNumber,RadioGroup,Select,Switch,TextArea,TimePicker,TreeSelect

### Field类型:@kne/react-form-antd实现组件

DatePickerToday

### Field类型:components-core实现组件

AddressSelect

AdvancedSelect

Avatar

Cascader

FunctionSelect

IndustrySelect

Money

PartSelect

PhoneNumber

TableDataSelect

Upload

### FormModal

一个Form和Modal组合起来的组件，它预置了Form组件，children传入的内容和footer区域均在Form的context内

| 属性名       | 说明        | 类型     | 默认值 |
|-----------|-----------|--------|-----|
| formProps | 同Form组件参数 | object | -   |

### useFormModal

获取一个执行后可以弹出一个FormModal组件的方法

#### return:formModal

| 属性名       | 说明                                    | 类型       |
|-----------|---------------------------------------|----------|
| formModal | 执行后可以弹出一个FormModal弹窗，参数同FormModal组件参数 | function |

### FormModalButton

点击以后可以执行获取数据，在数据未返回时按钮展示为loading状态，数据返回后弹出FormModal弹窗

| 属性名        | 说明                                                    | 类型                                     | 默认值 |
|------------|-------------------------------------------------------|----------------------------------------|-----|
| api        | @kne/react-fetch 所需参数                                 | object                                 | -   |
| modalProps | 同FormModal参数,当它为function时，执行function后返回的值作为modalProps | object,function({data,fetchApi,close}) | -   |

其他参数同antd Button 组件

---

# Global

### 概述

### 何时使用

在使用components-core的任何组件的业务系统，需要将该组件放置于最外层，并且按照要求正确设置preset。

以下是components-core组件系统中需要设置的preset值，及使用这些值的组件

| 名称                | 说明                                                          | 类型       | 使用组件                            |
|-------------------|-------------------------------------------------------------|----------|---------------------------------|
| permissions       | 配置功能权限列表，Permissions根据该列表里面是否存在某权限名称判断用户是否具有该功能权限，来控制对应操作行为 | array    | Permissions                     |
| ajax              | 用于发送ajax请求的方法，一般情况下其应该是一个axios对象                            | object   | Image                           |
| apis              | 用于和后端进行一些交互行为的接口集合                                          | object   | Image                           |
| apis.oss          | 用于通过一个ossId向后端oss服务获取一个可以访问到指定文件的url                        | object   | Image                           |
| apis.ossUpload    | 用于向oss服务上传一个文件                                              | object   | FormInfo.Upload,FormInfo.Avatar |
| features          | 用于配置系统的特性参数                                                 | object   | Features                        |
| features.profile  | 系统的特性列表参考组件Features                                         | object   | Features                        |
| features.debug    | 特性的调试模式，可以在控制台打印Features的id和状态                              | boolean  | Features                        |
| enums             | 公共枚举值，详情参看Enum组件                                            | object   | Enum                            |
| enums.helperGuide | 帮助文档枚举配置                                                    | function | HelperGuide                     |
| formInfo          | 表单配置                                                        | object   | FormInfo.formModule             |
| formInfo.rules    | 表单规则配置                                                      | object   | FormInfo.formModule             |

全局context管理设置及默认样式

* 请将全局覆盖性的样式放在此组件中
* 请将字体文件的引用放在此组件中
* 请将antd的覆盖性样式放在此组件中
* 该组件需要放置在应用根位置

更新字体文件:

* 将iconfont上下载的字体包解压后放在public文件夹下面
* 更新src/common/params.js 中的变量 iconfontBase
* 修改后构建该项目发布到对应环境

### 示例

#### 示例样式

```scss
.label {
  font-weight: bold;
}
```

#### 示例代码

- 基本示例
- 展示了文字大小颜色行高的设置
- _Global(@components/Global),antd(antd)

```jsx
const {PureGlobal} = _Global;
const {Space, Divider} = antd;
const BaseExample = () => {
    return (
        <PureGlobal>
            <Space direction="vertical">
                <div className="label">文字大小:</div>
                <div style={{fontSize: 'var(--font-size-large)'}}>大号文字</div>
                <div>默认大小文字</div>
                <div style={{fontSize: 'var(--font-size-small)'}}>小号文字</div>
                <Divider/>
                <div className="label">文字颜色:</div>
                <div style={{color: 'var(--font-color)'}}>默认颜色</div>
                <div style={{color: 'var(--font-color-grey)'}}>灰色</div>
                <div style={{color: 'var(--font-color-grey-1)'}}>灰色1</div>
                <div style={{color: 'var(--font-color-grey-2)'}}>灰色2</div>
                <Divider/>
                <div className="label">行高:</div>
                <div style={{lineHeight: 'var(--line-height-large)'}}>
                    宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高宽松行高
                </div>
                <div>
                    默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高默认行高
                </div>
                <div style={{lineHeight: 'var(--line-height-small)'}}>
                    紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高紧凑行高
                </div>
            </Space>
        </PureGlobal>
    );
};

render(<BaseExample/>);

```

- 警告提示
- 展示了警告提示的覆盖样式
- _Global(@components/Global),antd(antd),icon(@components/Icon)

```jsx
const {PureGlobal} = _Global;
const {Alert, Space} = antd;
const {default: Icon} = icon;

const BasicExample = () => {
    return (
        <PureGlobal>
            <Space direction="vertical">
                <Alert message="这是一条操作成功的状态反馈" type="success" showIcon/>
                <Alert message="这是一条普通的信息说明" type="info" showIcon/>
                <Alert message="这是一条提示信息" type="warning" showIcon/>
                <Alert message="这是一条请求失败的状态反馈" type="error" showIcon/>
                <Alert
                    message="这是一条警示信息"
                    type="error"
                    showIcon
                    icon={<Icon colorful type="icon-color-caisejingshi"/>}
                />

                <Alert
                    message="这是一条操作成功的状态反馈"
                    description="提示提示提示提示提示提示提示提示提示"
                    type="success"
                    showIcon
                />
                <Alert
                    message="这是一条普通的信息说明"
                    description="提示提示提示提示提示提示提示提示提示"
                    type="info"
                    showIcon
                />
                <Alert
                    message="这是一条提示信息"
                    description="提示提示提示提示提示提示提示提示提示"
                    type="warning"
                    showIcon
                />
                <Alert
                    message="这是一条请求失败的状态反馈"
                    description="提示提示提示提示提示提示提示提示提示"
                    type="error"
                    showIcon
                />
                <Alert
                    message="这是一条警示信息"
                    description="提示提示提示提示提示提示提示提示提示"
                    type="error"
                    showIcon
                    icon={<Icon colorful type="icon-color-caisejingshi"/>}
                />

                <Alert
                    message="这是一条操作成功的状态反馈"
                    description="提示提示提示提示提示提示提示提示提示"
                    type="success"
                    showIcon
                    closable
                />
                <Alert
                    message="这是一条普通的信息说明"
                    description="提示提示提示提示提示提示提示提示提示"
                    type="info"
                    showIcon
                    closable
                />
                <Alert
                    message="这是一条提示信息"
                    description="提示提示提示提示提示提示提示提示提示"
                    type="warning"
                    showIcon
                    closable
                />
                <Alert
                    message="这是一条请求失败的状态反馈"
                    description="提示提示提示提示提示提示提示提示提示"
                    type="error"
                    showIcon
                    closable
                />
                <Alert
                    message="这是一条警示信息"
                    description="提示提示提示提示提示提示提示提示提示"
                    type="error"
                    showIcon
                    closable
                    icon={<Icon colorful type="icon-color-caisejingshi"/>}
                />
            </Space>
        </PureGlobal>
    );
};

render(<BasicExample/>);

```

- 按钮
- 展示了按钮的覆盖样式
- _Global(@components/Global),antd(antd),icon(@components/Icon)

```jsx
const {PureGlobal} = _Global;
const {Button, Typography, Space} = antd;
const {default: Icon} = icon;

const BaseExample = () => {
    return (
        <PureGlobal>
            <Space direction="vertical">
                <Space>
                    <Button size="large">大按钮</Button>
                    <Button>默认按钮</Button>
                    <Button size="small">小按钮</Button>
                </Space>
                <Space>
                    <Button type="primary">按钮</Button>
                    <Button type="link">按钮</Button>
                    <Button type="text">按钮</Button>
                </Space>
                <Space>
                    <Button danger>危险按钮</Button>
                    <Button type="primary" danger>
                        危险按钮
                    </Button>
                    <Button type="link" danger>
                        危险按钮
                    </Button>
                    <Button type="text" danger>
                        危险按钮
                    </Button>
                </Space>
                <Space>
                    <Button disabled>禁用按钮</Button>
                    <Button type="primary" danger disabled>
                        禁用危险按钮
                    </Button>
                    <Button type="link" disabled>
                        禁用Link按钮
                    </Button>
                    <Button type="text" disabled>
                        禁用Text按钮
                    </Button>
                </Space>
                <Space>
                    <Button type="text" icon={<Icon type="icon-tianjia"/>}>
                        图标按钮
                    </Button>
                    <Button type="text">
                        图标按钮右
                        <Icon type="icon-arrow-thin-down"/>
                    </Button>
                </Space>
                <Space>
                    <Button type="primary" icon={<Icon type="icon-tianjia"/>}/>
                    <Button icon={<Icon type="icon-tianjia"/>}/>
                    <Button danger icon={<Icon type="icon-tianjia"/>}/>
                    <Button type="link" icon={<Icon type="icon-tianjia"/>}/>
                    <Button type="text" icon={<Icon type="icon-tianjia"/>}/>
                </Space>
                <Space>
                    <Button type="primary" disabled icon={<Icon type="icon-tianjia"/>}/>
                    <Button disabled icon={<Icon type="icon-tianjia"/>}/>
                    <Button disabled danger icon={<Icon type="icon-tianjia"/>}/>
                    <Button disabled type="link" icon={<Icon type="icon-tianjia"/>}/>
                    <Button disabled type="text" icon={<Icon type="icon-tianjia"/>}/>
                </Space>
                <Space>
                    <Typography.Link>Link文字</Typography.Link>
                    <Typography.Text className="ant-btn">文字</Typography.Text>
                    <Typography.Link>
                        <Icon type="icon-tianjia"/>
                        Link文字
                    </Typography.Link>
                    <Typography.Text className="ant-btn">
                        <Icon type="icon-tianjia"/>
                        文字
                    </Typography.Text>
                    <Typography.Link className="ant-btn-dangerous">
                        Link文字
                    </Typography.Link>
                </Space>
                <Space>
                    <Button className="btn-no-padding" type="link" size="large">
                        大按钮
                    </Button>
                    <Button className="btn-no-padding" type="link">
                        默认按钮
                    </Button>
                    <Button className="btn-no-padding" type="link" size="small">
                        小按钮
                    </Button>
                    <Button className="btn-no-padding" type="text" size="large">
                        大按钮
                    </Button>
                    <Button className="btn-no-padding" type="text">
                        默认按钮
                    </Button>
                    <Button className="btn-no-padding" type="text" size="small">
                        小按钮
                    </Button>
                    <Button className="btn-no-padding" type="link" size="large" danger>
                        大按钮
                    </Button>
                    <Button className="btn-no-padding" type="link" danger>
                        默认按钮
                    </Button>
                    <Button className="btn-no-padding" type="link" size="small" danger>
                        小按钮
                    </Button>
                </Space>
            </Space>
        </PureGlobal>
    );
};

render(<BaseExample/>);

```

- 无边框标签
- 展示了无边框标签
- _Global(@components/Global),antd(antd)

```jsx
const {PureGlobal} = _Global;
const {Tag, Space} = antd;

const BasicExample = () => {
    return (
        <PureGlobal>
            <Space>
                <Tag className="no-border" closable>
                    标签1
                </Tag>
                <Tag className="no-border" closable>
                    标签2
                </Tag>
                <Tag className="no-border" closable>
                    标签3
                </Tag>
            </Space>
        </PureGlobal>
    );
};

render(<BasicExample/>);

```

### API

| 属性名        | 说明                                           | 类型       | 默认值 |
|------------|----------------------------------------------|----------|-----|
| preset     | 全局预设参数，可以通过usePreset获取，由业务系统设置               | object   | {}  |
| themeToken | 设置主题，参看antd的themeToken，一般只需要设置{colorPrimary} | object   | {}  |
| init       | 初始化方法，在系统首次加载时执行，可以返回Promise。用来放置系统显示之前的异步操作 | function | -   |

### PureGlobal

api同Global，但是少了页面错误捕获和className:container-body带来的默认最小宽度等样式设置，主要用在组件库的演示环境和弹窗中

### usePreset

获取预设的preset，已经确定为系统需要使用的key值:permissions,apis,formOptions,modalOptions

### useGlobalContext

获取和设置全局状态，该状态保存在Global组件一级，不会随着内部组件本身的销毁而销毁。
主要给组件内部使用，业务应该避免使用该api设置新的global变量。业务如果有需要应当自行在顶级组件中设置context。

#### params:useGlobalContext(globalKey)

| 属性名       | 说明                                                                                                                           | 类型     | 默认值 |
|-----------|------------------------------------------------------------------------------------------------------------------------------|--------|-----|
| globalKey | 全局参数的key，当存在globalKey时，默认获取和设置都是global[key]，当不存在globalKey获取和设置的都是global，除非存在多个获取和设置global的key-value，否则不推荐直接使用不存在globalKey的情况 | string | -   |

#### return:{global,setGlobal}

| 属性名       | 说明           | 类型       |
|-----------|--------------|----------|
| global    | 当前的global值   | any      |
| setGlobal | 设置当前的global值 | function |

---

# HelperGuide

### 概述

给用户提供帮助文档

### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _HelperGuide(@components/HelperGuide),Global(@components/Global)

```jsx
const {default: HelperGuide} = _HelperGuide;
const {PureGlobal} = Global;
const BaseExample = () => {
    return (
        <PureGlobal
            preset={{
                enums: {
                    helperGuide: () => [
                        {
                            value: "test",
                            content:
                                "哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈",
                            url: "/xxxx",
                        },
                    ],
                },
            }}
        >
            <HelperGuide name="test"/>
        </PureGlobal>
    );
};

render(<BaseExample/>);

```

### API

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|

---

# Highlight

### 概述

用于显示文本高亮

### 示例

#### 示例代码

- 基本文字高亮
- 展示基本文字高亮
- _Highlight(@components/Highlight)

```jsx
const {default: Highlight, HighlightProvider} = _Highlight;
const BaseExample = () => {
    return (
        <HighlightProvider list={["哈", "呃呃"]}>
            <Highlight>哈哈哈西西西西呃呃呃</Highlight>
        </HighlightProvider>
    );
};

render(<BaseExample/>);

```

- xss测试
- xss测试
- _Highlight(@components/Highlight)

```jsx
const {default: Highlight, HighlightProvider} = _Highlight;
const BaseExample = () => {
    const str = '<img src="/aaaa"/>';
    return (
        <HighlightProvider list={["哈", "呃呃"]}>
            <Highlight>哈哈哈西西西西呃呃呃{str}</Highlight>
        </HighlightProvider>
    );
};

render(<BaseExample/>);

```

### API

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|

---

# HistoryStore

### 概述

历史记录提示

### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _HistoryStore(@components/HistoryStore),antd(antd)

```jsx
const {default: HistoryStore} = _HistoryStore;
const {Input} = antd;
const {useState} = React;
const BaseExample = () => {
    const [value, setValue] = useState("");
    return (
        <HistoryStore
            onSelect={(value) => {
                setValue(value);
            }}
        >
            {({appendHistory, openHistory}) => (
                <Input.Search
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    onFocus={openHistory}
                    onSearch={(value) => {
                        appendHistory({
                            value,
                            label: value,
                        });
                    }}
                />
            )}
        </HistoryStore>
    );
};

render(<BaseExample/>);

```

### API

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|

---

# Icon

### 概述

可以显示一个图标，图标必须在字体文件中被定义过

### 示例(全屏)

#### 示例样式

```scss
.item {
  width: 150px;
  word-break: break-all;

  .ant-typography {
    position: relative;
  }

  .ant-typography-copy {
    visibility: hidden;
    position: absolute;
    right: -20px;
  }

  &:hover {
    .ant-typography-copy {
      visibility: visible;
    }
  }
}
```

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Icon(@components/Icon),antd(antd),ReactFetch(@kne/react-fetch),Global(@components/Global),_axios(axios),remoteLoader(
  @kne/remote-loader)

```jsx
const {default: Icon} = _Icon;
const {Slider, Space, Typography} = antd;
const {useState} = React;
const {createWithFetch} = ReactFetch;
const {loadFont} = Global;
const {default: axios} = _axios;
const {createWithRemoteLoader} = remoteLoader;

const BaseExample = createWithRemoteLoader({
    modules: ["components-iconfont:Font"],
})(({remoteModules}) => {
    const [Font] = remoteModules;
    const [value, setValue] = useState(30);
    return (
        <Space direction="vertical">
            <Space>
                <div>调整大小:</div>
                <Slider
                    style={{width: 100}}
                    max={60}
                    min={12}
                    value={value}
                    onChange={setValue}
                />
                <div>{value}px</div>
            </Space>
            {
                <Font>
                    {({list}) => {
                        return (
                            <Space wrap align="top" size="large">
                                {list.map(({name, font_class}) => {
                                    return (
                                        <Space
                                            className="item"
                                            direction="vertical"
                                            align="center"
                                            key={name}
                                        >
                                            <Icon type={font_class} size={value}/>
                                            <Typography.Text
                                                copyable={{
                                                    text:
                                                        '<Icon type="' +
                                                        font_class +
                                                        '" size={' +
                                                        value +
                                                        "} />",
                                                }}
                                            >
                                                {font_class}
                                            </Typography.Text>
                                            <div>{name}</div>
                                        </Space>
                                    );
                                })}
                            </Space>
                        );
                    }}
                </Font>
            }
        </Space>
    );
});

render(<BaseExample/>);

```

- 这里填写示例标题
- 这里填写示例说明
- _Icon(@components/Icon),antd(antd),ReactFetch(@kne/react-fetch),Global(@components/Global),_axios(axios),remoteLoader(
  @kne/remote-loader)

```jsx
const {default: Icon} = _Icon;
const {Space, Slider, Typography} = antd;
const {useState} = React;
const {createWithFetch} = ReactFetch;
const {createWithRemoteLoader} = remoteLoader;
const {default: axios} = _axios;

const BaseExample = createWithRemoteLoader({
    modules: ["components-iconfont:ColorfulFont"],
})(({remoteModules}) => {
    const [ColorfulFont] = remoteModules;
    const [value, setValue] = useState(30);
    return (
        <Space direction="vertical">
            <Space>
                <div>调整大小:</div>
                <Slider
                    style={{width: 100}}
                    max={60}
                    min={12}
                    value={value}
                    onChange={setValue}
                />
                <div>{value}px</div>
            </Space>
            <ColorfulFont>
                {({list}) => (
                    <Space wrap align="top" size="large">
                        {list.map(({name}) => {
                            return (
                                <Space
                                    className="item"
                                    direction="vertical"
                                    align="center"
                                    key={name}
                                >
                                    <Icon colorful type={name} size={value}/>
                                    <Typography.Text
                                        copyable={{
                                            text:
                                                '<Icon colorful type="' +
                                                name +
                                                '" size={' +
                                                value +
                                                "} />",
                                        }}
                                    >
                                        {name}
                                    </Typography.Text>
                                </Space>
                            );
                        })}
                    </Space>
                )}
            </ColorfulFont>
        </Space>
    );
});

render(<BaseExample/>);

```

### API

| 属性名      | 说明             | 类型      | 默认值   |
|----------|----------------|---------|-------|
| type     | 图标类型，参考示例下的字符串 | string  | -     |
| colorful | 是否是彩色图标        | boolean | false |
| prefix   | 图标前缀           | string  | ""    |
| size     | 图标大小           | number  | -     |

---

# Image

### 概述

用于展示一张图片，和img标签不同的是，可以展示一张普通图片，也可以通过id加载一张oss图片，在加载oss地址和图片数据的时候会显示loading状态

### 示例

#### 示例代码

- 通过src加载一个普通图片
- 通过src加载一个普通图片
- _Image(@components/Image)

```jsx
const {default: Image} = _Image;
const BaseExample = () => {
    return <Image src={window.PUBLIC_URL + "/logo512.png"} style={{width: '100px', height: '100px'}}/>;
};

render(<BaseExample/>);

```

- 通过id加载一个oss图片
- 图片一加载成功，图片二加载中，图片三加载失败
- _Image(@components/Image),global(@components/Global),antd(antd)

```jsx
const {default: Image} = _Image;
const {PureGlobal} = global;
const {Space} = antd;
const BaseExample = () => {
    return <PureGlobal preset={{
        apis: {
            oss: {
                loader: ({params}) => {
                    if (params.id === 'logo513.png') {
                        return new Promise(() => {

                        });
                    }
                    return new Promise((resolve) => {
                        resolve(window.PUBLIC_URL + '/' + params.id);
                    });

                }
            }
        }
    }}>
        <Space>
            <Image id="logo512.png" style={{width: '100px', height: '100px'}}/>
            <Image id="logo513.png" style={{width: '100px', height: '100px'}}/>
            <Image id="logo511.png" style={{width: '100px', height: '100px'}}/>
        </Space>
    </PureGlobal>;
};

render(<BaseExample/>);

```

- 显示一个头像
- 显示图片头像和默认头像
- _Image(@components/Image),antd(antd)

```jsx
const {default: Image} = _Image;
const {Space} = antd;
const BaseExample = () => {
    return (
        <Space>
            <Image.Avatar src={window.PUBLIC_URL + "/avatar.png"} shape="circle"/>
            <Image.Avatar
                src={window.PUBLIC_URL + "/avatar.png"}
                shape="circle"
                size={80}
            />
            <Image.Avatar
                src={window.PUBLIC_URL + "/avatar.png"}
                shape="circle"
                size={50}
            />

            <Image.Avatar shape="circle"/>
            <Image.Avatar gender="M" shape="circle" size={80}/>
            <Image.Avatar gender="female" shape="circle" size={50}/>
            <Image.Avatar gender="m" shape="circle" size={50}/>
        </Space>
    );
};

render(<BaseExample/>);

```

### API

| 属性名     | 说明         | 类型     | 默认值 |
|---------|------------|--------|-----|
| src     | 图片的src地址   | string | -   |
| id      | oss的id     | string | -   |
| loading | 加载时显示的组件   | jsx    | -   |
| error   | 加载错误时显示的组件 | jsx    | -   |

### Image.Avatar

用antd的Avatar来显示图片，可以显示默认的男女头像，其他参数参考antd的Avatar组件

| 属性名    | 说明                  | 类型     | 默认值 |
|--------|---------------------|--------|-----|
| gender | 性别 F，female，f为女其他为男 | string | -   |

---

# InfoPage

### 概述

### 何时使用

一般用在复杂的详情展示页面，InfoPage提供了一个标准的展示信息的格式

### 特点

* 支持Content组件Descriptions组件的组合
* 支持Collapse组件组合
* InfoPage.Part 需要放在InfoPage之下，InfoPage.Collapse,Content,Descriptions 需要放在 InfoPage.Part之下

### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _InfoPage(@components/InfoPage),_Content(@components/Content),_Descriptions(@components/Descriptions),antd(antd)

```jsx
const {default: InfoPage} = _InfoPage;
const {default: Content} = _Content;
const {default: Descriptions} = _Descriptions;
const {Space, Button} = antd;
const BaseExample = () => {
    return (
        <InfoPage>
            <InfoPage.Part
                title="退票信息"
                subTitle="我是一个退票信息"
                extra={<Button>操作</Button>}
            >
                <Descriptions
                    dataSource={[
                        [
                            {label: "客户名称", content: "腾讯"},
                            {
                                label: "发票抬头",
                                content: "腾讯科技公司",
                            },
                        ],
                        [
                            {label: "发票类型", content: "增值税专用发票"},
                            {
                                label: "发票开具日期",
                                content: "2022-08-15",
                            },
                        ],
                        [{label: "退票金额", content: "22000.00元"}],
                        [
                            {
                                label: "发票号",
                                content: (
                                    <div>
                                        <div>00384895992774</div>
                                        <div>00384895992774</div>
                                        <div>00384895992774</div>
                                        <div>00384895992774</div>
                                    </div>
                                ),
                            },
                        ],
                        [
                            {label: "是否需要重开发票", content: "否"},
                            {
                                label: "是否涉及金融变动",
                                content: "否",
                            },
                        ],
                        [
                            {label: "是否造成实质损失", content: "否"},
                            {label: "责任归属", content: "客户原因"},
                        ],
                        [
                            {
                                label: "退票原因",
                                content: "退票原因的描述退票原因的描述退票原因的描",
                            },
                        ],
                        [{label: "附件", content: "附件名称"}],
                        [
                            {
                                label: "操作时间",
                                content: "2022-08-01 16:32",
                            },
                            {label: "操作人", content: "西西歪"},
                        ],
                    ]}
                />
            </InfoPage.Part>
            <InfoPage.Part title="开票信息">
                <Space direction="vertical" size={24}>
                    <Descriptions
                        dataSource={[
                            [{label: "客户名称", content: "腾讯"}],
                            [{label: "合同", content: "合同3"}],
                        ]}
                    />
                    <InfoPage.Part title="发票费用信息">
                        <Space direction="vertical">
                            <InfoPage.Collapse defaultActiveKey={["0", "1"]}>
                                <InfoPage.Collapse.Panel key="0" header="项目类型1">
                                    <Content
                                        labelAlign="auto"
                                        col={3}
                                        gutter={[0, 12]}
                                        list={[
                                            {label: "项目类型", content: "面试到岗"},
                                            {
                                                label: "费用类型",
                                                content: "服务费",
                                            },
                                            {label: "费用总金额", content: "10,000元"},
                                            {
                                                label: "本次支付费用比例",
                                                content: "30%",
                                            },
                                            {label: "本次支付费用金额", content: "3,000元"},
                                            {
                                                label: "开票候选人",
                                                content: "李小萌",
                                            },
                                        ]}
                                    />
                                </InfoPage.Collapse.Panel>
                                <InfoPage.Collapse.Panel key="1" header="项目类型2">
                                    <Content
                                        labelAlign="auto"
                                        col={3}
                                        gutter={[0, 12]}
                                        list={[
                                            {label: "项目类型", content: "面试到岗"},
                                            {
                                                label: "费用类型",
                                                content: "服务费",
                                            },
                                            {label: "费用总金额", content: "10,000元"},
                                            {
                                                label: "本次支付费用比例",
                                                content: "30%",
                                            },
                                            {label: "本次支付费用金额", content: "3,000元"},
                                            {
                                                label: "开票候选人",
                                                content: "李小萌",
                                            },
                                        ]}
                                    />
                                </InfoPage.Collapse.Panel>
                            </InfoPage.Collapse>
                            <Descriptions
                                dataSource={[
                                    [
                                        {label: "客户付税比例", content: "1%"},
                                        {
                                            label: "客户所付税金",
                                            content: "30元",
                                        },
                                    ],
                                    [
                                        {label: "服务费", content: "2886.29元"},
                                        {
                                            label: "发票增值税",
                                            content: "172.38元",
                                        },
                                    ],
                                    [{label: "发票金额", content: "22000.00元"}],
                                    [
                                        {
                                            label: "发票备注",
                                            content: "备注的内容备注的内容备注的内容备注的内容",
                                        },
                                    ],
                                ]}
                            />
                        </Space>
                    </InfoPage.Part>
                    <InfoPage.Part title="发票信息">
                        <Descriptions
                            dataSource={[
                                [{label: "付款信息", content: "ASB54492789374983798"}],
                                [
                                    {
                                        label: "发票收件人",
                                        content: "西西歪",
                                    },
                                ],
                                [{label: "附件", content: "附件名称"}],
                                [
                                    {
                                        label: "预计入职日期",
                                        content: "2022-08-15",
                                    },
                                ],
                            ]}
                        />
                    </InfoPage.Part>
                    <InfoPage.Part title="业绩分配">
                        <InfoPage.Collapse defaultActiveKey={["0", "1"]}>
                            <InfoPage.Collapse.Panel key="0" header="项目类型1">
                                <Content
                                    labelAlign="auto"
                                    col={3}
                                    gutter={[0, 12]}
                                    list={[
                                        {label: "分配用户", content: "王亚男"},
                                        {
                                            label: "分配比例",
                                            content: "40%",
                                        },
                                        {label: "分配金额", content: "1,200元"},
                                    ]}
                                />
                            </InfoPage.Collapse.Panel>
                            <InfoPage.Collapse.Panel key="1" header="项目类型2">
                                <Content
                                    labelAlign="auto"
                                    col={3}
                                    gutter={[0, 12]}
                                    list={[
                                        {label: "分配用户", content: "王亚男"},
                                        {
                                            label: "分配比例",
                                            content: "40%",
                                        },
                                        {label: "分配金额", content: "1,200元"},
                                    ]}
                                />
                            </InfoPage.Collapse.Panel>
                        </InfoPage.Collapse>
                    </InfoPage.Part>
                </Space>
            </InfoPage.Part>
        </InfoPage>
    );
};

render(<BaseExample/>);

```

### API

| 属性名      | 说明 | 类型  | 默认值 |
|----------|----|-----|-----|
| children | 内容 | jsx | -   |

### InfoPage.Part

| 属性名      | 说明   | 类型  | 默认值 |
|----------|------|-----|-----|
| title    | 标题   | jsx | -   |
| extra    | 额外内容 | jsx | -   |
| children | 内容   | jsx | -   |

### InfoPage.Collapse

| 属性名      | 说明 | 类型  | 默认值 |
|----------|----|-----|-----|
| children | 内容 | jsx | -   |

---

# Intl

### 概述

支持系统国际化

### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Intl(@components/Intl),global(@components/Global),antd(antd),localeEN(@components/Intl/doc/locale/en-US),localeCN(
  @components/Intl/doc/locale/zh-CN)

```jsx
const {FormattedMessage, IntlProvider} = _Intl;
const {PureGlobal} = global;
const {Select, Space} = antd;
const {default: en} = localeEN;
const {default: cn} = localeCN;
const {useState} = React;
const BaseExample = () => {
    const [locale, setLocale] = useState('zh-CN');
    return (<Space>
        <Select value={locale} onChange={setLocale}
                options={['zh-CN', 'en-US'].map(key => ({value: key, label: key}))}/>
        <PureGlobal
            preset={{
                locale
            }}
        >
            <IntlProvider locale={locale} importMessages={locale => {
                return {
                    default: {
                        'zh-CN': cn, 'en-US': en
                    }[locale]
                };
            }}>
                <FormattedMessage defaultMessage="按钮" id="ButtonText">
                    {text => <div>{text}</div>}
                </FormattedMessage>
            </IntlProvider>

        </PureGlobal>
    </Space>);
};

render(<BaseExample/>);

```

### API

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|

---

# Layout

### 概述

### 何时使用

每个登录后的系统页面都应该在Layout的框架之下，它定义了页面的基本框架。根据设计对于页面的不同要求，适当选择不同的组合

### 特点

Layout将整个页面划分成以下几个区域

1. 导航区
2. 内容区
3. 左菜单区
4. 右操作区
5. 页头区
6. 页头信息区
7. 页面标题区

通过给Page配置不同的参数实现不同区域的显示

### 注意

* Page的name参数必须要传，用来在页面跳转时确定Page是不是同一个，决定着Page是否走install周期
* Page组件的参数是通过Context保存在Layout中的，这样做的目的是为了让页面跳转时，除页面区以外的区域在前后俩页面差别不大的情况下走更新周期而不是install周期，以此带来更快的渲染速度避免不必要的重复安装和卸载
* 请尽量通过Page提供的参数来配置出设计要求的页面，不要自行用css实现，以便于Layout组件能从整体控制页面的基本形式和不同区域的padding和margin，让系统更加统一化标准化

### 示例(全屏)

#### 示例样式

```scss
.layout-content {
  color: #fff;
  background: var(--primary-color-4);
  height: 100%;
  text-align: center;
  line-height: 300px;
}

.with-title-layout-content {
  height: 100%;
  //height: calc(100% - 49px);
}

.layout-menu {
  background: #ff9c6e;
  color: #fff;
  height: 110vh;
  text-align: center;
  line-height: 300px;
}

.header {
  background: #ff9c6e;
  height: 100px;
  padding: 10px;
  color: #fff;
}

.right-options {
  background: var(--primary-color-4);
  height: 110vh;
  color: #fff;
}

.header-info {
  padding: 10px;
  height: 100px;
  background: var(--primary-color-4);
  color: #fff;
}
```

#### 示例代码

- 基础上下布局
- 展示最基础的上导航栏，下内容的布局
- _Layout(@components/Layout),global(@components/Global)

```jsx
const {default: Layout, Page} = _Layout;
const {PureGlobal} = global;
const BaseExample = () => {
    return (
        <PureGlobal
            preset={{
                enums: {
                    helperGuide: () => [
                        {
                            value: "base-detail",
                            content: "测试帮助文档",
                            url: "/",
                        },
                    ],
                },
            }}
        >
            <Layout navigation={{isFixed: false}}>
                <Page name="base" helperGuideName="base-detail">
                    <div className="layout-content">内容区</div>
                </Page>
            </Layout>
        </PureGlobal>
    );
};

render(<BaseExample/>);

```

- 带有左侧菜单布局
- 展示带有左侧菜单布局
- layout(@components/Layout),antd(antd),global(@components/Global)

```jsx
const {default: Layout, Page, Menu} = layout;
const {Button, Space} = antd;
const {PureGlobal} = global;

const Example = () => {
    return (
        <Layout navigation={{isFixed: false}}>
            <Page
                name="left-menu"
                menuFixed={false}
                menu={
                    <Menu
                        items={[
                            {
                                label: "父级标题1",
                                key: "p-0",
                                iconType: "icon-zhanghaodenglu",
                                children: [
                                    {
                                        label: "子标题1",
                                        key: "s-0",
                                        path: "/link1",
                                    },
                                    {
                                        label: "子标题2",
                                        key: "s-1",
                                        path: "/link2",
                                    },
                                ],
                            },
                            {
                                label: "父级标题2",
                                key: "p-1",
                                iconType: "icon-zhanghaodenglu",
                                children: [
                                    {
                                        label: "子标题1",
                                        key: "s-2",
                                        path: "/link3",
                                    },
                                    {
                                        label: "子标题2",
                                        key: "s-3",
                                        path: "/link4",
                                    },
                                ],
                            },
                            {
                                label: "父级标题3",
                                key: "p-2",
                                iconType: "icon-zhanghaodenglu",
                                path: "/link5",
                            },
                        ]}
                    />
                }
                titleExtra={
                    <Space>
                        <Button type="primary">新建</Button>
                    </Space>
                }
                backUrl={"/"}
                title="标题"
            >
                <div className="layout-content with-title-layout-content">内容区</div>
            </Page>
        </Layout>
    );
};

render(
    <PureGlobal>
        <Example/>
    </PureGlobal>
);

```

- 左侧固定带Header
- 展示带有header的左侧固定菜单布局
- layout(@components/Layout),antd(antd),global(@components/Global)

```jsx
const {default: Layout, Page} = layout;
const {Button, Space} = antd;
const {PureGlobal} = global;

const Example = () => {
    return (
        <Space className="container" direction="vertical">
            <Layout navigation={{isFixed: false}}>
                <Page
                    name="with-header"
                    helperGuideName="base-detail"
                    menu={<div className="layout-menu">左侧菜单区</div>}
                    titleExtra={
                        <Space>
                            <Button type="primary">新建</Button>
                        </Space>
                    }
                    title="标题"
                    hideCloseSvg={true}
                    headerHeight="40px"
                    menuFixed={false}
                    header={<div className="header">header</div>}
                    headerFixed={false}
                    headerInfo={<div className="header-info">header info区域</div>}
                >
                    <div>内容区</div>
                </Page>
            </Layout>
        </Space>
    );
};

render(
    <PureGlobal
        preset={{
            enums: {
                helperGuide: () => [
                    {
                        value: "base-detail",
                        content: "测试帮助文档",
                        url: "/",
                    },
                ],
            },
        }}
    >
        <Example/>
    </PureGlobal>
);

```

- 右侧固定
- 展示带有header的右侧固定菜单布局
- layout(@components/Layout),antd(antd),global(@components/Global)

```jsx
const {default: Layout, Page} = layout;
const {Button, Space} = antd;
const {PureGlobal} = global;

const Example = () => {
    return (
        <Layout navigation={{isFixed: false}}>
            <Page
                name="fix-right-menu"
                optionFixed={false}
                option={<div className="right-options">右侧操作区域</div>}
                optionFooter={
                    <Space>
                        <Button type="primary">新建</Button>
                    </Space>
                }
                titleExtra={
                    <Space>
                        <Button type="primary">新建</Button>
                    </Space>
                }
                title="标题"
                header={<div className="header">header</div>}
                headerFixed={false}
                menuFixed={false}
            >
                <div>内容区</div>
            </Page>
        </Layout>
    );
};

render(
    <PureGlobal>
        <Example/>
    </PureGlobal>
);

```

- 带有filter的列表页
- 展示带有filter的列表页
- layout(@components/Layout),antd(antd),global(@components/Global),filter(@components/Filter)

```jsx
const {default: Layout, Page} = layout;
const {
    InputFilterItem,
    CityFilterItem,
    AdvancedSelectFilterItem,
    UserFilterItem,
    FunctionSelectFilterItem,
    IndustrySelectFilterItem,
    getFilterValue,
} = filter;
const {useState} = React;
const {Space, Button} = antd;
const {PureGlobal} = global;
const BaseExample = () => {
    const [filter, setFilter] = useState([]);
    return (
        <PureGlobal preset={{}}>
            <Layout navigation={{isFixed: false}}>
                <Page
                    name="base"
                    helperGuideName="base-detail"
                    titleExtra={
                        <Space>
                            <Button type="primary">添加</Button>
                        </Space>
                    }
                    filter={{
                        extraExpand: (
                            <Button type="primary" size="small">
                                订阅筛选项
                            </Button>
                        ),
                        value: filter,
                        onChange: (value) => {
                            setFilter(value);
                            console.log(getFilterValue(value));
                        },
                        list: [
                            [
                                <InputFilterItem label="文字" name="text"/>,
                                <CityFilterItem label="城市" name="city"/>,
                                <AdvancedSelectFilterItem
                                    label="高级选择"
                                    name="select"
                                    api={{
                                        loader: () => {
                                            return {
                                                pageData: [
                                                    {label: "第一项", value: 1},
                                                    {label: "第二项", value: 2, disabled: true},
                                                    {
                                                        label: "第三项",
                                                        value: 3,
                                                    },
                                                ],
                                            };
                                        },
                                    }}
                                />,
                                <UserFilterItem
                                    label="用户选择"
                                    name="user"
                                    api={{
                                        loader: () => {
                                            return {
                                                pageData: [
                                                    {
                                                        label: "用户一",
                                                        value: 1,
                                                        description: "我是用户描述",
                                                    },
                                                    {
                                                        label: "用户二",
                                                        value: 2,
                                                        description: "我是用户描述",
                                                    },
                                                    {
                                                        label: "用户三",
                                                        value: 3,
                                                        description: "我是用户描述",
                                                    },
                                                ],
                                            };
                                        },
                                    }}
                                />,
                                <FunctionSelectFilterItem
                                    label="职能选择"
                                    name="function"
                                    onlyAllowLastLevel
                                    single
                                />,
                                <IndustrySelectFilterItem
                                    label="行业选择"
                                    name="industry"
                                    onlyAllowLastLevel
                                />,
                            ],
                            [
                                <UserFilterItem
                                    label="职位协助人"
                                    name="position_user"
                                    api={{
                                        loader: () => {
                                            return {
                                                pageData: [
                                                    {
                                                        label: "用户一",
                                                        value: 1,
                                                        description: "我是用户描述",
                                                    },
                                                    {
                                                        label: "用户二",
                                                        value: 2,
                                                        description: "我是用户描述",
                                                    },
                                                    {
                                                        label: "用户三",
                                                        value: 3,
                                                        description: "我是用户描述",
                                                    },
                                                ],
                                            };
                                        },
                                    }}
                                />,
                            ],
                        ],
                    }}
                >
                    <div className="layout-content">内容区</div>
                </Page>
            </Layout>
        </PureGlobal>
    );
};

render(<BaseExample/>);

```

- 左侧导航菜单
- 展示一个左侧导航菜单
- layout(@components/Layout),antd(antd)

```jsx
const {Menu} = layout;
const {Space} = antd;
const {useState} = React;

const ControlMenu = () => {
    const [current, setCurrent] = useState();
    return (
        <Menu
            currentKey={current}
            onChange={setCurrent}
            items={[
                {
                    label: "父级标题1",
                    key: "p-0",
                    iconType: "icon-zhanghaodenglu",
                    children: [
                        {
                            label: "子标题1",
                            key: "s-0",
                        },
                        {
                            label: "子标题2",
                            key: "s-1",
                        },
                    ],
                },
                {
                    label: "父级标题2",
                    key: "p-1",
                    iconType: "icon-zhanghaodenglu",
                    children: [
                        {
                            label: "子标题1",
                            key: "s-2",
                        },
                        {
                            label: "子标题2",
                            key: "s-3",
                        },
                    ],
                },
                {
                    label: "父级标题3",
                    key: "p-2",
                    iconType: "icon-zhanghaodenglu",
                },
            ]}
        />
    );
};

const Example = () => {
    return (
        <Space size={10}>
            <Menu
                items={[
                    {
                        label: "父级标题1",
                        key: "p-0",
                        iconType: "icon-zhanghaodenglu",
                        children: [
                            {
                                label: "子标题1",
                                key: "s-0",
                                path: "/link1",
                            },
                            {
                                label: "子标题2",
                                key: "s-1",
                                path: "/link2",
                            },
                        ],
                    },
                    {
                        label: "父级标题2",
                        key: "p-1",
                        iconType: "icon-zhanghaodenglu",
                        children: [
                            {
                                label: "子标题1",
                                key: "s-2",
                                path: "/link3",
                            },
                            {
                                label: "子标题2",
                                key: "s-3",
                                path: "/link4",
                            },
                        ],
                    },
                    {
                        label: "父级标题3",
                        key: "p-2",
                        iconType: "icon-zhanghaodenglu",
                        path: "/link5",
                    },
                ]}
            />
            <Menu
                items={[
                    {
                        iconType: "icon-zhanghaodenglu",
                        label: "子标题1",
                        key: "s-0",
                        path: "/link1",
                    },
                    {
                        iconType: "icon-zhanghaodenglu",
                        label: "子标题2",
                        key: "s-1",
                        path: "/link2",
                    },
                    {
                        iconType: "icon-zhanghaodenglu",
                        label: "子标题1",
                        key: "s-2",
                        path: "/link3",
                    },
                    {
                        iconType: "icon-zhanghaodenglu",
                        label: "子标题2",
                        key: "s-3",
                        path: "/link4",
                    },
                ]}
            />
            <Menu
                allowCollapsed={false}
                items={[
                    {
                        label: "父级标题1",
                        key: "p-0",
                        iconType: "icon-zhanghaodenglu",
                        children: [
                            {
                                label: "子标题1",
                                key: "s-0",
                                path: "/link1",
                            },
                            {
                                label: "子标题2",
                                key: "s-1",
                                path: "/link2",
                            },
                        ],
                    },
                    {
                        label: "父级标题2",
                        key: "p-1",
                        iconType: "icon-zhanghaodenglu",
                        children: [
                            {
                                label: "子标题1",
                                key: "s-2",
                                path: "/link3",
                            },
                            {
                                label: "子标题2",
                                key: "s-3",
                                path: "/link4",
                            },
                        ],
                    },
                    {
                        label: "父级标题3",
                        key: "p-2",
                        iconType: "icon-zhanghaodenglu",
                        path: "/link5",
                    },
                ]}
            />
            <ControlMenu/>
        </Space>
    );
};

render(<Example/>);

```

### API

| 属性名        | 说明                     | 类型     | 默认值 |
|------------|------------------------|--------|-----|
| navigation | 导航参数参考 Navigation 组件参数 | object | -   |
| children   | 一般放置Page组件             | jsx    | -   |

### Page

| 属性名             | 说明                                                                 | 类型             | 默认值   |
|-----------------|--------------------------------------------------------------------|----------------|-------|
| menu            | 左菜单区内容                                                             | jsx            | -     |
| filter          | 页面标题位置筛选器参数,参考 Filter 组件参数                                         | object         | -     |
| menuOpen        | 左菜单是否默认打开                                                          | boolean        | true  |
| menuWidth       | 左菜单宽度                                                              | string         | 240px |
| menuFixed       | 左菜单是否fixed布局                                                       | boolean        | true  |
| menuCloseButton | 控制左菜单显示隐藏的按钮是否显示                                                   | boolean        | true  |
| header          | 页头区内容                                                              | jsx            | -     |
| headerFixed     | 页头区是否fixed布局                                                       | boolean        | true  |
| headerInfo      | 页头信息区内容                                                            | jsx            | -     |
| backUrl         | 右侧内容区的标题前展示返回按钮，并返回到该url                                           | 参考 useNavigate | -     |
| title           | 页面标题                                                               | string,jsx     | -     |
| titleExtra      | 页面标题区右侧位置内容                                                        | jsx            | -     |
| titleLeftExtra  | 页面标题区左侧位置内容                                                        | jsx            | -     |
| noMargin        | 页面内容区是否去掉Margin                                                    | boolean        | false |
| noPadding       | 页面内容区是否去掉Padding                                                   | boolean        | false |
| option          | 右操作区内容                                                             | jsx            | -     |
| optionWidth     | 右操作区宽度                                                             | string         | 400px |
| optionNoPadding | 右操作区是否去掉Padding                                                    | boolean        | false |
| optionFixed     | 右操作区是否fixed布局                                                      | boolean        | false |
| optionFooter    | 右操作区底部内容                                                           | jsx            | -     |
| openFeatures    | Page是否启用Features，启用时如果配置文件中没有该模块id则判断为模块关闭，会将name作为Features的id进行设置 | boolean        | false |

### Affix

可以控制其中的内容是否是fixed布局

| 属性名          | 说明               | 类型       | 默认值  |
|--------------|------------------|----------|------|
| isFixed      | 内容是否fixed布局      | boolean  | true |
| offsetTop    | 距离窗口顶部达到指定偏移量后触发 | number   | 0    |
| offsetBottom | 距离窗口底部达到指定偏移量后触发 | number   | -    |
| onChange     | 固定状态改变时触发的回调函数   | function | -    |

### Menu

显示一个菜单，最多支持两级，支持第一级展开收起，支持路径匹配自动高亮

| 属性名              | 说明                                                          | 类型            | 默认值  |
|------------------|-------------------------------------------------------------|---------------|------|
| items            | 菜单项                                                         | array[object] | []   |
| items[].label    | 菜单项显示内容                                                     | jsx           | -    |
| items[].key      | 菜单项的key要求必须唯一                                               | string        | -    |
| items[].iconType | 菜单项前面的icon类型参考 Icon组件的type参数                                | string        | -    |
| items[].path     | 菜单项的路径                                                      | string        | -    |
| items[].onClick  | 菜单项点击触发事件，注意：如果菜单项已经传入path参数则该参数不生效                         | function      | -    |
| items[].children | 菜单项的第二级项列表，参考items参数。注意该组件只支持两级菜单，所以该参数内部的菜单项不再支持children参数 | array[object] | -    |
| currentKey       | 当前被选中的菜单项的key，如果菜单项又path参数，不需要传递该参数，组件会根据路由自动判断选中项          | string        | -    |
| onChange         | currentKey产生修改时触发函数，注意：如果菜单项已经传入path参数则该参数不生效               | function      | -    |
| allowCollapsed   | 是否允许一级菜单收起                                                  | boolean       | true |
| defaultOpenKeys  | 初始展开的 SubMenu 菜单项 key 数组                                    | string[]      | -    |

### PermissionsPage

加入权限判断的Page，错误类型默认为error，即在该页面没有权限时显示错误

| 属性名         | 说明                      | 类型     | 默认值 |
|-------------|-------------------------|--------|-----|
| permissions | 权限列表参考 Permissions 组件参数 | object | -   |

---

# LoadingButton

### 概述

### 何时使用

当点击按钮时，需要显示loading状态，当然你可以使用antd Button的loading属性，但是这样你需要自己声明一个state来控制，LoadingButton组件可以帮你做好这件事情

### 特点

通过onClick返回的Promise来控制Button的loading状态

children除了可以传正常的jsx以外还接受function参数，可以接收到loading状态以便根据loading状态显示不同文案

### 示例

#### 示例代码

- 带有加载状态按钮
- 点击按钮切换到加载状态，加载方法完成后自动切换为普通状态
- _LoadingButton(@components/LoadingButton),antd(antd)

```jsx
const {default: LoadingButton} = _LoadingButton;
const {Space, message} = antd;

const clickHandler = () => {
    message.success("点击按钮1s后完成加载");
    return new Promise((resolve) => {
        setTimeout(() => {
            message.success("完成");
            resolve();
        }, 1000);
    });
};
const BaseExample = () => {
    return (
        <Space wrap>
            <LoadingButton onClick={clickHandler}>按钮</LoadingButton>
            <LoadingButton onClick={clickHandler}>
                {(isLoading) => (isLoading ? "正在加载中..." : "切换加载文案")}
            </LoadingButton>
        </Space>
    );
};

render(<BaseExample/>);

```

### API

| 属性名      | 说明                                                                                            | 类型           | 默认值 |
|----------|-----------------------------------------------------------------------------------------------|--------------|-----|
| onClick  | 点击按钮触发函数，可以返回一个Promise，当Promise再pending状态时Button将自动处于loading状态，当Promise返回结果会自动从loading切换回普通状态 | function     | -   |
| children | Button的子元素，可以为jsx或者function，为function时可以接收到loading状态用来切换显示内容                                  | jsx,function | -   |

---

# Menu

### 概述

支持远程加载数据的菜单

### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Menu(@components/Menu),antd(antd)

```jsx
const {default: Menu} = _Menu;
const {Space} = antd;
const {useState} = React;

const ControlMenu = () => {
    const [current, setCurrent] = useState("s-0");
    return (
        <Menu
            currentKey={current}
            onChange={setCurrent}
            items={[
                {
                    label: "父级标题1",
                    key: "p-0",
                    iconType: "icon-zhanghaodenglu",
                    children: [
                        {
                            label: "子标题1",
                            key: "s-0",
                        },
                        {
                            label: "子标题2",
                            key: "s-1",
                        },
                    ],
                },
                {
                    label: "父级标题2",
                    key: "p-1",
                    iconType: "icon-zhanghaodenglu",
                    children: [
                        {
                            label: "子标题1",
                            key: "s-2",
                        },
                        {
                            label: "子标题2",
                            key: "s-3",
                        },
                    ],
                },
                {
                    label: "父级标题3",
                    key: "p-2",
                    iconType: "icon-zhanghaodenglu",
                },
            ]}
        />
    );
};
const BaseExample = () => {
    return (
        <Space>
            <div style={{maxWidth: "200px"}}>
                <Menu
                    defaultItems={[
                        {
                            label: "父级标题1",
                            iconType: "icon-zhanghaodenglu",
                            children: [
                                {
                                    label:
                                        "子标题1超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长子标题1超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长子标题1超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长子标题1超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级",
                                    path: "/link1",
                                },
                                {
                                    label: "子标题2",
                                    path: "/link2",
                                },
                            ],
                        },
                        {
                            label: "父级标题2",
                            iconType: "icon-zhanghaodenglu",
                            children: [
                                {
                                    label: "子标题1",
                                    path: "/link3",
                                },
                                {
                                    label: "子标题2",
                                    path: "/link4",
                                },
                            ],
                        },
                        {
                            label: "父级标题3",
                            iconType: "icon-zhanghaodenglu",
                            fetchOptions: {
                                loader: () => {
                                    return new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve([
                                                {
                                                    label: "子标题1",
                                                    path: "/link5",
                                                },
                                                {
                                                    label: "子标题2",
                                                    path: "/link6",
                                                },
                                            ]);
                                        }, 1000);
                                    });
                                },
                            },
                        },
                    ]}
                />
            </div>

            <Menu
                items={[
                    {
                        iconType: "icon-zhanghaodenglu",
                        label: "子标题1",
                        key: "s-0",
                        path: "/link1",
                    },
                    {
                        iconType: "icon-zhanghaodenglu",
                        label: "子标题2",
                        key: "s-1",
                        path: "/link2",
                    },
                    {
                        iconType: "icon-zhanghaodenglu",
                        label: "子标题1",
                        key: "s-2",
                        path: "/link3",
                    },
                    {
                        iconType: "icon-zhanghaodenglu",
                        label: "子标题2",
                        key: "s-3",
                        path: "/link4",
                    },
                ]}
            />
            <Menu
                allowCollapsed={false}
                items={[
                    {
                        label: "父级标题1",
                        key: "p-0",
                        iconType: "icon-zhanghaodenglu",
                        children: [
                            {
                                label: "子标题1",
                                key: "s-0",
                                path: "/link1",
                            },
                            {
                                label: "子标题2",
                                key: "s-1",
                                path: "/link2",
                            },
                        ],
                    },
                    {
                        label: "父级标题2",
                        key: "p-1",
                        iconType: "icon-zhanghaodenglu",
                        children: [
                            {
                                label: "子标题1",
                                key: "s-2",
                                path: "/link3",
                            },
                            {
                                label: "子标题2",
                                key: "s-3",
                                path: "/link4",
                            },
                        ],
                    },
                    {
                        label: "父级标题3",
                        key: "p-2",
                        iconType: "icon-zhanghaodenglu",
                        path: "/link5",
                    },
                ]}
            />
            <Menu
                allowCollapsed={false}
                defaultItems={[
                    {
                        label: "父级标题1",
                        iconType: "icon-zhanghaodenglu",
                        children: [
                            {
                                label: "子标题1",
                                path: "/link1",
                            },
                            {
                                label: "子标题2",
                                path: "/link2",
                            },
                        ],
                    },
                    {
                        label: "父级标题2",
                        iconType: "icon-zhanghaodenglu",
                        children: [
                            {
                                label: "子标题1",
                                path: "/link3",
                            },
                            {
                                label: "子标题2",
                                path: "/link4",
                            },
                        ],
                    },
                    {
                        label: "父级标题3",
                        iconType: "icon-zhanghaodenglu",
                        fetchOptions: {
                            loader: () => {
                                return new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve([
                                            {
                                                label: "子标题1",
                                                path: "/link5",
                                            },
                                            {
                                                label: "子标题2",
                                                path: "/link6",
                                            },
                                        ]);
                                    }, 1000);
                                });
                            },
                        },
                    },
                ]}
            />
            <Menu
                defaultItems={[
                    {
                        label: "父级标题1",
                        children: [
                            {
                                label: "子标题1",
                                path: "/link1",
                            },
                            {
                                label: "子标题2",
                                path: "/link2",
                            },
                        ],
                    },
                    {
                        label: "父级标题2",
                        children: [
                            {
                                label: "子标题1",
                                path: "/link3",
                            },
                            {
                                label: "子标题2",
                                path: "/link4",
                            },
                        ],
                    },
                ]}
            />
            <ControlMenu/>
        </Space>
    );
};

render(<BaseExample/>);

```

### API

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|

---

# Modal

### 概述

### 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以在当前页面正中打开一个浮层，承载相应的操作。

### 特点

该组件是antd Modal组件的再封装：

* 修改了footer部分的设置逻辑,能更加简单的定义footer区域的功能
* 添加了withDecorator可以更加方便的处理Modal外层的显示逻辑
* 扩展了用于方法调用的useModal的hooks，可以通过hooks获得一个Modal的调用方法，并且保证其和Modal组件式调用有相同的UI表现和行为
* 扩展了ModalButton组件，可以在点击该按钮时执行加载数据，并且Button的状态变为loading，在数据加载完成之后再弹出弹窗
* 扩展了TabsModal组件，它是一个Tabs和Modal组合起来的组件，对弹窗title做了特殊处理，更加符合UI交互逻辑

### 示例

#### 示例代码

- 普通弹窗
- 展示弹窗的基本用法，自定义footer等功能。
  注意:
  1.onConfirm和onCancel只对于默认的footerButtons生效，如果是自定义的footerButtons则不需要传这两个参数，直接定义按钮的onClick即可。
  2.自定义的footerButtons的onClick可以返回一个Promise来延迟关闭弹窗，resolve的值为false不关闭弹窗，其他情况会自动关闭弹窗。在resolve未返回之前按钮会变成loading状态
- _Modal(@components/Modal),global(@components/Global),antd(antd)

```jsx
const {default: Modal, useModal} = _Modal;
const {useState} = React;
const {Button, Space, message, Radio} = antd;
const {PureGlobal} = global;

const BaseExample = () => {
    const modal = useModal();
    const [size, setSize] = useState("default");
    const [open, setOpen] = useState(false);
    return (
        <Space direction="vertical">
            <Radio.Group
                value={size}
                options={[
                    {label: "small", value: "small"},
                    {label: "default", value: "default"},
                    {
                        label: "large",
                        value: "large",
                    },
                ]}
                onChange={(e) => {
                    setSize(e.target.value);
                }}
                optionType="button"
                buttonStyle="solid"
            />
            <Space wrap>
                <Modal
                    title="确定延迟关闭弹窗"
                    size={size}
                    open={open}
                    onClose={() => {
                        setOpen(false);
                    }}
                    onConfirm={() => {
                        return new Promise((resolve) => {
                            message.success("弹窗1s后关闭");
                            setTimeout(() => {
                                message.success("弹窗关闭");
                                resolve();
                            }, 1000);
                        });
                    }}
                >
                    <div>弹窗弹窗弹窗弹窗弹窗弹窗弹窗</div>
                </Modal>
                <Button
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    确定延迟关闭弹窗
                </Button>
                <Button
                    onClick={() => {
                        modal({
                            title: "hooks调用弹框",
                            size,
                            children: <div>弹窗弹窗弹窗弹窗弹窗弹窗弹窗</div>,
                        });
                    }}
                >
                    hooks调用弹框
                </Button>
                <Button
                    onClick={() => {
                        modal({
                            title: "超高弹窗",
                            size,
                            children: (
                                <div style={{height: "2000px"}}>
                                    超高弹窗超高弹窗超高弹窗超高弹窗超高弹窗超高弹窗超高弹窗超高弹窗超高弹窗超高弹窗
                                </div>
                            ),
                        });
                    }}
                >
                    展示超高弹窗
                </Button>
                <Button
                    onClick={() => {
                        modal({
                            title: "自定义footer弹框",
                            size,
                            children: <div>弹窗弹窗弹窗弹窗弹窗弹窗弹窗</div>,
                            footer: ({close}) => (
                                <Space>
                                    <span>自定义footer</span>
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            close();
                                        }}
                                    >
                                        关闭
                                    </Button>
                                </Space>
                            ),
                        });
                    }}
                >
                    展示自定义footer弹框
                </Button>
                <Button
                    onClick={() => {
                        modal({
                            title: "无footer弹框",
                            size,
                            children: <div>弹窗弹窗弹窗弹窗弹窗弹窗弹窗</div>,
                            footer: null,
                        });
                    }}
                >
                    无footer弹框
                </Button>
                <Button
                    onClick={() => {
                        modal({
                            title: "自定义按钮组",
                            size,
                            children: <div>弹窗弹窗弹窗弹窗弹窗弹窗弹窗</div>,
                            footerButtons: [
                                {
                                    children: "按钮一",
                                },
                                {
                                    type: "primary",
                                    children: "按钮二",
                                },
                                {
                                    children: "按钮三",
                                },
                            ],
                        });
                    }}
                >
                    自定义按钮组
                </Button>
                <Button
                    onClick={() => {
                        modal({
                            title: "有rightOptions的弹窗",
                            size,
                            children: <div>弹窗弹窗弹窗弹窗弹窗弹窗弹窗</div>,
                            rightOptions: <div>右侧内容右侧内容右侧内容右侧内容</div>,
                            rightSpan: 12,
                        });
                    }}
                >
                    有rightOptions的弹窗
                </Button>
                <Button
                    onClick={() => {
                        const StateContainer = ({children}) => {
                            const [disabled, setDisabled] = useState(false);
                            return children({disabled, setDisabled});
                        };

                        modal({
                            title: "有rightOptions的弹窗",
                            size,
                            withDecorator: (render) => {
                                return <StateContainer>{render}</StateContainer>;
                            },
                            footerButtons: ({disabled}) => [
                                {
                                    type: "primary",
                                    disabled,
                                    children: "确定",
                                },
                            ],
                            children: ({disabled, setDisabled}) => (
                                <div>
                                    弹窗弹窗弹窗弹窗弹窗弹窗弹窗[{String(disabled)}]
                                    <Button
                                        onClick={() => {
                                            setDisabled((disabled) => !disabled);
                                        }}
                                    >
                                        切换确定按钮disabled
                                    </Button>
                                </div>
                            ),
                        });
                    }}
                >
                    children控制footerButtons状态
                </Button>
            </Space>
        </Space>
    );
};

render(
    <PureGlobal>
        <BaseExample/>
    </PureGlobal>
);

```

- childrenRef的使用
-
- _Modal(@components/Modal),antd(antd)

```jsx
const {default: Modal, useModal} = _Modal;
const {Button} = antd;
const BaseExample = () => {
    const modal = useModal();

    return (
        <Button
            onClick={() => {
                modal({
                    title: "示例弹框",
                    children: ({childrenRef}) => {
                        return (
                            <div ref={childrenRef}>
                                示例弹框示例弹框示例弹框示例弹框示例弹框示例弹框
                            </div>
                        );
                    },
                    onConfirm: (e, {childrenRef}) => {
                        console.log(childrenRef.current);
                    },
                });
            }}
        >
            点击弹出弹框
        </Button>
    );
};

render(<BaseExample/>);

```

- 需要加载数据的弹窗
- 可以通过withDecorator属性实现弹窗的加载数据或者加载远程组件的逻辑，在数据或者远程组件加载完成之前弹窗展示loading状态，加载完成之后children可以获取到加载的数据
- _Modal(@components/Modal),global(@components/Global),antd(antd),fetch(@kne/react-fetch),_Content(@components/Content)

```jsx
const {default: Modal, useModal} = _Modal;
const {useState} = React;
const {Button, Space} = antd;
const {default: Fetch} = fetch;
const {PureGlobal} = global;
const {default: Content} = _Content;

const BaseExample = () => {
    const modal = useModal();
    const [open, setOpen] = useState(false);
    return (
        <Space wrap>
            <Modal
                title="组件调用方式"
                withDecorator={(render) => (
                    <Fetch
                        loader={() => {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve([
                                        {
                                            label: "内容1",
                                            content: "内容1内容1内容1内容1内容1内容1内容1",
                                        },
                                        {
                                            label: "内容2",
                                            content: "内容2内容2内容2内容2内容2内容2内容2内容2",
                                        },
                                    ]);
                                }, 1000);
                            });
                        }}
                        render={({data}) => render({data})}
                    />
                )}
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
            >
                {({data}) => <Content list={data} col={2}/>}
            </Modal>
            <Button
                onClick={() => {
                    setOpen(true);
                }}
            >
                组件调用方式
            </Button>
            <Button
                onClick={() => {
                    modal({
                        title: "hooks调用方式",
                        withDecorator: (render) => (
                            <Fetch
                                loader={() => {
                                    return new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve([
                                                {
                                                    label: "内容1",
                                                    content: "内容1内容1内容1内容1内容1内容1内容1",
                                                },
                                                {
                                                    label: "内容2",
                                                    content: "内容2内容2内容2内容2内容2内容2内容2内容2",
                                                },
                                            ]);
                                        }, 1000);
                                    });
                                }}
                                render={({data}) => render({data})}
                            />
                        ),
                        children: ({data}) => <Content list={data} col={2}/>,
                    });
                }}
            >
                hooks调用方式
            </Button>
            <Button
                onClick={() => {
                    modal({
                        title: (props) => {
                            return "hooks调用方式";
                        },
                        withDecorator: (render) => (
                            <Fetch
                                loader={() => {
                                    return new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve([
                                                {
                                                    label: "内容1",
                                                    content: "内容1内容1内容1内容1内容1内容1内容1",
                                                },
                                                {
                                                    label: "内容2",
                                                    content: "内容2内容2内容2内容2内容2内容2内容2内容2",
                                                },
                                            ]);
                                        }, 1000);
                                    });
                                }}
                                render={({data}) => render({data})}
                            />
                        ),
                        children: ({data}) => <Content list={data} col={2}/>,
                    });
                }}
            >
                hooks title调用方式
            </Button>
        </Space>
    );
};

render(
    <PureGlobal>
        <BaseExample/>
    </PureGlobal>
);

```

- 可以弹出弹窗的按钮
- 可以点击按钮弹出弹窗，并且在弹窗弹出之前可以加载数据，加载数据时，按钮为loading状态，数据加载完成之后再弹出弹窗
- _Modal(@components/Modal),global(@components/Global),antd(antd),_Content(@components/Content),_FormInfo(
  @components/FormInfo)

```jsx
const {ModalButton, TabsModalButton} = _Modal;
const {Space} = antd;
const {PureGlobal} = global;
const {default: Content} = _Content;
const {default: FormInfo, Input, TextArea} = _FormInfo;

const api = {
    loader: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {label: "内容1", content: "内容1内容1内容1内容1内容1内容1内容1"},
                    {
                        label: "内容2",
                        content: "内容2内容2内容2内容2内容2内容2内容2内容2",
                    },
                ]);
            }, 1000);
        });
    },
};

const BaseExample = () => {
    return (
        <Space wrap>
            <ModalButton
                api={api}
                modalProps={({data}) => {
                    return {
                        title: "加载数据的弹窗",
                        children: <Content list={data} col={2}/>,
                    };
                }}
            >
                点击加载数据
            </ModalButton>
            <TabsModalButton
                api={api}
                modalProps={({data}) => {
                    return {
                        items: data.map(({label, content}, index) => {
                            return {
                                key: index,
                                children: content,
                                label,
                            };
                        }),
                    };
                }}
            >
                点击加载数据的Tabs弹窗
            </TabsModalButton>
        </Space>
    );
};

render(
    <PureGlobal>
        <BaseExample/>
    </PureGlobal>
);

```

- tabs弹窗
- 展示一个tabs弹窗，tabs的选项的label会占据弹窗title位置，弹框的title将不显示
  tabs的items多加了withDecorator参数和Modal的withDecorator参数类似可以控制其外部显示及渲染内容
  tabs的items的children也可以是function，同样可以接收到TabsModal的withDecorator传回的参数
- _Modal(@components/Modal),global(@components/Global),antd(antd),fetch(@kne/react-fetch),_Content(@components/Content)

```jsx
const {TabsModal, useTabsModal} = _Modal;
const {useState} = React;
const {default: Fetch} = fetch;
const {Button, Space} = antd;
const {PureGlobal} = global;
const {default: Content} = _Content;

const BaseExample = () => {
    const [open, setOpen] = useState(false);
    const tabsModal = useTabsModal();
    return <Space wrap>
        <TabsModal open={open} onClose={() => {
            setOpen(false);
        }} items={[{
            label: "项目 1", key: "item-1", children: <div>项目 1项目 1项目 1项目 1项目 1项目 1项目 1项目 1</div>
        }, {
            label: "项目 2", key: "item-2", children: <div>项目 2项目 2项目 2项目 2项目 2项目 2项目 2项目 2</div>
        }]} rightOptions={<div>右边栏内容右边栏内容右边栏内容右边栏内容</div>}>
            <div>弹窗弹窗弹窗弹窗弹窗弹窗弹窗</div>
        </TabsModal>
        <Button onClick={() => {
            setOpen(true);
        }}>组件调用方式</Button>
        <Button onClick={() => {
            tabsModal({
                rightOptions: <div>右边栏内容右边栏内容右边栏内容右边栏内容</div>, items: [{
                    label: "项目 1",
                    key: "item-1",
                    children: <div>项目 1项目 1项目 1项目 1项目 1项目 1项目 1项目 1</div>
                }, {
                    label: "项目 2",
                    key: "item-2",
                    children: <div>项目 2项目 2项目 2项目 2项目 2项目 2项目 2项目 2</div>
                }]
            });
        }}>hooks调用方式</Button>
        <Button onClick={() => {
            tabsModal({
                title: "此title不展示",
                rightOptions: ({data}) => <Content list={data}/>,
                withDecorator: (render) => <Fetch loader={() => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve([{label: "内容1", content: "内容1内容1内容1内容1内容1内容1内容1"}, {
                                label: "内容2", content: "内容2内容2内容2内容2内容2内容2内容2内容2"
                            }]);
                        }, 1000);
                    });
                }} render={({data}) => render({data})}/>,
                items: [{
                    label: "项目 1", key: "item-1", children: ({data}) => <Content list={data} col={2}/>
                }, {
                    withDecorator: (render) => <Fetch loader={() => {
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                resolve([{label: "内容3", content: "内容3内容3内容3内容3内容3内容3内容3"}, {
                                    label: "内容4", content: "内容4内容4内容4内容4内容4内容4内容4内容4"
                                }]);
                            }, 1000);
                        });
                    }} render={({data}) => render({tabData: data})}/>,
                    label: "项目 2",
                    key: "item-2",
                    children: ({data, tabData}) => <Content list={[...data, ...tabData]} col={2}/>
                }]
            });
        }}>复杂数据加载</Button>
    </Space>;
};

render(<PureGlobal><BaseExample/></PureGlobal>);
```

- 消息确认和提示
- 展示确认消息提醒
- _Modal(@components/Modal),global(@components/Global),antd(antd),fetch(@kne/react-fetch),_Content(@components/Content)

```jsx
const {default: Modal, useConfirmModal} = _Modal;
const {useState} = React;
const {Button, Space, message} = antd;
const {PureGlobal} = global;
const BaseExample = () => {
    const confirmModal = useConfirmModal();
    return (
        <Space wrap>
            <Button
                onClick={() => {
                    confirmModal({
                        danger: true,
                        type: "confirm",
                        title: "确定要删除吗？",
                        message:
                            "确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除",
                    });
                }}
            >
                confirm
            </Button>
            <Button
                onClick={() => {
                    confirmModal({
                        type: "confirm",
                        confirmType: "warning",
                        title: "确定要编辑吗？",
                        message:
                            "确定要编辑确定要编辑确定要编辑确定要编辑确定要编辑确定要编辑确定要编辑",
                    });
                }}
            >
                confirm 警告
            </Button>
            <Button
                onClick={() => {
                    confirmModal({
                        type: "info",
                        title: "确定要删除吗？",
                        message:
                            "确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除",
                    });
                }}
            >
                info
            </Button>
            <Button
                onClick={() => {
                    confirmModal({
                        type: "info",
                        message:
                            "确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除",
                    });
                }}
            >
                info无标题
            </Button>
            <Button
                onClick={() => {
                    confirmModal({
                        type: "success",
                        title: "确定要删除吗？",
                        message:
                            "确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除",
                    });
                }}
            >
                success
            </Button>
            <Button
                onClick={() => {
                    confirmModal({
                        type: "warning",
                        title: "确定要删除吗？",
                        message:
                            "确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除",
                    });
                }}
            >
                warning
            </Button>
            <Button
                onClick={() => {
                    confirmModal({
                        type: "error",
                        title: "确定要删除吗？",
                        message:
                            "确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除",
                    });
                }}
            >
                error
            </Button>
        </Space>
    );
};

render(
    <PureGlobal>
        <BaseExample/>
    </PureGlobal>
);

```

### API

| 属性名           | 说明                                                                                                                                      | 类型           | 默认值   |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------|--------------|-------|
| footer        | 弹窗的footer，当其被显式设置成null且footerButtons没有设置过时弹窗不显示footer。当它类型为function时可以得到close方法和withDecorator设置的props                                   | jsx,function | -     |
| footerButtons | 弹窗footer的按钮区，默认为确认和取消按钮，默认按钮分别响应onConfirm和onCancel方法，如果自定义设置footerButtons则需要自行传入onClick参数，onConfirm和onCancel方法将不生效                      | array        | -     |
| onClose       | 弹窗关闭时调用，弹窗受控时由该方法将外部open状态修改                                                                                                            | function     | -     |
| onConfirm     | 当footerButtons未自定义设置时点击确认按钮触发执行该方法，当其返回Promise点击后Promise，resolve之前确认按钮显示为loading状态，返回值为false或者Promise的resolve值为false时弹窗不会被关闭，其他情况弹窗默认关闭 | function     | -     |
| onCancel      | 和onConfirm类似，其为点击取消按钮触发                                                                                                                 | function     | -     |
| children      | 弹窗内容，可以为jsx或者function，为function时可以接收到close和withDecorator设置的props                                                                        | jsx,function | -     |
| withDecorator | 弹窗修饰器，会接收到弹窗children的render方法，可以在其外部添加修饰内容后执行render方法，给render方法传入的值可以在children,footer,rightOptions类型为function时接收到对应的参数                  | function     | -     |
| rightOptions  | 弹窗右侧区域，和children类似可以为jsx或者function类型                                                                                                    | jsx,function | -     |
| maskClosable  | 点击蒙层是否允许关闭                                                                                                                              | boolean      | false |

其他参数参考antd Modal组件

### useModal

获取一个执行后可以弹出一个Modal组件的方法

#### return:modal

| 属性名   | 说明                            | 类型       |
|-------|-------------------------------|----------|
| modal | 执行后可以弹出一个Modal弹窗，参数同Modal组件参数 | function |

### TabsModal

一个Tabs和Modal组合起来的组件，对弹窗title做了特殊处理，更加符合UI交互逻辑

| 属性名              | 说明                                                                                   | 类型           | 默认值 |
|------------------|--------------------------------------------------------------------------------------|--------------|-----|
| items            | 同antd Tabs的items参数                                                                   | array        | -   |
| items[].label    | 选项卡头显示文字                                                                             | string       | -   |
| items[].children | 选项卡头显示内容，和antd Tabs不同的是它可以是一个function和Modal的children类似可以接收items[].withDecorator传入的参数 | jsx,function | -   |
| items[].key      | 对应activeKey值                                                                         | string       | -   |
| activeKey        | 当前激活 tab 面板的 key                                                                     | string       |     |
| withDecorator    | 弹窗修饰器和Modal的withDecorator作用一致                                                        | function     | -   |
| defaultActiveKey | 初始化选中面板的 key，如果没有设置 activeKey                                                        | string       |     |
| onChange         | 切换面板的回调                                                                              | function     |     |

### useTabsModal

获取一个执行后可以弹出一个TabsModal组件的方法

#### return:tabsModal

| 属性名       | 说明                                    | 类型       |
|-----------|---------------------------------------|----------|
| tabsModal | 执行后可以弹出一个TabsModal弹窗，参数同TabsModal组件参数 | function |

### ModalButton

点击以后可以执行获取数据，在数据未返回时按钮展示为loading状态，数据返回后弹出Modal弹窗

| 属性名        | 说明                                                | 类型                                     | 默认值 |
|------------|---------------------------------------------------|----------------------------------------|-----|
| api        | @kne/react-fetch 所需参数                             | object                                 | -   |
| modalProps | 同Modal参数,当它为function时，执行function后返回的值作为modalProps | object,function({data,fetchApi,close}) | -   |

其他参数同antd Button 组件

### TabsModalButton

点击以后可以执行获取数据，在数据未返回时按钮展示为loading状态，数据返回后弹出TabsModal弹窗

| 属性名        | 说明                                                    | 类型                                     | 默认值 |
|------------|-------------------------------------------------------|----------------------------------------|-----|
| api        | @kne/react-fetch 所需参数                                 | object                                 | -   |
| modalProps | 同TabsModal参数,当它为function时，执行function后返回的值作为modalProps | object,function({data,fetchApi,close}) | -   |

其他参数同antd Button 组件

---

# Navigation

### 概述

### 何时使用

系统的顶部导航，一级导航项偏左靠近 logo 放置，辅助菜单偏右放置。

### 特点

* 集成了Permissions权限判断，可以通过权限列表来判断导项是否显示
* 在屏幕显示不了全部的一级导航时可以自动将后面的导航项收起到更多下拉菜单里面

### 示例(全屏)

#### 示例样式

```scss
.fold-items {
  width: 600px;
}
```

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Navigation(@components/Navigation),global(@components/Global)

```jsx
const {default: Navigation} = _Navigation;
const {PureGlobal} = global;

const menuList = [
    {
        key: "client",
        title: "客户",
        path: "/client",
        permission: "client:client:look",
    },
    {
        key: "position",
        title: "职位",
        path: "/position",
        permission: "jd:job:look",
    },
    {
        key: "ats",
        title: "招聘流程",
        path: "/ats",
    },
    {
        key: "talent",
        title: "人才库",
        permission: "cv:cv:look",
        path: "/talent",
    },
    {
        key: "contract",
        title: "合同",
        permission: "contract:mgr:look",
        path: "/contract",
    },
    {
        key: "payment",
        title: "付款信息",
        permission: "payment:mgr:look",
        path: "/payment",
    },
    {
        key: "invoice-center",
        title: "开票",
        permission: "client:invoice:center",
        path: "/invoice-center",
    },
    {
        key: "invoice-manage",
        title: "发票管理",
        permission: "client:invoice:manager",
        path: "/invoice-manage",
    },
    {
        key: "setting",
        title: "设置",
        permission: (permissions) =>
            permissions.some(
                (x) =>
                    [
                        "system:permissions:mgr",
                        "system:org:mgr",
                        "system:user:mgr",
                    ].indexOf(x) !== -1
            ),
        path: "/setting",
    },
];

render(
    <PureGlobal>
        <Navigation
            list={menuList}
            isFixed={false}
            permissions={[
                "client:client:look",
                "jd:job:look",
                "cv:cv:look",
                "contract:mgr:look",
                "payment:mgr:look",
                "client:invoice:center",
                "client:invoice:manager",
                "system:permissions:mgr",
            ]}
        />
    </PureGlobal>
);

```

- 这里填写示例标题
- 这里填写示例说明
- _Navigation(@components/Navigation),global(@components/Global)

```jsx
const {default: Navigation} = _Navigation;
const {PureGlobal} = global;

const menuList = [
    {
        key: "client",
        title: "客户",
        path: "/client",
        permission: "client:client:look",
    },
    {
        key: "position",
        title: "职位",
        path: "/position",
        permission: "jd:job:look",
    },
    {
        key: "ats",
        title: "招聘流程",
        path: "/ats",
    },
    {
        key: "talent",
        title: "人才库",
        permission: "cv:cv:look",
        path: "/talent",
    },
    {
        key: "contract",
        title: "合同",
        permission: "contract:mgr:look",
        path: "/contract",
    },
    {
        key: "payment",
        title: "付款信息",
        permission: "payment:mgr:look",
        path: "/payment",
    },
    {
        key: "invoice-center",
        title: "开票",
        permission: "client:invoice:center",
        path: "/invoice-center",
    },
    {
        key: "invoice-manage",
        title: "发票管理",
        permission: "client:invoice:manager",
        path: "/invoice-manage",
    },
    {
        key: "setting",
        title: "设置",
        permission: (permissions) =>
            permissions.some(
                (x) =>
                    [
                        "system:permissions:mgr",
                        "system:org:mgr",
                        "system:user:mgr",
                    ].indexOf(x) !== -1
            ),
        path: "/setting",
    },
];

render(
    <PureGlobal>
        <div className="fold-items">
            <Navigation
                isFixed={false}
                list={menuList}
                permissions={[
                    "client:client:look",
                    "jd:job:look",
                    "cv:cv:look",
                    "contract:mgr:look",
                    "payment:mgr:look",
                    "client:invoice:center",
                    "client:invoice:manager",
                    "system:permissions:mgr",
                ]}
            />
        </div>
    </PureGlobal>
);

```

- 这里填写示例标题
- 这里填写示例说明
- _Navigation(@components/Navigation),antd(antd),global(@components/Global)

```jsx
const {useState} = React;
const {PureGlobal} = global;
const {default: Navigation} = _Navigation;
const {Checkbox, Space} = antd;

const menuList = [
    {
        key: "client",
        title: "客户",
        path: "/client",
        permission: "client:client:look",
    },
    {
        key: "position",
        title: "职位",
        path: "/position",
        permission: "jd:job:look",
    },
    {
        key: "ats",
        title: "招聘流程",
        path: "/ats",
    },
    {
        key: "talent",
        title: "人才库",
        permission: "cv:cv:look",
        path: "/talent",
    },
    {
        key: "contract",
        title: "合同",
        permission: "contract:mgr:look",
        path: "/contract",
    },
    {
        key: "payment",
        title: "付款信息",
        permission: "payment:mgr:look",
        path: "/payment",
    },
    {
        key: "invoice-center",
        title: "开票",
        permission: "client:invoice:center",
        path: "/invoice-center",
    },
    {
        key: "invoice-manage",
        title: "发票管理",
        permission: "client:invoice:manager",
        path: "/invoice-manage",
    },
    {
        key: "setting",
        title: "设置",
        permission: (permissions) =>
            permissions.some(
                (x) =>
                    [
                        "system:permissions:mgr",
                        "system:org:mgr",
                        "system:user:mgr",
                    ].indexOf(x) !== -1
            ),
        path: "/setting",
    },
];

const Example = () => {
    const [permissions, setPermissions] = useState([]);
    return (
        <PureGlobal>
            <Space className="container" direction="vertical" size={32}>
                <Navigation isFixed={false} list={menuList} permissions={permissions}/>
                <Checkbox.Group
                    value={permissions}
                    options={[
                        "client:client:look",
                        "jd:job:look",
                        "cv:cv:look",
                        "contract:mgr:look",
                        "payment:mgr:look",
                        "client:invoice:center",
                        "client:invoice:manager",
                        "system:permissions:mgr",
                    ]}
                    onChange={(values) => {
                        setPermissions(values);
                    }}
                />
            </Space>
        </PureGlobal>
    );
};

render(<Example/>);

```

### API

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|

---

# Notification

### 概述

消息通知

### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Notification(@components/Notification),global(@components/Global),antd(antd)

```jsx
const {default: Notification} = _Notification;
const {PureGlobal} = global;
const BaseExample = () => {
    return (
        <PureGlobal
            preset={{
                ajax: () => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve({data: {code: 0, data: {}}});
                        }, 1000);
                    });
                },
                apis: {
                    notification: {},
                },
                global: {
                    notification: {
                        list: [
                            {
                                id: 1,
                                level: "high",
                                title:
                                    "我是一个高级通知我是一个高级通知我是一个高级通知我是一个高级通知我是一个高级通知我是一个高级通知我是一个高级通知我是一个高级通知",
                                subtitle:
                                    "通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题",
                                link: "https://www.baidu.com",
                                content: [
                                    {
                                        label: "字段",
                                        content: "哈哈哈哈",
                                    },
                                    {
                                        label: "字段",
                                        content:
                                            "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
                                    },
                                    {
                                        label: "字段",
                                        content: "哈哈哈哈",
                                    },
                                    {
                                        label: "字段",
                                        content: "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
                                    },
                                    {
                                        label: "字段",
                                        content: "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
                                    },
                                ],
                            },
                            {
                                id: 2,
                                level: "high",
                                title: "我是一个高级通知2",
                                content: [
                                    {
                                        label: "字段",
                                        content: "哈哈哈哈",
                                    },
                                ],
                            },
                            {
                                id: 3,
                                level: "high",
                                title: "我是一个高级通知3",
                                content: [
                                    {
                                        label: "字段",
                                        content: "哈哈哈哈",
                                    },
                                ],
                            },
                            {
                                id: 4,
                                level: "high",
                                title: "我是一个高级通知4",
                                content: [
                                    {
                                        label: "字段",
                                        content: "哈哈哈哈",
                                    },
                                ],
                            },
                            {
                                id: 5,
                                level: "low",
                                title: "我是一个低级通知",
                                content: [
                                    {
                                        label: "字段",
                                        content: "哈哈哈哈",
                                    },
                                ],
                            },
                            {
                                id: 6,
                                level: "low",
                                title: "我是一个低级通知2",
                                content: [
                                    {
                                        label: "字段",
                                        content: "哈哈哈哈",
                                    },
                                ],
                            },
                            {
                                id: 7,
                                level: "middle",
                                title: "我是一个中级通知",
                                children: "哈哈哈哈",
                            },
                        ],
                    },
                },
            }}
        >
            <Notification/>
        </PureGlobal>
    );
};

render(<BaseExample/>);

```

### API

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|

---

# Permissions

### 概述

### 何时使用

在系统中存在一些功能和操作只允许某些角色用户使用，使用该组件可以让其包裹的组件或者区域根据系统的权限列表配置展示不同的状态

### 特点

通过在Global中的preset中设置permissions作为当前用户的权限列表，在Permissions组件配置permissions作为该功能要求具备的权限项，当要求具备的权限项全部在用户的权限列表中找到时为权限通过状态否则为权限不通过状态

当权限不通过时，Permissions组件可以有三种方式呈现：

1. 用户可以看到操作功能的组件显示，但是不能进行操作，在鼠标移入时会以ToolTip提示错误原因，一般用在按钮等需要用户交互的功能位置
2. 用户不能看到操作功能或者数据呈现，对应区域显示错误原因，一般用在要数据展示等场景
3. 隐藏内部组件，一般用在不需要干扰到用户或用户不需要了解其没有权限的功能或数据等场景

### 示例

#### 示例样式

```scss
.box {
  padding: 20px;
  background: #f8f8f8;
}
```

#### 示例代码

- 展示权限不通过的几种形式
- 通过切换不同的type，可以预览三种不同type的表现形式
- _Permissions(@components/Permissions),global(@components/Global),antd(antd)

```jsx
const {default: Permissions} = _Permissions;
const {PureGlobal} = global;
const {Button, Radio, Space} = antd;
const {useState} = React;

const BaseExample = () => {
    const [type, setType] = useState("tooltip");
    return (
        <PureGlobal
            preset={{
                permissions: ["permission_1", "permission_2"],
            }}
        >
            <Space direction="vertical">
                <Radio.Group
                    value={type}
                    options={[
                        {label: "tooltip", value: "tooltip"},
                        {
                            label: "error",
                            value: "error",
                        },
                        {label: "hidden", value: "hidden"},
                    ]}
                    onChange={(e) => {
                        setType(e.target.value);
                    }}
                    optionType="button"
                    buttonStyle="solid"
                />
                <Permissions type={type} request={["permission_2"]}>
                    <div className="box">
                        <Button onClick={() => console.log("执行操作")}>有权限操作</Button>
                    </div>
                </Permissions>
                <Permissions type={type} request={["permission_3"]}>
                    <div className="box">
                        <Button onClick={() => console.log("执行操作")}>无权限操作</Button>
                    </div>
                </Permissions>
            </Space>
        </PureGlobal>
    );
};

render(<BaseExample/>);

```

### API

| 属性名      | 说明                                                                                                      | 类型            | 默认值          |
|----------|---------------------------------------------------------------------------------------------------------|---------------|--------------|
| type     | 类型，可选值为hidden，tooltip，error，分别为隐藏，气泡提示，错误提示三种形式                                                         | string        | hidden       |
| tagName  | 当前组件的tagName，同React.createElement的type参数，默认为span                                                        | string        | span         |
| message  | 提示文案                                                                                                    | string        | 您暂无权限，请联系管理员 |
| request  | 权限列表为一个字符串数组，每个item为一项权限的key，所有权限在全局的permissions中存在则判断为权限通过                                             | array[string] | []           |
| children | 该参数可以传function类型，children({isPass, type, request})，isPass为权限校验是否通过，type为提示类型，request为所需权限列表，可以自行实现权限的展示 | jsx,function  | -            |

---

# StateBar

### 概述

用于 State Bar

### 示例

#### 示例代码

- State Bar
- State Bar
- _StateBar(@components/StateBar),antd(antd)

```jsx
const {default: StateBar} = _StateBar;
const {Button, Radio, Space} = antd;
const {useState} = React;

const BaseExample = () => {
    const [size, setSize] = useState("default");
    const [isInner, setIsInner] = useState(false);
    return (
        <Space direction="vertical">
            <Radio.Group
                value={isInner}
                options={[
                    {label: "inner", value: true},
                    {label: "normal", value: false},
                ]}
                onChange={(e) => {
                    setIsInner(e.target.value);
                }}
                optionType="button"
                buttonStyle="solid"
            />
            <Radio.Group
                value={size}
                options={[
                    {label: "small", value: "small"},
                    {label: "default", value: "default"},
                    {label: "large", value: "large"},
                ]}
                onChange={(e) => {
                    setSize(e.target.value);
                }}
                optionType="button"
                buttonStyle="solid"
            />
            <StateBar
                size={size}
                isInner={isInner}
                stateOption={[
                    {tab: "全部", key: "1"},
                    {tab: "科目一", key: "2"},
                    {
                        tab: "科目二",
                        key: "3",
                    },
                    {tab: "科目三", key: "4"},
                    {tab: "科目四", key: "5"},
                ]}
            />
        </Space>
    );
};

render(<BaseExample/>);

```

- Radio State Bar
- Radio State Bar
- _StateBar(@components/StateBar),antd(antd)

```jsx
const {default: StateBar} = _StateBar;
const {Radio, Space} = antd;
const {useState} = React;

const BaseStateExample = () => {
    const [size, setSize] = useState("default");
    return (
        <Space direction="vertical">
            <Radio.Group
                value={size}
                options={[
                    {label: "small", value: "small"},
                    {label: "default", value: "default"},
                    {label: "large", value: "large"},
                ]}
                onChange={(e) => {
                    setSize(e.target.value);
                }}
                optionType="button"
                buttonStyle="solid"
            />
            <StateBar
                size={size}
                type="radio"
                stateOption={[
                    {tab: "全部", key: "1"},
                    {tab: "科目一", key: "2"},
                    {tab: "科目二", key: "3"},
                    {tab: "科目三", key: "4"},
                    {tab: "科目四", key: "5"},
                    {tab: "科目一1", key: "22"},
                    {tab: "科目二2", key: "33"},
                    {tab: "科目三3", key: "44"},
                    {tab: "科目四4", key: "55", style: {cursor: "copy"}},
                ]}
            />
        </Space>
    );
};

render(<BaseStateExample/>);

```

- Step State Bar
- Step State Bar
- _StateBar(@components/StateBar)

```jsx
const {default: StateBar} = _StateBar;

const BaseStateExample = () => {
    return (
        <StateBar
            type="step"
            stateOption={[
                {tab: "全部", key: "1"},
                {tab: "科目一", key: "2"},
                {tab: "科目二", key: "3"},
                {tab: "科目三", key: "4"},
                {tab: "科目四", key: "5"},
                {tab: "科目一1", key: "22"},
                {tab: "科目二2", key: "33"},
                {tab: "科目三3", key: "44"},
                {tab: "科目四4", key: "55", className: "last"},
            ]}
            tabBarExtraContent={<div>测试</div>}
        />
    );
};

render(<BaseStateExample/>);

```

### API

| 属性名                | 说明               | 类型                      | 默认值                             |
|--------------------|------------------|-------------------------|---------------------------------|
| stateOption        | state操作列表        | string                  | {key: string, tab: ReactNode}[] |
| activeKey          | 当前激活 tab 面板的 key | string                  | -                               |
| type               | 当前tab展示样式        | 'tab'、'radio'、'step'    | 'tab'                           |
| onChange           | 事件返回选中的key       | (value: string) => void |                                 |
| tabBarExtraContent | 展示在state bar右侧   | ReactNode               | null                            |
| isInner            | 底部线延展至总长         | boolean                 | false                           |

### Mapping

#### stateOption

| 属性名 | 说明           | 类型        | 默认值 |
|-----|--------------|-----------|-----|
| key | 对应 activeKey | string    | -   |
| tab | 	选项卡头显示文字    | ReactNode | -   |

---

# StateTag

### 概述

用于展示标签

### 示例(全屏)

#### 示例代码

- 基本示例
- 状态标签
- _StateTag(@components/StateTag),_Descriptions(@components/Descriptions),lodash(lodash),antd(antd)

```jsx
const {default: StateTag} = _StateTag;
const {default: Descriptions} = _Descriptions;
const {range} = lodash;
const {Space, Typography} = antd;

const BaseExample = () => {
    return (
        <div>
            <div>使用场景: 列表页Table,简历详情页</div>
            <br/>
            <Descriptions
                dataSource={[
                    [
                        {label: "使用规则", content: "待XX，暂停"},
                        {
                            label: "示例",
                            content: (
                                <Space>
                                    <StateTag {...{type: "info", text: "待提交开票"}} />
                                    <Typography.Text
                                        copyable={{
                                            text: '<StateTag type="info" text="标签内容" />',
                                        }}
                                    />
                                </Space>
                            ),
                        },
                    ],
                    [
                        {label: "使用规则", content: "XX中，正在XX中"},
                        {
                            label: "示例",
                            content: (
                                <Space>
                                    <StateTag {...{type: "progress", text: "退票审核中"}} />
                                    <Typography.Text
                                        copyable={{
                                            text: '<StateTag type="progress" text="标签内容" />',
                                        }}
                                    />
                                </Space>
                            ),
                        },
                    ],
                    [
                        {label: "使用规则", content: "通过，成功，完成"},
                        {
                            label: "示例",
                            content: (
                                <Space>
                                    <StateTag {...{type: "success", text: "标签内容"}} />
                                    <Typography.Text
                                        copyable={{
                                            text: '<StateTag type="success" text="标签内容" />',
                                        }}
                                    />
                                </Space>
                            ),
                        },
                    ],
                    [
                        {label: "使用规则", content: "不通过，失败，淘汰，缺席，拒绝"},
                        {
                            label: "示例",
                            content: (
                                <Space>
                                    <StateTag {...{type: "danger", text: "退票拒绝"}} />
                                    <Typography.Text
                                        copyable={{
                                            text: '<StateTag type="danger" text="标签内容" />',
                                        }}
                                    />
                                </Space>
                            ),
                        },
                    ],
                    [
                        {label: "使用规则", content: "取消，撤销，停止"},
                        {
                            label: "示例",
                            content: (
                                <Space>
                                    <StateTag {...{type: "default", text: "撤销开票审核"}} />
                                    <Typography.Text
                                        copyable={{
                                            text: '<StateTag type="default" text="标签内容" />',
                                        }}
                                    />
                                </Space>
                            ),
                        },
                    ],
                    [
                        {label: "使用规则", content: "（暂时还未用到）"},
                        {
                            label: "示例",
                            content: (
                                <Space>
                                    <StateTag {...{type: "other", text: "标签内容"}} />
                                    <Typography.Text
                                        copyable={{
                                            text: '<StateTag type="other" text="标签内容" />',
                                        }}
                                    />
                                </Space>
                            ),
                        },
                    ],
                ]}
            />
            <br/>
            <br/>
            <div>个别特殊场景（需要单独询问UI):</div>
            <br/>
            <Descriptions
                dataSource={[
                    [
                        {label: "使用规则", content: "待XX，暂停"},
                        {
                            label: "示例",
                            content: (
                                <div>
                                    <StateTag {...{type: "success", text: "已推荐简历"}} />
                                    <StateTag {...{type: "success", text: "已退票"}} />
                                </div>
                            ),
                        },
                    ],
                    [
                        {label: "使用规则", content: "已XX待XX"},
                        {
                            label: "示例",
                            content: (
                                <div>
                                    <StateTag {...{type: "success", text: "已开票待寄出"}} />
                                    <StateTag {...{type: "success", text: "已待寄待收款"}} />
                                </div>
                            ),
                        },
                    ],
                    [
                        {
                            label: "使用规则",
                            content: "已XX+词语：根据后面的词语语义进行判断",
                        },
                        {
                            label: "示例",
                            content: (
                                <div>
                                    <StateTag {...{type: "success", text: "已成功"}} />
                                    <StateTag {...{type: "default", text: "已取消"}} />
                                    <StateTag {...{type: "danger", text: "已失败"}} />
                                    <StateTag {...{type: "progress", text: "已暂停"}} />
                                </div>
                            ),
                        },
                    ],
                    [
                        {label: "使用规则", content: "完全根据语义语境判断"},
                        {
                            label: "示例",
                            content: (
                                <div>
                                    <StateTag {...{type: "success", text: "全部到款"}} />
                                    <StateTag {...{type: "success", text: "部分到款"}} />
                                    <StateTag {...{type: "success", text: "简历亮点"}} />
                                    <StateTag {...{type: "danger", text: "简历风险点"}} />
                                </div>
                            ),
                        },
                    ],
                ]}
            />
        </div>
    );
};

render(<BaseExample/>);

```

- 基本示例
- 技能标签
- _StateTag(@components/StateTag)

```jsx
const {default: StateTag} = _StateTag;

const BaseExample = () => {
    return (
        <div>
            <StateTag
                text={"技能标签"}
                type={"skill"}
                showBorder
                showBackground={false}
            />
        </div>
    );
};

render(<BaseExample/>);

```

- 基本示例
- 下拉菜单、弹窗中已选结果标签
- _StateTag(@components/StateTag)

```jsx
const {default: StateTag} = _StateTag;

const BaseExample = () => {
    return (
        <div>
            <StateTag
                text={"技能标签"}
                type={"result"}
                showBackground={false}
                closable
                onClose={() => console.log("close")}
            />
            <StateTag
                text={"技能标签"}
                type={"result"}
                closable
                onClose={() => console.log("close")}
            />
        </div>
    );
};

render(<BaseExample/>);

```

- 基本示例
- 筛选组件中筛选结果标签
- _StateTag(@components/StateTag)

```jsx
const {default: StateTag} = _StateTag;

const BaseExample = () => {
    return (
        <div>
            <StateTag
                filterName={"BD"}
                text={"陈枫林，王晓晨"}
                type={"filterResult"}
                closable
                onClose={() => console.log("close")}
            />
            <br/>
            <StateTag
                filterName={"添加人"}
                text={"陈枫林，王晓晨，陈路，张力"}
                type={"filterResult"}
                closable
                onClose={() => console.log("close")}
            />
        </div>
    );
};

render(<BaseExample/>);

```

### API

| 属性名            | 说明                            | 类型                                                                                                                                                                                             | 默认值       |
|----------------|-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| type           | tag的类型，类型决定显示的颜色              | 'default'(#666666)、'skill'(#666666)(此时边框颜色为 #EEEEEE)、'success'(#027A48)、'progress'(#F09700)、'danger'(#D14343)、'info'(#155ACF)、'other'(#6740C3)(待定颜色)、'result'(#666666)、'filterResult'(#5CB8B2) | 'default' |
| showBorder     | 是否展示边框                        | boolean                                                                                                                                                                                        | false     |
| showBackground | 是否展示背景色                       | boolean                                                                                                                                                                                        | true      |
| text           | tag文案                         | string                                                                                                                                                                                         | ''        |
| filterName     | tag类型为“filterResult”时显示在前边的文案 | string                                                                                                                                                                                         | ''        |

其他参数参考 [antd Tag.Tag](https://ant.design/components/tag-cn)

---

# Table

### 概述

可以从后端获取数据，然后展示为一个表格

### 示例(全屏)

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Table(@components/Table),_Global(@components/Global),reactFetch(@kne/react-fetch)

```jsx
const {default: Table} = _Table;
const {PureGlobal} = _Global;
const {preset} = reactFetch;

const ajax = (config) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (config.url === "/api/v1/user/user/user_key_get") {
                resolve({
                    data: {
                        code: 0,
                        data: `{"date":{"visible":false},"serialNumber":{"width":400}}`,
                    },
                });
            } else if (config.url === "/api/v1/user/user/user_key_set") {
                console.log(config.data);
                resolve({
                    data: {
                        code: 0,
                        data: "",
                    },
                });
            }
        }, 100);
    });
};

preset({
    ajax,
});

const BaseExample = () => {
    return (
        <PureGlobal
            preset={{
                ajax,
                /*tableServerApis: {
          getDataApi: (name) => {
            return {
              url: "/api/v1/user/user/user_key_get",
              method: "GET",
              params: {
                key: `table_config_v2_${name}`,
              },
              transformResponse: (response) => {
                const { data } = response;
                response.data = Object.assign({}, data, {
                  data: (() => {
                    try {
                      return JSON.parse(data.data);
                    } catch (e) {
                      return [];
                    }
                  })(),
                });

                response.data = {
                  code: response.data.code === 0 ? 200 : data.code,
                  msg: response.data.msg,
                  results: response.data.data,
                };

                return response;
              },
              cache: "TABLE_PAGE_CONFIG",
            };
          },
          setDataFunc: (name, data) => {
            return ajax({
              url: "/api/v1/user/user/user_key_set",
              data: {
                map: {
                  [`table_config_v2_${name}`]: JSON.stringify(data),
                },
              },
            });
          },
        },*/
            }}
        >
            <Table
                name="test-table"
                onTablePropsReady={({columns, dataSource}) => {
                    console.log({columns, dataSource});
                }}
                dataSource={[
                    {
                        id: 0,
                        date: "2021-07-21",
                        datetime: "2023-07-22 09:00:00",
                        serialNumber: "SX00192932323434",
                        serialNumberShort: "SH0023",
                        userName: "林珊珊",
                        title: "我是主要字段",
                        tagEnum: null,
                        enUserName: "Lin Shanshan",
                        phoneNumber: "+86 18792877372",
                        email: "a@a.com",
                        count: 4,
                        description:
                            "我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",
                        description2:
                            "我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",
                        other: "其他信息",
                    },
                    {
                        id: 1,
                        date: "",
                        datetime: "2023-07-22 09:00:00",
                        serialNumber: "SX00192932323434",
                        serialNumberShort: "SH0023",
                        userName: "林珊珊1",
                        title: "我是主要字段",
                        tagEnum: "Y",
                        enUserName: "Lin Shanshan",
                        phoneNumber: null,
                        email: "a@a.com",
                        count: 5,
                        description: "我是一段描述",
                        description2: "我是一段描述",
                        other: "其他信息",
                    },
                ]}
                columns={[
                    {
                        name: "date",
                        title: "日期",
                        type: "date",
                        hover: true,
                    },
                    {
                        name: "datetime",
                        title: "日期时间",
                        type: "datetime",
                        hideSecond: true,
                    },
                    {
                        name: "serialNumber",
                        title: "编号",
                        type: "serialNumber",
                        primary: true,
                        onClick: async (item) => {
                            console.log(item);
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve(true);
                                }, 10000);
                            });
                        },
                    },
                    {
                        name: "serialNumberShort",
                        title: "短编号",
                        type: "serialNumberShort",
                    },
                    {
                        name: "title",
                        title: "主要信息",
                        type: "mainInfo",
                    },
                    {
                        name: "tag",
                        title: "状态标签",
                        type: "tag",
                        valueOf: () => ({type: "success", text: "审核通过"}),
                    },
                    {
                        name: "tagEnum",
                        title: "标签枚举",
                        type: "tag",
                        valueOf: (item) =>
                            item.tagEnum && {
                                type: "success",
                                isEnum: true,
                                moduleName: "marital",
                                name: item.tagEnum,
                            },
                    },
                    {
                        name: "avatar",
                        title: "头像",
                        type: "avatar",
                        valueOf: () => ({gender: "F"}),
                    },
                    {
                        name: "user",
                        title: "用户",
                        type: "user",
                        valueOf: (item) => `${item.enUserName} ${item.userName}`,
                    },
                    {
                        name: "hideInfo",
                        title: "隐藏字段",
                        type: "hideInfo",
                        valueOf: (item) =>
                            item["phoneNumber"] && {
                                loader: () => {
                                    return item["phoneNumber"] + "-" + item["id"];
                                },
                            },
                    },
                    {
                        name: "userName",
                        title: "用户名",
                        type: "userName",
                    },
                    {
                        name: "contacts",
                        title: "联系人",
                        type: "contacts",
                        valueOf: (item) => `${item.userName} ${item.phoneNumber}`,
                    },
                    {
                        name: "count",
                        title: "数量",
                        type: "singleRow",
                        render: ({target}) => {
                            return target.count === 5 ? {hover: true} : {hover: false};
                        },
                    },
                    {
                        name: "description",
                        title: "描述",
                        type: "description",
                    },
                    {
                        name: "description2",
                        title: "描述(省略)",
                        type: "description",
                        ellipsis: true,
                    },
                    {
                        name: "other",
                        title: "其他",
                        type: "other",
                        hover: true,
                    },
                    {
                        name: "options",
                        title: "操作",
                        type: "options",
                        valueOf: (item) => [
                            {
                                onClick: () => {
                                    return new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve();
                                        }, 1000);
                                    });
                                },
                                children: "分配",
                                message: "确定要分配吗",
                                isDelete: false,
                            },
                            {
                                children: "审核",
                            },
                            {
                                onClick: () => {
                                    console.log(item);
                                },
                                children: "淘汰",
                            },
                            {
                                onClick: () => {
                                    console.log(item);
                                },
                                children: "一键约面",
                            },
                            {
                                children: "删除",
                                confirm: true,
                                onClick: () => {
                                    console.log("删除");
                                },
                            },
                        ],
                    },
                ]}
            />
        </PureGlobal>
    );
};

render(<BaseExample/>);

```

- 这里填写示例标题
- 这里填写示例说明
- _Table(@components/Table),lodash(lodash),_Global(@components/Global)

```jsx
const {PureGlobal} = _Global;
const {TablePage} = _Table;
const {range} = lodash;
const BaseExample = () => {
    return (
        <PureGlobal
            preset={{
                features: {
                    debug: true,
                    profile: {
                        id: "erc",
                        type: "system",
                        name: "业务系统",
                        children: [
                            {
                                id: "test",
                                type: "feature",
                                name: "测试功能",
                                options: {
                                    hiddenColumns: ["date", "datetime"],
                                },
                            },
                        ],
                    },
                },
            }}
        >
            <TablePage
                featureId="test"
                name="test-2"
                sticky={false}
                rowSelection={{
                    type: "checkbox",
                }}
                loader={() => {
                    return {
                        addUserName: "我是大魔王",
                        pageData: range(0, 50).map((index) => ({
                            id: index,
                            date: "2021-07-21",
                            datetime: "2023-07-22 09:00:00",
                            serialNumber: "SX00192932323434",
                            serialNumberShort: "SH0023",
                            userName: "林珊珊" + index,
                            title: "我是主要字段",
                            enUserName: "Lin Shanshan",
                            phoneNumber: "+86 18792877372",
                            email: "a@a.com",
                            count: 5,
                            description:
                                "我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",
                            other: "其他信息",
                        })),
                        totalCount: 50,
                    };
                }}
                columns={[
                    {
                        name: "date",
                        title: "日期",
                        type: "date",
                        hover: true,
                    },
                    {
                        name: "datetime",
                        title: "日期时间",
                        type: "datetime",
                    },
                    {
                        name: "dateRange",
                        title: "日期范围",
                        type: "dateRange",
                        valueOf: ({date, datetime}) => [date, datetime],
                    },
                    {
                        name: "serialNumber",
                        title: "编号",
                        type: "serialNumber",
                        primary: true,
                    },
                    {
                        name: "serialNumberShort",
                        title: "短编号",
                        type: "serialNumberShort",
                    },
                    {
                        name: "title",
                        title: "主要信息",
                        type: "mainInfo",
                    },
                    {
                        name: "phone",
                        title: "手机号",
                        type: "hideInfo",
                        primary: true,
                        valueOf: (item) => ({
                            loader: () => {
                                return item["phoneNumber"] + "-" + item["id"];
                            },
                        }),
                    },
                    {
                        name: "email",
                        title: "邮箱",
                        type: "hideInfo",
                        valueOf: (item) => ({
                            loader: () => {
                                return item["email"] + "-" + item["id"];
                            },
                            children: (data) => {
                                return `${data},${item["userName"]}`;
                            },
                        }),
                    },
                    {
                        name: "tag",
                        title: "状态标签",
                        type: "tag",
                        valueOf: () => ({type: "success", text: "审核通过"}),
                    },
                    {
                        name: "avatar",
                        title: "头像",
                        type: "avatar",
                        valueOf: () => ({gender: "F"}),
                    },
                    {
                        name: "user",
                        title: "用户",
                        type: "user",
                        valueOf: (item) => `${item.enUserName} ${item.userName}`,
                    },
                    {
                        name: "userName",
                        title: "用户名",
                        type: "userName",
                    },
                    {
                        name: "contacts",
                        title: "联系人",
                        type: "contacts",
                        valueOf: (item) => `${item.userName} ${item.phoneNumber}`,
                    },
                    {
                        name: "count",
                        title: "数量",
                        type: "singleRow",
                    },
                    {
                        name: "description",
                        title: "描述(省略)",
                        type: "description",
                        ellipsis: true,
                    },
                    {
                        name: "other",
                        title: "其他",
                        type: "other",
                        hover: true,
                    },
                    {
                        name: "addUser",
                        title: "添加人",
                        type: "user",
                        render: ({data}) => ({valueOf: () => data.addUserName}),
                    },
                    {
                        name: "options",
                        title: "操作",
                        type: "options",
                        fixed: "right",
                        valueOf: (item) => [
                            {
                                onClick: () => {
                                    return new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve();
                                        }, 1000);
                                    });
                                },
                                children: "编辑",
                                disabled: true,
                            },
                            {
                                children: "审核",
                            },
                            {
                                onClick: () => {
                                    console.log(item);
                                },
                                children: "淘汰",
                            },
                            {
                                onClick: () => {
                                    console.log(item);
                                },
                                children: "一键约面",
                            },
                            {
                                children: "删除",
                            },
                        ],
                    },
                ]}
            />
        </PureGlobal>
    );
};

render(<BaseExample/>);

```

- 这里填写示例标题
- 这里填写示例说明
- _Table(@components/Table),_Global(@components/Global),reactFetch(@kne/react-fetch),antd(antd)

```jsx
const {default: Table} = _Table;
const {PureGlobal} = _Global;
const {preset} = reactFetch;
const {useState} = React;
const {Input} = antd;
const ajax = (config) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (config.url === "/api/v1/user/user/user_key_get") {
                resolve({
                    data: {
                        code: 0,
                        data: `{"date":{},"serialNumber":{"width":400}}`,
                    },
                });
            } else if (config.url === "/api/v1/user/user/user_key_set") {
                console.log(config.data);
                resolve({
                    data: {
                        code: 0,
                        data: "",
                    },
                });
            }
        }, 100);
    });
};

preset({
    ajax,
});

const ValueEdit = ({value, targetRender}) => {
    const [isEdit, setIsEdit] = useState(false);
    return (
        <span
            onClick={() => {
                setIsEdit(true);
            }}
        >
      {isEdit ? (
          <Input
              type="text"
              size="small"
              defaultValue={value}
              onBlur={() => {
                  setIsEdit(false);
              }}
          />
      ) : (
          targetRender(value)
      )}
    </span>
    );
};

const BaseExample = () => {
    return (
        <PureGlobal
            preset={{
                ajax,
                tableServerApis: {
                    getDataApi: (name) => {
                        return {
                            url: "/api/v1/user/user/user_key_get",
                            method: "GET",
                            params: {
                                key: `table_config_v2_${name}`,
                            },
                            transformResponse: (response) => {
                                const {data} = response;
                                response.data = Object.assign({}, data, {
                                    data: (() => {
                                        try {
                                            return JSON.parse(data.data);
                                        } catch (e) {
                                            return [];
                                        }
                                    })(),
                                });

                                response.data = {
                                    code: response.data.code === 0 ? 200 : data.code,
                                    msg: response.data.msg,
                                    results: response.data.data,
                                };

                                return response;
                            },
                            cache: "TABLE_PAGE_CONFIG",
                        };
                    },
                    setDataFunc: (name, data) => {
                        return ajax({
                            url: "/api/v1/user/user/user_key_set",
                            data: {
                                map: {
                                    [`table_config_v2_${name}`]: JSON.stringify(data),
                                },
                            },
                        });
                    },
                },
            }}
        >
            <Table
                name="test-table"
                dataSource={[
                    {
                        id: 0,
                        date: "2021-07-21",
                        datetime: "2023-07-22 09:00:00",
                        serialNumber: "SX00192932323434",
                        serialNumberShort: "SH0023",
                        userName: "林珊珊",
                        title: "我是主要字段",
                        tagEnum: "Y",
                        enUserName: "Lin Shanshan",
                        phoneNumber: "+86 18792877372",
                        email: "a@a.com",
                        count: 4,
                        description:
                            "我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",
                        description2:
                            "我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",
                        other: "其他信息",
                    },
                    {
                        id: 1,
                        date: "",
                        datetime: "2023-07-22 09:00:00",
                        serialNumber: "SX00192932323434",
                        serialNumberShort: "SH0023",
                        userName: "林珊珊1",
                        title: "我是主要字段",
                        tagEnum: "Y",
                        enUserName: "Lin Shanshan",
                        phoneNumber: "+86 18792877372",
                        email: "a@a.com",
                        count: 5,
                        description: "我是一段描述",
                        description2: "我是一段描述",
                        other: "其他信息",
                    },
                ]}
                columns={[
                    {
                        name: "date",
                        title: "日期",
                        sort: true,
                        groupHeader: [
                            {
                                name: "group1",
                                title: "分组1",
                            },
                            {
                                name: "group1-1",
                                title: "分组1-1",
                            },
                        ],
                        type: "date",
                        hover: true,
                    },
                    {
                        name: "datetime",
                        title: "日期时间",
                        sort: true,
                        groupHeader: [
                            {
                                name: "group1",
                                title: "分组1",
                            },
                            {
                                name: "group1-2",
                                title: "分组1-2",
                            },
                        ],
                        type: "datetime",
                    },
                    {
                        name: "serialNumber",
                        title: "编号",
                        sort: true,
                        groupHeader: [
                            {
                                name: "group1",
                                title: "分组1",
                            },
                            {
                                name: "group1-1",
                                title: "分组1-1",
                            },
                        ],
                        type: "serialNumber",
                        primary: true,
                    },
                    {
                        name: "serialNumberShort",
                        title: "短编号",
                        type: "serialNumberShort",
                    },
                    {
                        name: "title",
                        title: "主要信息",
                        type: "mainInfo",
                        disableColItem: true,
                        valueOf: (item, {targetRender}) => (
                            <ValueEdit value={item["title"]} targetRender={targetRender}/>
                        ),
                    },
                    {
                        name: "tag",
                        title: "状态标签",
                        type: "tag",
                        valueOf: () => ({type: "success", text: "审核通过"}),
                    },
                    {
                        name: "tagEnum",
                        title: "标签枚举",
                        type: "tag",
                        valueOf: (item) => ({
                            type: "success",
                            isEnum: true,
                            moduleName: "marital",
                            name: item.tagEnum,
                        }),
                    },
                    {
                        name: "avatar",
                        title: "头像",
                        type: "avatar",
                        valueOf: () => ({gender: "F"}),
                    },
                    {
                        name: "user",
                        title: "用户",
                        type: "user",
                        valueOf: (item) => `${item.enUserName} ${item.userName}`,
                    },
                    {
                        name: "hideInfo",
                        title: "隐藏字段",
                        type: "hideInfo",
                        valueOf: (item) => ({
                            loader: () => {
                                return item["phoneNumber"] + "-" + item["id"];
                            },
                        }),
                    },
                    {
                        name: "userName",
                        title: "用户名",
                        type: "userName",
                    },
                    {
                        name: "contacts",
                        title: "联系人",
                        type: "contacts",
                        valueOf: (item) => `${item.userName} ${item.phoneNumber}`,
                    },
                    {
                        name: "count",
                        title: "数量",
                        type: "singleRow",
                        render: ({target}) => {
                            return target.count === 5 ? {hover: true} : {hover: false};
                        },
                    },
                    {
                        name: "description",
                        title: "描述",
                        type: "description",
                    },
                    {
                        name: "description2",
                        title: "描述(省略)",
                        type: "description",
                        ellipsis: true,
                    },
                    {
                        name: "other",
                        title: "其他",
                        type: "other",
                        hover: true,
                        sort: true,
                    },
                    {
                        name: "options",
                        title: "操作",
                        type: "options",
                        fixed: "right",
                        sort: true,
                        valueOf: (item) => [
                            {
                                onClick: () => {
                                    return new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve();
                                        }, 1000);
                                    });
                                },
                                children: "分配Program及教练",
                            },
                            {
                                children: "审核",
                            },
                            {
                                onClick: () => {
                                    console.log(item);
                                },
                                children: "淘汰",
                            },
                            {
                                onClick: () => {
                                    console.log(item);
                                },
                                children: "一键约面",
                            },
                            {
                                children: "删除",
                            },
                        ],
                    },
                ]}
                onSortChange={(sort) => {
                    console.log(">>>>>>", sort);
                }}
            />
        </PureGlobal>
    );
};

render(<BaseExample/>);

```

### API

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|

---

# TablePage

### 概述

可以从后端获取数据，然后展示为一个表格

***（已废弃，不建议使用，请用Table的TablePage组件代替）***

### 示例(全屏)

#### 示例样式

```scss
.table-Limit-height {
  height: 600px;
  overflow: auto;
  max-width: 1000px;
  margin: 0 auto;
}
```

#### 示例代码

- 普通表格
- 展示一个普通的表格
- tablePage(@components/TablePage),_(lodash),global(@components/Global),reactFetch(@kne/react-fetch)

```jsx
const {default: TablePage} = tablePage;
const {PureGlobal} = global;
const {range} = _;
const {preset} = reactFetch;

const ajax = (config) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (config.url === "/api/v1/user/user/user_key_get") {
                resolve({
                    data: {
                        code: 0,
                        data: `[{\"id\":\"clientName\",\"name\":\"客户名称\",\"width\":341,\"chosen\":false,\"selected\":false},{\"id\":\"city\",\"name\":\"工作地点\",\"width\":341,\"chosen\":false,\"selected\":false},{\"id\":\"startTime\",\"name\":\"职位开始时间\",\"hidden\":false,\"width\":200,\"chosen\":false,\"selected\":false},{\"id\":\"options\",\"name\":\"操作\",\"fixed\":\"right\",\"width\":341}]`,
                    },
                });
            } else if (config.url === "/api/v1/user/user/user_key_set") {
                console.log(config.data);
                resolve({
                    data: {
                        code: 0,
                        data: "",
                    },
                });
            }
        }, 100);
    });
};

preset({
    ajax,
});

const Example = () => {
    return (
        <PureGlobal
            preset={{
                ajax,
                tablePageServerApis: {
                    getDataApi: (name) => {
                        return {
                            url: "/api/v1/user/user/user_key_get",
                            method: "GET",
                            params: {
                                key: `table_config_${name}`,
                            },
                            transformResponse: (response) => {
                                const {data} = response;
                                response.data = Object.assign({}, data, {
                                    data: (() => {
                                        try {
                                            return JSON.parse(data.data);
                                        } catch (e) {
                                            return [];
                                        }
                                    })(),
                                });

                                response.data = {
                                    code: response.data.code === 0 ? 200 : data.code,
                                    msg: response.data.msg,
                                    results: response.data.data,
                                };

                                return response;
                            },
                            cache: "TABLE_PAGE_CONFIG",
                        };
                    },
                    setDataFunc: (name, data) => {
                        return ajax({
                            url: "/api/v1/user/user/user_key_set",
                            data: {
                                map: {
                                    [`table_config_${name}`]: JSON.stringify(data),
                                },
                            },
                        });
                    },
                },
            }}
        >
            <TablePage
                name="test1"
                rowSelection={{
                    type: "checkbox",
                }}
                columns={[
                    {
                        title: (
                            <div>
                                职位名称<i>~</i>
                            </div>
                        ),
                        titleText: "职位名称",
                        key: "positionName",
                        fixed: "left",
                        dataIndex: "positionName",
                    },
                    {
                        title: "客户名称",
                        key: "clientName",
                        dataIndex: "clientName",
                    },
                    {
                        title: "工作地点",
                        key: "city",
                        dataIndex: "city",
                    },
                    {
                        title: "工作地点1",
                        key: "city1",
                        dataIndex: "city",
                    },
                    {
                        title: "工作地点2",
                        key: "city2",
                        dataIndex: "city",
                    },
                    {
                        title: "工作地点3",
                        key: "city3",
                        dataIndex: "city",
                    },
                    {
                        title: "工作地点4",
                        key: "city4",
                        dataIndex: "city",
                    },
                    {
                        title: "工作地点5",
                        key: "city5",
                        dataIndex: "city",
                    },
                    {
                        title: "工作地点6",
                        key: "city6",
                        dataIndex: "city",
                    },
                    {
                        title: "工作地点7",
                        key: "city7",
                        dataIndex: "city",
                    },
                    {
                        title: "工作地点8",
                        key: "city8",
                        dataIndex: "city",
                    },
                    {
                        title: "工作地点9",
                        key: "city9",
                        dataIndex: "city",
                    },
                    {
                        title: "职位开始时间",
                        key: "startTime",
                        dataIndex: "startTime",
                        hidden: true,
                    },
                    {
                        title: "操作",
                        key: "options",
                        fixed: "right",
                        width: 300,
                        render: () => {
                            return "操作";
                        },
                    },
                ]}
                sticky={false}
                data={{currentPage: 1, perPage: 20}}
                loader={({data}) => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve({
                                pageData: range(data.perPage).map((index) => ({
                                    id: index + (data.currentPage - 1) * data.perPage + 1,
                                    positionName:
                                        "市场运营总监" +
                                        (index + (data.currentPage - 1) * data.perPage + 1),
                                    clientName: "大众",
                                    city: "北京",
                                    startTime: "2020-01-10",
                                })),
                                totalCount: 100,
                            });
                        }, 100);
                    });
                }}
            />
        </PureGlobal>
    );
};

render(<Example/>);

```

- 树形数据
- 展示一个树形数据的表格
- tablePage(@components/TablePage),_(lodash)

```jsx
const {default: TablePage} = tablePage;
const {range} = _;

const Example = () => {
    return (
        <TablePage
            name="test1"
            columns={[
                {
                    title: "职位名称",
                    key: "positionName",
                    fixed: "left",
                    dataIndex: "positionName",
                },
                {
                    title: "客户名称",
                    key: "clientName",
                    dataIndex: "clientName",
                },
                {
                    title: "工作地点",
                    key: "city",
                    dataIndex: "city",
                },
                {
                    title: "职位开始时间",
                    key: "startTime",
                    dataIndex: "startTime",
                    hidden: true,
                },
                {
                    title: "操作",
                    key: "options",
                    fixed: "right",
                    width: 300,
                    render: () => {
                        return "操作";
                    },
                },
            ]}
            sticky={false}
            data={{currentPage: 1, perPage: 20}}
            loader={({data}) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            pageData: range(data.perPage).map((index) => ({
                                id: index + (data.currentPage - 1) * data.perPage + 1,
                                positionName:
                                    "市场运营总监" +
                                    (index + (data.currentPage - 1) * data.perPage + 1),
                                clientName: "大众",
                                city: "北京",
                                startTime: "2020-01-10",
                                children: range(10).map((i) => {
                                    return {
                                        id:
                                            index +
                                            (data.currentPage - 1) * data.perPage +
                                            1 +
                                            "-" +
                                            i,
                                        positionName:
                                            "市场运营总监" +
                                            (index + (data.currentPage - 1) * data.perPage + 1) +
                                            "-" +
                                            i,
                                        clientName: "大众",
                                        city: "北京",
                                        startTime: "2020-01-10",
                                        children:
                                            index === 0
                                                ? [
                                                    {
                                                        id:
                                                            index +
                                                            (data.currentPage - 1) * data.perPage +
                                                            1 +
                                                            "-" +
                                                            i +
                                                            "-last",
                                                        positionName: "最后一层",
                                                        clientName: "最后一层",
                                                        city: "最后一层",
                                                        startTime: "2020-01-10",
                                                    },
                                                ]
                                                : null,
                                    };
                                }),
                            })),
                            totalCount: 100,
                        });
                    }, 100);
                });
            }}
        />
    );
};

render(<Example/>);

```

- 固定表头表格
- 展示一个固定表头的表格
- tablePage(@components/TablePage),_(lodash)

```jsx
const {default: TablePage} = tablePage;
const {range} = _;
const {useRef} = React;

const Example = () => {
    const ref = useRef();
    return (
        <div className="table-Limit-height" ref={ref}>
            <div
                style={{
                    height: 700,
                }}
            >
                请往下拉
            </div>
            <TablePage
                stickyOffset="0px"
                scroller={{
                    getContainer: () => ref.current,
                }}
                data={{currentPage: 1, perPage: 20}}
                columns={[
                    {
                        title: "职位名称",
                        key: "positionName",
                        fixed: "left",
                        dataIndex: "positionName",
                    },
                    {
                        title: "客户名称",
                        key: "clientName",
                        dataIndex: "clientName",
                    },
                    {
                        title: "工作地点",
                        key: "city",
                        dataIndex: "city",
                    },
                    {
                        title: "职位开始时间",
                        key: "startTime",
                        dataIndex: "startTime",
                    },
                ]}
                loader={({data}) => {
                    return {
                        pageData: range(data.perPage).map((index) => ({
                            id: index + (data.currentPage - 1) * data.perPage + 1,
                            positionName:
                                "市场运营总监" +
                                (index + (data.currentPage - 1) * data.perPage + 1),
                            clientName: "大众",
                            city: "北京",
                            startTime: "2020-01-10",
                        })),
                        totalCount: 100,
                    };
                }}
            />
        </div>
    );
};

render(<Example/>);

```

- 日期格式化表格
- 展示一个日期格式化表格
- tablePage(@components/TablePage),_(lodash),dayjs(dayjs)

```jsx
const {default: TablePage} = tablePage;
const {range} = _;
const dayjs = dayjs;

const dateFormat = (target) => {
    return dayjs(target).format("YYYY-MM-DD HH:mm:ss");
};

const Example = () => {
    return (
        <TablePage
            sticky={false}
            columns={[
                {
                    title: "职位名称",
                    key: "positionName",
                    fixed: "left",
                    dataIndex: "positionName",
                },
                {
                    title: "客户名称",
                    key: "clientName",
                    dataIndex: "clientName",
                },
                {
                    title: "工作地点",
                    key: "city",
                    dataIndex: "city",
                },
                {
                    title: "职位开始时间",
                    key: "startTime",
                    dataIndex: "startTime",
                    render: dateFormat,
                },
                {
                    title: "职位结束时间",
                    key: "endTime",
                    dataIndex: "endTime",
                    render: dateFormat,
                },
            ]}
            data={{currentPage: 1, perPage: 10}}
            loader={({data}) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            pageData: range(data.perPage).map((index) => ({
                                id: index + (data.currentPage - 1) * data.perPage + 1,
                                positionName:
                                    "市场运营总监" +
                                    (index + (data.currentPage - 1) * data.perPage + 1),
                                clientName: "大众",
                                city: "北京",
                                startTime: "2020-01-10",
                                endTime: "2020-02-10",
                            })),
                            totalCount: 48,
                        });
                    }, 1000);
                });
            }}
        />
    );
};

render(<Example/>);

```

- 动态column获取
- 展示动态column获取的表格
- tablePage(@components/TablePage),_(lodash)

```jsx
const {default: TablePage} = tablePage;
const {range} = _;

const Example = () => {
    return (
        <TablePage
            sticky={false}
            getColumns={({data, formatData}) => {
                console.log(data, formatData);
                return Promise.resolve([
                    {
                        title: "职位名称",
                        key: "positionName",
                        fixed: "left",
                        dataIndex: "positionName",
                    },
                    {
                        title: "客户名称",
                        key: "clientName",
                        dataIndex: "clientName",
                    },
                    {
                        title: "工作地点",
                        key: "city",
                        dataIndex: "city",
                    },
                    {
                        title: "职位开始时间",
                        key: "startTime",
                        dataIndex: "startTime",
                    },
                ]);
            }}
            data={{currentPage: 1, perPage: 20}}
            loader={({data}) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            pageData: range(data.perPage).map((index) => ({
                                id: index + (data.currentPage - 1) * data.perPage + 1,
                                positionName:
                                    "市场运营总监" +
                                    (index + (data.currentPage - 1) * data.perPage + 1),
                                clientName: "大众",
                                city: "北京",
                                startTime: "2020-01-10",
                            })),
                            totalCount: 100,
                        });
                    }, 1000);
                });
            }}
        />
    );
};

render(<Example/>);

```

### API

| 属性名            | 说明                                                                                           | 类型       | 默认值                                                                                                                                                                              |
|----------------|----------------------------------------------------------------------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dataFormat     | 用于处理后端返回的数据，作为表格数据                                                                           | function | (data) => {return {list: data.data.pageData,total: data.data.totalCount};}                                                                                                       |
| pagination     | 控制分页参数                                                                                       | object   | {showSizeChanger: true,showQuickJumper: true,open: true,paramsType: 'data',requestType: 'reload',current: 'currentPage',pageSize: 'perPage',defaultPageSize: 20,size: 'default'} |
| getColumns     | 获取colums参数的函数,该函数的参数可以拿到请求结果数据,如果不传该函数则默认取colums属性 getColumns({data,formatData}),可以返回Promise | function | -                                                                                                                                                                                |
| stickyOffset   | sticky模式，table header距离顶部位置，默认会取 --nav-height，注意：该组件会覆盖调sticky中设置的值，导致其设置不生效，需要配置该参数来实现功能    | string   | var(--nav-height)                                                                                                                                                                |
| controllerOpen | 是否开启列控制，调整列宽和列显示                                                                             | boolean  | true                                                                                                                                                                             |

其他参数参考

表格参数:

[antd Table](https://ant.design/components/table-cn/)

请求数据参数:

[react-fetch](/lib/react-fetch)


---

# Tooltip

### 概述

简单的文字提示气泡框

### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Tooltip(@components/Tooltip),space(antd/lib/space),formInfo(@components/FormInfo)

```jsx
const {default: Tooltip, TooltipInfoLabel} = _Tooltip;
const {default: Space} = space;
const {
    default: FormInfo,
    Form,
    Input,
    TypeDateRangePicker,
    SubmitButton,
    CancelButton,
} = formInfo;

const MoreInfo = () => {
    return (
        <Form>
            <FormInfo
                column={1}
                list={[
                    <Input label="姓名" name="name" rule="REQ"/>,
                    <TypeDateRangePicker
                        name="type_date"
                        label="日期时间段"
                        rule="REQ"
                    />,
                    <Space
                        style={{
                            width: "100%",
                            justifyContent: "end",
                        }}
                    >
                        <CancelButton>取消</CancelButton>
                        <SubmitButton>确定</SubmitButton>
                    </Space>,
                ]}
            />
        </Form>
    );
};

const BaseExample = () => {
    return (
        <Space>
            <Tooltip content="这里显示完整的信息">小段信息</Tooltip>
            <Tooltip
                size="small"
                content="这里显示完整的信息完整的信息，这里显示完整的信息完整的信息这里显示完整的信息完整的信息这里显示完整的信息完整的信息，这里显示完整的信息。"
            >
                大段信息
            </Tooltip>
            <Tooltip title="标题" content="内容描述内容描述内容。">
                带有标题的小段信息
            </Tooltip>
            <Tooltip
                title="标题"
                content="内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述"
            >
                带有标题的大段信息
            </Tooltip>
            <Tooltip
                importantInfo="筛选日期范围内，职位上安排顾问面试的候选人总数。根据所填写的顾问【面试面试】时间来进行统计，而非在系统的操作时间。"
                subtitle="示例:"
                content="2022.10.21在系统操作顾问面试，但填写的顾问面试时间为2022.10.20，则数据会统计在2022.10.20，而非2022.10.21 。"
            >
                带有重要信息
            </Tooltip>
            <TooltipInfoLabel
                title="带有Info信息"
                tooltipTitle={{
                    importantInfo:
                        "筛选日期范围内，职位上安排顾问面试的候选人总数。根据所填写的顾问【面试面试】时间来进行统计，而非在系统的操作时间。",
                    subtitle: "示例:",
                    content:
                        "2022.10.21在系统操作顾问面试，但填写的顾问面试时间为2022.10.20，则数据会统计在2022.10.20，而非2022.10.21 。",
                }}
            />
            <Tooltip
                trigger="click"
                title="标题"
                content="辅助信息描述内容辅助信息描述内容辅助信息描述内容辅助信息描述内容辅助信息描述内容"
                moreInfo={<MoreInfo/>}
            >
                带有表单信息
            </Tooltip>
        </Space>
    );
};

render(<BaseExample/>);

```

- 带有远程数据加载的提示
- 展示带有远程数据加载的提示
- _Tooltip(@components/Tooltip),reactFetch(@kne/react-fetch),_Descriptions(@components/Descriptions),_StateTag(
  @components/StateTag)

```jsx
const {TooltipFetch} = _Tooltip;
const {preset} = reactFetch;
const {default: Descriptions} = _Descriptions;
const {default: StateTag} = _StateTag;

preset({
    ajax: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        code: 0,
                        data: {
                            clientName: "腾讯",
                            title: "腾讯科技公司",
                            type: "增值税专用发票",
                            date: "2022-08-15",
                        },
                    },
                });
            }, 1000);
        });
    },
});

const BaseExample = () => {
    return (
        <TooltipFetch
            api={{
                url: "/api/data",
            }}
            size="large"
            fetchContent={(data) => {
                return {
                    content: (
                        <Descriptions
                            dataSource={[
                                [
                                    {label: "客户名称", content: data.clientName},
                                    {label: "发票抬头", content: data.title},
                                ],
                                [
                                    {label: "发票类型", content: data.type},
                                    {label: "发票日期", content: data.date},
                                ],
                            ]}
                        />
                    ),
                };
            }}
        >
            <StateTag text="哈哈哈"/>
        </TooltipFetch>
    );
};

render(<BaseExample/>);

```

### API

| 属性名               | 说明                           | 类型         | 默认值 |
|-------------------|------------------------------|------------|-----|
| size              | 默认宽度 360，small 宽度 240        | string     | -   |
| title             | 标题内容                         | string,jsx | -   |
| showInfo          | 展示标题旁的提示按钮                   | boolean    | -   |
| importantInfo     | 重要内容                         | string,jsx | -   |
| subtitle          | 副标题                          | string,jsx | -   |
| content           | 内容                           | string,jsx | -   |
| importantInfoType | 重要内容类型，success,error,warning | string,jsx | -   |
| moreInfo          | 其他内容                         | jsx        | -   |

### TooltipFetch

| 属性名          | 说明                                         | 类型       | 默认值 |
|--------------|--------------------------------------------|----------|-----|
| api          | 获取数据的接口，参考@kne/react-fetch                 | object   | -   |
| fetchContent | 当api接口返回值的时候调用，可以获取到接口参数，返回值会更新到Tootip的参数中 | function | -   |

<!--END_SECTION:DOC_MD-->

# ⚡ 最新活动

<!--START_SECTION:activity-->

1. 🎉 Merged PR [#21](https://github.com/kne-union/test-flow/pull/21)
   in [kne-union/test-flow](https://github.com/kne-union/test-flow)
2. 💪 Opened PR [#21](https://github.com/kne-union/test-flow/pull/21)
   in [kne-union/test-flow](https://github.com/kne-union/test-flow)
3. 🗣 Commented on [#20](https://github.com/kne-union/test-flow/issues/20#issuecomment-2375663828)
   in [kne-union/test-flow](https://github.com/kne-union/test-flow)
4. ❗ Opened issue [#20](https://github.com/kne-union/test-flow/issues/20)
   in [kne-union/test-flow](https://github.com/kne-union/test-flow)
5. 🔒 Closed issue [#17](https://github.com/kne-union/test-flow/issues/17)
   in [kne-union/test-flow](https://github.com/kne-union/test-flow)

<!--END_SECTION:activity-->

---
