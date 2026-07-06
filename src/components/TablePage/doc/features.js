const { PureGlobal } = _Global;
const { useFeatureCall } = _Features;
const { default: TablePage } = _TablePage;
const { Flex, Tag, Alert, Card, Switch, Checkbox, Space, Typography, Divider } = antd;
const { useMemo, useState } = React;

const TOTAL = 80;

const range = (start, end) => Array.from({ length: end - start }, (_, i) => start + i);

const surnames = ['张', '李', '王', '刘', '陈'];
const givenNames = ['伟', '强', '敏', '磊', '杰', '婷', '娜', '静', '丽', '娟'];
const departments = ['技术研发部', '产品设计部', '市场营销部', '人力资源部', '财务部'];
const positions = ['工程师', '高级工程师', '经理', '总监', '专员'];
const educations = ['本科', '硕士', '博士', '大专'];

const statusMap = {
  active: { type: 'success', text: '在职' },
  vacation: { type: 'warning', text: '休假' },
  resigned: { type: 'default', text: '离职' },
  probation: { type: 'processing', text: '试用期' }
};

const COLUMN_OPTIONS = [
  { label: '入职日期', value: 'joinDate' },
  { label: '工龄', value: 'workYears' },
  { label: '学历', value: 'education' },
  { label: '薪资范围', value: 'salary' }
];

const buildEmployee = index => {
  const statusKeys = ['active', 'vacation', 'resigned', 'probation'];
  return {
    id: `EMP${String(index + 1).padStart(4, '0')}`,
    employeeNo: `EMP-2024-${String(index + 1).padStart(4, '0')}`,
    name: `${surnames[index % surnames.length]}${givenNames[index % givenNames.length]}`,
    department: departments[index % departments.length],
    position: positions[index % positions.length],
    status: statusKeys[index % statusKeys.length],
    joinDate: `2023-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')}`,
    workYears: Math.floor(index / 12) + 1,
    salary: `${15 + (index % 20)}K-${20 + (index % 20)}K`,
    education: educations[index % educations.length]
  };
};

const allEmployees = range(0, TOTAL).map(buildEmployee);

const columns = [
  { name: 'employeeNo', title: '工号', width: 160, min: 120, max: 220, fixed: 'left', renderType: 'small' },
  { name: 'name', title: '姓名', width: 100, renderType: 'main' },
  { name: 'department', title: '部门', width: 150 },
  { name: 'position', title: '职位', width: 120 },
  {
    name: 'status',
    title: '状态',
    width: 100,
    renderType: 'status',
    getValueOf: item => statusMap[item.status] || { type: 'default', text: item.status }
  },
  { name: 'joinDate', title: '入职日期', width: 120, format: 'date' },
  { name: 'workYears', title: '工龄', width: 90, render: value => `${value}年` },
  { name: 'education', title: '学历', width: 90 },
  { name: 'salary', title: '薪资范围', width: 120 }
];

const columnTitleMap = columns.reduce((result, column) => {
  result[column.name] = column.title;
  return result;
}, {});

const FeatureRuntimeStatus = () => {
  const { isPass, feature, currentId } = useFeatureCall('employee-list');
  const runtimeOptions = isPass ? feature?.options : feature?.rejectedOptions;
  const runtimeHiddenColumns = runtimeOptions?.hiddenColumns || [];

  return (
    <Alert
      type={isPass ? 'success' : 'warning'}
      showIcon
      message={`Features 运行时：${isPass ? '功能已开启，展示 TablePage' : '功能已关闭，TablePage 显示 403'}`}
      description={
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <div>
            <Typography.Text type="secondary">currentId：</Typography.Text>
            <Typography.Text code style={{ marginLeft: 8 }}>
              {currentId}
            </Typography.Text>
          </div>
          <div>
            <Typography.Text type="secondary">hiddenColumns：</Typography.Text>
            {runtimeHiddenColumns.length ? (
              runtimeHiddenColumns.map(name => (
                <Tag key={name} color="orange" style={{ marginLeft: 8 }}>
                  {columnTitleMap[name] || name}
                </Tag>
              ))
            ) : (
              <Tag color="green" style={{ marginLeft: 8 }}>
                无
              </Tag>
            )}
          </div>
        </Space>
      }
    />
  );
};

const FeatureControls = ({
  featureEnabled,
  onFeatureEnabledChange,
  hiddenColumns,
  onHiddenColumnsChange
}) => (
  <Card title="Features 配置面板" size="small">
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Flex align="center" gap={12}>
        <Switch checked={featureEnabled} onChange={onFeatureEnabledChange} />
        <span>
          员工列表功能：
          <Tag color={featureEnabled ? 'success' : 'error'} style={{ marginLeft: 8 }}>
            {featureEnabled ? '开启' : '关闭（TablePage 不可见）'}
          </Tag>
        </span>
      </Flex>

      <div>
        <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
          options.hiddenColumns — 功能开启时隐藏无权限列：
        </Typography.Text>
        <Checkbox.Group
          options={COLUMN_OPTIONS}
          value={hiddenColumns}
          disabled={!featureEnabled}
          onChange={onHiddenColumnsChange}
        />
      </div>

      <Divider style={{ margin: 0 }} />

      <Typography.Text type="secondary" style={{ fontSize: 13 }}>
        关闭功能开关后，下方 TablePage 区域将显示 403；开启后按 hiddenColumns 隐藏对应列（默认隐藏工龄、学历）。
      </Typography.Text>
    </Space>
  </Card>
);

const BaseExample = () => {
  const [featureEnabled, setFeatureEnabled] = useState(true);
  const [hiddenColumns, setHiddenColumns] = useState(['workYears', 'education']);

  const preset = useMemo(
    () => ({
      features: {
        debug: true,
        profile: {
          id: 'employee-management',
          type: 'system',
          name: '员工管理系统',
          children: [
            {
              id: 'employee-list',
              type: 'feature',
              name: '员工列表',
              close: !featureEnabled,
              options: {
                hiddenColumns: [...hiddenColumns]
              },
              rejectedOptions: {
                hiddenColumns: ['joinDate', 'workYears', 'education', 'salary']
              }
            }
          ]
        }
      }
    }),
    [featureEnabled, hiddenColumns]
  );

  return (
    <PureGlobal preset={preset}>
      <Flex vertical gap={16}>
        <FeatureControls
          featureEnabled={featureEnabled}
          onFeatureEnabledChange={setFeatureEnabled}
          hiddenColumns={hiddenColumns}
          onHiddenColumnsChange={setHiddenColumns}
        />
        <FeatureRuntimeStatus />
        <TablePage
          featureId="employee-list"
          featureRejectedText="暂无员工列表访问权限"
          name="demo-table-page-features"
          controllerOpen={false}
          scroll={{ x: 1000 }}
          pagination={{
            open: true,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ['10', '20', '50']
          }}
          dataFormat={data => ({
            list: data.pageData,
            total: data.totalCount,
            data
          })}
          loader={({ data }) => {
            const currentPage = Number(data?.currentPage) || 1;
            const perPage = Number(data?.perPage) || 10;
            const startIndex = (currentPage - 1) * perPage;

            return new Promise(resolve => {
              setTimeout(() => {
                resolve({
                  pageData: allEmployees.slice(startIndex, startIndex + perPage),
                  totalCount: allEmployees.length
                });
              }, 300);
            });
          }}
          columns={columns}
        />
      </Flex>
    </PureGlobal>
  );
};

render(<BaseExample />);
