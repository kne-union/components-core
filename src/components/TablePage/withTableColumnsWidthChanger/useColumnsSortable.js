import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useRefCallback from "@kne/use-ref-callback";
import sum from "lodash/sum";
import isEqualWith from "lodash/isEqualWith";
import { getCache } from "@kne/react-fetch";
import { useDebouncedCallback } from "use-debounce";
import style from "../style.module.scss";
import cursorPng from "./cursor.png";
import { usePreset } from "@components/Global";
import classnames from "classnames";

const elementIsHeadTag = (target) => {
  if (
    target.tagName.toUpperCase() === "TH" &&
    [].indexOf.call(target.classList, "ant-table-cell") > -1 &&
    [].indexOf.call(target.classList, "ant-table-selection-column") === -1
  ) {
    return target;
  }
  if (target.parentElement === null || target.parentElement === document.body) {
    return false;
  }
  return elementIsHeadTag(target.parentElement);
};

const useColumnsSortable = ({ columns, setData, name, initColumnsData }) => {
  const ref = useRef(null);
  const nameRef = useRef(name);
  nameRef.current = name;
  const columnMap = useMemo(() => {
    return new Map(
      columns.map((item) => {
        return [item.key, item];
      })
    );
  }, [columns]);
  const columnMapRef = useRef(columnMap);
  columnMapRef.current = columnMap;
  const { tablePageServerApis } = usePreset();
  const setDataFunc = useDebouncedCallback(() => {
    const cache = getCache();
    cache.delByCacheName(`TABLE_CONFIG_${nameRef.current}`);
    if (tablePageServerApis && tablePageServerApis.setDataFunc) {
      tablePageServerApis.setDataFunc(nameRef.current, columnsSortable);
      setData(columnsSortable);
    }
  }, 1000);
  const [isActive, setIsActive] = useState(false);
  const isMoveRef = useRef(false);
  const moveColumnRef = useRef({ index: -1, width: 0 });
  const [sign, setSign] = useState({});
  const startPageXRef = useRef(0);
  const computedSortableState = useCallback(() => {
    return initColumnsData &&
      initColumnsData.length > 0 &&
      columns.length === initColumnsData.length &&
      isEqualWith(columns, initColumnsData, (a, b) => a.key === b.id)
      ? initColumnsData.map(({ id, width, hidden }) => ({
          id,
          width,
          hidden,
        }))
      : columns.map((item) => {
          return {
            id: item.key,
            hidden: item.hidden,
            width: item.width,
          };
        });
  }, [initColumnsData, columns]);

  useEffect(() => {
    setColumnsSortableState(computedSortableState());
  }, [computedSortableState]);

  const [columnsSortable, setColumnsSortableState] = useState(
    computedSortableState
  );

  const setColumnsSortable = useRefCallback((state) => {
    setColumnsSortableState(state);
    setDataFunc();
  });
  const columnsSortableRef = useRef(columnsSortable);
  const popupColumnsSortableRef = useRef(columnsSortable);
  columnsSortableRef.current = popupColumnsSortableRef.current =
    columnsSortable;

  const resetFormColumns = useRefCallback(() => {
    const newColumns = columns.map((item) => {
      return {
        id: item.key,
        hidden: item.hidden,
        width: item.width,
      };
    });
    popupColumnsSortableRef.current = newColumns;
    setColumnsSortable(newColumns);
  });

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const signWidth = 8;

    const handlerCancel = (e) => {
      const target = e.target;
      if (
        !isMoveRef.current &&
        !target.classList.contains("changer-sign") &&
        !elementIsHeadTag(target)
      ) {
        setIsActive(false);
      }
    };
    const handlerEnter = (e) => {
      const target = elementIsHeadTag(e.target) || e.target;
      const { left: baseLeft, top: baseTop } =
        ref.current.getBoundingClientRect();
      const { left, width, height } = target.getBoundingClientRect();
      const thead = ref.current.querySelector(".ant-table-thead");
      const top = thead.getBoundingClientRect().top;
      const ths = Array.from(thead.querySelectorAll("th"));
      const thsColumns = Array.from(
        thead.querySelectorAll("th:not(.ant-table-selection-column)")
      );
      if (
        !isMoveRef.current &&
        elementIsHeadTag(target) &&
        0 < e.pageX - left + signWidth
      ) {
        moveColumnRef.current = {
          index: thsColumns.indexOf(target),
          locationIndex: ths.indexOf(target),
          width,
          left,
          height,
        };
        setSign({
          left: left - baseLeft + width - signWidth,
          top: top - baseTop,
          height,
        });
        setIsActive(true);
      }
      if (
        !isMoveRef.current &&
        elementIsHeadTag(target) &&
        0 > e.pageX - left + signWidth
      ) {
        setIsActive(false);
      }
      if (isMoveRef.current && moveColumnRef.current.index > -1) {
        const delta = e.pageX - startPageXRef.current;
        const scrollLeft = (
          ref.current.querySelector(".ant-table-body") ||
          ref.current.querySelector(".ant-table-content")
        ).scrollLeft;
        const currentWidth = Math.max(delta + moveColumnRef.current.width, 100);
        setSign({
          left:
            Math.max(
              sum(
                ths
                  .slice(0, moveColumnRef.current.locationIndex)
                  .map((item) => item.clientWidth)
              ) - scrollLeft,
              0
            ) +
            currentWidth -
            signWidth,
          top: top - baseTop,
          height: moveColumnRef.current.height,
        });
        setColumnsSortable((list) => {
          const newList = list.slice(0);
          newList
            .filter(({ hidden }) => hidden !== true)
            .forEach((item, index) => {
              item.width =
                moveColumnRef.current.index === index
                  ? currentWidth
                  : thsColumns[index]?.clientWidth || 100;
            });
          return newList;
        });
      }
    };

    const handlerUp = () => {
      document.body.style.cursor = "unset";
      isMoveRef.current = false;
      moveColumnRef.current = { index: -1, width: 0 };
      setIsActive(false);
    };

    ref.current.addEventListener("mousemove", handlerEnter, true);
    window.addEventListener("mouseup", handlerUp);
    document.addEventListener("mousemove", handlerCancel, true);
    return () => {
      document.removeEventListener("mousemove", handlerCancel, true);
      window.removeEventListener("mouseup", handlerUp);
    };
  }, [resetFormColumns, setColumnsSortable]);

  return {
    ref,
    sign: isActive && (
      <div
        className={classnames(style["width-changer-sign"], "changer-sign")}
        style={{
          top: sign.top,
          left: sign.left,
          height: sign.height,
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          isMoveRef.current = true;
          startPageXRef.current = e.pageX;
          document.body.style.cursor = `url(${cursorPng}) 12 10,col-resize`;
        }}
      />
    ),
    targetColumns: columnsSortable
      .filter(({ hidden }) => hidden !== true)
      .map(({ id, width }) => {
        return Object.assign({}, columnMap.get(id), { width, ellipsis: false });
      }),
    popupColumns: popupColumnsSortableRef.current,
    columnMap: columnMapRef.current,
    setColumns: (newColumns) => {
      popupColumnsSortableRef.current = newColumns;
    },
    onConfirm: () => {
      setColumnsSortable(popupColumnsSortableRef.current);
    },
    onCancel: () => {
      popupColumnsSortableRef.current = columnsSortableRef.current;
    },
    onReset: () => {
      resetFormColumns();
    },
  };
};

export default useColumnsSortable;
