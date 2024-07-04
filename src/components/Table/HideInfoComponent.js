import { createWithFetch } from "@kne/react-fetch";
import Ellipsis from "./Ellipsis";
import { Button } from "antd";
import ColItem from "./ColItem";
import isColValueEmpty from "./isColValueEmpty";

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
  const targetApi = Object.assign({}, api);
  if (expand) {
    return (
      <DisplayInfo {...targetApi}>
        {(data) => {
          return (
            <ColItem
              type="hide-info-expand"
              item={data}
              hover={hover}
              primary={primary}
              emptyRender={emptyRender}
              isEmpty={isColValueEmpty(data)}
            >
              <Ellipsis ellipsis={ellipsis}>
                {typeof targetApi.children === "function"
                  ? targetApi.children(data)
                  : data}
              </Ellipsis>
            </ColItem>
          );
        }}
      </DisplayInfo>
    );
  }
  return (
    <ColItem type="hide-info" primary emptyRender={emptyRender}>
      <Button className="btn-no-padding" type="link" onClick={onExpand}>
        查看
      </Button>
    </ColItem>
  );
};

export default HideInfoComponent;
