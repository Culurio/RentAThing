// script.js

let map;
let marker;
let circle;

// Função para inicializar o mapa
function initMap() {
  const initialLocation = { lat: 37.7749, lng: -122.4194 }; // San Francisco como exemplo

  // Criação do mapa
  map = new google.maps.Map(document.getElementById('map'), {
    center: initialLocation,
    zoom: 10,
  });

  // Criação do marcador
  marker = new google.maps.Marker({
    position: initialLocation,
    map: map,
    draggable: true,
  });

  // Criação do círculo com raio de 10 km
  circle = new google.maps.Circle({
    map: map,
    radius: 10000, // Raio em metros (10 km)
    fillColor: '#007bff',
    fillOpacity: 0.2,
    strokeColor: '#007bff',
    strokeOpacity: 0.6,
    strokeWeight: 2,
  });

  circle.bindTo('center', marker, 'position');

  // Evento para atualizar o círculo quando o marcador é movido
  marker.addListener('dragend', () => {
    const selectedLocation = marker.getPosition();
    console.log(`Location selected: ${selectedLocation.lat()}, ${selectedLocation.lng()}`);
  });

  // Botão de confirmação
  document.getElementById('confirm-btn').addEventListener('click', () => {
    const selectedLocation = marker.getPosition();
    alert(`Location confirmed: ${selectedLocation.lat()}, ${selectedLocation.lng()}`);
  });
}

// Inicializar o mapa quando a página é carregada
window.onload = initMap;
