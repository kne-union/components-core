import {
  createContext as createReactContext,
  useContext as useReactContext,
} from "react";

const createContext = (initValue = {}) => {
  const context = createReactContext(initValue);
  const { Provider, Consumer } = context;
  const useContext = () => useReactContext(context);

  return { context, Provider, Consumer, useContext };
};

export default createContext;
