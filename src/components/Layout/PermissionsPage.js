import Page from "./Page";
import Permissions from "@components/Permissions";

const PermissionsPage = ({ permissions, ...props }) => {
  return (
    <Permissions {...Object.assign({}, permissions, { type: "error" })}>
      <Page {...props} />
    </Permissions>
  );
};

export default PermissionsPage;
