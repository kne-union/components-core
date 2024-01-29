import importMessages from "./locale";
import { IntlProvider, FormattedMessage } from "@components/Intl";
import style from "./style.module.scss";
import {
  useMemo,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { groupBy, pick, union } from "lodash";
import classnames from "classnames";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  List,
  Row,
  Space,
  message,
} from "antd";
import { useModal } from "@components/Modal";
import Icon from "@components/Icon";
import { ReactSortable } from "react-sortablejs";
import omit from "lodash/omit";
import { downloadBlobFile } from "@components/File";
import { getCache, withFetch } from "@kne/react-fetch";
import { usePreset } from "@components/Global";
import LoadingButton from "@components/LoadingButton";
import Features from "@components/Features";
import get from "lodash/get";

const GroupItem = ({ groupName, list, selected, onChange }) => {
  const isCheckedAll = useMemo(() => {
    return list.every((x) => selected.some((it) => it === x.name));
  }, [list, selected]);
  return (
    <>
      <Row gutter={[24, 12]} justify="space-between">
        <Col className={style["right-title"]}>{groupName}</Col>
        <Col>
          <Checkbox
            checked={isCheckedAll}
            onChange={(e) => {
              const newSelected = e.target.checked
                ? union(
                    selected.slice(0),
                    list.map((item) => item.name)
                  )
                : selected
                    .slice(0)
                    .filter((x) => !list.some((it) => it.name === x));
              onChange(newSelected);
            }}
          >
            <FormattedMessage
              id="selectedAll"
              moduleName="ExportTable"
              defaultMessage="全选"
            />
          </Checkbox>
        </Col>
        <Col span={24}>
          <Space
            className={classnames("full-space")}
            wrap={true}
            size={[24, 12]}
          >
            {(list || []).map((item) => {
              return (
                <Checkbox
                  key={item.name}
                  checked={selected.some((x) => x === item.name)}
                  onChange={(e) => {
                    let newSelected = selected.slice(0);
                    if (e.target.checked) {
                      newSelected.push(item.name);
                    } else {
                      newSelected = newSelected.filter((x) => x !== item.name);
                    }
                    onChange(newSelected);
                  }}
                >
                  {item.titleText || item.title || "未命名列"}
                </Checkbox>
              );
            })}
          </Space>
        </Col>
      </Row>
    </>
  );
};

const RightOptions = ({ options, children }) => {
  if (!options) {
    return children;
  }
  return (
    <Row wrap={false}>
      <Col flex={1} className={style["left-options-col"]}>
        {children}
      </Col>
      <Col className={style["right-options-col"]}>{options}</Col>
    </Row>
  );
};

const ExportTableInner = forwardRef(({ columns, data }, ref) => {
  const [selectedColumns, setSelectColumns] = useState(() => {
    const columnsData = Array.isArray(data) ? data : JSON.parse(data) || [];
    return Array.isArray(columnsData) &&
      (columnsData || []).filter((x) => !!x).length > 0
      ? columnsData.filter((x) => !!x)
      : columns
          .filter(
            (x) =>
              (x.hasOwnProperty("exportHidden") && x.exportHidden !== true) ||
              x.hidden !== true
          )
          .map((x) => x.name);
  });
  const allColumns = useMemo(() => {
    const all = groupBy(columns, (item) => item.groupName);
    return all;
  }, [columns]);
  const visibleColumns = useMemo(() => {
    const columnsMap = new Map(columns.map((item) => [item.name, item]));
    return (selectedColumns || [])
      .filter((name) => columns.some((x) => x.name === name))
      .map((name) => {
        const item = columnsMap.get(name);
        return item;
      });
  }, [columns, selectedColumns]);
  useImperativeHandle(
    ref,
    () => {
      return { data: selectedColumns };
    },
    [selectedColumns]
  );
  return (
    <IntlProvider importMessages={importMessages} moduleName="ExportTable">
      <RightOptions
        options={
          <div>
            <div className={style["right-header"]}>
              <div className={style["right-title"]}>
                <FormattedMessage
                  id="rightTitle"
                  moduleName="ExportTable"
                  defaultMessage="已选的字段"
                />
                ：
              </div>
              <div className={style["right-desc"]}>
                <FormattedMessage
                  id="rightDesc"
                  moduleName="ExportTable"
                  defaultMessage="按住拖拽可进行排序"
                />
              </div>
            </div>
            <ReactSortable
              selectedColumns={selectedColumns}
              list={visibleColumns}
              filter=".ignore-elements"
              dragClass={style["sortable-drag"]}
              ghostClass={style["sortable-ghost"]}
              forceFallback
              setList={(columns) => {
                const list = columns.map((item) => item.name);
                setTimeout(() => {
                  setSelectColumns([...list]);
                }, 50);
              }}
              animation={300}
              delayOnTouchStart
              delay={2}
            >
              {visibleColumns.map((item, index) => (
                <List.Item
                  className={classnames(
                    style["columns-control-content-item"],
                    style["is-drag"]
                  )}
                  key={item.name + index}
                >
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ flex: 1 }}
                  >
                    <Col>
                      <Space size={2}>
                        <Icon
                          type="icon-paixu"
                          className={classnames(
                            style["move-icon"],
                            "move-icon"
                          )}
                        />
                        <span>
                          {item.titleText || item.title || "未命名列"}
                        </span>
                      </Space>
                    </Col>
                    <Col
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        let newSelected = selectedColumns.slice(0);
                        newSelected = newSelected.filter(
                          (x) => x !== item.name
                        );
                        setTimeout(() => {
                          setSelectColumns([...newSelected]);
                        }, 50);
                      }}
                    >
                      <Icon
                        type="icon-close-thin"
                        className={classnames(
                          style["close-icon"],
                          "close-icon"
                        )}
                      />
                    </Col>
                  </Row>
                </List.Item>
              ))}
            </ReactSortable>
          </div>
        }
      >
        <Space
          className={classnames("full-space")}
          direction="vertical"
          split={<Divider className={style["divider"]} />}
        >
          {Object.keys(allColumns).map((groupName, index) => {
            return (
              <GroupItem
                key={groupName + index}
                selected={selectedColumns}
                groupName={groupName}
                list={allColumns[groupName]}
                onChange={(list) => {
                  setSelectColumns(list);
                }}
              />
            );
          })}
        </Space>
      </RightOptions>
    </IntlProvider>
  );
});

ExportTableInner.defaultProps = {
  columns: [],
};

const withExportTableColumnsData = (WrappedComponent) => {
  const FetchWrappedComponent = withFetch(WrappedComponent);
  return (props) => {
    const { name, getDataApi } = props;
    const { exportTableServerApis } = usePreset();
    const _getDataApi =
      getDataApi || (exportTableServerApis && exportTableServerApis.getDataApi);
    if (name && exportTableServerApis && exportTableServerApis.getDataApi) {
      // isLocal cache={`EXPORT_TABLE_CONFIG_${name}`} ttl={24 * 60 * 60 * 1000}
      return (
        <FetchWrappedComponent
          {...props}
          {..._getDataApi(name)}
          error={<WrappedComponent {...props} />}
        />
      );
    }
    return <WrappedComponent {...props} />;
  };
};

export const withExportTable = (WrappedComponent) => {
  return (props) => {
    const tableProps = omit(props, ["onClick"]);
    const tableRef = useRef(null);
    const { name, saveDataApi, featureId } = props;
    const { exportTableServerApis } = usePreset();
    const _saveDataApi =
      saveDataApi ||
      (exportTableServerApis && exportTableServerApis.saveDataApi);
    const modal = useModal();
    return (
      <WrappedComponent
        onClick={async () => {
          props.onClick && props.onClick();
          let columns =
            typeof props.columns === "function"
              ? await props.columns()
              : props.columns;
          columns = columns.filter((x) => x.exportHidden !== true);
          const renderFeatureConfig = ({ children }) => {
            return featureId ? (
              <Features id={featureId}>{children}</Features>
            ) : (
              children({})
            );
          };
          const Component = withExportTableColumnsData((props) => {
            return renderFeatureConfig({
              children: ({ options }) => {
                columns = columns.filter((item) => {
                  if (!Array.isArray(get(options, "hiddenColumns"))) {
                    return true;
                  }
                  return options.hiddenColumns.indexOf(item.name) === -1;
                });
                return (
                  <ExportTableInner
                    {...props}
                    {...tableProps}
                    columns={columns}
                    ref={tableRef}
                  />
                );
              },
            });
          });
          modal({
            title: props.title || "导出数据",
            ...tableProps,
            className: style["right-options-modal"],
            footer: () => {
              return (
                <Space size={4} className={style["modal-footer-tip"]}>
                  <Icon type={"icon-xinxi-miaobian"} />
                  <span>导出后，系统会自动保存您本次选择的字段及排序</span>
                </Space>
              );
            },
            footerButtons: [
              {
                children: "取消",
              },
              {
                type: "primary",
                children: "导出",
                onClick: async () => {
                  if (tableRef.current?.data.length === 0) {
                    message.error(props.selectedTip || "请选择要导出的字段");
                    return false;
                  }
                  const saveResult = _saveDataApi
                    ? await _saveDataApi({
                        name,
                        data: tableRef.current.data,
                      })
                    : true;
                  if (saveResult !== false) {
                    const cache = getCache();
                    cache.delByCacheName(`EXPORT_TABLE_CONFIG_${name}`);
                    const result = props.onExport
                      ? await props.onExport({
                          data: tableRef.current.data,
                          downloadBlobFile,
                        })
                      : true;
                    return result !== false;
                  }
                  return saveResult !== false;
                },
              },
            ],
            children: <Component {...pick(props, ["name", "getDataApi"])} />,
          });
        }}
      />
    );
  };
};

const ExportButton = (props) => {
  return (
    <IntlProvider importMessages={importMessages} moduleName="ExportTable">
      <Button {...props} size="small">
        {props.actionText || (
          <FormattedMessage
            id="actionText"
            moduleName="ExportTable"
            defaultMessage="导出数据"
          />
        )}
      </Button>
    </IntlProvider>
  );
};

const ExportTable = withExportTable(ExportButton);

export default ExportTable;
