// function whChanger(){
// var screenWidth=window.innerWidth;
// var element=document.querySelector(".container");
// // element.style.backgroundColor="blue";
// var elt2=document.querySelector(".text");
// element.style.width=screenWidth;
// console.log("this function worked");
// }

// document.addEventListener('DOMContentLoaded', whChanger);

function change(elt){
elt.style.fontSize="5vw";
// elt.style.cursor="pointer";
var elt2 = document.querySelector(".container");
elt2.style.backgroundColor="rgb(0,23,65,.5)";
}
function changeAgain(elt){
elt.style.fontSize="4.5vw";
var elt2 = document.querySelector(".container");
elt2.style.backgroundColor="rgb(0,0,0,0)";
}