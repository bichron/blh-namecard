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