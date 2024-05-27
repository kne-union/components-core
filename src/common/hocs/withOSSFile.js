import Fetch from "@kne/react-fetch";
import { usePreset } from "@components/Global";
import merge from "lodash/merge";

const withOSSFile = (WrappedComponent) => {
  const OSSFile = ({
    id,
    url,
    error,
    apis: currentApis,
    loading,
    ...props
  }) => {
    const { apis: baseApis } = usePreset();
    const apis = merge({}, baseApis, currentApis);
    if (!id) {
      return null;
    }
    if (!apis.oss) {
      throw new Error("请在Global组件设置preset.apis.oss参数");
    }

    const { paramsType, paramsName, ...oss } = Object.assign(
      { paramsType: "params", paramsName: "id" },
      apis.oss
    );
    const fetchProps = {};
    fetchProps[paramsType] = { [paramsName]: id };
    return (
      <Fetch
        {...Object.assign({}, oss, fetchProps)}
        updateType="refresh"
        error={error}
        loading={loading}
        cache="oss-file"
        ttl={1000 * 60 * 100}
        render={({ data }) => (
          <WrappedComponent {...props} id={id} data={data} />
        )}
      />
    );
  };
  OSSFile.defaultProps = {
    loading: null,
  };
  return OSSFile;
};

export default withOSSFile;
