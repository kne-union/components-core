const { get, merge, range } = lodash;
const Common = _Common;
const { default: Fetch } = _reactFetch;

const { ScrollLoader } = Common;

const BaseExample = () => {
  console.log(Fetch, _reactFetch);
  return (
    <Fetch
      loader={({ data }) => {
        const params = Object.assign(
          {
            perPage: 20,
            currentPage: 1,
          },
          data
        );
        return new Promise((resolve) => {
          const start = (params.currentPage - 1) * params.perPage;
          setTimeout(() => {
            resolve({
              totalCount: 100,
              pageData: range(start, start + params.perPage).map((key) => {
                return {
                  label: `第${key + 1}项`,
                  value: key + 1,
                };
              }),
            });
          }, 500);
        });
      }}
      render={(fetchApi) => {
        const pagination = {
          paramsType: "data",
          current: "currentPage",
          pageSize: "perPage",
          defaultPageSize: 20,
        };
        const current = get(
            fetchApi.requestParams,
            [pagination.paramsType, pagination.current],
            1
          ),
          pageSize =
            get(fetchApi.requestParams, [
              pagination.paramsType,
              pagination.pageSize,
            ]) || pagination.defaultPageSize;

        const formatData = {
          list: fetchApi.data.pageData,
          total: fetchApi.data.totalCount,
        };
        return (
          <ScrollLoader
            completeTips=""
            className="scroll-list"
            isLoading={!fetchApi.isComplete}
            noMore={!formatData.total || current * pageSize >= formatData.total}
            onLoader={async () => {
              await fetchApi.loadMore(
                merge({
                  data: {
                    [pagination.pageSize]: pageSize,
                    [pagination.current]: current + 1,
                  },
                }),
                (data, newData) => {
                  return Object.assign({}, newData, {
                    pageData: data.pageData.concat(newData.pageData),
                  });
                }
              );
            }}
          >
            {formatData.list.map((item) => {
              return <div>{item.label}</div>;
            })}
          </ScrollLoader>
        );
      }}
    />
  );
};

render(<BaseExample />);
