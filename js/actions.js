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