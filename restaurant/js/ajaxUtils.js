(function(global){

var ajaxUtils={};

function check(){		//check xmlhttprequest availability
	if(global.XMLHttpRequest){
		return (new XMLHttpRequest());
	}else {
		global.alert("Ajax Not Supported");
		return null;
	}
}
ajaxUtils.sendGetRequest = function(requestURL, responseHandler, isJsonResponse){
	var request=check();
	request.onreadystatechange = function(){
		handleResponse(request, responseHandler, isJsonResponse);
	};
	request.open("GET",requestURL,true);
	request.send();
}

function handleResponse(request, responseHandler, isJsonResponse){
		if((request.readyState==4) && (request.status==200)){
			
			if(isJsonResponse){
				responseHandler(JSON.parse(request.responseText));
			}else {
					console.log("JSON file not found");
				responseHandler(request.responseText);
			}
		}

}

global.$ajaxUtils=ajaxUtils;

})(window);