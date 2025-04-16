
// Mock dataset for Road Risk Insight Engine

// Risk Map Data - Major Indian cities
export const indianAccidentData = [
  { lng: 77.2090, lat: 28.6139, severity: "high", description: "Major collision in Delhi" },
  { lng: 72.8777, lat: 19.0760, severity: "high", description: "Multi-vehicle crash in Mumbai" },
  { lng: 77.5946, lat: 12.9716, severity: "medium", description: "Vehicle skidding in Bangalore" },
  { lng: 80.2707, lat: 13.0827, severity: "medium", description: "Road hazard accident in Chennai" },
  { lng: 88.3639, lat: 22.5726, severity: "low", description: "Minor accident in Kolkata" },
  { lng: 78.4867, lat: 17.3850, severity: "high", description: "Highway collision in Hyderabad" },
  { lng: 73.8567, lat: 18.5204, severity: "low", description: "Single vehicle incident in Pune" },
];

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
