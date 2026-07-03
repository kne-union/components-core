import get from 'lodash/get';
import { getColumnRender } from '@kne/table-page';
import isColValueEmpty from './isColValueEmpty';
import { FORMAT_TYPE_MAP, RENDER_TYPE_MAP } from './legacyTypeMap';
import columnTypeDefaults from './legacyRenderTypes/defaults';

const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

const applyTypeDefaults = (column, type) => {
  const defaults = columnTypeDefaults[type];
  if (!defaults) {
    return column;
  }
  return Object.assign({}, column, {
    width: column.width == null ? defaults.width : column.width,
    min: column.min == null ? defaults.min : column.min,
    max: column.max == null ? defaults.max : column.max
  });
};

const buildRenderProps = (ctx, column) =>
  Object.assign({}, ctx?.context && typeof ctx.context === 'object' ? ctx.context : {}, {
    name: column.name
  });

const resolveDynamicColumnProps = (column, record, renderProps) => {
  if (!hasOwn(column, 'render') || typeof column.render !== 'function') {
    return column;
  }
  return Object.assign({}, column, column.render(Object.assign({}, renderProps, { target: record })) || {});
};

const adaptColumn = column => {
  if (!column || typeof column !== 'object') {
    return column;
  }

  const {
    type,
    valueOf: columnValueOf,
    emptyOf,
    emptyRender,
    titleRender,
    disableColItem,
    render: columnRender,
    groupHeader,
    ...rest
  } = column;

  const adapted = Object.assign({}, rest);
  const hasColumnValueOf = hasOwn(column, 'valueOf') && typeof columnValueOf === 'function';
  const hasColumnRender = hasOwn(column, 'render') && typeof columnRender === 'function';

  if (typeof titleRender === 'function') {
    adapted.title = titleRender(column.title);
  }

  if (groupHeader) {
    adapted.groupHeader = groupHeader;
  }

  if (emptyOf) {
    adapted.valueIsEmpty = value => isColValueEmpty(value, emptyOf);
    adapted.emptyOf = emptyOf;
  }

  if (emptyRender) {
    adapted.renderPlaceholder = emptyRender;
    adapted.emptyRender = emptyRender;
  }

  if (type) {
    if (FORMAT_TYPE_MAP[type]) {
      adapted.format = FORMAT_TYPE_MAP[type];
      Object.assign(adapted, applyTypeDefaults(adapted, type));
    } else if (RENDER_TYPE_MAP[type]) {
      adapted.renderType = RENDER_TYPE_MAP[type];
      Object.assign(adapted, applyTypeDefaults(adapted, type));
    }
    adapted.type = type;
  }

  const legacyCellRender = getColumnRender(adapted);

  if (hasColumnValueOf || hasColumnRender) {
    adapted.getValueOf = (record, ctx) => {
      const renderProps = buildRenderProps(ctx, column);
      const colProps = resolveDynamicColumnProps(column, record, renderProps);
      const valueOfFn = hasOwn(colProps, 'valueOf') && typeof colProps.valueOf === 'function' ? colProps.valueOf : hasColumnValueOf ? columnValueOf : null;

      if (typeof valueOfFn === 'function') {
        const valueOfProps = Object.assign(
          {},
          renderProps,
          disableColItem
            ? {
                targetRender: colValue => {
                  if (typeof legacyCellRender !== 'function') {
                    return colValue;
                  }
                  return legacyCellRender(colValue, {
                    column: Object.assign({}, adapted, colProps),
                    dataSource: record,
                    context: renderProps
                  });
                }
              }
            : {}
        );
        return valueOfFn(record, valueOfProps);
      }

      return get(record, colProps.name || column.name);
    };
  }

  if (disableColItem) {
    adapted.render = value => value;
  } else if (hasColumnRender && typeof legacyCellRender === 'function') {
    adapted.render = (value, ctx) => {
      const record = ctx?.dataSource;
      const renderProps = buildRenderProps(ctx, column);
      const colProps = resolveDynamicColumnProps(column, record, renderProps);

      return legacyCellRender(value, {
        column: Object.assign({}, adapted, colProps),
        dataSource: record,
        context: renderProps
      });
    };
  }

  return adapted;
};

const adaptColumns = columns => {
  if (typeof columns === 'function') {
    return data => adaptColumns(columns(data));
  }
  if (!Array.isArray(columns)) {
    return columns;
  }
  return columns.map(adaptColumn);
};

export default adaptColumns;
