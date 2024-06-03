package com.nvl.novatech.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.nvl.novatech.dto.request.ProductCreationRequest;
import com.nvl.novatech.dto.request.ProductUpdateRequest;
import com.nvl.novatech.model.Product;

public interface ProductService {
      Product createProduct(ProductCreationRequest request);
      Product updateProduct(Long productId, ProductUpdateRequest request);

      void deleteProduct(Long productId);

      Page<Product> findAllProducts(Integer pageNumber, Integer pageSize);
      List<Product> findAllProductAdmin();
      Product findProductById(Long productId);
      Page<Product> findProductByCategory(String category, Integer pageNumber, Integer pageSize);
      
      Page<Product> filterProduct(String categoryName, List<String> size, Integer minPrice, Integer maxPrice, Integer misDiscount, String sort, Integer pageNumber, Integer pageSize);

      List<Product> findProductByName(String request);
}
