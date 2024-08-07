import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import useRefCallback from "@kne/use-ref-callback";
import classnames from "classnames";
import columnTypes from "./columnTypes";
import get from "lodash/get";
import sumBy from "lodash/sumBy";
import transform from "lodash/transform";
import pick from "lodash/pick";
import { Col, Popover, Row } from "antd";
import Icon from "@components/Icon";
import { usePreset } from "@components/Global";
import { useFetch } from "@kne/react-fetch";
import ColumnsControlContent from "./ColumnsControlContent";
import { useDebouncedCallback } from "use-debounce";
import style from "./style.module.scss";
import isEqual from "lodash/isEqual";
import findLastIndex from "lodash/findLastIndex";
import tableLocalApis from "./tableLocalApis";

const TableConfig = ({ title, columns, config, setConfig }) => {
  const [open, setOpen] = useState(false);
  return (
    <Row wrap={false}>
      <Col flex={1}>{title}</Col>
      <Col>
        <Popover
          open={open}
          onOpenChange={setOpen}
          trigger="click"
          placement="bottomLeft"
          overlayClassName={style["columns-control-overlay"]}
          content={
            <ColumnsControlContent
              columns={columns}
              config={config}
              close={() => {
                setOpen(false);
              }}
              onConfirm={(newConfig) => {
                setConfig((config) => {
                  return transform(
                    newConfig,
                    (result, value, key) => {
                      result[key] = Object.assign(
                        {},
                        config[key],
                        pick(value, ["visible", "rank"])
                      );
                    },
                    {}
                  );
                });
              }}
            />
          }
        >
          <span className={style["table-changer-setting"]}>
            <Icon type="icon-shezhi" />
          </span>
        </Popover>
      </Col>
    </Row>
  );
};

const useTableConfig = ({
  columns,
  name,
  controllerOpen,
  tableWidth,
  rowKey,
}) => {
  const [currentMoveColumnIndex, setCurrentMoveColumnIndex] = useState(null);
  const currentMoveColumnIndexRef = useRef(currentMoveColumnIndex);
  currentMoveColumnIndexRef.current = currentMoveColumnIndex;
  const currentMoveColumnRef = useRef(null);
  const startPointRef = useRef(null);
  const [config, setConfigBase] = useState({});
  const { tableServerApis: presetTableServerApis } = usePreset();
  const tableServerApis = presetTableServerApis
    ? presetTableServerApis
    : tableLocalApis;

  const tablePageServerParams = tableServerApis?.getDataApi(name);

  const saveConfig = useDebouncedCallback((name, target) => {
    tableServerApis?.setDataFunc(name, target);
  }, 500);

  const setConfig = useRefCallback((newConfig) => {
    startTransition(() => {
      setConfigBase((config) => {
        const target =
          typeof newConfig === "function" ? newConfig(config) : newConfig;
        name && controllerOpen && saveConfig(name, target);
        return target;
      });
    });
  });

  const { send } = useFetch(
    Object.assign({
      ...Object.assign({}, tablePageServerParams),
      auto: false,
      cache: `TABLE_CONFIG_${name}`,
      isLocal: true,
      onRequestSuccess: (data) => {
        setConfigBase(Object.assign({}, data));
      },
    })
  );

  const getTableConfig = useRefCallback(() => {
    if (name && controllerOpen && tablePageServerParams) {
      send({ force: false });
    }
  });

  useEffect(() => {
    getTableConfig();
  }, [getTableConfig]);

  const visibleColumns = useMemo(() => {
    return columns
      .filter((col) => {
        return !(
          get(config, `${col.name}.visible`) === false ||
          (get(config, `${col.name}.visible`) !== true && col.hidden === true)
        );
      })
      .sort((a, b) => {
        const computedIndex = (item) => {
          return (
            get(config, `${item.name}.rank`, 0) +
            (item.fixed === "left" ? -10000 : 0) +
            (item.fixed === "right" ? 10000 : 0)
          );
        };
        return computedIndex(a) - computedIndex(b);
      });
  }, [columns, config]);

  const lastNotOptionsColumnIndex = useMemo(() => {
    return findLastIndex(visibleColumns, ({ type }) => type !== "options");
  }, [visibleColumns]);

  const totalWidth = useMemo(() => {
    return sumBy(
      visibleColumns,
      ({ type, name }) =>
        get(config, `${name}.width`) || columnTypes[type].width
    );
  }, [visibleColumns, config]);

  const computedRealWidth = ({ width, index }) => {
    return lastNotOptionsColumnIndex === index
      ? width + Math.max(tableWidth - totalWidth - 2, 0)
      : width;
  };

  const resizeBarRender = useRefCallback((column, index) => {
    return (
      <span
        className={classnames(style["cell-resize-bar"])}
        onMouseDown={(e) => {
          currentMoveColumnRef.current = Object.assign({}, column, { index });
          startPointRef.current = e.clientX;
          setCurrentMoveColumnIndex(index);
        }}
      >
        <Icon type="icon-paixu" />
      </span>
    );
  });

  const resize = useRefCallback((delta) => {
    if (currentMoveColumnIndex === null) {
      return;
    }
    if (!currentMoveColumnRef.current) {
      return;
    }
    const { name, width, min, max, index } = currentMoveColumnRef.current;
    const currentWidth = Math.min(Math.max(width + delta, min), max);
    if (currentWidth < computedRealWidth({ width: min, index })) {
      return;
    }
    setConfig((config) => {
      return Object.assign({}, config, {
        [name]: Object.assign({}, config[name], {
          width: currentWidth,
        }),
      });
    });
  });

  const computedColumnProps = useRefCallback((column, index) => {
    const { name, width, min, max } = column;
    let targetColumn = column;
    if (index === visibleColumns.length - 1) {
      targetColumn = Object.assign({}, column, {
        className: "has-config-btn",
        title: (
          <TableConfig
            title={column?.title}
            columns={columns}
            config={config}
            setConfig={setConfig}
          />
        ),
      });
    }

    const movingClass = () => {
      return {
        className: classnames({
          [style["is-moving"]]: currentMoveColumnIndexRef.current === index,
        }),
      };
    };
    const currentWidth = Math.min(
      Math.max(get(config, `${name}.width`) || width, min),
      max
    );

    const realWidth = computedRealWidth({ width: currentWidth, index });

    return Object.assign({}, targetColumn, {
      onHeaderCell: movingClass,
      onCell: movingClass,
      width: realWidth,
      shouldCellUpdate: (record, prevRecord) => {
        const itemKey =
          typeof rowKey === "function" ? rowKey(record) : record[rowKey];
        const prevItemKey =
          typeof rowKey === "function"
            ? rowKey(prevRecord)
            : prevRecord[rowKey];
        return (
          currentMoveColumnIndexRef.current === null ||
          currentMoveColumnIndexRef.current === index ||
          column.type === "hideInfo" ||
          !(
            itemKey === prevItemKey &&
            isEqual(record[column.name], prevRecord[column.name])
          )
        );
      },
      title: (
        <>
          {targetColumn.title}
          {!(realWidth > currentWidth && realWidth > max) &&
            resizeBarRender(
              Object.assign({}, targetColumn, { width: realWidth }),
              index
            )}
        </>
      ),
    });
  });

  useEffect(() => {
    const handlerCancelResize = () => {
      setCurrentMoveColumnIndex(null);
      startPointRef.current = null;
      currentMoveColumnRef.current = null;
    };

    const handlerResize = (e) => {
      if (
        currentMoveColumnIndexRef.current === null ||
        currentMoveColumnRef.current === null
      ) {
        return;
      }
      if (startPointRef.current === null) {
        startPointRef.current = e.clientX;
        return;
      }
      resize(e.clientX - startPointRef.current);
    };
    document.documentElement.addEventListener(
      "mouseup",
      handlerCancelResize,
      true
    );
    document.documentElement.addEventListener("mousemove", handlerResize, true);
    return () => {
      document.documentElement.removeEventListener(
        "mouseup",
        handlerCancelResize,
        true
      );
      document.documentElement.removeEventListener(
        "mousemove",
        handlerResize,
        true
      );
    };
  }, [resize]);

  return {
    visibleColumns,
    currentMoveColumnIndex,
    resizeBarRender,
    columnsConfig: config,
    totalWidth,
    computedColumnProps,
  };
};

export default useTableConfig;
