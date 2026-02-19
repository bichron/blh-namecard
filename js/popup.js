document.addEventListener("DOMContentLoaded",()=>{

const qrPopup = document.getElementById("qrPopup");
const enterprisePopup = document.getElementById("enterprisePopup");

window.openQR = function(){
  qrPopup.classList.add("active");
}

window.closeQR = function(){
  qrPopup.classList.remove("active");
}

window.openEnterprise = function(){
  enterprisePopup.classList.add("active");
}

window.closeEnterprise = function(){
  enterprisePopup.classList.remove("active");
}

window.openWebsite = function(){
  window.open("https://yourwebsite.com","_blank");
}

});