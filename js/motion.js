if(window.DeviceOrientationEvent){
window.addEventListener("deviceorientation",e=>{
const x=e.gamma/40;
const y=e.beta/40;
document.getElementById("phone").style.rotate=`${-y}deg ${x}deg`;
});
}