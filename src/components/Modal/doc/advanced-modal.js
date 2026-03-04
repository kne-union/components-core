const { default: Modal, useModal, TabsModal, useTabsModal, ModalButton, TabsModalButton } = _Modal;
const { default: FormInfo, fields } = _FormInfo;
const { useState, useCallback, useRef } = React;
const { Button, Space, message, Table, Input, Tabs, Badge, Switch, Avatar, Descriptions, List, Timeline, Tag, Divider } = antd;

// 使用 withDecorator 的弹窗示例
const WithDecoratorModalExample = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开带装饰器的弹窗
      </Button>
      
      <Modal
        title="带装饰器的弹窗"
        open={open}
        onClose={() => setOpen(false)}
        withDecorator={(render) => {
          return (
            <div>
              <div style={{ background: '#f0f2f5', padding: '16px', marginBottom: '16px' }}>
                <p>这是通过 withDecorator 添加的外部装饰内容</p>
                <Space>
                  <Button size="small" onClick={() => setLoading(!loading)}>
                    {loading ? '停止' : '开始'}加载
                  </Button>
                  <Badge status={loading ? 'processing' : 'default'} text={loading ? '加载中' : '空闲'} />
                </Space>
              </div>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  加载中，请稍候...
                </div>
              ) : (
                render({
                  decoratorData: { loading, message: "装饰器传递的数据" }
                })
              )}
            </div>
          );
        }}
        onConfirm={() => {
          message.success("操作成功");
          setOpen(false);
        }}
      >
        {({ decoratorData }) => (
          <div>
            <p>这是弹窗的主体内容</p>
            <p>从装饰器接收的数据: {JSON.stringify(decoratorData)}</p>
          </div>
        )}
      </Modal>
    </Space>
  );
};

// 使用 rightOptions 的弹窗示例
const RightOptionsModalExample = () => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({ views: 0, likes: 0 });
  
  const rightOptions = (
    <div style={{ padding: '8px 16px', background: '#f5f5f5' }}>
      <Space direction="vertical" size="small">
        <div>浏览量: {info.views}</div>
        <div>点赞数: {info.likes}</div>
        <Button size="small" type="primary" onClick={() => {
          setInfo({ views: info.views + 1, likes: info.likes + 1 });
        }}>
          更新数据
        </Button>
      </Space>
    </div>
  );
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开带右侧选项的弹窗
      </Button>
      
      <Modal
        title="带右侧选项的弹窗"
        open={open}
        onClose={() => setOpen(false)}
        rightOptions={rightOptions}
        onConfirm={() => {
          message.success("操作成功");
          setOpen(false);
        }}
      >
        <p>这是弹窗的主体内容</p>
        <p>右侧区域显示了额外的信息</p>
        <p>右侧区域通常用于显示辅助信息或操作</p>
      </Modal>
    </Space>
  );
};

// 命令式调用的高级弹窗示例
const AdvancedCommandModalExample = () => {
  const modal = useModal();
  const [data, setData] = useState(null);
  const modalApiRef = useRef(null);
  
  const openDataModal = useCallback(() => {
    const api = modal({
      title: "数据详情弹窗",
      width: 600,
      withDecorator: (render) => {
        return (
          <div>
            <Button 
              style={{ marginBottom: 16 }} 
              onClick={() => {
                setData([
                  { key: '1', name: '张三', age: 28, address: '北京市朝阳区' },
                  { key: '2', name: '李四', age: 32, address: '北京市海淀区' },
                ]);
              }}
            >
              加载数据
            </Button>
            {render()}
          </div>
        );
      },
      children: () => (
        <div>
          {data ? (
            <Table
              dataSource={data}
              columns={[
                { title: '姓名', dataIndex: 'name', key: 'name' },
                { title: '年龄', dataIndex: 'age', key: 'age' },
                { title: '地址', dataIndex: 'address', key: 'address' },
              ]}
              pagination={false}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              暂无数据，请点击"加载数据"按钮
            </div>
          )}
        </div>
      ),
      footerButtons: [
        {
          children: '刷新',
          onClick: () => {
            if (data) {
              setData([...data]);
              message.success("数据已刷新");
            }
          },
        },
        {
          children: '关闭',
          onClick: () => {
            message.info("已关闭");
          },
        },
      ],
    });
    modalApiRef.current = api;
  }, [modal, data]);
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" onClick={openDataModal}>
        打开数据详情弹窗
      </Button>
    </Space>
  );
};

// TabsModal 示例
const TabsModalExample = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  
  // 模拟数据
  const userData = {
    name: '张三',
    email: 'zhangsan@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    department: '技术部',
    joinDate: '2020-05-15',
    projects: ['项目A', '项目B', '项目C'],
    skills: ['JavaScript', 'React', 'Node.js'],
    achievements: ['优秀员工', '技术创新奖', '团队协作奖'],
  };
  
  const items = [
    {
      key: 'basic',
      label: '基本信息',
      withDecorator: (render) => {
        return (
          <div>
            <p style={{ marginBottom: 16 }}>这是基本信息标签的装饰内容</p>
            {render()}
          </div>
        );
      },
      children: () => (
        <div style={{ padding: '16px 0' }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Avatar size={64} src={userData.avatar} />
              <div>
                <h3>{userData.name}</h3>
                <p>{userData.email}</p>
              </div>
            </div>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="部门">{userData.department}</Descriptions.Item>
              <Descriptions.Item label="入职日期">{userData.joinDate}</Descriptions.Item>
            </Descriptions>
          </Space>
        </div>
      ),
    },
    {
      key: 'projects',
      label: '项目经验',
      children: () => (
        <div style={{ padding: '16px 0' }}>
          <List
            header={<div>参与项目</div>}
            bordered
            dataSource={userData.projects}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar style={{ backgroundColor: '#1890ff' }}>{index + 1}</Avatar>}
                  title={item}
                  description={`这是${item}的描述信息，展示了项目的主要内容和成果。`}
                />
              </List.Item>
            )}
          />
        </div>
      ),
    },
    {
      key: 'skills',
      label: '技能特长',
      children: () => (
        <div style={{ padding: '16px 0' }}>
          <Space wrap>
            {userData.skills.map((skill, index) => (
              <Tag key={index} color="blue" style={{ fontSize: '14px', padding: '4px 12px' }}>
                {skill}
              </Tag>
            ))}
          </Space>
          <Divider />
          <p>技能掌握程度评估：</p>
          <Space direction="vertical" style={{ width: '100%' }}>
            {userData.skills.map((skill, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 80 }}>{skill}:</div>
                <div style={{ flex: 1, backgroundColor: '#f0f0f0', borderRadius: 4, height: 8, position: 'relative' }}>
                  <div 
                    style={{ 
                      position: 'absolute', 
                      left: 0, 
                      top: 0, 
                      height: '100%', 
                      backgroundColor: '#1890ff',
                      borderRadius: 4,
                      width: `${80 - index * 10}%`
                    }} 
                  />
                </div>
                <span>{90 - index * 10}%</span>
              </div>
            ))}
          </Space>
        </div>
      ),
    },
    {
      key: 'achievements',
      label: '成就荣誉',
      children: () => (
        <div style={{ padding: '16px 0' }}>
          <Timeline>
            {userData.achievements.map((achievement, index) => (
              <Timeline.Item 
                key={index} 
                color={index === 0 ? 'green' : index === 1 ? 'blue' : 'red'}
              >
                <p style={{ fontWeight: 'bold', marginBottom: 4 }}>{achievement}</p>
                <p style={{ color: '#666', fontSize: '12px' }}>
                  {index === 0 ? '2023年度评选' : index === 1 ? '2022年度评选' : '2021年度评选'}
                </p>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      ),
    },
  ];
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开选项卡弹窗
      </Button>
      
      <TabsModal
        open={open}
        onClose={() => setOpen(false)}
        activeKey={activeTab}
        onChange={setActiveTab}
        items={items}
        onConfirm={() => {
          return new Promise((resolve) => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              message.success("操作成功");
              resolve();
            }, 1500);
          });
        }}
      />
    </Space>
  );
};

// ModalButton 示例
const ModalButtonExample = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <p>ModalButton 可以在点击后加载数据，然后弹出弹窗</p>
      
      <ModalButton
        type="primary"
        api={{
          loader: () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({
                  userInfo: {
                    name: '张三',
                    email: 'zhangsan@example.com',
                    department: '技术部',
                    position: '高级工程师',
                    joinDate: '2020-05-15',
                  }
                });
              }, 1500);
            });
          },
        }}
        modalProps={({ data }) => ({
          title: "用户详情",
          children: (
            <div>
              {data && data.userInfo ? (
                <>
                  <p><strong>姓名:</strong> {data.userInfo.name || '未知'}</p>
                  <p><strong>邮箱:</strong> {data.userInfo.email || '未知'}</p>
                  <p><strong>部门:</strong> {data.userInfo.department || '未知'}</p>
                  <p><strong>职位:</strong> {data.userInfo.position || '未知'}</p>
                  <p><strong>入职日期:</strong> {data.userInfo.joinDate || '未知'}</p>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <p>加载用户信息失败</p>
                </div>
              )}
            </div>
          ),
        })}
      >
        查看用户详情
      </ModalButton>
      
      <ModalButton
        api={{
          loader: () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([
                  { key: '1', name: '张三', age: 28, department: '技术部' },
                  { key: '2', name: '李四', age: 32, department: '产品部' },
                  { key: '3', name: '王五', age: 26, department: '设计部' },
                ]);
              }, 1000);
            });
          },
        }}
        modalProps={({ data }) => ({
          title: "员工列表",
          children: (
            <>
              {data && Array.isArray(data) && data.length > 0 ? (
                <Table
                  dataSource={data}
                  columns={[
                    { title: '姓名', dataIndex: 'name', key: 'name' },
                    { title: '年龄', dataIndex: 'age', key: 'age' },
                    { title: '部门', dataIndex: 'department', key: 'department' },
                  ]}
                  pagination={false}
                />
              ) : (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <p>加载员工列表失败</p>
                </div>
              )}
            </>
          ),
        })}
      >
        查看员工列表
      </ModalButton>
    </Space>
  );
};

// TabsModalButton 示例
const TabsModalButtonExample = () => {
  const formRef1 = useRef(null);
  const formRef2 = useRef(null);
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <p>TabsModalButton 结合了 TabsModal 和数据加载功能</p>
      
      <TabsModalButton
        type="primary"
        api={{
          loader: () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({
                  profile: {
                    name: '李四',
                    email: 'lisi@example.com',
                    phone: '13800138000',
                  },
                  settings: {
                    theme: 'dark',
                    language: 'zh-CN',
                    notifications: true,
                  },
                });
              }, 1500);
            });
          },
        }}
        modalProps={({ data }) => ({
          title: "用户设置",
          items: [
            {
              key: 'profile',
              label: '个人信息',
              children: () => (
                <FormInfo 
                  ref={formRef1}
                  data={data.profile}
                  list={[
                    <fields.Input name="name" label="姓名" />,
                    <fields.Input name="email" label="邮箱" />,
                    <fields.Input name="phone" label="电话" />,
                  ]}
                />
              ),
            },
            {
              key: 'settings',
              label: '系统设置',
              children: () => (
                <FormInfo 
                  ref={formRef2}
                  data={data.settings}
                  list={[
                    <fields.Input name="theme" label="主题" />,
                    <fields.Input name="language" label="语言" />,
                    <fields.Switch name="notifications" label="通知" />,
                  ]}
                />
              ),
            },
          ],
          onConfirm: async () => {
            try {
              // 获取表单数据
              const form1Data = formRef1.current ? await formRef1.current.getData() : {};
              const form2Data = formRef2.current ? await formRef2.current.getData() : {};
              
              console.log('表单数据:', { ...form1Data, ...form2Data });
              return Promise.resolve();
            } catch (error) {
              console.error('表单验证失败:', error);
              throw error;
            }
          },
        })}
      >
        打开用户设置
      </TabsModalButton>
    </Space>
  );
};

const AdvancedModalExamples = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <WithDecoratorModalExample />
      <RightOptionsModalExample />
      <AdvancedCommandModalExample />
      <TabsModalExample />
      <ModalButtonExample />
      <TabsModalButtonExample />
    </Space>
  );
};

render(<AdvancedModalExamples />);