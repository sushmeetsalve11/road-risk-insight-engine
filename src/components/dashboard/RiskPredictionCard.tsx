
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

type RiskLevel = "low" | "medium" | "high";

export function RiskPredictionCard() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState("");
  const [riskResult, setRiskResult] = useState<RiskLevel | null>(null);
  
  const handlePredict = () => {
    // This would normally call your ML model API
    // For demo purposes, we'll just randomize the result
    const results: RiskLevel[] = ["low", "medium", "high"];
    const randomIndex = Math.floor(Math.random() * results.length);
    setRiskResult(results[randomIndex]);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Prediction</CardTitle>
        <CardDescription>Predict accident risk for a location</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              placeholder="e.g. 37.7749"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              placeholder="e.g. -122.4194"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="time">Time of Day</Label>
            <Input
              id="time"
              placeholder="e.g. 18:00"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="weather">Weather</Label>
            <Input
              id="weather"
              placeholder="e.g. Rainy"
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
            />
          </div>
        </div>
        
        <Button className="w-full" onClick={handlePredict}>Predict Risk</Button>
        
        {riskResult && (
          <div className="mt-4 p-3 rounded-md border flex items-center justify-between">
            <div className="flex items-center">
              {riskResult === "low" && <CheckCircle className="h-5 w-5 text-risk-low mr-2" />}
              {riskResult === "medium" && <AlertTriangle className="h-5 w-5 text-risk-medium mr-2" />}
              {riskResult === "high" && <XCircle className="h-5 w-5 text-risk-high mr-2" />}
              
              <span>
                <strong className="capitalize">{riskResult}</strong> Risk Predicted
              </span>
            </div>
            <div 
              className={`h-4 w-4 rounded-full ${
                riskResult === "low" ? "bg-risk-low" : 
                riskResult === "medium" ? "bg-risk-medium" : "bg-risk-high"
              }`}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
