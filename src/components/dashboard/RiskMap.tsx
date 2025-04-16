
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// This would normally be stored in an environment variable
// For the demo, we'll use a placeholder - users should replace with their own token
const MAPBOX_TOKEN = "YOUR_MAPBOX_TOKEN";

interface MapConfig {
  latitude: number;
  longitude: number;
  zoom: number;
}

export function RiskMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapConfig] = useState<MapConfig>({
    latitude: 37.7749,
    longitude: -122.4194, // San Francisco coordinates as example
    zoom: 10,
  });
  const [mapTokenInput, setMapTokenInput] = useState("");
  const [mapToken, setMapToken] = useState<string | null>(MAPBOX_TOKEN !== "YOUR_MAPBOX_TOKEN" ? MAPBOX_TOKEN : null);

  useEffect(() => {
    if (!mapContainer.current || !mapToken) return;

    if (map.current) return; // Map already initialized

    mapboxgl.accessToken = mapToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [mapConfig.longitude, mapConfig.latitude],
      zoom: mapConfig.zoom,
      pitch: 45,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      "top-right"
    );

    // Add sample accident data points (this would come from your API/dataset)
    const sampleAccidentData = [
      { lng: -122.4194, lat: 37.7749, severity: "high" },
      { lng: -122.4124, lat: 37.7834, severity: "medium" },
      { lng: -122.4314, lat: 37.7654, severity: "low" },
      { lng: -122.4104, lat: 37.7919, severity: "high" },
      { lng: -122.4432, lat: 37.7724, severity: "medium" },
    ];

    // Add markers for each accident
    sampleAccidentData.forEach((accident) => {
      const markerColor = 
        accident.severity === "high" ? "#ef4444" : 
        accident.severity === "medium" ? "#f59e0b" : "#3b82f6";
        
      const markerElement = document.createElement('div');
      markerElement.className = 'accident-marker';
      markerElement.style.width = '15px';
      markerElement.style.height = '15px';
      markerElement.style.borderRadius = '50%';
      markerElement.style.backgroundColor = markerColor;
      markerElement.style.border = '2px solid white';
      markerElement.style.boxShadow = '0 0 5px rgba(0,0,0,0.3)';
      
      new mapboxgl.Marker(markerElement)
        .setLngLat([accident.lng, accident.lat])
        .addTo(map.current!);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapConfig, mapToken]);

  // Provide a UI for users to input their Mapbox token if needed
  if (!mapToken && MAPBOX_TOKEN === "YOUR_MAPBOX_TOKEN") {
    return (
      <Card className="col-span-3 h-[500px]">
        <CardHeader>
          <CardTitle>Accident Risk Map</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-[400px]">
          <div className="text-center mb-4 max-w-md">
            <p className="mb-2">To view the interactive map, please enter your Mapbox token:</p>
            <p className="text-xs text-muted-foreground mb-4">
              Get your free token at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
            </p>
            <input 
              type="text" 
              value={mapTokenInput} 
              onChange={(e) => setMapTokenInput(e.target.value)} 
              placeholder="pk.eyJ1..." 
              className="w-full p-2 border rounded mb-2" 
            />
            <button 
              onClick={() => setMapToken(mapTokenInput)}
              className="bg-primary text-white py-2 px-4 rounded"
            >
              Load Map
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-3 h-[500px]">
      <CardHeader>
        <CardTitle>Accident Risk Map</CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[440px]">
        <div ref={mapContainer} className="w-full h-full rounded-b-lg" />
      </CardContent>
    </Card>
  );
}
