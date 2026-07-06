import '@kne/table-page/dist/index.css';
import BaseTablePage from '@kne/table-page';
import { forwardRef, useCallback, useMemo, useRef } from 'react';
import initPreset from './initPreset';
import { withFeatureTablePage } from './featureGate';

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
  ({ columns, getColumns, summary, hiddenColumns, columnsRef, ...props }, ref) => {
    const resolveColumns = useCallback(
      data => {
        const raw =
          typeof getColumns === 'function'
            ? getColumns(data)
            : typeof columns === 'function'
              ? columns(data)
              : columns;
        const filtered = filterHiddenColumns(raw, hiddenColumns);
        columnsRef.current = filtered;
        return filtered;
      },
      [columns, getColumns, hiddenColumns, columnsRef]
    );

    const staticFilteredColumns = useMemo(() => {
      if (isDynamicColumns(columns, getColumns)) {
        return null;
      }
      const filtered = filterHiddenColumns(columns, hiddenColumns);
      columnsRef.current = filtered;
      return filtered;
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
        columns={staticFilteredColumns !== null ? staticFilteredColumns : columns}
        getColumns={staticFilteredColumns !== null ? undefined : resolveColumns}
        summary={typeof summary === 'function' ? adaptedSummary : null}
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
