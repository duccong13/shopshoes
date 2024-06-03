package com.nvl.novatech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nvl.novatech.model.Category;


@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{
    Category findByCategoryName(String categoryName);

    @Query("Select c from Category c Where c.categoryName = :categoryName And c.parentCategory.categoryName =:parentCategoryName")
    public Category findByNameAndParant(@Param("categoryName") String categoryName, 
        @Param("parentCategoryName") String parentCategoryName);
}
