import useColumnsSortable from "./useColumnsSortable";
import classnames from "classnames";
import withTableColumnsData from "./withTableColumnsData";
import compose from "@kne/compose";
import style from "../style.module.scss";

const withTableColumnsWidthChanger = (WrappedComponent) => {
  return ({ name, controllerOpen, columns, data, setData, ...props }) => {
    const { ref, targetColumns, sign } = useColumnsSortable({
      columns,
      name,
      initColumnsData: data,
      setData,
    });
    if (!controllerOpen) {
      return (
        <WrappedComponent
          columns={columns}
          controllerOpen={controllerOpen}
          originColumns={columns}
          name={name}
          {...props}
        />
      );
    }
    return (
      <div
        className={classnames(
          style["width-changer"],
          "table-page-columns-width-changer"
        )}
        ref={ref}
      >
        <WrappedComponent
          {...props}
          name={name}
          controllerOpen={controllerOpen}
          originColumns={columns}
          tableColumnFetchApi={{
            data,
            setData,
          }}
          columns={targetColumns}
        />
        {sign}
      </div>
    );
  };
};

export default compose(withTableColumnsData, withTableColumnsWidthChanger);
