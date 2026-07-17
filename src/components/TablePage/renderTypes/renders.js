import { useEffect, useState } from 'react';
import { Avatar, Space, Tooltip } from 'antd';
import classnames from 'classnames';
import { IS_MOBILE_QUERY } from '@kne/responsive-utils';
import { renderTagItem } from '@kne/table-page';
import Enum from '@components/Enum';
import StateTag from '@components/StateTag';
import Image from '@components/Image';
import { FileLink } from '@components/File';
import style from '../style.module.scss';

const resolveModuleName = (value, column) => {
  if (value && typeof value === 'object' && value.moduleName) {
    return value.moduleName;
  }
  return column?.moduleName;
};

const resolveEnumName = value => {
  if (value == null) {
    return value;
  }
  if (typeof value === 'object') {
    return value.name ?? value.value;
  }
  return value;
};

const isTagValue = (value, moduleName) =>
  value &&
  typeof value === 'object' &&
  (value.text != null || value.type != null) &&
  !value.moduleName &&
  !moduleName;

const renderEnumItem = (value, { column, tagProps = {} } = {}) => {
  const moduleName = resolveModuleName(value, column);
  if (isTagValue(value, moduleName)) {
    return renderTagItem(Object.assign({}, value, tagProps));
  }
  if (!moduleName) {
    return null;
  }
  const name = resolveEnumName(value);
  const { force, moduleName: _moduleName, name: _name, value: _value, ...rest } =
    typeof value === 'object' ? value : {};
  return (
    <Enum moduleName={moduleName} name={name} force={force}>
      {data => <StateTag {...Object.assign({}, tagProps, rest)} text={data?.description} {...data} />}
    </Enum>
  );
};

const enumRender = (value, ctx = {}) => renderEnumItem(value, ctx);

const enumListRender = (value, ctx = {}) => {
  const list = Array.isArray(value) ? value : [];
  if (list.length === 0) {
    return null;
  }
  return (
    <Space size={[4, 4]} wrap>
      {list.map((item, index) => (
        <span key={index}>{renderEnumItem(item, ctx)}</span>
      ))}
    </Space>
  );
};

const normalizeAvatarItem = value => {
  if (value == null) {
    return null;
  }
  if (typeof value === 'object') {
    return value;
  }
  return { src: value };
};

const resolveAvatarSize = (value, column, fallback = 32) => {
  const props = normalizeAvatarItem(value);
  return props?.size ?? column?.avatarSize ?? fallback;
};

const avatarRender = (value, { column } = {}) => {
  const props = normalizeAvatarItem(value);
  if (!props) {
    return null;
  }
  return <Image.Avatar {...props} size={resolveAvatarSize(props, column)} />;
};

const avatarListRender = (value, { column } = {}) => {
  const groupProps = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  const list = Array.isArray(value) ? value : groupProps.list;
  if (!Array.isArray(list) || list.length === 0) {
    return null;
  }
  const { list: _list, ...restGroupProps } = groupProps;
  const size = restGroupProps.size ?? column?.avatarSize ?? 32;
  return (
    <Avatar.Group size={size} {...restGroupProps}>
      {list.map((item, index) => {
        const props = normalizeAvatarItem(item);
        if (!props) {
          return null;
        }
        return (
          <Image.Avatar
            key={props.key ?? props.id ?? props.src ?? index}
            {...props}
            size={props.size ?? size}
          />
        );
      })}
    </Avatar.Group>
  );
};

const normalizeFileValue = value => {
  if (value == null) {
    return null;
  }
  if (typeof value === 'string' || typeof value === 'number') {
    return { id: value };
  }
  return value;
};

const useIsViewportMobile = () => {
  const [isViewportMobile, setIsViewportMobile] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }
    return window.matchMedia(IS_MOBILE_QUERY).matches;
  });
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }
    const mediaQuery = window.matchMedia(IS_MOBILE_QUERY);
    const handleChange = event => setIsViewportMobile(event.matches);
    setIsViewportMobile(mediaQuery.matches);
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);
  return isViewportMobile;
};

const FileLinkCell = ({ modalProps, ...props }) => {
  const isViewportMobile = useIsViewportMobile();
  return (
    <FileLink
      {...props}
      modalProps={{
        ...modalProps,
        ...(isViewportMobile ? {} : { mobileFullscreen: false }),
      }}
    />
  );
};

const fileRender = (value, { column } = {}) => {
  const props = normalizeFileValue(value);
  if (!props) {
    return null;
  }
  const { id, url, filename, originName, children, modalProps, ...rest } = props;
  if (!id && !url) {
    return null;
  }
  return (
    <FileLinkCell
      id={id}
      url={url}
      filename={filename}
      originName={originName}
      apis={rest.apis ?? column?.fileApis}
      modalProps={modalProps}
      {...rest}
    >
      {children ?? '查看'}
    </FileLinkCell>
  );
};

const fileListRender = (value, ctx = {}) => {
  const listProps = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  const dataSource = Array.isArray(value) ? value : listProps.dataSource;
  if (!Array.isArray(dataSource) || dataSource.length === 0) {
    return null;
  }
  return (
    <Space size={[4, 4]} wrap>
      {dataSource.map((item, index) => {
        const props = normalizeFileValue(item);
        return (
          <span key={props?.id ?? props?.url ?? props?.filename ?? index}>
            {fileRender(item, ctx)}
          </span>
        );
      })}
    </Space>
  );
};

const IdCell = ({ value, column, dataSource }) => {
  const { onClick } = column || {};
  const hasClick = typeof onClick === 'function';
  // 有 onClick 时默认与 main 一致：可点、主色、hover
  const primary = column?.primary ?? hasClick;
  const hover = column?.hover ?? hasClick;
  const ellipsis = column?.ellipsis ?? true;
  const [loading, setLoading] = useState(false);
  const isClickable = Boolean(hover || primary || hasClick);

  if (!isClickable) {
    return <span className={classnames(style.id, ellipsis && style.ellipsis)}>{value}</span>;
  }

  const ellipsisConfig = typeof ellipsis === 'object' ? ellipsis : {};
  const showTooltip = ellipsis && ellipsisConfig.showTitle !== false;

  const handleClick = hasClick
    ? e => {
        if (loading) {
          return;
        }
        setLoading(true);
        Promise.resolve(onClick({ item: value, colItem: dataSource, event: e })).finally(() => {
          setLoading(false);
        });
      }
    : undefined;

  const text = (
    <span
      className={classnames(style.id, ellipsis && style.ellipsis, {
        [style.hover]: hover,
        [style.primary]: primary,
        [style.clickable]: hasClick,
        [style.loading]: loading
      })}
      onClick={handleClick}
    >
      {value}
    </span>
  );

  if (!showTooltip) {
    return text;
  }

  return <Tooltip title={value}>{text}</Tooltip>;
};

const idRender = (value, { column, dataSource } = {}) => {
  if (value == null || value === '') {
    return null;
  }
  return <IdCell value={value} column={column} dataSource={dataSource} />;
};

export const renderTypes = {
  id: idRender,
  enum: enumRender,
  enumList: enumListRender,
  avatar: avatarRender,
  avatarList: avatarListRender,
  file: fileRender,
  fileList: fileListRender
};
