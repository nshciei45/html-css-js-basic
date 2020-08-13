//need to study jquery**
//navbar collapse on click
$(function(){

	$(document).on("click",function(event){
		var screenWidth=window.innerWidth;
		if(screenWidth<768){
			$("#navbarNav").collapse('hide');
		}
	});
});

var ctr="text-center";
var gif="<div class="+ctr+">";
src="images/ajax-loader.gif";
gif+="<img src="+src+">";
function loading(selector){
	document.querySelector(selector).innerHTML=gif;
}
document.addEventListener("DOMContentLoaded",
			function(event){
				loading("#main-content");
		$ajaxUtils.sendGetRequest("snippets/home-snippet.html",
			function(responseText){
					document.querySelector("#main-content").innerHTML=responseText;
			},
			false
			)
	});

