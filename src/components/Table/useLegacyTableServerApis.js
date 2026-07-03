import { useFetch } from '@kne/react-fetch';
import { useEffect, useMemo, useRef, useState } from 'react';
import useRefCallback from '@kne/use-ref-callback';

const toConfigObject = value => (value && typeof value === 'object' ? value : {});

const useLegacyTableServerApis = (name, controllerOpen, presetTableServerApis) => {
  const presetRef = useRef(presetTableServerApis);
  presetRef.current = presetTableServerApis;

  const remoteConfigRef = useRef({});
  const [version, setVersion] = useState(0);

  const isLegacyApi = Boolean(
    presetTableServerApis &&
      typeof presetTableServerApis.getDataApi === 'function' &&
      typeof presetTableServerApis.getData !== 'function'
  );

  const tablePageServerParams = useMemo(() => {
    if (!isLegacyApi || !name || !controllerOpen) {
      return null;
    }
    return presetRef.current.getDataApi(name);
  }, [isLegacyApi, name, controllerOpen]);

  const onRequestSuccess = useRefCallback(data => {
    remoteConfigRef.current = toConfigObject(data);
    setVersion(value => value + 1);
  });

  const fetchConfig = useMemo(
    () =>
      tablePageServerParams
        ? Object.assign({}, tablePageServerParams, {
            auto: false,
            cache: `TABLE_CONFIG_${name}`,
            isLocal: true,
            onRequestSuccess
          })
        : {
            auto: false
          },
    [tablePageServerParams, name, onRequestSuccess]
  );

  const { send } = useFetch(fetchConfig);

  const loadRemoteConfig = useRefCallback(() => {
    if (name && controllerOpen && tablePageServerParams) {
      send({ force: false });
    }
  });

  useEffect(() => {
    loadRemoteConfig();
  }, [loadRemoteConfig]);

  return useMemo(() => {
    const preset = presetRef.current;
    if (!preset) {
      return undefined;
    }

    if (!isLegacyApi) {
      if (typeof preset.getData !== 'function') {
        return undefined;
      }
      return {
        getData: tableName => toConfigObject(preset.getData?.(tableName)),
        setData: (tableName, data) => {
          if (typeof preset.setData === 'function') {
            return preset.setData(tableName, data);
          }
          return preset.setDataFunc?.(tableName, data);
        }
      };
    }

    return {
      getData: () => remoteConfigRef.current,
      setData: (tableName, data) => {
        const target = toConfigObject(data);
        remoteConfigRef.current = target;
        setVersion(value => value + 1);
        return preset.setDataFunc?.(tableName, target);
      }
    };
  }, [isLegacyApi, version]);
};

export default useLegacyTableServerApis;
