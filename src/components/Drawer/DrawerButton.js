import { useDrawer } from "./Drawer";
import FetchButton from "@common/components/FetchButton";

const DrawerButton = (props) => {
  const drawer = useDrawer();
  return <FetchButton {...props} modalFunc={drawer} />;
};

export default DrawerButton;
