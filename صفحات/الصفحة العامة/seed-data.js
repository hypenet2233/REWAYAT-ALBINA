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
    { code: "PB-2051", type: "سكني", client: "شركة نيوم", size: "6×12", stage: "تشطيب", progress: 85, due: "2026-07-15" },
    { code: "PB-2050", type: "مكتبي", client: "أرامكو", size: "3×6", stage: "عزل وتكسية", progress: 55, due: "2026-07-22" },
    { code: "PB-2048", type: "دورة مياه", client: "بلدية أبها", size: "2×3", stage: "جاهز", progress: 100, due: "2026-06-30" },
    { code: "PB-2045", type: "غرفة حارس", client: "مجمع الياسمين", size: "2×2", stage: "هيكل", progress: 15, due: "2026-08-10" },
    { code: "PB-2043", type: "استراحة", client: "عميل خاص", size: "8×15", stage: "تأسيس", progress: 35, due: "2026-08-25" },
    { code: "PB-2040", type: "سكني", client: "وزارة الإسكان", size: "6×12", stage: "تشطيب", progress: 90, due: "2026-07-05" }
  ],
  rb_warehouses: [
    { code: "IT-501", name: "حديد تسليح 16مم", category: "حديد", qty: 1200, min: 500, unit: "طن", warehouse: "الرئيسي" },
    { code: "IT-502", name: "إسمنت مقاوم", category: "إسمنت", qty: 80, min: 150, unit: "كيس", warehouse: "الموقع" },
    { code: "IT-503", name: "كابل نحاس 4مم", category: "كهرباء", qty: 45, min: 100, unit: "لفة", warehouse: "الفرعي" },
    { code: "IT-504", name: "صوف صخري عازل", category: "عزل", qty: 320, min: 100, unit: "لوح", warehouse: "الرئيسي" },
    { code: "IT-505", name: "مواسير PVC 4 إنش", category: "سباكة", qty: 60, min: 80, unit: "ماسورة", warehouse: "الموقع" },
    { code: "IT-506", name: "دريل صناعي", category: "أدوات", qty: 18, min: 10, unit: "قطعة", warehouse: "الفرعي" }
  ],
  rb_hr: [
    { id: "EMP-101", name: "ناصر عسيري", job: "المدير العام", dept: "الإدارة", hire: "2019-02-01", salary: 32000, status: "على رأس العمل" },
    { id: "EMP-112", name: "سعد القحطاني", job: "مدير المشاريع", dept: "المشاريع", hire: "2020-06-15", salary: 21000, status: "على رأس العمل" },
    { id: "EMP-118", name: "منى الزهراني", job: "محاسب أول", dept: "المالية", hire: "2021-09-01", salary: 14500, status: "إجازة" },
    { id: "EMP-124", name: "خالد الشهري", job: "أخصائي موارد بشرية", dept: "الموارد البشرية", hire: "2022-01-20", salary: 12000, status: "على رأس العمل" },
    { id: "EMP-130", name: "ريم العمري", job: "مهندس برمجيات", dept: "تقنية المعلومات", hire: "2023-03-10", salary: 16000, status: "على رأس العمل" },
    { id: "EMP-133", name: "فهد الدوسري", job: "مندوب مبيعات", dept: "المبيعات", hire: "2024-05-05", salary: 9500, status: "منتهي" }
  ],
  rb_workers: [
    { id: "W-3012", name: "محمد رسول", nationality: "باكستاني", trade: "لحام", project: "برج العليا", iqama: "2026-08-12", status: "نشط" },
    { id: "W-3018", name: "أنوار حسين", nationality: "بنغلاديشي", trade: "عامل", project: "مجمع نيوم", iqama: "2026-07-05", status: "نشط" },
    { id: "W-3025", name: "راجو كومار", nationality: "هندي", trade: "كهربائي", project: "فلل الياسمين", iqama: "2027-01-22", status: "نشط" },
    { id: "W-3031", name: "علي أحمد", nationality: "يمني", trade: "نجار", project: "مصنع البرتبلات", iqama: "2026-06-28", status: "إجازة" },
    { id: "W-3037", name: "صابر الدين", nationality: "مصري", trade: "سائق", project: "المستودع الرئيسي", iqama: "2026-12-15", status: "نشط" },
    { id: "W-3044", name: "كمال باشا", nationality: "سوداني", trade: "فني عزل", project: "توسعة المصنع", iqama: "2026-07-18", status: "منتهي" }
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
    { ticket: "TK-7021", asset: "خادم الملفات الرئيسي", user: "الإدارة", type: "شبكة", priority: "عالية", status: "قيد المعالجة", date: "2026-06-26" },
    { ticket: "TK-7019", asset: "طابعة المالية", user: "المالية", type: "صيانة", priority: "متوسطة", status: "مفتوحة", date: "2026-06-25" },
    { ticket: "TK-7016", asset: "نظام إدارة المشاريع", user: "المشاريع", type: "برمجيات", priority: "عالية", status: "مفتوحة", date: "2026-06-24" },
    { ticket: "TK-7012", asset: "أجهزة موقع نيوم", user: "المشاريع", type: "تركيب", priority: "منخفضة", status: "مغلقة", date: "2026-06-20" },
    { ticket: "TK-7008", asset: "بريد الشركة", user: "الموارد البشرية", type: "دعم", priority: "متوسطة", status: "مغلقة", date: "2026-06-18" },
    { ticket: "TK-7005", asset: "كاميرات المستودع", user: "المخازن", type: "صيانة", priority: "عالية", status: "قيد المعالجة", date: "2026-06-15" }
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
  rb_portables: { name: "مصنع البرتبلات", icon: "ph-house-line", color: "orange", columns: [
    { key: "code", label: "رقم الوحدة", type: "text" },
    { key: "type", label: "النوع", type: "select", options: ["سكني", "مكتبي", "دورة مياه", "غرفة حارس", "استراحة"] },
    { key: "client", label: "العميل", type: "text" },
    { key: "size", label: "المقاس (م)", type: "text" },
    { key: "stage", label: "مرحلة التصنيع", type: "select", options: ["هيكل", "تأسيس", "عزل وتكسية", "تشطيب", "جاهز"] },
    { key: "progress", label: "نسبة الإنجاز %", type: "number" },
    { key: "due", label: "موعد التسليم", type: "date" }
  ]},
  rb_warehouses: { name: "المخازن والمستودعات", icon: "ph-warehouse", color: "amber", columns: [
    { key: "code", label: "رمز الصنف", type: "text" },
    { key: "name", label: "الصنف", type: "text" },
    { key: "category", label: "التصنيف", type: "select", options: ["حديد", "إسمنت", "كهرباء", "عزل", "أدوات", "سباكة"] },
    { key: "qty", label: "الكمية", type: "number" },
    { key: "min", label: "الحد الأدنى", type: "number" },
    { key: "unit", label: "الوحدة", type: "text" },
    { key: "warehouse", label: "المستودع", type: "select", options: ["الرئيسي", "الفرعي", "الموقع"] }
  ]},
  rb_hr: { name: "شؤون الموظفين", icon: "ph-users", color: "blue", columns: [
    { key: "id", label: "الرقم الوظيفي", type: "text" },
    { key: "name", label: "الاسم", type: "text" },
    { key: "job", label: "المسمى الوظيفي", type: "text" },
    { key: "dept", label: "القسم", type: "select", options: ["الإدارة", "المالية", "المشاريع", "الموارد البشرية", "تقنية المعلومات", "المبيعات"] },
    { key: "hire", label: "تاريخ التعيين", type: "date" },
    { key: "salary", label: "الراتب (ر.س)", type: "number" },
    { key: "status", label: "الحالة", type: "select", options: ["على رأس العمل", "إجازة", "منتهي"] }
  ]},
  rb_workers: { name: "شؤون العمال", icon: "ph-hard-hat", color: "orange", columns: [
    { key: "id", label: "الرقم", type: "text" },
    { key: "name", label: "الاسم", type: "text" },
    { key: "nationality", label: "الجنسية", type: "text" },
    { key: "trade", label: "المهنة", type: "select", options: ["لحام", "نجار", "كهربائي", "عامل", "سائق", "فني عزل"] },
    { key: "project", label: "الموقع/المشروع", type: "text" },
    { key: "iqama", label: "انتهاء الإقامة", type: "date" },
    { key: "status", label: "الحالة", type: "select", options: ["نشط", "إجازة", "منتهي"] }
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
    { key: "ticket", label: "رقم التذكرة", type: "text" },
    { key: "asset", label: "الأصل/الجهاز", type: "text" },
    { key: "user", label: "المستخدم/القسم", type: "text" },
    { key: "type", label: "النوع", type: "select", options: ["صيانة", "تركيب", "شبكة", "برمجيات", "دعم"] },
    { key: "priority", label: "الأولوية", type: "select", options: ["عالية", "متوسطة", "منخفضة"] },
    { key: "status", label: "الحالة", type: "select", options: ["مفتوحة", "قيد المعالجة", "مغلقة"] },
    { key: "date", label: "التاريخ", type: "date" }
  ]}
};

