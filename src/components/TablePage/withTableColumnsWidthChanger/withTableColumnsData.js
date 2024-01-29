import { withFetch } from "@kne/react-fetch";
import { usePreset } from "@components/Global";

const withTableColumnsData = (WrappedComponent) => {
  const FetchWrappedComponent = withFetch(WrappedComponent);
  return (props) => {
    const { name, controllerOpen } = props;
    const { tablePageServerApis } = usePreset();
    if (
      controllerOpen &&
      name &&
      tablePageServerApis &&
      tablePageServerApis.getDataApi
    ) {
      //isLocal ttl={24 * 60 * 60 * 1000}
      return (
        <FetchWrappedComponent
          {...props}
          {...tablePageServerApis.getDataApi(name)}
          cache={`TABLE_CONFIG_${name}`}
          isLocal
          ttl={5 * 1000}
          error={<WrappedComponent {...props} />}
        />
      );
    }
    return <WrappedComponent {...props} />;
  };
};

export default withTableColumnsData;
