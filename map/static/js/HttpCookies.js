


/*
  the general HTTP get function . to send a http GET request
*/
function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

/*
  get cookies, to pass security stuff
*/
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


/*
   HTTP post requset to get actually asset info
   callback in use to update markers.
*/
function sendHTTPPost(control,fit){
    var csrftoken = getCookie('csrftoken');
    var http = new XMLHttpRequest();
    http.open("POST", "", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    http.setRequestHeader("X-CSRFToken",csrftoken);
    http.send(control);
    http.onload = function() {
        //JSON objects here
        var allInfo = JSON.parse(http.responseText);
        //console.log(http.responseText);
        if(allInfo.response.application_response_code != 200){
            if(allInfo.page < allInfo.total_pages){
                var nextPage = parseInt(allInfo.page) + 1;
                http.send(params + "&page=" + nextPage);
            }
            var responseArray = allInfo.response.listings;
            for(var i = 0 ; i < responseArray.length ; i++){
                //console.log(i);
                addMarker(responseArray[i].latitude,responseArray[i].longitude,responseArray[i].title,responseArray[i]);
            }
            
        }
        if(fit == 1){
            map.fitBounds(bounds);
        }
        onUpdate(); 
    }
   

}