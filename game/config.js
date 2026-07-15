// ── carbonMICE Booth Game — configuration ──
// วาง URL ของ Google Apps Script Web App หลัง deploy (ดู backend/SETUP_GOOGLE.md)
// ปล่อยว่าง "" = โหมดออฟไลน์ (คะแนนเก็บใน localStorage ของเครื่องนี้เท่านั้น)
window.GAME_CONFIG = {
  API_URL: "https://script.google.com/macros/s/AKfycbyOenUQEMLmmJTj1_HVPUMfOBu007LSJpSrVKonvMgeBrm4uQGh6zInsHKlUtZntdBC/exec",

  // PIN เข้าหน้า admin.html
  ADMIN_PIN: "2468",

  // ชื่องาน แสดงบนหน้าจบเกม (แก้ได้จากหน้า admin เช่นกัน)
  EVENT_NAME: "carbonMICE",

  // สำรอง: dataURL ของภาพ QR (ใช้เมื่อยังไม่ได้อัปโหลดผ่าน admin / ไม่มีเน็ต)
  QR_FALLBACK: "",

  // ของรางวัลวงล้อหมุน (ค่าเริ่มต้น — แก้/ซิงก์ได้จากหน้า admin)
  // หมุนแล้วได้รางวัลทุกคน (type=win ทั้งหมด) · ไอคอนบนวงล้อจับจากชื่อรางวัล (พัด/กระเป๋า/ยาดม/ปากกา)
  WHEEL_PRIZES: [
    {label:"ปากกา carbonMICE",     type:"win", weight:1},
    {label:"พัดคลายร้อน",          type:"win", weight:1},
    {label:"กระเป๋าผ้า carbonMICE", type:"win", weight:1},
    {label:"ยาดมสมุนไพร",          type:"win", weight:1},
    {label:"ปากกา carbonMICE",     type:"win", weight:1},
    {label:"พัดคลายร้อน",          type:"win", weight:1},
    {label:"กระเป๋าผ้า carbonMICE", type:"win", weight:1},
    {label:"ยาดมสมุนไพร",          type:"win", weight:1}
  ]
};
