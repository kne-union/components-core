import { Avatar, Space } from 'antd';
import { renderTagItem } from '@kne/table-page';
import Enum from '@components/Enum';
import StateTag from '@components/StateTag';
import Image from '@components/Image';
import { FileLink } from '@components/File';

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

const fileRender = (value, { column } = {}) => {
  const props = normalizeFileValue(value);
  if (!props) {
    return null;
  }
  const { id, url, filename, originName, ...rest } = props;
  if (!id && !url) {
    return null;
  }
  return (
    <FileLink
      id={id}
      url={url}
      filename={filename}
      originName={originName}
      apis={rest.apis ?? column?.fileApis}
      {...rest}
    />
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

export const renderTypes = {
  enum: enumRender,
  enumList: enumListRender,
  avatar: avatarRender,
  avatarList: avatarListRender,
  file: fileRender,
  fileList: fileListRender
};
