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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProductDash = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [searchParams, setSearchParams] = useState({
    category: '',
    subcategory: '',
    brand: '',
    type: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { category, subcategory, brand, type } = searchParams;
        const response = await axios.get('https://in-telli-ventory.onrender.com/products', {
          params: { category, subcategory, brand, type }
        });
        setProducts(response.data);
      } catch (error) {
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://in-telli-ventory.onrender.com/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      setError('Failed to delete product.');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditedProduct(product);
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://in-telli-ventory.onrender.com/products/${editingProduct.id}`, editedProduct);
      setProducts(products.map(product => (product.id === editingProduct.id ? editedProduct : product)));
      setEditingProduct(null);
    } catch (error) {
      setError('Failed to update product.');
    }
  };

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={searchParams.category}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="subcategory">Subcategory</Label>
            <Input
              id="subcategory"
              name="subcategory"
              value={searchParams.subcategory}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              name="brand"
              value={searchParams.brand}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="type">Type</Label>
            <Input
              id="type"
              name="type"
              value={searchParams.type}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      <Table>
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
    </div>
  );
};

export default ProductDash;
