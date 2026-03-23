const MAX_SLIDER = 500;

const format = {
  kcal: (v) => `${v.toFixed(0)} kcal`,
  grams: (v) => `${v.toFixed(1)} g`,
  euros: (v) => `€${v.toFixed(2)}`,
  eurosMonth: (v) => `€${(v * 30).toFixed(2)}`
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
  if (!data) return { cal: 0, pro: 0, fat: 0, sat: 0, carb: 0, sug: 0, sal: 0, fib: 0, ifib: 0, pri: 0 };
  const referenceWeight = data.reference_weight ?? 100;
  const saleWeight = data.amount;
  const cal = data.calorie * amount / referenceWeight;
  const pro = data.protein * amount / referenceWeight;
  const fat = (data.total_fat ?? 0) * amount / referenceWeight;
  const fib = data.fiber * amount / referenceWeight;
  const ifib = (data.insoluble_fiber ?? 0) * amount / referenceWeight;
  const sat = data.sat_fat * amount / referenceWeight;
  const carb = (data.total_carb ?? 0) * amount / referenceWeight;
  const sug = (data.sugars ?? 0) * amount / referenceWeight;
  const sal = (data.salt ?? 0) * amount / referenceWeight;
  const unitPrice = data.price / saleWeight;
  const pri = unitPrice * amount;
  return { cal, pro, fat, sat, carb, sug, sal, fib, ifib, pri };
}

class MealPanel {
  constructor(container, title, copySource = null, onChange) {
    this.container = container;
    this.title = title;
    this.copySource = copySource;
    this.onChange = onChange;
    this.rows = [];
    this.isTied = false;
    this.tieBtn = null;

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
      this.tieBtn = document.createElement("button");
      this.tieBtn.className = "copy-btn";
      this._updateTieButtonLabel();
      this.tieBtn.addEventListener("click", () => this.toggleTie());
      header.appendChild(this.tieBtn);
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
    this._populateSelectOptions(select);
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
      } else {
        this._showRowControls(row, false);
        this._updateRow(row);
      }
      this._ensureTrailingEmptyRow();
      this._emitChange();
    });

    slider.addEventListener("input", (e) => syncAmount(e.target.value));
    spin.addEventListener("input", (e) => syncAmount(e.target.value));

    this._showRowControls(row, false);
    return row;
  }

  _populateSelectOptions(selectEl, selectedValue = "") {
    selectEl.innerHTML = `<option value="">— add ingredient —</option>`;
    Object.keys(INGREDIENTS).sort().forEach((name) => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      selectEl.appendChild(opt);
    });
    selectEl.value = selectedValue;
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

    this._ensureTrailingEmptyRow();

    this._emitChange();
  }

  _ensureTrailingEmptyRow() {
    while (this.rows.length > 1) {
      const last = this.rows[this.rows.length - 1];
      const beforeLast = this.rows[this.rows.length - 2];
      if (!last.name && !beforeLast.name) {
        last.el.remove();
        this.rows.pop();
      } else {
        break;
      }
    }

    if (this.rows.length === 0 || this.rows[this.rows.length - 1].name) {
      this._addEmptyRow();
    }
  }

  _emitChange() {
    this._renderTotals();
    if (this.onChange) this.onChange(this);
  }

  getTotals() {
    return this.rows.reduce((acc, row) => {
      if (!row.name) return acc;
      const { cal, pro, fat, sat, carb, sug, sal, fib, ifib, pri } = getMacros(row.name, row.amount);
      acc.cal += cal;
      acc.pro += pro;
      acc.fat += fat;
      acc.carb += carb;
      acc.sug += sug;
      acc.sal += sal;
      acc.fib += fib;
      acc.ifib += ifib;
      acc.sat += sat;
      acc.pri += pri;
      return acc;
    }, { cal: 0, pro: 0, fat: 0, sat: 0, carb: 0, sug: 0, sal: 0, fib: 0, ifib: 0, pri: 0 });
  }

  getState() {
    return this.rows.filter((row) => row.name).map((row) => ({ name: row.name, amount: row.amount }));
  }

  loadState(state, { silent = false } = {}) {
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
    if (silent) {
      this._renderTotals();
      return;
    }
    this._emitChange();
  }

  refreshIngredientOptions() {
    this.rows.forEach((row) => {
      this._populateSelectOptions(row.select, row.name);
      if (row.name && !INGREDIENTS[row.name]) {
        row.name = "";
        row.select.value = "";
      }
      this._showRowControls(row, Boolean(row.name));
      this._updateRow(row);
    });
    this._ensureTrailingEmptyRow();
    this._emitChange();
  }

  _updateTieButtonLabel() {
    if (!this.tieBtn || !this.copySource) return;
    if (this.isTied) {
      this.tieBtn.textContent = "Untie";
      return;
    }
    this.tieBtn.textContent = `Tie to ${this.copySource.title}`;
  }

  toggleTie() {
    if (!this.copySource) return;
    this.isTied = !this.isTied;
    this._updateTieButtonLabel();
    if (this.isTied) {
      const state = this.copySource.getState();
      this.loadState(state);
      return;
    }
    this._emitChange();
  }

  isTiedToSource() {
    return Boolean(this.copySource) && this.isTied;
  }
}

function initApp() {
  const mealsContainer = document.getElementById("meals-container");
  const addMealBtn = document.getElementById("add-meal-btn");
  const meals = [];
  let isSyncingTiedMeals = false;

  function syncTiedMeals(changedMeal = null) {
    if (isSyncingTiedMeals) return;
    const firstMeal = meals[0];
    if (!firstMeal) return;

    const tiedMeals = meals.filter((meal, index) => index > 0 && meal.isTiedToSource());
    if (tiedMeals.length === 0) return;

    isSyncingTiedMeals = true;
    try {
      const changedIsTiedMeal = Boolean(changedMeal) && changedMeal !== firstMeal && changedMeal.isTiedToSource();

      if (changedIsTiedMeal) {
        firstMeal.loadState(changedMeal.getState(), { silent: true });
      }

      const sourceState = firstMeal.getState();
      tiedMeals.forEach((meal) => {
        if (meal === changedMeal && changedIsTiedMeal) return;
        meal.loadState(sourceState, { silent: true });
      });
    } finally {
      isSyncingTiedMeals = false;
    }
  }

  function createMeal(initialState = null) {
    const mealIndex = meals.length + 1;
    const mealSection = document.createElement("section");
    mealSection.className = "meal-panel";
    mealsContainer.appendChild(mealSection);

    const firstMeal = meals[0] ?? null;
    const copySource = mealIndex > 1 ? firstMeal : null;
    let meal;
    meal = new MealPanel(mealSection, `Meal ${mealIndex}`, copySource, (changedMeal) => updateDayTotals(changedMeal));
    if (initialState && Array.isArray(initialState)) {
      meal.loadState(initialState, { silent: true });
    }
    meals.push(meal);
    return meal;
  }

  function clearMeals() {
    meals.forEach((meal) => {
      meal.container.remove();
    });
    meals.length = 0;
  }

  function buildPlannerState() {
    return {
      targets: {
        cal: Number(targets.cal.value) || 0,
        pro: Number(targets.pro.value) || 0,
        fat: Number(targets.fat.value) || 0,
        carb: Number(targets.carb.value) || 0,
        sug: Number(targets.sug.value) || 0,
        sal: Number(targets.sal.value) || 0,
        fib: Number(targets.fib.value) || 0,
        ifib: Number(targets.ifib.value) || 0,
        sat: Number(targets.sat.value) || 0
      },
      meals: meals.map((meal) => meal.getState())
    };
  }

  function loadPlannerState(state) {
    if (!state || typeof state !== "object") return false;

    const incomingTargets = state.targets ?? {};
    const incomingMeals = Array.isArray(state.meals) ? state.meals : [];

    targets.cal.value = String(Number(incomingTargets.cal) || 0);
    targets.pro.value = String(Number(incomingTargets.pro) || 0);
    targets.fat.value = String(Number(incomingTargets.fat) || 0);
    targets.carb.value = String(Number(incomingTargets.carb) || 0);
    targets.sug.value = String(Number(incomingTargets.sug) || 0);
    targets.sal.value = String(Number(incomingTargets.sal) || 0);
    targets.fib.value = String(Number(incomingTargets.fib) || 0);
    targets.ifib.value = String(Number(incomingTargets.ifib) || 0);
    targets.sat.value = String(Number(incomingTargets.sat) || 0);

    clearMeals();

    if (incomingMeals.length === 0) {
      createMeal();
    } else {
      incomingMeals.forEach((mealState) => {
        const validMealState = Array.isArray(mealState)
          ? mealState
            .filter((item) => item && typeof item.name === "string" && Number.isFinite(Number(item.amount)))
            .map((item) => ({ name: item.name, amount: Number(item.amount) }))
          : [];
        createMeal(validMealState);
      });
    }

    updateDayTotals();
    return true;
  }

  createMeal();

  const editorView = document.getElementById("data-editor-view");
  const editBtn = document.getElementById("edit-data-btn");
  const addRowBtn = document.getElementById("add-row-btn");
  const saveBtn = document.getElementById("save-data-btn");
  const tableBody = document.getElementById("data-table-body");
  const importExportBtn = document.getElementById("import-export-btn");
  const importExportView = document.getElementById("import-export-view");
  const stateJson = document.getElementById("state-json");
  const loadStateBtn = document.getElementById("load-state-btn");

  const targets = {
    cal: document.getElementById("target-cal"),
    pro: document.getElementById("target-pro"),
    fat: document.getElementById("target-fat"),
    fib: document.getElementById("target-fib"),
    sat: document.getElementById("target-sat"),
    carb: document.getElementById("target-carb"),
    sug: document.getElementById("target-sug"),
    sal: document.getElementById("target-sal"),
    ifib: document.getElementById("target-ifib")
  };

  const totalsEls = {
    cal: document.getElementById("day-cal"),
    pro: document.getElementById("day-pro"),
    fat: document.getElementById("day-fat"),
    fib: document.getElementById("day-fib"),
    ifib: document.getElementById("day-ifib"),
    sat: document.getElementById("day-sat"),
    carb: document.getElementById("day-carb"),
    sug: document.getElementById("day-sug"),
    sal: document.getElementById("day-sal"),
    pri: document.getElementById("day-pri"),
    priMo: document.getElementById("day-pri-mo"),
    targetCal: document.getElementById("target-cal-view"),
    targetPro: document.getElementById("target-pro-view"),
    targetFat: document.getElementById("target-fat-view"),
    targetFib: document.getElementById("target-fib-view"),
    targetIfib: document.getElementById("target-ifib-view"),
    targetSat: document.getElementById("target-sat-view"),
    targetCarb: document.getElementById("target-carb-view"),
    targetSug: document.getElementById("target-sug-view"),
    targetSal: document.getElementById("target-sal-view")
  };

  function updateDayTotals(changedMeal = null) {
    syncTiedMeals(changedMeal);

    const totals = meals.reduce((acc, meal) => {
      const t = meal.getTotals();
      acc.cal += t.cal;
      acc.pro += t.pro;
      acc.fat += t.fat;
      acc.carb += t.carb;
      acc.sug += t.sug;
      acc.sal += t.sal;
      acc.fib += t.fib;
      acc.ifib += t.ifib;
      acc.sat += t.sat;
      acc.pri += t.pri;
      return acc;
    }, { cal: 0, pro: 0, fat: 0, sat: 0, carb: 0, sug: 0, sal: 0, fib: 0, ifib: 0, pri: 0 });

    totalsEls.cal.textContent = totals.cal.toFixed(0);
    totalsEls.pro.textContent = totals.pro.toFixed(1);
    totalsEls.fat.textContent = totals.fat.toFixed(1);
    totalsEls.fib.textContent = totals.fib.toFixed(1);
    totalsEls.ifib.textContent = totals.ifib.toFixed(1);
    totalsEls.sat.textContent = totals.sat.toFixed(1);
    totalsEls.carb.textContent = totals.carb.toFixed(1);
    totalsEls.sug.textContent = totals.sug.toFixed(1);
    totalsEls.sal.textContent = totals.sal.toFixed(1);
    totalsEls.pri.textContent = format.euros(totals.pri);
    totalsEls.priMo.textContent = format.eurosMonth(totals.pri);

    const tgtCal = Number(targets.cal.value) || 0;
    const tgtPro = Number(targets.pro.value) || 0;
    const tgtFat = Number(targets.fat.value) || 0;
    const tgtCarb = Number(targets.carb.value) || 0;
    const tgtSug = Number(targets.sug.value) || 0;
    const tgtSal = Number(targets.sal.value) || 0;
    const tgtFib = Number(targets.fib.value) || 0;
    const tgtIfib = Number(targets.ifib.value) || 0;
    const tgtSat = Number(targets.sat.value) || 0;

    totalsEls.targetCal.textContent = tgtCal.toFixed(0);
    totalsEls.targetPro.textContent = tgtPro.toFixed(1);
    totalsEls.targetFat.textContent = tgtFat.toFixed(1);
    totalsEls.targetFib.textContent = tgtFib.toFixed(1);
    totalsEls.targetIfib.textContent = tgtIfib.toFixed(1);
    totalsEls.targetSat.textContent = tgtSat.toFixed(1);
    totalsEls.targetCarb.textContent = tgtCarb.toFixed(1);
    totalsEls.targetSug.textContent = tgtSug.toFixed(1);
    totalsEls.targetSal.textContent = tgtSal.toFixed(1);

    const diffs = {
      cal: totals.cal - tgtCal,
      pro: totals.pro - tgtPro,
      fat: totals.fat - tgtFat,
      carb: totals.carb - tgtCarb,
      sug: totals.sug - tgtSug,
      sal: totals.sal - tgtSal,
      fib: totals.fib - tgtFib,
      ifib: totals.ifib - tgtIfib,
      sat: totals.sat - tgtSat
    };

    const colorMap = [
      { el: totalsEls.cal, diff: diffs.cal, excessBad: true },
      { el: totalsEls.pro, diff: diffs.pro, excessBad: false },
      { el: totalsEls.fat, diff: diffs.fat, excessBad: true },
      { el: totalsEls.carb, diff: diffs.carb, excessBad: false },
      { el: totalsEls.sug, diff: diffs.sug, excessBad: true },
      { el: totalsEls.sal, diff: diffs.sal, excessBad: true },
      { el: totalsEls.fib, diff: diffs.fib, excessBad: false },
      { el: totalsEls.ifib, diff: diffs.ifib, excessBad: false },
      { el: totalsEls.sat, diff: diffs.sat, excessBad: true }
    ];

    colorMap.forEach(({ el, diff, excessBad }) => {
      el.style.backgroundColor = diffColor(diff, excessBad);
      el.style.color = "#111";
    });
  }

  Object.values(targets).forEach((input) => {
    input.addEventListener("input", updateDayTotals);
  });

  function toggleEditorView() {
    const willOpen = editorView.classList.contains("hidden");
    editorView.classList.toggle("hidden", !willOpen);
    if (willOpen) {
      renderDataTable();
    }
  }

  function toggleImportExportView() {
    const willOpen = importExportView.classList.contains("hidden");
    importExportView.classList.toggle("hidden", !willOpen);
    if (willOpen) {
      stateJson.value = JSON.stringify(buildPlannerState(), null, 2);
    }
  }

  function applyImportedState() {
    try {
      const parsed = JSON.parse(stateJson.value);
      const ok = loadPlannerState(parsed);
      if (!ok) {
        window.alert("Invalid state format.");
        return;
      }
      stateJson.value = JSON.stringify(buildPlannerState(), null, 2);
    } catch {
      window.alert("Could not parse JSON.");
    }
  }

  function createCellInput(value, type = "number") {
    const input = document.createElement("input");
    input.type = type;
    input.value = value;
    return input;
  }

  function createDataRow(name = "", data = {}) {
    const tr = document.createElement("tr");
    const nameTd = document.createElement("td");
    const calTd = document.createElement("td");
    const proTd = document.createElement("td");
    const fibTd = document.createElement("td");
    const satTd = document.createElement("td");
    const refTd = document.createElement("td");
    const amtTd = document.createElement("td");
    const priTd = document.createElement("td");
    const delTd = document.createElement("td");

    const nameInput = createCellInput(name, "text");
    nameTd.appendChild(nameInput);
    calTd.appendChild(createCellInput(data.calorie ?? ""));
    proTd.appendChild(createCellInput(data.protein ?? ""));
    fibTd.appendChild(createCellInput(data.fiber ?? ""));
    satTd.appendChild(createCellInput(data.sat_fat ?? ""));
    refTd.appendChild(createCellInput(data.reference_weight ?? 100));
    amtTd.appendChild(createCellInput(data.amount ?? ""));
    priTd.appendChild(createCellInput(data.price ?? ""));

    const delBtn = document.createElement("button");
    delBtn.className = "delete-row";
    delBtn.textContent = "X";
    delBtn.addEventListener("click", () => tr.remove());
    delTd.appendChild(delBtn);

    tr.append(nameTd, calTd, proTd, fibTd, satTd, refTd, amtTd, priTd, delTd);
    tableBody.appendChild(tr);
  }

  function renderDataTable() {
    tableBody.innerHTML = "";
    Object.keys(INGREDIENTS).sort().forEach((name) => {
      createDataRow(name, INGREDIENTS[name]);
    });
  }

  function applyDataChanges() {
    const updated = {};
    Array.from(tableBody.querySelectorAll("tr")).forEach((tr) => {
      const inputs = Array.from(tr.querySelectorAll("input"));
      const [nameInput, calInput, proInput, fibInput, satInput, refInput, amtInput, priInput] = inputs;
      const name = nameInput.value.trim();
      if (!name) return;

      const calorie = Number(calInput.value);
      const protein = Number(proInput.value);
      const fiber = Number(fibInput.value);
      const sat_fat = Number(satInput.value);
      const reference_weight = Number(refInput.value);
      const amount = Number(amtInput.value);
      const price = Number(priInput.value);

      if ([calorie, protein, fiber, sat_fat, reference_weight, amount, price].some((v) => Number.isNaN(v))) {
        return;
      }

      updated[name] = { calorie, protein, fiber, sat_fat, reference_weight, amount, price };
    });

    Object.keys(INGREDIENTS).forEach((key) => delete INGREDIENTS[key]);
    Object.assign(INGREDIENTS, updated);

    meals.forEach((meal) => meal.refreshIngredientOptions());
    updateDayTotals();
  }

  editBtn.addEventListener("click", toggleEditorView);
  saveBtn.addEventListener("click", applyDataChanges);
  importExportBtn.addEventListener("click", toggleImportExportView);
  loadStateBtn.addEventListener("click", applyImportedState);
  addRowBtn.addEventListener("click", () => {
    if (editorView.classList.contains("hidden")) {
      toggleEditorView();
    }
    createDataRow("", {});
  });
  addMealBtn.addEventListener("click", createMeal);

  updateDayTotals();
}

window.addEventListener("DOMContentLoaded", initApp);
