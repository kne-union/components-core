import isColValueEmpty from '../isColValueEmpty';

const createLegacyRender = legacyRender => (value, { column, dataSource, context } = {}) => {
  const isEmpty = column?.valueIsEmpty
    ? column.valueIsEmpty(value)
    : isColValueEmpty(value, column?.emptyOf);

  return legacyRender(value, {
    hover: column?.hover,
    primary: column?.primary,
    onClick: column?.onClick,
    ellipsis: column?.ellipsis,
    emptyRender: column?.renderPlaceholder || column?.emptyRender,
    isEmpty,
    width: column?.width,
    min: column?.min,
    max: column?.max,
    name: column?.name,
    hideSecond: column?.hideSecond,
    colValue: dataSource,
    renderProps: context
  });
};

export default createLegacyRender;
