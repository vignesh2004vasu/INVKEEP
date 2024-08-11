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

const SaleDash = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('https://in-telli-ventory.onrender.com/api/sales');
        setSales(response.data);
      } catch (error) {
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Table className='mt-16 text-xl'>
      <TableCaption>Sale List</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Sale Date</TableHead>
          <TableHead>Customer Name</TableHead>
        
        </TableRow>
      </TableHeader>
      <TableBody>
        {sales.map(sale => (
          <TableRow key={sale.saleId}>
            <TableCell className="font-medium">{sale.saleId}</TableCell>
            <TableCell>{sale.product.productName}</TableCell>
            <TableCell>{sale.totalPrice}</TableCell>
            <TableCell>{sale.quantity}</TableCell>
            <TableCell>{new Date(sale.saleDate).toLocaleDateString()}</TableCell>
            <TableCell>{sale.user.firstname}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SaleDash;
