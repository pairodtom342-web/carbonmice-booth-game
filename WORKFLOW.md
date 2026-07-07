# Gamey — carbonMICE Booth Game Workflow

> เกม HTML สำหรับทีม carbonMICE ออกบูท · จอ Touch Screen แนวตั้ง 9:16 · เล่นจบ 2–3 นาที
> เป้าหมาย: สร้าง Awareness เรื่องการจัดงานอีเวนต์แบบยั่งยืน + แจกรางวัลคนคะแนนสูงสุด
> + ปิดท้ายด้วย QR ให้ผู้เล่นสแกนไปกรอก **ข้อมูลการเดินทาง** บน platform carbonMICE

## โครงสร้างไฟล์

```
Gamey/
├── WORKFLOW.md            ← ไฟล์นี้
├── game/
│   ├── index.html         ← ตัวเกม (เปิดไฟล์นี้ที่บูท / กด F11 full screen)
│   ├── admin.html         ← หน้าแอดมิน (PIN) : leaderboard + export CSV + อัปโหลด QR + ชื่องาน
│   ├── config.js          ← ตั้งค่า: API_URL / ADMIN_PIN / EVENT_NAME
│   └── assets/logo.png    ← โลโก้ (คัดลอกจาก Reely/Logo carbonMICE.png)
└── backend/
    ├── Code.gs            ← Google Apps Script (ฐานข้อมูลออนไลน์ฟรี = Google Sheet)
    └── SETUP_GOOGLE.md    ← วิธี deploy ทีละคลิก
```

## เกมเพลย์ (v1)

| ลำดับ | ด่าน | รูปแบบ | คะแนนเต็ม |
|---|---|---|---|
| 1–3 | เดินทาง / อาหาร / วัสดุบูท | เลือกการ์ดตัวเลือก + feedback อธิบายเหตุผล | 150×3 |
| 4 | แยกขยะ 6 ชิ้น → 4 ถัง | แตะถังให้ถูก + โบนัสความเร็ว | 200 |
| 5 | เก็บข้อมูลคาร์บอนให้ครบ | whack-a-mole 15 วิ แตะข้อมูลจริง เลี่ยงตัวป่วน | 200 |
| 6 | Quiz 3 ข้อ (สุ่มจาก pool 6) | 12 วิ/ข้อ + โบนัสตอบเร็ว | 300 |

รวมเต็ม **1,150** · ระดับ: 🌱 Eco Rookie < 🌿 Green Organizer (500+) < 🦸 Carbon Hero (750+) < 🏅 carbonMICE Master (950+)

จบเกม: บันทึกคะแนน → แสดงอันดับ + TOP5 + **QR Code** "สแกนกรอกข้อมูลการเดินทาง" → นับถอยหลัง 45 วิ กลับหน้าแรกอัตโนมัติ

## Checklist วันออกบูท

1. [ ] Deploy backend แล้ว (ครั้งเดียว — `backend/SETUP_GOOGLE.md`) และ `config.js` มี API_URL
2. [ ] เปิด `admin.html` → PIN (`config.js` → ADMIN_PIN, ค่าเริ่มต้น 2468) → สถานะ **● ออนไลน์**
3. [ ] อัปโหลด **QR ของงาน** (PDF จาก platform carbonMICE ได้เลย — ระบบดึงหน้าแรกเป็นภาพให้) + ตั้งชื่องาน
4. [ ] เปิด `index.html` บนจอ touch แนวตั้ง → F11 full screen → เล่นทดสอบ 1 รอบ เช็คคะแนนเข้าชีต
5. [ ] จบวัน: admin → Export CSV → ประกาศผู้ชนะ → (ถ้าต้องการ) ล้างคะแนนก่อนวันใหม่

## เทคนิค / gotchas

- **CORS:** ฝั่งเกม POST หา Apps Script ด้วย `Content-Type: text/plain` เท่านั้น (เลี่ยง preflight — Apps Script ตอบ OPTIONS ไม่ได้) + `redirect:'follow'`
- **กันเน็ตหลุด:** คะแนนที่ส่งไม่สำเร็จเข้าคิว `localStorage` (`cmice_game_queue`) แล้ว flush อัตโนมัติรอบถัดไป · QR cache ไว้ใน `cmice_game_qr` ใช้ได้แม้ออฟไลน์
- **QR PDF:** admin.html ใช้ pdf.js (CDN — ต้องมีเน็ตตอนอัปโหลด) render หน้าแรก → PNG dataURL → เก็บใน Drive ผ่าน Apps Script → ทุกเครื่องดึงไปแสดง
- **จอ 9:16:** `#stage` ล็อกสัดส่วน `max-width: calc(100vh*9/16)` — เปิดบนจอแนวนอนจะมีขอบข้างเอง ไม่เพี้ยน
- **Idle 90 วิ** ระหว่างเล่นค้าง → เด้งกลับหน้าแรกเอง (attract mode)
- **ฟอนต์** Inter+Sarabun โหลดจาก Google Fonts — ไม่มีเน็ตจะ fallback ฟอนต์ระบบ (เกมยังเล่นได้)
- **เนื้อหา:** ข้อเท็จจริงคาร์บอนใน quiz/feedback ต้องเป็นจริงเชิงทิศทาง (อิงประสบการณ์งานจริง เช่น การเดินทาง = สัดส่วนใหญ่สุด) — **ห้ามใส่เลข EF ปลอม/คำเคลมรับรองปลอม**
- **แบรนด์:** ตาม `Brand/BRAND.md` — น้ำเงิน #065DED โครงหลัก, มินต์ #35E5C0 accent, ห้ามใช้ PEA magenta นอกโลโก้

## งานที่มักถูกขอ

- เปลี่ยน/เพิ่มคำถาม quiz → แก้ `QUIZ_POOL` ใน index.html
- เพิ่มด่าน choice → เพิ่ม object ใน `CHOICE_MISSIONS`
- ปรับสมดุลคะแนน → ค่า pts ในข้อมูลด่าน + เกณฑ์ tier ใน `tierOf()`
- เปลี่ยน QR/ชื่องานประจำงานใหม่ → ทำที่หน้า admin ไม่ต้องแก้โค้ด
- ล้างคะแนนเริ่มงานใหม่ → admin → ล้างคะแนนทั้งหมด (ต้องใช้ ADMIN_KEY จาก Code.gs)
