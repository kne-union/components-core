import SelectInnerInput from "@common/components/SelectInnerInput";
import commonStyle from "@common/components/SelectInnerInput/common.module.scss";
import { Col, Divider, Input, List, Menu, Row, Space, Tabs, Tag } from "antd";
import usePreset from "@common/hooks/usePreset";
import classnames from "classnames";
import Icon from "@components/Icon";
import { useMemo, useState } from "react";
import SimpleBarBox from "@common/components/SimpleBarBox";
import cloneDeep from "lodash/cloneDeep";
import memoize from "lodash/memoize";
import get from "lodash/get";
import style from "./style.module.scss";
import { withFetch } from "@kne/react-fetch";
import importMessages from "./locale";
import { IntlProvider, FormattedMessage, useIntl } from "@components/Intl";

const useSelectInnerContext = SelectInnerInput.useContext;

const createAddressApi = ({ city, province, country }) => {
  const getSearchList = memoize(() => {
    const list = [];
    ["gangaotai", "municipality"].forEach((name) => {
      list.push(...city.relations[name]);
    });
    ["provinces", "continents"].forEach((name) => {
      city.relations[name].forEach((id) => {
        list.push(id);
        list.push(...city.relations[id]);
      });
    });

    return list.map((id) => {
      return city.list[id];
    });
  });

  return {
    getCity: memoize((id) => {
      const item = city.list[id];
      if (!item) {
        return {
          city: null,
          parent: null,
        };
      }
      return {
        city: item,
        parent: item.parentCode ? city.list[item.parentCode] : null,
      };
    }),
    getChinaHotCities: memoize(() => {
      return city.relations["2"].map((id) => city.list[id]);
    }),
    getChinaCities: memoize(() => {
      return [
        "2",
        ...province.relations.municipality,
        ...province.relations.provinces,
        "gangaotai",
      ].map((id) => Object.assign({ id }, city.list[id]));
    }),
    getCountries: memoize(() => {
      return ["1", ...country.relations.continents].map((id) =>
        Object.assign({ id }, country.list[id])
      );
    }),
    getList: memoize((pid, options) => {
      const { showChinaQuan, showForeignQuan } = Object.assign({}, options);
      if (pid === "gangaotai") {
        return province.relations["gangaotai"].map((id) => city.list[id]);
      }
      const current = Object.assign({}, city.list[pid]);
      if (province.relations.municipality.indexOf(pid) > -1) {
        current.name = `${showChinaQuan ? "全" : ""}` + current.name;

        return [current];
      }

      const list = city.relations[pid].map((id) => city.list[id]);
      if (province.relations.provinces.indexOf(pid) > -1 && showChinaQuan) {
        current.name = `全` + current.name;
        list.splice(0, 0, current);
      }
      if (country.relations.continents.indexOf(pid) > -1 && showForeignQuan) {
        current.name = `全` + current.name;
        list.splice(0, 0, current);
      }
      return list;
    }),
    getNationalityList: memoize((pid) => {
      let _city = cloneDeep(city);
      if (pid === "1") {
        _city.relations["1"].unshift("410");
      }
      if (pid === "350") {
        _city.relations["350"].unshift("410");
      }
      return _city.relations[pid]
        .filter((id) => _city.list[id])
        .map((id) => _city.list[id]);
    }),
    getCityByName: memoize((name) => {
      const searchList = getSearchList();
      let item;
      [
        (item) => item.name === name,
        (item) => item.name === name.replace(/(省|市)$/, ""),
        (item) => name.indexOf(item.name) === 0,
      ].find((func) => {
        item = searchList.find(func);
        return item;
      });
      return item;
    }),
    combineCities: memoize((currentId, list) => {
      return [
        ...list.filter((item) => {
          return (
            city.list[item].parentCode !== currentId &&
            city.list[currentId].parentCode !== item &&
            currentId !== item
          );
        }),
        currentId,
      ];
    }),
    searchCities: memoize((value) => {
      if (!value) {
        return [];
      }
      const searchList = getSearchList();
      return searchList
        .filter((item) => {
          return ["pinyin", "name", "enName", "spelling"].some((name) => {
            return item[name].toUpperCase().indexOf(value.toUpperCase()) > -1;
          });
        })
        .map((item) => {
          const parent = item.parentCode ? city.list[item.parentCode] : null;
          return {
            label: parent ? `${parent.name}·${item.name}` : item.name,
            value: item.code,
          };
        });
    }),
  };
};

const getLabelForLocal = (item, locale) => {
  if (locale === "en-US") {
    return get(item, "enName");
  }
  return get(item, "name");
};

const addressDefaultApi = {
  cache: "CITY_DATA",
  isLocal: true,
  ttl: 1000 * 60 * 60 * 24,
  loader: () => {
    return import("./city.json").then((module) =>
      module["__esModule"] ? module.default : module
    );
  },
};

const AddressInner = ({ value, setValue }) => {
  const { fetchApi, props } = useSelectInnerContext();
  const [searchText, setSearchText] = useState("");
  const [menuKey, setMenuKey] = useState("2");
  const { formatMessage } = useIntl({ moduleName: "AddressSelect" });
  const { locale } = usePreset();

  const { getCity, getChinaCities, getCountries, getList, searchCities } =
    useMemo(() => createAddressApi(fetchApi.data), [fetchApi.data]);
  const onSelect = (code) => {
    if (props.single) {
      setValue([code]);
      return;
    }

    const newValue = value.slice(0);
    const index = newValue.indexOf(code);
    if (index > -1) {
      newValue.splice(index, 1);
    } else {
      newValue.push(code);
    }
    setValue(newValue);
  };
  const searchInner = searchText && (
    <SimpleBarBox className={style["scroll-plus-box"]}>
      <List
        className={commonStyle["list"]}
        size="small"
        dataSource={searchCities(searchText)}
        rowKey="value"
        renderItem={(item) => (
          <List.Item
            className={commonStyle["list-item"]}
            onClick={() => {
              onSelect(item.value);
              setSearchText("");
            }}
          >
            <span className={commonStyle["item-label"]}>{item.label}</span>
          </List.Item>
        )}
      />
    </SimpleBarBox>
  );
  return (
    <div
      className={classnames(style["address"], {
        [style["is-popup"]]: props.isPopup,
      })}
    >
      <Input.Search
        className={classnames(commonStyle["search-input"], {
          [commonStyle["is-popup"]]: props.isPopup,
        })}
        placeholder={
          props.searchPlaceholder || formatMessage({ id: "searchCity" })
        }
        prefix={<Icon type="icon-sousuo" />}
        enterButton={<Icon type="icon-sousuo" />}
        value={searchText}
        allowClear
        onChange={(e) => {
          const value = e.target.value;
          setSearchText(value);
        }}
        onSearch={(value) => {
          setSearchText(value);
        }}
      />
      <div className={style["content"]}>
        {searchInner || (
          <Row wrap={false}>
            <Col className={style["col-left"]}>
              <Tabs
                centered
                onChange={(activeKey) => {
                  setMenuKey(activeKey);
                }}
                items={[
                  {
                    key: "2",
                    label: (
                      <FormattedMessage
                        id="domestic"
                        moduleName="AddressSelect"
                        defaultMessage="国内"
                      />
                    ),
                    children: (
                      <SimpleBarBox className={style["scroll-box"]}>
                        <Menu
                          selectedKeys={[menuKey]}
                          onSelect={(item) => {
                            setMenuKey(item.key);
                          }}
                          items={getChinaCities().map((item) => ({
                            label: getLabelForLocal(item, locale),
                            key: item.id,
                          }))}
                        />
                      </SimpleBarBox>
                    ),
                  },
                  {
                    key: "1",
                    label: (
                      <FormattedMessage
                        id="abroad"
                        moduleName="AddressSelect"
                        defaultMessage="国外"
                      />
                    ),
                    children: (
                      <SimpleBarBox className={style["scroll-box"]}>
                        <Menu
                          selectedKeys={[menuKey]}
                          onSelect={(item) => {
                            setMenuKey(item.key);
                          }}
                          items={getCountries().map((item) => ({
                            label: getLabelForLocal(item, locale),
                            key: item.id,
                          }))}
                        />
                      </SimpleBarBox>
                    ),
                  },
                ]}
              />
            </Col>
            <Col flex={1} className={style["col-right"]}>
              <Divider className={style["title"]} orientation="left">
                {getLabelForLocal(getCity(menuKey).city, locale)}
              </Divider>
              <SimpleBarBox className={style["scroll-box"]}>
                <Space wrap>
                  {getList(menuKey, {
                    showChinaQuan: props.showChinaQuan,
                    showForeignQuan: props.showForeignQuan,
                  }).map((item) => (
                    <Tag.CheckableTag
                      checked={value.indexOf(item.code) > -1}
                      onChange={() => {
                        onSelect(item.code);
                      }}
                      key={item.code}
                    >
                      {getLabelForLocal(item, locale)}
                    </Tag.CheckableTag>
                  ))}
                </Space>
              </SimpleBarBox>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

const AddressSelectField = (props) => {
  return (
    <SelectInnerInput {...props}>
      {({ value, setValue }) => {
        return (
          <IntlProvider
            moduleName="AddressSelect"
            importMessages={importMessages}
          >
            <AddressInner value={value} setValue={setValue} />
          </IntlProvider>
        );
      }}
    </SelectInnerInput>
  );
};

AddressSelectField.defaultProps = {
  overlayWidth: "500px",
  isPopup: true,
  api: addressDefaultApi,
  dataFormat: ({ city }, options) => {
    const { locale } = Object.assign({}, options);
    return {
      list: Object.values(city.list).map((item) => {
        return Object.assign({}, item, {
          value: item.code,
          label: getLabelForLocal(item, locale),
        });
      }),
    };
  },
};

const AddressEnum = withFetch(({ name, data, children, ...props }) => {
  const { locale } = usePreset();
  const { getCity } = useMemo(() => createAddressApi(data), [data]);
  return children(getCity(name), Object.assign({}, props, { locale }));
});

AddressEnum.defaultProps = {
  ...addressDefaultApi,
  displayParent: false,
  children: ({ city, parent }, { displayParent, locale }) => {
    if (displayParent) {
      return parent
        ? `${getLabelForLocal(parent, locale)}·${getLabelForLocal(
            city,
            locale
          )}`
        : getLabelForLocal(city, locale);
    }
    return getLabelForLocal(city, locale);
  },
};

const withAddressApi = (WrappedComponent) => {
  const AddressApi = withFetch(({ data, ...props }) => {
    const addressApi = useMemo(() => createAddressApi(data), [data]);
    return <WrappedComponent {...props} addressApi={addressApi} />;
  });
  AddressApi.defaultProps = {
    ...addressDefaultApi,
  };
  return AddressApi;
};

AddressSelectField.AddressEnum = AddressSelectField.Enum = AddressEnum;
AddressSelectField.createAddressApi = createAddressApi;
AddressSelectField.withAddressApi = withAddressApi;
AddressSelectField.getLabelForLocal = getLabelForLocal;

export default AddressSelectField;
export { AddressEnum, createAddressApi, withAddressApi, getLabelForLocal };
