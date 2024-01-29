import { useGlobalContext as useContext } from "@kne/global-context";
import get from "lodash/get";

const usePreset = () => {
  const contextValue = useContext();
  return get(contextValue, "preset", { apis: {} });
};

export default usePreset;
