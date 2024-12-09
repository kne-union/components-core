import { withFetch } from "@kne/react-fetch";
import Table from "./Table";
import classnames from "classnames";
import Features from "@components/Features";
import get from "lodash/get";
import useRefCallback from "@kne/use-ref-callback";
import { useMemo, useState } from "react";
import style from "./style.module.scss";
import importMessages from "./locale";
import { FormattedMessage, IntlProvider } from "@components/Intl";
import localStorage from "@common/utils/localStorage";
import { getScrollEl } from "@common/utils/importantContainer";

const FeaturesColumnsConfig = ({ id, columns, children }) => {
  if (id) {
    return (
      <Features id={id}>
        {({ options }) =>
          children({
            columns: columns.filter((item) => {
              if (!item.name) {
                return true;
              }
              if (!Array.isArray(get(options, "hiddenColumns"))) {
                return true;
              }
              return options.hiddenColumns.indexOf(item.name) === -1;
            }),
          })
        }
      </Features>
    );
  }
  return children({ columns });
};

const TablePageInner = withFetch(
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
    className,
    featureId,
    columns,
    getColumns,
    pagination,
    columnRenderProps,
    summary,
    ...props
  }) => {
    const handlerDataFormat = useRefCallback(dataFormat);
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
                  moduleName="Table"
                  defaultMessage="共"
                />
                <span className={style["total_text"]}>{total}</span>
                <FormattedMessage
                  id="Page_TotalCount"
                  moduleName="Table"
                  defaultMessage="条"
                />
              </>
            ),
            current: get(
              requestParams,
              [pagination.paramsType, pagination.currentName],
              1
            ),
            pageSize: pagination.pageSize,
            onChange: pagination.onChange
              ? pagination.onChange
              : (page, size) => {
                  if (
                    page !==
                    get(
                      requestParams,
                      [pagination.paramsType, pagination.currentName],
                      1
                    )
                  ) {
                    (pagination.requestType === "refresh" ? refresh : reload)({
                      [pagination.paramsType]: {
                        [pagination.currentName]: page,
                        [pagination.pageSizeName]: size,
                      },
                    });
                  } else {
                    pagination.onShowSizeChange &&
                      pagination.onShowSizeChange(page, size);
                  }
                  getScrollEl().scrollTop = 0;
                },
            size: pagination.size,
            showSizeChanger: pagination.showSizeChanger,
            showQuickJumper: pagination.showQuickJumper,
            pageSizeOptions: pagination.pageSizeOptions,
          }
        : false,
    };

    return (
      <IntlProvider importMessages={importMessages} moduleName="Table">
        <FeaturesColumnsConfig id={featureId} columns={columns}>
          {({ columns }) => (
            <Table
              {...Object.assign({}, props, tableProps)}
              className={classnames(className, "loading-container", {
                "is-loading": !isComplete,
              })}
              columns={columns}
              columnRenderProps={{
                ...columnRenderProps,
                requestParams,
                fetchProps,
                data,
              }}
              summary={
                typeof summary === "function"
                  ? (...args) => {
                      return summary(
                        Object.assign(
                          {},
                          {
                            data,
                            fetchProps,
                            requestParams,
                            refresh,
                            reload,
                            loadMore,
                            send,
                            dataFormat,
                            pagination,
                          },
                          ...args
                        )
                      );
                    }
                  : null
              }
            />
          )}
        </FeaturesColumnsConfig>
      </IntlProvider>
    );
  }
);

TablePageInner.defaultProps = {
  pagination: {},
  columnRenderProps: {},
  sticky: true,
  dataFormat: (data) => {
    return {
      list: data.pageData,
      total: data.totalCount,
    };
  },
};

const TablePage = ({ pagination, ...props }, ref) => {
  pagination = Object.assign(
    {},
    {
      showSizeChanger: true,
      showQuickJumper: true,
      open: true,
      paramsType: "data",
      requestType: "reload",
      currentName: "currentPage",
      pageSizeName: "perPage",
      pageSize: 20, //size: "small",
    },
    pagination
  );
  const pageSizeKey = `${(
    props.name || "common"
  ).toUpperCase()}_TABLE_PAGE_SIZE`;
  const [pageSize, setPageSize] = useState(
    localStorage.getItem(pageSizeKey) || pagination.pageSize
  );
  const params = props[pagination.paramsType];
  const fetchParams = useMemo(() => {
    return {
      [pagination.paramsType]: Object.assign({}, params, {
        [pagination.pageSizeName]: pageSize,
      }),
    };
  }, [params, pagination.pageSizeName, pagination.paramsType, pageSize]);
  return (
    <TablePageInner
      {...props}
      {...fetchParams}
      pagination={Object.assign({}, pagination, {
        pageSize,
        onShowSizeChange: (current, size) => {
          localStorage.setItem(pageSizeKey, size);
          setPageSize(size);
        },
      })}
      ref={ref}
    />
  );
};

export default TablePage;
