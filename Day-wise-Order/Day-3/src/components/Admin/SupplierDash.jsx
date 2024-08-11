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

const SupplierDash = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('https://in-telli-ventory.onrender.com/api/suppliers');
        setSuppliers(response.data);
      } catch (error) {
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Table className='mt-16 text-xl'>
      <TableCaption>Supplier List</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Supplier Name</TableHead>
          <TableHead>Contact Info</TableHead>
          <TableHead>Performance Rating</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {suppliers.map(supplier => (
          <TableRow key={supplier.supplierId}>
            <TableCell className="font-medium">{supplier.supplierId}</TableCell>
            <TableCell>{supplier.supplierName}</TableCell>
            <TableCell>{supplier.contactInfo}</TableCell>
            <TableCell>{supplier.performanceRating}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SupplierDash;
