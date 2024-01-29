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

const defaultIndustryData = () => {
  return import("./industry.json").then((module) =>
    module["__esModule"] ? module.default : module
  );
};

const industryDefaultApi = {
  cache: "INDUSTRY_DATA",
  isLocal: true,
  ttl: 1000 * 60 * 60 * 24,
  loader: defaultIndustryData,
};

const IndustrySelectField = ({ apis: currentApis, ...props }) => {
  const { apis: apisBase, locale } = usePreset();
  const apis = Object.assign(
    {},
    { industryData: industryDefaultApi },
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
                data
                  .filter((item) => item.code !== "000")
                  .map((item) => {
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
        apis.industryData
      )}
    />
  );
};

IndustrySelectField.defaultProps = {
  overlayWidth: "635px",
};

const Enum = ({ apis: currentApis, ...props }) => {
  const { apis: apisBase, locale } = usePreset();
  const apis = Object.assign(
    {},
    { industryData: industryDefaultApi },
    apisBase?.staticData,
    currentApis
  );
  return (
    <DataEnum
      {...props}
      {...apis.industryData}
      type="function"
      getLabel={(item) => getLabelForLocal(item, locale)}
      transformData={({ data }) => data}
    />
  );
};

IndustrySelectField.Enum = Enum;
export default IndustrySelectField;
