import createPageEnhancer from './createPageEnhancer';
import createConfigureStore from '../redux/createConfigureStore';

export default createPageEnhancer(createConfigureStore());
