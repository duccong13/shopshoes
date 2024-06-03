package com.nvl.novatech.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.nvl.novatech.dto.request.ProductCreationRequest;
import com.nvl.novatech.dto.request.ProductUpdateRequest;
import com.nvl.novatech.exception.AppException;
import com.nvl.novatech.exception.ErrorCode;
import com.nvl.novatech.model.Category;
import com.nvl.novatech.model.Product;
import com.nvl.novatech.repository.CategoryRepository;
import com.nvl.novatech.repository.ProductRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductServiceImpl implements ProductService{

    ProductRepository productRepository;
    CategoryRepository categoryRepository;

    @Override
    public Product createProduct(ProductCreationRequest request) {
        Category firstLevel = categoryRepository.findByCategoryName(request.getFristLevelCategory());
        if(firstLevel == null){
            Category fristLevelCategory = new Category();
            fristLevelCategory.setCategoryName(request.getFristLevelCategory());
            fristLevelCategory.setLevel(1);
            firstLevel = categoryRepository.save(fristLevelCategory);
        }

        Category secondLevel = categoryRepository.findByNameAndParant(request.getSecondLevelCategory(), firstLevel.getCategoryName());
        if(secondLevel == null){
            Category secondLevelCategory = new Category();
            secondLevelCategory.setCategoryName(request.getSecondLevelCategory());
            secondLevelCategory.setParentCategory(firstLevel);
            secondLevelCategory.setLevel(2);
            secondLevel = categoryRepository.save(secondLevelCategory);
        }

        Category thirdLevel = categoryRepository.findByNameAndParant(request.getThirdLevelCategory(), secondLevel.getCategoryName());
        if(thirdLevel == null){
            Category thirdLevelCategory = new Category();
            thirdLevelCategory.setParentCategory(secondLevel);
            thirdLevelCategory.setCategoryName(request.getThirdLevelCategory());
            thirdLevelCategory.setLevel(3);
            thirdLevel = categoryRepository.save(thirdLevelCategory);
        }

        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setDiscountedPrice(request.getDiscountedPrice());
        product.setDiscountPercent(request.getDiscountPercent());
        product.setQuantity(request.getQuantity());
        product.setCategory(thirdLevel);
        product.setImages(request.getImages());
        product.setSizes(request.getSize());
        Product saveProduct = productRepository.save(product);
        return saveProduct;
    }

    @Override
    public Product updateProduct(Long productId, ProductUpdateRequest request) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));
        product.setQuantity(request.getQuantity());
        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }

    @Override
    public Page<Product> findAllProducts(Integer pageNumber, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        List<Product> products = productRepository.findAll();
        int startIndex = (int) pageable.getOffset();
        int endIndex = Math.min(startIndex + pageable.getPageSize(), products.size());
        List<Product> pageContent = products.subList(startIndex, endIndex);
        Page<Product> filteredProducts = new PageImpl<>(pageContent, pageable, products.size());
        return filteredProducts;
    }

    @Override
    public Product findProductById(Long productId) {
        return productRepository.findById(productId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));
    }

    @Override
    public Page<Product> findProductByCategory(String category, Integer pageNumber, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        List<Product> products = productRepository.findByCategory(category);
        int startIndex = (int) pageable.getOffset();
        int endIndex = Math.min(startIndex + pageable.getPageSize(), products.size());
        List<Product> pageContent = products.subList(startIndex, endIndex);
        Page<Product> filteredProducts = new PageImpl<>(pageContent, pageable, products.size());
        return filteredProducts;
    }

    @Override
    public Page<Product> filterProduct(String categoryName, List<String> colors, Integer minPrice, Integer maxPrice, Integer misDiscount, String sort, Integer pageNumber,
            Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        List<Product> products = productRepository.filterProduct(categoryName, minPrice, maxPrice, misDiscount, sort);
        int startIndex = (int) pageable.getOffset();
        int endIndex = Math.min(startIndex + pageable.getPageSize(), products.size());
        List<Product> pageContent = products.subList(startIndex, endIndex);
        Page<Product> filteredProducts = new PageImpl<>(pageContent, pageable, products.size());
        // if(filteredProducts.isEmpty()) 
        //     throw new AppException(ErrorCode.PRODUCT_NOT_EXISTED);
        return filteredProducts;
    }

    @Override
    public List<Product> findProductByName(String request) {
        return productRepository.findProductByName(request);
    }

    @Override
    public List<Product> findAllProductAdmin() {
        return productRepository.findAll();
    }
    
}
