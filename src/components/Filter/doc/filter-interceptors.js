const {
  default: Filter,
  SuperSelectFilterItem,
  filterInterceptors,
  singleSelectInterceptor,
  multiSelectInterceptor,
  getFilterValue,
  pickSelectValues,
} = _Filter;
const { useState } = React;
const { Space, Card, Divider, Typography, Alert } = antd;

const { Text, Title, Paragraph } = Typography;

// filterInterceptors 提供了 single 和 multi 两种预设拦截器
// 适用于 SuperSelectFilterItem 等使用 { id, name } 格式的组件
// interceptor.input：将 { label, value } 转为 { id, name }（传入组件的 value 格式）
// interceptor.output：将 { id, name } 转回 { label, value }（筛选上下文的 value 格式）

const BaseExample = () => {
  const [value1, onChange1] = useState([]);
  const [value2, onChange2] = useState([]);

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Alert
        message="拦截器（Interceptor）说明"
        description="SuperSelect 等组件使用 { id, name } 格式，而 Filter 上下文使用 { label, value } 格式。filterInterceptors 提供了预设的格式转换拦截器，通过 withFieldItem 的 interceptor 属性自动转换。"
        type="info"
        showIcon
      />

      <Card title="singleSelectInterceptor — 单选拦截器" size="small">
        <Paragraph type="secondary">
          适用于 valueKey="id" labelKey="name" 的单选 SuperSelect 场景，自动在 {`{label, value}`} 和 {`{id, name}`} 之间转换
        </Paragraph>
        <Filter
          value={value1}
          onChange={(value) => {
            console.log('筛选值:', getFilterValue(value));
            onChange1(value);
          }}
          list={[
            [
              <SuperSelectFilterItem
                label="项目负责人"
                name="manager"
                interceptor={singleSelectInterceptor}
                options={[
                  { label: '张明', value: 'zhangming', description: '技术部经理' },
                  { label: '李娜', value: 'lina', description: '产品部总监' },
                  { label: '王磊', value: 'wanglei', description: '设计部主管' },
                ]}
              />,
              <SuperSelectFilterItem
                label="项目状态"
                name="status"
                interceptor={singleSelectInterceptor}
                options={[
                  { label: '进行中', value: 'ongoing', description: '项目正在执行' },
                  { label: '已完成', value: 'completed', description: '项目已交付' },
                  { label: '已暂停', value: 'paused', description: '项目暂停中' },
                ]}
              />,
            ],
          ]}
        />
        {value1.length > 0 && (
          <>
            <Divider />
            <Title level={5}>当前筛选值</Title>
            <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 12 }}>
              {JSON.stringify(getFilterValue(value1), null, 2)}
            </pre>
            <Title level={5}>pickSelectValues 提取原始值</Title>
            <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 12 }}>
              {JSON.stringify(Object.fromEntries(
                value1.map(item => [item.name, pickSelectValues(item.value)])
              ), null, 2)}
            </pre>
          </>
        )}
      </Card>

      <Card title="multiSelectInterceptor — 多选拦截器" size="small">
        <Paragraph type="secondary">
          适用于 valueKey="id" labelKey="name" 的多选 SuperSelect 场景，自动在 {`[{label, value}]`} 和 {`[{id, name}]`} 之间转换
        </Paragraph>
        <Filter
          value={value2}
          onChange={(value) => {
            console.log('筛选值:', getFilterValue(value));
            onChange2(value);
          }}
          list={[
            [
              <SuperSelectFilterItem
                label="团队成员"
                name="members"
                interceptor={multiSelectInterceptor}
                options={[
                  { label: '陈思远', value: 'chensiyuan', description: '高级前端工程师' },
                  { label: '赵晓峰', value: 'zhaoxiaofeng', description: '后端架构师' },
                  { label: '刘雨桐', value: 'liuyutong', description: 'UI设计师' },
                  { label: '孙浩然', value: 'sunhaoran', description: '测试工程师' },
                ]}
              />,
              <SuperSelectFilterItem
                label="技术栈"
                name="techStack"
                interceptor={multiSelectInterceptor}
                options={[
                  { label: 'React', value: 'react', description: '前端框架' },
                  { label: 'Vue', value: 'vue', description: '前端框架' },
                  { label: 'Node.js', value: 'nodejs', description: '后端运行时' },
                  { label: 'Python', value: 'python', description: '后端语言' },
                ]}
              />,
            ],
          ]}
        />
        {value2.length > 0 && (
          <>
            <Divider />
            <Title level={5}>当前筛选值</Title>
            <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 12 }}>
              {JSON.stringify(getFilterValue(value2), null, 2)}
            </pre>
            <Title level={5}>pickSelectValues 提取原始值</Title>
            <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 12 }}>
              {JSON.stringify(Object.fromEntries(
                value2.map(item => [item.name, pickSelectValues(item.value)])
              ), null, 2)}
            </pre>
          </>
        )}
      </Card>

      <Card title="filterInterceptors 快捷引用" size="small">
        <Paragraph type="secondary">
          filterInterceptors 对象同时提供了 single 和 multi 两种拦截器，可以直接解构使用：
        </Paragraph>
        <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 12 }}>
{`// 方式一：直接引用
import { singleSelectInterceptor, multiSelectInterceptor } from '@components/Filter';

// 方式二：从 filterInterceptors 解构
const { single, multi } = filterInterceptors;

// single 等价于 singleSelectInterceptor
// multi 等价于 multiSelectInterceptor`}
        </pre>
      </Card>
    </Space>
  );
};

render(<BaseExample />);
