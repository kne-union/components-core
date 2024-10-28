import { forwardRef } from "react";
import Fetch from "@kne/react-fetch";
import { useGlobalContext } from "@components/Global";

const localeCache = new Map();

const createWithLocale =
  ({ moduleName, importMessages }) =>
  (WrappedComponent) =>
    forwardRef((props, ref) => {
      const { global: locale } = useGlobalContext("locale");
      const currentLocale = locale || "zh-CN";
      return (
        <Fetch
          params={{ locale: currentLocale }}
          loader={({ params }) => {
            const { locale } = params;
            const key = `${moduleName}_${locale}`;
            if (localeCache.has(key)) {
              return localeCache.get(key);
            }
            return Promise.resolve(importMessages(locale)).then(
              ({ default: localMessages }) => {
                localeCache.set(key, localMessages);
                return localMessages;
              }
            );
          }}
          render={({ data: messages }) => {
            return <WrappedComponent {...props} locale={messages} ref={ref} />;
          }}
        />
      );
    });

export default createWithLocale;
