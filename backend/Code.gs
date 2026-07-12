/**
 * carbonMICE Booth Game — Backend (Google Apps Script Web App)
 * ─────────────────────────────────────────────────────────────
 * ฐานข้อมูล = Google Sheet (ฟรี) · QR image = ไฟล์ใน Google Drive
 * Deploy เป็น Web App (execute as Me, access: Anyone) → เอา URL ไปใส่ game/config.js
 * วิธีติดตั้งละเอียด: ดู SETUP_GOOGLE.md
 *
 * ⚠️ เปลี่ยน ADMIN_KEY ก่อน deploy! (ใช้ยืนยันตอนล้างคะแนนจากหน้า admin)
 */
const ADMIN_KEY = 'CHANGE-ME-carbonmice';
const SHEET_NAME = 'scores';
const QR_FILE_NAME = 'carbonmice_game_qr.txt'; // เก็บ dataURL ของภาพ QR ใน Drive

/* ───────── entry points ───────── */

function doGet(e) {
  const action = (e.parameter.action || '').trim();
  try {
    if (action === 'ping') return json({ ok: true });
    if (action === 'leaderboard') {
      const limit = Math.min(parseInt(e.parameter.limit || '10', 10) || 10, 500);
      const all = readScores();
      return json({
        top: all.slice(0, limit),
        total: all.length,
        eventName: getProp('eventName') || ''
      });
    }
    if (action === 'qr') return json({ qr: readQR() });
    if (action === 'config') return json({
      eventName: getProp('eventName') || '',
      qrMode: getProp('qrMode') || 'travel',   // travel = ฟอร์มเดินทาง carbonMICE · web = เว็บอื่น (FB/landing)
      qrLink: getProp('qrLink') || '',
      wheelPrizes: getProp('wheelPrizes') || ''  // JSON string ของของรางวัลวงล้อ
    });
    return json({ error: 'unknown action' });
  } catch (err) {
    return json({ error: String(err) });
  }
}

function doPost(e) {
  // ฝั่งเกมส่งเป็น text/plain (เลี่ยง CORS preflight) → parse เอง
  let body = {};
  try { body = JSON.parse(e.postData.contents); } catch (err) {}
  const action = body.action || '';
  try {
    if (action === 'submitScore') return json(submitScore(body));
    if (action === 'saveQR')      return json(saveQR(body));
    if (action === 'saveConfig') {
      ['eventName', 'qrMode', 'qrLink', 'wheelPrizes'].forEach(function (k) {
        if (body[k] !== undefined) setProp(k, String(body[k]));
      });
      return json({ ok: true });
    }
    if (action === 'clearScores') return json(clearScores(body));
    return json({ error: 'unknown action' });
  } catch (err) {
    return json({ error: String(err) });
  }
}

/* ───────── actions ───────── */

function submitScore(body) {
  const name = String(body.name || '').slice(0, 40).trim();
  const org = String(body.org || '').slice(0, 60).trim();
  const score = Math.max(0, Math.min(9999, parseInt(body.score, 10) || 0));
  const ts = body.ts || new Date().toISOString();
  if (!name) return { error: 'no name' };

  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // กันเขียนชนกันตอนหลายเครื่องส่งพร้อมกัน
  try {
    sheet().appendRow([ts, name, org, score]);
  } finally {
    lock.releaseLock();
  }
  const all = readScores();
  const rank = all.findIndex(r => r.ts === ts && r.name === name && r.score === score) + 1;
  return { ok: true, rank: rank || all.length, total: all.length, top5: all.slice(0, 5) };
}

function clearScores(body) {
  if (String(body.key || '') !== ADMIN_KEY) return { ok: false, error: 'bad key' };
  const sh = sheet();
  if (sh.getLastRow() > 1) sh.deleteRows(2, sh.getLastRow() - 1);
  return { ok: true };
}

function saveQR(body) {
  const qr = String(body.qr || '');
  if (qr.indexOf('data:image/') !== 0) return { ok: false, error: 'not an image dataURL' };
  if (qr.length > 2 * 1024 * 1024) return { ok: false, error: 'image too large' };
  const files = DriveApp.getFilesByName(QR_FILE_NAME);
  if (files.hasNext()) {
    files.next().setContent(qr);
  } else {
    DriveApp.createFile(QR_FILE_NAME, qr, MimeType.PLAIN_TEXT);
  }
  return { ok: true };
}

function readQR() {
  const files = DriveApp.getFilesByName(QR_FILE_NAME);
  return files.hasNext() ? files.next().getBlob().getDataAsString() : '';
}

/* ───────── helpers ───────── */

function sheet() {
  // ใช้ได้ทั้งแบบผูกกับชีต (bound) และแบบ standalone (สร้างชีตให้เองอัตโนมัติ)
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    const id = getProp('SPREADSHEET_ID');
    if (id) {
      ss = SpreadsheetApp.openById(id);
    } else {
      ss = SpreadsheetApp.create('carbonMICE Game Scores');
      setProp('SPREADSHEET_ID', ss.getId());
    }
  }
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['timestamp', 'name', 'org', 'score']);
  }
  return sh;
}

function readScores() {
  const sh = sheet();
  if (sh.getLastRow() < 2) return [];
  const rows = sh.getRange(2, 1, sh.getLastRow() - 1, 4).getValues();
  return rows
    .map(r => ({
      ts: r[0] instanceof Date ? r[0].toISOString() : String(r[0]),
      name: String(r[1]), org: String(r[2]), score: Number(r[3]) || 0
    }))
    .sort((a, b) => b.score - a.score || (a.ts < b.ts ? -1 : 1));
}

function getProp(k) { return PropertiesService.getScriptProperties().getProperty(k); }
function setProp(k, v) { PropertiesService.getScriptProperties().setProperty(k, v); }

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
