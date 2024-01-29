const { default: Filter, TreeFilterItem } = _Filter;
const { default: treeData } = _data;
const { useState } = React;
const { Space } = antd;

const BaseExample = () => {
  const [filter, setFilter] = useState([]);
  const [filter2, setFilter2] = useState([]);

  return (
    <Space direction="vertical">
      <Filter
        value={filter}
        onChange={setFilter}
        list={[
          [
            <TreeFilterItem
              name="tree"
              single
              label="树组件"
              fieldNames={{
                title: "name",
                key: "id",
                children: "children",
              }}
              api={{
                loader: () => {
                  return treeData.children;
                },
              }}
            />,
          ],
        ]}
      />
      <Filter
        value={filter2}
        onChange={setFilter2}
        list={[
          [
            <TreeFilterItem
              name="tree"
              label="树组件"
              fieldNames={{
                title: "name",
                key: "id",
                children: "children",
              }}
              api={{
                loader: () => {
                  return treeData.children;
                },
              }}
            />,
          ],
        ]}
      />
    </Space>
  );
};

render(<BaseExample />);
