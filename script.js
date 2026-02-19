function scaleCard(){
const phone=document.getElementById("phone");
const scale=Math.min(innerWidth/360, innerHeight/700);
phone.style.transform=`scale(${scale})`;
}

addEventListener("resize",()=>requestAnimationFrame(scaleCard));
addEventListener("load",()=>{
scaleCard();
phone.classList.add("loaded");
});

function toggleTheme(){
document.body.classList.toggle("light");
localStorage.setItem(
"theme",
document.body.classList.contains("light") ? "light" : "dark"
);
}

if(localStorage.getItem("theme")==="light")
document.body.classList.add("light");

if(window.DeviceOrientationEvent){
window.addEventListener("deviceorientation",e=>{
const x=e.gamma/40;
const y=e.beta/40;
document.getElementById("phone").style.rotate=`${-y}deg ${x}deg`;
});
}

const params=new URLSearchParams(location.search);
if(params.has("nfc")){
document.getElementById("phone").animate(
[{transform:"scale(.95)"},{transform:"scale(1)"}],
{duration:800,easing:"ease-out"}
);
}

function openWebsite(){
window.open("https://yourwebsite.com","_blank");
}

function openQR(){qrPopup.classList.add("active");}
function closeQR(){qrPopup.classList.remove("active");}

function openEnterprise(){enterprisePopup.classList.add("active");}
function closeEnterprise(){enterprisePopup.classList.remove("active");}

function downloadVCF(){
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
}