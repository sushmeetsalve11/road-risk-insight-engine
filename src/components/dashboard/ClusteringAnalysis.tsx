
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { clusterData } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";

export function ClusteringAnalysis() {
  const { toast } = useToast();
  
  const handleClusterClick = (entry: any) => {
    toast({
      title: entry.name,
      description: `${entry.value}% of accidents fall into this cluster. ${getClusterDescription(entry.name)}`,
      duration: 5000,
    });
  };
  
  const getClusterDescription = (clusterName: string): string => {
    if (clusterName.includes("Urban Intersections")) {
      return "These accidents typically occur at busy city intersections with high traffic volume.";
    } else if (clusterName.includes("Highway")) {
      return "High-speed collisions on major highways and expressways.";
    } else if (clusterName.includes("Weather")) {
      return "Accidents strongly correlated with adverse weather conditions like rain or fog.";
    } else if (clusterName.includes("Night")) {
      return "Accidents occurring during night hours with reduced visibility.";
    } else if (clusterName.includes("Vehicle")) {
      return "Incidents caused primarily by mechanical failures or maintenance issues.";
    }
    return "";
  };
  
  return (
    <Card className="col-span-3 lg:col-span-1">
      <CardHeader>
        <CardTitle>Accident Clusters</CardTitle>
        <CardDescription>ML-based classification of accident types</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={clusterData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              onClick={handleClusterClick}
              cursor="pointer"
            >
              {clusterData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend layout="vertical" align="right" verticalAlign="middle" />
            <Tooltip formatter={(value, name) => [`${value}%`, name]} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
