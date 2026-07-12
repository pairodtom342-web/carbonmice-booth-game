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
  // type: win = ได้รางวัล · again = หมุนอีกครั้ง · lose = ไม่ได้/ครั้งหน้ามาใหม่ · weight = โอกาสออก
  WHEEL_PRIZES: [
    {label:"ของที่ระลึก\ncarbonMICE", type:"win",   weight:2},
    {label:"หมุนอีกครั้ง!",           type:"again", weight:2},
    {label:"ต้นไม้ฟอกอากาศ",          type:"win",   weight:2},
    {label:"ครั้งหน้า\nมาใหม่นะ",      type:"lose",  weight:3},
    {label:"ปากกา Eco",              type:"win",   weight:2},
    {label:"หมุนอีกครั้ง!",           type:"again", weight:2},
    {label:"กระเป๋าผ้า\ncarbonMICE",  type:"win",   weight:2},
    {label:"พลาดนิดเดียว!",           type:"lose",  weight:3}
  ]
};
