const MAX_SLIDER = 500;

const format = {
  kcal: (v) => `${v.toFixed(0)} kcal`,
  grams: (v) => `${v.toFixed(1)} g`,
  euros: (v) => `€${v.toFixed(2)}`,
  eurosMonth: (v) => `€${(v * 30).toFixed(2)}/mo`
};

function diffColor(diff, excessBad) {
  const maxIntensity = 150;
  const ratio = Math.min(Math.abs(diff) / maxIntensity, 1.0);
  const intensity = Math.floor(ratio * 200);

  if (diff === 0) return "#ffffff";

  if (excessBad) {
    if (diff > 0) {
      return `#${(255).toString(16).padStart(2, "0")}${(255 - intensity).toString(16).padStart(2, "0")}${(255 - intensity).toString(16).padStart(2, "0")}`;
    }
    return `#${(255 - intensity).toString(16).padStart(2, "0")}${(255).toString(16).padStart(2, "0")}${(255 - intensity).toString(16).padStart(2, "0")}`;
  }

  if (diff > 0) {
    return `#${(255 - intensity).toString(16).padStart(2, "0")}${(255).toString(16).padStart(2, "0")}${(255 - intensity).toString(16).padStart(2, "0")}`;
  }
  return `#${(255).toString(16).padStart(2, "0")}${(255 - intensity).toString(16).padStart(2, "0")}${(255 - intensity).toString(16).padStart(2, "0")}`;
}

function getMacros(name, amount) {
  const data = INGREDIENTS[name];
  if (!data) return { cal: 0, pro: 0, fib: 0, sat: 0, pri: 0 };
  const cal = data.calorie * amount / 100;
  const pro = data.protein * amount / 100;
  const fib = data.fiber * amount / 100;
  const sat = data.sat_fat * amount / 100;
  const unitPrice = data.price / data.amount;
  const pri = unitPrice * amount;
  return { cal, pro, fib, sat, pri };
}

class MealPanel {
  constructor(containerId, title, copySource = null, onChange) {
    this.container = document.getElementById(containerId);
    this.title = title;
    this.copySource = copySource;
    this.onChange = onChange;
    this.rows = [];

    this._build();
    this._addEmptyRow();
    this._renderTotals();
  }

  _build() {
    this.container.innerHTML = "";
    this.container.classList.add("panel");

    const header = document.createElement("div");
    header.className = "panel-header";
    header.innerHTML = `<h2>${this.title}</h2>`;

    if (this.copySource) {
      const copyBtn = document.createElement("button");
      copyBtn.className = "copy-btn";
      copyBtn.textContent = "Copy from Meal 1";
      copyBtn.addEventListener("click", () => this.copyFromSource());
      header.appendChild(copyBtn);
    }

    this.container.appendChild(header);

    this.table = document.createElement("table");
    this.table.className = "meal-table";

    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th></th>
        <th>Ingredient</th>
        <th>Amount</th>
        <th>(g)</th>
        <th></th>
        <th>Calories</th>
        <th>Protein</th>
        <th>Fiber</th>
        <th>Sat. Fat</th>
        <th>Price</th>
      </tr>`;

    this.tbody = document.createElement("tbody");

    const tfoot = document.createElement("tfoot");
    tfoot.innerHTML = `
      <tr class="totals">
        <td colspan="2" class="total-label">Meal Total</td>
        <td colspan="3"></td>
        <td class="tot-cal">0 kcal</td>
        <td class="tot-pro">0.0 g</td>
        <td class="tot-fib">0.0 g</td>
        <td class="tot-sat">0.0 g</td>
        <td class="tot-pri">€0.00 <span class="tot-pri-mo">€0.00/mo</span></td>
      </tr>`;

    this.table.appendChild(thead);
    this.table.appendChild(this.tbody);
    this.table.appendChild(tfoot);
    this.container.appendChild(this.table);

    this.totalsCells = {
      cal: tfoot.querySelector(".tot-cal"),
      pro: tfoot.querySelector(".tot-pro"),
      fib: tfoot.querySelector(".tot-fib"),
      sat: tfoot.querySelector(".tot-sat"),
      pri: tfoot.querySelector(".tot-pri"),
      priMo: tfoot.querySelector(".tot-pri-mo")
    };
  }

  _addEmptyRow() {
    const row = this._createRow();
    this.rows.push(row);
    this.tbody.appendChild(row.el);
  }

  _createRow() {
    const row = {
      name: "",
      amount: 100
    };

    const tr = document.createElement("tr");
    tr.className = "meal-row";

    const delTd = document.createElement("td");
    const delBtn = document.createElement("button");
    delBtn.className = "del-btn";
    delBtn.textContent = "X";
    delBtn.addEventListener("click", () => this._deleteRow(row));
    delTd.appendChild(delBtn);

    const nameTd = document.createElement("td");
    const select = document.createElement("select");
    select.innerHTML = `<option value="">— add ingredient —</option>`;
    Object.keys(INGREDIENTS).sort().forEach((name) => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });
    nameTd.appendChild(select);

    const sliderTd = document.createElement("td");
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = String(MAX_SLIDER);
    slider.value = String(row.amount);
    sliderTd.appendChild(slider);

    const spinTd = document.createElement("td");
    const spin = document.createElement("input");
    spin.type = "number";
    spin.min = "0";
    spin.max = "10000";
    spin.step = "1";
    spin.value = String(row.amount);
    spinTd.appendChild(spin);

    const unitTd = document.createElement("td");
    unitTd.textContent = "g";

    const calTd = document.createElement("td");
    const proTd = document.createElement("td");
    const fibTd = document.createElement("td");
    const satTd = document.createElement("td");
    const priTd = document.createElement("td");

    [calTd, proTd, fibTd, satTd, priTd].forEach((td) => td.classList.add("macro"));

    tr.append(delTd, nameTd, sliderTd, spinTd, unitTd, calTd, proTd, fibTd, satTd, priTd);

    row.el = tr;
    row.select = select;
    row.slider = slider;
    row.spin = spin;
    row.cells = { calTd, proTd, fibTd, satTd, priTd, sliderTd, spinTd, unitTd };

    const syncAmount = (value) => {
      const v = Math.max(0, Number(value) || 0);
      row.amount = v;
      row.slider.value = String(Math.min(v, MAX_SLIDER));
      row.spin.value = String(v);
      this._updateRow(row);
      this._emitChange();
    };

    select.addEventListener("change", () => {
      row.name = select.value;
      if (row.name) {
        this._showRowControls(row, true);
        this._updateRow(row);
        if (this._isLastEmptyRow(row)) {
          this._addEmptyRow();
        }
      } else {
        this._showRowControls(row, false);
        this._updateRow(row);
      }
      this._emitChange();
    });

    slider.addEventListener("input", (e) => syncAmount(e.target.value));
    spin.addEventListener("input", (e) => syncAmount(e.target.value));

    this._showRowControls(row, false);
    return row;
  }

  _showRowControls(row, show) {
    const display = show ? "" : "none";
    row.cells.sliderTd.style.display = display;
    row.cells.spinTd.style.display = display;
    row.cells.unitTd.style.display = display;
    row.cells.calTd.style.display = display;
    row.cells.proTd.style.display = display;
    row.cells.fibTd.style.display = display;
    row.cells.satTd.style.display = display;
    row.cells.priTd.style.display = display;
  }

  _updateRow(row) {
    if (!row.name) {
      row.cells.calTd.textContent = "";
      row.cells.proTd.textContent = "";
      row.cells.fibTd.textContent = "";
      row.cells.satTd.textContent = "";
      row.cells.priTd.textContent = "";
      this._renderTotals();
      return;
    }

    const { cal, pro, fib, sat, pri } = getMacros(row.name, row.amount);
    row.cells.calTd.textContent = format.kcal(cal);
    row.cells.proTd.textContent = format.grams(pro);
    row.cells.fibTd.textContent = format.grams(fib);
    row.cells.satTd.textContent = format.grams(sat);
    row.cells.priTd.textContent = format.euros(pri);

    this._renderTotals();
  }

  _renderTotals() {
    const totals = this.getTotals();
    this.totalsCells.cal.textContent = format.kcal(totals.cal);
    this.totalsCells.pro.textContent = format.grams(totals.pro);
    this.totalsCells.fib.textContent = format.grams(totals.fib);
    this.totalsCells.sat.textContent = format.grams(totals.sat);
    this.totalsCells.pri.firstChild.textContent = format.euros(totals.pri) + " ";
    this.totalsCells.priMo.textContent = format.eurosMonth(totals.pri);
  }

  _deleteRow(row) {
    const filled = this.rows.filter((r) => r.name);
    if (!row.name && filled.length === 0) return;

    const idx = this.rows.indexOf(row);
    if (idx >= 0) {
      row.el.remove();
      this.rows.splice(idx, 1);
    }

    if (this.rows.length === 0 || this.rows[this.rows.length - 1].name) {
      this._addEmptyRow();
    }

    this._emitChange();
  }

  _isLastEmptyRow(row) {
    return this.rows.indexOf(row) === this.rows.length - 1 && !row.name;
  }

  _emitChange() {
    this._renderTotals();
    if (this.onChange) this.onChange();
  }

  getTotals() {
    return this.rows.reduce((acc, row) => {
      if (!row.name) return acc;
      const { cal, pro, fib, sat, pri } = getMacros(row.name, row.amount);
      acc.cal += cal;
      acc.pro += pro;
      acc.fib += fib;
      acc.sat += sat;
      acc.pri += pri;
      return acc;
    }, { cal: 0, pro: 0, fib: 0, sat: 0, pri: 0 });
  }

  getState() {
    return this.rows.filter((row) => row.name).map((row) => ({ name: row.name, amount: row.amount }));
  }

  loadState(state) {
    this.rows.forEach((row) => row.el.remove());
    this.rows = [];
    state.forEach((item) => {
      const row = this._createRow();
      row.name = item.name;
      row.amount = item.amount;
      row.select.value = item.name;
      row.slider.value = String(Math.min(item.amount, MAX_SLIDER));
      row.spin.value = String(item.amount);
      this._showRowControls(row, true);
      this._updateRow(row);
      this.rows.push(row);
      this.tbody.appendChild(row.el);
    });
    this._addEmptyRow();
    this._emitChange();
  }

  copyFromSource() {
    if (!this.copySource) return;
    const state = this.copySource.getState();
    this.loadState(state);
  }
}

function initApp() {
  const meal1 = new MealPanel("meal-1", "Meal 1", null, updateDayTotals);
  const meal2 = new MealPanel("meal-2", "Meal 2", meal1, updateDayTotals);
  const meal3 = new MealPanel("meal-3", "Meal 3", meal1, updateDayTotals);

  const targets = {
    cal: document.getElementById("target-cal"),
    pro: document.getElementById("target-pro"),
    fib: document.getElementById("target-fib"),
    sat: document.getElementById("target-sat")
  };

  const totalsEls = {
    cal: document.getElementById("day-cal"),
    pro: document.getElementById("day-pro"),
    fib: document.getElementById("day-fib"),
    sat: document.getElementById("day-sat"),
    pri: document.getElementById("day-pri"),
    priMo: document.getElementById("day-pri-mo"),
    diffCal: document.getElementById("diff-cal"),
    diffPro: document.getElementById("diff-pro"),
    diffFib: document.getElementById("diff-fib"),
    diffSat: document.getElementById("diff-sat")
  };

  function updateDayTotals() {
    const totals = [meal1, meal2, meal3].reduce((acc, meal) => {
      const t = meal.getTotals();
      acc.cal += t.cal;
      acc.pro += t.pro;
      acc.fib += t.fib;
      acc.sat += t.sat;
      acc.pri += t.pri;
      return acc;
    }, { cal: 0, pro: 0, fib: 0, sat: 0, pri: 0 });

    totalsEls.cal.textContent = totals.cal.toFixed(0);
    totalsEls.pro.textContent = totals.pro.toFixed(1);
    totalsEls.fib.textContent = totals.fib.toFixed(1);
    totalsEls.sat.textContent = totals.sat.toFixed(1);
    totalsEls.pri.textContent = format.euros(totals.pri);
    totalsEls.priMo.textContent = format.eurosMonth(totals.pri);

    const tgtCal = Number(targets.cal.value) || 0;
    const tgtPro = Number(targets.pro.value) || 0;
    const tgtFib = Number(targets.fib.value) || 0;
    const tgtSat = Number(targets.sat.value) || 0;

    const diffs = {
      cal: totals.cal - tgtCal,
      pro: totals.pro - tgtPro,
      fib: totals.fib - tgtFib,
      sat: totals.sat - tgtSat
    };

    const sign = (v) => (v >= 0 ? "+" : "");

    const diffMap = [
      { el: totalsEls.diffCal, diff: diffs.cal, excessBad: true, unit: " kcal" },
      { el: totalsEls.diffPro, diff: diffs.pro, excessBad: false, unit: " g" },
      { el: totalsEls.diffFib, diff: diffs.fib, excessBad: false, unit: " g" },
      { el: totalsEls.diffSat, diff: diffs.sat, excessBad: true, unit: " g" }
    ];

    diffMap.forEach(({ el, diff, excessBad, unit }) => {
      el.textContent = `${sign(diff)}${diff.toFixed(1)}${unit}`;
      el.style.backgroundColor = diffColor(diff, excessBad);
      el.style.color = "#111";
    });
  }

  Object.values(targets).forEach((input) => {
    input.addEventListener("input", updateDayTotals);
  });

  updateDayTotals();
}

window.addEventListener("DOMContentLoaded", initApp);
