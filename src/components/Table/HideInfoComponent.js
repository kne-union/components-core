import { createWithFetch } from "@kne/react-fetch";
import Ellipsis from "./Ellipsis";
import { Button } from "antd";
import ColItem from "./ColItem";

const DisplayInfo = createWithFetch({
  loading: null,
})(({ data, children }) => {
  return children(data);
});

const HideInfoComponent = ({
  api,
  expand,
  onExpand,
  ellipsis,
  hover,
  primary,
  emptyRender,
  isEmpty,
}) => {
  if (expand) {
    return (
      <DisplayInfo {...api}>
        {(data) => {
          return (
            <ColItem
              type="hide-info-expand"
              item={data}
              hover={hover}
              primary={primary}
              emptyRender={emptyRender}
              isEmpty={isEmpty}
            >
              <Ellipsis ellipsis={ellipsis}>
                {typeof api.children === "function" ? api.children(data) : data}
              </Ellipsis>
            </ColItem>
          );
        }}
      </DisplayInfo>
    );
  }
  return (
    <ColItem
      type="hide-info"
      primary
      isEmpty={isEmpty}
      emptyRender={emptyRender}
    >
      <Button className="btn-no-padding" type="link" onClick={onExpand}>
        查看
      </Button>
    </ColItem>
  );
};

export default HideInfoComponent;
