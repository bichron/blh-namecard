/* ===========================
   DYNAMIC QR TOKEN CONFIG
=========================== */
const QR_TOKEN_KEY = "dynamicQRToken";
const QR_EXPIRE_TIME = 24 * 60 * 60 * 1000;
const API_CREATE_TOKEN = "/api/qr/create";

/* Đọc token local */
function getLocalQRToken() {
  const raw = localStorage.getItem(QR_TOKEN_KEY);
  if (!raw) return null;

  const data = JSON.parse(raw);
  if (Date.now() > data.expiresAt) {
    localStorage.removeItem(QR_TOKEN_KEY);
    return null;
  }
  return data;
}

/* Gọi server tạo token mới */
async function createNewQRToken() {
  const res = await fetch(API_CREATE_TOKEN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ownerId: "chrispham"
    })
  });

  const data = await res.json();
  localStorage.setItem(QR_TOKEN_KEY, JSON.stringify(data));
  return data;
}

/* Generate QR (HOOK VÀO DEV02.002) */
async function loadDynamicQR() {
  let tokenData = getLocalQRToken();
  if (!tokenData) {
    tokenData = await createNewQRToken();
  }

  const qrUrl = `${location.origin}/t/${tokenData.token}`;

  if (typeof window.generateQRCode === "function") {
    window.generateQRCode(qrUrl);
  } else {
    console.warn("generateQRCode() not found – QR dynamic skipped");
  }
}

