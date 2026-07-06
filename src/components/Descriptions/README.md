# Descriptions

### 概述

Descriptions 从 `@kne/info-page` 重新导出，用于详情页中的描述列表展示，适合以二维数组结构呈现分组字段信息。

本组件文档仅展示常用示例。完整概述、使用说明与 API 请前往 **InfoPage** 组件文档查看。


### 示例

#### 示例代码

- 描述列表
- 二维数组结构的详情信息展示，适合表单数据展示
- _InfoPage(@kne/info-page),(@kne/info-page/dist/index.css),antd(antd)

```jsx
const { Descriptions } = _InfoPage;
const { Tag, Space } = antd;

const BaseExample = () => {
  return (
    <Descriptions
      dataSource={[
        // 基本信息分组
        [
          { label: "订单编号", content: <strong style={{ color: '#1890ff' }}>ORD20240115001</strong> },
          { label: "订单类型", content: <Tag color="blue">普通订单</Tag> },
        ],
        [
          { label: "下单时间", content: "2024-01-15 10:30:25" },
          { label: "支付时间", content: "2024-01-15 10:32:18" },
        ],
        [
          { label: "客户名称", content: "深圳市腾讯计算机系统有限公司" },
          { label: "客户类型", content: <Tag color="gold">VIP客户</Tag> },
        ],
        // 收货信息分组
        [
          { label: "收货人", content: "张三" },
          { label: "联系电话", content: "138-0013-8000" },
        ],
        [
          { label: "收货地址", content: "广东省深圳市南山区科技园科技中一路腾讯大厦A座18层" },
        ],
        // 商品信息分组
        [
          {
            label: "商品清单",
            content: (
              <Space direction="vertical" size={4}>
                <div>1. 腾讯云服务器（2核4G）× 1台 - ¥3000.00</div>
                <div>2. 云数据库 MySQL（50GB）× 1个 - ¥1200.00</div>
                <div>3. 对象存储（500GB）× 1个 - ¥800.00</div>
              </Space>
            ),
          },
        ],
        // 金额信息分组
        [
          { label: "商品总额", content: <strong>¥5,000.00</strong> },
          { label: "运费", content: "¥0.00" },
        ],
        [
          { label: "优惠金额", content: <span style={{ color: '#52c41a' }}>-¥750.00</span> },
          { label: "实付金额", content: <strong style={{ color: '#f5222d', fontSize: '16px' }}>¥4,250.00</strong> },
        ],
        // 发票信息分组
        [
          { label: "发票类型", content: "增值税专用发票" },
          { label: "发票抬头", content: "深圳市腾讯计算机系统有限公司" },
        ],
        [
          { label: "纳税人识别号", content: "914403007109410773" },
          { label: "发票状态", content: <Tag color="success">已开具</Tag> },
        ],
        // 售后信息分组
        [
          { label: "退款状态", content: "无退款" },
          { label: "发票抬头", content: "未申请" },
        ],
        [
          { label: "订单状态", content: <Tag color="processing">处理中</Tag> },
          {
            label: "预计送达",
            content: "2024-01-17",
          },
        ],
        // 备注信息
        [
          {
            label: "订单备注",
            content: "请务必在工作日配送，配送前请提前电话联系收货人。收到商品后请当面验货，确认无误后再签收。",
            block: true
          },
        ],
        // 操作记录
        [
          { label: "创建时间", content: "2024-01-15 10:30:25" },
          { label: "创建人", content: "张三（客户）" },
        ],
      ]}
    />
  );
};

render(<BaseExample />);


```

### API

Descriptions 的 API 与 `@kne/info-page` 保持一致。

请前往 **InfoPage** 组件文档中的 **Descriptions / DetailList** 章节查看完整属性说明。
