import React, { useState, useEffect } from "react";
import { Client } from "@gradio/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Ensure this is the correct import path

const SalesDash = () => {
  const [salesData, setSalesData] = useState({
    total_products: 0,
    increasing_sales: [],
    decreasing_sales: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("increasing"); // Default view

  // Fetch sales data from Hugging Face
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        console.log(1);
        const client = await Client.connect("vigneshvasu/SalesPredict");
        console.log(2);
        const result = await client.predict("/predict_sales", {});
        console.log(result.data[0]);

        // Check if result.data is an array
        if (Array.isArray(result.data) && result.data.length > 0) {
          setSalesData(result.data[0]);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        setError("Failed to fetch sales data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const currentData =
    view === "increasing"
      ? salesData.increasing_sales
      : salesData.decreasing_sales;

  return (
    <div>
      <h1>Sales Dashboard</h1>
      <p>Total Products: {salesData.total_products}</p>
      <button onClick={() => handleViewChange("increasing")}>
        Increasing Sales
      </button>
      <button onClick={() => handleViewChange("decreasing")}>
        Decreasing Sales
      </button>

      <Table className="mt-16 text-xl">
        <TableCaption>
          {view === "increasing" ? "Increasing Sales" : "Decreasing Sales"}
        </TableCaption>
        <TableHeader>
          <TableRow>
           
            <TableHead>Product Name</TableHead>
            <TableHead>Sales increase</TableHead>
            <TableHead>Percentage increase</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3}>No data available</TableCell>
            </TableRow>
          ) : (
            currentData.map(({productName,sales_increase,percentage_increase }) => (
              <TableRow key={productName}>
                <TableCell>{productName || "N/A"}</TableCell>
                <TableCell>{sales_increase || "N/A"}</TableCell>
                <TableCell>{percentage_increase || "N/A"}</TableCell>

                
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SalesDash;
