
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
  modelUsed: string;
};

export type ModelMetrics = {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
};

export type FeatureVector = number[];
