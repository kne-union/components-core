import StateBar from "@components/StateBar";
import PermissionsPage from "./PermissionsPage";
import style from "./style.module.scss";
import HelperGuide from "@components/HelperGuide";

const StateBarPage = ({
  helperGuideName,
  permissions,
  page,
  stateBar,
  children,
  ...props
}) => {
  return (
    <PermissionsPage {...page} permissions={permissions} {...props}>
      <div className={style["state-bar-page"]}>
        <StateBar {...stateBar} />
      </div>
      {helperGuideName && (
        <HelperGuide className={style["helper-guide"]} name={helperGuideName} />
      )}
      {children}
    </PermissionsPage>
  );
};

export default StateBarPage;
