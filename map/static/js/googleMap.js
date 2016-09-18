function initialize() {
    alert();
    var map = new google.maps.Map(document.getElementById('map-canvas'));
    var bounds = new google.maps.LatLngBounds();
    function addMarker(lat, lng, title) {
        var position = new google.maps.LatLng(lat, lng);
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            title: title
        });
        bounds.extend(position);
    }
    {% for poi in pois %}
        addMarker({{ poi.position.latitude }}, {{ poi.position.longitude }}, "{{ poi.name }}");
    {% endfor %}
    map.fitBounds(bounds);
}
google.maps.event.addDomListener(window, 'load', initialize);
