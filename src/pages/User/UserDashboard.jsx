import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    brand: '',
    category: '',
    type: ''
  });

  useEffect(() => {
    axios.get('https://in-telli-ventory.onrender.com/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSearch = () => {
    const { brand, category, type } = searchCriteria;
    const filtered = products.filter(product =>
      (brand ? product.brand.toLowerCase().includes(brand.toLowerCase()) : true) &&
      (category ? product.category.toLowerCase().includes(category.toLowerCase()) : true) &&
      (type ? product.type.toLowerCase().includes(type.toLowerCase()) : true)
    );
    setFilteredProducts(filtered);
  };

  const handleSelect = (name, value) => {
    setSearchCriteria({
      ...searchCriteria,
      [name]: value
    });
  };

  const uniqueBrands = [...new Set(products.map(product => product.brand))];
  const uniqueCategories = [...new Set(products.map(product => product.category))];
  const uniqueTypes = [...new Set(products.map(product => product.type))];

  return (
    <div>
      <h1>User Dashboard</h1>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Select Brand</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {uniqueBrands.map((brand, index) => (
              <DropdownMenuItem key={index} onClick={() => handleSelect('brand', brand)}>
                {brand}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Select Category</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {uniqueCategories.map((category, index) => (
              <DropdownMenuItem key={index} onClick={() => handleSelect('category', category)}>
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Select Type</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {uniqueTypes.map((type, index) => (
              <DropdownMenuItem key={index} onClick={() => handleSelect('type', type)}>
                {type}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Subcategory</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Purchases</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map(product => (
            <TableRow key={product.product}>
              <TableCell>{product.product}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.subcategory}</TableCell>
              <TableCell>{product.type}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.purchases}</TableCell>
              <TableCell>
                <Link to={`/order/${product.product}`}>Order</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>Total Products</TableCell>
            <TableCell>{filteredProducts.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default UserDashboard;