
# FlexBox


### 概述

用于根据盒子大小响应式展示不同列


### 示例(全屏)

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _FlexBox(@components/FlexBox),antd(antd)

```jsx
const { default: FlexBox } = _FlexBox;
const { Card } = antd;
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

render(<BaseExample />);

```

- 这里填写示例标题
- 这里填写示例说明
- _FlexBox(@components/FlexBox),antd(antd),lodash(lodash)

```jsx
const { default: FlexBox } = _FlexBox;
const { Card, Button } = antd;
const { range } = lodash;
const { useRef } = React;
const BaseExample = () => {
  const ref = useRef();
  return (
    <div>
      <FlexBox.Fetch
        ref={ref}
        getFetchApi={({ size }) => {
          return {
            data: {
              pageSize: size,
            },
            loader: ({ data }) => {
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

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

