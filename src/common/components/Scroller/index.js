import {createPortal} from "react-dom";
import {useEffect, useRef, useState} from "react";
import useRefCallback from "@kne/use-ref-callback";
import classnames from "classnames";
import {getScrollEl} from '../../utils/importantContainer';
import style from "./style.module.scss";

const ScrollBar = ({onScroll, getContainer, ...scrollerProps}) => {
    const startRef = useRef(0);
    const [moving, setMoving] = useState(false);
    const movingRef = useRef(moving);
    movingRef.current = moving;
    const onScrollRef = useRef(onScroll);
    onScrollRef.current = onScroll;
    const ratioRef = useRef(1);
    ratioRef.current = scrollerProps.width / scrollerProps.innerWidth;

    useEffect(() => {
        const moveHandler = (e) => {
            movingRef.current && onScrollRef.current(ratioRef.current * (e.clientX - startRef.current));
            startRef.current = e.clientX;
        };
        const upHandler = () => {
            setMoving(false);
        };
        document.addEventListener("mousemove", moveHandler, true);
        document.addEventListener("mouseup", upHandler, true);
        return () => {
            document.removeEventListener("mousemove", moveHandler, true);
            document.removeEventListener("mouseup", upHandler, true);
        };
    }, []);
    return createPortal(scrollerProps.hasScroller ? (<div
        className={style["scroller"]}
        style={{
            left: scrollerProps.left, width: scrollerProps.width, height: 15, //scrollerProps.height
        }}
    >
        <div
            className={classnames(style["scroller-inner"], {
                [style["is-moving"]]: moving,
            })}
            style={{
                width: scrollerProps.innerWidth, left: scrollerProps.innerLeft,
            }}
            onMouseDown={(e) => {
                e.preventDefault();
                startRef.current = e.clientX;
                setMoving(true);
            }}
        />
    </div>) : null, getContainer() || document.body);
};

const Scroller = ({
                      className, scroller = true, getScrollTarget = getScrollEl, children
                  }) => {
    const [scrollerProps, setScrollerProps] = useState({
        left: 0, width: 0, innerLeft: 0, innerWidth: 0, height: 0, hasScroller: false,
    });
    const ref = useRef(null);
    const getScrollEl = useRefCallback(() => {
        return ref.current && getScrollTarget(ref.current);
    });
    const getContainer = useRef();

    getContainer.current = typeof scroller === "object" && typeof scroller.getContainer === "function" ? scroller.getContainer : () => null;
    useEffect(() => {
        const container = getContainer.current() || document.documentElement;
        let scrollEl;
        const computed = () => {
            if (!scrollEl) {
                return;
            }
            const {left, width, top, height} = scrollEl.getBoundingClientRect();
            const scrollerHeight = scrollEl.offsetHeight - scrollEl.clientHeight || 15;
            const innerWidth = (width * scrollEl.clientWidth) / scrollEl.scrollWidth - 6;
            const innerLeft = (scrollEl.scrollLeft * scrollEl.clientWidth) / scrollEl.scrollWidth + 2;
            const containerRect = container.getBoundingClientRect();
            //console.log(endRef.current.vi);
            setScrollerProps((props) => {
                return Object.assign({}, props, {
                    left,
                    width,
                    innerLeft,
                    innerWidth,
                    height: scrollerHeight,
                    hasScroller: scrollEl.scrollWidth - scrollEl.clientWidth > 0 && (container === document.documentElement ? top + height - container.offsetHeight > 0 && top < container.offsetHeight : top < containerRect.top + containerRect.height && top + height > containerRect.top + containerRect.height),
                });
            });
        };
        const resizeObserver = new ResizeObserver(computed);
        const refResizeObserver = new ResizeObserver(() => {
            scrollEl = getScrollEl();
            if (!scrollEl) {
                return;
            }
            resizeObserver.disconnect();
            computed();
            Array.from(scrollEl.children).forEach((item) => {
                resizeObserver.observe(item);
            });
            scrollEl.addEventListener("scroll", computed);
        });

        refResizeObserver.observe(ref.current);

        window.addEventListener("scroll", computed);
        container.addEventListener("scroll", computed);
        return () => {
            window.removeEventListener("scroll", computed);
            container.removeEventListener("scroll", computed);
        };
    }, [getScrollEl]);
    if (!scroller) {
        return children;
    }
    return (<div
        className={classnames(style["scroller-outer"], className)}
        ref={ref}
        style={{
            "--scroller-bar-height": scrollerProps?.hasScroller ? "15px" : "0px",
        }}
    >
        {children}
        <ScrollBar
            {...scrollerProps}
            getContainer={getContainer.current}
            onScroll={(x) => {
                const scrollEl = getScrollEl();
                scrollEl.scrollLeft += x;
            }}
        />
    </div>);
};

export default Scroller;
