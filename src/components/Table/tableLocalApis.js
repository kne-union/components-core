import localStorage from "@common/utils/localStorage";
import get from "lodash/get";

const storageKey = "COMPONENTS_CORE_TABLE_CONFIG";

const getDataApi = (name) => {
  if (!name) {
    return {};
  }

  return {
    loader: () => get(localStorage.getItem(storageKey), name, {}),
  };
};

const setDataFunc = (name, data) => {
  if (!(name && typeof data === "object" && Object.values(data).length > 0)) {
    return;
  }

  return localStorage.setItem(
    storageKey,
    Object.assign({}, localStorage.getItem(storageKey), { [name]: data })
  );
};

const tableLocalApis = { getDataApi, setDataFunc };

export default tableLocalApis;
