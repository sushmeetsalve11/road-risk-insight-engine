
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CircleCheck, Info } from "lucide-react";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type MetricsData = {
  modelName: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  isSelected: boolean;
};

const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;

export function ModelComparison({ metrics, selectedModel }: { 
  metrics: { type: string; metrics: { accuracy: number; precision: number; recall: number; f1Score: number; } }[];
  selectedModel: string;
}) {
  // Update the filter to only include specified models
  const activeModels = metrics.filter(m => 
    ["Gradient Boosting", "Random Forest", "KNN", "Neural Network"].includes(m.type)
  );
  
  const metricsData: MetricsData[] = activeModels.map(m => ({
    modelName: m.type,
    accuracy: m.metrics.accuracy,
    precision: m.metrics.precision,
    recall: m.metrics.recall,
    f1Score: m.metrics.f1Score,
    isSelected: m.type === selectedModel
  }));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Machine Learning Model Comparison</CardTitle>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Comparison of key machine learning models</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={metricsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="modelName" />
              <YAxis tickFormatter={formatPercentage} />
              <Tooltip 
                formatter={formatPercentage}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border rounded-lg p-2 shadow-lg">
                        <p className="font-medium">{label}</p>
                        {payload.map((entry: any) => (
                          <p key={entry.name} className="text-sm">
                            {entry.name}: {formatPercentage(entry.value)}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar dataKey="accuracy" name="Accuracy" fill="#4ade80" />
              <Bar dataKey="precision" name="Precision" fill="#2563eb" />
              <Bar dataKey="recall" name="Recall" fill="#f59e0b" />
              <Bar dataKey="f1Score" name="F1 Score" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {metricsData.map((model) => (
            <div 
              key={model.modelName}
              className={`p-3 rounded-lg border ${
                model.isSelected ? 'bg-primary/10 border-primary' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{model.modelName}</h4>
                {model.isSelected && (
                  <CircleCheck className="h-5 w-5 text-primary" />
                )}
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">F1 Score:</span>
                  <span className="font-medium">{formatPercentage(model.f1Score)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Accuracy:</span>
                  <span className="font-medium">{formatPercentage(model.accuracy)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
