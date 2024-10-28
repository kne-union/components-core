
# FetchButton


### 概述

用于点击后加载数据的按钮


### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _FetchButton(@components/FetchButton)

```jsx
const {default: FetchButton} = _FetchButton;

const BaseExample = () => {
    return <div>
        <FetchButton api={{
            loader: async () => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve({data: 'xxxxx'});
                    }, 1000);
                });
            }
        }} onClick={(data) => {
            console.log(data);
        }}>点击加载数据</FetchButton>
    </div>;
};

render(<BaseExample/>);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

