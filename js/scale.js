document.addEventListener("DOMContentLoaded",()=>{

const phone=document.getElementById("phone");

function scaleCard(){
  const scale=Math.min(innerWidth/360, innerHeight/700);
  phone.style.transform=`scale(${scale})`;
}

addEventListener("resize",()=>requestAnimationFrame(scaleCard));

scaleCard();
phone.classList.add("loaded");

});