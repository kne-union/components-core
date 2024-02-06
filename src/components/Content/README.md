
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
const {default:Content} = _Content;
const BaseExample = ()=>{
    return <Content list={[
        {label:'标题',content:'内容'},
        {label:'标题标题',content:'内容内容'},
        {label:'标题标',content:'内容内容内容内容内容内容内容内容内容内容'},
        {label:'标题标题标题',content:'内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'}
    ]}/>;
};

render(<BaseExample />);

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

