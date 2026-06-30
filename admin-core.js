/* ============================================================
   روايات البناء — محرك الوحدات الإدارية الموحّد (Admin Core)
   يبني وحدة إدارية كاملة من إعدادات تعريفية (window.cfg):
   بطاقات مؤشرات + رسوم بيانية + جدول تفاعلي (إضافة/تعديل/حذف/حفظ)
   + بحث فوري + فرز بالأعمدة + حفظ تلقائي (localStorage) + تصدير CSV.
   ============================================================ */
(function () {
  "use strict";
  const cfg = window.cfg;
  if (!cfg) { console.error("admin-core: window.cfg غير معرّف"); return; }

  /* ---------- أدوات مساعدة ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const money = n => Number(n || 0).toLocaleString("en-US");
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
  const sum = (d, k) => d.reduce((a, x) => a + (Number(x[k]) || 0), 0);
  const avg = (d, k) => d.length ? Math.round(sum(d, k) / d.length) : 0;
  const count = (d, fn) => fn ? d.filter(fn).length : d.length;
  const groupCount = (d, k) => { const m = {}; d.forEach(x => { const v = x[k] || "—"; m[v] = (m[v] || 0) + 1; }); return { labels: Object.keys(m), data: Object.values(m) }; };
  const groupSum = (d, k, vk) => { const m = {}; d.forEach(x => { const v = x[k] || "—"; m[v] = (m[v] || 0) + (Number(x[vk]) || 0); }); return { labels: Object.keys(m), data: Object.values(m) }; };
  window.AC = { money, sum, avg, count, groupCount, groupSum }; // متاح للإعدادات

  const GRAD = {
    maroon: "from-[#8E2E3A] to-[#b8434f]", orange: "from-[#EA7A2C] to-[#F2A05C]",
    green: "from-emerald-500 to-emerald-400", blue: "from-blue-500 to-sky-400",
    purple: "from-violet-500 to-purple-400", red: "from-rose-500 to-red-400",
    teal: "from-teal-500 to-cyan-400", amber: "from-amber-500 to-yellow-400"
  };
  const BADGE = {
    orange: "bg-orange-100 text-orange-700", green: "bg-emerald-100 text-emerald-700",
    red: "bg-rose-100 text-rose-700", blue: "bg-blue-100 text-blue-700",
    gray: "bg-gray-100 text-gray-600", purple: "bg-violet-100 text-violet-700",
    amber: "bg-amber-100 text-amber-700", maroon: "bg-[#8E2E3A]/10 text-[#8E2E3A]"
  };
  const PALETTE = ["#8E2E3A", "#EA7A2C", "#3b82f6", "#10b981", "#8b5cf6", "#ef4444", "#14b8a6", "#f59e0b", "#64748b"];

  /* ---------- الحالة ---------- */
  let DATA = loadData(), editingId = null, search = "", sortKey = null, sortDir = 1, toDelete = null;
  let view = loadView();
  const charts = [];

  function loadView() { try { const v = localStorage.getItem(cfg.key + "_view"); if (v === "cards" || v === "table") return v; } catch (e) {} return cfg.view === "cards" ? "cards" : "table"; }
  function genId() { return "r" + Math.random().toString(36).slice(2, 9); }
  function loadData() {
    try { const r = localStorage.getItem(cfg.key); if (r) return JSON.parse(r); } catch (e) {}
    return (cfg.seed || []).map(x => ({ _id: genId(), ...x }));
  }
  function persist() { try { localStorage.setItem(cfg.key, JSON.stringify(DATA)); } catch (e) {} }

  /* ---------- بناء الهيكل ---------- */
  function buildLayout() {
    const root = $("#appRoot") || document.body;
    root.innerHTML = `
    <div class="max-w-7xl mx-auto">
      <!-- العنوان -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${GRAD[cfg.color] || GRAD.maroon} shadow-lg">
            <i class="ph ${cfg.icon || "ph-folder"} text-3xl"></i>
          </div>
          <div>
            <h1 class="text-2xl font-extrabold text-[#8E2E3A]">${esc(cfg.title)}</h1>
            <p class="text-gray-500 text-sm">${esc(cfg.subtitle || "")}</p>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-2 justify-end">
          <div class="flex bg-gray-100 rounded-xl p-0.5" title="نمط العرض">
            <button id="viewTable" class="px-3 py-2 rounded-lg text-sm transition" title="عرض جدول"><i class="ph ph-table"></i></button>
            <button id="viewCards" class="px-3 py-2 rounded-lg text-sm transition" title="عرض بطاقات"><i class="ph ph-squares-four"></i></button>
          </div>
          <div class="relative">
            <i class="ph ph-magnifying-glass absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input id="search" placeholder="بحث فوري..." class="pr-9 pl-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm w-36 sm:w-48 focus:outline-none focus:ring-2 focus:ring-[#EA7A2C]/30 focus:border-[#EA7A2C] transition">
          </div>
          <button id="btnExport" class="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-[#8E2E3A] hover:text-[#8E2E3A] transition flex items-center gap-1.5" title="تصدير Excel/CSV"><i class="ph ph-file-csv text-lg"></i><span class="hidden sm:inline">تصدير</span></button>
          <button id="btnReset" class="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-rose-400 hover:text-rose-500 transition" title="استعادة البيانات الأصلية"><i class="ph ph-arrow-counter-clockwise text-lg"></i></button>
          <button id="btnAdd" class="px-4 py-2.5 bg-gradient-to-l from-[#8E2E3A] to-[#b8434f] text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-[#8E2E3A]/20 transition flex items-center gap-1.5"><i class="ph ph-plus-circle text-lg"></i> إضافة</button>
        </div>
      </div>

      <!-- مؤشرات الأداء -->
      <div id="kpis" class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"></div>

      <!-- الرسوم البيانية -->
      <div id="charts" class="grid grid-cols-1 ${(cfg.charts && cfg.charts.length > 1) ? "lg:grid-cols-2" : ""} gap-5 mb-6"></div>

      <!-- السجلات: جدول أو بطاقات (حسب نمط العرض) -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-l from-gray-50 to-white">
          <h3 class="font-bold text-gray-800 flex items-center gap-2"><i class="ph ph-rows text-[#EA7A2C]"></i> السجلات <span class="text-xs font-normal text-gray-400">(<span id="count">0</span>)</span></h3>
          <span id="viewHint" class="text-xs text-gray-400 hidden sm:flex items-center gap-1"></span>
        </div>
        <div id="listHost"></div>
      </div>
    </div>

    <!-- إشعار -->
    <div id="toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 translate-y-20 opacity-0 transition-all duration-300 z-[80] px-5 py-3 rounded-xl shadow-2xl text-white font-bold text-sm flex items-center gap-2"></div>

    <!-- تأكيد الحذف -->
    <div id="confirm" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] hidden items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center scale-95 opacity-0 transition-all duration-200" id="confirmBox">
        <div class="w-14 h-14 mx-auto mb-3 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center"><i class="ph ph-trash text-2xl"></i></div>
        <h3 class="font-bold text-gray-800 mb-1">تأكيد الحذف</h3>
        <p class="text-gray-500 text-sm mb-5">سيتم حذف هذا السجل نهائيًا. هل تريد المتابعة؟</p>
        <div class="flex gap-2">
          <button id="confirmYes" class="flex-1 bg-rose-500 text-white font-bold py-2 rounded-lg hover:bg-rose-600 transition">نعم، احذف</button>
          <button id="confirmNo" class="flex-1 bg-gray-100 text-gray-600 font-bold py-2 rounded-lg hover:bg-gray-200 transition">إلغاء</button>
        </div>
      </div>
    </div>`;
  }

  /* ---------- مؤشرات الأداء ---------- */
  function renderKPIs() {
    $("#kpis").innerHTML = (cfg.kpis || []).map(k => `
      <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${GRAD[k.color] || GRAD.maroon} shrink-0"><i class="ph ${k.icon} text-2xl"></i></div>
        <div class="min-w-0">
          <p class="text-gray-400 text-xs mb-0.5 truncate">${esc(k.label)}</p>
          <h3 class="text-xl font-extrabold text-gray-800 truncate">${k.calc(DATA)}</h3>
        </div>
      </div>`).join("");
  }

  /* ---------- الرسوم البيانية ---------- */
  function renderCharts() {
    const host = $("#charts");
    if (!host) return;
    if (!cfg.charts || !cfg.charts.length) { host.style.display = "none"; return; }
    host.style.display = "";
    // انتظار تحميل مكتبة Chart.js من الـCDN قبل الرسم (تفادي سباق التحميل)
    if (typeof Chart === "undefined") { setTimeout(renderCharts, 200); return; }
    if (!host.dataset.built) {
      host.innerHTML = cfg.charts.map((c, i) => `
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 class="font-bold text-gray-700 text-sm mb-3 flex items-center gap-2"><i class="ph ${c.icon || "ph-chart-pie-slice"} text-[#8E2E3A]"></i> ${esc(c.title)}</h3>
          <div class="relative" style="height:240px"><canvas id="chart_${i}"></canvas></div>
        </div>`).join("");
      host.dataset.built = "1";
    }
    cfg.charts.forEach((c, i) => {
      const res = c.calc(DATA) || { labels: [], data: [] };
      if (charts[i]) {
        charts[i].data.labels = res.labels;
        charts[i].data.datasets[0].data = res.data;
        charts[i].update();
        return;
      }
      const ctx = $("#chart_" + i);
      const type = c.type || "doughnut";
      const colors = res.labels.map((_, j) => PALETTE[j % PALETTE.length]);
      charts[i] = new Chart(ctx, {
        type,
        data: {
          labels: res.labels,
          datasets: [{
            label: c.title, data: res.data,
            backgroundColor: type === "line" ? "rgba(243,128,49,.15)" : colors,
            borderColor: type === "line" ? "#EA7A2C" : (type === "bar" ? colors : "#fff"),
            borderWidth: type === "doughnut" ? 3 : 2,
            borderRadius: type === "bar" ? 8 : 0,
            fill: type === "line", tension: .35, pointBackgroundColor: "#8E2E3A"
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: type === "doughnut", position: "bottom", labels: { font: { family: "Tajawal", size: 12 }, padding: 14, usePointStyle: true } } },
          scales: (type === "doughnut") ? {} : {
            y: { beginAtZero: true, grid: { color: "#f1f5f9" }, ticks: { font: { family: "Tajawal" } } },
            x: { grid: { display: false }, ticks: { font: { family: "Tajawal" } } }
          }
        }
      });
    });
  }

  /* ---------- الجدول ---------- */
  function cellDisplay(c, v) {
    if (c.type === "progress") {
      const p = Math.max(0, Math.min(100, Number(v) || 0));
      const col = p >= 100 ? "#10b981" : p >= 50 ? "#EA7A2C" : "#8E2E3A";
      return `<div class="flex items-center gap-2 min-w-[110px]"><div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden"><div class="h-full rounded-full transition-all" style="width:${p}%;background:${col}"></div></div><span class="text-xs font-bold text-gray-600 w-8">${p}%</span></div>`;
    }
    if (c.type === "badge") { const col = (c.colors && c.colors[v]) || "gray"; return `<span class="px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${BADGE[col] || BADGE.gray}">${esc(v) || "—"}</span>`; }
    if (c.type === "money") return `<span class="font-bold text-gray-800 whitespace-nowrap">${money(v)} <span class="text-[10px] text-gray-400">ر.س</span></span>`;
    if (c.type === "number") return `<span class="font-bold text-gray-800">${money(v)}</span>`;
    return `<span class="text-gray-700">${esc(v) || "—"}</span>`;
  }
  function cellInput(c, v) {
    const base = "w-full bg-white border border-[#EA7A2C]/60 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA7A2C]/25";
    if (c.type === "badge") return `<select data-k="${c.key}" class="${base}">${c.options.map(o => `<option ${o === v ? "selected" : ""}>${esc(o)}</option>`).join("")}</select>`;
    if (c.type === "date") return `<input data-k="${c.key}" type="date" value="${esc(v)}" class="${base}">`;
    if (c.type === "number" || c.type === "money" || c.type === "progress") return `<input data-k="${c.key}" type="number" value="${Number(v) || 0}" class="${base} text-center">`;
    return `<input data-k="${c.key}" type="text" value="${esc(v)}" class="${base}">`;
  }
  function rowHtml(item) {
    const editing = item._id === editingId;
    const cells = cfg.columns.map(c => `<td class="py-2.5 px-3 align-middle">${editing ? cellInput(c, item[c.key]) : cellDisplay(c, item[c.key])}</td>`).join("");
    const actions = editing
      ? `<button onclick="ADM.save('${item._id}')" class="text-emerald-600 hover:bg-emerald-100 p-1.5 rounded-lg transition" title="حفظ"><i class="ph ph-check-circle text-lg"></i></button>
         <button onclick="ADM.cancel()" class="text-gray-400 hover:bg-gray-100 p-1.5 rounded-lg transition" title="إلغاء"><i class="ph ph-x-circle text-lg"></i></button>`
      : `<button onclick="ADM.edit('${item._id}')" class="text-blue-600 hover:bg-blue-100 p-1.5 rounded-lg transition" title="تعديل"><i class="ph ph-pencil-simple text-lg"></i></button>
         <button onclick="ADM.ask('${item._id}')" class="text-rose-600 hover:bg-rose-100 p-1.5 rounded-lg transition" title="حذف"><i class="ph ph-trash text-lg"></i></button>`;
    return `<tr data-id="${item._id}" class="hover:bg-orange-50/40 transition-colors ${editing ? "bg-orange-50/60" : ""}">${cells}<td class="py-2.5 px-3 text-center whitespace-nowrap">${actions}</td></tr>`;
  }
  function getRows() {
    let rows = DATA.slice();
    if (search) { const q = search.toLowerCase(); rows = rows.filter(r => cfg.columns.some(c => String(r[c.key] ?? "").toLowerCase().includes(q))); }
    if (sortKey) rows.sort((a, b) => { const x = a[sortKey], y = b[sortKey]; const n = (typeof x === "number" || !isNaN(parseFloat(x))) && (typeof y === "number" || !isNaN(parseFloat(y))); const r = n ? (parseFloat(x) - parseFloat(y)) : String(x).localeCompare(String(y), "ar"); return r * sortDir; });
    return rows;
  }
  /* --- نمط الجدول --- */
  function tableMarkup(rows) {
    const head = cfg.columns.map(c => {
      const arrow = sortKey === c.key ? (sortDir === 1 ? " ▲" : " ▼") : "";
      return `<th class="py-3 px-3 font-bold whitespace-nowrap cursor-pointer hover:text-[#8E2E3A]" onclick="ADM.sort('${c.key}')">${esc(c.label)}<span class="text-[#EA7A2C]">${arrow}</span></th>`;
    }).join("") + `<th class="py-3 px-3 text-center w-24">الإجراءات</th>`;
    const body = rows.length ? rows.map(rowHtml).join("")
      : `<tr><td colspan="${cfg.columns.length + 1}" class="text-center py-12 text-gray-400"><i class="ph ph-tray text-4xl block mb-2"></i>لا توجد بيانات مطابقة</td></tr>`;
    return `<div class="overflow-x-auto"><table class="w-full text-right text-sm"><thead class="text-gray-500 bg-gray-50/60 border-b border-gray-100 select-none"><tr>${head}</tr></thead><tbody class="divide-y divide-gray-50">${body}</tbody></table></div>`;
  }
  /* --- نمط البطاقات --- */
  function cardHtml(item) {
    const editing = item._id === editingId;
    const cols = cfg.columns;
    const titleCol = cols.find(c => ["name", "title", "desc"].includes(c.key)) || cols.find(c => /اسم|البيان/.test(c.label)) || cols.find(c => c.type === "text") || cols[0];
    if (editing) {
      const fields = cols.map(c => `<div><label class="block text-[11px] text-gray-400 mb-0.5">${esc(c.label)}</label>${cellInput(c, item[c.key])}</div>`).join("");
      return `<div data-id="${item._id}" class="bg-white rounded-2xl border-2 border-[#EA7A2C] shadow-md p-4">
        <div class="grid grid-cols-2 gap-2.5 mb-3">${fields}</div>
        <div class="flex gap-2">
          <button onclick="ADM.save('${item._id}')" class="flex-1 bg-emerald-500 text-white text-sm font-bold py-1.5 rounded-lg hover:bg-emerald-600 transition flex items-center justify-center gap-1"><i class="ph ph-check-circle"></i> حفظ</button>
          <button onclick="ADM.cancel()" class="flex-1 bg-gray-100 text-gray-600 text-sm font-bold py-1.5 rounded-lg hover:bg-gray-200 transition">إلغاء</button>
        </div></div>`;
    }
    const others = cols.filter(c => c !== titleCol);
    const rowsHtml = others.map(c => {
      if (c.type === "progress") return `<div class="mt-2">${cellDisplay(c, item[c.key])}</div>`;
      return `<div class="flex items-center justify-between gap-2 py-0.5"><span class="text-gray-400 text-xs shrink-0">${esc(c.label)}</span><span class="text-left">${cellDisplay(c, item[c.key])}</span></div>`;
    }).join("");
    return `<div data-id="${item._id}" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col">
      <h4 class="font-extrabold text-gray-800 leading-snug mb-2 pb-2 border-b border-gray-50">${esc(item[titleCol.key]) || "—"}</h4>
      <div class="flex-1 space-y-0.5">${rowsHtml}</div>
      <div class="flex items-center justify-end gap-1 mt-3 pt-2 border-t border-gray-50">
        <button onclick="ADM.edit('${item._id}')" class="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition" title="تعديل"><i class="ph ph-pencil-simple text-lg"></i></button>
        <button onclick="ADM.ask('${item._id}')" class="text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition" title="حذف"><i class="ph ph-trash text-lg"></i></button>
      </div></div>`;
  }
  function cardsMarkup(rows) {
    if (!rows.length) return `<div class="text-center py-12 text-gray-400"><i class="ph ph-tray text-4xl block mb-2"></i>لا توجد بيانات مطابقة</div>`;
    return `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">${rows.map(cardHtml).join("")}</div>`;
  }
  function updateViewBtn() {
    const on = "px-3 py-2 rounded-lg text-sm transition bg-white shadow text-[#8E2E3A]", off = "px-3 py-2 rounded-lg text-sm transition text-gray-400 hover:text-gray-600";
    const t = $("#viewTable"), c = $("#viewCards");
    if (t) t.className = view === "table" ? on : off;
    if (c) c.className = view === "cards" ? on : off;
    const hint = $("#viewHint");
    if (hint) hint.innerHTML = view === "table" ? `<i class="ph ph-cursor-click"></i> اضغط عنوان العمود للفرز` : `<i class="ph ph-credit-card"></i> عرض البطاقات`;
  }
  function renderList() {
    updateViewBtn();
    const rows = getRows();
    $("#listHost").innerHTML = view === "cards" ? cardsMarkup(rows) : tableMarkup(rows);
    $("#count").textContent = DATA.length;
    if (editingId) { const el = $(`#listHost [data-id="${editingId}"] [data-k]`); el && el.focus(); }
  }
  function setView(v) { view = v; try { localStorage.setItem(cfg.key + "_view", v); } catch (e) {} renderList(); }

  function render() { renderKPIs(); renderCharts(); renderList(); }

  /* ---------- العمليات (CRUD) ---------- */
  const ADM = {
    add() {
      const it = { _id: genId() };
      cfg.columns.forEach(c => it[c.key] = (c.type === "number" || c.type === "money" || c.type === "progress") ? 0 : (c.type === "badge" ? c.options[0] : ""));
      if (cfg.onNew) cfg.onNew(it);
      DATA.unshift(it); editingId = it._id; search = ""; $("#search").value = ""; sortKey = null;
      render();
    },
    edit(id) { editingId = id; renderList(); },
    cancel() {
      const it = DATA.find(x => x._id === editingId);
      if (it && cfg.columns.every(c => !it[c.key] || it[c.key] === 0 || (c.type === "badge" && it[c.key] === c.options[0]))) DATA = DATA.filter(x => x._id !== editingId);
      editingId = null; render();
    },
    save(id) {
      const row = $(`#listHost [data-id="${id}"]`); if (!row) return;
      const it = DATA.find(x => x._id === id); if (!it) return;
      row.querySelectorAll("[data-k]").forEach(inp => {
        const k = inp.dataset.k, c = cfg.columns.find(c => c.key === k);
        it[k] = (c && (c.type === "number" || c.type === "money" || c.type === "progress")) ? (Number(inp.value) || 0) : inp.value.trim();
      });
      editingId = null; persist(); render(); toast("تم حفظ السجل بنجاح", "green");
    },
    ask(id) {
      if (DATA.length <= 1) { toast("لا يمكن حذف آخر سجل في الجدول", "red"); return; }
      toDelete = id; const m = $("#confirm"), b = $("#confirmBox");
      m.classList.remove("hidden"); m.classList.add("flex"); requestAnimationFrame(() => b.classList.remove("scale-95", "opacity-0"));
    },
    sort(k) { if (sortKey === k) sortDir *= -1; else { sortKey = k; sortDir = 1; } renderList(); },
    view: setView
  };
  window.ADM = ADM;

  function closeConfirm() { const m = $("#confirm"), b = $("#confirmBox"); b.classList.add("scale-95", "opacity-0"); setTimeout(() => { m.classList.add("hidden"); m.classList.remove("flex"); toDelete = null; }, 200); }

  let toastT;
  function toast(msg, color = "green") {
    const t = $("#toast"); const bg = { green: "bg-emerald-500", red: "bg-rose-500", blue: "bg-blue-500", orange: "bg-[#EA7A2C]" }[color] || "bg-gray-800";
    const ic = { green: "ph-check-circle", red: "ph-warning-circle", blue: "ph-info", orange: "ph-bell" }[color] || "ph-info";
    t.className = `fixed bottom-6 left-1/2 -translate-x-1/2 transition-all duration-300 z-[80] px-5 py-3 rounded-xl shadow-2xl text-white font-bold text-sm flex items-center gap-2 ${bg}`;
    t.innerHTML = `<i class="ph ${ic} text-lg"></i> ${esc(msg)}`;
    requestAnimationFrame(() => { t.style.transform = "translate(-50%,0)"; t.style.opacity = "1"; });
    clearTimeout(toastT); toastT = setTimeout(() => { t.style.transform = "translate(-50%,5rem)"; t.style.opacity = "0"; }, 2600);
  }

  function exportCSV() {
    const head = cfg.columns.map(c => c.label);
    const rows = DATA.map(it => cfg.columns.map(c => { let v = it[c.key]; v = String(v ?? ""); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }));
    const csv = "﻿" + [head, ...rows].map(r => r.join(",")).join("\r\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    a.download = (cfg.title || "data") + ".csv"; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast("تم تصدير الملف", "blue");
  }

  /* ---------- الربط ---------- */
  function bind() {
    $("#btnAdd").onclick = () => ADM.add();
    $("#btnExport").onclick = exportCSV;
    $("#btnReset").onclick = () => { if (confirm("استعادة البيانات الأصلية وحذف تعديلاتك في هذه الوحدة؟")) { localStorage.removeItem(cfg.key); DATA = loadData(); editingId = null; render(); toast("تمت استعادة البيانات الأصلية", "orange"); } };
    $("#viewTable").onclick = () => setView("table");
    $("#viewCards").onclick = () => setView("cards");
    let st; $("#search").oninput = e => { clearTimeout(st); st = setTimeout(() => { search = e.target.value; renderList(); }, 150); };
    $("#confirmYes").onclick = () => { if (toDelete) { DATA = DATA.filter(x => x._id !== toDelete); persist(); closeConfirm(); render(); toast("تم حذف السجل", "red"); } };
    $("#confirmNo").onclick = closeConfirm;
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") { if (!$("#confirm").classList.contains("hidden")) closeConfirm(); else if (editingId) ADM.cancel(); }
      if (e.key === "Enter" && editingId) { const r = $(`#listHost [data-id="${editingId}"]`); if (r && r.contains(document.activeElement)) ADM.save(editingId); }
    });
  }

  function init() { buildLayout(); bind(); render(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
