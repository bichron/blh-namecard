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
   QR WHEEL CONTROLLER
   =========================== */

const wheelGroups = document.querySelectorAll(".qr-group");
const panels = document.querySelectorAll(".qr-panel");
const total = wheelGroups.length;
let wheelIndex = 0;

/* UPDATE WHEEL */
function updateWheel(){
  wheelGroups.forEach((g,i)=>{
    g.classList.remove("active","left","right");

    const offset = (i - wheelIndex + total) % total;

    if(offset === 0){
      g.classList.add("active");
      panels[i].classList.add("active");
    }else{
      panels[i].classList.remove("active");
    }

    if(offset === total - 1){
      g.classList.add("left");
    }
    if(offset === 1){
      g.classList.add("right");
    }
  });
}

updateWheel();

/* CLICK ROTATE */
wheelGroups.forEach((g,i)=>{
  g.addEventListener("click",()=>{
    wheelIndex = i;
    updateWheel();
  });
});

/* SWIPE ROTATE */
let startX = 0;
const wheelContainer = document.querySelector(".qr-group-wheel");

wheelContainer.addEventListener("touchstart",e=>{
  startX = e.touches[0].clientX;
},{passive:true});

wheelContainer.addEventListener("touchend",e=>{
  const diff = e.changedTouches[0].clientX - startX;

  if(Math.abs(diff) < 30) return;

  if(diff < 0){
    wheelIndex = (wheelIndex + 1) % total;
  }else{
    wheelIndex = (wheelIndex - 1 + total) % total;
  }

  updateWheel();
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
