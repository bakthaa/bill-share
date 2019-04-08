// import Billing from "./Billing";
const BillingTable = require("./BillingTable.js");
const Butil = require("./Billings.js");
// console.log(Billing);
const c = new BillingTable();
c.addRow();
c.addRow();
c.addRow();
c.addRow();
c.addCol();
c.addCol();
c.addCol();

c.setCellVal(c.items[0][1].id, "Mobile");
c.setCellVal(c.items[0][2].id, "Insurance");
c.setCellVal(c.items[0][3].id, "Internet");

c.setCellVal(c.items[1][0].id, "Aappan");
c.setCellVal(c.items[1][1].id, 50.9);
c.setCellVal(c.items[1][2].id, 45.9);
c.setCellVal(c.items[1][3].id, 90.9);

c.setCellVal(c.items[2][0].id, "Kuppan");
c.setCellVal(c.items[2][1].id, 50.9);
c.setCellVal(c.items[2][2].id, 85.9);
c.setCellVal(c.items[2][3].id, 8.4);

c.setCellVal(c.items[3][0].id, "Suppan");
c.setCellVal(c.items[3][1].id, 22);
c.setCellVal(c.items[3][2].id, 33);
c.setCellVal(c.items[3][3].id, 44);

c.setCellVal(c.items[4][0].id, "Muppan");
c.setCellVal(c.items[4][1].id, 55);
c.setCellVal(c.items[4][2].id, 66);
c.setCellVal(c.items[4][3].id, 77);
c.info = {
  stDt: "jan-1",
  endDt: "feb-1",
  amt: 100
};
// console.log(c);
// console.log(JSON.stringify(c.valueOf()));
const bc = Butil.toBillingCycle(c);
const val1 = Butil.toValue(bc);
const val2 = Butil.toValue(bc);
const bcs = [val1, val2];
const res = Butil.billCycleToPersons(bcs);
console.log(res);
console.log("-------------------------");
// Object.entries(res).forEach(val => console.log(val));
Object.keys(res).forEach(key => {
  console.log(key);
  let value = res[key];
  console.log(value);
  //use key and value here
});
// console.log(JSON.stringify(res));
