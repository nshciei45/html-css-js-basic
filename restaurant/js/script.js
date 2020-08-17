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

(function(global){

var dcUtils={};

//urls
var homeHtml="snippets/home-snippet.html";
var categoryHtml="snippets/category-snippet.html";
var categoriesTitle="snippets/category-title-snippet.html";
var categoriesData="http://davids-restaurant.herokuapp.com/categories.json";
var menuItemsData="https://davids-restaurant.herokuapp.com/menu_items.json?category=";
var menuItemHtml="snippets/menu-item-snippet.html";
var menuItemsTitle="snippets/menu-title-snippet.html";

var insertHtml=function(selector, resHtml){
var target=document.querySelector(selector);
target.innerHTML=resHtml;
};

var switchMenuToActive = function(){
	var classes=document.querySelector("#navHomeButton").className;
	classes = classes.replace(new RegExp("active","g"),"");
	document.querySelector("#navHomeButton").className = classes;

	classes = document.querySelector("#navMenuButton").className;
	if(classes.indexOf("active")==-1){
		classes+=" active";
	}
	document.querySelector("#navMenuButton").className = classes;
};

//insert ajex-loader
var showLoading = function(selector){
		var ctr="text-center";
		var gif="<div class="+ctr+">";
		src="images/ajax-loader.gif";
		gif+="<img src="+src+"></div>";
		insertHtml(selector,gif);
}

//data insert property
var insertProperty = function(string, propName, repValue){
	var propToReplace = "{{"+propName+"}}";
	string = string.replace(new RegExp(propToReplace, "g"), repValue);
	return string;
}

//main 
document.addEventListener("DOMContentLoaded",
			function(event){

//home page load
	showLoading("#main-content");
		$ajaxUtils.sendGetRequest(homeHtml,		//requestURL
			function(responseText){				//responseHandler
				insertHtml("#main-content",responseText);	//document.querySelector("#main-content").innerHTML=responseText;
			},
			false								//isJsonResponse
			);
});

//category page load (send back json to js objects data)
dcUtils.loadMenuCategories=function(){
	showLoading("#main-content");
		$ajaxUtils.sendGetRequest(categoriesData,buildAndShowCategoriesHtml,true);
};

function buildAndShowCategoriesHtml(categories){

//first, load categories title
	$ajaxUtils.sendGetRequest(categoriesTitle,
			function(categoriesTitle){
				//second, load category content
					$ajaxUtils.sendGetRequest(categoryHtml,
							function(categoryHtml){
								switchMenuToActive();
								var categoryViewHtml = 
								buildSingleCategory(categories,categoriesTitle,categoryHtml);
								insertHtml("#main-content",categoryViewHtml);
							},
							false
						);
			},
			false
		);
}

//build single category
function buildSingleCategory(categories,categoriesTitle,categoryHtml){
	var final=categoriesTitle;
	final+="<section class='row'>";
	for(var i=0;i<categories.length;i++){
		var html=categoryHtml;
		var name="" +categories[i].name;
		var short_name=categories[i].short_name;
		html = insertProperty(html, "name", name);
		html = insertProperty(html, "short_name", short_name);
		final+=html;
	}
	final+="</section>";
	return final;
}

//load menu item
dcUtils.loadMenuItem=function(categoryShort){
	showLoading("#main-content");
	$ajaxUtils.sendGetRequest(menuItemsData+categoryShort,buildAndShowMenuItemsHtml,true);
};

function buildAndShowMenuItemsHtml(categoryMenuItems){
	//first, load menu item title
		$ajaxUtils.sendGetRequest(menuItemsTitle,function(menuItemsTitle){
			//second, load menu items
				$ajaxUtils.sendGetRequest(menuItemHtml,function(menuItemHtml){
					switchMenuToActive();
					var menuItemViewHtml=
					buildSingleMenuItems(categoryMenuItems,menuItemsTitle,menuItemHtml);
					insertHtml("#main-content",menuItemViewHtml);
				},false);
		},false);
}

function buildSingleMenuItems(categoryMenuItems,menuItemsTitle,menuItemHtml){
	menuItemsTitle = insertProperty(menuItemsTitle, "name", categoryMenuItems.category.name);
	menuItemsTitle = insertProperty(menuItemsTitle, "special_instructions", 
		categoryMenuItems.category.special_instructions);
	var final = menuItemsTitle;
	final+="<section class='row'>";
	var menuItems=categoryMenuItems.menu_items;
	var catShortName=categoryMenuItems.category.short_name;
		for(var i=0;i<menuItems.length;i++){
			var html=menuItemHtml;
			html = insertProperty(html, "short_name", menuItems[i].short_name);
			html = insertProperty(html, "catShortName", catShortName);
			html = insertItemPrice(html, "price_small", menuItems[i].price_small);
			html = insertItemPortion(html, "small_portion_name", menuItems[i].small_portion_name);
			html = insertItemPrice(html, "price_large", menuItems[i].price_large);
			html = insertItemPortion(html, "large_portion_name", menuItems[i].large_portion_name);
			html = insertProperty(html, "name", menuItems[i].name);
			html = insertProperty(html, "description", menuItems[i].description);
			if(i%2!=0){
				html+="<div class='clearfix'></div>";
			}
			final+=html;
		}
		final+="</section>";
		return final;
}

var insertItemPrice = function(string, orgPrice, repPrice){

	if(!repPrice){
		return insertProperty(string, orgPrice, "");
	}
	repPrice="$"+repPrice.toFixed(2);
	string = insertProperty(string, orgPrice, repPrice);
	return string;
};

var insertItemPortion = function(string, orgPort, repPort){
	if(!repPort){
		return insertProperty(string, orgPort,"");
	}
	repPort="("+repPort+")";
	string = insertProperty(string, orgPort, repPort);
	return string;
};

global.$dcUtils=dcUtils;
})(window);



