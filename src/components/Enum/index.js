import { useRef } from "react";
import { withFetch } from "@kne/react-fetch";
import { useGlobalContext, usePreset } from "@components/Global";
import memoize from "lodash/memoize";
import isNil from "lodash/isNil";

const baseLoaders = [
  [
    "gender",
    () => [
      { value: "M", description: "男" },
      {
        value: "F",
        description: "女",
      },
    ],
  ],
  [
    "marital",
    () => [
      { description: "已婚", value: "Y" },
      {
        description: "未婚",
        value: "N",
      },
    ],
  ],
  [
    "confirm",
    () => [
      { description: "是", value: "Y" },
      {
        description: "否",
        value: "N",
      },
    ],
  ],
  [
    "political",
    () => [
      { description: "中共党员", value: "中共党员" },
      {
        description: "共青团员",
        value: "共青团员",
      },
      { description: "群众", value: "群众" },
      {
        description: "其他党派",
        value: "其他党派",
      },
    ],
  ],
  [
    "phoneStateEnum",
    () => [
      {
        value: 0,
        description: "空号",
      },
      {
        value: 1,
        description: "实号",
      },
      {
        value: 2,
        description: "停机",
      },
      {
        value: 3,
        description: "库无",
      },
      {
        value: 4,
        description: "沉默号",
      },
      {
        value: 5,
        description: "风险号",
      },
    ],
  ],
  [
    "degreeEnum",
    () => [
      {
        description: "初中",
        value: 10,
      },
      {
        description: "中专",
        value: 20,
      },
      {
        description: "高中",
        value: 30,
      },
      {
        description: "大专",
        value: 40,
      },
      {
        description: "本科",
        value: 50,
      },
      {
        description: "硕士研究生",
        value: 60,
      },
      {
        description: "博士研究生",
        value: 70,
      },
      {
        description: "博士后",
        value: 75,
      },
      {
        description: "学历不限",
        value: 999,
      },
    ],
  ],
];

const EnumLoaderFetch = withFetch(({ data, children }) => {
  return typeof children === "function"
    ? children(data)
    : children || data?.description;
});

const getEnumsMap = memoize((enums) => {
  return new Map(
    baseLoaders.concat(
      Object.keys(Object.assign({}, enums)).map((key) => [key, enums[key]])
    )
  );
});

const EnumLoader = ({ loader: enumsLoader, ...props }) => {
  const {
    global: { enumsRef },
  } = useGlobalContext();
  const prevLocaleRef = useRef(null);
  return (
    <EnumLoaderFetch
      {...props}
      loader={async (...args) => {
        const enums = getEnumsMap(await enumsLoader(...args));
        const { params } = args[0];
        const { moduleName, name, force, locale } = params;

        const getEnumMap = async (moduleName) => {
          return (
            (() => {
              return (
                force !== true &&
                prevLocaleRef.current === locale &&
                enumsRef.current.get(moduleName)
              );
            })() ||
            (await (async () => {
              const loader = enums.get(moduleName);
              const output = await (async () => {
                if (typeof loader === "function") {
                  return new Map(
                    (await loader({ locale })).map((item) => {
                      return [item.value.toString(), item];
                    })
                  );
                }
                if (Array.isArray(loader)) {
                  return new Map(
                    loader.map((item) => [item.value.toString(), item])
                  );
                }
                if (typeof loader === "object") {
                  return new Map(
                    Object.keys(loader).map((key) => [
                      key.toString(),
                      loader[key],
                    ])
                  );
                }
                console.warn("枚举值loader的设置可能不正确");
                return new Map();
              })();
              enumsRef.current.set(moduleName, output);
              prevLocaleRef.current = locale;
              return output;
            })())
          );
        };
        if (Array.isArray(moduleName)) {
          return await Promise.all(
            moduleName.map((target) =>
              getEnumMap(target).then((enumMap) => Array.from(enumMap.values()))
            )
          );
        }

        const enumMap = await getEnumMap(moduleName);
        if (!isNil(name)) {
          return enumMap.get(name.toString());
        }
        return Array.from(enumMap.values());
      }}
    />
  );
};

const Enum = ({ moduleName, name, force, children, ...props }) => {
  const preset = usePreset();
  return (
    <EnumLoader
      {...props}
      params={{
        moduleName,
        locale: preset?.locale,
        enums: preset?.enums,
        name,
        force,
      }}
      loader={({ params }) => params.enums}
    >
      {children}
    </EnumLoader>
  );
};

Enum.defaultProps = {
  force: false,
};

export default Enum;
