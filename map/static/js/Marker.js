/*
  The JS calss represent a marker
  warrper google map's marker and fixed asset info.

  Fields
   - googleMarker  -> the marker of googleMap API
   - 


*/


class Marker{
	constructor(googleMarker, assetInfo){
		this.googleMarker = googleMarker;
		this,assetInfo = assetInfo;
	}
	

	update(){
		
	}

	getPosition(){
		return this.googleMarker.getPosition();
	}

}


/*
   add marker function to add market into global cache array
*/
function addMarker(lat, lng, title, info) {
        var position = new google.maps.LatLng(lat, lng);
        if(!shouldAddMarker(position)){
            console.log("shoud not log this!")
            return;
        }
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            title: title
        });

        markers.push(new Marker(marker,info));

        bounds.extend(position);
        if(info != null){
            //Info windows
            var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">'+ info.title +'</h1>'+
            '<img src='+ info.img_url +' style="width:304px;height:228px;">'+
            '<div id="bodyContent">'+
            '<p>'+ info.summary + ' </p>'+
            '<p> Price Starting: '+ info.price + " "+ info.price_currency + ' </p>'+
            '<p> Property Type: '+ info.property_type + ' </p>'+
            '<p> Bedroom number: '+ info.bedroom_number + ' </p>'+
            '<p> bathroom number: '+ info.bathroom_number + ' </p>'+
            '<p><a href= '+ info.lister_url +'>'+
            'Click for details</a> '+
            '</p>'+
            '</div>'+
            '</div>';
            var infowindow = new google.maps.InfoWindow({
            content: contentString
            });
        }
         
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
}


/*
  fetch data from server by place name
*/
function updateMarkers(name,fit){
   sendHTTPPost("pac-input=" + name, fit);
   onUpdate();
}


/*
   fetch data from servr by bound
*/
function updateMarkersByBound(bound){
    sendHTTPPost("&south_west=" + bound.getSouthWest().lat() + "," + bound.getSouthWest().lng() 
                 + "&north_east=" + bound.getNorthEast().lat() + "," + bound.getNorthEast().lng(),0);
    onUpdate();
}

/*
  apply a filter to current markers.

*/
function onUpdate(){
	markers.forEach(function(marker){
		marker.update();
	});
}

function shouldAddMarker(obj){
    markers.forEach(function(marker) {
        if(marker.getPosition() == obj){
            return false;
        }
       
    });
    return true;
               
}


/*
   remove all markers
*/
function clearMarkers(){
    //clear out old markers
    markers.forEach(function(marker) {
        marker.setMap(null);
    });
    markers = [];
}