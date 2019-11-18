class ExpenseItem {
  constructor(type, val) {
    this.type = type;
    this.val = val;
  }
}

class Person {
  constructor(name = "") {
    this.name = name;
    this.items = [];
    this.tot = 0;
  }
  addItem(item) {
    if (!item) return;
    this.items.push(item);
    this.calTot();
  }
  calTot() {
    this.tot = this.items
      .map(_item => _item.val)
      .reduce((acc, val) => acc + Number(val), 0);
  }
}

class BillingCycle {
  constructor() {
    this.stDate = "";
    this.endDate = "";
    this.amount = 0;
    this.persons = [];
  }
  addPerson(person) {
    if (!person) return;
    this.persons.push(person);
  }
}

class Butil {
  static toBillingCycle(bTable = { items: [] }) {
    const _grid = bTable.items;
    if (1 > _grid.length) {
      return;
    }
    const _bc = new BillingCycle();
    if (bTable.info) {
      _bc.stDate = bTable.info.stDt;
      _bc.endDate = bTable.info.endDt;
      _bc.amount = bTable.info.amt;
    }
    const _stRidx = 1;
    const _stCidx = 1;
    for (let i = _stRidx; i < _grid.length; i++) {
      const _bPerson = new Person(_grid[i][0].value);
      for (let j = _stCidx; j < _grid[i].length; j++) {
        _bPerson.addItem(new ExpenseItem(_grid[0][j].value, _grid[i][j].value));
      }
      _bc.addPerson(_bPerson);
    }
    return _bc;
  }

  static toValue(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  // bcs to person
  static billCycleToPersons(bcs) {
    if (!bcs || 1 > bcs.length) return;
    const persons = {};
    // [
    //   // {
    //   //   //   name: "",
    //   //   //   bcs: [{
    //   //   //     period: "",
    //   //   //     items: [],
    //   //   //     total: 0
    //   //   //   }],
    //   //   //   gTotal: 0
    //   // }
    // ];

    // console.log(">>>>>>");
    for (let i = 0; i < bcs.length; i++) {
      const stDate = new Date(bcs[i].stDate);
      const billPeriod = `${bcs[i].stDate} to ${bcs[i].endDate}`;
      for (let j = 0; j < bcs[i].persons.length; j++) {
        const { name, items, tot } = bcs[i].persons[j];
        // console.log(tot);
        const bc = {
          stDate,
          period: billPeriod,
          items: items,
          total: tot
        };
        if (persons[name]) {
          persons[name].bcs.push(bc);
          persons[name].bcs.sort((a, b) => (a.stDate > b.stDate ? 1 : -1));
          persons[name].gTotal = persons[name].gTotal + Number(bc.total);
        } else {
          // new
          persons[name] = {
            bcs: [bc],
            gTotal: Number(bc.total)
          };
        }
      } //persond end
    } // bcs end
    return persons;
  }

  static validateBtable(bTable) {
    if (!bTable || !bTable.info) {
      return { valid: false, errMsg: "Billing detail not found!" };
    }
    if (
      isNaN(new Date(bTable.info.stDt)) ||
      isNaN(new Date(bTable.info.endDt)) ||
      Number(bTable.info.amt) < 1
    ) {
      return {
        valid: false,
        errMsg: "Invalid billing start/end date or amount!"
      };
    }
    if (
      !bTable.items ||
      bTable.items.length <= 1 ||
      bTable.items[0].length <= 1
    ) {
      return { valid: false, errMsg: "Expenses detail not found!" };
    }
    return { valid: true, errMsg: "" };
  }
}
export default Butil;
// module.exports = Butil;
