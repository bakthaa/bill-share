import {
  ADD_PERSON,
  REMOVE_PERSON,
  ADD_BILLING_ITEM,
  REMOVE_BILLING_ITEM,
  ON_CELL_CHANGE,
  ON_BILLING_VAL_CHANGE,
  CLEAR_BILLING_TABLE
} from "../action/types";
import BillingTable from "../model/BillingTable";

const table = new BillingTable();
export default function billingReducer(state, action) {
  // console.log("billingReducer>> ", state, action);
  switch (action.type) {
    case ADD_PERSON:
      table.addRow(action.payload);
      break;

    case REMOVE_PERSON:
      table.removeRow(action.payload);
      break;
    // // return { items: [...table.items], total: [...table.total] };

    case ADD_BILLING_ITEM:
      table.addCol(action.payload);
      break;

    case REMOVE_BILLING_ITEM:
      table.removeCol(action.payload);
      break;

    case ON_CELL_CHANGE:
      table.setCellVal(action.payload.id, action.payload.value);
      break;

    case ON_BILLING_VAL_CHANGE:
      table.info = action.payload;
      break;

    case CLEAR_BILLING_TABLE:
      console.log(CLEAR_BILLING_TABLE);
      console.log(table);
      table.reset();
      break;
    // return table;

    default:
    // return table;
  }
  return {
    items: [...table.items],
    total: [...table.total],
    hTotal: [...table.hTotal],
    info: { ...table.info }
  };
}
