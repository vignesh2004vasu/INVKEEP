package com.backend.inventory.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.backend.inventory.dto.ProductDTO;
import com.backend.inventory.model.Product;
import com.backend.inventory.model.Supplier;
import com.backend.inventory.service.ProductService;
import com.backend.inventory.service.SupplierService;

@RestController
@RequestMapping("/products")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private SupplierService supplierService;

    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody ProductDTO productDTO) {
        try {
            Product product = new Product();
            product.setProductId(productDTO.getProductId());
            product.setProductName(productDTO.getProductName());
            product.setCategory(productDTO.getCategory());
            product.setPrice(productDTO.getPrice());
            product.setCost(productDTO.getCost());
            product.setStockLevel(productDTO.getStockLevel());
            product.setReorderLevel(productDTO.getReorderLevel());

            if (productDTO.getSupplierId() != null) {
                Supplier supplier = supplierService.getSupplier(productDTO.getSupplierId());
                if (supplier != null) {
                    product.setSupplier(supplier);
                }
            }

            Product createdProduct = productService.addProduct(product);
            return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<Product>> getProducts() {
        try {
            List<Product> products = productService.getProducts();
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        try {
            Product product = productService.getProduct(id);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        try {
            Product product = productService.getProduct(id);
            if (product != null) {
                product.setProductName(productDTO.getProductName());
                product.setCategory(productDTO.getCategory());
                product.setPrice(productDTO.getPrice());
                product.setCost(productDTO.getCost());
                product.setStockLevel(productDTO.getStockLevel());
                product.setReorderLevel(productDTO.getReorderLevel());

                if (productDTO.getSupplierId() != null) {
                    Supplier supplier = supplierService.getSupplier(productDTO.getSupplierId());
                    if (supplier != null) {
                        product.setSupplier(supplier);
                    }
                }

                Product updatedProduct = productService.updateProduct(id, product);
                return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
