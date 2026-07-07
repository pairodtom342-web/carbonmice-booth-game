// ── carbonMICE Booth Game — configuration ──
// วาง URL ของ Google Apps Script Web App หลัง deploy (ดู backend/SETUP_GOOGLE.md)
// ปล่อยว่าง "" = โหมดออฟไลน์ (คะแนนเก็บใน localStorage ของเครื่องนี้เท่านั้น)
window.GAME_CONFIG = {
  API_URL: "",

  // PIN เข้าหน้า admin.html
  ADMIN_PIN: "2468",

  // ชื่องาน แสดงบนหน้าจบเกม (แก้ได้จากหน้า admin เช่นกัน)
  EVENT_NAME: "carbonMICE",

  // สำรอง: dataURL ของภาพ QR (ใช้เมื่อยังไม่ได้อัปโหลดผ่าน admin / ไม่มีเน็ต)
  QR_FALLBACK: ""
};
