import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const PurchaseDash = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get('https://in-telli-ventory.onrender.com/api/purchase-orders');
        setPurchases(response.data);
      } catch (error) {
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Table className='mt-16 text-xl'>
      <TableCaption>Supplier List</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Supplier Name</TableHead>
          <TableHead>Cost</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Total Cost</TableHead>
          <TableHead>Payment Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchases.map(purchase => (
          <TableRow key={purchase.orderId}>
            <TableCell className="font-medium">{purchase.orderId}</TableCell>
            <TableCell>{purchase.product.productName}</TableCell>
            <TableCell>{purchase.supplier.supplierName}</TableCell>
            <TableCell>{purchase.product.cost}</TableCell>
            <TableCell>{purchase.quantity}</TableCell>
            <TableCell>{purchase.total_cost}</TableCell>
            <TableCell>{purchase.status}</TableCell>
            
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PurchaseDash;
