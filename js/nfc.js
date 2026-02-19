const params=new URLSearchParams(location.search);
if(params.has("nfc")){
document.getElementById("phone").animate(
[{transform:"scale(.95)"},{transform:"scale(1)"}],
{duration:800,easing:"ease-out"}
);
}