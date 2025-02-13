import classnames from "classnames";
import style from "./style.module.scss";
import FilterProvider from './FilterProvider';

const FilterOuter = ({children, className, ...props}) => {
    return <FilterProvider {...props}>
        {(context) => <div className={classnames(style["filter"], className)}>
            {children(context)}
        </div>}
    </FilterProvider>

};

export default FilterOuter;
