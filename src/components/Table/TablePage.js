import {withFetch} from "@kne/react-fetch";
import Table from "./Table";
import classnames from "classnames";
import Features from "@components/Features";
import get from "lodash/get";
import useRefCallback from "@kne/use-ref-callback";
import {forwardRef, useMemo, useState} from "react";
import style from "./style.module.scss";
import localStorage from "@common/utils/localStorage";
import {getScrollEl} from "@common/utils/importantContainer";
import {useIntl} from '@kne/react-intl';
import withLocale from './withLocale';

const FeaturesColumnsConfig = ({id, columns, children}) => {
    if (id) {
        return (<Features id={id}>
            {({options}) => children({
                columns: columns.filter((item) => {
                    if (!item.name) {
                        return true;
                    }
                    if (!Array.isArray(get(options, "hiddenColumns"))) {
                        return true;
                    }
                    return options.hiddenColumns.indexOf(item.name) === -1;
                }),
            })}
        </Features>);
    }
    return children({columns});
};

const TablePageInnerContent = withLocale(({
                                      data,
                                      refresh,
                                      reload,
                                      requestParams,
                                      fetchProps,
                                      isComplete,
                                      setData,
                                      loadMore,
                                      send,
                                      dataFormat = (data) => {
                                          return {
                                              list: data.pageData, total: data.totalCount,
                                          };
                                      },
                                      className,
                                      featureId,
                                      columns,
                                      getColumns,
                                      pagination = {},
                                      columnRenderProps = {},
                                      summary,
                                      sticky = true,
                                      ...props
                                  }) => {
    const {formatMessage} = useIntl();
    const handlerDataFormat = useRefCallback(dataFormat);
    const formatData = useMemo(() => {
        return handlerDataFormat(data);
    }, [data, handlerDataFormat]);

    const tableProps = {
        dataSource: formatData.list, pagination: pagination.open ? {
            total: formatData.total,
            showTotal: (total) => (<>
                {formatMessage({id: 'TotalText'})}&nbsp;
                <span className={style["total_text"]}>{total}</span>
                &nbsp;
                {formatMessage({id: 'ItemText'})}
            </>),
            current: get(requestParams, [pagination.paramsType, pagination.currentName], 1),
            pageSize: get(requestParams, [pagination.paramsType, pagination.pageSizeName], 20),
            onChange: (page, size) => {
                (() => {
                    if (typeof pagination.onChange === 'function') {
                        pagination.onChange(page, size);
                        return;
                    }
                    if (page !== get(requestParams, [pagination.paramsType, pagination.currentName], 1)) {
                        (pagination.requestType === "refresh" ? refresh : reload)({
                            [pagination.paramsType]: {
                                [pagination.currentName]: page, [pagination.pageSizeName]: size,
                            },
                        });
                    } else {
                        pagination.onShowSizeChange && pagination.onShowSizeChange(page, size);
                    }
                })();
                getScrollEl().scrollTop = 0;
            },
            size: pagination.size,
            hideOnSinglePage: pagination.hideOnSinglePage,
            showSizeChanger: pagination.showSizeChanger,
            showQuickJumper: pagination.showQuickJumper,
            pageSizeOptions: pagination.pageSizeOptions,
        } : false,
    };

    return (<FeaturesColumnsConfig id={featureId} columns={typeof columns === 'function' ? columns(data) : columns}>
        {({columns}) => (<Table
            {...Object.assign({}, props, tableProps)}
            sticky={sticky}
            className={classnames(className, "loading-container", {
                "is-loading": !isComplete,
            })}
            columns={columns}
            columnRenderProps={{
                ...columnRenderProps, requestParams, fetchProps, data,
            }}
            summary={typeof summary === "function" ? (...args) => {
                return summary(Object.assign({}, {
                    data, fetchProps, requestParams, refresh, reload, loadMore, send, dataFormat, pagination,
                }, ...args));
            } : null}
        />)}
    </FeaturesColumnsConfig>);
});

const TablePageInner = withFetch(TablePageInnerContent);

const TablePage = forwardRef(({pagination, ...props}, ref) => {
    pagination = Object.assign({}, {
        showSizeChanger: true,
        showQuickJumper: true,
        hideOnSinglePage: false,
        open: true,
        paramsType: "data",
        requestType: "reload",
        currentName: "currentPage",
        pageSizeName: "perPage"
    }, pagination);
    const pageSizeKey = `${(props.name || "common").toUpperCase()}_TABLE_PAGE_SIZE`;
    const [pageSize, setPageSize] = useState(localStorage.getItem(pageSizeKey) || pagination.pageSize);
    const params = props[pagination.paramsType];
    const fetchParams = useMemo(() => {
        return {
            [pagination.paramsType]: Object.assign({}, params, {
                [pagination.pageSizeName]: pageSize,
            }),
        };
    }, [params, pagination.pageSizeName, pagination.paramsType, pageSize]);
    return (<TablePageInner
        {...props}
        {...fetchParams}
        pagination={Object.assign({}, pagination, {
            pageSize, onShowSizeChange: (current, size) => {
                localStorage.setItem(pageSizeKey, size);
                setPageSize(size);
            },
        })}
        ref={ref}
    />);
});

export default TablePage;
