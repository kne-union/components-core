import columnsStyle from "./columns.module.scss";
import dayjs from "dayjs";
import OptionsList from "./OptionsList";
import classnames from "classnames";
import StateTag from "@components/StateTag";
import Image from "@components/Image";
import Enum from "@components/Enum";
import HideInfoComponent from "./HideInfoComponent";
import Ellipsis from "./Ellipsis";
import ColItem from "./ColItem";
import omit from "lodash/omit";

// init:160px min:120px max:400px
const date = (item, { hover, primary, isEmpty, emptyRender, ...props }) => {
  return (
    <ColItem
      {...props}
      type="date"
      item={item}
      primary={primary}
      hover={hover}
      emptyRender={emptyRender}
      isEmpty={isEmpty || !dayjs(item).isValid()}
    >
      {dayjs(item).format("YYYY-MM-DD")}
    </ColItem>
  );
};

const dateShort = (
  item,
  { hover, primary, isEmpty, emptyRender, ...props }
) => {
  return (
    <ColItem
      {...props}
      type="date-short"
      item={item}
      primary={primary}
      hover={hover}
      emptyRender={emptyRender}
      isEmpty={isEmpty || !dayjs(item).isValid()}
    >
      {dayjs(item).format("YYYY-MM")}
    </ColItem>
  );
};

// init:240px min:120px max:400px
const dateRange = (
  item,
  { hover, primary, isEmpty, emptyRender, ...props }
) => {
  return (
    <ColItem
      {...props}
      type="date-range"
      item={item}
      primary={primary}
      hover={hover}
      emptyRender={emptyRender}
      isEmpty={isEmpty}
    >
      {dayjs(item?.[0]).format("YYYY-MM-DD") +
        "~" +
        dayjs(item?.[1]).format("YYYY-MM-DD")}
    </ColItem>
  );
};
// init:190px min:190px max:400px
const datetime = (
  item,
  { hover, primary, emptyRender, isEmpty, hideSecond, ...props }
) => {
  return (
    <ColItem
      {...props}
      item={item}
      primary={primary}
      hover={hover}
      emptyRender={emptyRender}
      isEmpty={isEmpty || !dayjs(item).isValid()}
    >
      {dayjs(item).format(
        hideSecond ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD HH:mm:ss"
      )}
    </ColItem>
  );
};
// init:190px min:100px max:400px
const serialNumber = (
  item,
  { hover, primary, emptyRender, isEmpty, ...props }
) => {
  return (
    <ColItem
      {...props}
      type="serial-number"
      item={item}
      primary={primary}
      hover={hover}
      emptyRender={emptyRender}
      isEmpty={isEmpty}
    >
      {item}
    </ColItem>
  );
};
// init:120px min:100px max:400px
const serialNumberShort = (
  item,
  { hover, primary, emptyRender, isEmpty, ...props }
) => {
  return (
    <ColItem
      {...props}
      type="serial-number-short"
      item={item}
      primary={primary}
      hover={hover}
      emptyRender={emptyRender}
      isEmpty={isEmpty}
    >
      {item}
    </ColItem>
  );
};
// init:200px min:120px max:400px
const user = (
  item,
  { hover, primary, ellipsis, emptyRender, isEmpty, ...props }
) => {
  return (
    <ColItem
      {...props}
      type="user"
      item={item}
      primary={primary}
      hover={hover}
      emptyRender={emptyRender}
      isEmpty={isEmpty}
    >
      <Ellipsis ellipsis={ellipsis}>{item}</Ellipsis>
    </ColItem>
  );
};
// init:100px 100px 400px
const userName = (
  item,
  { hover, primary, ellipsis, emptyRender, isEmpty, ...props }
) => {
  return (
    <ColItem
      {...props}
      type="user-name"
      item={item}
      primary={primary}
      hover={hover}
      emptyRender={emptyRender}
      isEmpty={isEmpty}
    >
      <Ellipsis ellipsis={ellipsis}>{item}</Ellipsis>
    </ColItem>
  );
};
// init:240px 160px 400px
const contacts = (
  item,
  { hover, primary, ellipsis, emptyRender, isEmpty, ...props }
) => {
  return (
    <ColItem
      {...props}
      type="contacts"
      item={item}
      primary={primary}
      hover={hover}
      emptyRender={emptyRender}
      isEmpty={isEmpty}
    >
      <Ellipsis ellipsis={ellipsis}>{item}</Ellipsis>
    </ColItem>
  );
};
// init:140px min:100px max:400px
const tag = (item, { emptyRender, isEmpty, ...props }) => {
  return (
    <ColItem
      {...props}
      type="tag"
      item={item}
      emptyRender={emptyRender}
      isEmpty={isEmpty}
    >
      {item &&
        (item.isEnum ? (
          <Enum
            name={item.name}
            moduleName={item.moduleName}
            force={item.force}
          >
            {({ type, description }) => (
              <StateTag
                type={type}
                {...Object.assign(
                  {},
                  omit(item, ["name", "isEnum", "moduleName", "force"])
                )}
                text={description}
              />
            )}
          </Enum>
        ) : (
          <StateTag {...Object.assign({}, item)} />
        ))}
    </ColItem>
  );
};
// init:80px min:64px max:200px
const avatar = (item, { emptyRender, isEmpty, ...props }) => {
  return (
    <ColItem
      {...props}
      type="avatar"
      item={item}
      emptyRender={emptyRender}
      isEmpty={isEmpty}
    >
      <Image.Avatar {...Object.assign({}, item)} size={32} />
    </ColItem>
  );
};
// init:70px min:70px max:400px
const singleRow = (
  item,
  { hover, primary, ellipsis, emptyRender, isEmpty, ...props }
) => {
  return (
    <ColItem
      {...props}
      type="single-row"
      item={item}
      hover={hover}
      primary={primary}
      emptyRender={emptyRender}
      isEmpty={isEmpty}
    >
      <Ellipsis ellipsis={ellipsis}>{item}</Ellipsis>
    </ColItem>
  );
};
// init:80px min:80px max:400px
const hideInfo = (item, props) => {
  return <HideInfoComponent api={item} {...props} />;
};
// init:300px min:160px max:500px
const mainInfo = (
  item,
  { ellipsis, hover = true, primary = true, emptyRender, isEmpty, ...props }
) => {
  return (
    <ColItem
      {...props}
      type="main-info"
      item={item}
      hover={hover}
      primary={primary}
      emptyRender={emptyRender}
      isEmpty={isEmpty}
    >
      <Ellipsis ellipsis={ellipsis}>{item}</Ellipsis>
    </ColItem>
  );
};
// init:400px 160px 600px
const description = (
  item,
  { hover, primary, ellipsis, emptyRender, isEmpty, ...props }
) => {
  return (
    <ColItem
      {...props}
      type="description"
      item={item}
      hover={hover}
      primary={primary}
      emptyRender={emptyRender}
      isEmpty={isEmpty}
    >
      <Ellipsis ellipsis={ellipsis}>{item}</Ellipsis>
    </ColItem>
  );
};

// init:180px min:120px max:400px
const options = (item, { width }) => {
  return (
    <OptionsList
      className={classnames(columnsStyle["col-item"], columnsStyle["options"])}
      list={item}
      width={width}
    />
  );
};

const other = (
  item,
  { hover, primary, ellipsis, emptyRender, isEmpty, ...props }
) => {
  return (
    <ColItem
      {...props}
      type="other"
      item={item}
      hover={hover}
      primary={primary}
      emptyRender={emptyRender}
      isEmpty={isEmpty}
    >
      <Ellipsis ellipsis={ellipsis}>{item}</Ellipsis>
    </ColItem>
  );
};

const sensitiveInfo = (
  item,
  { hover, primary, ellipsis, emptyRender, isEmpty, ...props }
) => {
  return (
    <ColItem
      {...props}
      type="sensitiveInfo"
      item={item}
      hover={hover}
      primary={primary}
      emptyRender={emptyRender}
      isEmpty={isEmpty}
    >
      <Ellipsis ellipsis={ellipsis}>{item}</Ellipsis>
    </ColItem>
  );
};

const columnTypes = {
  date: {
    render: date,
    width: 160,
    min: 120,
    max: 400,
  },
  dateShort: {
    render: dateShort,
    width: 120,
    min: 100,
    max: 400,
  },
  dateRange: {
    render: dateRange,
    width: 240,
    min: 120,
    max: 400,
  },
  datetime: {
    render: datetime,
    width: 190,
    min: 190,
    max: 400,
  },
  serialNumber: {
    render: serialNumber,
    width: 190,
    min: 100,
    max: 400,
  },
  serialNumberShort: {
    render: serialNumberShort,
    width: 120,
    min: 100,
    max: 400,
  },
  user: {
    render: user,
    width: 200,
    min: 120,
    max: 400,
  },
  userName: {
    render: userName,
    width: 100,
    min: 100,
    max: 400,
  },
  contacts: {
    render: contacts,
    width: 240,
    min: 160,
    max: 400,
  },
  tag: {
    render: tag,
    width: 140,
    min: 100,
    max: 400,
  },
  avatar: {
    render: avatar,
    width: 80,
    min: 64,
    max: 200,
  },
  singleRow: {
    render: singleRow,
    width: 70,
    min: 70,
    max: 400,
  },
  hideInfo: {
    render: hideInfo,
    width: 120,
    min: 80,
    max: 400,
  },
  mainInfo: {
    render: mainInfo,
    width: 300,
    min: 160,
    max: 500,
  },
  description: {
    render: description,
    width: 400,
    min: 160,
    max: 600,
  },
  options: {
    render: options,
    width: 180,
    min: 120,
    max: 400,
  },
  sensitiveInfo: {
    render: sensitiveInfo,
    width: 200,
    min: 100,
    max: 400,
  },
  other: {
    render: other,
    width: 200,
    min: 120,
    max: 400,
  },
  otherSmall: {
    render: other,
    width: 100,
    min: 70,
    max: 400,
  },
  otherLarge: {
    render: other,
    width: 300,
    min: 120,
    max: 500,
  },
};

export default columnTypes;
