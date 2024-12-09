//这个已经废弃可能会在之后删除，请勿使用

import { useEffect, useImperativeHandle, useRef } from "react";
import SimpleBar from "simplebar";
import useRefCallback from "@kne/use-ref-callback";

const SimpleBarBox = (
  { children, onScroll, options, onReady, ...props },
  forwardedRef
) => {
  const ref = useRef(null);
  const scrollerRef = useRef(null);
  const optionRef = useRef(options);
  const onReadyRef = useRefCallback(onReady);
  const scrollCallback = useRefCallback(onScroll);
  useImperativeHandle(forwardedRef, () => {
    return scrollerRef.current;
  });
  useEffect(() => {
    const simpleBar = new SimpleBar(ref.current, optionRef.current);
    scrollerRef.current = simpleBar.getScrollElement();
    scrollerRef.current.addEventListener("scroll", scrollCallback);
    onReadyRef(scrollerRef.current);
    return () => {
      scrollerRef.current.removeEventListener("scroll", scrollCallback);
    };
  }, [scrollCallback, onReadyRef, children]);
  return (
    <div {...props} ref={ref}>
      {children}
    </div>
  );
};

export default SimpleBarBox;
