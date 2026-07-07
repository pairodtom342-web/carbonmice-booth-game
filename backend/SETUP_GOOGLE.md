# ติดตั้ง Backend เกมบูท carbonMICE (Google Sheet + Apps Script — ฟรี)

ใช้บัญชี Google ของทีม (เช่น carbonformevent@gmail.com) ทำครั้งเดียว ~10 นาที

## ขั้นตอน

### 1. สร้าง Google Sheet
1. เข้า [sheets.new](https://sheets.new) → ตั้งชื่อไฟล์ เช่น `carbonMICE Game Scores`
2. ไม่ต้องสร้างหัวตารางเอง — สคริปต์จะสร้างชีต `scores` ให้อัตโนมัติ

### 2. ใส่โค้ด Apps Script
1. ในชีต เมนู **Extensions → Apps Script**
2. ลบโค้ดเดิมทั้งหมด แล้ววางโค้ดจากไฟล์ **`Code.gs`** (โฟลเดอร์นี้) ลงไปทั้งไฟล์
3. **สำคัญ:** แก้บรรทัดบนสุด `const ADMIN_KEY = 'CHANGE-ME-carbonmice';`
   → เปลี่ยนเป็นรหัสลับของทีมเอง (ใช้ยืนยันเวลากด "ล้างคะแนนทั้งหมด" ในหน้า admin)
4. กด 💾 บันทึก (ตั้งชื่อโปรเจกต์ เช่น `carbonMICE Game API`)

### 3. Deploy เป็น Web App
1. ปุ่ม **Deploy → New deployment**
2. กดฟันเฟือง ⚙️ ข้าง "Select type" → เลือก **Web app**
3. ตั้งค่า:
   - Description: `carbonMICE game v1`
   - **Execute as: Me** (บัญชีเรา)
   - **Who has access: Anyone** ← สำคัญมาก ไม่งั้นเกมเรียกไม่ได้
4. กด **Deploy** → Google จะขอสิทธิ์ (Authorize access) → เลือกบัญชี → Advanced → Go to … (unsafe) → Allow
   (ปกติของ Apps Script ส่วนตัว ไม่อันตราย)
5. คัดลอก **Web app URL** (ลงท้าย `/exec`)

### 4. ใส่ URL ในเกม
เปิดไฟล์ `Gamey/game/config.js` แล้ววาง URL:

```js
API_URL: "https://script.google.com/macros/s/XXXXXXXX/exec",
```

### 5. ทดสอบ
- เปิด `game/admin.html` → ใส่ PIN → มุมขวาบนต้องขึ้น **● ออนไลน์**
- เล่นเกม 1 รอบใน `game/index.html` → คะแนนต้องไปโผล่ในชีต `scores`
- อัปโหลด QR (PDF/PNG) ในหน้า admin → จบเกมต้องเห็น QR

## หมายเหตุ
- **แก้โค้ดภายหลัง** ต้อง Deploy ใหม่แบบ **Manage deployments → ✏️ Edit → Version: New version → Deploy** (URL เดิมไม่เปลี่ยน)
- เกมทำงานต่อได้แม้เน็ตหลุด: คะแนนเข้าคิวใน localStorage แล้ว sync ให้อัตโนมัติเมื่อออนไลน์
- ภาพ QR ถูกเก็บเป็นไฟล์ `carbonmice_game_qr.txt` ใน Google Drive ของบัญชีที่ deploy
- Google Apps Script ฟรี quota เหลือเฟือสำหรับงานบูท (URL fetch ~20,000 ครั้ง/วัน)
