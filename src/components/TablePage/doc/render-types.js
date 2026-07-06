const { PureGlobal } = _Global;
const { default: TablePage } = _TablePage;
const { Flex, Typography, Divider } = antd;

const avatar = seed => `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;

const dataSource = [
  {
    id: 'PRJ-001',
    name: '客户门户改版',
    status: 'active',
    tagIds: ['urgent', 'design', 'frontend'],
    ownerName: '张明',
    ownerAvatar: avatar('ZhangMing'),
    members: [
      { name: '张明', avatar: avatar('ZhangMing') },
      { name: '李婷', avatar: avatar('LiTing') },
      { name: '王强', avatar: avatar('WangQiang') },
      { name: '赵敏', avatar: avatar('ZhaoMin') },
      { name: '孙杰', avatar: avatar('SunJie') }
    ],
    contractName: '服务合同-2024.pdf',
    contractUrl: `${window.PUBLIC_URL || ''}/logo192.png`,
    attachments: [
      {
        id: 'file-001',
        filename: '需求说明.docx',
        url: `${window.PUBLIC_URL || ''}/logo192.png`,
        date: '2024-01-10',
        userName: '张明'
      },
      {
        id: 'file-002',
        filename: '原型稿.fig',
        url: `${window.PUBLIC_URL || ''}/logo192.png`,
        date: '2024-01-12',
        userName: '李婷'
      }
    ]
  },
  {
    id: 'PRJ-002',
    name: '移动端性能优化',
    status: 'draft',
    tagIds: ['backend', 'performance'],
    ownerName: '李婷',
    ownerAvatar: avatar('LiTing'),
    members: [
      { name: '李婷', avatar: avatar('LiTing') },
      { name: '王强', avatar: avatar('WangQiang') }
    ],
    contractName: '技术优化协议.pdf',
    contractUrl: `${window.PUBLIC_URL || ''}/logo192.png`,
    attachments: [
      {
        id: 'file-003',
        filename: '性能报告.xlsx',
        url: `${window.PUBLIC_URL || ''}/logo192.png`,
        date: '2024-02-01',
        userName: '王强'
      }
    ]
  },
  {
    id: 'PRJ-003',
    name: '数据中台建设',
    status: 'done',
    tagIds: ['backend', 'data'],
    ownerName: '王强',
    ownerAvatar: avatar('WangQiang'),
    members: [
      { name: '王强', avatar: avatar('WangQiang') },
      { name: '赵敏', avatar: avatar('ZhaoMin') },
      { name: '孙杰', avatar: avatar('SunJie') }
    ],
    contractName: '数据平台合同.pdf',
    contractUrl: `${window.PUBLIC_URL || ''}/logo192.png`,
    attachments: [
      {
        id: 'file-004',
        filename: '架构设计.pdf',
        url: `${window.PUBLIC_URL || ''}/logo192.png`,
        date: '2024-03-05',
        userName: '王强'
      },
      {
        id: 'file-005',
        filename: '接口清单.csv',
        url: `${window.PUBLIC_URL || ''}/logo192.png`,
        date: '2024-03-08',
        userName: '赵敏'
      },
      {
        id: 'file-006',
        filename: '验收标准.docx',
        url: `${window.PUBLIC_URL || ''}/logo192.png`,
        date: '2024-03-10',
        userName: '孙杰'
      }
    ]
  }
];

const columns = [
  { name: 'id', title: '项目编号', width: 120, renderType: 'small', fixed: 'left' },
  { name: 'name', title: '项目名称', width: 200, renderType: 'main' },
  {
    name: 'status',
    title: '状态',
    width: 100,
    renderType: 'enum',
    moduleName: 'projectStatus',
    getValueOf: item => item.status
  },
  {
    name: 'tagIds',
    title: '标签',
    width: 220,
    renderType: 'enumList',
    moduleName: 'projectTags',
    getValueOf: item => item.tagIds
  },
  {
    name: 'owner',
    title: '负责人',
    width: 80,
    renderType: 'avatar',
    avatarSize: 32,
    getValueOf: item => ({
      src: item.ownerAvatar,
      alt: item.ownerName
    })
  },
  {
    name: 'members',
    title: '成员',
    width: 160,
    renderType: 'avatarList',
    avatarSize: 28,
    getValueOf: item => ({
      list: item.members.map(member => ({
        src: member.avatar,
        alt: member.name
      })),
      maxCount: 4
    })
  },
  {
    name: 'contract',
    title: '合同',
    width: 180,
    renderType: 'file',
    getValueOf: item => ({
      url: item.contractUrl,
      filename: item.contractName
    })
  },
  {
    name: 'attachments',
    title: '附件',
    width: 320,
    renderType: 'fileList',
    getValueOf: item => item.attachments
  }
];

const BaseExample = () => (
  <PureGlobal
    preset={{
      locale: 'zh-CN',
      enums: {
        projectStatus: [
          { value: 'draft', description: '草稿', type: 'default' },
          { value: 'active', description: '进行中', type: 'processing' },
          { value: 'done', description: '已完成', type: 'success' }
        ],
        projectTags: [
          { value: 'urgent', description: '紧急', type: 'error' },
          { value: 'design', description: '设计', type: 'processing' },
          { value: 'frontend', description: '前端', type: 'success' },
          { value: 'backend', description: '后端', type: 'warning' },
          { value: 'performance', description: '性能', type: 'default' },
          { value: 'data', description: '数据', type: 'processing' }
        ]
      },
      apis: {
        file: {
          staticUrl: window.PUBLIC_URL || '/',
          getUrl: {
            loader: async ({ params }) => {
              return `${window.PUBLIC_URL || ''}/logo192.png`;
            }
          }
        }
      }
    }}
  >
    <Flex vertical gap={16}>
      <div style={{ color: '#666', fontSize: 13, lineHeight: 1.8 }}>
        <Typography.Title level={5} style={{ marginTop: 0 }}>
          TablePage 扩展 renderType
        </Typography.Title>
        <p>
          通过 <code>preset</code> 扩展列渲染类型，结合 <code>getValueOf</code> 声明数据结构即可渲染，无需手写{' '}
          <code>render</code>：
        </p>
        <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
          <li>
            <code>enum</code> — 使用 <code>Enum</code> + <code>StateTag</code>，列配置 <code>moduleName</code>
          </li>
          <li>
            <code>enumList</code> — 多个枚举标签列表
          </li>
          <li>
            <code>avatar</code> — 使用 <code>Image.Avatar</code>
          </li>
          <li>
            <code>avatarList</code> — 使用 <code>Avatar.Group</code> + <code>Image.Avatar</code>
          </li>
          <li>
            <code>file</code> — 使用 <code>FileLink</code> 展示单个文件
          </li>
          <li>
            <code>fileList</code> — 使用多个 <code>FileLink</code> 展示附件列表
          </li>
        </ul>
      </div>
      <Divider style={{ margin: 0 }} />
      <TablePage
        name="demo-table-page-render-types"
        controllerOpen={false}
        scroll={{ x: 1500 }}
        pagination={false}
        dataFormat={data => ({
          list: data.pageData,
          total: data.totalCount,
          data
        })}
        loader={() =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve({
                pageData: dataSource,
                totalCount: dataSource.length
              });
            }, 200);
          })
        }
        columns={columns}
      />
    </Flex>
  </PureGlobal>
);

render(<BaseExample />);
