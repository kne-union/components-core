import '@kne/table-page/dist/index.css';
import initLegacyPreset from './initLegacyPreset';
import style from './style.module.scss';
import { Table as AntdTable } from 'antd';
import { Table as BaseTable } from '@kne/table-page';
import { useEffect, useMemo, useRef } from 'react';
import classnames from 'classnames';
import { getScrollEl as getScrollElDefault } from '@common/utils/importantContainer';
import { usePreset } from '@components/Global';
import useRefCallback from '@kne/use-ref-callback';
import adaptColumns from './adaptColumns';
import adaptRowSelection from './adaptRowSelection';
import useSelectedRow from './useSelectedRow';
import useLegacyTableServerApis from './useLegacyTableServerApis';
import TablePage from './TablePage';

initLegacyPreset();

const Table = ({
  columns,
  className,
  getScrollEl = getScrollElDefault,
  sticky = false,
  scrollTopInset = 'var(--nav-height)',
  stickyOffset,
  pagination = false,
  columnRenderProps = {},
  rowKey = 'id',
  dataSource,
  controllerOpen = true,
  name,
  summary,
  scroll,
  scroller: _scroller,
  onTablePropsReady,
  rowSelection,
  sort,
  defaultSort,
  onSortChange,
  ...props
}) => {
  const { tableServerApis: presetTableServerApis } = usePreset();
  const tableServerApis = useLegacyTableServerApis(name, controllerOpen, presetTableServerApis);
  const columnsRef = useRef([]);
  const adaptedColumns = useMemo(() => {
    const result = adaptColumns(columns) || [];
    columnsRef.current = result;
    return result;
  }, [columns]);

  const { sortRender } = BaseTable.useSort({
    sort,
    defaultSort,
    onSortChange
  });

  const context = useMemo(() => Object.assign({}, columnRenderProps), [columnRenderProps]);

  const adaptedRowSelection = useMemo(
    () => adaptRowSelection(rowSelection, { dataSource, rowKey, context }),
    [rowSelection, dataSource, rowKey, context]
  );

  const onTablePropsReadyCallback = useRefCallback(onTablePropsReady);

  useEffect(() => {
    onTablePropsReadyCallback &&
      onTablePropsReadyCallback({
        columns,
        groupColumns: columnsRef.current,
        dataSource,
        visibleColumns: columnsRef.current
      });
  }, [onTablePropsReadyCallback, columns, dataSource]);

  const adaptedSummary = useMemo(
    () =>
      typeof summary === 'function'
        ? (pageData, ...args) => summary(Object.assign({}, { pageData, columns: columnsRef.current }, ...args))
        : null,
    [summary]
  );

  const resolvedScrollTopInset = scrollTopInset ?? stickyOffset ?? 'var(--nav-height)';

  return (
    <div
      className={classnames(className, style['table-shell'], 'table-page-scroller')}
      style={{
        '--scroll-top-inset': resolvedScrollTopInset,
        '--sticky-offset': resolvedScrollTopInset
      }}
    >
      <BaseTable
        {...props}
        sticky={sticky}
        scrollTopInset={resolvedScrollTopInset}
        stickyOffset={resolvedScrollTopInset}
        getStickyContainer={getScrollEl}
        dataSource={dataSource}
        rowKey={rowKey}
        columns={adaptedColumns}
        context={context}
        pagination={pagination}
        controllerOpen={controllerOpen}
        name={name}
        scroll={scroll}
        sortRender={sortRender}
        rowSelection={adaptedRowSelection}
        summary={adaptedSummary}
        tableServerApis={tableServerApis}
      />
    </div>
  );
};

Table.useSelectedRow = useSelectedRow;
Table.TablePage = TablePage;
Table.Summary = AntdTable.Summary;
Table.Summary.Row = AntdTable.Summary.Row;
Table.Summary.Cell = AntdTable.Summary.Cell;

export default Table;
