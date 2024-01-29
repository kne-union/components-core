import { createContext, useContext as useReactContext } from "react";

export const context = createContext({});

export const { Provider } = context;

export const useContext = () => useReactContext(context);
