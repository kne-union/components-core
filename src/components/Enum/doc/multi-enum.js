const { default: Enum } = _Enum;
const { PureGlobal } = global;
const { Space, Card, Tag } = antd;

const MultiEnumExample = () => {
  return (
    <PureGlobal
      preset={{
        locale: "zh-CN",
        enums: {
          country: [
            { value: "CN", description: "中国" },
            { value: "US", description: "美国" },
            { value: "UK", description: "英国" },
            { value: "JP", description: "日本" },
          ],
          language: [
            { value: "zh-CN", description: "简体中文" },
            { value: "en-US", description: "英语" },
            { value: "ja-JP", description: "日语" },
            { value: "ko-KR", description: "韩语" },
          ],
          timezone: [
            { value: "UTC+8", description: "北京时间" },
            { value: "UTC+0", description: "格林威治时间" },
            { value: "UTC-5", description: "纽约时间" },
            { value: "UTC+9", description: "东京时间" },
          ],
        },
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Card title="同时获取多个枚举模块" size="small">
          <Enum moduleName={["country", "language", "timezone"]}>
            {([countries, languages, timezones]) => (
              <Space direction="vertical">
                <div>
                  <strong>国家列表：</strong>
                  <Space>
                    {countries.map(item => (
                      <Tag key={item.value}>{item.description}</Tag>
                    ))}
                  </Space>
                </div>
                <div>
                  <strong>语言列表：</strong>
                  <Space>
                    {languages.map(item => (
                      <Tag key={item.value} color="blue">{item.description}</Tag>
                    ))}
                  </Space>
                </div>
                <div>
                  <strong>时区列表：</strong>
                  <Space>
                    {timezones.map(item => (
                      <Tag key={item.value} color="green">{item.description}</Tag>
                    ))}
                  </Space>
                </div>
              </Space>
            )}
          </Enum>
        </Card>
        
        <Card title="组合使用多个枚举" size="small">
          <Space>
            <span>用户来自</span>
            <Enum moduleName="country" name="CN">
              {(data) => <strong>{data.description}</strong>}
            </Enum>
            <span>，使用</span>
            <Enum moduleName="language" name="zh-CN">
              {(data) => <strong>{data.description}</strong>}
            </Enum>
            <span>，时区为</span>
            <Enum moduleName="timezone" name="UTC+8">
              {(data) => <strong>{data.description}</strong>}
            </Enum>
          </Space>
        </Card>
        
        <Card title="错误处理" size="small">
          <Space direction="vertical">
            <div>
              <strong>不存在的枚举模块：</strong>
              <Enum 
                moduleName="notExist" 
                name="test"
                error={<span style={{ color: "red" }}>枚举加载失败</span>}
              />
            </div>
            <div>
              <strong>不存在的枚举值（显示占位符）：</strong>
              <Enum 
                moduleName="country" 
                name="XX"
                placeholder="未知国家"
              />
            </div>
          </Space>
        </Card>
      </Space>
    </PureGlobal>
  );
};

render(<MultiEnumExample />);
