# 🎮 carbonMICE Booth Game

เกมออกบูท carbonMICE — ภารกิจจัดงานอีเวนต์แบบยั่งยืน · จอ Touch Screen แนวตั้ง 9:16 · เล่นจบ 2–3 นาที

## 🕹️ ลองเล่นเลย (สำหรับทีมรีวิว)

- **ตัวเกม:** https://pairodtom342-web.github.io/carbonmice-booth-game/game/index.html
- **หน้าแอดมิน:** https://pairodtom342-web.github.io/carbonmice-booth-game/game/admin.html (PIN: `2468`)

> 💡 แนะนำเปิดบนมือถือ (แนวตั้ง) หรือบนคอมกด F12 → toggle device toolbar ให้เป็นจอตั้ง จะได้อารมณ์จอบูทจริง

## เกมเพลย์

| ด่าน | รูปแบบ | คะแนนเต็ม |
|---|---|---|
| 1–3 เดินทาง / อาหาร / วัสดุบูท | เลือกการ์ด + feedback อธิบายเหตุผลคาร์บอน | 150×3 |
| 4 แยกขยะ | 6 ชิ้น → 4 ถัง + โบนัสความเร็ว | 200 |
| 5 เก็บข้อมูลคาร์บอนให้ครบ | whack-a-mole 15 วิ เลี่ยงตัวป่วน | 200 |
| 6 Quiz | 3 ข้อ (สุ่มจาก 6) 12 วิ/ข้อ + โบนัสตอบเร็ว | 300 |

รวมเต็ม **1,150** — จบเกมแสดงอันดับ + TOP5 + **QR ของงาน** ให้สแกนไปกรอกข้อมูลการเดินทางบน platform carbonMICE

## จุดที่อยากให้ช่วยรีวิว

1. ความยาก/ความเร็วแต่ละด่าน เหมาะกับคนเดินบูทไหม
2. ข้อความ/คำถาม quiz ถูกต้อง อ่านเข้าใจง่ายไหม
3. ปุ่มใหญ่พอสำหรับจอ touch ไหม มีจุดไหนกดพลาดง่าย
4. หน้าจบเกม + QR ชวนสแกนพอไหม

## โครงสร้าง

```
game/index.html   ตัวเกม (เปิดที่บูท F11 full screen)
game/admin.html   แอดมิน: leaderboard + Export CSV + อัปโหลด QR (PDF/PNG) + ชื่องาน
game/config.js    ตั้งค่า API_URL / ADMIN_PIN / ชื่องาน
backend/Code.gs   Google Apps Script (ฐานข้อมูลคะแนน = Google Sheet, ฟรี)
backend/SETUP_GOOGLE.md  วิธี deploy backend ทีละคลิก
WORKFLOW.md       คู่มือใช้งานวันออกบูท + เทคนิค
```

หมายเหตุ: เดโมบน GitHub Pages ยังไม่ต่อ backend (`API_URL` ว่าง) → คะแนนเก็บใน localStorage ของแต่ละเครื่อง วันงานจริงค่อย deploy Apps Script ตาม `backend/SETUP_GOOGLE.md`
