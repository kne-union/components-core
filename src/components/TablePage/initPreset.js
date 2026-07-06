import { preset } from '@kne/table-page';
import { renderTypes, renderTypeDefaults } from './renderTypes';

let initialized = false;

const initPreset = () => {
  if (initialized) {
    return;
  }
  initialized = true;

  preset({
    renderType: renderTypes,
    renderTypeSize: Object.keys(renderTypeDefaults).reduce((result, key) => {
      const { width, min, max, ellipsis } = renderTypeDefaults[key];
      result[key] = Object.assign(
        { width, min, max },
        ellipsis == null ? {} : { ellipsis }
      );
      return result;
    }, {})
  });
};

export default initPreset;
