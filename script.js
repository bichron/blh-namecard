/* =========================
   STATE
   ========================= */
let currentIndex = 0;
let qrItems = [];

/* =========================
   INIT
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  qrItems = document.querySelectorAll(".qr-item");

  bindPopupEvents();
  bindQRControls();
  updateQR();
});

/* =========================
   POPUP HANDLING
   ========================= */
function bindPopupEvents(){
  document.querySelectorAll("[data-open]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      openPopup(btn.dataset.open);
    });
  });

  document.querySelectorAll("[data-close]").forEach(el=>{
    el.addEventListener("click",closeAllPopups);
  });
}

function openPopup(id){
  closeAllPopups();
  document.getElementById(id)?.classList.add("active");

  if(id === "qrPopup"){
    currentIndex = 0;
    updateQR();
  }
}

function closeAllPopups(){
  document.querySelectorAll(".popup").forEach(p=>{
    p.classList.remove("active");
  });
}

/* =========================
   QR CONTROLS
   ========================= */
function bindQRControls(){
  document.getElementById("qrPrev")?.addEventListener("click",()=>{
    currentIndex = (currentIndex - 1 + qrItems.length) % qrItems.length;
    updateQR();
  });

  document.getElementById("qrNext")?.addEventListener("click",()=>{
    currentIndex = (currentIndex + 1) % qrItems.length;
    updateQR();
  });
}

/* =========================
   QR EFFECT
   ========================= */
function updateQR(){
  qrItems.forEach((item,i)=>{
    item.classList.toggle("active",i === currentIndex);
  });

  const angle = currentIndex * -120;
  document.getElementById("qrWheel").style.transform = `rotateY(${angle}deg)`;
}