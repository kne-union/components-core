const { createWithRemoteLoader } = _remoteLoader;
const { useState } = React;
const { range, merge, get } = _lodash;
const dayjs = _dayjs;
const { Button } = _antd;
const defaultEvents = [
  {
    id: 11,
    title: "",
    start: "2023-05-23 16:23",
    end: "2023-05-23 18:23",
  },
  {
    id: 12,
    title: "",
    start: "2023-05-23 13:23",
    end: "2023-05-23 18:23",
  },
];

const AddExtraButton = () => {
  return <Button type="link">添加面试官</Button>;
};

const Content = createWithRemoteLoader({
  modules: ["components-core:FormInfo@formModule"],
})(({ remoteModules }) => {
  const [formModule] = remoteModules;
  const { CalendarSelect } = formModule;

  return (
    <CalendarSelect.Field
      getSearchProps={(text) => {
        return {
          data: { keyword: text },
        };
      }}
      displayItems={[{ label: "第九十项", value: 90 }]}
      // extra={<AddExtraButton />}
      api={{
        loader: ({ data }) => {
          const params = Object.assign(
            {
              perPage: 20,
              currentPage: 1,
            },
            data
          );
          return new Promise((resolve) => {
            setTimeout(() => {
              const start = (params.currentPage - 1) * params.perPage;
              resolve({
                totalCount: 100,
                pageData: range(start, start + 20)
                  .map((key) => {
                    return {
                      label: `第${key + 1}项`,
                      value: key + 1,
                    };
                  })
                  .filter(({ label }) => {
                    return params.keyword
                      ? label.indexOf(params.keyword) > -1
                      : true;
                  }),
              });
            }, 1000);
          });
        },
      }}
      onChange={(value) => {
        console.log(value);
      }}
      single
      isPopup={false}
      label={"面试官"}
      placeholder={"选择面试官"}
      calendarProps={{
        formatEvents: (events) => {
          return [];
        },
        formatRequestData: () => {
          return {};
        },
        fetchApi: {},
        rightOptions: () => <div>111</div>,
        renderBottom: () => <div>8888</div>,
        topHeader: () => <div>333</div>,
      }}
    />
  );
});

const BaseExample = createWithRemoteLoader({
  modules: ["components-core:Global", "components-core:FormInfo@useFormModal"],
})(({ remoteModules }) => {
  const [Global] = remoteModules;

  return (
    <Global
      preset={{
        ajax: () => {
          return Promise.resolve({ data: { code: 0, data: [] } });
        },
      }}
    >
      <Content />
    </Global>
  );
});
render(<BaseExample />);
