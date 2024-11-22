let map;
let marker;
let circle;

function initMap() {
  const initialLocation = { lat: 38.660832, lng: -9.204969 };

  map = new google.maps.Map(document.getElementById('map'), {
    center: initialLocation,
    zoom: 10,
  });

  marker = new google.maps.Marker({
    position: initialLocation,
    map: map,
    draggable: true,
  });

  circle = new google.maps.Circle({
    map: map,
    radius: 10000,
    fillColor: '#007bff',
    fillOpacity: 0.2,
    strokeColor: '#007bff',
    strokeOpacity: 0.6,
    strokeWeight: 2,
  });

  circle.bindTo('center', marker, 'position');

  marker.addListener('dragend', () => {
    const selectedLocation = marker.getPosition();
    console.log(`Location selected: ${selectedLocation.lat()}, ${selectedLocation.lng()}`);
  });

  document.getElementById('confirm-btn').addEventListener('click', () => {
    const selectedLocation = marker.getPosition();
    window.location.href = "../Home/ipmwebsite.html"
  });
}

window.onload = initMap;
