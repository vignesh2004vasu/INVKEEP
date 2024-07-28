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
  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    brand: '',
    type: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://in-telli-ventory.onrender.com/products/filter', {
          params: filters
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleFilterChange = (name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-4">
        <FilterSelect
          label="Category"
          value={filters.category}
          onChange={(value) => handleFilterChange('category', value)}
          options={["Electronics", "Fashion", "Grocery"]}
        />
        <FilterSelect
          label="Subcategory"
          value={filters.subcategory}
          onChange={(value) => handleFilterChange('subcategory', value)}
          options={["Mobile", "Laptop", "Clothes"]}
        />
        <FilterSelect
          label="Brand"
          value={filters.brand}
          onChange={(value) => handleFilterChange('brand', value)}
          options={["Nivea", "Samsung", "Nike"]}
        />
        <FilterSelect
          label="Type"
          value={filters.type}
          onChange={(value) => handleFilterChange('type', value)}
          options={["Electronics", "Clothing", "Food"]}
        />
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

const FilterSelect = ({ label, value, onChange, options }) => (
  <div className="flex-1 min-w-[200px]">
    <Label htmlFor={label.toLowerCase()}>{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger placeholder={`Select ${label}`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">All</SelectItem>
        {options.map(option => (
          <SelectItem key={option} value={option}>{option}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default ProductDash;