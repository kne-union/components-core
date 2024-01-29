const { TooltipFetch } = _Tooltip;
const { preset } = reactFetch;
const { default: Descriptions } = _Descriptions;
const { default: StateTag } = _StateTag;

preset({
  ajax: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            code: 0,
            data: {
              clientName: "腾讯",
              title: "腾讯科技公司",
              type: "增值税专用发票",
              date: "2022-08-15",
            },
          },
        });
      }, 1000);
    });
  },
});

const BaseExample = () => {
  return (
    <TooltipFetch
      api={{
        url: "/api/data",
      }}
      size="large"
      fetchContent={(data) => {
        return {
          content: (
            <Descriptions
              dataSource={[
                [
                  { label: "客户名称", content: data.clientName },
                  { label: "发票抬头", content: data.title },
                ],
                [
                  { label: "发票类型", content: data.type },
                  { label: "发票日期", content: data.date },
                ],
              ]}
            />
          ),
        };
      }}
    >
      <StateTag text="哈哈哈" />
    </TooltipFetch>
  );
};

render(<BaseExample />);
