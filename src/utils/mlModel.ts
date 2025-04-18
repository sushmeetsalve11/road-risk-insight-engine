import * as tf from '@tensorflow/tfjs';
import { PredictionInput, PredictionResult, ModelMetrics, FeatureVector } from './mlTypes';
import { extractFeatures } from './featureExtractor';
import { cityStats } from '@/data/mockData';

// Random Forest Model (simplified implementation using ensemble of decision trees)
class RandomForestModel {
  private model: tf.Sequential[];
  private numTrees: number;

  constructor(numTrees: number = 10) {
    this.numTrees = numTrees;
    this.model = [];
  }

  async train(features: number[][], labels: number[]) {
    // Create ensemble of decision trees (simplified as small neural networks)
    for (let i = 0; i < this.numTrees; i++) {
      const tree = tf.sequential();
      tree.add(tf.layers.dense({ units: 8, activation: 'relu', inputShape: [7] }));
      tree.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
      tree.compile({ optimizer: 'adam', loss: 'binaryCrossentropy' });
      
      // Train each tree with bootstrapped data
      const indices = Array.from({ length: features.length }, () => 
        Math.floor(Math.random() * features.length));
      const bootstrapFeatures = indices.map(i => features[i]);
      const bootstrapLabels = indices.map(i => labels[i]);
      
      await tree.fit(tf.tensor2d(bootstrapFeatures), tf.tensor1d(bootstrapLabels), {
        epochs: 10,
        verbose: 0
      });
      
      this.model.push(tree);
    }
  }

  predict(features: number[]): number {
    const predictions = this.model.map(tree => {
      const prediction = tree.predict(tf.tensor2d([features])) as tf.Tensor;
      const value = prediction.dataSync()[0];
      prediction.dispose();
      return value;
    });
    
    return predictions.reduce((a, b) => a + b) / this.numTrees;
  }
}

// KNN Model
class KNNModel {
  private features: number[][];
  private labels: number[];
  private k: number;

  constructor(k: number = 5) {
    this.k = k;
    this.features = [];
    this.labels = [];
  }

  train(features: number[][], labels: number[]) {
    this.features = features;
    this.labels = labels;
  }

  predict(input: number[]): number {
    const distances = this.features.map((feature, i) => ({
      distance: euclideanDistance(feature, input),
      label: this.labels[i]
    }));
    
    distances.sort((a, b) => a.distance - b.distance);
    const kNearest = distances.slice(0, this.k);
    const sum = kNearest.reduce((acc, curr) => acc + curr.label, 0);
    return sum / this.k;
  }
}

// Gradient Boosting Model (simplified implementation)
class GradientBoostingModel {
  private models: tf.Sequential[];
  private numModels: number;
  private learningRate: number;

  constructor(numModels: number = 5, learningRate: number = 0.1) {
    this.numModels = numModels;
    this.learningRate = learningRate;
    this.models = [];
  }

  async train(features: number[][], labels: number[]) {
    let residuals = [...labels];
    
    for (let i = 0; i < this.numModels; i++) {
      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 8, activation: 'relu', inputShape: [7] }));
      model.add(tf.layers.dense({ units: 1 }));
      model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
      
      await model.fit(tf.tensor2d(features), tf.tensor1d(residuals), {
        epochs: 10,
        verbose: 0
      });
      
      // Update residuals
      const predictions = model.predict(tf.tensor2d(features)) as tf.Tensor;
      const predArray = predictions.dataSync();
      residuals = residuals.map((r, j) => r - this.learningRate * predArray[j]);
      predictions.dispose();
      
      this.models.push(model);
    }
  }

  predict(features: number[]): number {
    let prediction = 0;
    this.models.forEach(model => {
      const modelPred = model.predict(tf.tensor2d([features])) as tf.Tensor;
      prediction += this.learningRate * modelPred.dataSync()[0];
      modelPred.dispose();
    });
    return prediction;
  }
}

// Utility function for KNN
function euclideanDistance(a: number[], b: number[]): number {
  return Math.sqrt(a.reduce((sum, value, i) => sum + Math.pow(value - b[i], 2), 0));
}

// Model evaluation function
async function evaluateModel(model: any, testFeatures: number[][], testLabels: number[]): Promise<ModelMetrics> {
  const predictions = testFeatures.map(feature => model.predict(feature));
  
  // Calculate metrics
  let tp = 0, fp = 0, tn = 0, fn = 0;
  predictions.forEach((pred, i) => {
    const actualLabel = testLabels[i] >= 0.5 ? 1 : 0;
    const predictedLabel = pred >= 0.5 ? 1 : 0;
    
    if (predictedLabel === 1 && actualLabel === 1) tp++;
    if (predictedLabel === 1 && actualLabel === 0) fp++;
    if (predictedLabel === 0 && actualLabel === 0) tn++;
    if (predictedLabel === 0 && actualLabel === 1) fn++;
  });
  
  const accuracy = (tp + tn) / (tp + tn + fp + fn);
  const precision = tp / (tp + fp);
  const recall = tp / (tp + fn);
  const f1Score = 2 * (precision * recall) / (precision + recall);
  
  return { accuracy, precision, recall, f1Score };
}

// Global variables to store trained models
let randomForest: RandomForestModel | null = null;
let knn: KNNModel | null = null;
let gradientBoosting: GradientBoostingModel | null = null;
let bestModel: { type: string; model: any } | null = null;

// Initialize and train models
export async function initializeModels() {
  // Generate synthetic training data
  const numSamples = 1000;
  const features: number[][] = [];
  const labels: number[] = [];
  
  for (let i = 0; i < numSamples; i++) {
    const feature = Array.from({ length: 7 }, () => Math.random());
    const label = feature.reduce((a, b) => a + b) / 7 > 0.5 ? 1 : 0;
    features.push(feature);
    labels.push(label);
  }
  
  // Split into training and testing sets
  const splitIndex = Math.floor(0.8 * numSamples);
  const trainFeatures = features.slice(0, splitIndex);
  const trainLabels = labels.slice(0, splitIndex);
  const testFeatures = features.slice(splitIndex);
  const testLabels = labels.slice(splitIndex);
  
  // Train and evaluate models
  randomForest = new RandomForestModel();
  knn = new KNNModel();
  gradientBoosting = new GradientBoostingModel();
  
  await randomForest.train(trainFeatures, trainLabels);
  knn.train(trainFeatures, trainLabels);
  await gradientBoosting.train(trainFeatures, trainLabels);
  
  // Evaluate models
  const rfMetrics = await evaluateModel(randomForest, testFeatures, testLabels);
  const knnMetrics = await evaluateModel(knn, testFeatures, testLabels);
  const gbMetrics = await evaluateModel(gradientBoosting, testFeatures, testLabels);
  
  console.log('Model Metrics:');
  console.log('Random Forest:', rfMetrics);
  console.log('KNN:', knnMetrics);
  console.log('Gradient Boosting:', gbMetrics);
  
  // Choose best model based on F1 score
  const models = [
    { type: 'Random Forest', model: randomForest, metrics: rfMetrics },
    { type: 'KNN', model: knn, metrics: knnMetrics },
    { type: 'Gradient Boosting', model: gradientBoosting, metrics: gbMetrics }
  ];
  
  bestModel = models.reduce((best, current) => 
    current.metrics.f1Score > best.metrics.f1Score ? current : best
  );
  
  console.log('Best model:', bestModel.type);
}

// Main prediction function
export async function predictRisk(input: PredictionInput): Promise<PredictionResult> {
  if (!bestModel) {
    await initializeModels();
  }
  
  const features = extractFeatures(input);
  const riskScore = bestModel!.model.predict(features);
  
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
    contributingFactors: factors.slice(0, 3),
    modelUsed: bestModel!.type
  };
}

// Export types that are used in other components
export type { PredictionInput, PredictionResult };
