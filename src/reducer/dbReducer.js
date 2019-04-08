import { SET_BILLINGS, GET_PERSON, SET_TYPES } from "../action/types";
const intState = {
  bill: {},
  names: [],
  types: []
};
export default function dbReducer(state = intState, action) {
  switch (action.type) {
    case SET_BILLINGS:
      return { ...state, bill: action.payload };
    case GET_PERSON:
      return { ...state, names: action.payload };
    case SET_TYPES:
      return { ...state, types: action.payload };
    default:
      return state;
  }
}
