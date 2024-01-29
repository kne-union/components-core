import { createContext, useContext, useMemo } from "react";
import useDrawer from "./useDrawer";

const context = createContext({});
const { Provider } = context;

const useAppDrawer = () => useContext(context);

const AppDrawer = (props) => {
  const { children } = props;
  const [DrawerApi, DrawerContextHolder] = useDrawer();
  const memoizedContextValue = useMemo(
    () => ({
      drawer: DrawerApi,
    }),
    [DrawerApi]
  );
  return (
    <Provider value={memoizedContextValue}>
      <div>
        {DrawerContextHolder}
        {children}
      </div>
    </Provider>
  );
};

AppDrawer.useAppDrawer = useAppDrawer;

export default AppDrawer;
