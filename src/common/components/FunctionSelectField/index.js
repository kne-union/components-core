import CascaderField, {
  createTreeUtils,
  DataEnum,
} from "@common/components/CascaderField";
import usePreset from "@common/hooks/usePreset";
import get from "lodash/get";

const getLabelForLocal = (item, locale) => {
  if (locale === "en-US") {
    return get(item, "enName");
  }
  return get(item, "chName");
};

const defaultFunctionData = () => {
  return import("./function.json").then((module) =>
    module["__esModule"] ? module.default : module
  );
};

const functionDefaultApi = {
  cache: "FUNCTION_DATA",
  isLocal: true,
  ttl: 1000 * 60 * 60 * 24,
  loader: defaultFunctionData,
};

const FunctionSelectField = ({ apis: currentApis, ...props }) => {
  const { apis: apisBase, locale } = usePreset();
  const apis = Object.assign(
    {},
    { functionData: functionDefaultApi },
    apisBase?.staticData,
    currentApis
  );
  return (
    <CascaderField
      {...props}
      api={Object.assign(
        {},
        {
          transformData: ({ data }) => {
            const { treeData } = createTreeUtils(
              new Map(
                data.map((item) => {
                  return [
                    item.code,
                    {
                      ...item,
                      id: item.code,
                      label: getLabelForLocal(item, locale),
                      parentId: item.parentCode || null,
                    },
                  ];
                })
              )
            );
            return treeData;
          },
        },
        apis.functionData
      )}
    />
  );
};

FunctionSelectField.defaultProps = {
  overlayWidth: "640px",
  getSearchProps: (searchText) => {
    return { data: { searchText } };
  },
};

FunctionSelectField.defaultData = defaultFunctionData;

const Enum = ({ apis: currentApis, ...props }) => {
  const { apis: apisBase, locale } = usePreset();
  const apis = Object.assign(
    {},
    { functionData: functionDefaultApi },
    apisBase?.staticData,
    currentApis
  );
  return (
    <DataEnum
      {...props}
      {...apis.functionData}
      type="function"
      getLabel={(item) => getLabelForLocal(item, locale)}
      transformData={({ data }) => data}
    />
  );
};

FunctionSelectField.Enum = Enum;

export default FunctionSelectField;
