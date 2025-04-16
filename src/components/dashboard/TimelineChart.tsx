
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const monthlyData = [
  { name: "Jan", accidents: 65, riskIndex: 42 },
  { name: "Feb", accidents: 59, riskIndex: 38 },
  { name: "Mar", accidents: 80, riskIndex: 52 },
  { name: "Apr", accidents: 81, riskIndex: 53 },
  { name: "May", accidents: 76, riskIndex: 49 },
  { name: "Jun", accidents: 55, riskIndex: 36 },
  { name: "Jul", accidents: 40, riskIndex: 26 },
  { name: "Aug", accidents: 35, riskIndex: 23 },
  { name: "Sep", accidents: 48, riskIndex: 31 },
  { name: "Oct", accidents: 65, riskIndex: 42 },
  { name: "Nov", accidents: 70, riskIndex: 45 },
  { name: "Dec", accidents: 85, riskIndex: 55 },
];

export function TimelineChart() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Accident & Risk Trends</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={monthlyData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="accidents" 
              stroke="#3b82f6" 
              activeDot={{ r: 8 }} 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="riskIndex" 
              stroke="#ef4444" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
