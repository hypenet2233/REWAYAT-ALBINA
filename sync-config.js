/* ============================================================
   إعداد المزامنة المركزي لروايات البناء — Supabase
   هذه القيم آمنة للنشر (مفتاح anon عام محميّ بصلاحيات على الخادم).
   يُرفع مع النظام مرة واحدة، فيتصل كل العاملين والمدير تلقائيًا
   دون إدخال أي بيانات.
   ============================================================ */
window.RB_SYNC = {
  provider:    "supabase",
  supabaseUrl: "https://qxrsazicvgtijiraunhg.supabase.co",
  supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4cnNhemljdmd0aWppcmF1bmhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5OTk0MzcsImV4cCI6MjA5ODU3NTQzN30.YVWVO0errq0fD6Z80ZutAv77F5OWgphPHtK_Q0K5SC4",
  table:       "field_tracking",
  id:          "main",     // معرّف لوح المتابعة (صفّ واحد مشترك)
  autoSync:    true        // العامل: رفع تلقائي عند الحفظ (افتراضي)
};
