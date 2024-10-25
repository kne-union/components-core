import { useEffect } from "react";
import { useFetch } from "@kne/react-fetch";
import useRefCallback from "@kne/use-ref-callback";
import { Button } from "antd";

const FetchButton = ({ api, modalProps, modalFunc, onError, ...props }) => {
  const fetchApi = useFetch(Object.assign({}, api, { auto: false }));
  const { isLoading, data, error, refresh } = fetchApi;
  const errorHandler = useRefCallback(onError);
  const modalFuncHandler = useRefCallback(() => {
    const modalApi = modalFunc(
      typeof modalProps === "function"
        ? modalProps({
            data,
            fetchApi,
            close: () => {
              modalApi.close();
            },
          })
        : modalProps
    );
  });
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (error) {
      errorHandler(error);
      return;
    }
    if (!data) {
      return;
    }
    modalFuncHandler();
  }, [isLoading, error, data, modalFuncHandler, errorHandler]);
  return (
    <Button
      {...props}
      loading={isLoading}
      onClick={() => {
        refresh({
          onSuccess: () => {},
        });
      }}
    />
  );
};

FetchButton.defaultProps = {
  modalProps: {},
};

export default FetchButton;
