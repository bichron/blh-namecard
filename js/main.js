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
localStorage.setItem("theme",
document.body.classList.contains("light")?"light":"dark");
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