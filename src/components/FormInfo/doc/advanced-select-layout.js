const { AdvancedSelect } = _FormInfo;
const { PureGlobal } = global;
const { default: Icon } = icon;
const { useState } = React;
const { range, merge, get } = _lodash;
const dayjs = _dayjs;
const { Col } = _antd;

const BaseExample = () => {
  return (
    <PureGlobal
      preset={{
        ajax: () => {
          return Promise.resolve({ data: { code: 0, data: [] } });
        },
      }}
    >
      <AdvancedSelect.Field
        getSearchProps={(text) => {
          return {
            data: { keyword: text },
          };
        }}
        displayItems={[{ label: "第九十项", value: 90 }]}
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
        modalSize={"large"}
        wrapClassName={"calendar-modal"}
        selectIcon={
          <div>
            <Icon type={"icon-gouxuan"} />
          </div>
        }
        leftSpan={6}
        right={() => (
          <Col flex={1}>
            <div>我是header</div>
            <div>我是body</div>
          </Col>
        )}
        leftBottom={() => <div>我是leftBottom</div>}
      />
    </PureGlobal>
  );
};
render(<BaseExample />);
