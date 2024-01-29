import {
  createRef,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import usePatchElement from "./usePatchElement";
import HookDrawer from "./HookDrawer";

let uuid = 0;

function withConfirm(props) {
  return {
    ...props,
  };
}

const destroyFns = [];

const ElementsHolder = memo(
  forwardRef((props, ref) => {
    const [elements, patchElement] = usePatchElement();
    useImperativeHandle(
      ref,
      () => ({
        patchElement,
      }),
      [patchElement]
    );
    return <>{elements}</>;
  })
);

function useDrawer() {
  const holderRef = useRef(null);
  const [actionQueue, setActionQueue] = useState([]);
  useEffect(() => {
    if (actionQueue.length) {
      const cloneQueue = [...actionQueue];
      cloneQueue.forEach((action) => {
        action();
      });
      setActionQueue([]);
    }
  }, [actionQueue]);

  const getConfirmFunc = useCallback(
    (withFunc) =>
      function hookConfirm(config) {
        uuid += 1;

        const drawerRef = createRef();

        let closeFunc = () => {};
        const drawer = (
          <HookDrawer
            key={`drawer-${uuid}`}
            config={withFunc(config)}
            ref={drawerRef}
            afterClose={() => {
              closeFunc?.();
            }}
          />
        );

        closeFunc = holderRef.current?.patchElement(drawer);

        if (closeFunc) {
          destroyFns.push(closeFunc);
        }

        return {
          destroy: () => {
            function destroyAction() {
              drawerRef.current?.destroy();
            }

            if (drawerRef.current) {
              destroyAction();
            } else {
              setActionQueue((prev) => [...prev, destroyAction]);
            }
          },
          update: (newConfig) => {
            function updateAction() {
              drawerRef.current?.update(newConfig);
            }

            if (drawerRef.current) {
              updateAction();
            } else {
              setActionQueue((prev) => [...prev, updateAction]);
            }
          },
        };
      },
    []
  );

  const fns = useMemo(() => getConfirmFunc(withConfirm), [getConfirmFunc]);

  return [fns, <ElementsHolder key="drawer-holder" ref={holderRef} />];
}

export default useDrawer;
