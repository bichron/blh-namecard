window.addEventListener("DOMContentLoaded",()=>{

const phone = document.getElementById("phone");
const qrPopup = document.getElementById("qrPopup");
const enterprisePopup = document.getElementById("enterprisePopup");

/* ===========================
   SCALE CARD
=========================== */
function scaleCard(){
  const scale = Math.min(innerWidth/360, innerHeight/700);
  phone.style.transform = `scale(${scale})`;
}
scaleCard();
phone.classList.add("loaded");
window.addEventListener("resize",()=>requestAnimationFrame(scaleCard));

/* ===========================
   THEME
=========================== */
function toggleTheme(){
  document.body.classList.toggle("light");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
}
window.toggleTheme = toggleTheme;

if(localStorage.getItem("theme")==="light")
  document.body.classList.add("light");

/* ===========================
   DEVICE ORIENTATION
=========================== */
if(window.DeviceOrientationEvent){
  window.addEventListener("deviceorientation",e=>{
    const x = e.gamma / 40;
    const y = e.beta / 40;
    phone.style.rotate = `${-y}deg ${x}deg`;
  });
}

/* ===========================
   NFC ANIMATION
=========================== */
const params = new URLSearchParams(location.search);
if(params.has("nfc")){
  phone.animate(
    [{transform:"scale(.95)"},{transform:"scale(1)"}],
    {duration:800,easing:"ease-out"}
  );
}

/* ===========================
   QR WHEEL CYLINDER
=========================== */
const groups = document.querySelectorAll(".qr-group");
const panels = document.querySelectorAll(".qr-panel");
const total = groups.length;
const angleStep = 360 / total;
let currentIndex = 0;

function updateWheel(){
  groups.forEach((g, i) => {
  const angle = (i - currentIndex) * angleStep;

  g.style.transform = `
    translate(-50%, -50%)
    rotateY(${angle}deg)
    translateZ(80px)
  `;

  const rad = angle * Math.PI / 180;
  const isBack = Math.cos(rad) < 0;

  g.classList.toggle("active", i === currentIndex);

  // 🔥 KHÔNG COUNTER ROTATE
  const text = g.querySelector("span");

  // chỉ giảm opacity phía sau cho tự nhiên
  text.style.opacity = isBack ? "0.5" : "1";

  panels[i].classList.toggle("active", i === currentIndex);
});
  /* đóng tạm
  groups.forEach((g,i)=>{
    const angle = (i - currentIndex) * angleStep;
    const normalized = ((angle % 360) + 360) % 360;
    const isBack = normalized > 90 && normalized < 270;

    g.style.transform = `
      translate(-50%,-50%)
      rotateY(${angle}deg)
      translateZ(80px)
    `;

    g.classList.toggle("active", i === currentIndex);
    g.classList.toggle("back", isBack);
    panels[i].classList.toggle("active", i === currentIndex);
  }); đóng tạm */
}

updateWheel();
panels[0]?.classList.add("active");

/* ===========================
   WHEEL INTERACTION
=========================== */
let startX = 0;
const wheelWrap = document.querySelector(".qr-group-wheel");

wheelWrap.addEventListener("touchstart",e=>{
  startX = e.touches[0].clientX;
},{passive:true});

wheelWrap.addEventListener("touchend",e=>{
  const diff = e.changedTouches[0].clientX - startX;
  if(Math.abs(diff) < 30) return;

  currentIndex =
    diff < 0
      ? (currentIndex + 1) % total
      : (currentIndex - 1 + total) % total;

  updateWheel();
});

groups.forEach((g,i)=>{
  g.addEventListener("click",()=>{
    currentIndex = i;
    updateWheel();
  });
});

/* ===========================
   QR ZOOM
=========================== */
const zoom = document.getElementById("qrZoom");
const zoomImg = document.getElementById("qrZoomImg");

document.querySelectorAll(".qr-slider img").forEach(img=>{
  img.addEventListener("click",()=>{
    zoomImg.src = img.src;
    zoom.classList.add("active");
  });
});

zoom.addEventListener("click",()=>{
  zoom.classList.remove("active");
});

/* ===========================
   GLOBAL ACTIONS
=========================== */
window.openQR = () => {
  currentIndex = 0;      // 🔥 luôn reset về Namecard
  updateWheel();         // cập nhật wheel

  panels.forEach((p,i)=>{
    p.classList.toggle("active", i === 0);
  });

  qrPopup.classList.add("active");
};
window.closeQR = () => qrPopup.classList.remove("active");

window.openEnterprise = () => enterprisePopup.classList.add("active");
window.closeEnterprise = () => enterprisePopup.classList.remove("active");

window.openWebsite = () => window.open("https://blh.vn","_blank");
window.openAchievement = () =>
  window.open("https://blh.vn/profile","_blank");

window.downloadVCF = ()=>{
  const vcf=`BEGIN:VCARD
VERSION:3.0
FN:Chris Pham
TITLE:Chief Commercial Officer
ORG:BLH Joint Stock Company
TEL:0909554558
END:VCARD`;
  const blob=new Blob([vcf],{type:"text/vcard"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="Chris_Pham.vcf";
  a.click();
};

});