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

const parseRenderTypeParts = renderType =>
  typeof renderType === 'string' ? renderType.split('-').filter(Boolean) : [];

const MAIN_COLUMN_NAME_HINT = /name|nickname|title|姓名|名称/i;

/** ID 列自行处理省略；未配置 onClick 时继承主列（main，优先名称/姓名等）点击行为 */
const normalizeIdColumns = columns => {
  if (!Array.isArray(columns) || columns.length === 0) {
    return columns;
  }
  const mainColumns = columns.filter(column => {
    const parts = parseRenderTypeParts(column?.renderType);
    return parts.includes('main') && typeof column.onClick === 'function';
  });
  const mainColumn =
    mainColumns.find(column => MAIN_COLUMN_NAME_HINT.test(column.name || column.title || '')) ||
    mainColumns[0];

  return columns.map(column => {
    const parts = parseRenderTypeParts(column?.renderType);
    if (!parts.includes('id')) {
      return column;
    }
    const next = Object.assign({ ellipsisHandledByRender: true }, column);
    if (!mainColumn || typeof column.onClick === 'function') {
      return next;
    }
    return Object.assign(next, {
      onClick: mainColumn.onClick,
      primary: column.primary ?? true,
      hover: column.hover ?? true
    });
  });
};

const prepareColumns = (columns, hiddenColumns) =>
  normalizeIdColumns(filterHiddenColumns(columns, hiddenColumns));

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
        const filtered = prepareColumns(raw, hiddenColumns);
        columnsRef.current = filtered;
        return filtered;
      },
      [columns, getColumns, hiddenColumns, columnsRef]
    );

    const staticFilteredColumns = useMemo(() => {
      if (isDynamicColumns(columns, getColumns)) {
        return null;
      }
      const filtered = prepareColumns(columns, hiddenColumns);
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
