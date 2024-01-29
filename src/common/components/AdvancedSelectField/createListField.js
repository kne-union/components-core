import SelectInnerInput from "@common/components/SelectInnerInput";
import commonStyle from "@common/components/SelectInnerInput/common.module.scss";
import ScrollLoader from "@common/components/ScrollLoader";
import classnames from "classnames";
import get from "lodash/get";
import merge from "lodash/merge";
import style from "./create-list.module.scss";
import SearchInput from "@common/components/SearchInput";
import { Col, Row } from "antd";

const useSelectInnerContext = SelectInnerInput.useContext;

const createListField = ({ renderList, defaultProps }) => {
  const ListInner = ({ value, setValue }) => {
    const { fetchApi, searchText, setSearchText, props, mapping } =
      useSelectInnerContext();
    const pagination = Object.assign(
      {},
      {
        paramsType: "data",
        current: "currentPage",
        pageSizeName: "perPage",
        pageSize: 20,
      },
      props.pagination
    );
    const current = get(
        fetchApi.requestParams,
        [pagination.paramsType, pagination.current],
        1
      ),
      pageSize =
        get(fetchApi.requestParams, [
          pagination.paramsType,
          pagination.pageSizeName,
        ]) || pagination.pageSize;

    const formatData = props.dataFormat(fetchApi.data);
    const { right, leftBottom, leftSpan = 24 } = props;
    return (
      <Row wrap={false} className={right ? style["is-not-full"] : ""}>
        <Col
          span={leftSpan}
          className={classnames(style["left"], "advance-select-left")}
        >
          {props.getSearchProps ? (
            <SearchInput
              isPopup={props.isPopup}
              className={classnames(
                style["search-input"],
                commonStyle["search-input"],
                {
                  [commonStyle["is-popup"]]: props.isPopup,
                }
              )}
              placeholder={props.searchPlaceholder}
              value={searchText}
              onSearch={(value) => {
                fetchApi.reload(props.getSearchProps(value));
                setSearchText(value);
              }}
            />
          ) : null}
          <ScrollLoader
            completeTips=""
            isLoading={!fetchApi.isComplete}
            className={classnames(style["scroll-loader"], {
              [style["is-popup"]]: props.isPopup,
            })}
            noMore={!formatData.total || current * pageSize >= formatData.total}
            onLoader={async () => {
              console.log("on loader");
              await fetchApi.loadMore(
                merge(
                  {
                    [pagination.paramsType]: {
                      [pagination.pageSizeName]: pageSize,
                      [pagination.current]: current + 1,
                    },
                  },
                  props.getSearchProps && props.getSearchProps(searchText)
                ),
                props.mergeList
              );
            }}
          >
            {renderList({
              props,
              value,
              setValue,
              list: formatData.list,
              itemIsSelected: (item) => value.indexOf(item.value) > -1,
              onSelect: (item) => {
                if (props.single) {
                  setValue([item.value]);
                  return;
                }

                const newValue = value.slice(0);
                const index = newValue.indexOf(item.value);
                if (index > -1) {
                  newValue.splice(index, 1);
                } else {
                  newValue.push(item.value);
                }
                setValue(newValue);
              },
            })}
          </ScrollLoader>
          {leftBottom &&
            leftBottom({
              fetchApi,
              value,
              mapping,
            })}
        </Col>
        {right &&
          right({
            value,
            mapping,
            fetchApi,
          })}
      </Row>
    );
  };

  const ListField = ({ extra, ...props }) => {
    return (
      <SelectInnerInput {...props} extra={extra}>
        {({ value, setValue }) => {
          return <ListInner value={value} setValue={setValue} />;
        }}
      </SelectInnerInput>
    );
  };

  ListField.defaultProps = Object.assign(
    {},
    {
      isPopup: true,
      searchPlaceholder: "搜索",
      pagination: {},
      mergeList: (data, newData) => {
        return Object.assign({}, newData, {
          pageData: data.pageData.concat(newData.pageData),
        });
      },
      dataFormat: (data) => {
        return {
          list: data.pageData,
          total: data.totalCount,
        };
      },
    },
    defaultProps
  );

  return ListField;
};

export default createListField;
