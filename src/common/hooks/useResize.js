import { useLayoutEffect, useRef } from "react";
import throttle from "lodash/throttle";
import debounce from "lodash/debounce";
import useRefCallback from "@kne/use-ref-callback";

const useResize = (callback, options) => {
  const optionsRef = useRef(null);
  optionsRef.current = Object.assign(
    {},
    { time: 500, isDebounce: false },
    options
  );
  const ref = useRef(null);
  const callbackHandler = useRefCallback(callback);
  useLayoutEffect(() => {
    const el = ref.current;
    const computed = () => {
      return window.requestAnimationFrame(() => {
        el && callbackHandler(el);
      });
    };
    computed();
    const resizeObserver = new ResizeObserver(
      (optionsRef.current.isDebounce ? debounce : throttle)(
        computed,
        optionsRef.current.time
      )
    );
    el && resizeObserver.observe(el);
    return () => {
      resizeObserver.disconnect();
    };
  }, [callbackHandler]);
  return ref;
};

export default useResize;
