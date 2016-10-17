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
		this.assetInfo = assetInfo;
	}


	

	update(){
		if(this.shouldShow()){	
			if(this.googleMarker.getMap() != map){
				this.googleMarker.setMap(map);
			}
			addSliderElement(this);
		}else{
			if(this.googleMarker.getMap() != null){
				this.googleMarker.setMap(null);
			}
		}
		
	}

	setDesto(desto){
		this.desto = desto;
	}

	setDuration(duration){
		this.duration = duration;
	}

	getDuration(){
		return this.duration;
	}

	getDesto(){
		return this.desto;
	}



	getPosition(){
		return this.googleMarker.getPosition();
	}

	shouldShow(){
		var words = getKeywords();
		var returnValue = true;
		var minPrice = document.getElementById("min-price").value;
        var maxPrice = document.getElementById("max-price").value;
		//keywords
		if(words.length > 0){
			var objWords = this.assetInfo.keywords;
			var pass = false;
			for(var j = 0 ; j < words.length ; j ++){
				for(var i = 0 ; i < objWords.length ; i ++){
					if(objWords[i].toLowercase() === words[j].toLowercase()){
						pass = true;
						break;
					}
				}
				if(pass){
					break;
				}
			}
			returnValue = pass && returnValue;
		}

		if(minPrice){
			returnValue = returnValue && (minPrice < this.assetInfo.price);
		}

		if(maxPrice){
			returnValue = returnValue && (maxPrice > this.assetInfo.price);
		}

		if(checkDM()){
			if(this.duration == null){
				returnValue = returnValue && false;
				//console.log("Null makrer" + this.getPosition())
			}else{
				//console.log(duration);
				//console.log(this.duration.value + " " + DM_time*60)
				returnValue = returnValue && (this.duration.value <= DM_time*60);
			}
		}

		return returnValue;
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
        var markerRep = new Marker(marker,info);
        markers.push(markerRep);
        if(checkDM()){
        	   service.getDistanceMatrix(
                      {
                        origins: [DM_name],
                        destinations: [marker.getPosition()],
                        travelMode: DM_travel,
                        avoidHighways: false,
                        avoidTolls: false,
                      }, callbackIndi);

                function callbackIndi(response, status) {
        

                    var results = response.rows[0].elements;
                    for (var j = 0; j < results.length; j++) {
                        marker.setDuration(results[j].duration.value);
                    }
                }

        }
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
function updateMarkersByBound(bound,fit){
    sendHTTPPost("&south_west=" + bound.getSouthWest().lat() + "," + bound.getSouthWest().lng() 
                 + "&north_east=" + bound.getNorthEast().lat() + "," + bound.getNorthEast().lng(),fit);
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

function filteMarkers(bounds){
	if(bounds == null){
		bounds = map.getBounds();
	}
	markers.filter(function(marker){
		return bounds.contains(marker.getPosition());
	})
}


/*
   remove all markers
*/
function clearMarkers(){
	//TODO:
}