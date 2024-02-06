
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
const { default: Descriptions } = _Descriptions;
const BaseExample = () => {
  return (
    <Descriptions
      dataSource={[
        [
          { label: "客户名称", content: "腾讯" },
          {
            label: "发票抬头",
            content: "腾讯科技公司",
          },
        ],
        [
          { label: "发票类型", content: "增值税专用发票" },
          {
            label: "发票开具日期",
            content: "2022-08-15",
          },
        ],
        [{ label: "退票金额", content: "22000.00元" }],
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
          { label: "是否需要重开发票", content: "否" },
          {
            label: "是否涉及金融变动",
            content: "否",
          },
        ],
        [
          { label: "是否造成实质损失", content: "否" },
          { label: "责任归属", content: "客户原因" },
        ],
        [
          {
            label: "退票原因",
            content: "退票原因的描述退票原因的描述退票原因的描",
          },
        ],
        [{ label: "附件", content: "附件名称" }],
        [
          { label: "操作时间", content: "2022-08-01 16:32" },
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

render(<BaseExample />);

```


### API

| 属性名                       | 说明                                                                                 | 类型                                         | 默认值  |
|---------------------------|------------------------------------------------------------------------------------|--------------------------------------------|------|
| dataSource                | 详情数据源，内部每个数组为一行数据，每行数据中每个对象为一列数据，每行最多包含2列内容，多余的会被丢弃                                | array[[{display,label,content,featureId}]] | -    |
| dataSource[[{display}]]   | 数据是否展示,当为function时可以接收到(item,dataSource)参数，item为当前项配置，dataSource为整个组件的dataSource配置 | boolean,function                           | true |
| dataSource[[{label}]]     | 数据展示的label                                                                         | jsx                                        | -    |
| dataSource[[{content}]]   | 数据展示的内容                                                                            | jsx                                        | -    |
| dataSource[[{featureId}]] | Features控制的id，参考Features组件的id参数                                                    | string                                     | -    |

