
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const riskFactorData = [
  { name: "Poor Weather", value: 35 },
  { name: "Speeding", value: 25 },
  { name: "Distracted Driving", value: 20 },
  { name: "Road Conditions", value: 12 },
  { name: "Vehicle Failure", value: 8 },
];

const severityData = [
  { name: "Fatal", value: 15, color: "#ef4444" },
  { name: "Serious", value: 30, color: "#f59e0b" },
  { name: "Minor", value: 55, color: "#3b82f6" },
];

const timeOfDayData = [
  { name: "12am-4am", value: 15 },
  { name: "4am-8am", value: 22 },
  { name: "8am-12pm", value: 18 },
  { name: "12pm-4pm", value: 16 },
  { name: "4pm-8pm", value: 26 },
  { name: "8pm-12am", value: 13 },
];

export function RiskFactorsChart() {
  const [activeTab, setActiveTab] = useState("factors");

  return (
    <Card className="col-span-3 lg:col-span-2">
      <CardHeader>
        <CardTitle>Risk Factor Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="factors" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="factors">Risk Factors</TabsTrigger>
            <TabsTrigger value="severity">Severity</TabsTrigger>
            <TabsTrigger value="time">Time of Day</TabsTrigger>
          </TabsList>
          <TabsContent value="factors" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={riskFactorData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="severity" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="time" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={timeOfDayData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0d9488" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
