import { createContext, useContext, useEffect } from "react";
import { usePreset } from "@components/Global";
import get from "lodash/get";
import memoize from "lodash/memoize";
import omit from "lodash/omit";

const treeTraverse = (data, func, pId) => {
  if (!data) {
    return;
  }
  if (Array.isArray(data)) {
    data.forEach((item) => {
      treeTraverse(item, func, pId);
    });
    return;
  }
  func(Object.assign({}, omit(data, ["children"]), { parentId: pId }));
  treeTraverse(data.children, func, pId ? pId + ":" + data.id : data.id);
};

const parseProfile = memoize((profile) => {
  const profileMap = (() => {
    const output = new Map();
    treeTraverse(profile, (item) => {
      output.set(item.parentId ? item.parentId + ":" + item.id : item.id, item);
    });
    return output;
  })();

  const features = ((profileMap) => {
    return Array.from(profileMap.keys()).filter((id) => {
      const item = profileMap.get(id);
      return !(
        Array.isArray(item.dependencies) &&
        item.dependencies.length > 0 &&
        item.dependencies.some((depId) => {
          return !profileMap.get(id);
        })
      );
    });
  })(profileMap);

  return { profile, features, profileMap };
});

const useFeatures = () => {
  const preset = usePreset();
  const { profile, debug } = get(preset, "features", {
    debug: false,
    profile: {},
  });
  return Object.assign({}, parseProfile(profile), { debug });
};

const computedIsPaas = (currentId, { profileMap, features }) => {
  const target = profileMap.get(currentId);
  return (
    features.indexOf(currentId) !== -1 &&
    target.close !== true &&
    get(target, "dependencies", []).every((id) => {
      const dependenciesTarget = profileMap.get(currentId);
      return features.indexOf(id) > -1 && dependenciesTarget.close !== true;
    })
  );
};

const context = createContext(null);

const { Provider } = context;

export const useFeatureCall = (id) => {
  const { features, profile, profileMap, debug } = useFeatures();
  const systemId = profile.type === "system" ? profile.id : "root";
  const parentId = useContext(context);
  const currentId = parentId ? parentId + ":" + id : systemId + ":" + id;
  useEffect(() => {
    if (features && features.length > 0 && debug) {
      console.log(
        `[featureId] ${currentId},[state] ${computedIsPaas(currentId, {
          features,
          profileMap,
        })}`,
        profileMap.get(currentId)
      );
    }
  }, [features, profileMap, debug, currentId]);
  return {
    isPass:
      !(id && features && features.length > 0) ||
      computedIsPaas(currentId, { features, profileMap }),
    currentId,
    feature: profileMap.get(currentId),
  };
};

const Features = ({ id, children }) => {
  const { isPass, feature, currentId } = useFeatureCall(id);
  return (
    <Provider value={currentId}>
      {typeof children === "function"
        ? children({
            isPass,
            options: isPass
              ? get(feature, "options")
              : get(feature, "rejectedOptions"),
            currentId,
          })
        : isPass && children}
    </Provider>
  );
};

export default Features;
