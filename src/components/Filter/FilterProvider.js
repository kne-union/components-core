import {Provider} from "./context";
import useControlValue from "@kne/use-control-value";
import clone from "lodash/clone";
import {useMemo} from "react";
import {isNotEmpty} from "@components/Common";
import importMessages from "./locale";

import {IntlProvider} from "@components/Intl";

const FilterOuter = ({children, className, defaultValue = [], ...props}) => {
    const [valueBase, onChange] = useControlValue(props);

    const value = useMemo(() => {
        return valueBase.filter((item) => isNotEmpty(item.value));
    }, [valueBase]);

    const filterValue = useMemo(() => {
        return new Map(value.map((item) => [item.name, item]));
    }, [value]);

    return (
        <IntlProvider moduleName="Filter" importMessages={importMessages}>
            <Provider
                value={{
                    value: filterValue,
                    onChange: (item) => {
                        const newFilterValue = clone(filterValue);
                        item.value
                            ? newFilterValue.set(item.name, item)
                            : newFilterValue.delete(item.name);
                        onChange?.(Array.from(newFilterValue.values()));
                    },
                }}
            >
                {typeof children === 'function' ? children({props, value, onChange}) : children}
            </Provider>
        </IntlProvider>
    );
};

export default FilterOuter;
