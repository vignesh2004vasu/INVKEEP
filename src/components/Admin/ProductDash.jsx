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
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '@/components/ui/select';

const ProductDash = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        const response = await axios.get('https://in-telli-ventory.onrender.com/products/filter', {
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

  const handleDropdownChange = (name, value) => {
    setSearchParams({ ...searchParams, [name]: value });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="category">Category</Label>
            <Select value={searchParams.category} onValueChange={(value) => handleDropdownChange('category', value)}>
              <SelectTrigger placeholder="Select Category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Fashion">Fashion</SelectItem>
                <SelectItem value="Grocery">Grocery</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label htmlFor="subcategory">Subcategory</Label>
            <Select value={searchParams.subcategory} onValueChange={(value) => handleDropdownChange('subcategory', value)}>
              <SelectTrigger placeholder="Select Subcategory">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                <SelectItem value="Mobile">Mobile</SelectItem>
                <SelectItem value="Laptop">Laptop</SelectItem>
                <SelectItem value="Clothes">Clothes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label htmlFor="brand">Brand</Label>
            <Select value={searchParams.brand} onValueChange={(value) => handleDropdownChange('brand', value)}>
              <SelectTrigger placeholder="Select Brand">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                <SelectItem value="Nivea">Nivea</SelectItem>
                <SelectItem value="Samsung">Samsung</SelectItem>
                <SelectItem value="Nike">Nike</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label htmlFor="type">Type</Label>
            <Select value={searchParams.type} onValueChange={(value) => handleDropdownChange('type', value)}>
              <SelectTrigger placeholder="Select Type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
              </SelectContent>
            </Select>
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
