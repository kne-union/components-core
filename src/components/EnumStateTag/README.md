
# EnumStateTag


### 概述

枚举状态标签


### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _EnumStateTag(@components/EnumStateTag),antd(antd),global(@components/Global)

```jsx
const {default:EnumStateTag} = _EnumStateTag;
const { PureGlobal } = global;
const { Space } = antd;

const BaseExample = ()=>{
  return (
    <PureGlobal
      preset={{
        locale: "zh-CN",
        enums: {
          testEnums: async ({ locale }) => {
            console.log(locale);
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([
                  { value: "1", description: "第一项", type: 'success' },
                  { value: "2", description: "第二项", type: 'danger' },
                  { value: "3", description: "第三项", type: 'info'},
                ]);
              }, 1000);
            });
          },
        },
      }}
    >
      <Space>
        <EnumStateTag moduleName="testEnums" name="1" />
        <EnumStateTag moduleName="testEnums" name="2" />
        <EnumStateTag moduleName="testEnums" name="3" />
      </Space>
    </PureGlobal>
  )
};

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

