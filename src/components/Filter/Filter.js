import FilterLines from "./FilterLines";
import FilterValueDisplay from "./FilterValueDisplay";
import FilterOuter from "./FilterOuter";

const Filter = (props) => {
  return (
    <FilterOuter {...props}>
      {({ props, value, onChange }) => {
        const { extraExpand, ...others } = props;
        return (
          <>
            <FilterLines {...others} />
            {value && value.length > 0 && (
              <FilterValueDisplay
                value={value}
                onChange={onChange}
                extraExpand={extraExpand}
              />
            )}
          </>
        );
      }}
    </FilterOuter>
  );
};

Filter.defaultProps = {
  defaultValue: [],
};

export default Filter;
