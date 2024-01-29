import { Table as AntTable } from "antd";
import { forwardRef, useMemo, useState } from "react";
import useRefCallback from "@kne/use-ref-callback";
import Fetch, { withFetch } from "@kne/react-fetch";
import classnames from "classnames";
import get from "lodash/get";
import Scroller from "@common/components/Scroller";
import { getScrollEl } from "@common/utils/importantContainer";
import withTableColumnsWidthChanger from "./withTableColumnsWidthChanger";
import Features from "@components/Features";
import style from "./style.module.scss";
import importMessages from "./locale";
import { FormattedMessage, IntlProvider } from "@components/Intl";
import CreateColumnsControl from "./withTableColumnsWidthChanger/createColumnsControl";

const AntTableTemplate = ({
  className,
  columns,
  originColumns,
  controllerOpen,
  tableColumnFetchApi,
  name,
  scroller,
  featureId,
  ...props
}) => {
  const { data, setData } = tableColumnFetchApi || {};

  const renderFeatureConfig = ({ children }) => {
    return featureId ? (
      <Features id={featureId}>{(args) => children(args)}</Features>
    ) : (
      children({})
    );
  };

  const renderTable = (columns) => {
    return (
      <Scroller
        className="table-page-scroller"
        scroller={scroller}
        getScrollTarget={(el) => {
          return (
            el.querySelector(".ant-table-body") ||
            el.querySelector(".ant-table-content")
          );
        }}
      >
        {renderFeatureConfig({
          children: ({ options }) => {
            const _columns = columns.filter((item) => {
              if (!item.key) {
                return true;
              }
              if (!Array.isArray(get(options, "hiddenColumns"))) {
                return true;
              }
              return options.hiddenColumns.indexOf(item.key) === -1;
            });
            return (
              <AntTable
                {...props}
                columns={
                  controllerOpen === false
                    ? _columns
                    : _columns.map((item, index) => {
                        if (_columns.length - 1 === index) {
                          return {
                            ...item,
                            title: () => {
                              return (
                                <>
                                  <span>{item.title}</span>
                                  <CreateColumnsControl
                                    data={data}
                                    columns={originColumns}
                                    setData={setData}
                                    name={name}
                                  />
                                </>
                              );
                            },
                          };
                        }
                        return item;
                      })
                }
                className={classnames(className, "table-page")}
              />
            );
          },
        })}
      </Scroller>
    );
  };

  return renderTable(columns);
};

export const Table = withTableColumnsWidthChanger(AntTableTemplate);

const TableList = withFetch(
  ({
    data,
    refresh,
    reload,
    requestParams,
    fetchProps,
    isComplete,
    setData,
    loadMore,
    send,
    dataFormat,
    pagination,
    scroller,
    getColumns,
    getColumnsParams,
    className,
    columns,
    featureId,
    stickyOffset,
    ...props
  }) => {
    const handlerDataFormat = useRefCallback(dataFormat);
    const handlerGetColumns = useRefCallback(getColumns);
    const formatData = useMemo(() => {
      return handlerDataFormat(data);
    }, [data, handlerDataFormat]);
    const tableProps = {
      dataSource: formatData.list,
      pagination: pagination.open
        ? {
            total: formatData.total,
            showTotal: (total) => (
              <>
                <FormattedMessage
                  id="Page_Total"
                  moduleName="TablePage"
                  defaultMessage="共"
                />
                <span className={style["total_text"]}>{total}</span>
                <FormattedMessage
                  id="Page_TotalCount"
                  moduleName="TablePage"
                  defaultMessage="条"
                />
              </>
            ),
            current: get(
              requestParams,
              [pagination.paramsType, pagination.current],
              1
            ),
            pageSize: pagination.defaultPageSize, // || get(requestParams, [pagination.paramsType, pagination.pageSize], 20)
            onChange: pagination.onChange
              ? pagination.onChange
              : (page, size) => {
                  if (
                    page !==
                    get(
                      requestParams,
                      [pagination.paramsType, pagination.current],
                      1
                    )
                  ) {
                    (pagination.requestType === "refresh" ? refresh : reload)({
                      [pagination.paramsType]: {
                        [pagination.current]: page,
                        [pagination.pageSize]: size,
                      },
                    });
                  } else {
                    pagination.onShowSizeChange &&
                      pagination.onShowSizeChange(page, size);
                  }
                },
            size: pagination.size,
            showSizeChanger: pagination.showSizeChanger,
            showQuickJumper: pagination.showQuickJumper,
          }
        : false,
      className: className,
      style: {
        "--sticky-offset": stickyOffset,
      },
    };
    return (
      <IntlProvider importMessages={importMessages} moduleName="TablePage">
        <div
          className={classnames(
            style["loading-container"],
            "loading-container",
            {
              "is-loading": !isComplete,
            }
          )}
        >
          {typeof getColumns === "function" && !columns ? (
            <Fetch
              data={data}
              params={getColumnsParams}
              loader={({ data, params }) =>
                handlerGetColumns({
                  data,
                  params,
                  formatData,
                })
              }
              render={({ data }) => (
                <Table
                  {...props}
                  {...tableProps}
                  columns={data}
                  scroller={scroller}
                  featureId={featureId}
                />
              )}
            />
          ) : (
            <Table
              {...props}
              {...tableProps}
              columns={columns}
              scroller={scroller}
              featureId={featureId}
            />
          )}
        </div>
      </IntlProvider>
    );
  }
);

const TablePage = forwardRef(({ pagination, ...props }, ref) => {
  const [pageSize, setPageSize] = useState(20);
  pagination = Object.assign(
    {},
    {
      showSizeChanger: true,
      showQuickJumper: true,
      open: true,
      paramsType: "data",
      requestType: "reload",
      current: "currentPage",
      pageSize: "perPage",
      size: "default",
    },
    pagination
  );
  const otherParams = useMemo(() => {
    const _otherParams = {};
    if (props.params && Object.keys(props.params).length > 0) {
      _otherParams["params"] = {
        ...props.params,
        [pagination.pageSize]: pageSize,
      };
    }
    if (props.data && Object.keys(props.data).length > 0) {
      _otherParams["data"] = { ...props.data, [pagination.pageSize]: pageSize };
    }
    return _otherParams;
  }, [props.params, props.data, pagination.pageSize, pageSize]);
  return (
    <TableList
      {...{
        ...props,
        pagination: Object.assign(
          {},
          {
            defaultPageSize: pageSize,
            onShowSizeChange: (current, size) => {
              setPageSize(size);
            },
          },
          pagination
        ),
        ...otherParams,
      }}
      ref={ref}
    />
  );
});

TablePage.defaultProps = {
  controllerOpen: true,
  size: "middle",
  stickyOffset: "var(--nav-height)",
  sticky: {
    getContainer: getScrollEl,
  },
  scroller: {
    getContainer: getScrollEl,
  },
  scroll: { x: "max-content" },
  rowKey: "id",
  pagination: {},
  dataFormat: (data) => {
    return {
      list: data.pageData,
      total: data.totalCount,
    };
  },
};

export default TablePage;
