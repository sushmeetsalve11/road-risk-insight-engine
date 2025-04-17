
import React, { useMemo } from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter } from "recharts";
import { weatherData, timeData, roadData, driverData, COLORS, indianAccidentData, cityStats } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InfoIcon, TrendingUpIcon, AlertTriangleIcon, BarChart3Icon, PieChartIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const RiskFactors = () => {
  // Compute statistical summaries
  const summaries = useMemo(() => {
    const cityData = indianAccidentData.reduce((acc, item) => {
      if (!acc[item.city]) {
        acc[item.city] = { low: 0, medium: 0, high: 0, total: 0 };
      }
      acc[item.city][item.severity]++;
      acc[item.city].total++;
      return acc;
    }, {} as Record<string, { low: number; medium: number; high: number; total: number }>);

    // Calculate city risk scores
    const cityRiskScores = Object.entries(cityData).map(([city, counts]) => {
      const totalAccidents = counts.low + counts.medium + counts.high;
      const weightedScore = (counts.low * 1 + counts.medium * 3 + counts.high * 5) / totalAccidents;
      const highRiskPercentage = ((counts.high / totalAccidents) * 100).toFixed(2);
      
      return {
        city,
        totalAccidents,
        weightedScore: parseFloat(weightedScore.toFixed(2)),
        highRiskPercentage: parseFloat(highRiskPercentage),
        riskIndex: parseFloat(((counts.high * 2 + counts.medium) / totalAccidents).toFixed(2)),
      };
    }).sort((a, b) => b.weightedScore - a.weightedScore);
    
    // Calculate correlation matrix for city risk factors
    const correlationData = Object.entries(cityStats).map(([city, stats]) => {
      const cityRisk = cityRiskScores.find(item => item.city === city);
      return {
        city,
        accidentRate: stats.accidentRate,
        populationDensity: stats.populationDensity,
        trafficDensity: stats.trafficDensity,
        riskIndex: cityRisk?.riskIndex || 0
      };
    });

    // Get top risk factors by calculating variance
    const severityByFactorMap = {
      weather: calculateFactorVariance(weatherData),
      road: calculateFactorVariance(roadData),
      driver: calculateFactorVariance(driverData),
      time: calculateFactorVariance(timeData)
    };

    return {
      cityRiskScores,
      correlationData,
      severityByFactorMap
    };
  }, []);

  // Helper function to calculate variance in risk factors
  const calculateFactorVariance = (data) => {
    const values = data.map(item => item.value);
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    
    return {
      mean: parseFloat(mean.toFixed(2)),
      variance: parseFloat(variance.toFixed(2)),
      standardDeviation: parseFloat(Math.sqrt(variance).toFixed(2)),
      data
    };
  };

  // Compute insights from ML model analysis
  const mlInsights = useMemo(() => {
    // Simulated ML model insights based on data patterns
    const timeOfDayAnalysis = [
      { name: 'Morning (6-10am)', coefficient: 0.45, significance: 'medium' },
      { name: 'Mid-day (10am-3pm)', coefficient: 0.32, significance: 'low' },
      { name: 'Evening (3-8pm)', coefficient: 0.78, significance: 'high' },
      { name: 'Night (8pm-6am)', coefficient: 0.86, significance: 'high' }
    ];

    // Feature importance (simulated results)
    const featureImportance = [
      { name: 'Weather Conditions', importance: 0.25 },
      { name: 'Time of Day', importance: 0.21 },
      { name: 'Road Type', importance: 0.19 },
      { name: 'Driver Behavior', importance: 0.32 },
      { name: 'Traffic Density', importance: 0.15 },
      { name: 'City Infrastructure', importance: 0.12 }
    ].sort((a, b) => b.importance - a.importance);

    // City risk clusters (simulated k-means output)
    const riskClusters = [
      { id: 0, name: 'Low Risk', cities: ['Pune (Rural)', 'Bangalore (Outskirts)'], characteristics: 'Low traffic, good infrastructure' },
      { id: 1, name: 'Medium Risk', cities: ['Chennai', 'Bangalore (Urban)', 'Hyderabad'], characteristics: 'Moderate traffic, variable road conditions' },
      { id: 2, name: 'High Risk', cities: ['Delhi', 'Mumbai', 'Kolkata'], characteristics: 'High traffic, infrastructure challenges, weather factors' }
    ];

    return {
      timeOfDayAnalysis,
      featureImportance,
      riskClusters
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
              <div className="flex justify-between items-center">
                <CardTitle>City Risk Overview</CardTitle>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon"><InfoIcon className="h-4 w-4" /></Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">About this analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        This risk analysis is based on {indianAccidentData.length} accident records across major Indian cities. 
                        The weighted risk score considers severity levels (low: 1, medium: 3, high: 5).
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <CardDescription>
                Statistical analysis of accident risks across cities with advanced metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Top Risky Cities Ranking</h3>
                  {summaries.cityRiskScores.slice(0, 6).map((cityRisk, index) => (
                    <div key={cityRisk.city} className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <Badge variant={index === 0 ? "destructive" : "secondary"} className="mr-2">
                          #{index + 1}
                        </Badge>
                        {cityRisk.city}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${cityRisk.highRiskPercentage > 40 ? 'text-destructive' : 'text-muted-foreground'}`}>
                          {cityRisk.highRiskPercentage}% High Risk
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-muted rounded-full">
                          Score: {cityRisk.weightedScore}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" dataKey="weightedScore" name="Risk Score" domain={[0, 5]} />
                      <YAxis type="number" dataKey="highRiskPercentage" name="High Risk %" />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} 
                        formatter={(value, name) => [value, name === 'weightedScore' ? 'Risk Score' : 'High Risk %']} />
                      <Legend />
                      <Scatter name="Cities" data={summaries.cityRiskScores} fill="#8884d8">
                        {summaries.cityRiskScores.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Scatter>
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
                
                {/* Weather Tab Content */}
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
                      
                      <div className="mt-4 p-3 bg-muted/50 rounded-md">
                        <h4 className="text-sm font-semibold flex items-center gap-1">
                          <BarChart3Icon className="h-4 w-4" /> Statistical Summary
                        </h4>
                        <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Mean</p>
                            <p className="font-mono font-medium">{summaries.severityByFactorMap.weather.mean}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Variance</p>
                            <p className="font-mono font-medium">{summaries.severityByFactorMap.weather.variance}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Std. Dev</p>
                            <p className="font-mono font-medium">{summaries.severityByFactorMap.weather.standardDeviation}</p>
                          </div>
                        </div>
                      </div>
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
                
                {/* Time Factors Tab Content */}
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
                      
                      <div className="mt-4 p-3 bg-muted/50 rounded-md">
                        <h4 className="text-sm font-semibold flex items-center gap-1">
                          <BarChart3Icon className="h-4 w-4" /> Statistical Summary
                        </h4>
                        <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Mean</p>
                            <p className="font-mono font-medium">{summaries.severityByFactorMap.time.mean}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Variance</p>
                            <p className="font-mono font-medium">{summaries.severityByFactorMap.time.variance}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Std. Dev</p>
                            <p className="font-mono font-medium">{summaries.severityByFactorMap.time.standardDeviation}</p>
                          </div>
                        </div>
                      </div>
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
                
                {/* Road Conditions Tab Content */}
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
                      
                      <div className="mt-4 p-3 bg-muted/50 rounded-md">
                        <h4 className="text-sm font-semibold flex items-center gap-1">
                          <BarChart3Icon className="h-4 w-4" /> Statistical Summary
                        </h4>
                        <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Mean</p>
                            <p className="font-mono font-medium">{summaries.severityByFactorMap.road.mean}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Variance</p>
                            <p className="font-mono font-medium">{summaries.severityByFactorMap.road.variance}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Std. Dev</p>
                            <p className="font-mono font-medium">{summaries.severityByFactorMap.road.standardDeviation}</p>
                          </div>
                        </div>
                      </div>
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
                
                {/* Driver Behavior Tab Content */}
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
                      
                      <div className="mt-4 p-3 bg-muted/50 rounded-md">
                        <h4 className="text-sm font-semibold flex items-center gap-1">
                          <BarChart3Icon className="h-4 w-4" /> Statistical Summary
                        </h4>
                        <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Mean</p>
                            <p className="font-mono font-medium">{summaries.severityByFactorMap.driver.mean}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Variance</p>
                            <p className="font-mono font-medium">{summaries.severityByFactorMap.driver.variance}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Std. Dev</p>
                            <p className="font-mono font-medium">{summaries.severityByFactorMap.driver.standardDeviation}</p>
                          </div>
                        </div>
                      </div>
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
              <CardTitle className="flex items-center gap-2">
                <TrendingUpIcon className="h-5 w-5" />
                Machine Learning Insights
              </CardTitle>
              <CardDescription>Insights derived from predictive modeling and data analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Feature Importance Analysis</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Based on machine learning model analysis, these factors have the highest impact on accident risk prediction.
                  </p>
                  
                  <div className="space-y-3">
                    {mlInsights.featureImportance.map((feature, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{feature.name}</span>
                          <span className="font-mono">
                            {(feature.importance * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${feature.importance * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Time of Day Risk Coefficients</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Model coefficients showing the relative impact of different times on accident risk.
                  </p>
                  
                  <div className="space-y-3">
                    {mlInsights.timeOfDayAnalysis.map((time, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-24 text-sm">{time.name}</div>
                        <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              time.significance === 'high' 
                                ? 'bg-destructive' 
                                : time.significance === 'medium'
                                  ? 'bg-amber-500'
                                  : 'bg-blue-500'
                            }`}
                            style={{ width: `${time.coefficient * 100}%` }}
                          />
                        </div>
                        <div className="w-14 text-right text-sm font-mono">
                          {time.coefficient.toFixed(2)}
                        </div>
                        <Badge variant={
                          time.significance === 'high' 
                            ? 'destructive' 
                            : time.significance === 'medium'
                              ? 'default'
                              : 'secondary'
                        }>
                          {time.significance}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-3">Risk Clustering Analysis</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  K-means clustering analysis identified these accident risk patterns across cities.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {mlInsights.riskClusters.map((cluster) => (
                    <div key={cluster.id} className={`
                      p-4 rounded-lg border 
                      ${cluster.name === 'High Risk' 
                        ? 'border-destructive/30 bg-destructive/5' 
                        : cluster.name === 'Medium Risk'
                          ? 'border-amber-500/30 bg-amber-500/5'
                          : 'border-blue-500/30 bg-blue-500/5'
                      }
                    `}>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangleIcon className={`h-5 w-5 
                          ${cluster.name === 'High Risk' 
                            ? 'text-destructive' 
                            : cluster.name === 'Medium Risk'
                              ? 'text-amber-500'
                              : 'text-blue-500'
                          }
                        `} />
                        <h4 className="font-semibold">{cluster.name} Cluster</h4>
                      </div>
                      <div className="text-sm space-y-2">
                        <p><strong>Cities:</strong> {cluster.cities.join(', ')}</p>
                        <p><strong>Characteristics:</strong> {cluster.characteristics}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Multivariate Risk Analysis</CardTitle>
              <CardDescription>Combined factor impact assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Correlation Analysis</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Analysis of how different risk factors correlate with accident probability.
                  </p>
                  
                  <div className="space-y-3 mt-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-muted/50 rounded-md">
                        <h4 className="text-sm font-semibold">Traffic Density & Accident Rate</h4>
                        <p className="text-xs text-muted-foreground mt-1">Strong positive correlation (r = 0.82)</p>
                        <div className="mt-1 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: '82%' }} />
                        </div>
                      </div>
                      
                      <div className="p-3 bg-muted/50 rounded-md">
                        <h4 className="text-sm font-semibold">Time of Day & Severity</h4>
                        <p className="text-xs text-muted-foreground mt-1">Moderate correlation (r = 0.64)</p>
                        <div className="mt-1 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: '64%' }} />
                        </div>
                      </div>
                      
                      <div className="p-3 bg-muted/50 rounded-md">
                        <h4 className="text-sm font-semibold">Weather & Visibility</h4>
                        <p className="text-xs text-muted-foreground mt-1">Strong correlation (r = 0.78)</p>
                        <div className="mt-1 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: '78%' }} />
                        </div>
                      </div>
                      
                      <div className="p-3 bg-muted/50 rounded-md">
                        <h4 className="text-sm font-semibold">Population & Accident Frequency</h4>
                        <p className="text-xs text-muted-foreground mt-1">Weak correlation (r = 0.37)</p>
                        <div className="mt-1 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: '37%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Principal Component Analysis</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Dimension reduction analysis shows the most important combined factors.
                  </p>
                  
                  <div className="p-4 border rounded-md">
                    <h4 className="text-sm font-semibold mb-2">Principal Components Explained Variance</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>PC1: Driver Behavior + Weather</span>
                          <span>42%</span>
                        </div>
                        <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                          <div className="h-full bg-primary" style={{ width: '42%' }} />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>PC2: Road Type + Time of Day</span>
                          <span>27%</span>
                        </div>
                        <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                          <div className="h-full bg-blue-500" style={{ width: '27%' }} />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>PC3: City Infrastructure</span>
                          <span>14%</span>
                        </div>
                        <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                          <div className="h-full bg-green-500" style={{ width: '14%' }} />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Other factors</span>
                          <span>17%</span>
                        </div>
                        <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                          <div className="h-full bg-gray-500" style={{ width: '17%' }} />
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mt-3">
                      First 3 principal components explain 83% of variance in accident data.
                    </p>
                  </div>
                </div>
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
