import '@kne/table-page/dist/index.css';
import initLegacyPreset from './initLegacyPreset';
import BaseTablePage from '@kne/table-page';
import Features from '@components/Features';
import get from 'lodash/get';
import classnames from 'classnames';
import { forwardRef, useCallback, useMemo, useRef } from 'react';
import { getScrollEl } from '@common/utils/importantContainer';
import adaptColumns from './adaptColumns';
import style from './style.module.scss';

initLegacyPreset();

const filterHiddenColumns = (columns, hiddenColumns) => {
  if (!Array.isArray(columns)) {
    return [];
  }
  if (!Array.isArray(hiddenColumns)) {
    return columns;
  }
  return columns.filter(item => {
    if (!item?.name) {
      return true;
    }
    return hiddenColumns.indexOf(item.name) === -1;
  });
};

const resolveScrollTopInset = (scrollTopInset, stickyOffset) => scrollTopInset ?? stickyOffset;

const TablePageInner = forwardRef(
  (
    {
      columns,
      getColumns,
      summary,
      hiddenColumns,
      columnsRef,
      horizontalScroller = true,
      getScrollContainer = getScrollEl,
      className,
      sticky = true,
      scrollTopInset = 'var(--nav-height)',
      stickyOffset,
      ...props
    },
    ref
  ) => {
    const resolvedScrollTopInset = resolveScrollTopInset(scrollTopInset, stickyOffset);
    const shellStyle = useMemo(
      () => ({
        '--scroll-top-inset': resolvedScrollTopInset,
        '--sticky-offset': resolvedScrollTopInset
      }),
      [resolvedScrollTopInset]
    );

    const resolveColumns = useCallback(
      data => {
        const raw = typeof getColumns === 'function' ? getColumns(data) : typeof columns === 'function' ? columns(data) : columns;
        const filtered = filterHiddenColumns(raw, hiddenColumns);
        const adapted = adaptColumns(filtered) || [];
        columnsRef.current = adapted;
        return adapted;
      },
      [columns, getColumns, hiddenColumns, columnsRef]
    );

    const adaptedSummary = useCallback(
      ctx => {
        if (typeof summary !== 'function') {
          return null;
        }
        return summary(Object.assign({}, ctx, { columns: columnsRef.current }));
      },
      [summary, columnsRef]
    );

    return (
      <div className={classnames(style['table-shell'], 'table-page-scroller', className)} style={shellStyle}>
        <BaseTablePage
          ref={ref}
          {...props}
          sticky={sticky}
          scrollTopInset={resolvedScrollTopInset}
          stickyOffset={resolvedScrollTopInset}
          getColumns={resolveColumns}
          summary={typeof summary === 'function' ? adaptedSummary : null}
          horizontalScroller={horizontalScroller}
          getScrollContainer={getScrollContainer}
        />
      </div>
    );
  }
);

const TablePage = forwardRef(
  (
    {
      featureId,
      columns,
      getColumns,
      summary,
      pagination,
      horizontalScroller = true,
      getScrollContainer = getScrollEl,
      sticky = true,
      scrollTopInset = 'var(--nav-height)',
      stickyOffset,
      className,
      ...props
    },
    ref
  ) => {
    const columnsRef = useRef([]);

    if (!featureId) {
      return (
        <TablePageInner
          ref={ref}
          columns={columns}
          getColumns={getColumns}
          summary={summary}
          pagination={pagination}
          columnsRef={columnsRef}
          horizontalScroller={horizontalScroller}
          getScrollContainer={getScrollContainer}
          sticky={sticky}
          scrollTopInset={scrollTopInset}
          stickyOffset={stickyOffset}
          className={className}
          {...props}
        />
      );
    }

    return (
      <Features id={featureId}>
        {({ options }) => (
          <TablePageInner
            ref={ref}
            columns={columns}
            getColumns={getColumns}
            summary={summary}
            pagination={pagination}
            hiddenColumns={get(options, 'hiddenColumns')}
            columnsRef={columnsRef}
            horizontalScroller={horizontalScroller}
            getScrollContainer={getScrollContainer}
            sticky={sticky}
            scrollTopInset={scrollTopInset}
            stickyOffset={stickyOffset}
            className={className}
            {...props}
          />
        )}
      </Features>
    );
  }
);

export default TablePage;
