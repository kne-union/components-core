# Modal

### 概述

### 概述

Modal 是一个基于 Ant Design Modal 组件的增强型弹窗组件，提供了更丰富的功能和更简洁的API。支持多种弹窗形式，适用于需要弹窗交互的各种场景。

### 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以在当前页面正中打开一个浮层，承载相应的操作。

### 特点

该组件是antd Modal组件的再封装：

* 修改了footer部分的设置逻辑,能更加简单的定义footer区域的功能
* 添加了withDecorator可以更加方便的处理Modal外层的显示逻辑
* 扩展了用于方法调用的useModal的hooks，可以通过hooks获得一个Modal的调用方法，并且保证其和Modal组件式调用有相同的UI表现和行为
* 扩展了ModalButton组件，可以在点击该按钮时执行加载数据，并且Button的状态变为loading，在数据加载完成之后再弹出弹窗
* 扩展了TabsModal组件，它是一个Tabs和Modal组合起来的组件，对弹窗title做了特殊处理，更加符合UI交互逻辑

### 组件构成

Modal 组件家族包含以下组件：
- **Modal**: 基础弹窗组件
- **useModal**: Hook，用于命令式调用弹窗
- **TabsModal**: 带选项卡的弹窗组件
- **useTabsModal**: Hook，用于命令式调用选项卡弹窗
- **ModalButton**: 可加载数据的弹窗按钮
- **TabsModalButton**: 可加载数据的选项卡弹窗按钮

### 示例

#### 示例代码

- 基础弹窗
- 展示Modal组件的基本用法，包括不同尺寸、异步确认、自定义按钮和命令式调用等
- _Modal(@components/Modal),_FormInfo(@components/FormInfo),antd(antd)

```jsx
const { default: Modal, useModal } = _Modal;
const { default: FormInfo, useFormModal, fields } = _FormInfo;
const { useState } = React;
const { Button, Space, message, Radio, Input } = antd;

// 基础弹窗示例
const BasicModalExample = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开基础弹窗
      </Button>
      
      <Modal
        title="基础弹窗"
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          message.success("操作成功");
          setOpen(false);
        }}
      >
        <p>这是一个基础弹窗的内容</p>
        <p>弹窗支持确认和取消操作</p>
      </Modal>
    </Space>
  );
};

// 不同尺寸的弹窗示例
const SizeModalExample = () => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState("default");
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Radio.Group
        value={size}
        options={[
          { label: "小号", value: "small" },
          { label: "默认", value: "default" },
          { label: "大号", value: "large" },
        ]}
        onChange={(e) => setSize(e.target.value)}
      />
      <Button type="primary" onClick={() => setOpen(true)}>
        打开{size === "small" ? "小号" : size === "large" ? "大号" : "默认"}弹窗
      </Button>
      
      <Modal
        title={&#96;${size === "small" ? "小号" : size === "large" ? "大号" : "默认"}尺寸弹窗&#96;}
        size={size}
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      >
        <p>这是一个{size}尺寸的弹窗</p>
        {size === "large" && (
          <div>
            <p>大号弹窗可以容纳更多内容</p>
            <p>适合展示复杂的表单或数据</p>
            <p>可以根据实际需求选择合适的尺寸</p>
            <p>内容会根据弹窗大小自动调整布局</p>
          </div>
        )}
      </Modal>
    </Space>
  );
};

// 异步确认的弹窗示例
const AsyncModalExample = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开异步确认弹窗
      </Button>
      
      <Modal
        title="异步确认弹窗"
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          return new Promise((resolve) => {
            message.loading("正在处理，请稍候...", 0);
            setTimeout(() => {
              message.destroy();
              message.success("处理成功！");
              resolve();
            }, 2000);
          });
        }}
      >
        <p>点击确认按钮后，将执行异步操作</p>
        <p>在操作完成前，确认按钮将显示为加载状态</p>
        <p>操作完成后，弹窗将自动关闭</p>
      </Modal>
    </Space>
  );
};

// 自定义按钮的弹窗示例
const CustomButtonModalExample = () => {
  const [open, setOpen] = useState(false);
  
  const handleSave = () => {
    return new Promise((resolve) => {
      message.loading("正在保存...", 0);
      setTimeout(() => {
        message.destroy();
        message.success("保存成功！");
        resolve();
      }, 1500);
    });
  };
  
  const handleCancel = () => {
    message.info("已取消操作");
    setOpen(false);
  };
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开自定义按钮弹窗
      </Button>
      
      <Modal
        title="自定义按钮弹窗"
        open={open}
        onClose={() => setOpen(false)}
        footerButtons={[
          {
            children: "取消",
            onClick: handleCancel,
          },
          {
            children: "保存",
            type: "primary",
            onClick: handleSave,
          },
          {
            children: "保存并新建",
            onClick: () => {
              handleSave().then(() => {
                message.info("可以继续添加新内容");
              });
            },
          },
        ]}
      >
        <p>这个弹窗有自定义的底部按钮</p>
        <p>每个按钮都可以有自己的点击处理逻辑</p>
      </Modal>
    </Space>
  );
};

// 命令式调用的弹窗示例
const CommandModalExample = () => {
  const modal = useModal();
  
  const openModal = () => {
    modal({
      title: "命令式弹窗",
      children: <div>
        <p>这是通过 useModal Hook 命令式打开的弹窗</p>
        <p>无需管理弹窗的显示状态</p>
        <p>适合在事件处理中直接使用</p>
      </div>,
      onConfirm: () => {
        message.success("确认操作");
      },
    });
  };
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" onClick={openModal}>
        打开命令式弹窗
      </Button>
    </Space>
  );
};

// 表单弹窗示例
const FormModalExample = () => {
  const formModal = useFormModal();
  
  const handleOpenForm = () => {
    formModal({
      title: "用户信息表单",
      formProps: {
        onSubmit: (data) => {
          console.log("表单值:", data);
          message.success("保存成功");
        },
      },
      children: (
        <FormInfo
          list={[
            <fields.Input name="name" label="姓名" rule="REQ" />,
            <fields.Input name="email" label="邮箱" rule="EMAIL" />,
            <fields.TextArea name="remark" label="备注" />,
          ]}
        />
      ),
    });
  };
  
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" onClick={handleOpenForm}>
        打开表单弹窗
      </Button>
    </Space>
  );
};

const BasicModalExamples = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <BasicModalExample />
      <SizeModalExample />
      <AsyncModalExample />
      <CustomButtonModalExample />
      <CommandModalExample />
      <FormModalExample />
    </Space>
  );
};

render(<BasicModalExamples />);
```

- 高级功能
- 展示Modal组件的高级功能，包括withDecorator装饰器、rightOptions右侧选项和高级命令式调用
- _Modal(@components/Modal),_FormInfo(@components/FormInfo),antd(antd)

```jsx
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
                  description={&#96;这是${item}的描述信息，展示了项目的主要内容和成果。&#96;}
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
                      width: &#96;${80 - index * 10}%&#96;
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
```

- FormModal表单弹窗
- 展示FormModal组件的用法，在弹窗中展示表单，适合数据录入、编辑等场景
- _Modal(@components/Modal),_FormInfo(@components/FormInfo),global(@components/Global),antd(antd)

```jsx
const { FormModal, useFormModal } = _FormInfo;
const { Space, Button } = antd;
const { PureGlobal } = global;
const { default: FormInfo, List, Input, TextArea } = _FormInfo;
const { useState } = React;

const BaseExample = () => {
  const [open, setOpen] = useState(false);
  const formModal = useFormModal();
  return (
    <Space wrap>
      <FormModal
        open={open}
        title="表单弹窗"
        onClose={() => {
          setOpen(false);
        }}
        formProps={{
          data: {
            field1: "field1field1field1field1",
          },
          onSubmit: async (data) => {
            console.log(data);
            await new Promise((resolve) => {
              setTimeout(() => {
                resolve();
              }, 1000);
            });
            setOpen(false);
          },
        }}
      >
        <FormInfo
          title="基本信息"
          list={[
            <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
            <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
            <TextArea name="field3" label="字段3" />,
          ]}
        />
        <List
          title="列表"
          name="list"
          maxLength={3}
          list={[
            <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
            <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
            <TextArea name="field3" label="字段3" />,
          ]}
        />
      </FormModal>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        组件调用
      </Button>
      <Button
        onClick={() => {
          const api = formModal({
            title: "表单弹窗",
            formProps: {
              data: {
                field1: "field1field1field1field1",
              },
              onSubmit: async (data) => {
                console.log(data);
                await new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                });
                api.close();
              },
            },
            children: (
              <div>
                <FormInfo
                  title="基本信息"
                  list={[
                    <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                    <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                    <TextArea name="field3" label="字段3" />,
                  ]}
                />
                <List
                  title="列表"
                  name="list"
                  maxLength={3}
                  list={[
                    <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                    <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                    <TextArea name="field3" label="字段3" />,
                  ]}
                />
              </div>
            ),
          });
        }}
      >
        hooks调用
      </Button>
      <Button
        onClick={() => {
          const api = formModal({
            title: "表单弹窗",
            footerButtons: [
              { buttonType: "CancelButton", children: "取消" },
              {
                buttonType: "FormApiButton",
                autoClose: false,
                onClick: (context) => {
                  console.log(context);
                },
                children: "FormApiButton",
              },
              {
                buttonType: "SubmitButton",
                autoClose: false,
                children: "提交",
              },
            ],
            formProps: {
              data: {
                field1: "field1field1field1field1",
              },
              onSubmit: async (data) => {
                console.log(data);
                await new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                });
                api.close();
              },
            },
            children: (
              <div>
                <FormInfo
                  title="基本信息"
                  list={[
                    <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                    <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                    <TextArea name="field3" label="字段3" />,
                  ]}
                />
                <List
                  title="列表"
                  name="list"
                  maxLength={3}
                  list={[
                    <Input name="field1" label="字段1" rule="REQ LEN-0-10" />,
                    <Input name="field2" label="字段2" rule="REQ LEN-0-10" />,
                    <TextArea name="field3" label="字段3" />,
                  ]}
                />
              </div>
            ),
          });
        }}
      >
        自定义footerButtons
      </Button>
    </Space>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);

```

- TabsModal选项卡弹窗
- 展示TabsModal组件的用法，包括选项卡内容和装饰器功能
- _Modal(@components/Modal),global(@components/Global),antd(antd),fetch(@kne/react-fetch),_Content(@components/Content)

```jsx
const { TabsModal, useTabsModal } = _Modal;
const { useState } = React;
const { default: Fetch } = fetch;
const { Button, Space } = antd;
const { PureGlobal } = global;
const { default: Content } = _Content;

const BaseExample = () => {
  const [open, setOpen] = useState(false);
  const tabsModal = useTabsModal();
  return <Space wrap>
    <TabsModal open={open} onClose={() => {
      setOpen(false);
    }} items={[{
      label: "项目 1", key: "item-1", children: <div>项目 1项目 1项目 1项目 1项目 1项目 1项目 1项目 1</div>
    }, {
      label: "项目 2", key: "item-2", children: <div>项目 2项目 2项目 2项目 2项目 2项目 2项目 2项目 2</div>
    }]} rightOptions={<div>右边栏内容右边栏内容右边栏内容右边栏内容</div>}>
      <div>弹窗弹窗弹窗弹窗弹窗弹窗弹窗</div>
    </TabsModal>
    <Button onClick={() => {
      setOpen(true);
    }}>组件调用方式</Button>
    <Button onClick={() => {
      tabsModal({
        rightOptions: <div>右边栏内容右边栏内容右边栏内容右边栏内容</div>, items: [{
          label: "项目 1", key: "item-1", children: <div>项目 1项目 1项目 1项目 1项目 1项目 1项目 1项目 1</div>
        }, {
          label: "项目 2", key: "item-2", children: <div>项目 2项目 2项目 2项目 2项目 2项目 2项目 2项目 2</div>
        }]
      });
    }}>hooks调用方式</Button>
    <Button onClick={() => {
      tabsModal({
        title: "此title不展示",
        rightOptions: ({ data }) => <Content list={data} />,
        withDecorator: (render) => <Fetch loader={() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve([{ label: "内容1", content: "内容1内容1内容1内容1内容1内容1内容1" }, {
                label: "内容2", content: "内容2内容2内容2内容2内容2内容2内容2内容2"
              }]);
            }, 1000);
          });
        }} render={({ data }) => render({ data })} />,
        items: [{
          label: "项目 1", key: "item-1", children: ({ data }) => <Content list={data} col={2} />
        }, {
          withDecorator: (render) => <Fetch loader={() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([{ label: "内容3", content: "内容3内容3内容3内容3内容3内容3内容3" }, {
                  label: "内容4", content: "内容4内容4内容4内容4内容4内容4内容4内容4"
                }]);
              }, 1000);
            });
          }} render={({ data }) => render({ tabData: data })} />,
          label: "项目 2",
          key: "item-2",
          children: ({ data, tabData }) => <Content list={[...data, ...tabData]} col={2} />
        }]
      });
    }}>复杂数据加载</Button>
  </Space>;
};

render(<PureGlobal><BaseExample /></PureGlobal>);
```

- ModalButton数据加载弹窗
- 展示ModalButton组件的用法，点击按钮加载数据后弹出弹窗
- _Modal(@components/Modal),global(@components/Global),antd(antd),_Content(@components/Content),_FormInfo(@components/FormInfo)

```jsx
const { ModalButton, TabsModalButton } = _Modal;
const { Space } = antd;
const { PureGlobal } = global;
const { default: Content } = _Content;
const { default: FormInfo, Input, TextArea } = _FormInfo;

const api = {
  loader: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { label: "内容1", content: "内容1内容1内容1内容1内容1内容1内容1" },
          {
            label: "内容2",
            content: "内容2内容2内容2内容2内容2内容2内容2内容2",
          },
        ]);
      }, 1000);
    });
  },
};

const BaseExample = () => {
  return (
    <Space wrap>
      <ModalButton
        api={api}
        modalProps={({ data }) => {
          return {
            title: "加载数据的弹窗",
            children: <Content list={data} col={2} />,
          };
        }}
      >
        点击加载数据
      </ModalButton>
      <TabsModalButton
        api={api}
        modalProps={({ data }) => {
          return {
            items: data.map(({ label, content }, index) => {
              return {
                key: index,
                children: content,
                label,
              };
            }),
          };
        }}
      >
        点击加载数据的Tabs弹窗
      </TabsModalButton>
    </Space>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);

```

- 业务场景示例
- 展示Modal组件在真实业务场景中的应用，包括用户管理、订单详情、产品多标签页和审批流程
- _Modal(@components/Modal),_FormInfo(@components/FormInfo),antd(antd)

```jsx
const {default: Modal, useModal, TabsModal, useTabsModal, ModalButton, TabsModalButton} = _Modal;
const {default: FormInfo, useFormModal, fields} = _FormInfo;
const {useState, useCallback} = React;
const {
    Button,
    Space,
    message,
    Table,
    Input,
    Select,
    DatePicker,
    InputNumber,
    Descriptions,
    Tag,
    Avatar,
    Card,
    List,
    Divider
} = antd;

// 用户管理弹窗示例
const UserManagementModalExample = () => {
    const formModal = useFormModal();

    const handleAddUser = () => {
        const modalApi = formModal({
            title: "添加用户",
            size: "large",
            formProps: {
                onSubmit: (data) => {
                    console.log("保存用户信息:", data);
                    
                    // 模拟API调用
                    message.success("用户信息保存成功");
                    modalApi.close();
                },
            },
            children: (<FormInfo
                list={[
                    <fields.Input name="username" label="用户名" rule="REQ"/>,
                    <fields.Input name="realName" label="真实姓名" rule="REQ"/>,
                    <fields.Input name="email" label="邮箱" rule="EMAIL"/>,
                    <fields.Input name="phone" label="手机号" rule="PHONE"/>,
                    <fields.Select 
                        name="department" 
                        label="部门" 
                        rule="REQ"
                        options={[
                            { label: "技术部", value: "tech" },
                            { label: "产品部", value: "product" },
                            { label: "设计部", value: "design" },
                            { label: "人力资源部", value: "hr" },
                        ]}
                    />,
                    <fields.DatePicker name="joinDate" label="入职日期" rule="REQ"/>,
                    <fields.TextArea name="remark" label="备注" />,
                ]}
            />),
        });
    };

    return (<Space direction="vertical" style={{width: '100%'}}>
        <Button type="primary" onClick={handleAddUser}>
            添加新用户
        </Button>
    </Space>);
};

// 订单详情弹窗示例
const OrderDetailModalExample = () => {
    const modal = useModal();

    const showOrderDetail = useCallback((orderId) => {
        // 模拟加载订单数据
        modal({
            title: &#96;订单详情 - #${orderId}&#96;, width: 800, withDecorator: (render) => {
                return (<div>
                    <div style={{background: '#f5f5f5', padding: '12px 16px', marginBottom: '16px'}}>
                        <Space>
                            <Tag color="blue">待发货</Tag>
                            <span>下单时间: 2023-06-15 14:30:22</span>
                        </Space>
                    </div>
                    {render()}
                </div>);
            }, children: () => {
                const orderData = {
                    id: orderId,
                    customer: '张三',
                    phone: '13800138000',
                    address: '北京市朝阳区xxx街道xxx号',
                    products: [{id: 1, name: '商品A', price: 299, quantity: 2}, {
                        id: 2, name: '商品B', price: 199, quantity: 1
                    }, {id: 3, name: '商品C', price: 99, quantity: 3},],
                    totalAmount: 994,
                    paymentMethod: '在线支付',
                    deliveryMethod: '快递配送',
                    remark: '请在工作日送达',
                };

                return (<div>
                    <Descriptions title="订单信息" bordered column={2}>
                        <Descriptions.Item label="订单号">{orderData.id}</Descriptions.Item>
                        <Descriptions.Item label="下单时间">2023-06-15 14:30:22</Descriptions.Item>
                        <Descriptions.Item label="收货人">{orderData.customer}</Descriptions.Item>
                        <Descriptions.Item label="联系电话">{orderData.phone}</Descriptions.Item>
                        <Descriptions.Item label="收货地址" span={2}>{orderData.address}</Descriptions.Item>
                        <Descriptions.Item label="支付方式">{orderData.paymentMethod}</Descriptions.Item>
                        <Descriptions.Item label="配送方式">{orderData.deliveryMethod}</Descriptions.Item>
                    </Descriptions>

                    <div style={{marginTop: 16}}>
                        <h4>商品清单</h4>
                        <Table
                            dataSource={orderData.products}
                            pagination={false}
                            columns={[{title: '商品名称', dataIndex: 'name', key: 'name'}, {
                                title: '单价(元)', dataIndex: 'price', key: 'price'
                            }, {title: '数量', dataIndex: 'quantity', key: 'quantity'}, {
                                title: '小计(元)',
                                key: 'subtotal',
                                render: (_, record) => record.price * record.quantity
                            },]}
                            summary={() => (<Table.Summary>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0} colSpan={3}>
                                        <strong>总计</strong>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1}>
                                        <strong>{orderData.totalAmount}元</strong>
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                            </Table.Summary>)}
                        />
                    </div>

                    <div style={{marginTop: 16}}>
                        <h4>备注</h4>
                        <p>{orderData.remark}</p>
                    </div>
                </div>);
            }, footerButtons: [{
                children: '打印订单', onClick: () => message.info("打印功能待实现"),
            }, {
                children: '发货', type: 'primary', onClick: async () => {
                    try {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        message.success("订单已发货");
                    } catch (error) {
                        message.error("发货失败，请重试");
                    }
                },
            },],
        });
    }, [modal]);

    const orders = [{id: 'ORD20230615001', customer: '张三', amount: 299, status: 'pending'}, {
        id: 'ORD20230615002', customer: '李四', amount: 598, status: 'shipped'
    }, {id: 'ORD20230615003', customer: '王五', amount: 398, status: 'completed'},];

    const statusMap = {
        pending: {text: '待发货', color: 'orange'},
        shipped: {text: '已发货', color: 'blue'},
        completed: {text: '已完成', color: 'green'},
    };

    return (<Card title="订单列表" size="small">
        <Table
            dataSource={orders}
            pagination={false}
            columns={[{title: '订单号', dataIndex: 'id', key: 'id'}, {
                title: '客户', dataIndex: 'customer', key: 'customer'
            }, {title: '金额', dataIndex: 'amount', key: 'amount'}, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (status) => (<Tag color={statusMap[status]?.color}>
                    {statusMap[status]?.text}
                </Tag>),
            }, {
                title: '操作',
                key: 'action',
                render: (_, record) => (<Button type="link" onClick={() => showOrderDetail(record.id)}>
                    查看详情
                </Button>),
            },]}
        />
    </Card>);
};

// 审批流程弹窗示例
const ApprovalProcessModalExample = () => {
    const modal = useModal();

    const showApprovalModal = useCallback((requestId) => {
        modal({
            title: "审批申请", width: 700, withDecorator: (render) => {
                return (<div>
                    <div style={{
                        background: '#f0f8ff', padding: '12px 16px', marginBottom: '16px', border: '1px solid #91d5ff'
                    }}>
                        <Space direction="vertical" size="small">
                            <div><strong>申请编号:</strong> {requestId}</div>
                            <div><strong>申请时间:</strong> 2023-06-15 09:30:00</div>
                            <div><strong>申请人:</strong> 张三 (技术部)</div>
                        </Space>
                    </div>
                    {render()}
                </div>);
            }, children: () => {
                return (<div>
                    <Descriptions title="申请信息" bordered column={2}>
                        <Descriptions.Item label="申请类型">费用报销</Descriptions.Item>
                        <Descriptions.Item label="申请金额">¥2,580.00</Descriptions.Item>
                        <Descriptions.Item label="费用类型">差旅费</Descriptions.Item>
                        <Descriptions.Item label="发生时间">2023-06-10 至 2023-06-12</Descriptions.Item>
                        <Descriptions.Item label="费用明细" span={2}>
                            <div>交通费: ¥800.00</div>
                            <div>住宿费: ¥1,200.00</div>
                            <div>餐饮费: ¥580.00</div>
                        </Descriptions.Item>
                        <Descriptions.Item label="申请原因" span={2}>
                            前往上海参加技术交流会议，包含交通、住宿和餐饮费用。
                        </Descriptions.Item>
                    </Descriptions>

                    <Divider/>

                    <div>
                        <h4>审批流程</h4>
                        <List
                            dataSource={[{
                                title: '部门经理审批',
                                name: '李经理',
                                status: 'completed',
                                time: '2023-06-15 10:15:00',
                                remark: '同意申请'
                            }, {
                                title: '财务审批',
                                name: '王会计',
                                status: 'completed',
                                time: '2023-06-15 14:30:00',
                                remark: '费用明细清晰，同意报销'
                            }, {
                                title: '总经理审批', name: '赵总', status: 'pending', time: '-', remark: '待审批'
                            },]}
                            renderItem={(item) => (<List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar
                                        style={{backgroundColor: item.status === 'completed' ? '#52c41a' : '#faad14'}}>
                                        {item.name[0]}
                                    </Avatar>}
                                    title={<Space>
                                        {item.title}
                                        <Tag color={item.status === 'completed' ? 'green' : 'orange'}>
                                            {item.status === 'completed' ? '已完成' : '待审批'}
                                        </Tag>
                                    </Space>}
                                    description={<div>
                                        <div>审批人: {item.name}</div>
                                        <div>审批时间: {item.time}</div>
                                        <div>审批意见: {item.remark}</div>
                                    </div>}
                                />
                            </List.Item>)}
                        />
                    </div>
                </div>);
            }, footerButtons: [{
                children: '打印申请', onClick: () => message.info("打印功能待实现"),
            }, {
                children: '驳回', onClick: () => message.success("申请已驳回"),
            }, {
                children: '批准', type: 'primary', onClick: () => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            message.success("申请已批准");
                            resolve();
                        }, 1000);
                    });
                },
            },],
        });
    }, [modal]);

    return (<Card title="审批列表" size="small">
        <Space direction="vertical" style={{width: '100%'}}>
            {[{
                id: 'REQ20230615001', type: '费用报销', applicant: '张三', amount: 2580, status: 'pending'
            }, {
                id: 'REQ20230615002', type: '请假申请', applicant: '李四', days: 3, status: 'approved'
            }, {
                id: 'REQ20230615003', type: '采购申请', applicant: '王五', amount: 15000, status: 'rejected'
            },].map((request) => (<Card key={request.id} size="small" style={{marginBottom: 8}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                        <div style={{fontWeight: 'bold', marginBottom: 4}}>{request.type}</div>
                        <div>申请人: {request.applicant}</div>
                        {request.amount && <div>金额: ¥{request.amount}</div>}
                        {request.days && <div>天数: {request.days}天</div>}
                        <div>
                            状态:
                            <Tag
                                color={request.status === 'pending' ? 'orange' : request.status === 'approved' ? 'green' : 'red'}>
                                {request.status === 'pending' ? '待审批' : request.status === 'approved' ? '已批准' : '已驳回'}
                            </Tag>
                        </div>
                    </div>
                    <Button type="primary" onClick={() => showApprovalModal(request.id)}>
                        处理审批
                    </Button>
                </div>
            </Card>))}
        </Space>
    </Card>);
};

const BusinessScenarioExamples = () => {
    return (<Space direction="vertical" style={{width: '100%'}} size="large">
        <UserManagementModalExample/>
        <OrderDetailModalExample/>
        <ApprovalProcessModalExample/>
    </Space>);
};

render(<BusinessScenarioExamples/>);
```

- 数据加载弹窗
- 展示使用withDecorator实现弹窗加载数据或加载远程组件的逻辑
- _Modal(@components/Modal),global(@components/Global),antd(antd),fetch(@kne/react-fetch),_Content(@components/Content)

```jsx
const { default: Modal, useModal } = _Modal;
const { useState } = React;
const { Button, Space } = antd;
const { default: Fetch } = fetch;
const { PureGlobal } = global;
const { default: Content } = _Content;

const BaseExample = () => {
  const modal = useModal();
  const [open, setOpen] = useState(false);
  return (
    <Space wrap>
      <Modal
        title="组件调用方式"
        withDecorator={(render) => (
          <Fetch
            loader={() => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve([
                    {
                      label: "内容1",
                      content: "内容1内容1内容1内容1内容1内容1内容1",
                    },
                    {
                      label: "内容2",
                      content: "内容2内容2内容2内容2内容2内容2内容2内容2",
                    },
                  ]);
                }, 1000);
              });
            }}
            render={({ data }) => render({ data })}
          />
        )}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        {({ data }) => <Content list={data} col={2} />}
      </Modal>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        组件调用方式
      </Button>
      <Button
        onClick={() => {
          modal({
            title: "hooks调用方式",
            withDecorator: (render) => (
              <Fetch
                loader={() => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve([
                        {
                          label: "内容1",
                          content: "内容1内容1内容1内容1内容1内容1内容1",
                        },
                        {
                          label: "内容2",
                          content: "内容2内容2内容2内容2内容2内容2内容2内容2",
                        },
                      ]);
                    }, 1000);
                  });
                }}
                render={({ data }) => render({ data })}
              />
            ),
            children: ({ data }) => <Content list={data} col={2} />,
          });
        }}
      >
        hooks调用方式
      </Button>
      <Button
        onClick={() => {
          modal({
            title: (props) => {
              return "hooks调用方式";
            },
            withDecorator: (render) => (
              <Fetch
                loader={() => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve([
                        {
                          label: "内容1",
                          content: "内容1内容1内容1内容1内容1内容1内容1",
                        },
                        {
                          label: "内容2",
                          content: "内容2内容2内容2内容2内容2内容2内容2内容2",
                        },
                      ]);
                    }, 1000);
                  });
                }}
                render={({ data }) => render({ data })}
              />
            ),
            children: ({ data }) => <Content list={data} col={2} />,
          });
        }}
      >
        hooks title调用方式
      </Button>
    </Space>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);

```

- 消息确认和提示
- 展示命令式调用的消息确认和提示功能
- _Modal(@components/Modal),global(@components/Global),antd(antd),fetch(@kne/react-fetch),_Content(@components/Content)

```jsx
const { default: Modal, useConfirmModal } = _Modal;
const { useState } = React;
const { Button, Space, message } = antd;
const { PureGlobal } = global;
const BaseExample = () => {
  const confirmModal = useConfirmModal();
  return (
    <Space wrap>
      <Button
        onClick={() => {
          confirmModal({
            danger: true,
            type: "confirm",
            title: "确定要删除吗？",
            message:
              "确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除",
          });
        }}
      >
        confirm
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "confirm",
            confirmType: "warning",
            title: "确定要编辑吗？",
            message:
              "确定要编辑确定要编辑确定要编辑确定要编辑确定要编辑确定要编辑确定要编辑",
          });
        }}
      >
        confirm 警告
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "info",
            title: "确定要删除吗？",
            message:
              "确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除",
          });
        }}
      >
        info
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "info",
            message:
              "确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除",
          });
        }}
      >
        info无标题
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "success",
            title: "确定要删除吗？",
            message:
              "确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除",
          });
        }}
      >
        success
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "warning",
            title: "确定要删除吗？",
            message:
              "确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除",
          });
        }}
      >
        warning
      </Button>
      <Button
        onClick={() => {
          confirmModal({
            type: "error",
            title: "确定要删除吗？",
            message:
              "确定要删除确定要删除确定要删除确定要删除确定要删除确定要删除",
          });
        }}
      >
        error
      </Button>
    </Space>
  );
};

render(
  <PureGlobal>
    <BaseExample />
  </PureGlobal>
);

```

- childrenRef的使用
- 展示如何使用childrenRef获取弹窗内容的引用
- _Modal(@components/Modal),antd(antd)

```jsx
const { default: Modal, useModal } = _Modal;
const { Button } = antd;
const BaseExample = () => {
  const modal = useModal();

  return (
    <Button
      onClick={() => {
        modal({
          title: "示例弹框",
          children: ({ childrenRef }) => {
            return (
              <div ref={childrenRef}>
                示例弹框示例弹框示例弹框示例弹框示例弹框示例弹框
              </div>
            );
          },
          onConfirm: (e, { childrenRef }) => {
            console.log(childrenRef.current);
          },
        });
      }}
    >
      点击弹出弹框
    </Button>
  );
};

render(<BaseExample />);

```

### API

## Modal

| 属性名           | 说明                                                                                                                                      | 类型           | 默认值   |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------|--------------|-------|
| footer        | 弹窗的footer，当其被显式设置成null且footerButtons没有设置过时弹窗不显示footer。当它类型为function时可以得到close方法和withDecorator设置的 props                                   | jsx,function | -     |
| footerButtons | 弹窗footer的按钮区，默认为确认和取消按钮，默认按钮分别响应onConfirm和onCancel方法，如果自定义设置footerButtons则需要自行传入onClick参数，onConfirm和onCancel方法将不生效                      | array        | -     |
| onClose       | 弹窗关闭时调用，弹窗受控时由该方法将外部open状态修改                                                                                                            | function     | -     |
| onConfirm     | 当footerButtons未自定义设置时点击确认按钮触发执行该方法，当其返回Promise点击后Promise，resolve之前确认按钮显示为loading状态，返回值为false或者Promise的resolve值为false时弹窗不会被关闭，其他情况弹窗默认关闭 | function     | -     |
| onCancel      | 和onConfirm类似，其为点击取消按钮触发                                                                                                                 | function     | -     |
| children      | 弹窗内容，可以为jsx或者function，为function时可以接收到close和withDecorator设置的 props                                                                        | jsx,function | -     |
| withDecorator | 弹窗修饰器，会接收到弹窗children的render方法，可以在其外部添加修饰内容后执行render方法，给render方法传入的值可以在children,footer,rightOptions类型为function时接收到对应的参数                  | function     | -     |
| rightOptions  | 弹窗右侧区域，和children类似可以为jsx或者function类型                                                                                                    | jsx,function | -     |
| maskClosable  | 点击蒙层是否允许关闭                                                                                                  | boolean      | false |

其他参数参考antd Modal组件

### useModal

获取一个执行后可以弹出一个Modal组件的方法

#### 返回值:modal

| 属性名   | 说明                            | 类型       |
|-------|-------------------------------|----------|
| modal | 执行后可以弹出一个Modal弹窗，参数同Modal组件参数 | function |

### TabsModal

一个Tabs和Modal组合起来的组件，对弹窗title做了特殊处理，更加符合UI交互逻辑

| 属性名              | 说明                                                                                   | 类型           | 默认值 |
|------------------|--------------------------------------------------------------------------------------|--------------|-----|
| items            | 同antd Tabs的items参数                                                                   | array        | -   |
| items[].label    | 选项卡头显示文字                                                                             | string       | -   |
| items[].children | 选项卡头显示内容，和antd Tabs不同的是它可以是一个function和Modal的children类似可以接收items[].withDecorator传入的参数 | jsx,function | -   |
| items[].key      | 对应activeKey值                                                                         | string       | -   |
| items[].withDecorator | 弹窗修饰器和Modal的withDecorator作用一致                                                        | function     | -   |
| activeKey        | 当前激活 tab 面板的 key                                                                     | string       |     |
| withDecorator    | 弹窗修饰器和Modal的withDecorator作用一致                                                        | function     | -   |
| defaultActiveKey | 初始化选中面板的 key，如果没有设置 activeKey                                                        | string       |     |
| onChange         | 切换面板的回调                                                                              | function     |     |

### useTabsModal

获取一个执行后可以弹出一个TabsModal组件的方法

#### 返回值:tabsModal

| 属性名       | 说明                                    | 类型       |
|-----------|---------------------------------------|----------|
| tabsModal | 执行后可以弹出一个TabsModal弹窗，参数同TabsModal组件参数 | function |

### ModalButton

点击以后可以执行获取数据，在数据未返回时按钮展示为loading状态，数据返回后弹出Modal弹窗

| 属性名        | 说明                                                | 类型                                     | 默认值 |
|------------|---------------------------------------------------|----------------------------------------|-----|
| api        | @kne/react-fetch 所需参数                             | object                                 | -   |
| modalProps | 同Modal参数,当它为function时，执行function后返回的值作为modalProps | object,function({data,fetchApi,close}) | -   |

其他参数同antd Button 组件

### TabsModalButton

点击以后可以执行获取数据，在数据未返回时按钮展示为loading状态，数据返回后弹出TabsModal弹窗

| 属性名        | 说明                                                    | 类型                                     | 默认值 |
|------------|-------------------------------------------------------|----------------------------------------|-----|
| api        | @kne/react-fetch 所需参数                                 | object                                 | -   |
| modalProps | 同TabsModal参数,当它为function时，执行function后返回的值作为modalProps | object,function({data,fetchApi,close}) | -   |

其他参数同antd Button 组件

### useModal

获取一个执行后可以弹出一个Modal组件的方法

#### return:modal

| 属性名   | 说明                            | 类型       |
|-------|-------------------------------|----------|
| modal | 执行后可以弹出一个Modal弹窗，参数同Modal组件参数 | function |

### TabsModal

一个Tabs和Modal组合起来的组件，对弹窗title做了特殊处理，更加符合UI交互逻辑

| 属性名              | 说明                                                                                   | 类型           | 默认值 |
|------------------|--------------------------------------------------------------------------------------|--------------|-----|
| items            | 同antd Tabs的items参数                                                                   | array        | -   |
| items[].label    | 选项卡头显示文字                                                                             | string       | -   |
| items[].children | 选项卡头显示内容，和antd Tabs不同的是它可以是一个function和Modal的children类似可以接收items[].withDecorator传入的参数 | jsx,function | -   |
| items[].key      | 对应activeKey值                                                                         | string       | -   |
| activeKey        | 当前激活 tab 面板的 key                                                                     | string       |     |
| withDecorator    | 弹窗修饰器和Modal的withDecorator作用一致                                                        | function     | -   |
| defaultActiveKey | 初始化选中面板的 key，如果没有设置 activeKey                                                        | string       |     |
| onChange         | 切换面板的回调                                                                              | function     |     |

### useTabsModal

获取一个执行后可以弹出一个TabsModal组件的方法

#### return:tabsModal

| 属性名       | 说明                                    | 类型       |
|-----------|---------------------------------------|----------|
| tabsModal | 执行后可以弹出一个TabsModal弹窗，参数同TabsModal组件参数 | function |

### ModalButton

点击以后可以执行获取数据，在数据未返回时按钮展示为loading状态，数据返回后弹出Modal弹窗

| 属性名        | 说明                                                | 类型                                     | 默认值 |
|------------|---------------------------------------------------|----------------------------------------|-----|
| api        | @kne/react-fetch 所需参数                             | object                                 | -   |
| modalProps | 同Modal参数,当它为function时，执行function后返回的值作为modalProps | object,function({data,fetchApi,close}) | -   |

其他参数同antd Button 组件

### TabsModalButton

点击以后可以执行获取数据，在数据未返回时按钮展示为loading状态，数据返回后弹出TabsModal弹窗

| 属性名        | 说明                                                    | 类型                                     | 默认值 |
|------------|-------------------------------------------------------|----------------------------------------|-----|
| api        | @kne/react-fetch 所需参数                                 | object                                 | -   |
| modalProps | 同TabsModal参数,当它为function时，执行function后返回的值作为modalProps | object,function({data,fetchApi,close}) | -   |

其他参数同antd Button 组件