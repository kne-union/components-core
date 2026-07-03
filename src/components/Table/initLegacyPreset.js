import { preset } from '@kne/table-page';
import legacyRenderTypes from './legacyRenderTypes';
import columnTypeDefaults from './legacyRenderTypes/defaults';

let initialized = false;

const initLegacyPreset = () => {
  if (initialized) {
    return;
  }
  initialized = true;

  preset({
    renderType: legacyRenderTypes,
    renderTypeSize: Object.keys(columnTypeDefaults).reduce((result, key) => {
      const { width, min, max } = columnTypeDefaults[key];
      result[key] = { width, min, max };
      return result;
    }, {})
  });
};

export default initLegacyPreset;
