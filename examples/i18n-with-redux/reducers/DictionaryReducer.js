import { FETCH_TRANSLATION } from "../constants/DictionaryConstant";
import { generateId } from "../utils/DictionaryUtil";

const initialState = {};

const DictionaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRANSLATION:
      return {
        ...state,
        [generateId(action)]: action.soya[action.entryKey]
      };
    default:
      return state;
  }
};

export default DictionaryReducer;