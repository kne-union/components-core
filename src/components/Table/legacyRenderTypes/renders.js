import columnsStyle from '../columns.module.scss';
import dayjs from 'dayjs';
import OptionsList from '../OptionsList';
import classnames from 'classnames';
import StateTag from '@components/StateTag';
import Image from '@components/Image';
import Enum from '@components/Enum';
import HideInfoComponent from '../HideInfoComponent';
import Ellipsis from '../Ellipsis';
import ColItem from '../ColItem';
import omit from 'lodash/omit';
import { useState } from 'react';
import isColValueEmpty from '../isColValueEmpty';

const date = (item, { hover, primary, isEmpty, emptyRender, ...props }) => (
  <ColItem {...props} type="date" item={item} primary={primary} hover={hover} emptyRender={emptyRender} isEmpty={isEmpty || !dayjs(item).isValid()}>
    {dayjs(item).format('YYYY-MM-DD')}
  </ColItem>
);

const dateShort = (item, { hover, primary, isEmpty, emptyRender, ...props }) => (
  <ColItem {...props} type="date-short" item={item} primary={primary} hover={hover} emptyRender={emptyRender} isEmpty={isEmpty || !dayjs(item).isValid()}>
    {dayjs(item).format('YYYY-MM')}
  </ColItem>
);

const dateRange = (item, { hover, primary, isEmpty, emptyRender, ...props }) => (
  <ColItem {...props} type="date-range" item={item} primary={primary} hover={hover} emptyRender={emptyRender} isEmpty={isEmpty || isColValueEmpty(item)}>
    {dayjs(item?.[0]).format('YYYY-MM-DD') + '~' + dayjs(item?.[1]).format('YYYY-MM-DD')}
  </ColItem>
);

const datetime = (item, { hover, primary, emptyRender, isEmpty, hideSecond, ...props }) => (
  <ColItem {...props} item={item} primary={primary} hover={hover} emptyRender={emptyRender} isEmpty={isEmpty || !dayjs(item).isValid()}>
    {dayjs(item).format(hideSecond ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD HH:mm:ss')}
  </ColItem>
);

const serialNumber = (item, { hover, primary, emptyRender, isEmpty, ...props }) => (
  <ColItem {...props} type="serial-number" item={item} primary={primary} hover={hover} emptyRender={emptyRender} isEmpty={isEmpty}>
    {item}
  </ColItem>
);

const serialNumberShort = (item, { hover, primary, emptyRender, isEmpty, ...props }) => (
  <ColItem {...props} type="serial-number-short" item={item} primary={primary} hover={hover} emptyRender={emptyRender} isEmpty={isEmpty}>
    {item}
  </ColItem>
);

const user = (item, { hover, primary, ellipsis, emptyRender, isEmpty, ...props }) => (
  <ColItem {...props} type="user" item={item} primary={primary} hover={hover} emptyRender={emptyRender} isEmpty={isEmpty}>
    <Ellipsis ellipsis={ellipsis}>{item}</Ellipsis>
  </ColItem>
);

const userName = (item, { hover, primary, ellipsis, emptyRender, isEmpty, ...props }) => (
  <ColItem {...props} type="user-name" item={item} primary={primary} hover={hover} emptyRender={emptyRender} isEmpty={isEmpty}>
    <Ellipsis ellipsis={ellipsis}>{item}</Ellipsis>
  </ColItem>
);

const contacts = (item, { hover, primary, ellipsis, emptyRender, isEmpty, ...props }) => (
  <ColItem {...props} type="contacts" item={item} primary={primary} hover={hover} emptyRender={emptyRender} isEmpty={isEmpty}>
    <Ellipsis ellipsis={ellipsis}>{item}</Ellipsis>
  </ColItem>
);

const tag = (item, { emptyRender, isEmpty, ...props }) => (
  <ColItem {...props} type="tag" item={item} emptyRender={emptyRender} isEmpty={isEmpty}>
    {item &&
      (item.isEnum ? (
        <Enum name={item.name} moduleName={item.moduleName} force={item.force}>
          {({ type, description }) => (
            <StateTag type={type} {...Object.assign({}, omit(item, ['name', 'isEnum', 'moduleName', 'force']))} text={description} />
          )}
        </Enum>
      ) : (
        <StateTag {...Object.assign({}, item)} />
      ))}
  </ColItem>
);

const avatar = (item, { emptyRender, isEmpty, ...props }) => (
  <ColItem {...props} type="avatar" item={item} emptyRender={emptyRender} isEmpty={isEmpty}>
    <Image.Avatar {...Object.assign({}, item)} size={32} />
  </ColItem>
);

const singleRow = (item, { hover, primary, ellipsis, emptyRender, isEmpty, ...props }) => (
  <ColItem {...props} type="single-row" item={item} hover={hover} primary={primary} emptyRender={emptyRender} isEmpty={isEmpty}>
    <Ellipsis ellipsis={ellipsis}>{item}</Ellipsis>
  </ColItem>
);

const HideInfoCell = ({ api, columnProps }) => {
  const [expand, setExpand] = useState(false);
  const { hover, primary, ellipsis, emptyRender, isEmpty } = columnProps;
  return (
    <HideInfoComponent
      api={api}
      expand={expand}
      onExpand={() => setExpand(true)}
      hover={hover}
      primary={primary}
      ellipsis={ellipsis}
      emptyRender={emptyRender}
      isEmpty={isEmpty}
    />
  );
};

const hideInfo = (item, props) => <HideInfoCell api={item} columnProps={props} />;

const mainInfo = (item, { ellipsis, hover = true, primary = true, emptyRender, isEmpty, ...props }) => (
  <ColItem {...props} type="main-info" item={item} hover={hover} primary={primary} emptyRender={emptyRender} isEmpty={isEmpty}>
    <Ellipsis ellipsis={ellipsis}>{item}</Ellipsis>
  </ColItem>
);

const description = (item, { hover, primary, ellipsis, emptyRender, isEmpty, ...props }) => (
  <ColItem {...props} type="description" item={item} hover={hover} primary={primary} emptyRender={emptyRender} isEmpty={isEmpty}>
    <Ellipsis ellipsis={ellipsis}>{item}</Ellipsis>
  </ColItem>
);

const options = (item) => (
  <OptionsList className={classnames(columnsStyle['col-item'], columnsStyle['options'])} list={item} />
);

const other = (item, { hover, primary, ellipsis, emptyRender, isEmpty, ...props }) => (
  <ColItem {...props} type="other" item={item} hover={hover} primary={primary} emptyRender={emptyRender} isEmpty={isEmpty}>
    <Ellipsis ellipsis={ellipsis}>{item}</Ellipsis>
  </ColItem>
);

const sensitiveInfo = (item, { hover, primary, ellipsis, emptyRender, isEmpty, ...props }) => (
  <ColItem {...props} type="sensitiveInfo" item={item} hover={hover} primary={primary} emptyRender={emptyRender} isEmpty={isEmpty}>
    <Ellipsis ellipsis={ellipsis}>{item}</Ellipsis>
  </ColItem>
);

export const legacyRenders = {
  date,
  dateShort,
  dateRange,
  datetime,
  serialNumber,
  serialNumberShort,
  user,
  userName,
  contacts,
  tag,
  avatar,
  singleRow,
  hideInfo,
  mainInfo,
  description,
  options,
  sensitiveInfo,
  other
};

export { isColValueEmpty };
