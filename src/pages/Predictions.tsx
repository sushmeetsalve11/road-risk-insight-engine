
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { CheckCircle, ChevronRight } from "lucide-react";

const featureImportanceData = [
  { name: "Weather", value: 28 },
  { name: "Time of Day", value: 22 },
  { name: "Road Type", value: 18 },
  { name: "Traffic Volume", value: 15 },
  { name: "Speed Limit", value: 10 },
  { name: "Vehicle Type", value: 7 },
];

const modelPerformanceData = [
  { name: "Random Forest", accuracy: 0.82, precision: 0.78, recall: 0.85 },
  { name: "Logistic Regression", accuracy: 0.75, precision: 0.72, recall: 0.74 },
  { name: "Gradient Boosting", accuracy: 0.84, precision: 0.81, recall: 0.83 },
  { name: "Neural Network", accuracy: 0.79, precision: 0.76, recall: 0.80 },
];

const Predictions = () => {
  const [predictionResult, setPredictionResult] = useState<number | null>(null);
  const [predictionFactors, setPredictionFactors] = useState<string[]>([]);
  
  const handlePredict = () => {
    // Simulate prediction result
    const risk = Math.floor(Math.random() * 100);
    setPredictionResult(risk);
    
    // Generate random contributing factors
    const factors = [
      "Rainy weather conditions",
      "Rush hour traffic",
      "Intersection location",
      "Speed exceeding limit",
      "Poor road conditions"
    ];
    
    // Randomly select 2-3 factors
    const numFactors = Math.floor(Math.random() * 2) + 2;
    const selectedFactors = [];
    for (let i = 0; i < numFactors; i++) {
      const randomIndex = Math.floor(Math.random() * factors.length);
      selectedFactors.push(factors[randomIndex]);
      factors.splice(randomIndex, 1);
    }
    
    setPredictionFactors(selectedFactors);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Risk Prediction</h1>
          <p className="text-muted-foreground">
            Predict accident risk and probability based on conditions and location.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Prediction Input</CardTitle>
                <CardDescription>Enter conditions to generate a risk prediction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input id="latitude" placeholder="Latitude" />
                      <Input id="longitude" placeholder="Longitude" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="date">Date & Time</Label>
                    <Input id="date" type="datetime-local" />
                  </div>
                  
                  <div>
                    <Label htmlFor="weather">Weather Condition</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select weather" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clear">Clear</SelectItem>
                        <SelectItem value="rain">Rain</SelectItem>
                        <SelectItem value="snow">Snow</SelectItem>
                        <SelectItem value="fog">Fog</SelectItem>
                        <SelectItem value="windy">Windy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="road">Road Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select road type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="highway">Highway</SelectItem>
                        <SelectItem value="urban">Urban Street</SelectItem>
                        <SelectItem value="rural">Rural Road</SelectItem>
                        <SelectItem value="intersection">Intersection</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="traffic">Traffic Density</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select traffic density" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full" onClick={handlePredict}>Generate Prediction</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Prediction Results</CardTitle>
                <CardDescription>Risk assessment based on input factors</CardDescription>
              </CardHeader>
              <CardContent>
                {predictionResult === null ? (
                  <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
                    <p>Enter location and conditions to generate a prediction</p>
                    <ChevronRight className="mt-2" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-xl font-medium">Risk Assessment</h3>
                        <p className="text-muted-foreground">Based on provided conditions</p>
                      </div>
                      <div className="text-right">
                        <span className="text-4xl font-bold">{predictionResult}%</span>
                        <p className="text-sm text-muted-foreground">Risk Level</p>
                      </div>
                    </div>
                    
                    <div className="w-full bg-secondary rounded-full h-4">
                      <div 
                        className={`h-4 rounded-full ${
                          predictionResult < 30 ? "bg-risk-low" : 
                          predictionResult < 70 ? "bg-risk-medium" : "bg-risk-high"
                        }`}
                        style={{ width: `${predictionResult}%` }}
                      />
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Contributing Factors</h4>
                      <ul className="space-y-2">
                        {predictionFactors.map((factor, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-data-teal mr-2" />
                            {factor}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Recommendations</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        {predictionResult > 70 ? (
                          <>
                            <li>Consider alternative routes if possible</li>
                            <li>Drive with extra caution and reduce speed</li>
                            <li>Maintain extra distance between vehicles</li>
                          </>
                        ) : predictionResult > 30 ? (
                          <>
                            <li>Be alert to changing conditions</li>
                            <li>Follow all traffic rules carefully</li>
                          </>
                        ) : (
                          <>
                            <li>Normal driving conditions, follow standard safety practices</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Model Insights</CardTitle>
              <CardDescription>Understanding the prediction model</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="features">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="features">Feature Importance</TabsTrigger>
                  <TabsTrigger value="performance">Model Performance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="features" className="pt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Risk Feature Importance</h3>
                      <p className="text-muted-foreground mb-4">
                        Understanding which factors have the greatest impact on accident risk prediction.
                      </p>
                      <ul className="space-y-2">
                        <li><strong>Weather (28%):</strong> Most significant factor in risk prediction</li>
                        <li><strong>Time of Day (22%):</strong> Second most important predictor</li>
                        <li><strong>Road Type (18%):</strong> Different road configurations carry different risks</li>
                        <li><strong>Traffic Volume (15%):</strong> Higher traffic correlates with increased accident likelihood</li>
                      </ul>
                    </div>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={featureImportanceData}
                          layout="vertical"
                          margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis type="category" dataKey="name" />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" fill="#2563eb" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="performance" className="pt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Predictive Model Performance</h3>
                      <p className="text-muted-foreground mb-4">
                        Evaluation metrics for different machine learning models used for prediction.
                      </p>
                      <ul className="space-y-2">
                        <li><strong>Gradient Boosting:</strong> Best overall performance (84% accuracy)</li>
                        <li><strong>Random Forest:</strong> Strong performer with good recall (85%)</li>
                        <li><strong>Neural Network:</strong> Balanced performance across metrics</li>
                        <li><strong>Logistic Regression:</strong> Simplest model with acceptable performance</li>
                      </ul>
                    </div>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={modelPerformanceData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="accuracy" stroke="#2563eb" strokeWidth={2} />
                          <Line type="monotone" dataKey="precision" stroke="#0d9488" strokeWidth={2} />
                          <Line type="monotone" dataKey="recall" stroke="#7c3aed" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Predictions;
