import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Client } from '@gradio/client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'; // Ensure this is the correct import path

const SalesDash = () => {
  const [salesData, setSalesData] = useState({
    total_products: 0,
    increasing_sales: [],
    decreasing_sales: []
  });
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('increasing'); // Default view

  // Fetch sales data
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        console.log(1)
        const client = await Client.connect("vigneshvasu/SalesPredict");
        const result = await client.predict("/predict_sales", {});
        console.log(2)
        setSalesData(result.data[0]);
        console.log(3)
        console.log(result.data[0]); // Debugging
      } catch (error) {
        setError('Failed to fetch sales data.');
      }
    };

    fetchSalesData();
  }, []);

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!salesData.increasing_sales.length && !salesData.decreasing_sales.length) {
        return;
      }

      try {
        const productIds = [
          ...salesData.increasing_sales,
          ...salesData.decreasing_sales
        ];
        const uniqueProductIds = [...new Set(productIds)];

        const productDetails = {};
        await Promise.all(
          uniqueProductIds.map(async (productId) => {
            const response = await axios.get(`https://in-telli-ventory.onrender.com/products/${productId}`);
            productDetails[productId] = response.data;
          })
        );
        setProducts(productDetails);
      } catch (error) {
        setError('Failed to fetch product data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [salesData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const currentData = view === 'increasing' ? salesData.increasing_sales : salesData.decreasing_sales;

  return (
    <div>
      <h1>Sales Dashboard</h1>
      <p>Total Products: {salesData.total_products}</p>
      <button onClick={() => handleViewChange('increasing')}>Increasing Sales</button>
      <button onClick={() => handleViewChange('decreasing')}>Decreasing Sales</button>
      
      <Table className='mt-16 text-xl'>
        <TableCaption>{view === 'increasing' ? 'Increasing Sales' : 'Decreasing Sales'}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product ID</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>No data available</TableCell>
            </TableRow>
          ) : (
            currentData.map(productId => {
              const product = products[productId];
              return (
                <TableRow key={productId}>
                  <TableCell>{productId}</TableCell>
                  <TableCell>{product?.productName || 'Loading...'}</TableCell>
                  <TableCell>{product?.category || 'Loading...'}</TableCell>
                  <TableCell>{product?.price ? `$${product.price}` : 'Loading...'}</TableCell>
                  <TableCell>{product?.cost ? `$${product.cost}` : 'Loading...'}</TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SalesDash;
