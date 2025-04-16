
import * as tf from '@tensorflow/tfjs';
import { cityStats, timeRiskFactors, weatherRiskFactors } from '@/data/mockData';

// Define the types of features and output
export type PredictionInput = {
  city: string;
  latitude: number;
  longitude: number;
  time: string;
  weather: string;
};

export type PredictionResult = {
  riskLevel: "low" | "medium" | "high";
  riskScore: number;
  confidenceLevel: number;
  contributingFactors: string[];
};

// Simple feature extraction
const extractFeatures = (input: PredictionInput): number[] => {
  // City factors
  const cityFeatures = cityStats[input.city as keyof typeof cityStats] || {
    accidentRate: 0.5, populationDensity: 0.5, trafficDensity: 0.5
  };
  
  // Time factors
  let timeOfDay = "midday";
  const hour = parseInt(input.time.split(':')[0]);
  if (hour >= 6 && hour < 10) timeOfDay = "morning";
  else if (hour >= 10 && hour < 15) timeOfDay = "midday";
  else if (hour >= 15 && hour < 20) timeOfDay = "evening";
  else timeOfDay = "night";
  
  const timeRisk = timeRiskFactors[timeOfDay as keyof typeof timeRiskFactors];
  
  // Weather factors
  const weatherRisk = weatherRiskFactors[input.weather.toLowerCase() as keyof typeof weatherRiskFactors] || 0.5;
  
  // Create a normalized feature array
  return [
    cityFeatures.accidentRate,
    cityFeatures.populationDensity,
    cityFeatures.trafficDensity,
    timeRisk,
    weatherRisk,
    // Add normalized coordinates (scale down to 0-1 range)
    (input.latitude - 12) / (30 - 12), // Roughly India's latitude range
    (input.longitude - 70) / (90 - 70), // Roughly India's longitude range
  ];
};

// Simplified model that would normally be trained with real data
const createModel = async (): Promise<tf.LayersModel> => {
  // Create a simple feed-forward neural network
  const model = tf.sequential();
  
  // Input layer with 7 features
  model.add(tf.layers.dense({
    inputShape: [7],
    units: 12,
    activation: 'relu'
  }));
  
  // Hidden layer
  model.add(tf.layers.dense({
    units: 8,
    activation: 'relu'
  }));
  
  // Output layer (single output: risk score)
  model.add(tf.layers.dense({
    units: 1,
    activation: 'sigmoid' // Output between 0 and 1
  }));
  
  // Compile the model
  model.compile({
    optimizer: tf.train.adam(0.01),
    loss: 'meanSquaredError'
  });
  
  // In a real application, we'd train the model with historical data
  // For demo purposes, we're using a pre-initialized model
  
  return model;
};

// Cache the model instance to avoid recreating it for each prediction
let modelCache: tf.LayersModel | null = null;

export const predictRisk = async (input: PredictionInput): Promise<PredictionResult> => {
  try {
    // Load or create the model
    if (!modelCache) {
      modelCache = await createModel();
      
      // For demo purposes, initialize the model with some dummy weights
      // In a real app, we'd load pre-trained weights
      const dummyData = tf.randomNormal([20, 7]);
      const dummyLabels = tf.randomUniform([20, 1]);
      
      await modelCache.fit(dummyData, dummyLabels, {
        epochs: 5,
        verbose: 0
      });
    }
    
    // Extract features from input
    const features = extractFeatures(input);
    
    // Make prediction
    const tensorFeatures = tf.tensor2d([features]);
    const prediction = modelCache.predict(tensorFeatures) as tf.Tensor;
    
    // Get the raw risk score
    const riskScore = await prediction.dataSync()[0];
    
    // Clean up tensors
    tensorFeatures.dispose();
    prediction.dispose();
    
    // Determine risk level
    let riskLevel: "low" | "medium" | "high";
    if (riskScore < 0.33) riskLevel = "low";
    else if (riskScore < 0.66) riskLevel = "medium";
    else riskLevel = "high";
    
    // Generate contributing factors
    const factors = [];
    
    // Time-based factors
    const hour = parseInt(input.time.split(':')[0]);
    if (hour < 6 || hour >= 20) {
      factors.push("Nighttime driving conditions");
    } else if (hour >= 15 && hour < 20) {
      factors.push("Rush hour traffic congestion");
    }
    
    // Weather-based factors
    if (input.weather.toLowerCase() === "rain") {
      factors.push("Rainy weather conditions");
    } else if (input.weather.toLowerCase() === "fog") {
      factors.push("Poor visibility due to fog");
    } else if (input.weather.toLowerCase() === "snow") {
      factors.push("Slippery road conditions due to snow");
    }
    
    // City-based factors
    const cityFactor = cityStats[input.city as keyof typeof cityStats];
    if (cityFactor && cityFactor.trafficDensity > 0.8) {
      factors.push("High traffic density in " + input.city);
    }
    if (cityFactor && cityFactor.accidentRate > 0.7) {
      factors.push("Historical accident-prone area");
    }
    
    // If we don't have enough factors, add generic ones
    if (factors.length < 2) {
      factors.push("Location-specific risk factors");
    }
    
    return {
      riskLevel,
      riskScore: Math.round(riskScore * 100),
      confidenceLevel: Math.round((0.5 + Math.random() * 0.4) * 100),
      contributingFactors: factors.slice(0, 3) // Limit to 3 factors
    };
  } catch (error) {
    console.error("Prediction error:", error);
    return {
      riskLevel: "medium",
      riskScore: 50,
      confidenceLevel: 60,
      contributingFactors: ["Error in risk prediction model"]
    };
  }
};
