import React, { useMemo } from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter } from "recharts";
import { weatherData, timeData, roadData, driverData, COLORS } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const RiskFactors = () => {
  // Compute statistical summaries
  const summaries = useMemo(() => {
    const citySeverityCounts = {
      Chennai: { low: 0, medium: 0, high: 0 },
      Hyderabad: { low: 0, medium: 0, high: 0 },
      Pune: { low: 0, medium: 0, high: 0 },
      Mumbai: { low: 0, medium: 0, high: 0 },
      Bangalore: { low: 0, medium: 0, high: 0 },
      Kolkata: { low: 0, medium: 0, high: 0 },
      Delhi: { low: 0, medium: 0, high: 0 }
    };

    return {
      citySeverityCounts,
      topRiskyCities: Object.entries(citySeverityCounts)
        .map(([city, counts]) => ({
          city,
          totalRisks: counts.medium + counts.high,
          highRiskPercentage: ((counts.high / (counts.low + counts.medium + counts.high)) * 100).toFixed(2)
        }))
        .sort((a, b) => Number(b.highRiskPercentage) - Number(a.highRiskPercentage))
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Exploratory Data Analysis</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into accident risk factors and patterns
          </p>
          
          <Card>
            <CardHeader>
              <CardTitle>City Risk Overview</CardTitle>
              <CardDescription>Statistical analysis of accident risks across cities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Top Risky Cities Ranking</h3>
                  {summaries.topRiskyCities.map((cityRisk, index) => (
                    <div key={cityRisk.city} className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <Badge variant={index === 0 ? "destructive" : "secondary"} className="mr-2">
                          #{index + 1}
                        </Badge>
                        {cityRisk.city}
                      </div>
                      <span className="text-muted-foreground">
                        {cityRisk.highRiskPercentage}% High Risk
                      </span>
                    </div>
                  ))}
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart>
                      <CartesianGrid />
                      <XAxis type="category" dataKey="city" />
                      <YAxis type="number" dataKey="highRiskPercentage" />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Scatter data={summaries.topRiskyCities} fill="#8884d8" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Categories</CardTitle>
              <CardDescription>Explore different categories of risk factors</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="weather">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="weather">Weather</TabsTrigger>
                  <TabsTrigger value="time">Time Factors</TabsTrigger>
                  <TabsTrigger value="road">Road Conditions</TabsTrigger>
                  <TabsTrigger value="driver">Driver Behavior</TabsTrigger>
                </TabsList>
                
                <TabsContent value="weather" className="pt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Weather-Related Risk Factors</h3>
                      <p className="text-muted-foreground mb-4">
                        Analysis of how different weather conditions impact accident probability and severity.
                      </p>
                      <ul className="space-y-2">
                        <li><strong>Rain:</strong> Reduced visibility and slippery surfaces increase accident risk by 35%</li>
                        <li><strong>Snow:</strong> Difficult road conditions and poor traction increase risk by 15%</li>
                        <li><strong>Fog:</strong> Severely limited visibility contributes to 12% of weather-related accidents</li>
                        <li><strong>Clear Weather:</strong> Still accounts for 8% of accidents due to other factors</li>
                      </ul>
                    </div>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={weatherData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {weatherData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="time" className="pt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Time-Related Risk Factors</h3>
                      <p className="text-muted-foreground mb-4">
                        Analysis of how different time periods affect accident frequency and severity.
                      </p>
                      <ul className="space-y-2">
                        <li><strong>Rush Hour:</strong> High traffic volume contributes to 40% of time-related accidents</li>
                        <li><strong>Night Driving:</strong> Poor visibility accounts for 25% of accidents</li>
                        <li><strong>Weekends:</strong> Different traffic patterns contribute to 20% of accidents</li>
                        <li><strong>Holidays:</strong> Increased travel and potentially impaired driving contribute to 15%</li>
                      </ul>
                    </div>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={timeData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" fill="#0d9488" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="road" className="pt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Road Condition Risk Factors</h3>
                      <p className="text-muted-foreground mb-4">
                        Analysis of how road types and conditions impact accident likelihood.
                      </p>
                      <ul className="space-y-2">
                        <li><strong>Intersections:</strong> Complex traffic interactions lead to 30% of location-based accidents</li>
                        <li><strong>Highways:</strong> High speeds contribute to 25% of accidents</li>
                        <li><strong>Rural Roads:</strong> Limited lighting and variable conditions account for 20%</li>
                        <li><strong>Bridges:</strong> Slippery surfaces during adverse weather contribute to 15%</li>
                        <li><strong>Construction Zones:</strong> Changed traffic patterns account for 10%</li>
                      </ul>
                    </div>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={roadData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="driver" className="pt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Driver Behavior Risk Factors</h3>
                      <p className="text-muted-foreground mb-4">
                        Analysis of how driver actions and behavior influence accident risk.
                      </p>
                      <ul className="space-y-2">
                        <li><strong>Distracted Driving:</strong> Cell phone use and other distractions account for 35%</li>
                        <li><strong>Speeding:</strong> Excessive speed contributes to 30% of driver-related accidents</li>
                        <li><strong>Intoxication:</strong> Alcohol and drug impairment account for 25%</li>
                        <li><strong>Fatigue:</strong> Drowsy driving contributes to 10% of accidents</li>
                      </ul>
                    </div>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={driverData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {driverData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Multivariate Risk Analysis</CardTitle>
              <CardDescription>Combined factor impact assessment</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Interactive multivariate analysis visualization would appear here.</p>
                <p className="mt-2">This would show how multiple risk factors interact.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default RiskFactors;
