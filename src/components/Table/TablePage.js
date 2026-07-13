import initLegacyPreset from './initLegacyPreset';
import initPreset from '@components/TablePage/initPreset';
import BaseTablePage from '@kne/table-page';
import { forwardRef, useCallback, useMemo, useRef } from 'react';
import { getScrollEl } from '@common/utils/importantContainer';
import { useScrollElement } from '@components/Global';
import useRefCallback from '@kne/use-ref-callback';
import adaptColumns from './adaptColumns';
import { withFeatureTablePage } from '@components/TablePage/featureGate';

initLegacyPreset();
initPreset();

const filterHiddenColumns = (columns, hiddenColumns) => {
  if (!Array.isArray(columns)) {
    return [];
  }
  if (!Array.isArray(hiddenColumns) || hiddenColumns.length === 0) {
    return columns;
  }
  return columns.filter(item => {
    if (!item?.name) {
      return true;
    }
    return hiddenColumns.indexOf(item.name) === -1;
  });
};

const isDynamicColumns = (columns, getColumns) =>
  typeof getColumns === 'function' || typeof columns === 'function';

const TablePageInner = forwardRef(
  (
    {
      columns,
      getColumns,
      summary,
      hiddenColumns,
      columnsRef,
      horizontalScroller = true,
      getScrollContainer,
      scrollTopInset,
      stickyOffset,
      ...props
    },
    ref
  ) => {
    const resolvedScrollTopInset = scrollTopInset ?? stickyOffset;
    const getScrollElement = useScrollElement();
    const resolvedGetScrollContainer = useRefCallback(() => {
      if (typeof getScrollContainer === 'function') {
        return getScrollContainer();
      }
      return getScrollElement() || getScrollEl();
    });

    const resolveColumns = useCallback(
      data => {
        const raw =
          typeof getColumns === 'function'
            ? getColumns(data)
            : typeof columns === 'function'
              ? columns(data)
              : columns;
        const filtered = filterHiddenColumns(raw, hiddenColumns);
        const adapted = adaptColumns(filtered) || [];
        columnsRef.current = adapted;
        return adapted;
      },
      [columns, getColumns, hiddenColumns, columnsRef]
    );

    const staticResolvedColumns = useMemo(() => {
      if (isDynamicColumns(columns, getColumns)) {
        return null;
      }
      const filtered = filterHiddenColumns(columns, hiddenColumns);
      const adapted = adaptColumns(filtered) || [];
      columnsRef.current = adapted;
      return adapted;
    }, [columns, getColumns, hiddenColumns, columnsRef]);

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
      <BaseTablePage
        ref={ref}
        {...props}
        scrollTopInset={resolvedScrollTopInset}
        stickyOffset={resolvedScrollTopInset}
        columns={staticResolvedColumns !== null ? staticResolvedColumns : columns}
        getColumns={staticResolvedColumns !== null ? undefined : resolveColumns}
        summary={typeof summary === 'function' ? adaptedSummary : null}
        horizontalScroller={horizontalScroller}
        getScrollContainer={resolvedGetScrollContainer}
      />
    );
  }
);

const TablePage = withFeatureTablePage(
  forwardRef((props, ref) => {
    const columnsRef = useRef([]);
    return <TablePageInner ref={ref} columnsRef={columnsRef} {...props} />;
  })
);

export default TablePage;
