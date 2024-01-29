import { useState } from "react";
import { Button } from "antd";
import useRefCallback from "@kne/use-ref-callback";

export const useLoading = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const callbackHandler = useRefCallback((...args) => {
    setIsLoading(true);
    return Promise.resolve(callback && callback(...args)).then(() => {
      setIsLoading(false);
    });
  });
  return {
    isLoading,
    setIsLoading,
    callback: callbackHandler,
  };
};

const LoadingButton = ({ onClick, children, ...props }) => {
  const { isLoading, callback } = useLoading(onClick);
  return (
    <Button {...props} loading={isLoading} onClick={callback}>
      {typeof children === "function" ? children(isLoading) : children}
    </Button>
  );
};

export default LoadingButton;
