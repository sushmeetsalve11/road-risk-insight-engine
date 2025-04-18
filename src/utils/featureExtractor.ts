
import { PredictionInput } from './mlTypes';
import { cityStats, timeRiskFactors, weatherRiskFactors } from '@/data/mockData';

export const extractFeatures = (input: PredictionInput): number[] => {
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
  
  return [
    cityFeatures.accidentRate,
    cityFeatures.populationDensity,
    cityFeatures.trafficDensity,
    timeRisk,
    weatherRisk,
    (input.latitude - 12) / (30 - 12),
    (input.longitude - 70) / (90 - 70),
  ];
};
