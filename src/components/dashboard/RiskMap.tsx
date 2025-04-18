
import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { indianAccidentData } from "@/data/mockData";

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

// This component helps set the initial center and zoom
const MapCenterSetter = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  return null;
};

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
          style={{ height: "100%", width: "100%", borderRadius: "0 0 0.5rem 0.5rem" }}
        >
          <MapCenterSetter center={[20.5937, 78.9629]} zoom={5} />
          <TileLayer
            tileSize={256}
            opacity={1}
            zIndex={1}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {indianAccidentData.map((accident, index) => (
            <Marker 
              key={`marker-${index}`} 
              position={[accident.lat, accident.lng]} 
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
