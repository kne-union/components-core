const { default: Table } = _Table;
const { PureGlobal } = _Global;
const { preset } = reactFetch;
const { Input } = antd;

const ajax = (config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: { code: 0, data: "{}" },
      });
    }, 100);
  });
};

preset({ ajax });

const ValueEdit = ({ value, targetRender }) => {
  const [isEdit, setIsEdit] = React.useState(false);
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
          style={{ width: 150 }}
        />
      ) : (
        targetRender(value)
      )}
    </span>
  );
};

const BaseExample = () => {
  return (
    <PureGlobal preset={{ ajax }}>
      <Table
        name="sales-report"
        controllerOpen={true}
        dataSource={[
          {
            id: "SALE001",
            region: "华北区",
            province: "北京",
            city: "北京",
            productName: "企业版SaaS",
            productCode: "SAAS-ENT",
            salesAmount: 1250000.0,
            salesVolume: 50,
            growthRate: 23.5,
            marketShare: 18.2,
            customerCount: 128,
            newCustomerCount: 32,
            repurchaseRate: 85.5,
            avgOrderValue: 9765.6,
            targetCompletion: 92.5,
          },
          {
            id: "SALE002",
            region: "华北区",
            province: "天津",
            city: "天津",
            productName: "专业版SaaS",
            productCode: "SAAS-PRO",
            salesAmount: 890000.0,
            salesVolume: 120,
            growthRate: 15.8,
            marketShare: 12.5,
            customerCount: 95,
            newCustomerCount: 18,
            repurchaseRate: 78.2,
            avgOrderValue: 7416.7,
            targetCompletion: 88.3,
          },
          {
            id: "SALE003",
            region: "华东区",
            province: "上海",
            city: "上海",
            productName: "企业版SaaS",
            productCode: "SAAS-ENT",
            salesAmount: 1680000.0,
            salesVolume: 68,
            growthRate: 35.2,
            marketShare: 22.8,
            customerCount: 156,
            newCustomerCount: 45,
            repurchaseRate: 88.6,
            avgOrderValue: 24705.9,
            targetCompletion: 105.2,
          },
          {
            id: "SALE004",
            region: "华东区",
            province: "浙江",
            city: "杭州",
            productName: "专业版SaaS",
            productCode: "SAAS-PRO",
            salesAmount: 980000.0,
            salesVolume: 95,
            growthRate: 28.6,
            marketShare: 16.3,
            customerCount: 112,
            newCustomerCount: 28,
            repurchaseRate: 82.4,
            avgOrderValue: 10315.8,
            targetCompletion: 95.8,
          },
          {
            id: "SALE005",
            region: "华南区",
            province: "广东",
            city: "深圳",
            productName: "企业版SaaS",
            productCode: "SAAS-ENT",
            salesAmount: 1420000.0,
            salesVolume: 58,
            growthRate: 19.3,
            marketShare: 19.6,
            customerCount: 138,
            newCustomerCount: 35,
            repurchaseRate: 86.2,
            avgOrderValue: 24482.8,
            targetCompletion: 89.5,
          },
        ]}
        columns={[
          {
            name: "region",
            title: "大区",
            type: "other",
            width: 100,
            groupHeader: [
              { name: "area", title: "区域信息" },
            ],
          },
          {
            name: "province",
            title: "省份",
            type: "other",
            width: 100,
            groupHeader: [
              { name: "area", title: "区域信息" },
            ],
          },
          {
            name: "city",
            title: "城市",
            type: "other",
            width: 100,
            groupHeader: [
              { name: "area", title: "区域信息" },
            ],
          },
          {
            name: "productName",
            title: "产品名称",
            type: "mainInfo",
            width: 150,
            groupHeader: [
              { name: "product", title: "产品信息" },
            ],
          },
          {
            name: "productCode",
            title: "产品编码",
            type: "serialNumber",
            width: 150,
            groupHeader: [
              { name: "product", title: "产品信息" },
            ],
          },
          {
            name: "salesAmount",
            title: "销售金额",
            type: "other",
            width: 150,
            sort: { single: true },
            render: ({ target }) => ({
              children: `¥${(target.salesAmount / 10000).toFixed(2)}万`,
            }),
            groupHeader: [
              { name: "sales", title: "销售业绩" },
            ],
          },
          {
            name: "salesVolume",
            title: "销售数量",
            type: "singleRow",
            width: 120,
            sort: true,
            groupHeader: [
              { name: "sales", title: "销售业绩" },
            ],
          },
          {
            name: "growthRate",
            title: "增长率",
            type: "singleRow",
            width: 120,
            sort: true,
            render: ({ target }) => ({
              children: `${target.growthRate}%`,
              style: {
                color: target.growthRate > 20 ? "#52c41a" : target.growthRate > 10 ? "#1890ff" : "#faad14",
              },
            }),
            groupHeader: [
              { name: "sales", title: "销售业绩" },
            ],
          },
          {
            name: "marketShare",
            title: "市场份额",
            type: "singleRow",
            width: 120,
            sort: true,
            render: ({ target }) => ({
              children: `${target.marketShare}%`,
            }),
            groupHeader: [
              { name: "market", title: "市场分析" },
            ],
          },
          {
            name: "customerCount",
            title: "客户总数",
            type: "singleRow",
            width: 120,
            sort: true,
            groupHeader: [
              { name: "market", title: "市场分析" },
            ],
          },
          {
            name: "newCustomerCount",
            title: "新增客户",
            type: "singleRow",
            width: 120,
            sort: true,
            groupHeader: [
              { name: "market", title: "市场分析" },
            ],
          },
          {
            name: "repurchaseRate",
            title: "复购率",
            type: "singleRow",
            width: 120,
            sort: true,
            render: ({ target }) => ({
              children: `${target.repurchaseRate}%`,
            }),
            groupHeader: [
              { name: "customer", title: "客户指标" },
            ],
          },
          {
            name: "avgOrderValue",
            title: "客单价",
            type: "other",
            width: 130,
            sort: true,
            render: ({ target }) => ({
              children: `¥${target.avgOrderValue.toFixed(2)}`,
            }),
            groupHeader: [
              { name: "customer", title: "客户指标" },
            ],
          },
          {
            name: "targetCompletion",
            title: "目标完成率",
            type: "singleRow",
            width: 140,
            sort: true,
            render: ({ target }) => ({
              children: `${target.targetCompletion}%`,
              style: {
                color: target.targetCompletion >= 100 ? "#52c41a" : target.targetCompletion >= 90 ? "#1890ff" : "#faad14",
              },
            }),
            groupHeader: [
              { name: "target", title: "目标达成" },
            ],
          },
          {
            name: "editableField",
            title: "备注",
            type: "other",
            width: 150,
            disableColItem: true,
            valueOf: (item, { targetRender }) => (
              <ValueEdit value="点击编辑备注" targetRender={targetRender} />
            ),
            groupHeader: [
              { name: "target", title: "目标达成" },
            ],
          },
          {
            name: "options",
            title: "操作",
            type: "options",
            fixed: "right",
            width: 150,
            valueOf: (item) => [
              {
                onClick: () => {
                  console.log("查看详情:", item.city);
                },
                children: "查看详情",
              },
              {
                onClick: () => {
                  console.log("生成报告:", item.city);
                },
                children: "生成报告",
              },
            ],
          },
        ]}
        onSortChange={(sort) => {
          console.log("排序变更:", sort);
        }}
        onTablePropsReady={({ columns, dataSource }) => {
          console.log("表格就绪:", { columns, dataSource });
        }}
      />
    </PureGlobal>
  );
};

render(<BaseExample />);
