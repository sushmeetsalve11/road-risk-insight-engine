
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RiskFactorsChart } from "@/components/dashboard/RiskFactorsChart";
import { ClusteringAnalysis } from "@/components/dashboard/ClusteringAnalysis";
import { TimelineChart } from "@/components/dashboard/TimelineChart";
import { RiskPredictionCard } from "@/components/dashboard/RiskPredictionCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { ModelComparison } from "@/components/dashboard/ModelComparison";
import { AlertTriangle, Calendar, Car, MapPin } from "lucide-react";
import { statsData } from "@/data/mockData";

// Mock metrics data for demonstration
const metricsData = [
  {
    type: "Gradient Boosting",
    metrics: {
      accuracy: 0.85,
      precision: 0.82,
      recall: 0.88,
      f1Score: 0.85
    }
  },
  {
    type: "Random Forest",
    metrics: {
      accuracy: 0.83,
      precision: 0.80,
      recall: 0.86,
      f1Score: 0.83
    }
  },
  {
    type: "KNN",
    metrics: {
      accuracy: 0.78,
      precision: 0.75,
      recall: 0.82,
      f1Score: 0.78
    }
  },
  {
    type: "Neural Network",
    metrics: {
      accuracy: 0.87,
      precision: 0.84,
      recall: 0.90,
      f1Score: 0.87
    }
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Road Risk Insights Dashboard</h1>
          <p className="text-muted-foreground">
            Analyze accident data, identify risk factors, and predict accident probability.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat, index) => {
              const icons = {
                "Car": <Car />,
                "AlertTriangle": <AlertTriangle />,
                "MapPin": <MapPin />,
                "Calendar": <Calendar />
              };
              
              return (
                <StatCard 
                  key={index}
                  title={stat.title} 
                  value={stat.value} 
                  icon={icons[stat.icon as keyof typeof icons]}
                  trend={stat.trend}
                />
              );
            })}
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <RiskFactorsChart />
            <ClusteringAnalysis />
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <TimelineChart />
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="col-span-3 md:col-span-1">
              <RiskPredictionCard />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="col-span-3">
              <ModelComparison 
                metrics={metricsData} 
                selectedModel="Neural Network" 
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
