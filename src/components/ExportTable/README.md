
# ExportTable


### 概述

自定义表格导出列 ***（已废弃请勿使用）***


### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _ExportTable(@components/ExportTable),global(@components/Global),reactFetch(@kne/react-fetch)

```jsx
import { PureGlobal } from "../../Global";

const { default: ExportTable } = _ExportTable;
const { PureGlobal: Global } = global;
const { preset } = reactFetch;

const ajax = (config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          code: 0,
          data: ["remark1", "remark3"],
        },
      });
    }, 100);
  });
};

preset({
  ajax,
});
const BaseExample = () => {
  return (
    <Global
      preset={{
        ajax,
        exportTableServerApis: {
          getDataApi: (name) => {
            return {
              url: "/api/v1/client/client/get_client_export_column",
              method: "POST",
              data: {
                key: name,
              },
              transformResponse: (response) => {
                const { data } = response;
                response.data = Object.assign({}, data, {
                  data: (() => {
                    try {
                      return data.data ? JSON.parse(data.data) : [];
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
            };
          },
          saveDataApi: ({ name, data }) => {
            return ajax({
              url: "/api/v1/client/client/save_client_export_column",
              method: "POST",
              data: {
                exportColumn: data,
                key: name,
              },
            });
          },
        },
      }}
    >
      <ExportTable
        name="ExportTableInvoice"
        columns={[
          {
            title: "发票备注1",
            groupName: "开票信息",
            hidden: true,
            name: "remark1",
            key: "remark1",
            width: 150,
          },
          {
            title: "发票备注2",
            groupName: "开票信息",
            hidden: true,
            name: "remark2",
            key: "remark2",
            width: 150,
          },
          {
            title: "发票备注3",
            groupName: "开票信息1",
            hidden: true,
            name: "remark3",
            key: "remark3",
            width: 150,
          },
          {
            title: "发票备注4",
            groupName: "开票信息1",
            hidden: true,
            name: "remark4",
            key: "remark4",
            width: 150,
          },
          {
            title: "发票备注5",
            groupName: "开票信息3",
            hidden: true,
            name: "remark5",
            key: "remark5",
            width: 150,
          },
          {
            title: "发票备注6",
            groupName: "开票信息3",
            hidden: true,
            name: "remark6",
            key: "remark6",
            width: 150,
          },
          {
            title: "发票备注7",
            groupName: "开票信息4",
            hidden: true,
            name: "remark7",
            key: "remark7",
            width: 150,
          },
          {
            title: "发票备注8",
            groupName: "开票信息4",
            hidden: true,
            name: "remark8",
            key: "remark8",
            width: 150,
          },
        ]}
      />
    </Global>
  );
};

render(<BaseExample />);

```


### API

| 属性名     | 说明 | 类型              | 默认值 |
|---------|--|-----------------|-----|
| columns | 配置同TablePage列,属性key对应后端导出的字段名，不需要参与导出的列可以配置属性exportHidden:true | function, array | []  |
| name | 缓存的名称key（导出接口的key） | string |   |
| onExport | 导出事件 | function({name,downloadBlobFile}) |   |
| saveDataApi | 保存接口APi,如果配置优先取当前值，否则取全局中的配置 |  |   |
| getDataApi | 获取上一次保存的列名数据，如果配置优先取当前值，否则取全局中的配置 |  |   |


