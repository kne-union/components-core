import { withFetch } from "@kne/react-fetch";
import {
  FormattedMessage as IntlFormattedMessage,
  IntlProvider as ReactIntlProvider,
  useIntl as useReactIntl,
} from "react-intl";
import { useGlobalContext } from "@components/Global";
import { forwardRef, useCallback } from "react";
import merge from "lodash/merge";
import transform from "lodash/transform";
import get from "lodash/get";

const InnerProvider = withFetch(({ children, data: messages, locale }) => {
  return (
    <ReactIntlProvider locale={locale} messages={messages}>
      {children}
    </ReactIntlProvider>
  );
});

export const IntlProvider = ({
  locale: baseLocale,
  importMessages,
  moduleName,
  children,
}) => {
  const {
    global: { localMessageRef, locale },
  } = useGlobalContext();
  const currentLocale = baseLocale || locale || "zh-CN";
  return (
    <InnerProvider
      locale={currentLocale}
      params={{ locale: currentLocale }}
      loader={({ params }) => {
        const { locale } = params;
        return Promise.resolve(importMessages(locale)).then(
          ({ default: localMessages }) => {
            const currentMessages = merge(
              {},
              localMessageRef.current,
              transform(localMessages, (results, value, key) => {
                results[`${moduleName}_${key}`] = value;
              })
            );
            localMessageRef.current = currentMessages;
            return currentMessages;
          }
        );
      }}
    >
      {children}
    </InnerProvider>
  );
};

IntlProvider.defaultProps = {
  moduleName: "Global",
  importMessages: () => ({}),
};

export const FormattedMessage = ({ id, moduleName, children, ...props }) => {
  const moduleId = `${moduleName}_${id}`;
  if (typeof children === "function") {
    return (
      <IntlFormattedMessage {...props} id={moduleId}>
        {(text) => {
          return children(text && text.join(""));
        }}
      </IntlFormattedMessage>
    );
  }
  return <IntlFormattedMessage {...props} id={moduleId} />;
};

FormattedMessage.defaultProps = {
  moduleName: "Global",
};

export const useIntl = (props) => {
  let moduleName = get(props, "moduleName") || "Global";
  const { formatMessage } = useReactIntl();
  const formatModuleMessage = useCallback(
    (props, values) => {
      props.id = `${moduleName}_${props.id}`;
      return formatMessage(props, values);
    },
    [moduleName, formatMessage]
  );
  return {
    formatMessage: formatModuleMessage,
  };
};

export const createWithIntl =
  ({ importMessages, moduleName }) =>
  (WrappedComponent) =>
    forwardRef((props, ref) => (
      <IntlProvider importMessages={importMessages} moduleName={moduleName}>
        <WrappedComponent {...props} ref={ref} />
      </IntlProvider>
    ));

export default FormattedMessage;
