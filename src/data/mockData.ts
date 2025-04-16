
// Mock dataset for Road Risk Insight Engine

// Risk Map Data - Indian cities accidents
export const indianAccidentData = [
  { id: 1, city: "Chennai", lat: 13.109, lng: 80.3149, severity: "low", description: "Low accident near Chennai" },
  { id: 2, city: "Hyderabad", lat: 17.3652, lng: 78.4952, severity: "medium", description: "Medium accident near Hyderabad" },
  { id: 3, city: "Pune", lat: 18.5328, lng: 73.8696, severity: "medium", description: "Medium accident near Pune" },
  { id: 4, city: "Hyderabad", lat: 17.4174, lng: 78.453, severity: "medium", description: "Medium accident near Hyderabad" },
  { id: 5, city: "Mumbai", lat: 19.0968, lng: 72.9037, severity: "high", description: "High accident near Mumbai" },
  // Including a subset of data for performance reasons
  { id: 60, city: "Delhi", lat: 28.6594, lng: 77.2226, severity: "high", description: "High accident near Delhi" },
  { id: 113, city: "Delhi", lat: 28.6429, lng: 77.2083, severity: "high", description: "High accident near Delhi" },
  { id: 202, city: "Delhi", lat: 28.6325, lng: 77.2588, severity: "high", description: "High accident near Delhi" },
  { id: 229, city: "Delhi", lat: 28.6003, lng: 77.2429, severity: "high", description: "High accident near Delhi" },
  { id: 281, city: "Mumbai", lat: 19.0918, lng: 72.8912, severity: "high", description: "High accident near Mumbai" },
  { id: 298, city: "Chennai", lat: 13.0418, lng: 80.3026, severity: "high", description: "High accident near Chennai" },
  { id: 313, city: "Mumbai", lat: 19.0649, lng: 72.9105, severity: "high", description: "High accident near Mumbai" },
  { id: 329, city: "Hyderabad", lat: 17.3355, lng: 78.4896, severity: "high", description: "High accident near Hyderabad" },
  { id: 337, city: "Kolkata", lat: 22.5738, lng: 88.3383, severity: "high", description: "High accident near Kolkata" },
  { id: 369, city: "Pune", lat: 18.5233, lng: 73.8825, severity: "high", description: "High accident near Pune" },
  { id: 430, city: "Bangalore", lat: 12.9279, lng: 77.6329, severity: "high", description: "High accident near Bangalore" },
  { id: 470, city: "Delhi", lat: 28.5898, lng: 77.2098, severity: "high", description: "High accident near Delhi" },
  { id: 476, city: "Hyderabad", lat: 17.4203, lng: 78.5355, severity: "high", description: "High accident near Hyderabad" },
  { id: 498, city: "Mumbai", lat: 19.1097, lng: 72.8799, severity: "high", description: "High accident near Mumbai" },
  // Adding some low and medium risk points for balance
  { id: 111, city: "Chennai", lat: 13.1092, lng: 80.2718, severity: "low", description: "Low accident near Chennai" },
  { id: 130, city: "Kolkata", lat: 22.58, lng: 88.3864, severity: "low", description: "Low accident near Kolkata" },
  { id: 145, city: "Delhi", lat: 28.5938, lng: 77.2398, severity: "low", description: "Low accident near Delhi" },
  { id: 175, city: "Pune", lat: 18.5186, lng: 73.8585, severity: "low", description: "Low accident near Pune" },
  { id: 200, city: "Bangalore", lat: 12.9331, lng: 77.5464, severity: "low", description: "Low accident near Bangalore" },
  { id: 235, city: "Delhi", lat: 28.5814, lng: 77.2397, severity: "medium", description: "Medium accident near Delhi" },
  { id: 255, city: "Mumbai", lat: 19.0375, lng: 72.8803, severity: "medium", description: "Medium accident near Mumbai" },
  { id: 293, city: "Kolkata", lat: 22.5515, lng: 88.4101, severity: "medium", description: "Medium accident near Kolkata" },
  { id: 315, city: "Bangalore", lat: 12.9414, lng: 77.6013, severity: "medium", description: "Medium accident near Bangalore" },
  { id: 333, city: "Pune", lat: 18.5299, lng: 73.9045, severity: "medium", description: "Medium accident near Pune" },
];

// Full dataset for ML model (exported separately for ML processing)
export const fullAccidentDataset = Array(500).fill(null).map((_, index) => ({
  id: index + 1,
  // For demo purposes, we'll generate random coordinates within India
  // In a real app, you would use the actual 500 data points provided
}));

// Timeline Chart Data - Monthly accident trends
export const monthlyData = [
  { name: "Jan", accidents: 65, riskIndex: 42 },
  { name: "Feb", accidents: 59, riskIndex: 38 },
  { name: "Mar", accidents: 80, riskIndex: 52 },
  { name: "Apr", accidents: 81, riskIndex: 53 },
  { name: "May", accidents: 76, riskIndex: 49 },
  { name: "Jun", accidents: 55, riskIndex: 36 },
  { name: "Jul", accidents: 40, riskIndex: 26 },
  { name: "Aug", accidents: 35, riskIndex: 23 },
  { name: "Sep", accidents: 48, riskIndex: 31 },
  { name: "Oct", accidents: 65, riskIndex: 42 },
  { name: "Nov", accidents: 70, riskIndex: 45 },
  { name: "Dec", accidents: 85, riskIndex: 55 },
];

// Risk Factors Chart Data
export const riskFactorData = [
  { name: "Poor Weather", value: 35 },
  { name: "Speeding", value: 25 },
  { name: "Distracted Driving", value: 20 },
  { name: "Road Conditions", value: 12 },
  { name: "Vehicle Failure", value: 8 },
];

export const severityData = [
  { name: "Fatal", value: 15, color: "#ef4444" },
  { name: "Serious", value: 30, color: "#f59e0b" },
  { name: "Minor", value: 55, color: "#3b82f6" },
];

export const timeOfDayData = [
  { name: "12am-4am", value: 15 },
  { name: "4am-8am", value: 22 },
  { name: "8am-12pm", value: 18 },
  { name: "12pm-4pm", value: 16 },
  { name: "4pm-8pm", value: 26 },
  { name: "8pm-12am", value: 13 },
];

// Clustering Analysis Data
export const clusterData = [
  { name: "Cluster 1: Urban Intersections", value: 35, color: "#3b82f6" },
  { name: "Cluster 2: Highway Accidents", value: 25, color: "#0d9488" },
  { name: "Cluster 3: Weather-Related", value: 20, color: "#f59e0b" },
  { name: "Cluster 4: Night Accidents", value: 12, color: "#7c3aed" },
  { name: "Cluster 5: Vehicle Failures", value: 8, color: "#ef4444" },
];

// Risk Factors Page Data
export const weatherData = [
  { name: "Rain", value: 35 },
  { name: "Snow", value: 15 },
  { name: "Fog", value: 12 },
  { name: "Clear", value: 8 },
  { name: "Cloudy", value: 5 },
];

export const timeData = [
  { name: "Rush Hour", value: 40 },
  { name: "Night", value: 25 },
  { name: "Weekend", value: 20 },
  { name: "Holiday", value: 15 },
];

export const roadData = [
  { name: "Intersection", value: 30 },
  { name: "Highway", value: 25 },
  { name: "Rural Road", value: 20 },
  { name: "Bridge", value: 15 },
  { name: "Construction", value: 10 },
];

export const driverData = [
  { name: "Distracted", value: 35 },
  { name: "Speeding", value: 30 },
  { name: "Intoxicated", value: 25 },
  { name: "Fatigue", value: 10 },
];

// Color palette for charts
export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// Dashboard statistics
export const statsData = [
  { 
    title: "Total Accidents", 
    value: "12,548", 
    icon: "Car",
    trend: { value: 4.5, positive: false }
  },
  { 
    title: "High Risk Areas", 
    value: "86", 
    icon: "AlertTriangle",
    trend: { value: 2.1, positive: false }
  },
  { 
    title: "Monitored Locations", 
    value: "1,247", 
    icon: "MapPin",
    trend: { value: 12.3, positive: true }
  },
  { 
    title: "Data Period", 
    value: "12 months", 
    icon: "Calendar"
  }
];

// City-based statistics for the ML model
export const cityStats = {
  "Mumbai": { accidentRate: 0.78, populationDensity: 0.92, trafficDensity: 0.88 },
  "Delhi": { accidentRate: 0.82, populationDensity: 0.85, trafficDensity: 0.91 },
  "Bangalore": { accidentRate: 0.65, populationDensity: 0.72, trafficDensity: 0.79 },
  "Chennai": { accidentRate: 0.59, populationDensity: 0.68, trafficDensity: 0.74 },
  "Kolkata": { accidentRate: 0.71, populationDensity: 0.89, trafficDensity: 0.76 },
  "Hyderabad": { accidentRate: 0.63, populationDensity: 0.65, trafficDensity: 0.77 },
  "Pune": { accidentRate: 0.56, populationDensity: 0.61, trafficDensity: 0.69 }
};

// Time-based risk factors
export const timeRiskFactors = {
  "morning": 0.4,    // 6am-10am
  "midday": 0.5,     // 10am-3pm
  "evening": 0.75,   // 3pm-8pm
  "night": 0.9       // 8pm-6am
};

// Weather risk factors
export const weatherRiskFactors = {
  "clear": 0.3,
  "cloudy": 0.4,
  "rain": 0.7,
  "fog": 0.8,
  "snow": 0.9
};
