
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

const { FetchButton } = Common;

const BaseExample = () => {
  return (
    <FetchButton
      api={{
        loader: () => {
          return [
            { label: "1", content: "11" },
            { label: "2", content: "22" },
          ];
        },
      }}
      modalProps={({ data }) => {
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
      modalFunc={() => {}}
    >
      FetchButton
    </FetchButton>
  );
};

render(<BaseExample />);

```

- Enum
- 这里填写示例说明
- _Common(@components/Common),_antd(antd)

```jsx
const Common = _Common;
const { Space } = _antd;

const { AddressEnum, FunctionEnum, IndustryEnum } = Common;

const BaseExample = () => {
  return (
    <Space direction={"vertical"}>
      <AddressEnum name={"010"} />
      <FunctionEnum name={"010"} />
      <IndustryEnum name={"010"} />
    </Space>
  );
};

render(<BaseExample />);

```

- ScrollLoader
- 这里填写示例说明
- _Common(@components/Common),_reactFetch(@kne/react-fetch),lodash(lodash)

```jsx
const { get, merge, range } = lodash;
const Common = _Common;
const { default: Fetch } = _reactFetch;

const { ScrollLoader } = Common;

const BaseExample = () => {
  console.log(Fetch, _reactFetch);
  return (
    <Fetch
      loader={({ data }) => {
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

render(<BaseExample />);

```

- SearchInput
- 搜索框
- _Common(@components/Common)

```jsx
const Common = _Common;

const { SearchInput } = Common;
const { useState } = React;

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

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

