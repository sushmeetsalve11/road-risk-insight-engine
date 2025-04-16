
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PredictionInput, PredictionResult, predictRisk } from "@/utils/mlModel";

export function RiskPredictionCard() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState("");
  const [city, setCity] = useState("");
  const [riskResult, setRiskResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handlePredict = async () => {
    // Basic validation
    if (!latitude || !longitude || !time || !weather || !city) {
      toast.error("Please fill in all fields");
      return;
    }
    
    try {
      setIsLoading(true);
      
      const input: PredictionInput = {
        city,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        time,
        weather
      };
      
      // Run prediction with our ML model
      const result = await predictRisk(input);
      setRiskResult(result);
      
      toast.success("Risk prediction completed");
    } catch (error) {
      console.error("Prediction error:", error);
      toast.error("Error generating prediction");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Prediction</CardTitle>
        <CardDescription>Predict accident risk for a location</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Delhi">Delhi</SelectItem>
                <SelectItem value="Bangalore">Bangalore</SelectItem>
                <SelectItem value="Chennai">Chennai</SelectItem>
                <SelectItem value="Kolkata">Kolkata</SelectItem>
                <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                <SelectItem value="Pune">Pune</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                placeholder="e.g. 19.0760"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                placeholder="e.g. 72.8777"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="time">Time of Day</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="weather">Weather</Label>
            <Select value={weather} onValueChange={setWeather}>
              <SelectTrigger>
                <SelectValue placeholder="Select weather" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Clear">Clear</SelectItem>
                <SelectItem value="Cloudy">Cloudy</SelectItem>
                <SelectItem value="Rain">Rain</SelectItem>
                <SelectItem value="Fog">Fog</SelectItem>
                <SelectItem value="Snow">Snow</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          className="w-full mt-4" 
          onClick={handlePredict}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : "Predict Risk"}
        </Button>
        
        {riskResult && (
          <div className="mt-4 p-3 rounded-md border space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {riskResult.riskLevel === "low" && <CheckCircle className="h-5 w-5 text-green-500 mr-2" />}
                {riskResult.riskLevel === "medium" && <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />}
                {riskResult.riskLevel === "high" && <XCircle className="h-5 w-5 text-red-500 mr-2" />}
                
                <span>
                  <strong className="capitalize">{riskResult.riskLevel}</strong> Risk Predicted
                </span>
              </div>
              <div 
                className={`h-4 w-4 rounded-full ${
                  riskResult.riskLevel === "low" ? "bg-green-500" : 
                  riskResult.riskLevel === "medium" ? "bg-amber-500" : "bg-red-500"
                }`}
              />
            </div>
            
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground flex justify-between">
                <span>Risk Score:</span>
                <span className="font-medium">{riskResult.riskScore}%</span>
              </div>
              <div className="text-sm text-muted-foreground flex justify-between">
                <span>Confidence:</span>
                <span className="font-medium">{riskResult.confidenceLevel}%</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium">Contributing Factors:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {riskResult.contributingFactors.map((factor, index) => (
                  <li key={index}>• {factor}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
