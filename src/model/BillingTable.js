import uuidv4 from "uuid/v4";
// const uuidv4 = require("uuid/v4");
import { initBillInfo } from "../component/NewBilling";
const CELL_DELIMETER = "_";
const FN_TOTAL = (pre, curr) => {
  const nan = Number(curr.value);
  return isNaN(nan) ? pre : pre + nan;
};
const EMPTY_ROW = (rowNum, value, disable) => [
  new Cell(rowNum, value, disable)
];
class Cell {
  constructor(rowNum, value, disable) {
    if (isNaN(rowNum)) {
      throw new Error("Cell creation faild!");
    }
    this.id = rowNum + CELL_DELIMETER + uuidv4();
    this.value = value || "";
    this.disable = disable || false;
  }
  add(value) {
    this.value += value;
    return this;
  }
}

// const _total = [new Cell(0, "Total")];
class BillingTable {
  constructor() {
    this.reset();
  }

  reset() {
    this.info = { ...initBillInfo };
    this.items = [];
    this.items[0] = EMPTY_ROW(0, "Name/Expense", true);
    this.total = EMPTY_ROW(0, "V-Total", true); // harizandal total
    this.hTotal = EMPTY_ROW(0, "H-Total", true); // vertical total
    this.updateTotal();
  }

  /* Person*/
  addRow(name) {
    // console.log("Adding Row!");
    const _totRow = this.items.length;
    this.items[_totRow] = this.items[0].map((_firstCol, i) =>
      0 === i ? new Cell(_totRow, name, true) : new Cell(_totRow)
    );
    this.updateTotal();
  }

  removeRow(name) {
    // console.log("Remove Row!", name);
    const _totRow = this.items.length;
    if (1 === _totRow) {
      return;
    }
    const _delRow = this.items.find(_row => name === _row[0].value);
    const _delIdx = this.items.indexOf(_delRow);
    if (-1 < _delIdx) {
      this.items.splice(_delIdx, 1);
      this.updateTotal();
    }
  }

  /*Expense*/
  addCol(type) {
    // console.log("Adding Column!", type);
    this.items.forEach((_row, i) => {
      if (0 === i) {
        this.items[i] = [..._row, new Cell(i, type, true)];
      } else {
        this.items[i] = [..._row, new Cell(i)];
      }
    });
    this.updateTotal();
  }

  removeCol(type) {
    // console.log("Remove Column!", type);
    const _delCol = this.items[0].find(_cell => type === _cell.value);
    const _delIdx = this.items[0].indexOf(_delCol);
    if (0 < _delIdx) {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i] = this.items[i].filter((_cell, i) => _delIdx !== i);
      }
      this.updateTotal();
    }
  }

  /*update into new value*/
  setCellVal(id, value) {
    if (!id) {
      throw new Error("Invalid cell id!");
    }
    const _idParts = id.split(CELL_DELIMETER);
    const _rowIdx = parseInt(_idParts[0]);
    if (isNaN(_rowIdx)) {
      throw new Error("Invalid row index!");
    }
    this.items[_rowIdx] = this.items[_rowIdx].map(_cell =>
      _cell.id === id ? new Cell(_rowIdx, value) : _cell
    );
    this.updateTotal();
  }

  updateTotal() {
    const _stRidx = 1,
      _stCidx = 1;
    this.total = EMPTY_ROW(0, "V-Total"); // harizandal total
    this.hTotal = EMPTY_ROW(0, "H-Total", true); // vertical total
    for (let j = _stCidx; j < this.items[0].length; j++) {
      let _total = 0;
      for (let i = _stRidx; i < this.items.length; i++) {
        const _cellVal = Number(this.items[i][j].value);
        _total += _cellVal;
        // calculate v total
        this.hTotal[i] = this.hTotal[i]
          ? this.hTotal[i].add(_cellVal)
          : new Cell(i, _cellVal, true);
      }
      this.total = [...this.total, new Cell(j, _total.toFixed(2))];
    }
    this.total[0].value = `V-Total(${this.total.reduce(FN_TOTAL, 0)})`;
    this.hTotal[0].value = `H-Total(${this.hTotal.reduce(FN_TOTAL, 0)})`;
  }
}
export default BillingTable;
// module.exports = BillingTable;
