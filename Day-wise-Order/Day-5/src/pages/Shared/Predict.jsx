import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Client } from "@gradio/client";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export default function Predict() {
  const [chartData, setChartData] = useState([]);
  const [timeRange, setTimeRange] = useState("90"); // Default to "90" for 3 months

  useEffect(() => {
    const fetchDemand = async () => {
      const client = await Client.connect("YashwanthSC/Demanda");

      // Convert timeRange to days, ensuring it is an integer
      const days = parseInt(timeRange, 10);

      try {
        const result = await client.predict("/predict", { days: days });
        const data = result.data[0];

        // Ensure no negative values in the data (if needed)
        const processedData = data.map((item) => ({
          ...item,
          minimum_demand: Math.max(item.minimum_demand, 0),
          maximum_demand: Math.max(item.maximum_demand, 0),
        }));

        setChartData(processedData);
      } catch (error) {
        console.error("Error fetching demand data:", error);
      }
    };

    fetchDemand();
  }, [timeRange]);

  const handleTimeRangeChange = (value) => {
    // Update state with selected value
    setTimeRange(value);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Demand Forecast</CardTitle>
          <CardDescription>
            Showing demand forecast for various products
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={handleTimeRangeChange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90">Last 3 months</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="7">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="h-[500px] w-full">
          {" "}
          {/* Adjust height here */}
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 10, bottom: 70 }}
            >
              {" "}
              {/* Adjust margins here */}
              <defs>
                <linearGradient id="fillMinimum" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillMaximum" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--chart-2))"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--chart-2))"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="product_name"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={80}
                tick={{ fontSize: 10 }}
              />
              <YAxis
                domain={["dataMin - 10", "dataMax + 10"]}
                tickCount={10}
                tick={{ fontSize: 10 }}
              />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="minimum_demand"
                name="Minimum Demand"
                stroke="hsl(var(--chart-1))"
                fillOpacity={1}
                fill="url(#fillMinimum)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="maximum_demand"
                name="Maximum Demand"
                stroke="hsl(var(--chart-2))"
                fillOpacity={1}
                fill="url(#fillMaximum)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
