import createLegacyRender from './createLegacyRender';
import { legacyRenders } from './renders';

const legacyRenderTypes = Object.keys(legacyRenders).reduce((result, key) => {
  result[key] = createLegacyRender(legacyRenders[key]);
  return result;
}, {});

export default legacyRenderTypes;
