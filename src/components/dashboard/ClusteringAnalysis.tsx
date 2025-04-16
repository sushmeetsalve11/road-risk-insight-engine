
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const clusterData = [
  { name: "Cluster 1: Urban Intersections", value: 35, color: "#3b82f6" },
  { name: "Cluster 2: Highway Accidents", value: 25, color: "#0d9488" },
  { name: "Cluster 3: Weather-Related", value: 20, color: "#f59e0b" },
  { name: "Cluster 4: Night Accidents", value: 12, color: "#7c3aed" },
  { name: "Cluster 5: Vehicle Failures", value: 8, color: "#ef4444" },
];

export function ClusteringAnalysis() {
  return (
    <Card className="col-span-3 lg:col-span-1">
      <CardHeader>
        <CardTitle>Accident Clusters</CardTitle>
        <CardDescription>Unsupervised classification of accident types</CardDescription>
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
            >
              {clusterData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend layout="vertical" align="right" verticalAlign="middle" />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
