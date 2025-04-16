
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RiskMap } from "@/components/dashboard/RiskMap";
import { RiskFactorsChart } from "@/components/dashboard/RiskFactorsChart";
import { ClusteringAnalysis } from "@/components/dashboard/ClusteringAnalysis";
import { TimelineChart } from "@/components/dashboard/TimelineChart";
import { RiskPredictionCard } from "@/components/dashboard/RiskPredictionCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { AlertTriangle, Calendar, Car, MapPin } from "lucide-react";
import { statsData } from "@/data/mockData";

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
            <RiskMap />
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
