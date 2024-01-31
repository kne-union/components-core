import { useMemo } from "react";
import { withFetch } from "@kne/react-fetch";
import get from "lodash/get";
import usePreset from "@common/hooks/usePreset";

const dataEnumCache = new Map();

const DataEnumInner = withFetch(
  ({ data, name, type, cache, children, getLabel, ...props }) => {
    const mapping = useMemo(() => {
      return new Map(
        data.map((item) => [
          item.code,
          {
            ...item,
            id: item.code,
            label: getLabel ? getLabel(item) : item.chName,
            parentId: item.parentCode || null,
          },
        ])
      );
    }, [data, getLabel]);
    const output = mapping.get(name);
    dataEnumCache.set(`${name}_${type}`, output);
    return children(output, props);
  }
);

export const DataEnum = (props) => {
  const { locale } = usePreset();

  const key = `${locale}_${props.name}_${props.type}`;
  const cache = dataEnumCache.get(key);
  if (cache && !props.force) {
    return props.children(cache);
  }
  return <DataEnumInner {...props} />;
};

DataEnum.defaultProps = {
  children: (item) => {
    return get(item, "label", "");
  },
};

export default DataEnum;
