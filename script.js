window.addEventListener("DOMContentLoaded",()=>{

const phone=document.getElementById("phone");
const qrPopup = document.getElementById("qrPopup");
const enterprisePopup = document.getElementById("enterprisePopup");

function scaleCard(){
const scale=Math.min(innerWidth/360, innerHeight/700);
phone.style.transform=`scale(${scale})`;
}

scaleCard();
phone.classList.add("loaded");

window.addEventListener("resize",()=>requestAnimationFrame(scaleCard));

function toggleTheme(){
document.body.classList.toggle("light");
localStorage.setItem(
"theme",
document.body.classList.contains("light") ? "light" : "dark"
);
}
window.toggleTheme=toggleTheme;

if(localStorage.getItem("theme")==="light")
document.body.classList.add("light");

if(window.DeviceOrientationEvent){
window.addEventListener("deviceorientation",e=>{
const x=e.gamma/40;
const y=e.beta/40;
phone.style.rotate=`${-y}deg ${x}deg`;
});
}

const params=new URLSearchParams(location.search);
if(params.has("nfc")){
phone.animate(
[{transform:"scale(.95)"},{transform:"scale(1)"}],
{duration:800,easing:"ease-out"}
);
}

/* ===========================
   CYLINDER WHEEL – 360 DEG
   =========================== */

const groups = document.querySelectorAll(".qr-group");
const panels = document.querySelectorAll(".qr-panel");
const total = groups.length;

let currentIndex = 0;
const angleStep = 360 / total;

/* UPDATE WHEEL */
function updateWheel(){
  groups.forEach((g,i)=>{
    const angle = (i - currentIndex) * angleStep;

    g.style.transform =
      `translate(-50%,-50%) rotateY(${angle}deg) translateZ(140px)`;

    g.classList.toggle("active", i === currentIndex);
    panels[i].classList.toggle("active", i === currentIndex);
  });
}

updateWheel();

/* SWIPE */
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

/* CLICK */
groups.forEach((g,i)=>{
  g.addEventListener("click",()=>{
    currentIndex = i;
    updateWheel();
  });
});

/* ===========================
   QR INDICATOR LOGIC
   =========================== */

function updateIndicators(){
  panels.forEach(panel=>{
    const slider = panel.querySelector(".qr-slider");
    const dotsContainer = panel.querySelector(".qr-indicator");
    if(!slider || !dotsContainer) return;

    const count = slider.querySelectorAll("img").length;

    dotsContainer.innerHTML = "";
    for(let i=0;i<count;i++){
      const dot = document.createElement("div");
      dot.className="qr-dot";
      if(i===0) dot.classList.add("active");
      dotsContainer.appendChild(dot);
    }
  });
}

updateIndicators();

/* ===========================
   QR ZOOM TOGGLE
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

window.openWebsite=()=>window.open("https://blh.vn","_blank");
window.openAchievement = () =>
  window.open("https://blh.vn/profile","_blank");

window.openQR=()=>qrPopup.classList.add("active");
window.closeQR=()=>qrPopup.classList.remove("active");

window.openEnterprise=()=>enterprisePopup.classList.add("active");
window.closeEnterprise=()=>enterprisePopup.classList.remove("active");

window.downloadVCF=()=>{
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
