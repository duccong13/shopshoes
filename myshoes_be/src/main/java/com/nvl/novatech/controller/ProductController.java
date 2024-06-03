package com.nvl.novatech.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nvl.novatech.dto.request.ApiResponse;
import com.nvl.novatech.dto.request.ProductCreationRequest;
import com.nvl.novatech.dto.request.ProductUpdateRequest;
import com.nvl.novatech.model.Product;
import com.nvl.novatech.service.ProductService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductController {
    
    ProductService productService;

    @PostMapping
    ApiResponse<Product> createProduct(@RequestBody ProductCreationRequest request){
        return ApiResponse.<Product>builder()
            .result(productService.createProduct(request))
            .build();
    }

    @PutMapping("/{productId}")
    ApiResponse<Product> updateProduct(@PathVariable Long productId, @RequestBody ProductUpdateRequest request){
        return ApiResponse.<Product>builder()
                .result(productService.updateProduct(productId, request))
                .message("Update Product Successfully")
                .build();
    }

    @DeleteMapping("/{productId}")
    ApiResponse<String> deleteProduct(@PathVariable Long productId){
        productService.deleteProduct(productId);
        return ApiResponse.<String>builder()
            .result("Delete product successfully")
            .build();
    }

    @GetMapping("/{productId}")
    ApiResponse<Product> findProductById(@PathVariable Long productId){
        return ApiResponse.<Product>builder()
            .result(productService.findProductById(productId))
            .build();
    }

    @GetMapping
    ApiResponse<Page<Product>> findAllProduct(@RequestParam Integer pageNumber, @RequestParam Integer pageSize){
        return ApiResponse.<Page<Product>>builder()
            .result(productService.findAllProducts(pageNumber, pageSize))
            .build();
    }

    @GetMapping("/category")
    ApiResponse<Page<Product>> findProductByCategory(@RequestParam String categoryName, @RequestParam Integer pageNumber, @RequestParam Integer pageSize){
        return ApiResponse.<Page<Product>>builder()
            .result(productService.findProductByCategory(categoryName, pageNumber, pageSize))
            .build();
    }

    @GetMapping("/filter")
    ApiResponse<Page<Product>> filterProduct(@RequestParam String categoryName, @RequestParam List<String> color, @RequestParam Integer minPrice,
    @RequestParam Integer maxPrice, @RequestParam Integer minDiscount, @RequestParam String sort,
    @RequestParam Integer pageNumber, @RequestParam Integer pageSize){
        return ApiResponse.<Page<Product>>builder()
            .result(productService.filterProduct(categoryName, color, minPrice, maxPrice, minDiscount, sort, pageNumber, pageSize))
            .build();
    }

    @GetMapping("/search")
    ApiResponse<List<Product>> findProductByName(@RequestParam String request){
        return ApiResponse.<List<Product>>builder()
            .result(productService.findProductByName(request))
            .build();
    }

    @GetMapping("/all")
    ApiResponse<List<Product>> findAllProduct(){
        return ApiResponse.<List<Product>>builder()
            .result(productService.findAllProductAdmin())
            .build();
    }
    

}
