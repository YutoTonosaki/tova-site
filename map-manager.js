import { warehouses, vehicles } from './map-data.js';

let map;
let warehouseLayerGroup;
let vehicleLayerGroup;
let trafficLayer; // Leaflet doesn't have a native "traffic layer" like GMaps, we might skip or simulate
let routePolyline;
let cityCircle;

document.addEventListener('DOMContentLoaded', () => {
  initMap();
});

function initMap() {
  // Initialize Map (Leaflet)
  // Tokyo coordinates
  map = L.map('google-map').setView([35.6895, 139.6917], 10);

  // Add Dark Theme Tile Layer (CartoDB Dark Matter)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);

  // Initialize Layer Groups
  warehouseLayerGroup = L.layerGroup().addTo(map);
  vehicleLayerGroup = L.layerGroup().addTo(map);

  // Render Initial Markers
  initWarehouses();
  initVehicles();

  // Setup Controls
  setupEventListeners();
}

function initWarehouses() {
  warehouses.forEach(wh => {
    // Custom Icon for Warehouse (Circle)
    const color = wh.status === 'Busy' ? '#e74c3c' : '#2ecc71';
    const customIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    const marker = L.marker([wh.lat, wh.lng], { icon: customIcon });

    marker.bindPopup(`
      <div style="color:#333; font-family: sans-serif;">
        <strong>${wh.name}</strong><br>
        Status: <span style="color:${color}; font-weight:bold;">${wh.status}</span><br>
        Stock: ${wh.stock}%
      </div>
    `);

    warehouseLayerGroup.addLayer(marker);
  });
}

function initVehicles() {
  vehicles.forEach(v => {
    // Custom Icon for Vehicle (Arrow/Triangle)
    const customIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="color: #f1c40f; font-size: 24px; transform: rotate(45deg); text-shadow: 0 0 2px black;"><i class="fa-solid fa-location-arrow"></i></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const marker = L.marker([v.lat, v.lng], { icon: customIcon });

    marker.bindPopup(`
      <div style="color:#333; font-family: sans-serif;">
        <strong>${v.name}</strong><br>
        Status: ${v.status}<br>
        Dest: ${v.destination}
      </div>
    `);

    vehicleLayerGroup.addLayer(marker);
  });
}

function setupEventListeners() {
  // Toggle Warehouses
  document.getElementById('toggle-warehouses').addEventListener('change', (e) => {
    if (e.target.checked) {
      map.addLayer(warehouseLayerGroup);
    } else {
      map.removeLayer(warehouseLayerGroup);
    }
  });

  // Toggle Vehicles
  document.getElementById('toggle-vehicles').addEventListener('change', (e) => {
    if (e.target.checked) {
      map.addLayer(vehicleLayerGroup);
    } else {
      map.removeLayer(vehicleLayerGroup);
    }
  });

  // Toggle Traffic (Note: OpenStreetMap doesn't have a free real-time traffic layer easily available without API keys. 
  // We will show an alert explaining this limitation or mock it visually if needed. For now, we'll just alert.)
  document.getElementById('toggle-traffic').addEventListener('change', (e) => {
    if (e.target.checked) {
      alert("Real-time traffic layer requires a specific paid provider in this demo. (Simulated toggle)");
    }
  });

  // Optimize Route Tool
  document.getElementById('btn-optimize').addEventListener('click', () => {
    if (routePolyline) map.removeLayer(routePolyline);

    const path = [
      [35.6895, 139.6917], // Tokyo
      [35.4437, 139.6380], // Yokohama
      [35.6586, 139.7454]  // Minato
    ];

    routePolyline = L.polyline(path, {
      color: '#f1c40f',
      weight: 4,
      opacity: 0.8,
      dashArray: '10, 10' // Dashed line for effect
    }).addTo(map);

    map.fitBounds(routePolyline.getBounds(), { padding: [50, 50] });

    alert("Optimal route calculated and displayed.");
  });

  // Area Analysis Tool
  document.getElementById('btn-analysis').addEventListener('click', () => {
    if (cityCircle) map.removeLayer(cityCircle);

    cityCircle = L.circle(map.getCenter(), {
      color: '#2ecc71',
      fillColor: '#2ecc71',
      fillOpacity: 0.2,
      radius: 5000 // 5km
    }).addTo(map);

    alert("5km radius analysis zone displayed around center.");
  });
}
