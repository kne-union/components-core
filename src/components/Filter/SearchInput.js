import {SearchInput as SearchInputField} from "@components/Common";
import withFilterValue from "./withFilterValue";
import {useIntl} from "@components/Intl";

const SearchInput = withFilterValue(({label, onChange, value, placeholder, ...props}) => {
    const {formatMessage} = useIntl({moduleName: 'Filter'});
    return (
        <SearchInputField
            {...props}
            placeholder={placeholder || formatMessage({id: 'inputPlaceholder'}, {label})}
            value={value?.value || ""}
            onSearch={(value) => {
                onChange({label: value, value});
            }}
        />
    );
});

export default SearchInput;
