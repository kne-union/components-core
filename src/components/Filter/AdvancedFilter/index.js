import FilterOuter from "../FilterOuter";
import MoreFilterLines from "../FilterLines";
import { Flex } from "antd";
import advancedFields from "./fields";
import get from "lodash/get";
import { useContext } from "../context";
import style from "../style.module.scss";
import FilterValueDisplay from "../FilterValueDisplay";

const Line = ({ list }) => {
  const { value, onChange } = useContext();
  return (
    <Flex gap={8}>
      {list.map((item, index) => {
        const ComponentItem = item.type;
        return (
          <Flex gap={16} key={item.key || item.props.name || index}>
            <div className={style["filter-label"]}>{item.props.label}:</div>
            <Flex>
              <ComponentItem
                {...item.props}
                value={
                  value
                    ? get(value.get(item.props.name), "value")
                    : item.props.value
                }
                onChange={
                  onChange
                    ? (value) =>
                        onChange({
                          name: item.props.name,
                          label: item.props.label,
                          value,
                        })
                    : item.props.onChange
                }
              />
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

const AdvancedFilter = (props) => {
  return (
    <FilterOuter {...props}>
      {({ value, onChange, props }) => {
        const { list, more } = props;
        return (
          <div>
            <Flex gap={8} vertical className={style["filter-advanced"]}>
              {list.map((item, index) => {
                return <Line key={index} list={item} />;
              })}
              {more && (
                <MoreFilterLines
                  className={style["filter-advanced-more"]}
                  label="更多"
                  list={[more]}
                />
              )}
            </Flex>
            {value && value.length > 0 && (
              <FilterValueDisplay value={value} onChange={onChange} />
            )}
          </div>
        );
      }}
    </FilterOuter>
  );
};

AdvancedFilter.fields = advancedFields;
export default AdvancedFilter;

export { advancedFields };
