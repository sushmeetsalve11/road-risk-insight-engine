
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskFactorsChart } from "@/components/dashboard/RiskFactorsChart";
import { ClusteringAnalysis } from "@/components/dashboard/ClusteringAnalysis";
import { TimelineChart } from "@/components/dashboard/TimelineChart";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";

const Analysis = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Detailed Analysis</h1>
              <p className="text-muted-foreground">
                In-depth exploration of accident patterns and correlations.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Correlation Analysis</CardTitle>
                <CardDescription>Relationships between risk factors</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  Correlation matrix visualization would appear here
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Feature Importance</CardTitle>
                <CardDescription>Model-based risk factor ranking</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  Feature importance chart would appear here
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <RiskFactorsChart />
            <ClusteringAnalysis />
          </div>
          
          <div className="grid gap-4">
            <TimelineChart />
          </div>
          
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Data Exploration</CardTitle>
                <CardDescription>Interactive data explorer</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  Interactive data table would appear here
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Analysis;
