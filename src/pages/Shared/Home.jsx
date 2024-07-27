"use client"

import { useUser } from '@/components/UserContext'; // Adjust path as needed
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, ComposedChart } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const numberOfProducts = 120
const numberOfSales = 300
const totalRevenue = 15000

const salesData = [
  { month: "January", sales: 400 },
  { month: "February", sales: 300 },
  { month: "March", sales: 500 },
  { month: "April", sales: 700 },
  { month: "May", sales: 600 },
  { month: "June", sales: 800 },
]

const revenueData = [
  { month: "January", revenue: 4000 },
  { month: "February", revenue: 3500 },
  { month: "March", revenue: 4500 },
  { month: "April", revenue: 5000 },
  { month: "May", revenue: 4700 },
  { month: "June", revenue: 6000 },
]

const productSalesData = [
  { name: "Product A", value: 400 },
  { name: "Product B", value: 300 },
  { name: "Product C", value: 300 },
  { name: "Product D", value: 200 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const inventoryData = [
  { name: "January", inventory: 400, sales: 240, revenue: 2400 },
  { name: "February", inventory: 300, sales: 456, revenue: 1398 },
  { name: "March", inventory: 300, sales: 139, revenue: 2210 },
  { name: "April", inventory: 200, sales: 980, revenue: 2290 },
  { name: "May", inventory: 278, sales: 390, revenue: 2000 },
  { name: "June", inventory: 189, sales: 480, revenue: 2181 },
]

export default function Home() {
  const { user } = useUser();

  return (
    <div className="container mx-auto py-8 mt-16">
      <div className="mb-8">
        {user ? (
          <h1 className="text-3xl font-bold mb-4">Welcome back, {user.firstName}!</h1>
        ) : (
          <h1 className="text-3xl font-bold mb-4">Welcome to the Inventory Dashboard!</h1>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Number of Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{numberOfProducts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Number of Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{numberOfSales}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalRevenue}</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Sales (Bar Chart)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue (Line Chart)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
              </LineChart>
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
              <PieChart>
                <Pie
                  data={productSalesData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label
                >
                  {productSalesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Inventory Data (Composed Chart)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="inventory" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="sales" stroke="#ff7300" />
                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
