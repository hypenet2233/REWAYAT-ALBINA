/* ============================================================
   روايات البناء — مصدر البيانات الموحّد (Single Source of Truth)
   تستخدمه وحدات الأقسام السبع ولوحة القيادة معًا، لضمان تطابق
   جميع البطاقات والأرقام مع الوجود الفعلي للبيانات.
   ملاحظة: أي تعديل يجريه المستخدم يُحفظ في localStorage (بمفتاح
   نفس القسم) ويُقرأ تلقائيًا فيتقدّم على هذه القيم الأساسية.
   ============================================================ */
window.RB_SEED = {
  rb_contracting: [
    { ref: "PRJ-1042", name: "برج العليا التجاري", client: "مجموعة الفيصلية", location: "الرياض", value: 8500000, progress: 65, status: "قيد التنفيذ", due: "2026-12-20" },
    { ref: "PRJ-1039", name: "مجمع نيوم السكني", client: "شركة نيوم", location: "تبوك", value: 14200000, progress: 30, status: "قيد التنفيذ", due: "2027-06-15" },
    { ref: "PRJ-1035", name: "فلل الياسمين", client: "أملاك القابضة", location: "جدة", value: 6200000, progress: 100, status: "مكتمل", due: "2026-03-10" },
    { ref: "PRJ-1031", name: "مستودعات الدمام اللوجستية", client: "موانئ الشرقية", location: "الدمام", value: 4800000, progress: 0, status: "جديد", due: "2027-01-05" },
    { ref: "PRJ-1028", name: "مدرسة الأمير سلطان", client: "وزارة التعليم", location: "أبها", value: 3100000, progress: 45, status: "متوقف", due: "2026-09-30" },
    { ref: "PRJ-1024", name: "توسعة مصنع الإسمنت", client: "إسمنت الجنوب", location: "جازان", value: 9700000, progress: 80, status: "قيد التنفيذ", due: "2026-11-12" }
  ],
  rb_portables: [
    { code: "PB-2051", type: "برتبل", size: "6×12", qty: 4, unitPrice: 85000, stage: "قيد التصنيع", due: "2026-07-15" },
    { code: "PB-2050", type: "مسكن عمال", size: "3×6", qty: 10, unitPrice: 32000, stage: "جاهز", due: "2026-07-22" },
    { code: "PB-2048", type: "كبينة حراسة", size: "2×3", qty: 6, unitPrice: 12000, stage: "تم البيع", due: "2026-06-30" },
    { code: "PB-2045", type: "برتبل", size: "8×15", qty: 2, unitPrice: 145000, stage: "جديد", due: "2026-08-10" },
    { code: "PB-2043", type: "مسكن عمال", size: "4×8", qty: 8, unitPrice: 40000, stage: "قيد التصنيع", due: "2026-08-25" },
    { code: "PB-2040", type: "برتبل", size: "6×12", qty: 5, unitPrice: 90000, stage: "جاهز", due: "2026-07-05" }
  ],
  rb_warehouses: [
    { sku: "WH-501", item: "حديد تسليح 16مم", category: "حديد", qty: 1200, unit: "طن", location: "الرئيسي", minStock: 500, status: "متوفر" },
    { sku: "WH-502", item: "إسمنت مقاوم", category: "إسمنت", qty: 80, unit: "كيس", location: "الموقع", minStock: 150, status: "منخفض" },
    { sku: "WH-503", item: "كابل نحاس 4مم", category: "كهرباء", qty: 0, unit: "لفة", location: "الفرعي", minStock: 100, status: "نفذ" },
    { sku: "WH-504", item: "صوف صخري عازل", category: "عزل", qty: 320, unit: "لوح", location: "الرئيسي", minStock: 100, status: "متوفر" },
    { sku: "WH-505", item: "مواسير PVC 4 إنش", category: "سباكة", qty: 60, unit: "ماسورة", location: "الموقع", minStock: 80, status: "منخفض" },
    { sku: "WH-506", item: "دريل صناعي", category: "أدوات", qty: 18, unit: "قطعة", location: "الفرعي", minStock: 10, status: "متوفر" }
  ],
  rb_hr: [
    { id: "EMP-101", name: "ناصر عسيري", role: "المدير العام", dept: "الإدارة", salary: 32000, startDate: "2019-02-01", status: "نشط" },
    { id: "EMP-112", name: "سعد القحطاني", role: "مدير المشاريع", dept: "المشاريع", salary: 21000, startDate: "2020-06-15", status: "نشط" },
    { id: "EMP-118", name: "منى الزهراني", role: "محاسب أول", dept: "المالية", salary: 14500, startDate: "2021-09-01", status: "إجازة" },
    { id: "EMP-124", name: "خالد الشهري", role: "أخصائي موارد بشرية", dept: "الموارد البشرية", salary: 12000, startDate: "2022-01-20", status: "نشط" },
    { id: "EMP-130", name: "ريم العمري", role: "مهندس برمجيات", dept: "تقنية المعلومات", salary: 16000, startDate: "2023-03-10", status: "نشط" },
    { id: "EMP-133", name: "فهد الدوسري", role: "مندوب مبيعات", dept: "المبيعات", salary: 9500, startDate: "2024-05-05", status: "مستقيل" }
  ],
  rb_workers: [
    { id: "W-3012", name: "محمد رسول", trade: "لحام", project: "برج العليا", dailyWage: 150, daysWorked: 24, totalDue: 3600, status: "نشط" },
    { id: "W-3018", name: "أنوار حسين", trade: "عامل", project: "مجمع نيوم", dailyWage: 90, daysWorked: 26, totalDue: 2340, status: "نشط" },
    { id: "W-3025", name: "راجو كومار", trade: "كهربائي", project: "فلل الياسمين", dailyWage: 130, daysWorked: 22, totalDue: 2860, status: "نشط" },
    { id: "W-3031", name: "علي أحمد", trade: "نجار", project: "مصنع البرتبلات", dailyWage: 110, daysWorked: 20, totalDue: 2200, status: "متوقف" },
    { id: "W-3037", name: "صابر الدين", trade: "سائق", project: "المستودع الرئيسي", dailyWage: 100, daysWorked: 25, totalDue: 2500, status: "نشط" },
    { id: "W-3044", name: "كمال باشا", trade: "فني عزل", project: "توسعة المصنع", dailyWage: 120, daysWorked: 18, totalDue: 2160, status: "مغادر" }
  ],
  rb_finance: [
    { ref: "TRX-9012", date: "2026-06-20", type: "إيراد", desc: "دفعة مشروع برج العليا", dept: "المقاولات", amount: 1200000 },
    { ref: "TRX-9011", date: "2026-06-18", type: "مصروف", desc: "شراء حديد تسليح", dept: "المخازن", amount: 340000 },
    { ref: "TRX-9009", date: "2026-06-15", type: "إيراد", desc: "تسليم 5 برتبلات نيوم", dept: "البرتبلات", amount: 480000 },
    { ref: "TRX-9006", date: "2026-06-10", type: "مصروف", desc: "رواتب شهر مايو", dept: "الرواتب", amount: 620000 },
    { ref: "TRX-9003", date: "2026-06-05", type: "مصروف", desc: "محروقات ومعدات", dept: "تشغيلي", amount: 95000 },
    { ref: "TRX-9001", date: "2026-06-01", type: "إيراد", desc: "دفعة مقدمة مستودعات الدمام", dept: "المقاولات", amount: 800000 }
  ],
  rb_it: [
    { ticket: "TK-7021", date: "2026-06-26", asset: "خادم الملفات الرئيسي", issue: "بطء في الشبكة", status: "قيد العمل", priority: "عالية", assigned: "م. التقنية", resolutionDays: 2 },
    { ticket: "TK-7019", date: "2026-06-25", asset: "طابعة المالية", issue: "انحشار ورق متكرر", status: "مفتوح", priority: "متوسطة", assigned: "الدعم الفني", resolutionDays: 1 },
    { ticket: "TK-7016", date: "2026-06-24", asset: "نظام إدارة المشاريع", issue: "خطأ في التقارير", status: "مفتوح", priority: "عالية", assigned: "م. البرمجيات", resolutionDays: 4 },
    { ticket: "TK-7012", date: "2026-06-20", asset: "أجهزة موقع نيوم", issue: "تركيب أجهزة جديدة", status: "مغلق", priority: "منخفضة", assigned: "الدعم الفني", resolutionDays: 3 },
    { ticket: "TK-7008", date: "2026-06-18", asset: "بريد الشركة", issue: "استعادة كلمة مرور", status: "مغلق", priority: "متوسطة", assigned: "الدعم الفني", resolutionDays: 1 },
    { ticket: "TK-7005", date: "2026-06-15", asset: "كاميرات المستودع", issue: "كاميرا معطلة", status: "قيد العمل", priority: "عالية", assigned: "م. الشبكات", resolutionDays: 5 }
  ]
};

/* مخطط الحقول الموحّد لكل قسم — تستخدمه نماذج «المستندات والنماذج»
   لتوليد حقول مطابقة تمامًا لأعمدة القسم، فتنعكس السجلات بدقة. */
window.RB_SCHEMA = {
  rb_contracting: { name: "المقاولات العامة", icon: "ph-buildings", color: "maroon", columns: [
    { key: "ref", label: "المرجع", type: "text" },
    { key: "name", label: "اسم المشروع", type: "text" },
    { key: "client", label: "العميل/الجهة", type: "text" },
    { key: "location", label: "الموقع", type: "text" },
    { key: "value", label: "قيمة العقد (ر.س)", type: "number" },
    { key: "progress", label: "الإنجاز %", type: "number" },
    { key: "status", label: "الحالة", type: "select", options: ["جديد", "قيد التنفيذ", "متوقف", "مكتمل"] },
    { key: "due", label: "تاريخ التسليم", type: "date" }
  ]},
  rb_portables: { name: "المصانع", icon: "ph-house-line", color: "orange", columns: [
    { key: "code", label: "الكود", type: "text" },
    { key: "type", label: "النوع", type: "select", options: ["برتبل", "مسكن عمال", "كبينة حراسة"] },
    { key: "size", label: "المقاس", type: "text" },
    { key: "qty", label: "الكمية", type: "number" },
    { key: "unitPrice", label: "السعر الوحدة", type: "number" },
    { key: "stage", label: "المرحلة", type: "select", options: ["جديد", "قيد التصنيع", "جاهز", "تم البيع"] },
    { key: "due", label: "تاريخ التسليم", type: "date" }
  ]},
  rb_warehouses: { name: "المخازن والمستودعات", icon: "ph-warehouse", color: "amber", columns: [
    { key: "sku", label: "الكود", type: "text" },
    { key: "item", label: "المادة", type: "text" },
    { key: "category", label: "التصنيف", type: "text" },
    { key: "qty", label: "الكمية", type: "number" },
    { key: "unit", label: "الوحدة", type: "text" },
    { key: "location", label: "المستودع", type: "text" },
    { key: "minStock", label: "الحد الأدنى", type: "number" },
    { key: "status", label: "الحالة", type: "select", options: ["متوفر", "منخفض", "نفذ"] }
  ]},
  rb_hr: { name: "شؤون الموظفين", icon: "ph-users", color: "blue", columns: [
    { key: "id", label: "الرقم الوظيفي", type: "text" },
    { key: "name", label: "الاسم", type: "text" },
    { key: "role", label: "المنصب", type: "text" },
    { key: "dept", label: "القسم", type: "select", options: ["الإدارة", "المالية", "المشاريع", "الموارد البشرية", "تقنية المعلومات", "المبيعات"] },
    { key: "salary", label: "الراتب (ر.س)", type: "number" },
    { key: "startDate", label: "تاريخ التعيين", type: "date" },
    { key: "status", label: "الحالة", type: "select", options: ["نشط", "إجازة", "مستقيل"] }
  ]},
  rb_workers: { name: "شؤون العمال", icon: "ph-hard-hat", color: "orange", columns: [
    { key: "id", label: "الرقم", type: "text" },
    { key: "name", label: "الاسم", type: "text" },
    { key: "trade", label: "المهنة", type: "text" },
    { key: "project", label: "المشروع المكلف", type: "text" },
    { key: "dailyWage", label: "الأجر اليومي (ر.س)", type: "number" },
    { key: "daysWorked", label: "أيام العمل", type: "number" },
    { key: "totalDue", label: "المستحق (ر.س)", type: "number" },
    { key: "status", label: "الحالة", type: "select", options: ["نشط", "متوقف", "مغادر"] }
  ]},
  rb_finance: { name: "الشؤون المالية", icon: "ph-money", color: "green", columns: [
    { key: "ref", label: "المرجع", type: "text" },
    { key: "date", label: "التاريخ", type: "date" },
    { key: "type", label: "النوع", type: "select", options: ["إيراد", "مصروف"] },
    { key: "desc", label: "البيان", type: "text" },
    { key: "dept", label: "القسم", type: "select", options: ["المقاولات", "البرتبلات", "المخازن", "الرواتب", "تشغيلي", "أخرى"] },
    { key: "amount", label: "المبلغ (ر.س)", type: "number" }
  ]},
  rb_it: { name: "تقنية المعلومات", icon: "ph-desktop", color: "purple", columns: [
    { key: "ticket", label: "رقم البلاغ", type: "text" },
    { key: "date", label: "التاريخ", type: "date" },
    { key: "asset", label: "الجهاز/الموقع", type: "text" },
    { key: "issue", label: "العطل/الطلب", type: "text" },
    { key: "status", label: "الحالة", type: "select", options: ["مفتوح", "قيد العمل", "مغلق"] },
    { key: "priority", label: "الأولوية", type: "select", options: ["عالية", "متوسطة", "منخفضة"] },
    { key: "assigned", label: "المسؤول", type: "text" }
  ]}
};

