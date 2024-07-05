import { SearchInput as SearchInputField } from "@components/Common";
import withFilterValue from "./withFilterValue";

const SearchInput = withFilterValue(({ label, onChange, value, ...props }) => {
  return (
    <SearchInputField
      {...props}
      placeholder={`请输入${label}`}
      value={value?.value || ""}
      onSearch={(value) => {
        onChange({ label: value, value });
      }}
    />
  );
});

export default SearchInput;
