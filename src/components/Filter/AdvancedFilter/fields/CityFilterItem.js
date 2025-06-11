import {App, Tag} from "antd";
import AddressSelectField, {
    getLabelForLocal,
    withAddressApi,
} from "@common/components/AddressSelectField";
import {FormattedMessage, useIntl} from "@components/Intl";
import {usePreset} from "@components/Global";
import {useMemo} from "react";
import style from "../../style.module.scss";

const {CheckableTag} = Tag;

const CityFilterItemInner = ({
                                 value,
                                 onChange,
                                 single = false,
                                 maxLength = 5,
                                 addressApi,
                                 ...props
                             }) => {
    const {message} = App.useApp();
    const {locale} = usePreset();
    const {formatMessage} = useIntl({moduleName: "Filter"});
    const cityList = useMemo(() => {
        return addressApi.getChinaHotCities();
    }, [addressApi]);
    return (
        <>
            {cityList.map((city) => {
                const {code} = city;
                const name = getLabelForLocal(city, locale);
                return (
                    <CheckableTag
                        key={code}
                        size="small"
                        checked={
                            single
                                ? value?.value === code
                                : !!(value || []).find(({value}) => value === code)
                        }
                        onChange={(checked) => {
                            if (single) {
                                onChange(checked ? {value: code, label: name} : null);
                                return;
                            }
                            const newValue = (value || []).slice(0);
                            checked
                                ? newValue.push({value: code, label: name})
                                : (() => {
                                    const index = newValue.findIndex(
                                        ({value}) => value === code
                                    );
                                    newValue.splice(index, 1);
                                })();
                            if (newValue.length > maxLength) {
                                message.error(
                                    formatMessage(
                                        {id: "maxSelectedCount"},
                                        {count: maxLength}
                                    )
                                );
                                return;
                            }
                            onChange(newValue);
                        }}
                    >
                        {name}
                    </CheckableTag>
                );
            })}
            <CheckableTag
                className={style["filter-advanced-item-other"]}
                size="small"
                checked={
                    (single ? value?.value : value?.value && value.value.length > 0) &&
                    !cityList.find(({code}) =>
                        single
                            ? value?.value === code
                            : !!(value || []).find(({value}) => value === code)
                    )
                }
            >
                <FormattedMessage
                    id={"otherText"}
                    moduleName="Filter"
                    defaultMessage="其他"
                />
                <AddressSelectField
                    {...props}
                    className={style["filter-advanced-item-other-inner"]}
                    maxLength={maxLength}
                    value={
                        single ? value?.value : (value || []).map(({value}) => value)
                    }
                    single={single}
                    onChange={(value, ...args) => {
                        const getCityValue = (value) => {
                            const {city} = addressApi.getCity(value);
                            return {value: city?.code, label: city?.name};
                        };
                        onChange(
                            single
                                ? getCityValue(value)
                                : value.map((value) => getCityValue(value))
                        );
                    }}
                />
            </CheckableTag>
        </>
    );
};
const CityFilterItem = withAddressApi(CityFilterItemInner);
export default CityFilterItem;
