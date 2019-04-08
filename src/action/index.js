import {
  ADD_PERSON,
  REMOVE_PERSON,
  ADD_BILLING_ITEM,
  REMOVE_BILLING_ITEM,
  ON_CELL_CHANGE,
  ON_BILLING_VAL_CHANGE,
  CLEAR_BILLING_TABLE,
  SET_BILLINGS,
  GET_PERSON,
  LOG_IN,
  LOG_OUT,
  SET_TYPES
} from "./types";

export const addPerson = name => ({
  type: ADD_PERSON,
  payload: name
});
export const removePerson = name => ({
  type: REMOVE_PERSON,
  payload: name
});
export const addExpense = type => ({
  type: ADD_BILLING_ITEM,
  payload: type
});
export const removeExpense = type => ({
  type: REMOVE_BILLING_ITEM,
  payload: type
});
export const clearExpense = () => ({
  type: CLEAR_BILLING_TABLE,
  payload: {}
});
export const onCellValChange = ({ id, value }) => ({
  type: ON_CELL_CHANGE,
  payload: { id, value }
});
export const onUpdateBcInfo = info => ({
  type: ON_BILLING_VAL_CHANGE,
  payload: info
});
//------------------DB Actions---------------
export const setBillings = data => ({
  type: SET_BILLINGS,
  payload: data
});
export const setNames = names => ({
  type: GET_PERSON,
  payload: names
});
export const setTypes = types => ({
  type: SET_TYPES,
  payload: types
});
//------------------Auth Actions---------------
export const setUser = user => ({
  type: LOG_IN,
  user: user
});
export const clearUser = () => ({
  type: LOG_OUT,
  user: {}
});
