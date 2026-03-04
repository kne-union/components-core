const { default: Table } = _Table;
const { PureGlobal } = _Global;
const { preset } = reactFetch;
const { Button, Space } = antd;

const ajax = (config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (config.url === "/api/v1/user/user/user_key_get") {
        resolve({
          data: { code: 0, data: "{}" },
        });
      } else if (config.url === "/api/v1/user/user/user_key_set") {
        resolve({
          data: { code: 0, data: "" },
        });
      }
    }, 100);
  });
};

preset({ ajax });

const BaseExample = () => {
  return (
    <PureGlobal preset={{ ajax }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <h3>固定表头 + 分页 + 总结栏</h3>
          <Table
            name="order-management"
            sticky={true}
            stickyOffset="60px"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `共 ${total} 条记录`,
            }}
            scroll={{ y: 400 }}
            controllerOpen={true}
            rowKey="orderId"
            className="custom-table-class"
            columnRenderProps={{
              currentUserId: "user_001",
            }}
            summary={(current) => {
              const { pageData } = current;
              const totalAmount = pageData.reduce(
                (sum, item) => sum + item.amount,
                0
              );
              return (
                <Table.Summary fixed>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={5}>
                      <strong>本页合计</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={5}>
                      <strong>¥{totalAmount.toFixed(2)}</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={6} colSpan={2}>
                      <strong>
                        {pageData.length} 笔订单
                      </strong>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              );
            }}
            dataSource={[
              {
                orderId: "ORD202401150001",
                orderNo: "ORD-2024-0115-001",
                customer: "北京科技有限公司",
                product: "企业版SaaS订阅服务",
                quantity: 50,
                amount: 125000.0,
                status: "paid",
                createTime: "2024-01-15 10:30:00",
              },
              {
                orderId: "ORD202401150002",
                orderNo: "ORD-2024-0115-002",
                customer: "上海创新科技",
                product: "高级API调用套餐",
                quantity: 100000,
                amount: 89000.5,
                status: "paid",
                createTime: "2024-01-15 11:20:00",
              },
              {
                orderId: "ORD202401150003",
                orderNo: "ORD-2024-0115-003",
                customer: "深圳智能制造",
                product: "物联网设备管理平台",
                quantity: 1,
                amount: 350000.0,
                status: "pending",
                createTime: "2024-01-15 14:15:00",
              },
              {
                orderId: "ORD202401150004",
                orderNo: "ORD-2024-0115-004",
                customer: "广州贸易集团",
                product: "数据分析平台",
                quantity: 20,
                amount: 68000.0,
                status: "shipped",
                createTime: "2024-01-15 15:40:00",
              },
              {
                orderId: "ORD202401160001",
                orderNo: "ORD-2024-0116-001",
                customer: "杭州电商公司",
                product: "营销自动化工具",
                quantity: 30,
                amount: 45000.0,
                status: "paid",
                createTime: "2024-01-16 09:00:00",
              },
            ]}
            columns={[
              {
                name: "orderNo",
                title: "订单号",
                type: "serialNumber",
                primary: true,
                width: 200,
              },
              {
                name: "customer",
                title: "客户名称",
                type: "mainInfo",
                width: 200,
              },
              {
                name: "product",
                title: "产品",
                type: "other",
                width: 200,
              },
              {
                name: "quantity",
                title: "数量",
                type: "singleRow",
                width: 100,
              },
              {
                name: "amount",
                title: "金额",
                type: "other",
                width: 150,
                render: ({ target }) => ({
                  children: `¥${target.amount.toFixed(2)}`,
                }),
              },
              {
                name: "status",
                title: "状态",
                type: "tag",
                width: 120,
                valueOf: (item) => {
                  const statusMap = {
                    paid: { type: "success", text: "已支付" },
                    pending: { type: "warning", text: "待支付" },
                    shipped: { type: "processing", text: "已发货" },
                    cancelled: { type: "error", text: "已取消" },
                  };
                  return statusMap[item.status];
                },
              },
              {
                name: "createTime",
                title: "创建时间",
                type: "datetime",
                width: 190,
              },
            ]}
          />
        </div>

        <div>
          <h3>自定义行键 + 禁用列控制</h3>
          <Table
            name="simple-list"
            controllerOpen={false}
            rowKey={(record) => `custom-key-${record.id}`}
            dataSource={[
              { id: 1, name: "张三", role: "管理员", email: "zhangsan@example.com" },
              { id: 2, name: "李四", role: "编辑", email: "lisi@example.com" },
              { id: 3, name: "王五", role: "访客", email: "wangwu@example.com" },
            ]}
            columns={[
              { name: "name", title: "姓名", type: "userName" },
              { name: "role", title: "角色", type: "other", width: 120 },
              { name: "email", title: "邮箱", type: "other" },
            ]}
          />
        </div>

        <div>
          <h3>横向滚动表格</h3>
          <Table
            name="inventory-table"
            scroll={{ x: 1800 }}
            dataSource={[
              {
                id: "INV001",
                productCode: "SKU-2024-A001",
                productName: "智能手表Pro版",
                category: "智能穿戴",
                brand: "华为",
                spec: "42mm/午夜黑",
                color: "黑色",
                stockQty: 1250,
                inTransit: 300,
                warningQty: 200,
                costPrice: 899,
                retailPrice: 1299,
                supplier: "深圳华为供应链",
                warehouse: "A区-3层-15号",
                updateTime: "2024-01-15 14:30:00",
              },
              {
                id: "INV002",
                productCode: "SKU-2024-B002",
                productName: "无线降噪耳机",
                category: "音频设备",
                brand: "索尼",
                spec: "头戴式/银色",
                color: "银色",
                stockQty: 856,
                inTransit: 150,
                warningQty: 100,
                costPrice: 1599,
                retailPrice: 2299,
                supplier: "广州索尼授权经销商",
                warehouse: "B区-2层-08号",
                updateTime: "2024-01-15 12:20:00",
              },
              {
                id: "INV003",
                productCode: "SKU-2024-C003",
                productName: "机械键盘RGB版",
                category: "电脑配件",
                brand: "罗技",
                spec: "87键/青轴",
                color: "黑色",
                stockQty: 2340,
                inTransit: 500,
                warningQty: 300,
                costPrice: 399,
                retailPrice: 599,
                supplier: "东莞罗技工厂直供",
                warehouse: "C区-1层-22号",
                updateTime: "2024-01-15 16:45:00",
              },
            ]}
            columns={[
              {
                name: "productCode",
                title: "产品编号",
                type: "serialNumber",
                primary: true,
                fixed: "left",
                width: 150,
              },
              {
                name: "productName",
                title: "产品名称",
                type: "mainInfo",
                fixed: "left",
                width: 180,
              },
              {
                name: "category",
                title: "类别",
                type: "tag",
                width: 120,
                valueOf: (item) => {
                  const categoryMap = {
                    智能穿戴: { type: "processing", text: "智能穿戴" },
                    音频设备: { type: "success", text: "音频设备" },
                    电脑配件: { type: "warning", text: "电脑配件" },
                  };
                  return categoryMap[item.category];
                },
              },
              {
                name: "brand",
                title: "品牌",
                type: "other",
                width: 120,
              },
              {
                name: "spec",
                title: "规格",
                type: "other",
                width: 150,
              },
              {
                name: "color",
                title: "颜色",
                type: "otherSmall",
                width: 100,
              },
              {
                name: "stockQty",
                title: "库存数量",
                type: "singleRow",
                width: 120,
                render: ({ target }) => ({
                  children: target.stockQty,
                  style: {
                    color: target.stockQty < target.warningQty ? "#f5222d" : "#52c41a",
                    fontWeight: "bold",
                  },
                }),
              },
              {
                name: "inTransit",
                title: "在途数量",
                type: "singleRow",
                width: 120,
              },
              {
                name: "warningQty",
                title: "预警值",
                type: "singleRow",
                width: 100,
              },
              {
                name: "costPrice",
                title: "成本价",
                type: "other",
                width: 120,
                render: ({ target }) => ({
                  children: `¥${target.costPrice}`,
                }),
              },
              {
                name: "retailPrice",
                title: "零售价",
                type: "other",
                width: 120,
                render: ({ target }) => ({
                  children: `¥${target.retailPrice}`,
                }),
              },
              {
                name: "supplier",
                title: "供应商",
                type: "other",
                width: 180,
              },
              {
                name: "warehouse",
                title: "仓库位置",
                type: "other",
                width: 150,
              },
              {
                name: "updateTime",
                title: "更新时间",
                type: "datetime",
                width: 180,
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
                      console.log("查看详情:", item.productName);
                    },
                    children: "查看",
                  },
                  {
                    onClick: () => {
                      console.log("调整库存:", item.productName);
                    },
                    children: "调库",
                  },
                ],
              },
            ]}
          />
        </div>
      </Space>
    </PureGlobal>
  );
};

render(<BaseExample />);
