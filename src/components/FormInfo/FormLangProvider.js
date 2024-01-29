import { createContext, useContext } from "react";

const context = createContext([]);

export const { Provider, Consumer } = context;

export const useFormLang = () => {
  return useContext(context);
};

export default Provider;
