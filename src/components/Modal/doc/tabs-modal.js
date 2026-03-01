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
      label: "项目概述", key: "overview", children: <div>项目基本信息、目标、时间计划和关键里程碑，帮助团队了解项目全貌</div>
    }, {
      label: "任务分配", key: "tasks", children: <div>项目任务分解、责任人分配、进度跟踪和优先级管理，确保项目按计划推进</div>
    }]} rightOptions={<div>快速操作面板：常用功能的快捷入口，提高操作效率</div>}>
      <div>选项卡弹窗主内容区域：展示多标签页的详细信息，支持在不同标签间切换查看</div>
    </TabsModal>
    <Button onClick={() => {
      setOpen(true);
    }}>组件调用方式</Button>
    <Button onClick={() => {
      tabsModal({
        rightOptions: <div>快捷操作：创建任务、分配成员、设置提醒</div>, items: [{
          label: "项目文档", key: "documents", children: <div>项目相关文档、合同、技术资料等文件的管理和查看</div>
        }, {
          label: "团队协作", key: "collaboration", children: <div>团队成员沟通记录、会议纪要、讨论内容等协作信息</div>
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
              resolve([{ label: "任务列表", content: "项目任务清单、完成状态、负责人和截止日期" }, {
                label: "进度报告", content: "项目进度百分比、已完成的任务、待办事项和风险提示"
              }]);
            }, 1000);
          });
        }} render={({ data }) => render({ data })} />,
        items: [{
          label: "任务管理", key: "tasks", children: ({ data }) => <Content list={data} col={2} />
        }, {
          withDecorator: (render) => <Fetch loader={() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([{ label: "资源分配", content: "项目资源使用情况、预算消耗、人力配置" }, {
                  label: "风险跟踪", content: "项目风险列表、影响程度、应对措施和负责人"
                }]);
              }, 1000);
            });
          }} render={({ data }) => render({ tabData: data })} />,
          label: "资源与风险",
          key: "resources",
          children: ({ data, tabData }) => <Content list={[...data, ...tabData]} col={2} />
        }]
      });
    }}>复杂数据加载</Button>
  </Space>;
};

render(<PureGlobal><BaseExample /></PureGlobal>);