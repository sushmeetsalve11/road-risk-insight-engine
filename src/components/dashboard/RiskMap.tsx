
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for Leaflet marker icon issue
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Sample Indian accident data (major cities)
const indianAccidentData = [
  { lng: 77.2090, lat: 28.6139, severity: "high", description: "Major collision in Delhi" },
  { lng: 72.8777, lat: 19.0760, severity: "high", description: "Multi-vehicle crash in Mumbai" },
  { lng: 77.5946, lat: 12.9716, severity: "medium", description: "Vehicle skidding in Bangalore" },
  { lng: 80.2707, lat: 13.0827, severity: "medium", description: "Road hazard accident in Chennai" },
  { lng: 88.3639, lat: 22.5726, severity: "low", description: "Minor accident in Kolkata" },
  { lng: 78.4867, lat: 17.3850, severity: "high", description: "Highway collision in Hyderabad" },
  { lng: 73.8567, lat: 18.5204, severity: "low", description: "Single vehicle incident in Pune" },
];

export function RiskMap() {
  // Helper function to get marker color based on severity
  const getMarkerColor = (severity: string) => {
    switch (severity) {
      case "high":
        return L.divIcon({
          className: "custom-div-icon",
          html: `<div style="background-color: #ef4444; width: 15px; height: 15px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.3);"></div>`,
          iconSize: [15, 15],
          iconAnchor: [7, 7],
        });
      case "medium":
        return L.divIcon({
          className: "custom-div-icon",
          html: `<div style="background-color: #f59e0b; width: 15px; height: 15px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.3);"></div>`,
          iconSize: [15, 15],
          iconAnchor: [7, 7],
        });
      default:
        return L.divIcon({
          className: "custom-div-icon",
          html: `<div style="background-color: #3b82f6; width: 15px; height: 15px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.3);"></div>`,
          iconSize: [15, 15],
          iconAnchor: [7, 7],
        });
    }
  };

  return (
    <Card className="col-span-3 h-[500px]">
      <CardHeader>
        <CardTitle>India Accident Risk Map</CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[440px]">
        <MapContainer
          center={[20.5937, 78.9629] as [number, number]}
          zoom={5}
          style={{ height: "100%", width: "100%", borderRadius: "0 0 0.5rem 0.5rem" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {indianAccidentData.map((accident, index) => (
            <Marker 
              key={index} 
              position={[accident.lat, accident.lng] as [number, number]} 
              icon={getMarkerColor(accident.severity)}
            >
              <Popup>
                <div>
                  <h3 className="font-semibold">{accident.severity.charAt(0).toUpperCase() + accident.severity.slice(1)} Risk Area</h3>
                  <p>{accident.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </CardContent>
    </Card>
  );
}
