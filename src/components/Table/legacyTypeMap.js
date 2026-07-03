export const FORMAT_TYPE_MAP = {};

export const RENDER_TYPE_MAP = {
  date: 'date',
  dateShort: 'dateShort',
  dateRange: 'dateRange',
  datetime: 'datetime',
  serialNumber: 'serialNumber',
  serialNumberShort: 'serialNumberShort',
  user: 'user',
  userName: 'userName',
  contacts: 'contacts',
  tag: 'tag',
  avatar: 'avatar',
  singleRow: 'singleRow',
  hideInfo: 'hideInfo',
  mainInfo: 'mainInfo',
  description: 'description',
  options: 'options',
  sensitiveInfo: 'sensitiveInfo',
  other: 'other',
  otherSmall: 'other',
  otherLarge: 'other'
};

export const LEGACY_TYPES = Object.keys(RENDER_TYPE_MAP);
