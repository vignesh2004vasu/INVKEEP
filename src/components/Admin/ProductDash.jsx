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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Table className='mt-16'>
      <TableCaption>Product List</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Subcategory</TableHead>
          <TableHead>Brand</TableHead>
          <TableHead>Sale Price</TableHead>
          <TableHead>Market Price</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Purchases</TableHead>
          <TableHead>Stock</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map(product => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.id}</TableCell>
            <TableCell>{product.productname}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.subcategory}</TableCell>
            <TableCell>{product.brand}</TableCell>
            <TableCell>{product.saleprice}</TableCell>
            <TableCell>{product.marketprice}</TableCell>
            <TableCell>{product.type}</TableCell>
            <TableCell>{product.rating}</TableCell>
            <TableCell>{product.purchases}</TableCell>
            <TableCell>{product.stock}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductDash;
