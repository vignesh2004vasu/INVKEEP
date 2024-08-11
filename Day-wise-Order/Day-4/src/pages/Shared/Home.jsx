"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/components/UserContext";
import { Client } from "@gradio/client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  ComposedChart,
} from "recharts";
import { useSpring, animated } from "@react-spring/web";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadialChart } from "./RadialChart";
import PieChartDash from "./Pie";
import BarNew from "./BarNew";
import LineNew from "./LineNew";
import Predict from "./Predict";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const numberOfProducts = 120;
const numberOfSales = 300;
const totalRevenue = 15000;

const AnimatedNumber = ({ number }) => {
  const { number: animatedNumber } = useSpring({
    from: { number: 0 },
    to: { number },
    config: { duration: 1000 },
  });
  return (
    <animated.span>{animatedNumber.to((n) => n.toFixed(0))}</animated.span>
  );
};

export default function Home() {
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const client = await Client.connect("YashwanthSC/Sentina");
      const result = await client.predict("/sentiment_analysis", {});

      console.log(result.data);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-8 mt-16">
      <div className="mb-8">
        {user ? (
          <h1 className="text-3xl font-bold mb-4">
            Welcome back, {user.firstName}!
          </h1>
        ) : (
          <h1 className="text-3xl font-bold mb-4">
            Welcome to the Inventory Dashboard!
          </h1>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Number of Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              <AnimatedNumber number={numberOfProducts} />
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Number of Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              <AnimatedNumber number={numberOfSales} />
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              $<AnimatedNumber number={totalRevenue} />
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Total Sales (Bar Chart)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={500}>
              <BarNew />
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue (Line Chart)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineNew />
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Products with Maximum Sales (Pie Chart)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <PieChartDash/>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Inventory Data (Composed Chart)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadialChart />
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
      </div>
            <ResponsiveContainer width="100%" height={400}>
              <Predict />
            </ResponsiveContainer>
    </div>
  );
}
