import useControlValue from "@kne/use-control-value";
import Icon from "@components/Icon";
import classnames from "classnames";
import clone from "lodash/clone";
import { useCallback, useMemo } from "react";
import style from "./style.module.scss";

const sortArrayToMap = (sort) =>
  new Map(
    (sort || []).map(({ name, sort }) => {
      return [name, sort];
    })
  );

const useSort = (props) => {
  const [sort, setSort] = useControlValue(props, {
    value: "sort",
    defaultValue: "defaultSort",
    onChange: "onSortChange",
  });

  const mapSort = useMemo(() => {
    return sortArrayToMap(sort);
  }, [sort]);

  const setMapSort = useCallback(
    (callback) => {
      return setSort((sort) => {
        const newSort = callback(sortArrayToMap(sort));
        return Array.from(newSort).map(([name, sort]) => ({ name, sort }));
      });
    },
    [setSort]
  );

  return useCallback(
    ({ single, name }) => (
      <div
        className={classnames(style["sort-btn"], {
          [style["sort-active-desc"]]: mapSort.get(name) === "DESC",
          [style["sort-active-asc"]]: mapSort.get(name) === "ASC",
        })}
        onClick={() => {
          setMapSort((sort) => {
            const current = sort.get(name);
            const targetValue = (() => {
              if (current === "DESC") {
                return "ASC";
              }
              if (current === "ASC") {
                return null;
              }
              return "DESC";
            })();
            if (single) {
              return new Map(targetValue ? [[name, targetValue]] : []);
            }
            const newSort = clone(sort);
            targetValue ? newSort.set(name, targetValue) : newSort.delete(name);
            return newSort;
          });
        }}
      >
        <Icon type="icon-triangle-up" className={style["sort-icon"]} />
        <Icon type="icon-triangle-down" className={style["sort-icon"]} />
      </div>
    ),
    [mapSort, setMapSort]
  );
};

export default useSort;
