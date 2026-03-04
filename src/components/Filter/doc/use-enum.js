const {
    default: Filter, SuperSelectFilterItem, getFilterValue
} = _Filter;
const {default: Enum} = _Enum;
const {useState} = React;
const BaseExample = () => {
    const [value, onChange] = useState([]);
    return (<Filter
        value={value}
        onChange={(value) => {
            console.log(getFilterValue(value));
            onChange(value);
        }}
        list={[[<SuperSelectFilterItem name="degree" label="学历" render={({children}) => {
            return <Enum moduleName="degreeEnum" format="option">{(options) => children({options})}</Enum>
        }}/>]]}
    />);
};

render(<BaseExample/>);
