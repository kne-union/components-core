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