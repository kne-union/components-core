const columnTypeDefaults = {
  date: { width: 160, min: 120, max: 400 },
  dateShort: { width: 120, min: 100, max: 400 },
  dateRange: { width: 240, min: 120, max: 400 },
  datetime: { width: 190, min: 190, max: 400 },
  serialNumber: { width: 190, min: 100, max: 400 },
  serialNumberShort: { width: 120, min: 100, max: 400 },
  user: { width: 200, min: 120, max: 400 },
  userName: { width: 100, min: 100, max: 400 },
  contacts: { width: 240, min: 160, max: 400 },
  tag: { width: 140, min: 100, max: 400 },
  avatar: { width: 80, min: 64, max: 200 },
  singleRow: { width: 70, min: 70, max: 400 },
  hideInfo: { width: 120, min: 80, max: 400 },
  mainInfo: { width: 300, min: 160, max: 500 },
  description: { width: 400, min: 160, max: 600 },
  options: { width: 180, min: 120, max: 400 },
  sensitiveInfo: { width: 200, min: 100, max: 400 },
  other: { width: 200, min: 120, max: 400 },
  otherSmall: { width: 100, min: 70, max: 400 },
  otherLarge: { width: 300, min: 120, max: 500 }
};

export default columnTypeDefaults;
