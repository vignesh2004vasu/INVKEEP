import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProductDash = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Table>
      <TableCaption>Product List</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Subcategory</TableHead>
          <TableHead>Brand</TableHead>
          <TableHead>Sale Price</TableHead>
          <TableHead>Market Price</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Purchases</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map(product => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.id}</TableCell>
            <TableCell>{product.product}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.subcategory}</TableCell>
            <TableCell>{product.brand}</TableCell>
            <TableCell>{product.saleprice}</TableCell>
            <TableCell>{product.marketprice}</TableCell>
            <TableCell>{product.type}</TableCell>
            <TableCell>{product.rating}</TableCell>
            <TableCell>{product.purchases}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" onClick={() => handleEdit(product)}>Edit</Button>
                </PopoverTrigger>
                {editingProduct && editingProduct.id === product.id && (
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Edit Product</h4>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="product">Product</Label>
                          <Input
                            id="product"
                            value={editedProduct.product}
                            onChange={(e) => setEditedProduct({ ...editedProduct, product: e.target.value })}
                            className="col-span-2 h-8"
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="category">Category</Label>
                          <Input
                            id="category"
                            value={editedProduct.category}
                            onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
                            className="col-span-2 h-8"
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="subcategory">Subcategory</Label>
                          <Input
                            id="subcategory"
                            value={editedProduct.subcategory}
                            onChange={(e) => setEditedProduct({ ...editedProduct, subcategory: e.target.value })}
                            className="col-span-2 h-8"
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="brand">Brand</Label>
                          <Input
                            id="brand"
                            value={editedProduct.brand}
                            onChange={(e) => setEditedProduct({ ...editedProduct, brand: e.target.value })}
                            className="col-span-2 h-8"
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="saleprice">Sale Price</Label>
                          <Input
                            id="saleprice"
                            value={editedProduct.saleprice}
                            onChange={(e) => setEditedProduct({ ...editedProduct, saleprice: e.target.value })}
                            className="col-span-2 h-8"
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="marketprice">Market Price</Label>
                          <Input
                            id="marketprice"
                            value={editedProduct.marketprice}
                            onChange={(e) => setEditedProduct({ ...editedProduct, marketprice: e.target.value })}
                            className="col-span-2 h-8"
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="type">Type</Label>
                          <Input
                            id="type"
                            value={editedProduct.type}
                            onChange={(e) => setEditedProduct({ ...editedProduct, type: e.target.value })}
                            className="col-span-2 h-8"
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="rating">Rating</Label>
                          <Input
                            id="rating"
                            value={editedProduct.rating}
                            onChange={(e) => setEditedProduct({ ...editedProduct, rating: e.target.value })}
                            className="col-span-2 h-8"
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="purchases">Purchases</Label>
                          <Input
                            id="purchases"
                            value={editedProduct.purchases}
                            onChange={(e) => setEditedProduct({ ...editedProduct, purchases: e.target.value })}
                            className="col-span-2 h-8"
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="stock">Stock</Label>
                          <Input
                            id="stock"
                            value={editedProduct.stock}
                            onChange={(e) => setEditedProduct({ ...editedProduct, stock: e.target.value })}
                            className="col-span-2 h-8"
                          />
                        </div>
                        <Button onClick={handleSave}>Save</Button>
                      </div>
                    </div>
                  </PopoverContent>
                )}
              </Popover>
              <Button variant="outline" onClick={() => handleDelete(product.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductDash;