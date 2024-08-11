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

const ProductDash = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://in-telli-ventory.onrender.com/products');
        setProducts(response.data);
      } catch (error) {
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading....</p>;
  if (error) return <p>{error}</p>;

  return (
    <Table className='mt-16 text-xl' >
      <TableCaption>Product List</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Sale Price</TableHead>
          <TableHead>Cost Price</TableHead>
          <TableHead>Stock Level</TableHead>
          <TableHead>Reorder Level</TableHead>
          <TableHead>Supplier</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map(product => (
          <TableRow key={product.productId}>
            <TableCell className="font-medium">{product.productId}</TableCell>
            <TableCell>{product.productName}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.cost}</TableCell>
            <TableCell>{product.stockLevel}</TableCell>
            <TableCell>{product.reorderLevel}</TableCell>
            <TableCell>{product.supplier.supplierName}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductDash;
