import { useMemo, useState } from "react";
import groupBy from "lodash/groupBy";
import Icon from "@components/Icon";
import LoadingButton from "@components/LoadingButton";
import { SearchInput } from "@components/Common";
import style from "./style.module.scss";
import { Button, Checkbox, Col, Collapse, List, Row, Tooltip } from "antd";
import { ReactSortable } from "react-sortablejs";
import classnames from "classnames";
import transform from "lodash/transform";
import get from "lodash/get";
import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";

const { Panel } = Collapse;

const ColumnsControlContent = ({
  close,
  onConfirm,
  columns,
  config: defaultValue,
}) => {
  const [config, onChange] = useState(defaultValue || {});

  const [searchText, setSearchText] = useState("");
  const { leftFixedColumns, rightFixedColumns, visibleColumns, hiddenColumns } =
    useMemo(() => {
      return transform(
        Object.assign(
          {
            leftFixedColumns: [],
            rightFixedColumns: [],
            visibleColumns: [],
            hiddenColumns: [],
          },
          groupBy(columns, (item) => {
            if (item.fixed === "right") {
              return "rightFixedColumns";
            }
            if (item.fixed === true || item.fixed === "left") {
              return "leftFixedColumns";
            }
            return (get(config, `${item.name}.visible`) !== true &&
              item.hidden) ||
              get(config, `${item.name}.visible`) === false
              ? "hiddenColumns"
              : "visibleColumns";
          })
        ),
        (result, value, key) => {
          result[key] = value.sort((a, b) => {
            return (
              get(config, `${a.name}.rank`, 0) -
              get(config, `${b.name}.rank`, 0)
            );
          });
        },
        {}
      );
    }, [columns, config]);

  const handlerColumnsChange = (columns) => {
    const newConfig = cloneDeep(config);
    const columnsList = [].concat(
      columns.leftFixedColumns,
      columns.visibleColumns,
      columns.rightFixedColumns
    );
    (columns.hiddenColumns || []).forEach((col) => {
      set(newConfig, `${col.name}.visible`, false);
    });
    columnsList.forEach((col, index) => {
      set(newConfig, `${col.name}.rank`, index + 1);
    });
    onChange(newConfig);
  };

  const renderColumn = (item) => {
    return (
      <>
        {item.titleText || item.title || "未命名列"}
        {item.groupHeader && item.groupHeader.length > 0
          ? `(${item.groupHeader.map(({ title }) => title).join("-")})`
          : ""}
      </>
    );
  };

  return (
    <div className={style["columns-control-content"]}>
      <div className={style["columns-control-content-title"]}>
        <Row align="middle" justify="space-between">
          <Col>编辑表格</Col>
          <Col>
            <Tooltip title="恢复默认">
              <LoadingButton
                type="text"
                icon={<Icon type="icon-huifumorenshezhi" />}
                onClick={async () => {
                  onConfirm && (await onConfirm({}));
                  close();
                }}
              />
            </Tooltip>
          </Col>
        </Row>
      </div>
      <div className={style["columns-control-content-scroller"]}>
        <Collapse
          defaultActiveKey={["active", "un-active"]}
          ghost={true}
          bordered
        >
          <Panel key="active" header="显示的信息">
            <List className={style["columns-control-content-list"]}>
              {leftFixedColumns.map((item, index) => (
                <List.Item
                  className={style["columns-control-content-item"]}
                  key={item.name || `left-${index}`}
                >
                  <Checkbox checked disabled>
                    {renderColumn(item)}
                  </Checkbox>
                </List.Item>
              ))}
              <ReactSortable
                list={visibleColumns}
                filter=".ignore-elements"
                dragClass={style["sortable-drag"]}
                ghostClass={style["sortable-ghost"]}
                forceFallback
                setList={(visibleColumns) => {
                  handlerColumnsChange({
                    leftFixedColumns,
                    visibleColumns,
                    hiddenColumns,
                    rightFixedColumns,
                  });
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
                    key={item.name || `visible-${index}`}
                  >
                    <Icon
                      type="icon-paixu"
                      className={style["columns-control-content-item-icon"]}
                    />
                    <Checkbox
                      checked
                      disabled={
                        item.fixed ||
                        leftFixedColumns.length +
                          visibleColumns.length +
                          rightFixedColumns.length <=
                          1
                      }
                      onChange={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const newConfig = Object.assign({}, config);
                        newConfig[item.name] = Object.assign(
                          {},
                          newConfig[item.name],
                          { visible: false }
                        );
                        onChange(newConfig);
                      }}
                    >
                      {renderColumn(item)}
                    </Checkbox>
                  </List.Item>
                ))}
              </ReactSortable>
              {rightFixedColumns.map((item, index) => (
                <List.Item
                  className={style["columns-control-content-item"]}
                  key={item.name || `right-${index}`}
                >
                  <Checkbox checked disabled>
                    {item.titleText || item.title || "未命名列"}
                  </Checkbox>
                </List.Item>
              ))}
            </List>
          </Panel>
          <Panel
            key="un-active"
            header={
              <Row wrap={false} justify="space-between">
                <Col>隐藏的信息</Col>
                <Col
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <SearchInput
                    prefix={<Icon type="icon-sousuo" size={12} />}
                    placeholder="搜索"
                    onSearch={(value) => {
                      setSearchText(value);
                    }}
                    className={style["columns-control-content-input"]}
                    size="small"
                  />
                </Col>
              </Row>
            }
          >
            <List
              dataSource={hiddenColumns.filter(
                (item) =>
                  typeof (item.titleText || item.title) === "string" &&
                  (item.titleText || item.title).indexOf(searchText) > -1
              )}
              renderItem={(item) => {
                return (
                  <List.Item
                    className={style["columns-control-content-item"]}
                    key={item.key}
                  >
                    <Checkbox
                      checked={false}
                      onChange={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const newConfig = Object.assign({}, config);
                        newConfig[item.name] = Object.assign(
                          {},
                          newConfig[item.name],
                          { visible: true }
                        );
                        onChange(newConfig);
                      }}
                    >
                      {item.titleText || item.title || "未命名列"}
                    </Checkbox>
                  </List.Item>
                );
              }}
            />
          </Panel>
        </Collapse>
      </div>
      <Row
        className={style["columns-control-content-footer"]}
        justify="end"
        gutter={10}
      >
        <Col>
          <Button
            size="small"
            onClick={() => {
              onChange(defaultValue || {});
              close();
            }}
          >
            取消
          </Button>
        </Col>
        <Col>
          <LoadingButton
            type="primary"
            size="small"
            onClick={async () => {
              onConfirm && (await onConfirm(config));
              close();
            }}
          >
            确定
          </LoadingButton>
        </Col>
      </Row>
    </div>
  );
};

export default ColumnsControlContent;
