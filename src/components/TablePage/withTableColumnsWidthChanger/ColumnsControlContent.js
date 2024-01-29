import { useMemo, useState } from "react";
import groupBy from "lodash/groupBy";
import Icon from "@components/Icon";
import LoadingButton from "@components/LoadingButton";
import { SearchInput } from "@components/Common";
import style from "../style.module.scss";
import { Button, Checkbox, Col, Collapse, List, Row, Tooltip } from "antd";
import { ReactSortable } from "react-sortablejs";
import classnames from "classnames";

const { Panel } = Collapse;

const ColumnsControlContent = ({
  close,
  onCancel,
  onConfirm,
  onReset,
  columns,
  setColumns,
}) => {
  const [activeColumns, setActiveColumns] = useState(columns);
  const [searchText, setSearchText] = useState("");
  const { leftFixedColumns, rightFixedColumns, visibleColumns, hiddenColumns } =
    useMemo(() => {
      return Object.assign(
        {
          leftFixedColumns: [],
          rightFixedColumns: [],
          visibleColumns: [],
          hiddenColumns: [],
        },
        groupBy(activeColumns, (item) => {
          if (item.fixed === "right") {
            return "rightFixedColumns";
          }
          if (item.fixed === true || item.fixed === "left") {
            return "leftFixedColumns";
          }
          return item.hidden ? "hiddenColumns" : "visibleColumns";
        })
      );
    }, [activeColumns]);

  const handlerColumnsChange = (columns) => {
    setActiveColumns(columns);
    setColumns(columns);
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
                  onReset && (await onReset());
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
          <Panel header="显示的信息" key="active">
            <List className={style["columns-control-content-list"]}>
              {leftFixedColumns.map((item) => (
                <List.Item
                  className={style["columns-control-content-item"]}
                  key={item.id}
                >
                  <Checkbox checked disabled>
                    {item.name}
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
                  handlerColumnsChange([
                    ...leftFixedColumns,
                    ...visibleColumns,
                    ...hiddenColumns,
                    ...rightFixedColumns,
                  ]);
                }}
                animation={300}
                delayOnTouchStart
                delay={2}
              >
                {visibleColumns.map((item) => (
                  <List.Item
                    className={classnames(
                      style["columns-control-content-item"],
                      style["is-drag"]
                    )}
                    key={item.id}
                  >
                    <Icon
                      type="icon-paixu"
                      className={style["columns-control-content-item-icon"]}
                    />
                    <Checkbox
                      checked
                      disabled={item.fixed}
                      onChange={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const index = activeColumns.indexOf(item);
                        const newActiveColumns = activeColumns.slice(0);
                        newActiveColumns[index] = Object.assign(
                          {},
                          newActiveColumns[index],
                          { hidden: true }
                        );
                        handlerColumnsChange(newActiveColumns);
                      }}
                    >
                      {item.name}
                    </Checkbox>
                  </List.Item>
                ))}
              </ReactSortable>
              {rightFixedColumns.map((item) => (
                <List.Item
                  className={style["columns-control-content-item"]}
                  key={item.id}
                >
                  <Checkbox checked disabled>
                    {item.name}
                  </Checkbox>
                </List.Item>
              ))}
            </List>
          </Panel>
          <Panel
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
            key="un-active"
          >
            <List
              dataSource={hiddenColumns.filter(
                (item) =>
                  typeof item.name === "string" &&
                  item.name.indexOf(searchText) > -1
              )}
              renderItem={(item) => {
                return (
                  <List.Item
                    className={style["columns-control-content-item"]}
                    key={item.id}
                  >
                    <Checkbox
                      checked={false}
                      onChange={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const index = activeColumns.indexOf(item);
                        const newActiveColumns = activeColumns.slice(0);
                        newActiveColumns[index] = Object.assign(
                          {},
                          newActiveColumns[index],
                          {
                            hidden: false,
                            width: newActiveColumns[index].width || 200,
                          }
                        );
                        handlerColumnsChange(newActiveColumns);
                      }}
                    >
                      {item.name}
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
              onCancel && onCancel();
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
              onConfirm && (await onConfirm());
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
