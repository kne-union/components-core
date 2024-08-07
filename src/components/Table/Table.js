import style from "./style.module.scss";
import { Table as AntdTable } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import classnames from "classnames";
import Scroller from "@common/components/Scroller";
import { getScrollEl } from "@common/utils/importantContainer";
import useResize from "@common/hooks/useResize";
import useTableConfig from "./useTableConfig";
import useColumnTypeProps from "@components/Table/useColumnTypeProps";
import useGroupHeader from "./useGroupHeader";
import useSort from "./useSort";
import useRefCallback from "@kne/use-ref-callback";

const Table = ({
  columns,
  className,
  getScrollEl,
  sticky,
  stickyOffset,
  pagination,
  columnRenderProps,
  rowKey,
  dataSource,
  controllerOpen,
  name,
  summary,
  scroll,
  onTablePropsReady,
  ...props
}) => {
  const [tableWidth, setTableWidth] = useState(0);
  const [isLayout, setIsLayout] = useState(true);

  useEffect(() => {
    if (tableWidth) {
      setTimeout(() => {
        setIsLayout(false);
      }, 0);
    }
  }, [tableWidth]);
  const columnRenderPropsRef = useRef(columnRenderProps);
  columnRenderPropsRef.current = columnRenderProps;
  const ref = useResize(
    (el) => {
      setTableWidth(el.clientWidth);
    },
    { isDebounce: true }
  );
  const { expandInfo, computedColumnProps } = useColumnTypeProps({
    rowKey,
    renderProps: columnRenderProps,
  });

  const {
    columnsConfig,
    visibleColumns,
    computedColumnProps: computedColumnConfigProps,
    currentMoveColumnIndex,
    totalWidth,
  } = useTableConfig({
    columns,
    controllerOpen,
    name,
    computedColumnProps,
    tableWidth,
    rowKey,
  });

  const sortRender = useSort(props);

  const targetColumns = useMemo(() => {
    return visibleColumns.map((col, index) => {
      let target = computedColumnProps(col, index, {
        rowKey,
        expandInfo,
        columnsConfig,
      });

      if (target.sort && col.type !== "options") {
        target = Object.assign({}, target, {
          title: (
            <>
              {target.title}
              {sortRender({
                name: col.name,
                single:
                  typeof target.sort === "object" ? target.sort.single : true,
              })}
            </>
          ),
        });
      }

      if (controllerOpen) {
        target = computedColumnConfigProps(target, index, {
          tableWidth,
          columnsConfig,
        });
      }

      return target;
    });
  }, [
    visibleColumns,
    tableWidth,
    columnsConfig,
    expandInfo,
    rowKey,
    controllerOpen,
    computedColumnProps,
    computedColumnConfigProps,
    sortRender,
  ]);

  const { columns: groupColumns, hasGroupHeader } =
    useGroupHeader(targetColumns);

  const onTablePropsReadyCallback = useRefCallback(onTablePropsReady);

  useEffect(() => {
    onTablePropsReadyCallback &&
      onTablePropsReadyCallback({
        columns,
        groupColumns,
        dataSource,
        visibleColumns,
      });
  }, [
    onTablePropsReadyCallback,
    groupColumns,
    dataSource,
    columns,
    visibleColumns,
  ]);

  return (
    <div
      className={classnames(className, style["table"], {
        [style["is-resize"]]: currentMoveColumnIndex !== null,
        [style["is-computed"]]: isLayout,
        [style["has-group-header"]]: hasGroupHeader,
      })}
      ref={ref}
      style={{
        "--sticky-offset": stickyOffset,
      }}
    >
      {!isLayout && (
        <Scroller
          className="table-page-scroller"
          scroller={{ getContainer: getScrollEl }}
          getScrollTarget={(el) => {
            return (
              el.querySelector(".ant-table-body") ||
              el.querySelector(".ant-table-content")
            );
          }}
        >
          <AntdTable
            {...props}
            sticky={
              sticky
                ? {
                    getContainer: getScrollEl,
                  }
                : false
            }
            dataSource={dataSource}
            rowKey={rowKey}
            columns={groupColumns}
            scroll={Object.assign(
              {},
              { x: Math.max(tableWidth, totalWidth) },
              scroll
            )}
            pagination={pagination}
            summary={
              typeof summary === "function"
                ? (current, ...args) => {
                    return summary(
                      Object.assign(
                        {},
                        { pageData: current },
                        { columns: groupColumns }
                      ),
                      ...args
                    );
                  }
                : null
            }
          />
        </Scroller>
      )}
    </div>
  );
};

Table.defaultProps = {
  controllerOpen: true,
  rowKey: "id",
  getScrollEl,
  columnRenderProps: {},
  sticky: false,
  stickyOffset: "var(--nav-height)",
  pagination: false,
};

export default Table;
