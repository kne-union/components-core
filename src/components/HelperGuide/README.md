
# HelperGuide


### 概述

给用户提供帮助文档


### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _HelperGuide(@components/HelperGuide),Global(@components/Global)

```jsx
const { default: HelperGuide } = _HelperGuide;
const { PureGlobal } = Global;
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
      <HelperGuide name="test" />
    </PureGlobal>
  );
};

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

