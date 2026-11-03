export {default as changeMoneyToChinese} from "@common/utils/changeMoneyToChinese";
export {default as getPopupContainer} from "@common/utils/getPopupContainer";
export * from "@common/utils/importantContainer";
export {default as withOSSFile} from "@common/hocs/withOSSFile";
export {default as ScrollLoader} from "@common/components/ScrollLoader";
export {FetchScrollLoader} from "@common/components/ScrollLoader";
export {default as FetchButton} from "@common/components/FetchButton";
export {default as SimpleBar} from "@common/components/SimpleBar";
export {default as SearchInput} from "@common/components/SearchInput";
export {
    default as withInputFile, InputFileText, InputFileLink, InputFileButton, useFileUpload,
} from "@common/hocs/withInputFile";
export {
    default as SuperSelectField, SuperSelectTableListField, SuperSelectUserField, SuperSelectTreeField,
    SuperSelectCascaderField,
} from "@common/components/SuperSelectField";

export {createTreeUtils} from "@kne/super-select";
export {default as TypeDateRangePickerField} from "@common/components/TypeDateRangePickerField";

export {default as useResize} from "@common/hooks/useResize";

export {
    MOBILE_BREAKPOINT,
    BREAKPOINTS,
    IS_MOBILE_QUERY,
    ResponsiveProvider,
    useIsMobile,
    useBreakpoint,
    useMediaQuery,
    usePopupMount,
    /** @deprecated 用 usePopupMount */
    usePopupContainer,
    useScrollElement,
    useResponsiveContext,
    RESPONSIVE_CONTAINER_CLASS,
    RESPONSIVE_BOUNDARY_CLASS,
    RESPONSIVE_SCROLL_CLASS
} from "@kne/responsive-utils";

export {default as accept} from "@common/utils/accept";
export {default as createDeferred} from "@common/utils/createDeferred";
export {default as isNotEmpty} from "@common/utils/isNotEmpty";
export {pxToNumber, numberToPx} from "@common/utils/px";
export {default as validateIDCard} from "@common/utils/validateIDCard";
