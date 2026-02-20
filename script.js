window.addEventListener("DOMContentLoaded",()=>{

const phone=document.querySelector(".phone");

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

window.openWebsite=()=>window.open("https://yourwebsite.com","_blank");

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
