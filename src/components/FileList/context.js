import { createContext, useContext as useReactContext } from "react";

const context = createContext({});
export const { Provider } = context;

export const useContext = () => {
  return useReactContext(context);
};

export default context;
