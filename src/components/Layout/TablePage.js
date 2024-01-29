import { TablePage as Table } from "@components/Table";
import PermissionsPage from "./PermissionsPage";
import { forwardRef, useState } from "react";
import style from "./style.module.scss";
import HelperGuide from "@components/HelperGuide";
import classnames from "classnames";

const TablePage = forwardRef(
  (
    {
      helperGuideName,
      permissions,
      page,
      openFeatures,
      name,
      topArea,
      ...props
    },
    ref
  ) => {
    const [tableData, setTableData] = useState(null);
    return (
      <PermissionsPage
        name={name}
        openFeatures={openFeatures}
        permissions={permissions}
        {...page}
      >
        {topArea ? (
          <div className={style["table-page-top"]}>
            {typeof topArea === "function" ? topArea(tableData) : topArea}
          </div>
        ) : null}
        <div className={style["table-page"]}>
          {helperGuideName && (
            <HelperGuide
              className={classnames("helper-guide", style["helper-guide"])}
              name={helperGuideName}
            />
          )}
          <Table
            {...props}
            ref={ref}
            name={name}
            onRequestSuccess={(data) => {
              setTableData(data);
            }}
          />
        </div>
      </PermissionsPage>
    );
  }
);

export default TablePage;
