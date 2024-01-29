import { useContext } from "@components/Layout/context";
import { useLayoutEffect, useRef } from "react";

const useContainerHeight = ({ targetKey }) => {
  const { setPageProps } = useContext();
  const ref = useRef(null);
  useLayoutEffect(() => {
    const callback = () => {
      setPageProps({
        [targetKey]: ref.current.offsetHeight,
      });
    };

    callback();
    const resizeObserver = new MutationObserver(callback);
    resizeObserver.observe(ref.current, { subtree: true, childList: true });
    return () => {
      resizeObserver.disconnect();
    };
  }, [setPageProps, targetKey]);

  return ref;
};

const ContainerHeight = ({ targetKey, ...props }) => {
  const ref = useContainerHeight({ targetKey });
  return <div {...props} ref={ref} />;
};

export default ContainerHeight;
