import { LOG_IN, LOG_OUT } from "../action/types";
const intState = {
  token: null,
  user: null,
  loading: false
};
export default function authReducer(state = intState, action) {
  switch (action.type) {
    case LOG_IN:
      return { ...state, token: action.user.ra, user: action.user.email };
    case LOG_OUT:
      return { ...state, names: action.user };

    default:
      return state;
  }
}
